import { Socket } from 'socket.io-client';
import { WebRTCEvents } from '../../../shared/types';

export interface PeerConnection {
  peerConnection: RTCPeerConnection;
  audioTrack: MediaStreamTrack | null;
  audioElement?: HTMLAudioElement;
}

/**
 * WebRTCAudioManager handles WebRTC audio connections between players
 * Uses a full mesh network where every player connects directly to every other player
 */
export class WebRTCAudioManager {
  private localStream: MediaStream | null = null;
  private peers: Map<string, PeerConnection> = new Map();
  private socket: Socket;
  private localAudioEnabled: boolean = false;
  private gameId: string;
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  
  // WebRTC configuration with STUN servers for NAT traversal
  private rtcConfig: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };
  
  /**
   * Create a new WebRTC audio manager
   * @param socket Socket.io connection
   * @param gameId The game ID for the current session
   */
  constructor(socket: Socket, gameId: string) {
    console.log(`[VOICECHAT] Initializing WebRTCAudioManager for game ${gameId}`);
    this.socket = socket;
    this.gameId = gameId;
    this.setupSocketEvents();
  }
  
  /**
   * Setup socket events for WebRTC signaling
   */
  private setupSocketEvents(): void {
    console.log(`[VOICECHAT] Setting up socket events`);
    
    // Handle new player joining the audio network
    this.socket.on(WebRTCEvents.NEW_PLAYER, (playerId: string) => {
      console.log(`[VOICECHAT] New player joined the audio network: ${playerId}`);
      this.createPeerConnection(playerId);
    });
    
    // Handle player leaving
    this.socket.on(WebRTCEvents.PLAYER_LEFT, (playerId: string) => {
      console.log(`[VOICECHAT] Player left: ${playerId}`);
      this.removePeerConnection(playerId);
    });
    
    // Handle incoming offers
    this.socket.on(WebRTCEvents.OFFER, async (data: { offer: RTCSessionDescriptionInit, from: string }) => {
      console.log(`[VOICECHAT] Received offer from ${data.from}`);
      await this.handleOffer(data.offer, data.from);
    });
    
    // Handle incoming answers
    this.socket.on(WebRTCEvents.ANSWER, async (data: { answer: RTCSessionDescriptionInit, from: string }) => {
      console.log(`[VOICECHAT] Received answer from ${data.from}`);
      const peer = this.peers.get(data.from);
      if (peer) {
        try {
          const peerConnection = peer.peerConnection;
          
          // Check connection state before setting remote description
          if (peerConnection.signalingState !== 'stable') {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
            console.log(`[VOICECHAT] Successfully set remote description for ${data.from}`);
          } else {
            console.warn(`[VOICECHAT] Ignoring answer from ${data.from} - connection already in stable state`);
          }
        } catch (error) {
          console.error(`[VOICECHAT] Error setting remote description:`, error);
        }
      } else {
        console.warn(`[VOICECHAT] Received answer from unknown peer: ${data.from}`);
      }
    });
    
    // Handle ICE candidates
    this.socket.on(WebRTCEvents.ICE_CANDIDATE, (data: { candidate: RTCIceCandidateInit, from: string }) => {
      console.log(`[VOICECHAT] Received ICE candidate from ${data.from}`);
      const peer = this.peers.get(data.from);
      if (peer && data.candidate) {
        peer.peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
          .then(() => console.log(`[VOICECHAT] Successfully added ICE candidate from ${data.from}`))
          .catch(error => console.error(`[VOICECHAT] Error adding ice candidate:`, error));
      } else {
        console.warn(`[VOICECHAT] Could not find peer for ICE candidate: ${data.from}`);
      }
    });
  }
  
  /**
   * Toggle audio connection on/off
   */
  public async toggleAudio(): Promise<boolean> {
    if (this.localAudioEnabled) {
      console.log(`[VOICECHAT] Stopping audio`);
      this.stopAudio();
      return false;
    } else {
      try {
        console.log(`[VOICECHAT] Starting audio`);
        await this.startAudio();
        return true;
      } catch (error) {
        console.error(`[VOICECHAT] Error starting audio:`, error);
        return false;
      }
    }
  }
  
  /**
   * Start audio connection
   */
  private async startAudio(): Promise<void> {
    if (this.localAudioEnabled) {
      console.log(`[VOICECHAT] Audio already started`);
      return;
    }
    
    try {
      // Request microphone access
      console.log(`[VOICECHAT] Requesting microphone access...`);
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      
      console.log(`[VOICECHAT] Microphone access granted`);
      console.log(`[VOICECHAT] Audio tracks:`, this.localStream.getAudioTracks().length);
      
      // Log audio track constraints and settings
      const audioTracks = this.localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        const track = audioTracks[0];
        console.log(`[VOICECHAT] Audio track:`, {
          label: track.label,
          enabled: track.enabled,
          muted: track.muted,
          readyState: track.readyState,
          settings: track.getSettings()
        });
      }
      
      this.localAudioEnabled = true;
      
      // Notify server that we're joining the audio network
      console.log(`[VOICECHAT] Joining audio room for game ${this.gameId}`);
      this.socket.emit(WebRTCEvents.JOIN, this.gameId);
      
      // Add audio tracks to existing peer connections
      this.peers.forEach((peer, peerId) => {
        if (this.localStream) {
          console.log(`[VOICECHAT] Adding audio track to existing peer: ${peerId}`);
          const audioTrack = this.localStream.getAudioTracks()[0];
          peer.peerConnection.addTrack(audioTrack, this.localStream);
          peer.audioTrack = audioTrack;
        }
      });
      
      console.log(`[VOICECHAT] Audio started successfully`);
    } catch (error) {
      console.error(`[VOICECHAT] Error getting media stream:`, error);
      throw error;
    }
  }
  
  /**
   * Stop audio connection
   */
  private stopAudio(): void {
    if (!this.localAudioEnabled) {
      console.log(`[VOICECHAT] Audio already stopped`);
      return;
    }
    
    // Stop local audio tracks
    if (this.localStream) {
      console.log(`[VOICECHAT] Stopping local audio tracks`);
      this.localStream.getTracks().forEach(track => {
        console.log(`[VOICECHAT] Stopping track:`, track.label);
        track.stop();
      });
      this.localStream = null;
    }
    
    // Remove audio tracks from peer connections
    this.peers.forEach((peer, peerId) => {
      if (peer.audioTrack) {
        console.log(`[VOICECHAT] Removing audio track from peer: ${peerId}`);
        peer.peerConnection.getSenders().forEach(sender => {
          if (sender.track === peer.audioTrack) {
            peer.peerConnection.removeTrack(sender);
          }
        });
        peer.audioTrack = null;
      }
    });
    
    this.localAudioEnabled = false;
    
    // Notify server that we're leaving the audio network
    console.log(`[VOICECHAT] Leaving audio room for game ${this.gameId}`);
    this.socket.emit(WebRTCEvents.LEAVE, this.gameId);
    
    console.log(`[VOICECHAT] Audio stopped`);
  }
  
  /**
   * Handle incoming tracks
   */
  private handleRemoteTrack(event: RTCTrackEvent, peerId: string): void {
    console.log(`[VOICECHAT] Received audio track from ${peerId}`, event.streams);
    
    if (!event.streams || event.streams.length === 0) {
      console.warn(`[VOICECHAT] No streams in track event from ${peerId}`);
      return;
    }
    
    const stream = event.streams[0];
    
    // Create or reuse audio element
    let audioElement = this.audioElements.get(peerId);
    
    if (!audioElement) {
      console.log(`[VOICECHAT] Creating new audio element for ${peerId}`);
      audioElement = document.createElement('audio');
      audioElement.id = `voicechat-audio-${peerId}`;
      
      // Set attributes for maximum compatibility
      audioElement.setAttribute('autoplay', 'autoplay');
      audioElement.setAttribute('playsinline', 'playsinline');
      audioElement.volume = 1.0; // Maximum volume
      
      // Always add to document - needed for iOS and Safari
      document.body.appendChild(audioElement);
      
      // Style the element but make it visually hidden (not display:none which can affect playback)
      audioElement.style.position = 'absolute';
      audioElement.style.width = '1px';
      audioElement.style.height = '1px';
      audioElement.style.opacity = '0';
      audioElement.style.pointerEvents = 'none';
      
      // Store the element
      this.audioElements.set(peerId, audioElement);
      
      // Store in the peer connection object too
      const peer = this.peers.get(peerId);
      if (peer) {
        peer.audioElement = audioElement;
      }
    } else {
      console.log(`[VOICECHAT] Reusing existing audio element for ${peerId}`);
    }
    
    // Set the stream as source and enable it
    audioElement.srcObject = stream;
    audioElement.muted = false;
    
    // Play audio with robust error handling
    this.playAudioElement(audioElement, peerId);
    
    // Monitor audio levels to confirm sound is coming through
    this.monitorAudioLevels(stream, peerId);
  }
  
  /**
   * Play an audio element with robust error handling
   */
  private playAudioElement(audioElement: HTMLAudioElement, peerId: string): void {
    console.log(`[VOICECHAT] Attempting to play audio from ${peerId}`);
    
    const playPromise = audioElement.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log(`[VOICECHAT] Audio from ${peerId} playing successfully`);
        
        // Double-check audio settings are correct
        if (audioElement.muted) {
          console.warn(`[VOICECHAT] Audio element was muted, unmuting`);
          audioElement.muted = false;
        }
        
        if (audioElement.volume < 0.5) {
          console.warn(`[VOICECHAT] Audio volume was low (${audioElement.volume}), increasing`);
          audioElement.volume = 1.0;
        }
        
        console.log(`[VOICECHAT] Audio element status for ${peerId}:`, {
          volume: audioElement.volume,
          muted: audioElement.muted,
          paused: audioElement.paused,
          currentTime: audioElement.currentTime,
          readyState: audioElement.readyState,
          networkState: audioElement.networkState,
          srcObject: audioElement.srcObject ? 'set' : 'null'
        });
        
        // Play a test sound to confirm audio system is working
        this.playTestSound();
        
      }).catch(error => {
        console.error(`[VOICECHAT] Error playing audio from ${peerId}:`, error);
        
        // Try to recover by triggering user interaction
        if (!document.getElementById('voicechat-recovery-button')) {
          this.createAudioRecoveryButton();
        }
      });
    } else {
      console.warn(`[VOICECHAT] Play promise was undefined, audio may not play`);
    }
  }
  
  /**
   * Create a recovery button to help with autoplay issues
   */
  private createAudioRecoveryButton(): void {
    console.log(`[VOICECHAT] Creating audio recovery button`);
    
    const button = document.createElement('button');
    button.id = 'voicechat-recovery-button';
    button.innerText = 'Enable Voice Chat';
    
    Object.assign(button.style, {
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      zIndex: '9999',
      padding: '10px 15px',
      background: 'rgba(76, 175, 80, 0.8)',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px'
    });
    
    button.onclick = () => {
      console.log(`[VOICECHAT] Recovery button clicked, attempting to play all audio elements`);
      
      // Try to play all audio elements
      this.audioElements.forEach((audio, peerId) => {
        this.playAudioElement(audio, peerId);
      });
      
      // Play a test sound
      this.playTestSound();
      
      // Remove the button
      document.body.removeChild(button);
    };
    
    document.body.appendChild(button);
  }
  
  /**
   * Monitor audio levels from a stream to confirm sound is being received
   */
  private monitorAudioLevels(stream: MediaStream, peerId: string): void {
    try {
      console.log(`[VOICECHAT] Setting up audio level monitoring for ${peerId}`);
      
      // Create audio context and analyzer
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;
      
      // Connect stream to analyzer
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyzer);
      
      // Don't connect to destination - that would create a feedback loop
      // source.connect(audioContext.destination);
      
      // Create buffer for analyzer data
      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      
      // Check levels every second
      const checkInterval = setInterval(() => {
        // Get current volume data
        analyzer.getByteFrequencyData(dataArray);
        
        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        
        // Log if we have significant audio
        if (average > 10) {
          console.log(`[VOICECHAT] Receiving audio from ${peerId}, level: ${average.toFixed(2)}`);
        }
        
        // Stop monitoring if peer connection is gone
        if (!this.peers.has(peerId)) {
          console.log(`[VOICECHAT] Stopping audio monitoring for ${peerId} (peer disconnected)`);
          clearInterval(checkInterval);
        }
      }, 1000);
    } catch (error) {
      console.error(`[VOICECHAT] Error setting up audio monitoring:`, error);
    }
  }
  
  /**
   * Create peer connection to another player
   * @param peerId ID of the player to connect to
   */
  private createPeerConnection(peerId: string): RTCPeerConnection {
    // Check if we already have a connection to this peer
    if (this.peers.has(peerId)) {
      console.log(`[VOICECHAT] Using existing peer connection for ${peerId}`);
      return this.peers.get(peerId)!.peerConnection;
    }

    console.log(`[VOICECHAT] Creating new peer connection for ${peerId}`);
    
    // Create a new RTCPeerConnection
    const peerConnection = new RTCPeerConnection(this.rtcConfig);
    console.log(`[VOICECHAT] RTCPeerConnection created:`, peerConnection);
    
    // Add the peer to our map
    this.peers.set(peerId, { peerConnection, audioTrack: null });
    
    // Add local audio tracks if available
    if (this.localStream) {
      console.log(`[VOICECHAT] Adding local audio track to peer: ${peerId}`);
      const audioTrack = this.localStream.getAudioTracks()[0];
      peerConnection.addTrack(audioTrack, this.localStream);
      this.peers.get(peerId)!.audioTrack = audioTrack;
    }
    
    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(`[VOICECHAT] Generated ICE candidate for ${peerId}`);
        this.socket.emit(WebRTCEvents.ICE_CANDIDATE, {
          to: peerId,
          candidate: event.candidate
        });
      }
    };
    
    // Log connection state changes
    peerConnection.onconnectionstatechange = () => {
      console.log(`[VOICECHAT] Connection state changed for ${peerId}:`, peerConnection.connectionState);
    };
    
    peerConnection.onicecandidateerror = (event) => {
      console.error(`[VOICECHAT] ICE candidate error for ${peerId}:`, event);
    };
    
    peerConnection.oniceconnectionstatechange = () => {
      console.log(`[VOICECHAT] ICE connection state for ${peerId}:`, peerConnection.iceConnectionState);
      
      if (peerConnection.iceConnectionState === 'connected' || 
          peerConnection.iceConnectionState === 'completed') {
        console.log(`[VOICECHAT] WebRTC connection established with ${peerId}`);
      }
    };
    
    // Handle incoming tracks - use our new handler method
    peerConnection.ontrack = (event) => {
      this.handleRemoteTrack(event, peerId);
    };
    
    // Log state changes for debugging
    peerConnection.onsignalingstatechange = () => {
      console.log(`[VOICECHAT] Signaling state changed for ${peerId}:`, peerConnection.signalingState);
    };
    
    // Create and send an offer if we are starting the connection
    // Only create an offer if we have local audio enabled
    if (this.localAudioEnabled) {
      console.log(`[VOICECHAT] Creating offer for ${peerId} (local audio enabled)`);
      this.createOffer(peerId, peerConnection);
    } else {
      console.log(`[VOICECHAT] Not creating offer for ${peerId} (local audio disabled)`);
    }
    
    return peerConnection;
  }
  
  /**
   * Create and send an offer to a peer
   * @param peerId ID of the player to send the offer to
   * @param peerConnection RTCPeerConnection to use
   */
  private async createOffer(peerId: string, peerConnection: RTCPeerConnection): Promise<void> {
    try {
      console.log(`[VOICECHAT] Creating offer for ${peerId}`);
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false
      });
      
      console.log(`[VOICECHAT] Setting local description for ${peerId}`);
      await peerConnection.setLocalDescription(offer);
      
      console.log(`[VOICECHAT] Sending offer to ${peerId}`);
      this.socket.emit(WebRTCEvents.OFFER, {
        to: peerId,
        offer: offer
      });
    } catch (error) {
      console.error(`[VOICECHAT] Error creating offer:`, error);
    }
  }
  
  /**
   * Handle incoming offer from a peer
   * @param offer The WebRTC offer
   * @param peerId ID of the player who sent the offer
   */
  private async handleOffer(offer: RTCSessionDescriptionInit, peerId: string): Promise<void> {
    try {
      console.log(`[VOICECHAT] Handling offer from ${peerId}`);
      let peerConnection = this.peers.get(peerId)?.peerConnection;
      
      // If we don't have a connection to this peer yet, create one
      if (!peerConnection) {
        console.log(`[VOICECHAT] Creating new peer connection for offer from ${peerId}`);
        peerConnection = this.createPeerConnection(peerId);
      }
      
      // Check connection state before setting remote description
      if (peerConnection.signalingState === 'stable') {
        // Set the remote description
        console.log(`[VOICECHAT] Setting remote description for ${peerId}`);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        
        // Create and send an answer
        console.log(`[VOICECHAT] Creating answer for ${peerId}`);
        const answer = await peerConnection.createAnswer();
        
        console.log(`[VOICECHAT] Setting local description for ${peerId}`);
        await peerConnection.setLocalDescription(answer);
        
        console.log(`[VOICECHAT] Sending answer to ${peerId}`);
        this.socket.emit(WebRTCEvents.ANSWER, {
          to: peerId,
          answer: answer
        });
        
        console.log(`[VOICECHAT] Successfully sent answer to ${peerId}`);
      } else {
        console.warn(`[VOICECHAT] Cannot handle offer from ${peerId} - connection not in stable state (${peerConnection.signalingState})`);
      }
    } catch (error) {
      console.error(`[VOICECHAT] Error handling offer:`, error);
    }
  }
  
  /**
   * Remove peer connection
   * @param peerId ID of the player to disconnect from
   */
  private removePeerConnection(peerId: string): void {
    console.log(`[VOICECHAT] Removing peer connection to ${peerId}`);
    const peer = this.peers.get(peerId);
    if (peer) {
      // Close the peer connection
      peer.peerConnection.close();
      
      // Remove audio element
      if (peer.audioElement) {
        console.log(`[VOICECHAT] Removing audio element for ${peerId}`);
        if (document.body.contains(peer.audioElement)) {
          document.body.removeChild(peer.audioElement);
        }
      }
      
      // Remove from audio elements map
      this.audioElements.delete(peerId);
      
      // Remove from peers map
      this.peers.delete(peerId);
      console.log(`[VOICECHAT] Removed peer connection to ${peerId}`);
    }
  }
  
  /**
   * Play a test sound to verify audio is working
   */
  private playTestSound(): void {
    try {
      console.log(`[VOICECHAT] Playing test sound`);
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Low volume
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        console.log(`[VOICECHAT] Test sound completed`);
      }, 200); // Short beep
    } catch (error) {
      console.error(`[VOICECHAT] Error playing test sound:`, error);
    }
  }
  
  /**
   * Clean up resources when shutting down
   */
  public cleanup(): void {
    console.log(`[VOICECHAT] Cleaning up resources`);
    this.stopAudio();
    
    // Close all peer connections
    this.peers.forEach((peer, peerId) => {
      console.log(`[VOICECHAT] Closing peer connection to ${peerId}`);
      peer.peerConnection.close();
      
      // Remove audio element if it was added to the document
      if (peer.audioElement && document.body.contains(peer.audioElement)) {
        document.body.removeChild(peer.audioElement);
      }
    });
    
    // Clear maps
    this.peers.clear();
    this.audioElements.clear();
    
    console.log(`[VOICECHAT] Cleanup complete`);
  }
} 