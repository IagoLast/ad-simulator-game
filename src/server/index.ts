import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { GameServer } from './game/GameServer';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Log server startup information
console.log('Server starting up...');
console.log('Environment:', process.env.NODE_ENV || 'development');

// Serve static files from the dist/public directory
app.use(express.static(path.join(__dirname, '../public')));

// Add a basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Add root route for debugging
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Create the game server instance
const gameServer = new GameServer(io);

// Handle connections
gameServer.initialize();

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started successfully`);
  console.log(`Server listening on port ${PORT}`);
  console.log(`Environment variables: PORT=${process.env.PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser to play locally`);
}); 