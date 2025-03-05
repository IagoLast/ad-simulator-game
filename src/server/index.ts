import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { GameServer } from "./game/GameServer";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Log server startup information
console.log("Server starting up...");
console.log("Environment:", process.env.NODE_ENV || "development");

// Define game paths
const gamePaths = [];

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

app.get("/:id", (req, res) => {
  const namespace = io.of(`/${req.params.id}`);
  const gameServer = new GameServer(namespace);
  gameServer.initialize();
  console.log(`Created game at /${req.params.id}`);
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
    `Available games: ${gamePaths
      .map((path) => `http://localhost:${PORT}/${path}`)
      .join(", ")}`
  );
});
