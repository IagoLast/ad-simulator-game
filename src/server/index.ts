import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { GameServer } from "./game/GameServer";

// Generar un ID único para esta instancia del servidor
const SERVER_INSTANCE_ID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const SERVER_START_TIME = new Date().toISOString();

const app = express();
const server = http.createServer(app);

// Configure Socket.IO with Docker-compatible options
const io = new Server(server, {
  transports: (process.env.SOCKET_TRANSPORTS || "websocket,polling").split(
    ","
  ) as any,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000, // Increase timeout for better connection stability
});

// Log server startup information
console.log("=".repeat(50));
console.log(`SERVER INSTANCE STARTING - ID: ${SERVER_INSTANCE_ID}`);
console.log(`Start Time: ${SERVER_START_TIME}`);
console.log(`Process ID: ${process.pid}`);
console.log(`Memory Usage: ${JSON.stringify(process.memoryUsage())}`);
console.log("Environment:", process.env.NODE_ENV || "development");
console.log(
  "Socket.IO transports:",
  process.env.SOCKET_TRANSPORTS || "websocket,polling"
);
console.log("=".repeat(50));

// Track active games
const activeGames: {id: string, createdAt: string, players: number}[] = [];

const gameServers = new Map<string, GameServer>();

// Serve static files from the dist/public directory
app.use(express.static(path.join(__dirname, "../public")));

// Add a basic health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Secret endpoint to clear inactive games (0 players)
app.get("/admin/cleanup-games", (req, res) => {
  // Get count before cleanup
  const beforeCount = activeGames.length;
  
  // Find games with 0 players
  const inactiveGames = activeGames.filter(game => game.players === 0);
  
  // Remove inactive games from activeGames array (modify in place)
  const activeGameIds = activeGames
    .filter(game => game.players > 0)
    .map(game => game.id);
  
  // Remove items in place
  for (let i = activeGames.length - 1; i >= 0; i--) {
    if (!activeGameIds.includes(activeGames[i].id)) {
      activeGames.splice(i, 1);
    }
  }
  
  // Clean up game servers
  inactiveGames.forEach(game => {
    if (gameServers.has(game.id)) {
      // Close the namespace/server if possible
      try {
        const namespace = io.of(`/${game.id}`);
        namespace.disconnectSockets(true);
      } catch (error) {
        console.error(`Error disconnecting sockets for game ${game.id}:`, error);
      }
      
      // Remove from game servers map
      gameServers.delete(game.id);
      console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] Cleaned up inactive game: ${game.id}`);
    }
  });
  
  res.json({
    success: true,
    message: `Cleaned up ${inactiveGames.length} inactive games`,
    beforeCount,
    afterCount: activeGames.length,
    removedGames: inactiveGames.map(g => g.id)
  });
});

// List all available games
app.get("/games", (req, res) => {
  res.json({
    games: activeGames,
  });
});

// Create a new game
app.post("/games", express.json(), (req, res) => {
  let gameId = req.body.gameId || Math.random().toString(36).substring(2, 10);
  
  // Remove any invalid characters from the gameId (only allow alphanumeric and hyphens)
  gameId = gameId.replace(/[^a-zA-Z0-9-]/g, '');
  
  // Server-side validation
  if (gameId.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Game name must be at least 3 characters long"
    });
  }
  
  // Ensure the gameId has a valid prefix
  if (!gameId.startsWith('game-')) {
    gameId = `game-${gameId}`;
  }
  
  // Check if game already exists
  if (gameServers.has(gameId)) {
    // Game exists, handle joining an existing game
    res.json({ 
      success: true,
      gameId: gameId,
      url: `/${gameId}`,
      message: "Joining existing game"
    });
    return;
  }
  
  // Create a new game
  try {
    const namespace = io.of(`/${gameId}`);
    const gameServer = new GameServer(namespace);
    gameServer.initialize();
    
    // Track player count changes
    gameServer.on('playerCountChanged', (count: number) => {
      // Find the game in activeGames and update player count
      const game = activeGames.find(g => g.id === gameId);
      if (game) {
        game.players = count;
      }
    });
    
    gameServers.set(gameId, gameServer);
    
    // Add to active games list
    activeGames.push({
      id: gameId,
      createdAt: new Date().toISOString(),
      players: 0
    });
    
    console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] New game created: ${gameId}`);
    
    res.json({ 
      success: true,
      gameId: gameId,
      url: `/${gameId}`,
      message: "Game created successfully"
    });
  } catch (error) {
    console.error(`[INSTANCE:${SERVER_INSTANCE_ID}] Error creating game:`, error);
    res.status(500).json({
      success: false,
      message: "Error creating game"
    });
  }
});

// Añadir un listener a nivel global para todas las conexiones de Socket.IO
io.on('connection', (socket) => {
  console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] Socket connected: ${socket.id} to namespace: ${socket.nsp.name}`);
  
  // Log de desconexión
  socket.on('disconnect', (reason) => {
    console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] Socket disconnected: ${socket.id}, reason: ${reason}`);
  });
});

// Modificar la lógica de manejo de rutas para ser más explícita sobre qué instancia está procesando la solicitud
app.get("/:id", (req, res) => {
  const id = req.params.id;
  
  // Check if this is a game route (must start with game-)
  if (!id.startsWith('game-')) {
    // If not a game route, serve the static file or the index page
    return res.sendFile(path.join(__dirname, "../public/index.html"));
  }
  
  console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] HTTP Request for game /${id}`);
  console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] Existing gameServers: ${Array.from(gameServers.keys()).join(", ")}`);
  
  // Obtener namespaces disponibles en Socket.IO
  const socketNamespaces = Array.from(io._nsps.keys()).join(", ");
  console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] Existing Socket.IO namespaces: ${socketNamespaces}`);

  if (!gameServers.has(id)) {
    const namespace = io.of(`/${id}`);
    const gameServer = new GameServer(namespace);
    gameServer.initialize();
    
    // Track player count changes
    gameServer.on('playerCountChanged', (count: number) => {
      // Find the game in activeGames and update player count
      const game = activeGames.find(g => g.id === id);
      if (game) {
        game.players = count;
      }
    });
    
    gameServers.set(id, gameServer);
    
    // Add to active games list if not already there
    const gameExists = activeGames.some(game => game.id === id);
    if (!gameExists) {
      activeGames.push({
        id: id,
        createdAt: new Date().toISOString(),
        players: 0
      });
    }
    
    console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] New server created at /${id}`);
    console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] After creation - gameServers: ${Array.from(gameServers.keys()).join(", ")}`);
  } else {
    console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] Using existing server for /${id}`);
  }
  
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Add root route for game selection
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started successfully`);
  console.log(`Server listening on port ${PORT}`);
  console.log(`Environment variables: PORT=${process.env.PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser to play locally`);
});
