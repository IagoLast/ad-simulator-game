import * as THREE from "three";
import { Ad, SimpleAdStyle } from "../classes/ads/Ad";
import { ColorfulAdStyle } from "../classes/SimpleAdStyle";
import { WallAdStyle } from "../classes/ads/WallAdStyle";
import { Obstacle } from "../types";
import { AdPosition } from "../classes/MazeGenerator";

/**
 * Manages all advertisements in the game world
 */
export class AdManager {
  private ads: Ad[] = [];
  private advertisementTexts: string[] = [
    // URLs and domains
    "www.TimeTime.in",
    "www.TheirStack.com",
    "www.GiantWallAds.com",
    "www.HugeDisplays.io",
    "www.MegaAdvert.net",
    "www.VisitNow.org",
  ];
  private scene: THREE.Scene;
  private adPositions: AdPosition[] = [];
  private obstacles: Obstacle[] = [];
  private worldSize: number;
  private wallHeight: number;

  constructor(scene: THREE.Scene, worldSize: number = 100, wallHeight: number = 100) {
    this.scene = scene;
    this.worldSize = worldSize;
    this.wallHeight = wallHeight;
  }

  /**
   * Set available positions for ads from maze walls
   */
  public setAdPositions(positions: AdPosition[]): void {
    this.adPositions = positions;
  }

  /**
   * Add a new advertisement text to the pool
   */
  public addAdvertisementText(text: string): void {
    if (!this.advertisementTexts.includes(text)) {
      this.advertisementTexts.push(text);
      console.log(`Added new ad text: "${text}"`);
    }
  }

  /**
   * Get a random advertisement text from the pool
   */
  private getRandomAdText(): string {
    const index = Math.floor(Math.random() * this.advertisementTexts.length);
    return this.advertisementTexts[index];
  }

  /**
   * Create ads on maze walls
   */
  public createWallAds(count: number): Obstacle[] {
    // If no wall positions are available, fall back to random placement
    if (this.adPositions.length === 0) {
      return this.createRandomAds(count);
    }

    // Clear previous ads
    this.obstacles = [];

    // Use a subset of available wall positions for ads
    const adCount = Math.min(count, Math.floor(this.adPositions.length * 0.4)); // 40% of available positions

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
    
    return this.obstacles;
  }

  /**
   * Creates gigantic wall ads on the boundary walls
   */
  public createBoundaryWallAds(): Obstacle[] {
    console.log('Creating gigantic wall ads on boundary walls');
    
    // Clear previous obstacles
    const newObstacles: Obstacle[] = [];
    
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
      const obstacle = ad.toObstacle();
      newObstacles.push(obstacle);
      
      // Store in ad array
      this.ads.push(ad);
      
      console.log(`Created wall ad #${i+1} with text "${adText}"`);
    }
    
    this.obstacles = [...this.obstacles, ...newObstacles];
    return newObstacles;
  }

  /**
   * Fallback method for random ad placement
   */
  private createRandomAds(count: number): Obstacle[] {
    console.log(`Creating ${count} random ads (fallback method)`);
    
    // Clear previous obstacles from random ads
    const newObstacles: Obstacle[] = [];

    // Keep track of placed ad positions to prevent overlapping
    const placedAdPositions: Array<{
      position: THREE.Vector3;
      size: { width: number; height: number };
      direction: string | null;
    }> = [];

    let adsCreated = 0;
    let attempts = 0;
    const maxAttempts = count * 10; // Allow several attempts per desired ad

    while (adsCreated < count && attempts < maxAttempts) {
      attempts++;

      // Varied size range for ads
      const width = Math.random() * 3 + 3; // 3-6 units wide
      const height = Math.random() * 2 + 2; // 2-4 units tall

      // Random position
      const x = (Math.random() * 2 - 1) * (this.worldSize - 10); // Keep away from walls
      const z = (Math.random() * 2 - 1) * (this.worldSize - 10);
      const y = height / 2 + 0.1; // Just above ground level

      // Random rotation (only around Y axis)
      const rotation = Math.random() * Math.PI * 2;

      const position = new THREE.Vector3(x, y, z);

      // Check for overlap with existing ads
      const wouldOverlap = this.checkAdOverlap(
        position,
        { width, height },
        null, // No specific direction for random ads
        placedAdPositions
      );

      if (!wouldOverlap) {
        // Get random ad text and style
        const adText = this.getRandomAdText();
        const useColorful = Math.random() > 0.3; // 70% chance of colorful
        const adStyle = useColorful
          ? new ColorfulAdStyle()
          : new SimpleAdStyle();

        // Create the ad
        const ad = new Ad(
          this.scene,
          position,
          rotation,
          adText,
          width,
          height,
          adStyle
        );

        // Store the ad
        const obstacle = ad.toObstacle();
        newObstacles.push(obstacle);
        this.ads.push(ad);

        // Remember position to avoid overlaps
        placedAdPositions.push({
          position,
          size: { width, height },
          direction: null,
        });

        adsCreated++;
      }
    }

    console.log(
      `Created ${adsCreated} random ads (after ${attempts} attempts)`
    );
    
    this.obstacles = [...this.obstacles, ...newObstacles];
    return newObstacles;
  }

  /**
   * Check if a new ad would overlap with existing ads
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
    // Minimum allowed distance between ads
    const minDistance = Math.max(size.width, size.height) * 1.5;

    for (const existingAd of existingAds) {
      // For ads on the same wall (same direction), check 2D overlap
      if (direction && direction === existingAd.direction) {
        const dx = Math.abs(position.x - existingAd.position.x);
        const dy = Math.abs(position.y - existingAd.position.y);
        const minX = (size.width + existingAd.size.width) / 2 * 0.8; // 80% of combined half-widths
        const minY = (size.height + existingAd.size.height) / 2 * 0.8; // 80% of combined half-heights

        if (dx < minX && dy < minY) {
          return true; // Overlap detected
        }
      } else {
        // For ads on different walls or random positions, use distance check
        const distance = position.distanceTo(existingAd.position);
        if (distance < minDistance) {
          return true; // Too close
        }
      }
    }

    // No overlaps found
    return false;
  }

  /**
   * Get all ad obstacles
   */
  public getObstacles(): Obstacle[] {
    return this.obstacles;
  }

  /**
   * Get all ads
   */
  public getAds(): Ad[] {
    return this.ads;
  }
} 