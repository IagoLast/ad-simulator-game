import { Server } from 'socket.io';
export declare class GameServer {
    private io;
    private gameState;
    constructor(io: Server);
    initialize(): void;
    private getRandomColor;
}
//# sourceMappingURL=GameServer.d.ts.map