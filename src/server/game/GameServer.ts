import { Server, Socket, Namespace } from "socket.io";
import {
  EntityType,
  Exit,
  GameState,
  HitEvent,
  MapData,
  PlayerMovement,
  PlayerState,
  ShootEvent,
  SocketEvents,
  WeaponType,
  WeaponConfig,
} from "../../shared/types";
import { MapGenerator } from "./MapGenerator";

/**
 * Projectile class for server-side physics simulation
 */
class Projectile {
  public id: string;
  public shooterId: string;
  public teamId: number;
  public position: { x: number; y: number; z: number };
  public velocity: { x: number; y: number; z: number };
  public speed: number;
  public damage: number;
  public timestamp: number;
  public gravity: number = 9.8; // Changed from private to public for accessibility

  constructor(
    id: string,
    shooterId: string,
    teamId: number,
    position: { x: number; y: number; z: number },
    direction: { x: number; y: number; z: number },
    speed: number,
    damage: number
  ) {
    this.id = id;
    this.shooterId = shooterId;
    this.teamId = teamId;
    this.position = { ...position };

    // Calculate velocity from direction and speed
    const length = Math.sqrt(
      direction.x ** 2 + direction.y ** 2 + direction.z ** 2
    );
    const normalizedDirection = {
      x: direction.x / length,
      y: direction.y / length,
      z: direction.z / length,
    };

    this.velocity = {
      x: normalizedDirection.x * speed,
      y: normalizedDirection.y * speed,
      z: normalizedDirection.z * speed,
    };

    this.speed = speed;
    this.damage = damage;
    this.timestamp = Date.now();
  }

  /**
   * Update projectile position based on time passed
   * @param deltaTime Time passed in seconds
   */
  update(deltaTime: number): void {
    // Apply gravity to Y velocity
    this.velocity.y -= this.gravity * deltaTime;

    // Update position based on velocity
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    this.position.z += this.velocity.z * deltaTime;

    // Prevent projectiles from going below ground
    if (this.position.y < 0.1) {
      this.position.y = 0.1;
      this.velocity.y = 0; // Stop vertical movement
    }
  }
}

/**
 * GameServer handles all the game logic and player connections
 */
export class GameServer {
  private io: Server | Namespace;
  private gameState: GameState;
  private players: Map<string, PlayerState>;
  private mapGenerator: MapGenerator;
  private mapData: MapData;
  private teamCounts: Map<number, number> = new Map();
  private teamColors: Map<number, string> = new Map();
  private teamExits: Map<
    number,
    { position: { x: number; y: number; z: number } }
  > = new Map();
  private flagCarrier: string | null = null;
  private gameOver: boolean = false;
  private winningTeam: number | null = null;
  private restartTimeout: NodeJS.Timeout | null = null;
  private projectiles: Projectile[] = [];
  private lastProjectileId: number = 0;
  private respawnTimeouts: Map<string, NodeJS.Timeout> = new Map();
  private lastUpdate: number = Date.now();
  private flagDropTime: number | null = null;
  private flagCooldownPeriod: number = 3000; // 3 seconds cooldown

