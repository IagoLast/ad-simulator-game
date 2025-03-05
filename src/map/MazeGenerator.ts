import * as THREE from 'three';
import { Obstacle } from '../types';

/**
 * Represents a wall position that could potentially hold an ad frame
 */
export interface AdPosition {
  position: THREE.Vector3;
  direction: string | null;
  gridX: number;
  gridZ: number;
}

/**
 * Class responsible for generating maze structures
 */
export class MazeGenerator {
  private scene: THREE.Scene;
  private worldSize: number;
  private obstacles: Obstacle[] = [];
  private adPositions: AdPosition[] = [];

  /**
   * Creates a new instance of MazeGenerator
   * @param scene The THREE.js scene to add maze elements to
   * @param worldSize The size of the world (from -worldSize to +worldSize)
   */
  constructor(scene: THREE.Scene, worldSize: number = 100) {
    this.scene = scene;
    this.worldSize = worldSize;
  }

  /**
   * Generates a maze structure
   * @param wallHeight Height of the maze walls
   * @returns Object containing the obstacles and ad-compatible wall positions
   */
  public generateMaze(wallHeight: number = 6): { obstacles: Obstacle[], adPositions: AdPosition[] } {
    // Reset collections
    this.obstacles = [];
    this.adPositions = [];
    
    // Labyrinth parameters
    const cellSize = 10; // Size of each cell in the grid
    const gridSize = Math.floor((this.worldSize * 2) / cellSize); // Number of cells across the world
    
    // Use a simple algorithm to generate a maze
    // We'll use a modified version of the "recursive division" algorithm
    
    // Start with a grid of cells
    // true = wall, false = passage
    const grid: boolean[][] = [];
    
    // Initialize grid with outer walls and all inner cells as passages
    for (let x = 0; x < gridSize; x++) {
      grid[x] = [];
      for (let z = 0; z < gridSize; z++) {
        // Border walls
        if (x === 0 || x === gridSize - 1 || z === 0 || z === gridSize - 1) {
          grid[x][z] = true; // Wall
        } else {
          grid[x][z] = false; // Passage
        }
      }
    }
    
    // Add some random walls to create a semi-maze structure with more gaps
    
    // Horizontal walls (with more gaps)
    for (let z = 2; z < gridSize - 2; z += 3) {
      let hasGap = false;
      let consecutiveWalls = 0; // Track consecutive wall segments to force gaps
      const maxConsecutiveWalls = 3; // Maximum consecutive wall segments before forcing a gap
      
      for (let x = 1; x < gridSize - 1; x++) {
        // Every few cells, decide whether to have a gap
        // Increased gap probability to 50% (from 40%)
        if (x % 3 === 0) { // Check more frequently (every 3 cells instead of 4)
          hasGap = Math.random() > 0.5; // 50% chance of gap
        }
        
        // Force a gap after too many consecutive walls
        if (consecutiveWalls >= maxConsecutiveWalls) {
          hasGap = true;
          consecutiveWalls = 0;
        }
        
        if (!hasGap) {
          grid[x][z] = true; // Add wall segment
          consecutiveWalls++;
        } else {
          grid[x][z] = false; // Ensure it's a gap
          consecutiveWalls = 0; // Reset counter
        }
      }
    }
    
    // Vertical walls (with more gaps)
    for (let x = 2; x < gridSize - 2; x += 3) {
      let hasGap = false;
      let consecutiveWalls = 0;
      const maxConsecutiveWalls = 3;
      
      for (let z = 1; z < gridSize - 1; z++) {
        // Every few cells, decide whether to have a gap
        if (z % 3 === 0) { // Check more frequently
          hasGap = Math.random() > 0.5; // 50% chance of gap
        }
        
        // Force a gap after too many consecutive walls
        if (consecutiveWalls >= maxConsecutiveWalls) {
          hasGap = true;
          consecutiveWalls = 0;
        }
        
        if (!hasGap) {
          grid[x][z] = true; // Add wall segment
          consecutiveWalls++;
        } else {
          grid[x][z] = false; // Ensure it's a gap
          consecutiveWalls = 0;
        }
      }
    }
    
    // Create diagonal paths through the maze (adds more route options)
    this.createDiagonalPaths(grid, gridSize);
    
    // Add some random "rooms" (larger open areas)
    const roomCount = Math.floor(gridSize / 4); // Increase number of rooms
    for (let r = 0; r < roomCount; r++) {
      const roomX = Math.floor(Math.random() * (gridSize - 8)) + 4;
      const roomZ = Math.floor(Math.random() * (gridSize - 8)) + 4;
      const roomWidth = Math.floor(Math.random() * 4) + 3; // Larger rooms (3-6 cells)
      const roomDepth = Math.floor(Math.random() * 4) + 3; // Larger rooms (3-6 cells)
      
      // Clear the room area
      for (let x = roomX; x < roomX + roomWidth && x < gridSize - 1; x++) {
        for (let z = roomZ; z < roomZ + roomDepth && z < gridSize - 1; z++) {
          grid[x][z] = false; // Clear to passage
        }
      }
      
      // Add some obstacles within the room, but fewer than before
      const obstacleCount = Math.floor(Math.random() * 2) + 1; // 1-2 obstacles per room
      for (let o = 0; o < obstacleCount; o++) {
        const obsX = roomX + Math.floor(Math.random() * roomWidth);
        const obsZ = roomZ + Math.floor(Math.random() * roomDepth);
        if (obsX < gridSize - 1 && obsZ < gridSize - 1) {
          grid[obsX][obsZ] = Math.random() > 0.7; // Only 30% chance of obstacle
        }
      }
      
      // Ensure rooms have at least 2 entry/exit points for better navigation
      this.ensureRoomAccessibility(grid, roomX, roomZ, roomWidth, roomDepth, gridSize);
    }
    
    // Create some "shortcuts" - strategic gaps in walls to connect separate paths
    this.createShortcuts(grid, gridSize);
    
    // Create meshes based on the grid
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
    
    // Place walls where grid cells are true
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        if (grid[x][z]) {
          // Convert grid coordinates to world coordinates
          const worldX = (x - gridSize / 2) * cellSize + cellSize / 2;
          const worldZ = (z - gridSize / 2) * cellSize + cellSize / 2;
          
          // Create wall
          const wallGeometry = new THREE.BoxGeometry(cellSize, wallHeight, cellSize);
          const wall = new THREE.Mesh(wallGeometry, wallMaterial);
          
          wall.position.set(worldX, wallHeight / 2, worldZ);
          wall.castShadow = true;
          wall.receiveShadow = true;
          
          this.scene.add(wall);
          
          // Add to obstacles for collision detection
          const obstacle: Obstacle = {
            mesh: wall,
            collider: {
              position: new THREE.Vector3(worldX, wallHeight / 2, worldZ),
              size: new THREE.Vector3(cellSize, wallHeight, cellSize)
            }
          };
          
          this.obstacles.push(obstacle);
          
          // Store wall positions and check if it's suitable for an ad
          // A wall is suitable if it has at least one adjacent non-wall
          let hasAdjacentPath = false;
          let facingDirection: string | null = null;
          
          // Check adjacent cells in all 4 directions
          if (x > 0 && !grid[x-1][z]) {
            hasAdjacentPath = true;
            facingDirection = 'west';
          } else if (x < gridSize - 1 && !grid[x+1][z]) {
            hasAdjacentPath = true;
            facingDirection = 'east';
          } else if (z > 0 && !grid[x][z-1]) {
            hasAdjacentPath = true;
            facingDirection = 'north';
          } else if (z < gridSize - 1 && !grid[x][z+1]) {
            hasAdjacentPath = true;
            facingDirection = 'south';
          }
          
          // If this wall has a path next to it, it's a good candidate for an ad
          if (hasAdjacentPath) {
            // Generate multiple ad positions at different heights on the same wall
            const baseY = wallHeight / 2;
            
            // Create positions at different heights
            const positions = [
              baseY - wallHeight * 0.25, // Lower position
              baseY, // Middle position
              baseY + wallHeight * 0.25  // Upper position
            ];
            
            // Add each position variant
            for (const posY of positions) {
              this.adPositions.push({
                position: new THREE.Vector3(worldX, posY, worldZ),
                direction: facingDirection,
                gridX: x,
                gridZ: z
              });
            }
          }
        }
      }
    }
    
    console.log(`Generated maze with ${gridSize}x${gridSize} grid, found ${this.adPositions.length} potential ad locations`);
    
    return {
      obstacles: this.obstacles,
      adPositions: this.adPositions
    };
  }
  
  /**
   * Create diagonal paths through the maze for more route options
   */
  private createDiagonalPaths(grid: boolean[][], gridSize: number): void {
    // Create some diagonal paths - this breaks up the grid pattern
    const diagonalPaths = Math.floor(gridSize / 5); // Number of diagonal paths to add
    
    for (let d = 0; d < diagonalPaths; d++) {
      // Choose a random starting point away from the edges
      const startX = 2 + Math.floor(Math.random() * (gridSize - 4));
      const startZ = 2 + Math.floor(Math.random() * (gridSize - 4));
      
      // Choose a random direction
      const dirX = Math.random() > 0.5 ? 1 : -1;
      const dirZ = Math.random() > 0.5 ? 1 : -1;
      
      // Length of the diagonal path (random from 3 to 7)
      const length = 3 + Math.floor(Math.random() * 5);
      
      // Create the diagonal
      for (let i = 0; i < length; i++) {
        const x = startX + i * dirX;
        const z = startZ + i * dirZ;
        
        // Make sure we're still within the grid
        if (x > 0 && x < gridSize - 1 && z > 0 && z < gridSize - 1) {
          grid[x][z] = false; // Clear to passage
          
          // Clear some adjacent cells too for a wider path
          if (Math.random() > 0.5 && x + 1 < gridSize - 1) {
            grid[x + 1][z] = false;
          }
          if (Math.random() > 0.5 && z + 1 < gridSize - 1) {
            grid[x][z + 1] = false;
          }
        }
      }
    }
  }
  
  /**
   * Ensure room has good accessibility from multiple directions
   */
  private ensureRoomAccessibility(
    grid: boolean[][], 
    roomX: number, 
    roomZ: number, 
    width: number, 
    depth: number, 
    gridSize: number
  ): void {
    // Directions to check for access (north, east, south, west)
    const directions = [
      { dx: 0, dz: -1 }, // North
      { dx: 1, dz: 0 },  // East
      { dx: 0, dz: 1 },  // South
      { dx: -1, dz: 0 }, // West
    ];
    
    // Shuffle directions
    directions.sort(() => Math.random() - 0.5);
    
    // Track how many entry points we've created
    let entryPoints = 0;
    const targetEntryPoints = 2; // We want at least 2 entry/exit points
    
    // Check each direction for potential entry points
    for (const dir of directions) {
      if (entryPoints >= targetEntryPoints) break;
      
      // Try to create an entry point somewhere along this wall
      // For north/south walls, vary x position
      // For east/west walls, vary z position
      const isHorizontalWall = dir.dz !== 0; // North or South wall
      
      let attempts = 0;
      const maxAttempts = 3;
      
      while (entryPoints < targetEntryPoints && attempts < maxAttempts) {
        attempts++;
        
        // Choose a random position along the wall
        let x = roomX;
        let z = roomZ;
        
        if (isHorizontalWall) {
          // For north/south walls, choose a random x within the room
          x += Math.floor(Math.random() * width);
          // For north wall, z = roomZ - 1
          // For south wall, z = roomZ + depth
          z += (dir.dz < 0) ? -1 : depth;
        } else {
          // For east/west walls, choose a random z within the room
          z += Math.floor(Math.random() * depth);
          // For west wall, x = roomX - 1
          // For east wall, x = roomX + width
          x += (dir.dx < 0) ? -1 : width;
        }
        
        // Make sure the position is valid
        if (x > 0 && x < gridSize - 1 && z > 0 && z < gridSize - 1) {
          // Clear this cell to create an entry point
          grid[x][z] = false;
          
          // Also clear the cell beyond it to ensure there's a path
          const beyondX = x + dir.dx;
          const beyondZ = z + dir.dz;
          
          if (beyondX > 0 && beyondX < gridSize - 1 && beyondZ > 0 && beyondZ < gridSize - 1) {
            grid[beyondX][beyondZ] = false;
            entryPoints++;
          }
        }
      }
    }
  }

  /**
   * Create shortcuts through the maze
   */
  private createShortcuts(grid: boolean[][], gridSize: number): void {
    // Number of shortcuts to try to create
    const shortcutCount = Math.floor(gridSize / 3);
    
    for (let s = 0; s < shortcutCount; s++) {
      // Choose a random wall that isn't on the outer edge
      const x = 1 + Math.floor(Math.random() * (gridSize - 2));
      const z = 1 + Math.floor(Math.random() * (gridSize - 2));
      
      // Only try to create a shortcut if this is a wall
      if (grid[x][z]) {
        // Check if this wall is connecting two open spaces
        // We'll check in all four cardinal directions
        const hasNorthPath = z > 0 && !grid[x][z-1];
        const hasSouthPath = z < gridSize - 1 && !grid[x][z+1];
        const hasEastPath = x < gridSize - 1 && !grid[x+1][z];
        const hasWestPath = x > 0 && !grid[x-1][z];
        
        // Check for north-south or east-west shortcuts
        if ((hasNorthPath && hasSouthPath) || (hasEastPath && hasWestPath)) {
          // 70% chance to create the shortcut
          if (Math.random() < 0.7) {
            grid[x][z] = false; // Remove wall to create shortcut
          }
        }
      }
    }
  }
} 