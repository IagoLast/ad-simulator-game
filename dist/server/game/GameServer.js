"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameServer = void 0;
const types_1 = require("../../shared/types");
class GameServer {
    constructor(io) {
        this.io = io;
        this.players = new Map();
        this.gameState = {
            players: []
        };
    }
    initialize() {
        this.io.on('connection', (socket) => {
            console.log(`Player connected: ${socket.id}`);
            const color = this.getRandomColor();
            const player = {
                id: socket.id,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0 },
                color
            };
            this.players.set(socket.id, player);
            this.updateGameState();
            socket.broadcast.emit(types_1.SocketEvents.PLAYER_JOINED, player);
            socket.emit(types_1.SocketEvents.GAME_STATE, this.gameState);
            socket.on(types_1.SocketEvents.PLAYER_MOVED, (movement) => {
                const player = this.players.get(socket.id);
                if (player) {
                    player.position = movement.position;
                    player.rotation = movement.rotation;
                    socket.broadcast.emit(types_1.SocketEvents.PLAYER_MOVED, {
                        playerId: socket.id,
                        position: movement.position,
                        rotation: movement.rotation
                    });
                }
            });
            socket.on('disconnect', () => {
                console.log(`Player disconnected: ${socket.id}`);
                if (this.players.has(socket.id)) {
                    this.players.delete(socket.id);
                    this.updateGameState();
                    this.io.emit(types_1.SocketEvents.PLAYER_LEFT, socket.id);
                }
            });
        });
    }
    updateGameState() {
        this.gameState.players = Array.from(this.players.values());
    }
    getRandomColor() {
        const colors = [
            '#FF5733',
            '#33FF57',
            '#3357FF',
            '#FF33F5',
            '#F5FF33',
            '#33FFF5',
            '#FF8333',
            '#8333FF'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}
exports.GameServer = GameServer;
//# sourceMappingURL=GameServer.js.map