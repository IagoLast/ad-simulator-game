/**
 * Player data structure used for state synchronization
 */
export interface PlayerState {
  id: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x?: number;
    y: number;
  };
  color: string;
  teamId: number; // Team 1 or Team 2
  hasFlag?: boolean; // Indicates if player is carrying the flag
  health: number; // Current health points
  isDead: boolean; // Whether the player is currently dead
  respawnTime?: number; // Timestamp when player should respawn (if dead)
}

/**
 * Entity types in the game
 */
export enum EntityType {
  WALL = 'wall',
  EXIT = 'exit',
  BILLBOARD = 'billboard',
  FLAG = 'flag',
  PROJECTILE = 'projectile'
}

/**
 * Base interface for all map entities
 */
export interface MapEntity {
  type: EntityType;
  position: {
    x: number;
    y: number;
    z: number;
  };
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  rotation?: {
    x: number;
    y: number;
    z: number;
  };
  teamId?: number; // Used for team-specific exits
}

/**
 * Wall entity with collision
 */
export interface Wall extends MapEntity {
  type: EntityType.WALL;
}

/**
 * Exit entity (goal for a team)
 */
export interface Exit extends MapEntity {
  type: EntityType.EXIT;
  teamId: number; // Required for exits
}

/**
 * Billboard entity with text
 */
export interface Billboard extends MapEntity {
  type: EntityType.BILLBOARD;
  text: string;
}

/**
 * Flag entity for capture the flag gameplay
 */
export interface Flag extends MapEntity {
  type: EntityType.FLAG;
  carrier?: string; // ID of the player carrying the flag, if any
}

/**
 * Projectile entity (bullet/paintball)
 */
export interface Projectile extends MapEntity {
  type: EntityType.PROJECTILE;
  shooterId: string; // ID of the player who shot
  teamId: number; // Team of the shooter
  velocity: {
    x: number;
    y: number;
    z: number;
  };
  color: string; // Color of the projectile (team color)
  timestamp: number; // When it was fired
}

/**
 * Map data containing all entities
 */
export interface MapData {
  width: number;
  height: number;
  entities: MapEntity[];
}

/**
 * Game state containing all players and map data
 */
export interface GameState {
  players: PlayerState[];
  map?: MapData;
  flagCarrier?: string; // ID of player carrying the flag
  gameOver?: boolean;
  winningTeam?: number;
}

/**
 * Weapon interface for different weapon types
 */
export interface Weapon {
  type: WeaponType;
  damage: number;
  fireRate: number; // Shots per second
  projectileSpeed: number;
  lastFired: number; // Timestamp of last shot
  ammo: number; // -1 for infinite
  maxAmmo: number;
}

/**
 * Weapon types available in the game
 */
export enum WeaponType {
  PAINTBALL_GUN = 'PAINTBALL_GUN'
}

/**
 * Weapon physics configuration
 * Used by both server and client to ensure consistent projectile behavior
 */
export const WeaponConfig = {
  [WeaponType.PAINTBALL_GUN]: {
    speed: 30,         // Projectile speed (units per second)
    gravity: 9.8,      // Gravity effect (units per second squared)
    damage: 1,         // Damage per hit
    cooldown: 0.5,     // Seconds between shots
    maxDistance: 50    // Maximum distance projectile can travel
  }
};

/**
 * Events sent between client and server
 */
export enum SocketEvents {
  JOIN = 'join',
  PLAYER_JOINED = 'player_joined',
  PLAYER_LEFT = 'player_left',
  PLAYER_MOVED = 'player_moved',
  GAME_STATE = 'game_state',
  MAP_DATA = 'map_data',
  FLAG_CAPTURED = 'flag_captured',
  FLAG_RETURNED = 'flag_returned',
  FLAG_DROPPED = 'flag_dropped',
  GAME_OVER = 'game_over',
  GAME_RESTART = 'game_restart',
  PLAYER_SHOOT = 'player_shoot',
  PROJECTILE_CREATED = 'projectile_created',
  PLAYER_HIT = 'player_hit',
  PLAYER_DIED = 'player_died',
  PLAYER_RESPAWNED = 'player_respawned'
}

/**
 * Player movement input data
 */
export interface PlayerMovement {
  playerId: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
  };
}

/**
 * Shoot event data
 */
export interface ShootEvent {
  playerId: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  direction: {
    x: number;
    y: number;
    z: number;
  };
  weaponType: WeaponType;
}

/**
 * Hit event data
 */
export interface HitEvent {
  shooterId: string;
  targetId: string;
  damage: number;
  projectileId?: string;
} 