import * as THREE from "three";
import { Ad, SimpleAdStyle } from "../classes/ads/Ad";
import { ColorfulAdStyle } from "./ColorfulAdStyle";
import { WallAdStyle } from "./ads/WallAdStyle";
import { Obstacle } from "../types";
import { MazeGenerator, AdPosition } from "./MazeGenerator";

export class ObstacleManager {
  private obstacles: Obstacle[] = [];
  private scene: THREE.Scene;
  private ads: Ad[] = [];
  // Brands that pay for ads
  private advertisementTexts: string[] = [
    // Just 2 for now
    "www.TimeTime.in",
    "www.TheirStack.com",
  ];
  private worldSize: number = 100; // Size of world (goes from -worldSize to +worldSize)
  private wallHeight: number = 100; // Height of the boundary walls

  // Array to store wall positions for ad placement
  private adPositions: AdPosition[] = [];

  // Reference to our maze generator
  private mazeGenerator: MazeGenerator;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.mazeGenerator = new MazeGenerator(scene, this.worldSize);
  }

  public createObstacles(count: number = 50): void {
    // Generate a maze and get ad positions
    const result = this.mazeGenerator.generateMaze(6);
    this.obstacles = [...result.obstacles];
    
    // Create solid boundary walls
    this.createBoundaryWalls();
    
    // Create world edge wall ads
    this.createWallAds();
    
    // Create cube obstacles
    this.createCubeObstacles(count);
    
    // Create traditional ads
    this.createAds(count);
  }

  private createCubeObstacles(_count: number): void {
    // We now use the maze generator instead of creating random cubes
    console.log(`Created obstacles using maze generator`);
  }

  private createAds(count: number): void {
    // If no wall positions are available, fall back to random placement
    if (this.adPositions.length === 0) {
      this.createRandomAds(count);
      return;
    }

    // Use a subset of available wall positions for ads
    const adCount = Math.min(count, Math.floor(this.adPositions.length * 0.4)); // Increased from 30% to 40%

    // Shuffle wall positions to get random ones
    const shuffledPositions = [...this.adPositions].sort(
      () => Math.random() - 0.5
    );

    // Debug log
    console.log(
      `Creating ${adCount} ads from ${this.adPositions.length} available positions`
    );

    // Keep track of placed ad positions to prevent overlapping
    const placedAdPositions: Array<{
      position: THREE.Vector3;
      size: { width: number; height: number };
      direction: string | null;
    }> = [];

    let adsCreated = 0;
    let positionIndex = 0;

    // Try to place ads, but avoid overlaps
    while (adsCreated < adCount && positionIndex < shuffledPositions.length) {
      const wallData = shuffledPositions[positionIndex];
      const wallPosition = wallData.position;
      const direction = wallData.direction;

      // Determine ad dimensions - larger dimensions for better visibility
      const width = Math.random() * 3 + 3; // 3-6 units wide
      const height = Math.random() * 2 + 2; // 2-4 units tall

      // Calculate rotation based on wall direction
      let rotation = 0;
      let offsetX = 0;
      let offsetZ = 0;

      if (direction === "north") {
        rotation = Math.PI;
        offsetZ = -5.1; // Significantly increased offset to place ad in front of wall
      } else if (direction === "south") {
        rotation = 0;
        offsetZ = 5.1; // Significantly increased offset to place ad in front of wall
      } else if (direction === "east") {
        rotation = Math.PI / 2;
        offsetX = 5.1; // Significantly increased offset to place ad in front of wall
      } else if (direction === "west") {
        rotation = -Math.PI / 2;
        offsetX = -5.1; // Significantly increased offset to place ad in front of wall
      }

      // Calculate final position - randomize height for variety
      // Make ads appear at different heights on the walls
      const heightVariation = Math.random() * 2 - 0.5; // -0.5 to 1.5 units offset
      const position = new THREE.Vector3(
        wallPosition.x + offsetX,
        wallPosition.y + heightVariation,
        wallPosition.z + offsetZ
      );

      // Check for overlapping with existing ads
      const wouldOverlap = this.checkAdOverlap(
        position,
        { width, height },
        direction,
        placedAdPositions
      );

      if (!wouldOverlap) {
        // Position is good, create the ad
        // Pick a random advertisement text
        const adText = this.getRandomAdText();

        // Create either a simple or colorful ad style based on random chance
        const useColorful = Math.random() > 0.3; // 70% chance of colorful style
        const adStyle = useColorful
          ? new ColorfulAdStyle()
          : new SimpleAdStyle();

        // Create the ad with the selected style
        const ad = new Ad(
          this.scene,
          position,
          rotation,
          adText,
          width,
          height,
          adStyle
        );

        // Add to obstacles for collision detection
        this.obstacles.push(ad.toObstacle());

        // Store in ad array
        this.ads.push(ad);

        // Remember this position to avoid overlaps
        placedAdPositions.push({
          position,
          size: { width, height },
          direction,
        });

        adsCreated++;
      }

      // Move to next position regardless of whether we placed an ad or not
      positionIndex++;
    }

    console.log(
      `Created ${adsCreated} ads integrated with maze walls (${positionIndex} positions checked)`
    );
  }
  /**
   * Check if a proposed ad position would overlap with existing ads
   * @param position Position to check
   * @param size Dimensions of the ad
   * @param direction Direction the ad is facing (for wall-mounted ads)
   * @param existingAds Array of already placed ads
   * @returns Whether the ad would overlap with any existing ads
   */
  private checkAdOverlap(
    position: THREE.Vector3,
    size: { width: number; height: number },
    direction: string | null,
    existingAds: Array<{
      position: THREE.Vector3;
      size: { width: number; height: number };
      direction: string | null;
    }>
  ): boolean {
    // Minimum safe distance between ads
    const minDistanceX = 8; // Increased horizontal gap
    const minDistanceY = 6; // Increased vertical gap
    const minDistanceZ = 8; // Increased depth gap

    // Check against each existing ad
    for (const existingAd of existingAds) {
      // Skip checking ads facing different directions on walls
      // (we only care about ads on the same wall face)
      if (
        direction &&
        existingAd.direction &&
        direction !== existingAd.direction
      ) {
        continue;
      }

      // Calculate distance between centers
      const dx = Math.abs(position.x - existingAd.position.x);
      const dy = Math.abs(position.y - existingAd.position.y);
      const dz = Math.abs(position.z - existingAd.position.z);

      // Calculate minimum separation for non-overlap
      const requiredX = (size.width + existingAd.size.width) / 2 + minDistanceX;
      const requiredY =
        (size.height + existingAd.size.height) / 2 + minDistanceY;

      // For free-standing ads, check in both X and Z dimensions
      // For wall-mounted ads, the check depends on the wall orientation
      if (direction === "north" || direction === "south") {
        // Ads on north/south walls extend in X direction
        if (dx < requiredX && dy < requiredY && dz < minDistanceZ) {
          return true; // Would overlap
        }
      } else if (direction === "east" || direction === "west") {
        // Ads on east/west walls extend in Z direction
        if (dx < minDistanceZ && dy < requiredY && dz < requiredX) {
          return true; // Would overlap
        }
      } else {
        // Free-standing ads - check in all dimensions
        const requiredZ =
          (size.width + existingAd.size.width) / 2 + minDistanceZ;
        if (dx < requiredX && dy < requiredY && dz < requiredZ) {
          return true; // Would overlap
        }
      }
    }

    // No overlaps found
    return false;
  }

  private createBoundaryWalls(): void {
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
  }

  /**
   * Creates gigantic wall ads on the boundary walls
   */
  private createWallAds(): void {
    console.log('Creating gigantic wall ads on boundary walls');
    
    // Wall positions - we'll place one ad on each wall, and two extra on bigger walls
    // (6 ads total as requested)
    const offset = 2; // Offset from the wall to prevent clipping
    const walls = [
      // North wall (front)
      {
        position: new THREE.Vector3(0, this.wallHeight / 2, this.worldSize - offset),
        rotation: 0,
        width: this.worldSize * 0.7, // Reduced size
        height: this.wallHeight * 0.6  // Reduced size
      },
      // North wall (front) - second ad
      {
        position: new THREE.Vector3(-this.worldSize / 2, this.wallHeight / 2, this.worldSize - offset),
        rotation: 0,
        width: this.worldSize * 0.3, // Reduced size
        height: this.wallHeight * 0.6  // Reduced size
      },
      // South wall (back)
      {
        position: new THREE.Vector3(0, this.wallHeight / 2, -this.worldSize + offset),
        rotation: Math.PI,
        width: this.worldSize * 0.7, // Reduced size
        height: this.wallHeight * 0.6  // Reduced size
      },
      // South wall (back) - second ad
      {
        position: new THREE.Vector3(this.worldSize / 2, this.wallHeight / 2, -this.worldSize + offset),
        rotation: Math.PI,
        width: this.worldSize * 0.3, // Reduced size
        height: this.wallHeight * 0.6  // Reduced size
      },
      // East wall (right)
      {
        position: new THREE.Vector3(this.worldSize - offset, this.wallHeight / 2, 0),
        rotation: -Math.PI / 2,
        width: this.worldSize * 0.7, // Reduced size
        height: this.wallHeight * 0.6  // Reduced size
      },
      // West wall (left)
      {
        position: new THREE.Vector3(-this.worldSize + offset, this.wallHeight / 2, 0),
        rotation: Math.PI / 2,
        width: this.worldSize * 0.7, // Reduced size
        height: this.wallHeight * 0.6  // Reduced size
      }
    ];
    
    // Create each wall ad
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      
      // Get a random ad text
      const adText = this.getRandomAdText();
      
      // Create the ad using our new WallAdStyle
      const ad = new Ad(
        this.scene,
        wall.position,
        wall.rotation,
        adText,
        wall.width,
        wall.height,
        new WallAdStyle()
      );
      
      // Add to obstacles for collision detection
      this.obstacles.push(ad.toObstacle());
      
      // Store in ad array
      this.ads.push(ad);
      
      console.log(`Created wall ad #${i+1} with text "${adText}"`);
    }
  }

  public getObstacles(): Obstacle[] {
    return this.obstacles;
  }

  public getAds(): Ad[] {
    return this.ads;
  }

  public findSpawnPosition(): THREE.Vector3 {
    // Find a random position that doesn't collide with any obstacles
    const margin = 10; // Keep away from world edges
    const worldBound = this.worldSize - margin;

    let x = Math.random() * (worldBound * 2) - worldBound;
    let z = Math.random() * (worldBound * 2) - worldBound;

    let validPosition = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!validPosition && attempts < maxAttempts) {
      attempts++;
      validPosition = true;

      // Check all obstacles for collisions
      for (const obstacle of this.obstacles) {
        const obstaclePos = obstacle.mesh.position;
        const obstacleSize = obstacle.collider.size;

        // Calculate safe distance (half obstacle width/depth + player radius + margin)
        const safeDistanceX = obstacleSize.x / 2 + 1 + 1; // player radius + margin
        const safeDistanceZ = obstacleSize.z / 2 + 1 + 1;

        // Check if too close to obstacle
        if (
          Math.abs(x - obstaclePos.x) < safeDistanceX &&
          Math.abs(z - obstaclePos.z) < safeDistanceZ
        ) {
          validPosition = false;

          // Try a new position
          x = Math.random() * (worldBound * 2) - worldBound;
          z = Math.random() * (worldBound * 2) - worldBound;
          break;
        }
      }
    }

    if (attempts >= maxAttempts) {
      console.warn(
        "Could not find a valid spawn position after maximum attempts. Using last generated position."
      );
    }

    return new THREE.Vector3(x, 2, z); // 2 units above ground
  }

  /**
   * Get a random advertisement text
   * @returns A random text from the advertisement pool
   */
  private getRandomAdText(): string {
    return this.advertisementTexts[
      Math.floor(Math.random() * this.advertisementTexts.length)
    ];
  }
}
