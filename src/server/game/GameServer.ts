import { Server, Socket } from 'socket.io';
import { GameState, PlayerMovement, PlayerState, SocketEvents } from '../../shared/types';

/**
 * GameServer handles all the game logic and player connections
 */
export class GameServer {
  private io: Server;
  private gameState: GameState;
  private players: Map<string, PlayerState>;
  
  /**
   * Create a new GameServer instance
   * @param io Socket.io server instance
   */
  constructor(io: Server) {
    this.io = io;
    this.players = new Map();
    this.gameState = {
      players: []
    };
  }

  /**
   * Initialize the server and set up event handlers
   */
  public initialize(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Player connected: ${socket.id}`);
      
      // Generate a random color for the player
      const color = this.getRandomColor();
      
      // Create a new player
      const player: PlayerState = {
        id: socket.id,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0 },
        color
      };
      
      // Add player to game state
      this.players.set(socket.id, player);
      this.updateGameState();
      
      // Broadcast to other players that a new player has joined
      socket.broadcast.emit(SocketEvents.PLAYER_JOINED, player);
      
      // Send the current game state to the new player
      socket.emit(SocketEvents.GAME_STATE, this.gameState);
      
      // Handle player movement
      socket.on(SocketEvents.PLAYER_MOVED, (movement: PlayerMovement) => {
        const player = this.players.get(socket.id);
        if (player) {
          // Update player position and rotation
          player.position = movement.position;
          player.rotation = movement.rotation;
          
          // Broadcast player movement to all other players
          socket.broadcast.emit(SocketEvents.PLAYER_MOVED, {
            playerId: socket.id,
            position: movement.position,
            rotation: movement.rotation
          });
        }
      });
      
      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
        
        // Remove player from game state
        if (this.players.has(socket.id)) {
          this.players.delete(socket.id);
          this.updateGameState();
          
          // Notify other players about the disconnection
          this.io.emit(SocketEvents.PLAYER_LEFT, socket.id);
        }
      });
    });
  }
  
  /**
   * Update the game state from the players map
   */
  private updateGameState(): void {
    this.gameState.players = Array.from(this.players.values());
  }
  
  /**
   * Generate a random color for a player
   * @returns A random color in hex format
   */
  private getRandomColor(): string {
    const colors = [
      '#FF5733', // Red
      '#33FF57', // Green
      '#3357FF', // Blue
      '#FF33F5', // Pink
      '#F5FF33', // Yellow
      '#33FFF5', // Cyan
      '#FF8333', // Orange
      '#8333FF'  // Purple
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  }
} 