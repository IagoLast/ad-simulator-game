import * as THREE from 'three';
import { Obstacle } from '../types';

/**
 * Interface for storing ad-compatible positions on walls
 */
export interface AdPosition {
  position: THREE.Vector3;
  direction: string | null;
  gridX: number;
  gridZ: number;
}

/**
 * MazeGenerator - Creates a procedurally generated maze structure
 * with walls and open passages.
 */
export class MazeGenerator {
  private scene: THREE.Scene;
  private worldSize: number;
  private obstacles: Obstacle[] = [];
  private adPositions: AdPosition[] = [];
  private exitPosition: THREE.Vector3 | null = null;

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
  public generateMaze(wallHeight: number = 6): { obstacles: Obstacle[], adPositions: AdPosition[], exitPosition: THREE.Vector3 | null } {
    // Reset collections
    this.obstacles = [];
    this.adPositions = [];
    this.exitPosition = null;
    
    console.log("Starting maze generation...");
    
    // Labyrinth parameters
    const cellSize = 10; // Size of each cell in the grid
    const gridSize = Math.floor((this.worldSize * 2) / cellSize); // Number of cells across the world
    
    // Calculate the center zone (slightly smaller to avoid getting stuck)
    const centerMargin = Math.floor(gridSize * 0.25); // Reduced from 0.3 to 0.25
    const centerStartX = Math.floor(gridSize / 2) - centerMargin;
    const centerEndX = Math.floor(gridSize / 2) + centerMargin;
    const centerStartZ = Math.floor(gridSize / 2) - centerMargin;
    const centerEndZ = Math.floor(gridSize / 2) + centerMargin;
    
    console.log(`Grid size: ${gridSize}x${gridSize}, Center zone: (${centerStartX},${centerStartZ}) to (${centerEndX},${centerEndZ})`);
    
    // Use a simple algorithm to generate a maze
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
    
    console.log("Adding horizontal walls...");
    
    // Add some random walls to create a semi-maze structure with more gaps
    // Horizontal walls (with more gaps)
    for (let z = 2; z < gridSize - 2; z += 2) { // Reduced from z+=3 to make denser
      let hasGap = false;
      let consecutiveWalls = 0; // Track consecutive wall segments to force gaps
      let maxConsecutiveWalls = 3; // Maximum consecutive wall segments before forcing a gap
      
      // More density in the center
      if (z >= centerStartZ && z <= centerEndZ) {
        maxConsecutiveWalls = 2; // Shorter wall sections in center for more maze-like structure
      }
      
      for (let x = 1; x < gridSize - 1; x++) {
        // Every few cells, decide whether to have a gap
        // In the center area, reduce gap probability
        if (x % 2 === 0) { // Check more frequently (every 2 cells instead of 3)
          if (x >= centerStartX && x <= centerEndX && z >= centerStartZ && z <= centerEndZ) {
            hasGap = Math.random() > 0.7; // Only 30% chance of gap in center (denser)
          } else {
            hasGap = Math.random() > 0.5; // 50% chance of gap elsewhere
          }
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
    
    console.log("Adding vertical walls...");
    
    // Vertical walls (with more gaps)
    for (let x = 2; x < gridSize - 2; x += 2) { // Reduced from x+=3 to make denser
      let hasGap = false;
      let consecutiveWalls = 0;
      let maxConsecutiveWalls = 3;
      
      // More density in the center
      if (x >= centerStartX && x <= centerEndX) {
        maxConsecutiveWalls = 2; // Shorter wall sections in center
      }
      
      for (let z = 1; z < gridSize - 1; z++) {
        // Every few cells, decide whether to have a gap
        if (z % 2 === 0) { // Check more frequently
          if (x >= centerStartX && x <= centerEndX && z >= centerStartZ && z <= centerEndZ) {
            hasGap = Math.random() > 0.7; // Only 30% chance of gap in center (denser)
          } else {
            hasGap = Math.random() > 0.5; // 50% chance of gap elsewhere
          }
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
    
    console.log("Creating diagonal paths...");
    this.createDiagonalPaths(grid, gridSize);
    
    console.log("Creating rooms...");
    // Add some random "rooms" (larger open areas) - but fewer in the center
    const roomCount = Math.floor(gridSize / 5); // Decreased from /4 to reduce open areas
    for (let r = 0; r < roomCount; r++) {
      // For most rooms, avoid the center area
      let roomX, roomZ;
      
      // 80% of rooms should avoid the center zone
      if (Math.random() < 0.8) {
        // Add a maximum attempt counter to prevent infinite loops
        let attempts = 0;
        const maxAttempts = 50; // Limit the attempts to find a spot outside center
        
        do {
          roomX = Math.floor(Math.random() * (gridSize - 8)) + 4;
          roomZ = Math.floor(Math.random() * (gridSize - 8)) + 4;
          attempts++;
          
          // Break out if we've tried too many times
          if (attempts >= maxAttempts) {
            console.log(`Could not find room location outside center after ${maxAttempts} attempts`);
            break;
          }
        } while (
          roomX >= centerStartX - 2 && roomX <= centerEndX + 2 && 
          roomZ >= centerStartZ - 2 && roomZ <= centerEndZ + 2
        );
      } else {
        // The remaining 20% can be anywhere
        roomX = Math.floor(Math.random() * (gridSize - 8)) + 4;
        roomZ = Math.floor(Math.random() * (gridSize - 8)) + 4;
      }
      
      // Make sure roomX and roomZ are defined (safety check)
      if (roomX === undefined || roomZ === undefined) {
        roomX = Math.floor(Math.random() * (gridSize - 8)) + 4;
        roomZ = Math.floor(Math.random() * (gridSize - 8)) + 4;
      }
      
      // Smaller rooms
      const roomWidth = Math.floor(Math.random() * 3) + 2; // Smaller rooms (2-4 cells)
      const roomDepth = Math.floor(Math.random() * 3) + 2; // Smaller rooms (2-4 cells)
      
      // Clear the room area
      for (let x = roomX; x < roomX + roomWidth && x < gridSize - 1; x++) {
        for (let z = roomZ; z < roomZ + roomDepth && z < gridSize - 1; z++) {
          grid[x][z] = false; // Clear to passage
        }
      }
      
      // Add some obstacles within the room
      const obstacleCount = Math.floor(Math.random() * 2) + 1; // 1-2 obstacles per room
      for (let o = 0; o < obstacleCount; o++) {
        const obsX = roomX + Math.floor(Math.random() * roomWidth);
        const obsZ = roomZ + Math.floor(Math.random() * roomDepth);
        if (obsX < gridSize - 1 && obsZ < gridSize - 1) {
          grid[obsX][obsZ] = Math.random() > 0.5; // 50% chance of obstacle (up from 30%)
        }
      }
      
      // Ensure rooms have entry/exit points
      this.ensureRoomAccessibility(grid, roomX, roomZ, roomWidth, roomDepth, gridSize);
    }
    
    console.log("Creating shortcuts...");
    this.createShortcuts(grid, gridSize);
    
    console.log("Creating maze exit...");
    this.createMazeExit(grid, gridSize, cellSize);
    
    console.log("Building maze meshes...");
    // Create meshes based on the grid
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xc2c2c2 });
    
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
              baseY, // Center position
              baseY + wallHeight * 0.25 // Higher position
            ];
            
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
    
    console.log(`Maze generation complete with ${this.obstacles.length} obstacles and ${this.adPositions.length} ad positions`);
    
    // Return all created obstacles and ad positions
    return { 
      obstacles: this.obstacles, 
      adPositions: this.adPositions,
      exitPosition: this.exitPosition
    };
  }
  
  /**
   * Create a single exit point in the maze
   */
  private createMazeExit(grid: boolean[][], gridSize: number, cellSize: number): void {
    // Choose a random side (0 = north, 1 = east, 2 = south, 3 = west)
    const side = Math.floor(Math.random() * 4);
    
    let exitX = 0, exitZ = 0;
    
    // Find a position for the exit
    switch (side) {
      case 0: // North side
        exitZ = 0;
        exitX = Math.floor(gridSize / 4) + Math.floor(Math.random() * (gridSize / 2));
        break;
      case 1: // East side
        exitX = gridSize - 1;
        exitZ = Math.floor(gridSize / 4) + Math.floor(Math.random() * (gridSize / 2));
        break;
      case 2: // South side
        exitZ = gridSize - 1;
        exitX = Math.floor(gridSize / 4) + Math.floor(Math.random() * (gridSize / 2));
        break;
      case 3: // West side
        exitX = 0;
        exitZ = Math.floor(gridSize / 4) + Math.floor(Math.random() * (gridSize / 2));
        break;
    }
    
    // Ensure exit coordinates are valid
    exitX = Math.min(Math.max(exitX, 0), gridSize - 1);
    exitZ = Math.min(Math.max(exitZ, 0), gridSize - 1);
    
    // Clear the wall at the exit position
    grid[exitX][exitZ] = false;
    
    // Create a path from the exit into the maze (clear adjacent cells)
    let pathX = exitX;
    let pathZ = exitZ;
    
    // Direction to move inward from the exit
    const dirX = side === 3 ? 1 : (side === 1 ? -1 : 0);
    const dirZ = side === 0 ? 1 : (side === 2 ? -1 : 0);
    
    // Create a clear path for 3 cells inward
    for (let i = 0; i < 3; i++) {
      pathX += dirX;
      pathZ += dirZ;
      
      // Make sure we're still within the grid
      if (pathX >= 0 && pathX < gridSize && pathZ >= 0 && pathZ < gridSize) {
        grid[pathX][pathZ] = false; // Clear to passage
      } else {
        break; // Stop if we hit the grid boundary
      }
    }
    
    // Store exit position in world coordinates
    const worldX = (exitX - gridSize / 2) * cellSize + cellSize / 2;
    const worldZ = (exitZ - gridSize / 2) * cellSize + cellSize / 2;
    this.exitPosition = new THREE.Vector3(worldX, 0, worldZ);
    
    // Add visual marker for the exit using a green floor tile
    const markerGeometry = new THREE.BoxGeometry(cellSize * 1.2, 0.5, cellSize * 1.2);
    const markerMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 }); // Bright green
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    
    marker.position.set(worldX, 0.25, worldZ); // Just above the ground
    marker.receiveShadow = true;
    
    this.scene.add(marker);
    
    console.log(`Created maze exit at (${exitX}, ${exitZ}) - side: ${side}`);
  }
  
  /**
   * Create diagonal paths through the maze for more route options
   */
  private createDiagonalPaths(grid: boolean[][], gridSize: number): void {
    // Create some diagonal paths - this breaks up the grid pattern
    const diagonalPaths = Math.floor(gridSize / 8); // Fewer diagonal paths (was /5)
    
    for (let d = 0; d < diagonalPaths; d++) {
      // Choose a random starting point away from the edges
      const startX = 2 + Math.floor(Math.random() * (gridSize - 4));
      const startZ = 2 + Math.floor(Math.random() * (gridSize - 4));
      
      // Choose a random direction
      const dirX = Math.random() > 0.5 ? 1 : -1;
      const dirZ = Math.random() > 0.5 ? 1 : -1;
      
      // Length of the diagonal path (shorter, was 3-7)
      const length = 2 + Math.floor(Math.random() * 3);
      
      // Create the diagonal
      for (let i = 0; i < length; i++) {
        const x = startX + i * dirX;
        const z = startZ + i * dirZ;
        
        // Make sure we're still within the grid
        if (x > 0 && x < gridSize - 1 && z > 0 && z < gridSize - 1) {
          grid[x][z] = false; // Clear to passage
          
          // Less likely to clear adjacent cells (30% chance instead of 50%)
          if (Math.random() > 0.7 && x + 1 < gridSize - 1) {
            grid[x + 1][z] = false;
          }
          if (Math.random() > 0.7 && z + 1 < gridSize - 1) {
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
      
      // Try to create an entry point along this wall
      // For north/south walls, vary x position
      // For east/west walls, vary z position
      const isHorizontalWall = dir.dz !== 0; // North or South wall
      
      // Simplified approach: Try up to 3 positions along the wall
      for (let attempt = 0; attempt < 3; attempt++) {
        if (entryPoints >= targetEntryPoints) break;
        
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
        
        // Make sure we're within the grid and that the target cell is a wall
        if (x >= 0 && x < gridSize && z >= 0 && z < gridSize && grid[x][z]) {
          // Create the entry point
          grid[x][z] = false;
          entryPoints++;
          
          // Also clear the cell beyond the entry to make sure it connects to a path
          const outX = x + dir.dx;
          const outZ = z + dir.dz;
          
          if (outX >= 0 && outX < gridSize && outZ >= 0 && outZ < gridSize) {
            grid[outX][outZ] = false;
          }
          
          // Successfully created an entry point, move to next direction
          break;
        }
      }
    }
    
    // If we couldn't create enough entry points, force one
    if (entryPoints < 1) {
      // Pick a random side of the room
      const side = Math.floor(Math.random() * 4);
      let x, z;
      
      switch (side) {
        case 0: // North
          x = roomX + Math.floor(width / 2);
          z = roomZ - 1;
          break;
        case 1: // East
          x = roomX + width;
          z = roomZ + Math.floor(depth / 2);
          break;
        case 2: // South
          x = roomX + Math.floor(width / 2);
          z = roomZ + depth;
          break;
        case 3: // West
        default:
          x = roomX - 1;
          z = roomZ + Math.floor(depth / 2);
          break;
      }
      
      // Make sure the coordinates are within the grid
      if (x >= 0 && x < gridSize && z >= 0 && z < gridSize) {
        grid[x][z] = false; // Create forced entry
        
        // Clear one cell beyond it too
        const dir = directions[side];
        const outX = x + dir.dx;
        const outZ = z + dir.dz;
        
        if (outX >= 0 && outX < gridSize && outZ >= 0 && outZ < gridSize) {
          grid[outX][outZ] = false;
        }
      }
    }
  }
  
  /**
   * Create shortcuts through the maze - reduced to make maze more challenging
   */
  private createShortcuts(grid: boolean[][], gridSize: number): void {
    // Number of shortcuts to try to create - reduced from /3 to /6
    const shortcutCount = Math.floor(gridSize / 6); 
    
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
          // 40% chance to create the shortcut (reduced from 70%)
          if (Math.random() < 0.4) {
            grid[x][z] = false; // Remove wall to create shortcut
          }
        }
      }
    }
  }
} 