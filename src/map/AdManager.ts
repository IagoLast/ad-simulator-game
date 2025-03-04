import * as THREE from "three";
import { Ad, SimpleAdStyle } from "../classes/ads/Ad";
import { ColorfulAdStyle } from "../classes/ColorfulAdStyle";
import { WallAdStyle } from "../classes/ads/WallAdStyle";
import { Obstacle } from "../types";
import { AdPosition } from "./MazeGenerator";

/**
 * Manages all advertisements in the game world
 */
export class AdManager {
  private ads: Ad[] = [];
  private advertisementTexts: string[] = [
    // URLs and domains
    "www.TimeTime.in",
    "www.TheirStack.com",
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
    
    // Wall ads configuration
    const offset = 10; // Distance from walls
    
    // Set standard aspect ratio for all ads (width/height)
    const aspectRatio = 1.8; // Typical billboard aspect ratio
    
    // Calculate sizes based on world dimensions and maintain aspect ratio
    const primaryWidth = this.worldSize * 0.55; // Slightly reduced for better spacing
    const primaryHeight = primaryWidth / aspectRatio;
    
    const secondaryWidth = this.worldSize * 0.22; // Reduced to avoid overlaps
    const secondaryHeight = secondaryWidth / aspectRatio;
    
    // Increased spacing values to prevent overlaps
    const horizontalSpacing = 25; // Increased from 15
    
    // Create tracking for placed ads to check overlaps
    const placedAds: Array<{
      position: THREE.Vector3;
      size: { width: number; height: number };
      direction: string | null;
    }> = [];
    
    // Wall positions with careful spacing to avoid overlaps
    // ALL rotations MUST face inward to the battlefield
    const walls = [
      // North wall (front) - center ad
      {
        position: new THREE.Vector3(0, this.wallHeight / 2, this.worldSize - offset),
        rotation: Math.PI, // Facing inward (rotated 180 degrees)
        width: primaryWidth, 
        height: primaryHeight,
        name: "North Wall Center",
        direction: "north"
      },
      // North wall (front) - left side ad
      {
        // Positioned to the left with proper spacing to avoid overlap
        position: new THREE.Vector3(-this.worldSize / 2 + secondaryWidth/2 + horizontalSpacing, 
                                    this.wallHeight / 2, 
                                    this.worldSize - offset),
        rotation: Math.PI, // Facing inward (rotated 180 degrees)
        width: secondaryWidth,
        height: secondaryHeight,
        name: "North Wall Left",
        direction: "north"
      },
      // South wall (back) - center ad
      {
        position: new THREE.Vector3(0, this.wallHeight / 2, -this.worldSize + offset),
        rotation: 0, // Facing inward (no rotation needed)
        width: primaryWidth,
        height: primaryHeight,
        name: "South Wall Center",
        direction: "south"
      },
      // South wall (back) - right side ad
      {
        // Positioned to the right with proper spacing to avoid overlap
        position: new THREE.Vector3(this.worldSize / 2 - secondaryWidth/2 - horizontalSpacing, 
                                   this.wallHeight / 2, 
                                   -this.worldSize + offset),
        rotation: 0, // Facing inward (no rotation needed)
        width: secondaryWidth,
        height: secondaryHeight,
        name: "South Wall Right",
        direction: "south"
      },
      // East wall (right)
      {
        position: new THREE.Vector3(this.worldSize - offset, this.wallHeight / 2, 0),
        rotation: -Math.PI / 2, // Facing inward - changed to ensure proper orientation
        width: primaryWidth,
        height: primaryHeight,
        name: "East Wall",
        direction: "east"
      },
      // West wall (left)
      {
        position: new THREE.Vector3(-this.worldSize + offset, this.wallHeight / 2, 0),
        rotation: Math.PI / 2, // Facing inward - changed to ensure proper orientation
        width: primaryWidth,
        height: primaryHeight,
        name: "West Wall",
        direction: "west"
      }
    ];
    
    // Create each wall ad, checking for overlaps
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      
      // Check if this wall ad would overlap with any existing ads
      const wallPosition = wall.position.clone();
      
      // Skip this wall position if it overlaps with existing ads
      if (this.checkAdOverlap(
        wallPosition,
        { width: wall.width, height: wall.height },
        wall.direction,
        placedAds
      )) {
        console.log(`Skipping wall ad "${wall.name}" due to potential overlap`);
        continue;
      }
      
      // Get a random ad text
      const adText = this.getRandomAdText();
      
      // Create the ad using WallAdStyle
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
      
      // Track this ad for overlap checking
      placedAds.push({
        position: wall.position.clone(),
        size: { width: wall.width, height: wall.height },
        direction: wall.direction
      });
      
      console.log(`Created wall ad "${wall.name}" with text "${adText}" (${wall.width.toFixed(1)}x${wall.height.toFixed(1)})`);
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