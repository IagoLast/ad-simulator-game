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

// Define game paths
const gamePaths: string[] = [];

const gameServers = new Map<string, GameServer>();

// Serve static files from the dist/public directory
app.use(express.static(path.join(__dirname, "../public")));

// Add a basic health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// List all available games
app.get("/games", (req, res) => {
  res.json({
    games: gamePaths,
  });
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
  console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] HTTP Request for game /${req.params.id}`);
  console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] Existing gameServers: ${Array.from(gameServers.keys()).join(", ")}`);
  
  // Obtener namespaces disponibles en Socket.IO
  const socketNamespaces = Array.from(io._nsps.keys()).join(", ");
  console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] Existing Socket.IO namespaces: ${socketNamespaces}`);

  if (!gameServers.has(req.params.id)) {
    const namespace = io.of(`/${req.params.id}`);
    const gameServer = new GameServer(namespace);
    gameServer.initialize();
    gameServers.set(req.params.id, gameServer);
    console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] New server created at /${req.params.id}`);
    console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] After creation - gameServers: ${Array.from(gameServers.keys()).join(", ")}`);
  } else {
    console.log(`[INSTANCE:${SERVER_INSTANCE_ID}] Using existing server for /${req.params.id}`);
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
  console.log(
    `Available games: ${gamePaths.map((path) => `/${path}`).join(", ")}`
  );
});
