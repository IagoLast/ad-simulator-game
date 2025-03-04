import * as THREE from 'three';
import { Obstacle } from '../types';
import { Billboard, GenericBillboardStyle } from './Billboard';

export class ObstacleManager {
  private obstacles: Obstacle[] = [];
  private scene: THREE.Scene;
  private billboards: Billboard[] = [];
  private advertisementTexts: string[] = [
    'www.timetime.in',
    'www.theristack.com',
    'www.neon-example.com',
    'www.minimal-design.com',
    'www.vintage-ads.com'
  ];
  
  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }
  
  public createObstacles(count: number = 50): void {
    // Create both cubes and billboards
    this.createCubeObstacles(Math.floor(count * 0.6)); // 60% of count will be cubes
    this.createBillboards(Math.ceil(count * 0.4)); // 40% of count will be billboards
  }
  
  private createCubeObstacles(count: number): void {
    // Create several random obstacles
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1;
      const height = Math.random() * 3 + 1;
      const geometry = new THREE.BoxGeometry(size, height, size);
      const material = new THREE.MeshLambertMaterial({ color: 0x8b4513 }); // Brown
      const obstacleMesh = new THREE.Mesh(geometry, material);
      
      // Random position
      const x = Math.random() * 180 - 90;
      const y = height / 2;
      const z = Math.random() * 180 - 90;
      
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
      
      if (pattern === 0) {
        // Grid-like pattern with some randomness
        const gridSize = 25;
        const gridX = Math.floor(Math.random() * 8) - 4;
        const gridZ = Math.floor(Math.random() * 8) - 4;
        x = gridX * gridSize + (Math.random() * 10 - 5);
        z = gridZ * gridSize + (Math.random() * 10 - 5);
      } 
      else if (pattern === 1) {
        // Circular pattern with rings
        const ringCount = 3;
        const ringIndex = Math.floor(Math.random() * ringCount);
        const radius = 30 + ringIndex * 25; // 30, 55, 80 units from center
        const angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
      }
      else {
        // Completely random
        const radius = 20 + Math.random() * 80; // Between 20-100 units from center
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
  
  public getObstacles(): Obstacle[] {
    return this.obstacles;
  }
  
  public getBillboards(): Billboard[] {
    return this.billboards;
  }
  
  public findSpawnPosition(): THREE.Vector3 {
    // Find a safe spawn position away from obstacles
    let spawnX = Math.random() * 180 - 90;
    let spawnZ = Math.random() * 180 - 90;
    
    // Ensure player doesn't spawn inside an obstacle
    let validSpawn = false;
    while (!validSpawn) {
      validSpawn = true;
      for (const obstacle of this.obstacles) {
        const obstaclePos = obstacle.mesh.position;
        const distance = Math.sqrt(
          Math.pow(spawnX - obstaclePos.x, 2) + 
          Math.pow(spawnZ - obstaclePos.z, 2)
        );
        if (distance < 3) {
          validSpawn = false;
          spawnX = Math.random() * 180 - 90;
          spawnZ = Math.random() * 180 - 90;
          break;
        }
      }
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