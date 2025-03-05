# 3D Multiplayer Game Boilerplate

A minimal 3D multiplayer game boilerplate using Node.js, Three.js, and TypeScript.

## Features

- 3D environment with Three.js
- Multiplayer capabilities with Socket.IO
- Player movement with WASD keys
- Scalable architecture
- TypeScript for type safety

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies
```bash
npm install
```

## Running the Game

1. Build the project
```bash
npm run build
```

2. Start the server
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

For development with hot-reloading:
```bash
npm run dev
```

## Game Controls

- W: Move forward
- A: Move left
- S: Move backward
- D: Move right

## Project Structure

```
/
├── src/
│   ├── client/
│   │   ├── index.html        # HTML entry point
│   │   ├── index.ts          # Client entry point
│   │   └── game/
│   │       ├── Game.ts       # Main game class
│   │       ├── Player.ts     # Player class
│   │       └── Controls.ts   # Input handling
│   ├── server/
│   │   ├── index.ts          # Server entry point
│   │   └── game/
│   │       └── GameServer.ts # Game server
│   └── shared/
│       └── types.ts          # Shared type definitions
└── package.json              # Project dependencies
```

## Extending the Game

This boilerplate provides only basic functionality. To extend it, consider:

- Adding game mechanics like shooting
- Implementing a capture the flag system
- Adding collision detection
- Improving the visuals with textures and models
- Adding a scoreboard and game states

## License

MIT 