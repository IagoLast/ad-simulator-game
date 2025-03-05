export interface PlayerState {
    id: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        y: number;
    };
    color: string;
}
export interface GameState {
    players: {
        [id: string]: PlayerState;
    };
}
export declare enum SocketEvents {
    JOIN = "join",
    PLAYER_JOINED = "player_joined",
    PLAYER_LEFT = "player_left",
    PLAYER_MOVED = "player_moved",
    GAME_STATE = "game_state"
}
export interface PlayerMovement {
    playerId: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        y: number;
    };
}
//# sourceMappingURL=types.d.ts.map