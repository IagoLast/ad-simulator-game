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
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 }); // Brown walls
    
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
   * Creates diagonal paths through the maze for more route options
   * @param grid The maze grid
   * @param gridSize Size of the grid
   */
  private createDiagonalPaths(grid: boolean[][], gridSize: number): void {
    // Number of diagonal paths to create
    const pathCount = Math.floor(gridSize / 6);
    
    for (let i = 0; i < pathCount; i++) {
      // Random starting point near an edge
      const startX = Math.floor(Math.random() * (gridSize - 4)) + 2;
      const startZ = Math.floor(Math.random() * (gridSize - 4)) + 2;
      
      // Random direction (1-4: up-right, up-left, down-right, down-left)
      const direction = Math.floor(Math.random() * 4);
      
      // Length of the diagonal path
      const length = Math.floor(Math.random() * (gridSize / 3)) + 5;
      
      // Create the diagonal path
      for (let step = 0; step < length; step++) {
        let x = startX;
        let z = startZ;
        
        switch (direction) {
          case 0: // up-right
            x = startX + step;
            z = startZ + step;
            break;
          case 1: // up-left
            x = startX - step;
            z = startZ + step;
            break;
          case 2: // down-right
            x = startX + step;
            z = startZ - step;
            break;
          case 3: // down-left
            x = startX - step;
            z = startZ - step;
            break;
        }
        
        // Keep within grid bounds
        if (x > 0 && x < gridSize - 1 && z > 0 && z < gridSize - 1) {
          grid[x][z] = false; // Clear the path
        }
      }
    }
  }
  
  /**
   * Ensure rooms have multiple entry/exit points
   * @param grid The maze grid
   * @param roomX X position of room
   * @param roomZ Z position of room
   * @param width Room width
   * @param depth Room depth
   * @param gridSize Size of the grid
   */
  private ensureRoomAccessibility(
    grid: boolean[][], 
    roomX: number, 
    roomZ: number, 
    width: number, 
    depth: number, 
    gridSize: number
  ): void {
    // Create at least 2 openings in different walls of the room
    const directions = [
      { name: 'north', dx: 0, dz: -1 },
      { name: 'south', dx: 0, dz: 1 },
      { name: 'east', dx: 1, dz: 0 },
      { name: 'west', dx: -1, dz: 0 }
    ];
    
    // Shuffle directions
    directions.sort(() => Math.random() - 0.5);
    
    // Create openings in the first 2-3 directions
    const openingsCount = Math.floor(Math.random() * 2) + 2; // 2-3 openings
    
    for (let i = 0; i < openingsCount; i++) {
      const direction = directions[i];
      
      if (direction.name === 'north' || direction.name === 'south') {
        // Create opening on the north or south wall
        const wallZ = direction.name === 'north' ? roomZ : roomZ + depth - 1;
        const doorX = roomX + Math.floor(Math.random() * (width - 1)) + 1;
        
        if (doorX > 0 && doorX < gridSize - 1 && wallZ > 0 && wallZ < gridSize - 1) {
          grid[doorX][wallZ] = false; // Create opening
          
          // Extend the opening one cell further
          const nextZ = wallZ + direction.dz;
          if (nextZ > 0 && nextZ < gridSize - 1) {
            grid[doorX][nextZ] = false;
          }
        }
      } else {
        // Create opening on the east or west wall
        const wallX = direction.name === 'west' ? roomX : roomX + width - 1;
        const doorZ = roomZ + Math.floor(Math.random() * (depth - 1)) + 1;
        
        if (wallX > 0 && wallX < gridSize - 1 && doorZ > 0 && doorZ < gridSize - 1) {
          grid[wallX][doorZ] = false; // Create opening
          
          // Extend the opening one cell further
          const nextX = wallX + direction.dx;
          if (nextX > 0 && nextX < gridSize - 1) {
            grid[nextX][doorZ] = false;
          }
        }
      }
    }
  }
  
  /**
   * Create strategic shortcuts in the maze
   * @param grid The maze grid
   * @param gridSize Size of the grid
   */
  private createShortcuts(grid: boolean[][], gridSize: number): void {
    // Number of shortcuts to create
    const shortcutCount = Math.floor(gridSize / 5);
    
    for (let i = 0; i < shortcutCount; i++) {
      // Random position for the shortcut
      const x = Math.floor(Math.random() * (gridSize - 4)) + 2;
      const z = Math.floor(Math.random() * (gridSize - 4)) + 2;
      
      // Check if this is a wall with passages on both sides
      // Horizontal wall check (passages above and below)
      if (grid[x][z] && !grid[x][z-1] && !grid[x][z+1]) {
        grid[x][z] = false; // Create a gap
      }
      // Vertical wall check (passages to left and right)
      else if (grid[x][z] && !grid[x-1][z] && !grid[x+1][z]) {
        grid[x][z] = false; // Create a gap
      }
    }
  }
} 