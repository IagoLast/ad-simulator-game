import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { GameServer } from './game/GameServer';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the dist/public directory
app.use(express.static(path.join(__dirname, '../public')));

// Create the game server instance
const gameServer = new GameServer(io);

// Handle connections
gameServer.initialize();

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser to play`);
}); 