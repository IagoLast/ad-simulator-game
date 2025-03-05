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
}

/**
 * Entity types in the game
 */
export enum EntityType {
  WALL = 'wall',
  EXIT = 'exit'
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
}

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