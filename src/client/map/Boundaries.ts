import * as THREE from "three";
import { Obstacle } from "../types";

/**
 * Manages the boundary walls of the game world
 */
export class Boundaries {
  private worldSize: number;
  private wallHeight: number;
  private obstacles: Obstacle[] = [];
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene, worldSize: number = 100, wallHeight: number = 100) {
    this.scene = scene;
    this.worldSize = worldSize;
    this.wallHeight = wallHeight;
  }

  /**
   * Creates the boundary walls that contain the player within the world
   */
  public createBoundaryWalls(): Obstacle[] {
    console.log("Creating boundary walls");
    
    // Create transparent walls at the edges of the world to contain the player
    const wallMaterial = new THREE.MeshBasicMaterial({
      color: 0x555555,
      transparent: true,
      opacity: 0.7,
    });

    // Create walls on all 4 sides
    const walls = [
      {
        size: new THREE.Vector3(this.worldSize * 2 + 2 * 2, this.wallHeight, 2),
        position: new THREE.Vector3(0, this.wallHeight / 2, this.worldSize),
      },
      {
        size: new THREE.Vector3(this.worldSize * 2 + 2 * 2, this.wallHeight, 2),
        position: new THREE.Vector3(0, this.wallHeight / 2, -this.worldSize),
      },
      {
        size: new THREE.Vector3(2, this.wallHeight, this.worldSize * 2 + 2 * 2),
        position: new THREE.Vector3(this.worldSize, this.wallHeight / 2, 0),
      },
      {
        size: new THREE.Vector3(2, this.wallHeight, this.worldSize * 2 + 2 * 2),
        position: new THREE.Vector3(-this.worldSize, this.wallHeight / 2, 0),
      },
    ];

    // Clear previous obstacles
    this.obstacles = [];

    // Create and add each wall
    for (const wall of walls) {
      const geometry = new THREE.BoxGeometry(
        wall.size.x,
        wall.size.y,
        wall.size.z
      );
      const mesh = new THREE.Mesh(geometry, wallMaterial);
      mesh.position.set(wall.position.x, wall.position.y, wall.position.z);

      this.scene.add(mesh);

      // Add to obstacles for collision detection
      const obstacle: Obstacle = {
        mesh: mesh,
        collider: {
          position: new THREE.Vector3(
            wall.position.x,
            wall.position.y,
            wall.position.z
          ),
          size: new THREE.Vector3(wall.size.x, wall.size.y, wall.size.z),
        },
      };

      this.obstacles.push(obstacle);
    }

    console.log("Created boundary walls");
    return this.obstacles;
  }

  /**
   * Get all boundary obstacles
   */
  public getObstacles(): Obstacle[] {
    return this.obstacles;
  }

  /**
   * Get the world size
   */
  public getWorldSize(): number {
    return this.worldSize;
  }

  /**
   * Get the wall height
   */
  public getWallHeight(): number {
    return this.wallHeight;
  }
} 