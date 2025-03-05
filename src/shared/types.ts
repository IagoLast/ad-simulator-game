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
}

/**
 * Game state containing all players
 */
export interface GameState {
  players: PlayerState[];
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