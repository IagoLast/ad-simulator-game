import { Namespace, Socket } from 'socket.io';
import { WebRTCEvents } from '../../shared/types';

/**
 * WebRTCSignalingHandler manages WebRTC signaling on the server
 */
export class WebRTCSignalingHandler {
  private namespace: Namespace;
  private audioRooms: Map<string, Set<string>> = new Map();
  
  /**
   * Create a new WebRTC signaling handler
   * @param namespace Socket.io namespace
   */
  constructor(namespace: Namespace) {
    this.namespace = namespace;
    this.setupSocketEvents();
  }
  
  /**
   * Setup socket events for WebRTC signaling
   */
  private setupSocketEvents(): void {
    this.namespace.on('connection', (socket: Socket) => {
      // Handle player joining an audio room
      socket.on(WebRTCEvents.JOIN, (gameId: string) => {
        this.joinAudioRoom(socket, gameId);
      });
      
      // Handle player leaving an audio room
      socket.on(WebRTCEvents.LEAVE, (gameId: string) => {
        this.leaveAudioRoom(socket, gameId);
      });
      
      // Handle WebRTC offers
      socket.on(WebRTCEvents.OFFER, (data: { to: string, offer: RTCSessionDescriptionInit }) => {
        this.namespace.to(data.to).emit(WebRTCEvents.OFFER, {
          offer: data.offer,
          from: socket.id
        });
      });
      
      // Handle WebRTC answers
      socket.on(WebRTCEvents.ANSWER, (data: { to: string, answer: RTCSessionDescriptionInit }) => {
        this.namespace.to(data.to).emit(WebRTCEvents.ANSWER, {
          answer: data.answer,
          from: socket.id
        });
      });
      
      // Handle ICE candidates
      socket.on(WebRTCEvents.ICE_CANDIDATE, (data: { to: string, candidate: RTCIceCandidateInit }) => {
        this.namespace.to(data.to).emit(WebRTCEvents.ICE_CANDIDATE, {
          candidate: data.candidate,
          from: socket.id
        });
      });
      
      // Handle disconnection
      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });
    });
  }
  
  /**
   * Handle a player joining an audio room
   * @param socket Player's socket
   * @param gameId Game room ID
   */
  private joinAudioRoom(socket: Socket, gameId: string): void {
    // Create the room if it doesn't exist
    if (!this.audioRooms.has(gameId)) {
      this.audioRooms.set(gameId, new Set<string>());
    }
    
    // Get the room participants
    const room = this.audioRooms.get(gameId)!;
    
    // Notify all existing participants about the new player
    room.forEach(participantId => {
      // Don't send to the player themselves
      if (participantId !== socket.id) {
        this.namespace.to(participantId).emit(WebRTCEvents.NEW_PLAYER, socket.id);
      }
    });
    
    // Notify the new player about all existing participants
    room.forEach(participantId => {
      // Don't send about the player themselves
      if (participantId !== socket.id) {
        socket.emit(WebRTCEvents.NEW_PLAYER, participantId);
      }
    });
    
    // Add the player to the room
    room.add(socket.id);
    console.log(`Player ${socket.id} joined audio room ${gameId}`);
  }
  
  /**
   * Handle a player leaving an audio room
   * @param socket Player's socket
   * @param gameId Game room ID
   */
  private leaveAudioRoom(socket: Socket, gameId: string): void {
    if (this.audioRooms.has(gameId)) {
      const room = this.audioRooms.get(gameId)!;
      
      // Remove the player from the room
      room.delete(socket.id);
      
      // Notify all remaining participants that the player left
      room.forEach(participantId => {
        this.namespace.to(participantId).emit(WebRTCEvents.PLAYER_LEFT, socket.id);
      });
      
      // Clean up empty rooms
      if (room.size === 0) {
        this.audioRooms.delete(gameId);
      }
      
      console.log(`Player ${socket.id} left audio room ${gameId}`);
    }
  }
  
  /**
   * Handle a player disconnecting
   * @param socket Player's socket
   */
  private handleDisconnect(socket: Socket): void {
    // Find all rooms the player is in and remove them
    this.audioRooms.forEach((participants, gameId) => {
      if (participants.has(socket.id)) {
        this.leaveAudioRoom(socket, gameId);
      }
    });
  }
} 