  /**
   * Create a new GameServer instance
   * @param io Socket.io server or namespace instance
   */
  constructor(io: Server | Namespace) {
    this.io = io;
    this.players = new Map();

    // Initialize map generator and create the map
    this.mapGenerator = new MapGenerator();
    this.mapData = this.mapGenerator.generateMap();

    // Initialize game state with map
    this.gameState = {
      players: [],
      map: this.mapData,
    };

    // Initialize team colors
    this.teamColors.set(1, "#FF3333"); // Red for team 1
    this.teamColors.set(2, "#3333FF"); // Blue for team 2

    // Initialize team counts
    this.teamCounts.set(1, 0);
    this.teamCounts.set(2, 0);

    // Find exit positions for spawning
    this.findTeamExits();

    // Start physics update loop
    setInterval(this.updatePhysics.bind(this), 16); // ~60 updates per second
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
            z: entity.position.z,
          },
        });
      }
    }

    // Log exit positions
    console.log("Team exits found:", this.teamExits);
  }

  /**
   * Update physics simulation (projectiles, collisions, etc.)
   */
  private updatePhysics(): void {
    const now = Date.now();
    const deltaTime = (now - this.lastUpdate) / 1000; // Convert to seconds
    this.lastUpdate = now;

    // Skip large time jumps
    if (deltaTime > 0.1) {
      return;
    }

    // Update projectiles
    this.updateProjectiles(deltaTime);
  }

  /**
   * Update all projectiles and check for collisions
   */
  private updateProjectiles(deltaTime: number): void {
    const projectilesToRemove: string[] = [];

    // Maximum projectile lifetime in milliseconds
    const maxLifetime = 5000;
    const now = Date.now();

    // Update each projectile
    for (const projectile of this.projectiles) {
      // Check if projectile is too old
      if (now - projectile.timestamp > maxLifetime) {
        projectilesToRemove.push(projectile.id);
        continue;
      }

      // Update position
      projectile.update(deltaTime);

      // Check for collisions with walls (simple check against map bounds)
      const mapWidth = this.mapData.width;
      const mapHeight = this.mapData.height;

      if (
        projectile.position.x < -mapWidth / 2 ||
        projectile.position.x > mapWidth / 2 ||
        projectile.position.z < -mapHeight / 2 ||
        projectile.position.z > mapHeight / 2 ||
        projectile.position.y < 0 ||
        projectile.position.y > 10
      ) {
        projectilesToRemove.push(projectile.id);
        continue;
      }

      // Check for collisions with players
      for (const [playerId, playerState] of this.players.entries()) {
        // Skip if player is the shooter or from the same team, or if player is dead
        if (
          playerId === projectile.shooterId ||
          playerState.teamId === projectile.teamId ||
          playerState.isDead
        ) {
          continue;
        }

        // Simple distance-based collision check
        const dx = projectile.position.x - playerState.position.x;
        const dy = projectile.position.y - playerState.position.y;
        const dz = projectile.position.z - playerState.position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // If collision detected - increased collision radius for better hit detection
        if (distance < 1.5) {
          // Increased from 1.0 to 1.5 for better hit detection
          // Handle hit
          this.handlePlayerHit(projectile, playerId);

          // Remove projectile
          projectilesToRemove.push(projectile.id);
          break;
        }
      }
    }

    // Remove destroyed projectiles
    if (projectilesToRemove.length > 0) {
      this.projectiles = this.projectiles.filter(
        (p) => !projectilesToRemove.includes(p.id)
      );
    }
  }

  /**
   * Handle a player being hit by a projectile
   */
  private handlePlayerHit(projectile: Projectile, targetId: string): void {
    const targetPlayer = this.players.get(targetId);
    const shooter = this.players.get(projectile.shooterId);

    if (!targetPlayer || !shooter) {
      return;
    }

    // Create hit event
    const hitEvent: HitEvent = {
      shooterId: projectile.shooterId,
      targetId: targetId,
      damage: projectile.damage,
      projectileId: projectile.id,
    };

    // Apply damage
    const newHealth = Math.max(0, targetPlayer.health - projectile.damage);
    targetPlayer.health = newHealth;

    // Check if player died
    if (newHealth <= 0 && !targetPlayer.isDead) {
      this.handlePlayerDeath(targetId, projectile.shooterId);
    }

    // Broadcast hit event to all players
    this.io.emit(SocketEvents.PLAYER_HIT, hitEvent);
  }

  /**
   * Handle player death
   */
  private handlePlayerDeath(playerId: string, killerId: string): void {
    const player = this.players.get(playerId);
    if (!player) return;

    // Mark player as dead
    player.isDead = true;

    // Drop flag if carrying
    if (this.flagCarrier === playerId) {
      // Drop flag at player's position
      this.handleFlagDrop(playerId, player.position);
    }

    // Set respawn time (5 seconds from now)
    const respawnTime = Date.now() + 5000;
    player.respawnTime = respawnTime;

    // Schedule respawn
    const respawnTimeout = setTimeout(() => {
      this.respawnPlayer(playerId);
    }, 5000);

    // Store timeout reference
    this.respawnTimeouts.set(playerId, respawnTimeout);

    // Update game state
    this.updateGameState();

    // Broadcast death event
    this.io.emit(SocketEvents.PLAYER_DIED, {
      playerId,
      killerId,
    });
  }

  /**
   * Respawn a player
   */
  private respawnPlayer(playerId: string): void {
    const player = this.players.get(playerId);
    if (!player) return;

    // Clear any existing timeout
    const timeout = this.respawnTimeouts.get(playerId);
    if (timeout) {
      clearTimeout(timeout);
      this.respawnTimeouts.delete(playerId);
    }

    // Reset player state
    player.isDead = false;
    player.health = 3; // Reset health
    player.respawnTime = undefined;

    // Respawn at team exit
    const teamExit = this.teamExits.get(player.teamId);
    if (teamExit) {
      player.position = { ...teamExit.position };
    }

    // Update game state
    this.updateGameState();

    // Broadcast respawn event
    this.io.emit(SocketEvents.PLAYER_RESPAWNED, {
      playerId,
      position: player.position,
    });
  }

  /**
   * Initialize the server and set up event handlers
   */
  public initialize(): void {
    this.io.on("connection", (socket: Socket) => {
      socket.on(SocketEvents.JOIN, () => {
        console.log(`Player connected: ${socket.id}`);

        // Assign player to a team (alternating between teams to keep them balanced)
        const teamId = this.assignTeam();
        console.log(`Assigning player ${socket.id} to team ${teamId}`);

        // Get team color
        const color = this.teamColors.get(teamId) || "#FFFFFF";

        // Get spawn position from team exit
        const teamExit = this.teamExits.get(teamId);
        const spawnPosition = teamExit
          ? { ...teamExit.position }
          : { x: 0, y: 0, z: 0 }; // Fallback if no exit found

        // Create a new player
        const player: PlayerState = {
          id: socket.id,
          position: spawnPosition,
          rotation: { x: 0, y: 0 },
          color,
          teamId,
          hasFlag: false,
          health: 3, // Start with 3 health
          isDead: false,
        };

        // Add player to game state
        this.players.set(socket.id, player);
        this.updateGameState();

        // Broadcast to other players that a new player has joined
        socket.broadcast.emit(SocketEvents.PLAYER_JOINED, player);

        // Send the current game to all players
        socket.broadcast.emit(SocketEvents.GAME_STATE, this.gameState);

        // Also send map data separately for easier processing
        socket.emit(SocketEvents.MAP_DATA, this.mapData);
      });

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
            rotation: movement.rotation,
          });
        }
      });

      // Handle player shooting
      socket.on(SocketEvents.PLAYER_SHOOT, (shootEvent: ShootEvent) => {
        const player = this.players.get(socket.id);
        if (!player || player.isDead) return;

        // Create a new projectile
        const projectileId = `${socket.id}_${++this.lastProjectileId}`;

        // Get weapon configuration
        const weaponSettings = WeaponConfig[shootEvent.weaponType];

        const projectile = new Projectile(
          projectileId,
          socket.id,
          player.teamId,
          shootEvent.position,
          shootEvent.direction,
          weaponSettings.speed,
          weaponSettings.damage
        );

        // Override gravity with configured value
        projectile.gravity = weaponSettings.gravity;

        // Add to projectiles list
        this.projectiles.push(projectile);

        // Broadcast projectile to all players
        this.io.emit(SocketEvents.PROJECTILE_CREATED, {
          id: projectileId,
          shooterId: socket.id,
          teamId: player.teamId,
          position: shootEvent.position,
          direction: shootEvent.direction,
          speed: projectile.speed,
          gravity: projectile.gravity,
          weaponType: shootEvent.weaponType,
        });
      });

      /**
       * TODO: THIS EVENTS SHOULD BE GENERATED BY THE SERVER ITSELF GIVEN THE CURRENT STATE OF THE GAME
       */

      // Handle flag capture
      socket.on(
        SocketEvents.FLAG_CAPTURED,
        (data: { playerId: string; teamId: number }) => {
          // Ignore if game is over or flag already captured
          if (this.gameOver || this.flagCarrier) return;

          // Flag can always be picked up - no cooldown
          console.log(
            `Player ${data.playerId} of team ${data.teamId} captured the flag`
          );

          // Reset flag drop time
          this.flagDropTime = null;

          // Update flag carrier
          this.flagCarrier = data.playerId;

          // Update player state to show they have the flag
          const player = this.players.get(data.playerId);
          if (player) {
            player.hasFlag = true;
            this.updateGameState();

            // Broadcast flag capture to all players
            this.io.emit(SocketEvents.FLAG_CAPTURED, {
              playerId: data.playerId,
              teamId: data.teamId,
            });
          }
        }
      );

      // Handle flag dropped
      socket.on(
        SocketEvents.FLAG_DROPPED,
        (data: {
          playerId: string;
          position: { x: number; y: number; z: number };
        }) => {
          if (this.gameOver) return; // Ignore if game is over

          console.log(
            `Player ${data.playerId} dropped the flag at position`,
            data.position
          );

          // Make sure the player is the flag carrier
          if (this.flagCarrier !== data.playerId) return;

          // Handle flag drop
          this.handleFlagDrop(data.playerId, data.position);
        }
      );

      // Handle flag return (team scored)
      socket.on(SocketEvents.FLAG_RETURNED, (teamId: number) => {
        console.log(
          `Player ${socket.id} attempting to return flag to team ${teamId} base`
        );

        if (this.gameOver) {
          console.log("Game is already over, ignoring flag return");
          return;
        }

        if (!this.flagCarrier) {
          console.log("No flag carrier found, ignoring flag return");
          return;
        }

        const player = this.players.get(socket.id);
        console.log("Player state:", JSON.stringify(player));
        console.log("Flag carrier:", this.flagCarrier);

        if (!player) {
          console.log("Player not found in players map");
          return;
        }

        if (!player.hasFlag) {
          console.log(
            "Player does not have the flag according to server state"
          );
          return;
        }

        if (player.teamId !== teamId) {
          console.log(
            `Team ID mismatch: player team ${player.teamId}, requested team ${teamId}`
          );
          return;
        }

        if (this.flagCarrier !== socket.id) {
          console.log(
            `Flag carrier mismatch: server has ${this.flagCarrier}, but request from ${socket.id}`
          );
          return;
        }

        console.log(
          `Team ${teamId} scored by returning the flag to their base`
        );

        // Set game as over with winning team
        this.gameOver = true;
        this.winningTeam = teamId;

        // Reset flag carrier status on player
        player.hasFlag = false;

        // Clear flag carrier
        this.flagCarrier = null;

        // Update game state
        this.updateGameState();

        // Broadcast flag return to all players
        this.io.emit(SocketEvents.FLAG_RETURNED, teamId);

        // Broadcast game over to all players
        this.io.emit(SocketEvents.GAME_OVER, { winningTeam: teamId });

        // Schedule game restart
        this.scheduleRestart();
      });

      /**
       * END TODO
       */

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log(`Player disconnected: ${socket.id}`);

        // Clear any respawn timeout
        const timeout = this.respawnTimeouts.get(socket.id);
        if (timeout) {
          clearTimeout(timeout);
          this.respawnTimeouts.delete(socket.id);
        }

        // Check if the disconnecting player was carrying the flag
        if (this.flagCarrier === socket.id) {
          this.flagCarrier = null;
          this.resetFlag();
        }

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

      // Add handler for request_map_data event
      socket.on("request_map_data", () => {
        console.log(`Player ${socket.id} requested map data refresh`);
        socket.emit(SocketEvents.MAP_DATA, this.mapData);
      });
    });
  }

  /**
   * Reset the flag when carrier disconnects
   */
  private resetFlag(): void {
    // Reset flag status in game state
    this.gameState.flagCarrier = undefined;

    // Let clients know to regenerate the flag
    this.io.emit(SocketEvents.MAP_DATA, this.mapData);
  }

  /**
   * Schedule a game restart after a team wins
   */
  private scheduleRestart(): void {
    // Cancel any existing timeout
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
    }

    // Schedule restart in 10 seconds
    this.restartTimeout = setTimeout(() => {
      this.restartGame();
    }, 10000);
  }

  /**
   * Restart the game with a new map
   */
  private restartGame(): void {
    console.log("Restarting game with new map");

    // Generate a new map
    this.mapData = this.mapGenerator.generateMap();

    // Reset game state
    this.gameOver = false;
    this.winningTeam = null;
    this.flagCarrier = null;

    // Clear all projectiles
    this.projectiles = [];

    // Reset all players (keep them on the same teams but move to spawn points)
    for (const [socketId, player] of this.players.entries()) {
      // Cancel any respawn timers
      const timeout = this.respawnTimeouts.get(socketId);
      if (timeout) {
        clearTimeout(timeout);
        this.respawnTimeouts.delete(socketId);
      }

      // Get spawn position for team
      const teamExit = this.teamExits.get(player.teamId);
      if (teamExit) {
        player.position = { ...teamExit.position };
      }

      // Reset player state
      player.isDead = false;
      player.health = 3;
      player.hasFlag = false;
      player.respawnTime = undefined;
    }

    // Update game state with new map
    this.gameState.map = this.mapData;
    this.updateGameState();

    // Find new team exits
    this.findTeamExits();

    // Notify all clients of game restart
    this.io.emit(SocketEvents.GAME_RESTART);

    // Send updated game state to all clients
    this.io.emit(SocketEvents.GAME_STATE, this.gameState);

    // Send map data separately
    this.io.emit(SocketEvents.MAP_DATA, this.mapData);
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
   * Update the game state and broadcast to all clients
   */
  private updateGameState(): void {
    // Update hasFlag property for all players based on flagCarrier
    this.players.forEach((player) => {
      player.hasFlag = player.id === this.flagCarrier;
    });

    this.gameState.players = Array.from(this.players.values());

    // Convert null to undefined for GameState properties that expect string | undefined
    this.gameState.flagCarrier =
      this.flagCarrier === null ? undefined : this.flagCarrier;

    // Set the game over state
    this.gameState.gameOver = this.gameOver;

    // Convert null to undefined for GameState properties that expect number | undefined
    this.gameState.winningTeam =
      this.winningTeam === null ? undefined : this.winningTeam;

    // Broadcast updated game state to all clients
    this.io.emit(SocketEvents.GAME_STATE, this.gameState);
  }

  /**
   * Handle player dropping the flag
   */
  private handleFlagDrop(
    playerId: string,
    position: { x: number; y: number; z: number }
  ): void {
    const player = this.players.get(playerId);
    if (!player) return;

    // Update flag carrier status
    this.flagCarrier = null;
    player.hasFlag = false;

    // Set flag drop time for cooldown
    this.flagDropTime = Date.now();

    // Update entities to add flag back to map at player's position
    let flagExists = false;
    for (const entity of this.mapData.entities) {
      if (entity.type === EntityType.FLAG) {
        // Update existing flag position
        entity.position = { ...position };
        flagExists = true;
        break;
      }
    }

    // If no flag exists in the map data (shouldn't happen), add it
    if (!flagExists) {
      this.mapData.entities.push({
        type: EntityType.FLAG,
        position: { ...position },
      });
    }

    // Update game state
    this.updateGameState();

    // Broadcast flag dropped to all players
    this.io.emit(SocketEvents.FLAG_DROPPED, {
      playerId,
      position,
    });

    // Also send updated map data so clients can see the flag
    this.io.emit(SocketEvents.MAP_DATA, this.mapData);
  }
}
