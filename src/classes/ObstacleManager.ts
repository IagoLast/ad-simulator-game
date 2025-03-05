import * as THREE from 'three';
import { Obstacle } from '../types';
import { Billboard, GenericBillboardStyle } from './Billboard';

export class ObstacleManager {
  private obstacles: Obstacle[] = [];
  private scene: THREE.Scene;
  private billboards: Billboard[] = [];
  private advertisementTexts: string[] = [
    'www.TimeTime.in',
    'www.TheirStack.com',
  ];
  
  // Define world boundaries
  private worldSize: number = 100; // Size of world (goes from -worldSize to +worldSize)
  private wallHeight: number = 100; // Height of the boundary walls
  
  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }
  
  public createObstacles(count: number = 50): void {
    // Create both cubes and billboards
    this.createCubeObstacles(Math.floor(count * 0.6)); // 60% of count will be cubes
    this.createBillboards(Math.ceil(count * 0.4)); // 40% of count will be billboards
    
    // Create boundary walls
    this.createBoundaryWalls();
  }
  
  private createCubeObstacles(count: number): void {
    // Create several random obstacles
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1;
      const height = Math.random() * 3 + 1;
      const geometry = new THREE.BoxGeometry(size, height, size);
      const material = new THREE.MeshLambertMaterial({ color: 0x8b4513 }); // Brown
      const obstacleMesh = new THREE.Mesh(geometry, material);
      
      // Random position within world boundaries (add a small margin)
      const margin = 5;
      const maxDistance = this.worldSize - margin;
      const x = Math.random() * (maxDistance * 2) - maxDistance;
      const y = height / 2;
      const z = Math.random() * (maxDistance * 2) - maxDistance;
      
      obstacleMesh.position.set(x, y, z);
      obstacleMesh.castShadow = true;
      obstacleMesh.receiveShadow = true;
      
      this.scene.add(obstacleMesh);
      
      // Create obstacle with collider
      const obstacle: Obstacle = {
        mesh: obstacleMesh,
        collider: {
          position: new THREE.Vector3(x, y, z),
          size: new THREE.Vector3(size, height, size)
        }
      };
      
      this.obstacles.push(obstacle);
    }
  }
  
  private createBillboards(count: number): void {
    for (let i = 0; i < count; i++) {
      // Much more varied size range for billboards
      const width = Math.random() * 6 + 2; // Between 2-8 units wide
      const height = Math.random() * 4 + 1.5; // Between 1.5-5.5 units tall
      
      // Random position with better distribution
      // Use different distribution patterns to create interesting arrangements
      let x, z;
      
      // Choose a distribution pattern
      const pattern = Math.floor(Math.random() * 3);
      
      // Maximum distance from center respecting world boundaries
      const margin = 5;
      const maxDistance = this.worldSize - margin;
      
      if (pattern === 0) {
        // Grid-like pattern with some randomness
        const gridSize = Math.min(25, maxDistance / 4); // Ensure grid fits within world
        const gridLimit = Math.floor(maxDistance / gridSize);
        const gridX = Math.floor(Math.random() * (gridLimit * 2)) - gridLimit;
        const gridZ = Math.floor(Math.random() * (gridLimit * 2)) - gridLimit;
        x = gridX * gridSize + (Math.random() * 10 - 5);
        z = gridZ * gridSize + (Math.random() * 10 - 5);
        
        // Ensure within boundaries
        x = Math.max(-maxDistance, Math.min(maxDistance, x));
        z = Math.max(-maxDistance, Math.min(maxDistance, z));
      } 
      else if (pattern === 1) {
        // Circular pattern with rings
        const ringCount = 3;
        const ringIndex = Math.floor(Math.random() * ringCount);
        const radius = Math.min(30 + ringIndex * 25, maxDistance); // 30, 55, 80 units from center, up to maxDistance
        const angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
      }
      else {
        // Completely random but within boundaries
        const radius = Math.min(20 + Math.random() * 80, maxDistance); // Between 20-100 units from center, capped at maxDistance
        const angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
      }
      
      // Adjust y position to account for billboard height
      const y = height / 2;
      
      // Rotation options
      const rotationStyle = Math.floor(Math.random() * 4);
      let rotation;
      
      if (rotationStyle === 0) {
        // Face toward center
        rotation = Math.atan2(-z, -x);
      } 
      else if (rotationStyle === 1) {
        // Face away from center
        rotation = Math.atan2(-z, -x) + Math.PI;
      }
      else if (rotationStyle === 2) {
        // Face tangential clockwise
        rotation = Math.atan2(-z, -x) + Math.PI/2;
      }
      else {
        // Face tangential counter-clockwise
        rotation = Math.atan2(-z, -x) - Math.PI/2;
      }
      
      // Get random advertisement text
      const adText = this.advertisementTexts[Math.floor(Math.random() * this.advertisementTexts.length)];
      
      // Use the generic style for all billboards
      const genericStyle = new GenericBillboardStyle();
      
      // Create the billboard with the generic style
      const billboard = new Billboard(
        this.scene,
        new THREE.Vector3(x, y, z),
        rotation,
        adText,
        width,
        height,
        genericStyle
      );
      
      // Add to obstacles for collision detection
      this.obstacles.push(billboard.toObstacle());
      
      // Store in billboard array
      this.billboards.push(billboard);
    }
  }
  
  /**
   * Creates walls at the boundary of the world to prevent players, bots and projectiles from escaping
   */
  private createBoundaryWalls(): void {
    const wallThickness = 2;
    const wallColor = 0x555555; // Dark gray color for the walls
    
    // Create material with slight transparency for visibility
    const wallMaterial = new THREE.MeshLambertMaterial({ 
      color: wallColor,
      transparent: true,
      opacity: 0.7
    });
    
    // Create the four walls (North, South, East, West)
    const walls = [
      // North wall (positive Z)
      {
        size: new THREE.Vector3(this.worldSize * 2 + wallThickness * 2, this.wallHeight, wallThickness),
        position: new THREE.Vector3(0, this.wallHeight / 2, this.worldSize)
      },
      // South wall (negative Z)
      {
        size: new THREE.Vector3(this.worldSize * 2 + wallThickness * 2, this.wallHeight, wallThickness),
        position: new THREE.Vector3(0, this.wallHeight / 2, -this.worldSize)
      },
      // East wall (positive X)
      {
        size: new THREE.Vector3(wallThickness, this.wallHeight, this.worldSize * 2),
        position: new THREE.Vector3(this.worldSize, this.wallHeight / 2, 0)
      },
      // West wall (negative X)
      {
        size: new THREE.Vector3(wallThickness, this.wallHeight, this.worldSize * 2),
        position: new THREE.Vector3(-this.worldSize, this.wallHeight / 2, 0)
      }
    ];
    
    // Create each wall and add it to the scene and obstacles array
    walls.forEach(wallDef => {
      const geometry = new THREE.BoxGeometry(wallDef.size.x, wallDef.size.y, wallDef.size.z);
      const wallMesh = new THREE.Mesh(geometry, wallMaterial);
      
      wallMesh.position.copy(wallDef.position);
      wallMesh.castShadow = true;
      wallMesh.receiveShadow = true;
      
      this.scene.add(wallMesh);
      
      // Add to obstacles for collision detection
      const obstacle: Obstacle = {
        mesh: wallMesh,
        collider: {
          position: wallDef.position.clone(),
          size: wallDef.size.clone()
        }
      };
      
      this.obstacles.push(obstacle);
    });
    
    console.log("Boundary walls created");
  }
  
  public getObstacles(): Obstacle[] {
    return this.obstacles;
  }
  
  public getBillboards(): Billboard[] {
    return this.billboards;
  }
  
  public findSpawnPosition(): THREE.Vector3 {
    // Find a safe spawn position away from obstacles
    // Use the worldSize property to constrain the spawn position
    const safeMargin = 10; // Stay at least 10 units away from the walls
    const maxDistance = this.worldSize - safeMargin;
    
    let spawnX = Math.random() * (maxDistance * 2) - maxDistance;
    let spawnZ = Math.random() * (maxDistance * 2) - maxDistance;
    
    // Ensure player doesn't spawn inside an obstacle
    let validSpawn = false;
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loops
    
    while (!validSpawn && attempts < maxAttempts) {
      attempts++;
      validSpawn = true;
      for (const obstacle of this.obstacles) {
        const obstaclePos = obstacle.mesh.position;
        const distance = Math.sqrt(
          Math.pow(spawnX - obstaclePos.x, 2) + 
          Math.pow(spawnZ - obstaclePos.z, 2)
        );
        
        // Check distance from obstacle (consider obstacle size)
        const obstacleSize = obstacle.collider.size;
        const minSafeDistance = 3 + Math.max(obstacleSize.x, obstacleSize.z) / 2;
        
        if (distance < minSafeDistance) {
          validSpawn = false;
          spawnX = Math.random() * (maxDistance * 2) - maxDistance;
          spawnZ = Math.random() * (maxDistance * 2) - maxDistance;
          break;
        }
      }
    }
    
    if (attempts >= maxAttempts) {
      console.warn("Couldn't find ideal spawn position after max attempts. Using fallback position.");
      // Fallback to a position we know is safe (center of the world, but elevated)
      return new THREE.Vector3(0, 5, 0);
    }
    
    return new THREE.Vector3(spawnX, 1.8, spawnZ);
  }
  
  // Add a new advertisement text
  public addAdvertisementText(text: string): void {
    if (!this.advertisementTexts.includes(text)) {
      this.advertisementTexts.push(text);
    }
  }
} 