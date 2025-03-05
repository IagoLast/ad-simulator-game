import { Server, Socket } from 'socket.io';
import { EntityType, Exit, GameState, MapData, PlayerMovement, PlayerState, SocketEvents } from '../../shared/types';
import { MapGenerator } from './MapGenerator';

/**
 * GameServer handles all the game logic and player connections
 */
export class GameServer {
  private io: Server;
  private gameState: GameState;
  private players: Map<string, PlayerState>;
  private mapGenerator: MapGenerator;
  private mapData: MapData;
  private teamCounts: Map<number, number> = new Map();
  private teamColors: Map<number, string> = new Map();
  private teamExits: Map<number, { position: { x: number, y: number, z: number } }> = new Map();
  
  /**
   * Create a new GameServer instance
   * @param io Socket.io server instance
   */
  constructor(io: Server) {
    this.io = io;
    this.players = new Map();
    
    // Initialize map generator and create the map
    this.mapGenerator = new MapGenerator();
    this.mapData = this.mapGenerator.generateMap();
    
    // Initialize game state with map
    this.gameState = {
      players: [],
      map: this.mapData
    };
    
    // Initialize team colors
    this.teamColors.set(1, '#FF3333'); // Red for team 1
    this.teamColors.set(2, '#3333FF'); // Blue for team 2
    
    // Initialize team counts
    this.teamCounts.set(1, 0);
    this.teamCounts.set(2, 0);
    
    // Find exit positions for spawning
    this.findTeamExits();
  }

  /**
   * Find and store exit positions for team spawns
   */
  private findTeamExits(): void {
    const entities = this.mapData.entities;
    
    for (const entity of entities) {
      if (entity.type === EntityType.EXIT && entity.teamId) {
        this.teamExits.set(entity.teamId, {
          position: { 
            x: entity.position.x, 
            y: entity.position.y + 0.5, // Spawn slightly above the exit to avoid Z-fighting
            z: entity.position.z 
          }
        });
      }
    }
    
    // Log exit positions
    console.log('Team exits found:', this.teamExits);
  }

  /**
   * Initialize the server and set up event handlers
   */
  public initialize(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Player connected: ${socket.id}`);
      
      // Assign player to a team (alternating between teams to keep them balanced)
      const teamId = this.assignTeam();
      console.log(`Assigning player ${socket.id} to team ${teamId}`);
      
      // Get team color
      const color = this.teamColors.get(teamId) || '#FFFFFF';
      
      // Get spawn position from team exit
      const teamExit = this.teamExits.get(teamId);
      const spawnPosition = teamExit ? 
        { ...teamExit.position } : 
        { x: 0, y: 0, z: 0 }; // Fallback if no exit found
      
      // Create a new player
      const player: PlayerState = {
        id: socket.id,
        position: spawnPosition,
        rotation: { x: 0, y: 0 },
        color,
        teamId
      };
      
      // Add player to game state
      this.players.set(socket.id, player);
      this.updateGameState();
      
      // Broadcast to other players that a new player has joined
      socket.broadcast.emit(SocketEvents.PLAYER_JOINED, player);
      
      // Send the current game state to the new player
      socket.emit(SocketEvents.GAME_STATE, this.gameState);
      
      // Also send map data separately for easier processing
      socket.emit(SocketEvents.MAP_DATA, this.mapData);
      
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
        
        // Remove player from game state and update team count
        const player = this.players.get(socket.id);
        if (player) {
          // Decrease team count
          const teamCount = this.teamCounts.get(player.teamId) || 0;
          this.teamCounts.set(player.teamId, Math.max(0, teamCount - 1));
          
          // Remove player
          this.players.delete(socket.id);
          this.updateGameState();
          
          // Notify other players about the disconnection
          this.io.emit(SocketEvents.PLAYER_LEFT, socket.id);
        }
      });
    });
  }
  
  /**
   * Assign a team to the player to keep teams balanced
   * @returns The team ID (1 or 2) the player is assigned to
   */
  private assignTeam(): number {
    const team1Count = this.teamCounts.get(1) || 0;
    const team2Count = this.teamCounts.get(2) || 0;
    
    // Assign to the team with fewer players
    let teamId: number;
    if (team1Count <= team2Count) {
      teamId = 1;
      this.teamCounts.set(1, team1Count + 1);
    } else {
      teamId = 2;
      this.teamCounts.set(2, team2Count + 1);
    }
    
    return teamId;
  }
  
  /**
   * Update the game state from the players map
   */
  private updateGameState(): void {
    this.gameState.players = Array.from(this.players.values());
  }
} 