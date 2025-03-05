import * as THREE from "three";
import { Obstacle } from "../types";
import { MazeGenerator } from "./MazeGenerator";
import { Boundaries } from "./Boundaries";
import { AdManager } from "./AdManager";
import { Ad } from "../classes/ads/Ad";

/**
 * Manages all obstacles and elements in the game world
 */
export class ObstacleManager {
  private obstacles: Obstacle[] = [];
  private scene: THREE.Scene;
  private worldSize: number = 100;
  private wallHeight: number = 100;
  
  // Component managers
  private mazeGenerator: MazeGenerator;
  private boundaries: Boundaries;
  private adManager: AdManager;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    
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
    const mazeResult = this.mazeGenerator.generateMaze(6);
    this.obstacles = [...mazeResult.obstacles];
    
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
} 