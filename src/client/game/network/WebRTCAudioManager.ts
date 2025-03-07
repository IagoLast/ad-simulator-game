import { Socket } from 'socket.io-client';
import { WebRTCEvents } from '../../../shared/types';

export interface PeerConnection {
  peerConnection: RTCPeerConnection;
  audioTrack: MediaStreamTrack | null;
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
    this.socket = socket;
    this.gameId = gameId;
    this.setupSocketEvents();
  }
  
  /**
   * Setup socket events for WebRTC signaling
   */
  private setupSocketEvents(): void {
    // Handle new player joining the audio network
    this.socket.on(WebRTCEvents.NEW_PLAYER, (playerId: string) => {
      console.log(`New player joined the audio network: ${playerId}`);
      this.createPeerConnection(playerId);
    });
    
    // Handle player leaving
    this.socket.on(WebRTCEvents.PLAYER_LEFT, (playerId: string) => {
      this.removePeerConnection(playerId);
    });
    
    // Handle incoming offers
    this.socket.on(WebRTCEvents.OFFER, async (data: { offer: RTCSessionDescriptionInit, from: string }) => {
      console.log(`Received offer from ${data.from}`);
      await this.handleOffer(data.offer, data.from);
    });
    
    // Handle incoming answers
    this.socket.on(WebRTCEvents.ANSWER, (data: { answer: RTCSessionDescriptionInit, from: string }) => {
      console.log(`Received answer from ${data.from}`);
      const peer = this.peers.get(data.from);
      if (peer) {
        peer.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer))
          .catch(error => console.error('Error setting remote description:', error));
      }
    });
    
    // Handle ICE candidates
    this.socket.on(WebRTCEvents.ICE_CANDIDATE, (data: { candidate: RTCIceCandidateInit, from: string }) => {
      console.log(`Received ICE candidate from ${data.from}`);
      const peer = this.peers.get(data.from);
      if (peer && data.candidate) {
        peer.peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
          .catch(error => console.error('Error adding ice candidate:', error));
      }
    });
  }
  
  /**
   * Toggle audio connection on/off
   */
  public async toggleAudio(): Promise<boolean> {
    if (this.localAudioEnabled) {
      this.stopAudio();
      return false;
    } else {
      try {
        await this.startAudio();
        return true;
      } catch (error) {
        console.error('Error starting audio:', error);
        return false;
      }
    }
  }
  
  /**
   * Start audio connection
   */
  private async startAudio(): Promise<void> {
    if (this.localAudioEnabled) return;
    
    try {
      // Request microphone access
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      
      this.localAudioEnabled = true;
      
      // Notify server that we're joining the audio network
      this.socket.emit(WebRTCEvents.JOIN, this.gameId);
      
      // Add audio tracks to existing peer connections
      this.peers.forEach((peer, peerId) => {
        if (this.localStream) {
          const audioTrack = this.localStream.getAudioTracks()[0];
          peer.peerConnection.addTrack(audioTrack, this.localStream);
          peer.audioTrack = audioTrack;
        }
      });
      
      console.log('Audio started successfully');
    } catch (error) {
      console.error('Error getting media stream:', error);
      throw error;
    }
  }
  
  /**
   * Stop audio connection
   */
  private stopAudio(): void {
    if (!this.localAudioEnabled) return;
    
    // Stop local audio tracks
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
    
    // Remove audio tracks from peer connections
    this.peers.forEach((peer) => {
      if (peer.audioTrack) {
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
    this.socket.emit(WebRTCEvents.LEAVE, this.gameId);
    
    console.log('Audio stopped');
  }
  
  /**
   * Create peer connection to another player
   * @param peerId ID of the player to connect to
   */
  private createPeerConnection(peerId: string): RTCPeerConnection {
    // Create a new RTCPeerConnection
    const peerConnection = new RTCPeerConnection(this.rtcConfig);
    
    // Add the peer to our map
    this.peers.set(peerId, { peerConnection, audioTrack: null });
    
    // Add local audio tracks if available
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      peerConnection.addTrack(audioTrack, this.localStream);
      this.peers.get(peerId)!.audioTrack = audioTrack;
    }
    
    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit(WebRTCEvents.ICE_CANDIDATE, {
          to: peerId,
          candidate: event.candidate
        });
      }
    };
    
    // Handle incoming tracks
    peerConnection.ontrack = (event) => {
      console.log(`Received audio track from ${peerId}`);
      // Create audio element and play remote stream
      const audioElement = new Audio();
      audioElement.srcObject = event.streams[0];
      audioElement.play().catch(error => console.error('Error playing audio:', error));
    };
    
    // Create and send an offer if we are starting the connection
    this.createOffer(peerId, peerConnection);
    
    return peerConnection;
  }
  
  /**
   * Create and send an offer to a peer
   * @param peerId ID of the player to send the offer to
   * @param peerConnection RTCPeerConnection to use
   */
  private async createOffer(peerId: string, peerConnection: RTCPeerConnection): Promise<void> {
    try {
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false
      });
      
      await peerConnection.setLocalDescription(offer);
      
      this.socket.emit(WebRTCEvents.OFFER, {
        to: peerId,
        offer: offer
      });
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  }
  
  /**
   * Handle incoming offer from a peer
   * @param offer The WebRTC offer
   * @param peerId ID of the player who sent the offer
   */
  private async handleOffer(offer: RTCSessionDescriptionInit, peerId: string): Promise<void> {
    let peerConnection = this.peers.get(peerId)?.peerConnection;
    
    // If we don't have a connection to this peer yet, create one
    if (!peerConnection) {
      peerConnection = this.createPeerConnection(peerId);
    }
    
    // Set the remote description
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    
    // Create and send an answer
    try {
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      
      this.socket.emit(WebRTCEvents.ANSWER, {
        to: peerId,
        answer: answer
      });
    } catch (error) {
      console.error('Error creating answer:', error);
    }
  }
  
  /**
   * Remove peer connection
   * @param peerId ID of the player to disconnect from
   */
  private removePeerConnection(peerId: string): void {
    const peer = this.peers.get(peerId);
    if (peer) {
      peer.peerConnection.close();
      this.peers.delete(peerId);
      console.log(`Removed peer connection to ${peerId}`);
    }
  }
  
  /**
   * Clean up resources when shutting down
   */
  public cleanup(): void {
    this.stopAudio();
    
    // Close all peer connections
    this.peers.forEach((peer) => {
      peer.peerConnection.close();
    });
    
    this.peers.clear();
  }
} 