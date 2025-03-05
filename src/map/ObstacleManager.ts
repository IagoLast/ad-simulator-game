import * as THREE from "three";
import { Obstacle } from "../types";
import { MazeGenerator } from "./MazeGenerator";
import { Boundaries } from "./Boundaries";
import { AdManager } from "./AdManager";
import { Ad } from '../classes/ads/Ad';

/**
 * Manages all obstacles and elements in the game world
 */
export class ObstacleManager {
  private obstacles: Obstacle[] = [];
  private worldSize: number = 100;
  private wallHeight: number = 100;
  private exitPosition: THREE.Vector3 | null = null;
  
  // Component managers
  private mazeGenerator: MazeGenerator;
  private boundaries: Boundaries;
  private adManager: AdManager;

  constructor(scene: THREE.Scene) {
    // Initialize component managers
    this.mazeGenerator = new MazeGenerator(scene, this.worldSize);
    this.boundaries = new Boundaries(scene, this.worldSize, this.wallHeight);
    this.adManager = new AdManager(scene, this.worldSize, this.wallHeight);
  }

  /**
   * Create all obstacles and elements in the world
   */
  public createObstacles(count: number = 50): void {
    // Clear existing obstacles
    this.obstacles = [];
    
    // 1. Generate the maze and get ad positions
    const mazeResult = this.mazeGenerator.generateMaze(20);
    this.obstacles = [...mazeResult.obstacles];
    
    // Store the exit position if one was created
    this.exitPosition = mazeResult.exitPosition;
    
    // 2. Create the boundary walls
    const boundaryObstacles = this.boundaries.createBoundaryWalls();
    this.obstacles = [...this.obstacles, ...boundaryObstacles];
    
    // 3. Set ad positions from maze generator
    this.adManager.setAdPositions(mazeResult.adPositions);
    
    // 4. Create boundary wall ads
    const boundaryAdObstacles = this.adManager.createBoundaryWallAds();
    this.obstacles = [...this.obstacles, ...boundaryAdObstacles];
    
    // 5. Create regular ads on maze walls
    const adObstacles = this.adManager.createWallAds(count);
    this.obstacles = [...this.obstacles, ...adObstacles];
    
    console.log(`Created world with ${this.obstacles.length} total obstacles`);
  }

  /**
   * Get all obstacles in the world
   */
  public getObstacles(): Obstacle[] {
    return this.obstacles;
  }

  /**
   * Get all ads in the world
   */
  public getAds(): Ad[] {
    return this.adManager.getAds();
  }

  /**
   * Find a suitable spawn position
   */
  public findSpawnPosition(): THREE.Vector3 {
    // If there's an exit position, use it as a spawn point (but moved inward a bit)
    if (this.exitPosition) {
      // Move the spawn position slightly inward from the exit (5 units)
      // Determine which edge the exit is on
      const spawnPos = this.exitPosition.clone();
      
      // Adjust the spawn point based on which edge the exit is closest to
      if (Math.abs(spawnPos.x) > Math.abs(spawnPos.z)) {
        // Exit is on east/west edge
        spawnPos.x += (spawnPos.x > 0) ? -5 : 5; // Move away from edge
      } else {
        // Exit is on north/south edge
        spawnPos.z += (spawnPos.z > 0) ? -5 : 5; // Move away from edge
      }
      
      // Set y to player height
      spawnPos.y = 1;
      
      console.log(`Using maze exit as spawn point at (${spawnPos.x.toFixed(2)}, ${spawnPos.y}, ${spawnPos.z.toFixed(2)})`);
      return spawnPos;
    }
    
    // Fallback to random position if no exit is defined
    // Start with a default position
    const position = new THREE.Vector3(0, 1, 0);
    
    // Try random positions until we find one that's not too close to obstacles
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      // Generate random coordinates within the world limits
      const x = (Math.random() * 2 - 1) * (this.worldSize * 0.7);
      const z = (Math.random() * 2 - 1) * (this.worldSize * 0.7);
      
      // Create a test position
      const testPosition = new THREE.Vector3(x, 1, z);
      
      // Check if it's far enough from all obstacles
      let tooCloseToObstacle = false;
      const minDistance = 5; // Minimum distance from any obstacle
      
      for (const obstacle of this.obstacles) {
        const distance = testPosition.distanceTo(obstacle.collider.position);
        const obstacleRadius = Math.max(
          obstacle.collider.size.x,
          obstacle.collider.size.z
        ) / 2;
        
        if (distance < minDistance + obstacleRadius) {
          tooCloseToObstacle = true;
          break;
        }
      }
      
      // If not too close to any obstacle, use this position
      if (!tooCloseToObstacle) {
        position.set(x, 1, z);
        console.log(`Found valid spawn position at (${x.toFixed(2)}, 1, ${z.toFixed(2)}) after ${attempts + 1} attempts`);
        break;
      }
      
      attempts++;
    }
    
    if (attempts >= maxAttempts) {
      console.warn(`Could not find an ideal spawn position after ${maxAttempts} attempts. Using fallback position.`);
    }
    
    return position;
  }

  public findBotSpawnPosition(): THREE.Vector3 | null {
    // Get all obstacle positions
    const obstaclePositions = this.obstacles.map(obstacle => obstacle.collider.position);
    
    // Find a position that is at least 5 units away from all obstacles
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      // Generate random coordinates within the world limits
      const x = (Math.random() * 2 - 1) * (this.worldSize * 0.7);
      const z = (Math.random() * 2 - 1) * (this.worldSize * 0.7);
      
      // Create a test position
      const testPosition = new THREE.Vector3(x, 1, z);
      
      // Check if it's far enough from all obstacles
      let tooCloseToObstacle = false;
      const minDistance = 5; // Minimum distance from any obstacle
      
      for (const obstaclePosition of obstaclePositions) {
        const distance = testPosition.distanceTo(obstaclePosition);
        const obstacleRadius = 5; // Assuming all obstacles are spheres with radius 5
        
        if (distance < minDistance + obstacleRadius) {
          tooCloseToObstacle = true;
          break;
        }
      }
      
      if (!tooCloseToObstacle) {
        return testPosition;
      }
      
      attempts++;
    }
    return null;
  }   

  /**
   * Get the position of the maze exit
   * @returns The position of the exit, or null if no exit exists
   */
  public getExitPosition(): THREE.Vector3 | null {
    return this.exitPosition;
  }
} 