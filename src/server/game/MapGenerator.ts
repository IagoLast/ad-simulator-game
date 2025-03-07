import {
  Billboard,
  EntityType,
  Exit,
  Flag,
  MapData,
  MapEntity,
  Wall,
} from "../../shared/types";

/**
 * Gap definition for maze wall openings
 */
interface GapPosition {
  start: number;
  width: number;
}

/**
 * MapGenerator class for creating maze maps with walls and exits
 */
export class MapGenerator {
  private width: number;
  private height: number;
  private billboardTexts: string[] = [
    "www.timetime.in",
    "theirstack.com",
    "https://mcp-framework.com/",
    "Hawkings Education",
    "deiser.com",
    "codely.com"
  ];

  // Different billboard types/configurations
  private billboardTypes = [
    // Standard (vertical)
    { width: 5, height: 3, depth: 0.2, yOffset: 1.5 },
    // Landscape (horizontal)
    { width: 6, height: 2, depth: 0.2, yOffset: 1.0 },
    // Square
    { width: 3, height: 3, depth: 0.2, yOffset: 1.5 },
    // Tall/Narrow
    { width: 2, height: 4, depth: 0.2, yOffset: 2.0 },
    // Short/Wide
    { width: 7, height: 1.5, depth: 0.2, yOffset: 0.75 },
  ];

  /**
   * Create a new MapGenerator
   * @param width Width of the map (in grid units)
   * @param height Height of the map (in grid units)
   */
  constructor(width: number = 60, height: number = 60) {
    this.width = width;
    this.height = height;
  }

  /**
   * Generate a simple maze map with walls and two exits (one for each team)
   * @returns MapData with walls and exits
   */
  public generateMap(): MapData {
    const entities: MapEntity[] = [];

    // Add outer walls
    this.addOuterWalls(entities);

    // Add some random inner walls to create a maze-like structure
    // this.addInnerWalls(entities);

    // Add exits for both teams
    this.addExits(entities);

    // Add billboards as obstacles
    this.addBillboards(entities);

    // Add the flag for capture the flag gameplay
    this.addFlag(entities);

    return {
      width: this.width,
      height: this.height,
      entities,
    };
  }

  /**
   * Add outer walls to the map
   * @param entities Array of map entities to add walls to
   */
  private addOuterWalls(entities: MapEntity[]): void {
    const wallHeight = 5;
    const wallDepth = 1;

    // North wall (along z = -this.height/2)
    entities.push({
      type: EntityType.WALL,
      position: { x: 0, y: wallHeight / 2, z: -this.height / 2 },
      dimensions: { width: this.width, height: wallHeight, depth: wallDepth },
    } as Wall);

    // South wall (along z = this.height/2)
    entities.push({
      type: EntityType.WALL,
      position: { x: 0, y: wallHeight / 2, z: this.height / 2 },
      dimensions: { width: this.width, height: wallHeight, depth: wallDepth },
    } as Wall);

    // East wall (along x = this.width/2)
    entities.push({
      type: EntityType.WALL,
      position: { x: this.width / 2, y: wallHeight / 2, z: 0 },
      dimensions: { width: wallDepth, height: wallHeight, depth: this.height },
    } as Wall);

    // West wall (along x = -this.width/2)
    entities.push({
      type: EntityType.WALL,
      position: { x: -this.width / 2, y: wallHeight / 2, z: 0 },
      dimensions: { width: wallDepth, height: wallHeight, depth: this.height },
    } as Wall);
  }

  /**
   * Add inner walls to create a maze-like structure
   * @param entities Array of map entities to add walls to
   */
  private addInnerWalls(entities: MapEntity[]): void {
    const wallHeight = 4;
    const wallDepth = 1;

    // Define central square dimensions
    const centralSquareSize = 15; // Size of the central square
    const centralSquareHalfSize = centralSquareSize / 2;
    const centralSquareMin = -centralSquareHalfSize;
    const centralSquareMax = centralSquareHalfSize;

    // Add horizontal inner walls (increased from 3 to 5) and make them more sparse
    for (let i = 0; i < 5; i++) {
      // Adjust wall positions to leave more space
      const zPos = -this.height / 2 + (i + 1) * (this.height / 6);

      // Skip walls that would intersect with central square
      if (zPos > centralSquareMin && zPos < centralSquareMax) {
        continue;
      }

      const length = this.width - 8 - Math.floor(Math.random() * 8); // Make walls shorter
      const startX = -this.width / 2 + 4; // Start walls further from edges

      // Add more and wider gaps in walls to create more paths
      const numGaps = Math.floor(Math.random() * 2) + 3; // 3-4 gaps per wall

      // Generate gap positions
      const gapPositions: GapPosition[] = [];
      for (let g = 0; g < numGaps; g++) {
        const gapPos = startX + Math.floor(Math.random() * (length - 6)) + 3;
        const gapWidth = Math.floor(Math.random() * 3) + 4; // 4-6 units wide (larger gaps)
        gapPositions.push({ start: gapPos, width: gapWidth });
      }

      // Sort gaps by position
      gapPositions.sort((a, b) => a.start - b.start);

      // Create wall segments between gaps
      let lastEnd = startX;
      for (let g = 0; g < gapPositions.length; g++) {
        const gap = gapPositions[g];

        // Skip wall segments that would intersect with the central square
        const segmentStart = lastEnd;
        const segmentEnd = gap.start;

        // If this segment would intersect with central square, skip or split it
        const intersectsLeft =
          segmentStart < centralSquareMin && segmentEnd > centralSquareMin;
        const intersectsRight =
          segmentStart < centralSquareMax && segmentEnd > centralSquareMax;
        const containedInSquare =
          segmentStart >= centralSquareMin && segmentEnd <= centralSquareMax;

        if (!containedInSquare) {
          // If segment intersects left edge of square, create left part only
          if (intersectsLeft) {
            entities.push({
              type: EntityType.WALL,
              position: {
                x: lastEnd + (centralSquareMin - lastEnd) / 2,
                y: wallHeight / 2,
                z: zPos,
              },
              dimensions: {
                width: centralSquareMin - lastEnd,
                height: wallHeight,
                depth: wallDepth,
              },
            } as Wall);
          }
          // If segment intersects right edge of square, create right part only
          else if (intersectsRight) {
            entities.push({
              type: EntityType.WALL,
              position: {
                x: centralSquareMax + (segmentEnd - centralSquareMax) / 2,
                y: wallHeight / 2,
                z: zPos,
              },
              dimensions: {
                width: segmentEnd - centralSquareMax,
                height: wallHeight,
                depth: wallDepth,
              },
            } as Wall);
          }
          // If segment doesn't intersect with square at all, create it normally
          else if (gap.start > lastEnd) {
            entities.push({
              type: EntityType.WALL,
              position: {
                x: lastEnd + (gap.start - lastEnd) / 2,
                y: wallHeight / 2,
                z: zPos,
              },
              dimensions: {
                width: gap.start - lastEnd,
                height: wallHeight,
                depth: wallDepth,
              },
            } as Wall);
          }
        }

        lastEnd = gap.start + gap.width;
      }

      // Add final wall segment if there's space
      if (startX + length > lastEnd) {
        // Skip wall segments that would intersect with the central square
        const segmentStart = lastEnd;
        const segmentEnd = startX + length;

        // If this segment would intersect with central square, skip or split it
        const intersectsLeft =
          segmentStart < centralSquareMin && segmentEnd > centralSquareMin;
        const intersectsRight =
          segmentStart < centralSquareMax && segmentEnd > centralSquareMax;
        const containedInSquare =
          segmentStart >= centralSquareMin && segmentEnd <= centralSquareMax;

        if (!containedInSquare) {
          // If segment intersects left edge of square, create left part only
          if (intersectsLeft) {
            entities.push({
              type: EntityType.WALL,
              position: {
                x: lastEnd + (centralSquareMin - lastEnd) / 2,
                y: wallHeight / 2,
                z: zPos,
              },
              dimensions: {
                width: centralSquareMin - lastEnd,
                height: wallHeight,
                depth: wallDepth,
              },
            } as Wall);
          }
          // If segment intersects right edge of square, create right part only
          else if (intersectsRight) {
            entities.push({
              type: EntityType.WALL,
              position: {
                x: centralSquareMax + (segmentEnd - centralSquareMax) / 2,
                y: wallHeight / 2,
                z: zPos,
              },
              dimensions: {
                width: segmentEnd - centralSquareMax,
                height: wallHeight,
                depth: wallDepth,
              },
            } as Wall);
          }
          // If segment doesn't intersect with square at all, create it normally
          else {
            entities.push({
              type: EntityType.WALL,
              position: {
                x: lastEnd + (startX + length - lastEnd) / 2,
                y: wallHeight / 2,
                z: zPos,
              },
              dimensions: {
                width: startX + length - lastEnd,
                height: wallHeight,
                depth: wallDepth,
              },
            } as Wall);
          }
        }
      }
    }

    // Add vertical inner walls (increased from 3 to 5) and make them sparse
    for (let i = 0; i < 5; i++) {
      // Adjust wall positions to leave more space
      const xPos = -this.width / 2 + (i + 1) * (this.width / 6);

      // Skip walls that would intersect with central square
      if (xPos > centralSquareMin && xPos < centralSquareMax) {
        continue;
      }

      const length = this.height - 8 - Math.floor(Math.random() * 8); // Make walls shorter
      const startZ = -this.height / 2 + 4; // Start walls further from edges

      // Add more and wider gaps in walls to create more paths
      const numGaps = Math.floor(Math.random() * 2) + 3; // 3-4 gaps per wall

      // Generate gap positions
      const gapPositions: GapPosition[] = [];
      for (let g = 0; g < numGaps; g++) {
        const gapPos = startZ + Math.floor(Math.random() * (length - 6)) + 3;
        const gapWidth = Math.floor(Math.random() * 3) + 4; // 4-6 units wide (larger gaps)
        gapPositions.push({ start: gapPos, width: gapWidth });
      }

      // Sort gaps by position
      gapPositions.sort((a, b) => a.start - b.start);

      // Create wall segments between gaps
      let lastEnd = startZ;
      for (let g = 0; g < gapPositions.length; g++) {
        const gap = gapPositions[g];

        // Skip wall segments that would intersect with the central square
        const segmentStart = lastEnd;
        const segmentEnd = gap.start;

        // If this segment would intersect with central square, skip or split it
        const intersectsBottom =
          segmentStart < centralSquareMin && segmentEnd > centralSquareMin;
        const intersectsTop =
          segmentStart < centralSquareMax && segmentEnd > centralSquareMax;
        const containedInSquare =
          segmentStart >= centralSquareMin && segmentEnd <= centralSquareMax;

        if (!containedInSquare) {
          // If segment intersects bottom edge of square, create bottom part only
          if (intersectsBottom) {
            entities.push({
              type: EntityType.WALL,
              position: {
                x: xPos,
                y: wallHeight / 2,
                z: lastEnd + (centralSquareMin - lastEnd) / 2,
              },
              dimensions: {
                width: wallDepth,
                height: wallHeight,
                depth: centralSquareMin - lastEnd,
              },
            } as Wall);
          }
          // If segment intersects top edge of square, create top part only
          else if (intersectsTop) {
            entities.push({
              type: EntityType.WALL,
              position: {
                x: xPos,
                y: wallHeight / 2,
                z: centralSquareMax + (segmentEnd - centralSquareMax) / 2,
              },
              dimensions: {
                width: wallDepth,
                height: wallHeight,
                depth: segmentEnd - centralSquareMax,
              },
            } as Wall);
          }
          // If segment doesn't intersect with square at all, create it normally
          else if (gap.start > lastEnd) {
            entities.push({
              type: EntityType.WALL,
              position: {
                x: xPos,
                y: wallHeight / 2,
                z: lastEnd + (gap.start - lastEnd) / 2,
              },
              dimensions: {
                width: wallDepth,
                height: wallHeight,
                depth: gap.start - lastEnd,
              },
            } as Wall);
          }
        }

        lastEnd = gap.start + gap.width;
      }

      // Add final wall segment if there's space
      if (startZ + length > lastEnd) {
        // Skip wall segments that would intersect with the central square
        const segmentStart = lastEnd;
        const segmentEnd = startZ + length;

        // If this segment would intersect with central square, skip or split it
        const intersectsBottom =
          segmentStart < centralSquareMin && segmentEnd > centralSquareMin;
        const intersectsTop =
          segmentStart < centralSquareMax && segmentEnd > centralSquareMax;
        const containedInSquare =
          segmentStart >= centralSquareMin && segmentEnd <= centralSquareMax;

        if (!containedInSquare) {
          // If segment intersects bottom edge of square, create bottom part only
          if (intersectsBottom) {
            entities.push({
              type: EntityType.WALL,
              position: {
                x: xPos,
                y: wallHeight / 2,
                z: lastEnd + (centralSquareMin - lastEnd) / 2,
              },
              dimensions: {
                width: wallDepth,
                height: wallHeight,
                depth: centralSquareMin - lastEnd,
              },
            } as Wall);
          }
          // If segment intersects top edge of square, create top part only
          else if (intersectsTop) {
            entities.push({
              type: EntityType.WALL,
              position: {
                x: xPos,
                y: wallHeight / 2,
                z: centralSquareMax + (segmentEnd - centralSquareMax) / 2,
              },
              dimensions: {
                width: wallDepth,
                height: wallHeight,
                depth: segmentEnd - centralSquareMax,
              },
            } as Wall);
          }
          // If segment doesn't intersect with square at all, create it normally
          else {
            entities.push({
              type: EntityType.WALL,
              position: {
                x: xPos,
                y: wallHeight / 2,
                z: lastEnd + (startZ + length - lastEnd) / 2,
              },
              dimensions: {
                width: wallDepth,
                height: wallHeight,
                depth: startZ + length - lastEnd,
              },
            } as Wall);
          }
        }
      }
    }

    // Add diagonal walls (increased from 2 to 4) and keep them away from central square
    for (let i = 0; i < 4; i++) {
      // Position diagonal walls in corners and around the map
      const positions = [
        { x: -this.width / 3, z: -this.height / 3 },
        { x: this.width / 3, z: this.height / 3 },
        { x: -this.width / 4, z: this.height / 4 },
        { x: this.width / 4, z: -this.height / 4 },
      ];

      const position = positions[i];
      const length = 8 + Math.floor(Math.random() * 4); // Shorter diagonal walls

      // Create diagonal wall (45 degrees)
      entities.push({
        type: EntityType.WALL,
        position: {
          x: position.x,
          y: wallHeight / 2,
          z: position.z,
        },
        dimensions: {
          width: length,
          height: wallHeight,
          depth: wallDepth,
        },
      } as Wall);

      // Rotate the wall 45 degrees
      const rotation = { x: 0, y: Math.PI / 4, z: 0 };
      const lastWall = entities[entities.length - 1] as Wall;
      lastWall.rotation = rotation;
    }

    // Add some additional corner barriers near team exits
    this.addCornerBarriers(entities, wallHeight, wallDepth);
  }

  /**
   * Add corner barriers around team exits to create protected zones
   * @param entities Array of map entities to add walls to
   * @param wallHeight Height of the walls
   * @param wallDepth Depth of the walls
   */
  private addCornerBarriers(
    entities: MapEntity[],
    wallHeight: number,
    wallDepth: number
  ): void {
    // Team 1 corner (Northwest)
    this.addCornerWall(
      entities,
      -this.width / 2 + 10,
      -this.height / 2 + 10,
      10,
      wallHeight,
      wallDepth,
      0 // rotation angle
    );

    this.addCornerWall(
      entities,
      -this.width / 2 + 10,
      -this.height / 2 + 10,
      10,
      wallHeight,
      wallDepth,
      Math.PI / 2 // 90 degrees
    );

    // Team 2 corner (Southeast)
    this.addCornerWall(
      entities,
      this.width / 2 - 10,
      this.height / 2 - 10,
      10,
      wallHeight,
      wallDepth,
      Math.PI // 180 degrees
    );

    this.addCornerWall(
      entities,
      this.width / 2 - 10,
      this.height / 2 - 10,
      10,
      wallHeight,
      wallDepth,
      -Math.PI / 2 // -90 degrees
    );
  }

  /**
   * Add a single corner wall
   */
  private addCornerWall(
    entities: MapEntity[],
    x: number,
    z: number,
    length: number,
    height: number,
    depth: number,
    angle: number
  ): void {
    entities.push({
      type: EntityType.WALL,
      position: { x, y: height / 2, z },
      dimensions: { width: length, height, depth },
      rotation: { x: 0, y: angle, z: 0 },
    } as Wall);
  }

  /**
   * Add team exits to the map
   * This is also referred as "BASE".
   * @param entities Array of map entities to add exits to
   */
  private addExits(entities: MapEntity[]): void {
    /**
     * Team 1 positioned near west wall.
     */
    entities.push({
      type: EntityType.EXIT,
      position: { x: -this.width / 2 + 8, y: 0.1, z: -this.height / 2 + 8 },
      dimensions: { width: 4, height: 0.2, depth: 4 },
      teamId: 1,
    });

    /**
     * Team 2 positioned near east wall.
     */
    entities.push({
      type: EntityType.EXIT,
      position: { x: this.width / 2 - 8, y: 0.1, z: this.height / 2 - 8 },
      dimensions: { width: 4, height: 0.2, depth: 4 },
      teamId: 2,
    });
  }

  /**
   * Add billboards as obstacles with text
   * @param entities Array of map entities to add billboards to
   */
  private addBillboards(entities: MapEntity[]): void {
    // Define central square dimensions to avoid placing billboards there
    const centralSquareSize = 15;
    const centralSquareHalfSize = centralSquareSize / 2;
    const centralSquareMin = -centralSquareHalfSize;
    const centralSquareMax = centralSquareHalfSize;

    // Define team exit areas to avoid placing billboards there
    const teamExitAreas = [
      {
        minX: -this.width / 2,
        maxX: -this.width / 2 + 15,
        minZ: -this.height / 2,
        maxZ: -this.height / 2 + 15,
      },
      {
        minX: this.width / 2 - 15,
        maxX: this.width / 2,
        minZ: this.height / 2 - 15,
        maxZ: this.height / 2,
      },
    ];

    // Create a list of all wall positions and dimensions to check for collisions
    const obstacles: Array<{
      minX: number;
      maxX: number;
      minZ: number;
      maxZ: number;
    }> = [];

    // Add walls to obstacle list
    entities.forEach((entity) => {
      if (
        entity.type === EntityType.WALL ||
        entity.type === EntityType.BILLBOARD
      ) {
        const { width = 0, depth = 0 } = entity.dimensions || {
          width: 0,
          depth: 0,
        };
        const halfWidth = width / 2;
        const halfDepth = depth / 2;
        const { x = 0, z = 0 } = entity.position || { x: 0, z: 0 };

        // Add margin around obstacles to prevent close placement
        const margin = 1.5; // Minimum distance between objects

        // Add to obstacle list with rotation consideration
        // For simplicity, we use a bounding box approach
        const rotationY = entity.rotation?.y || 0;

        // If rotation is close to 0 or PI (aligned with axes)
        if (Math.abs(Math.sin(rotationY)) < 0.3) {
          obstacles.push({
            minX: x - halfWidth - margin,
            maxX: x + halfWidth + margin,
            minZ: z - halfDepth - margin,
            maxZ: z + halfDepth + margin,
          });
        }
        // If rotation is close to PI/2 or 3PI/2 (perpendicular to axes)
        else if (Math.abs(Math.cos(rotationY)) < 0.3) {
          obstacles.push({
            minX: x - halfDepth - margin,
            maxX: x + halfDepth + margin,
            minZ: z - halfWidth - margin,
            maxZ: z + halfWidth + margin,
          });
        }
        // For arbitrary rotation, use a conservative circular bounding area
        else {
          const radius = Math.max(halfWidth, halfDepth) + margin;
          obstacles.push({
            minX: x - radius,
            maxX: x + radius,
            minZ: z - radius,
            maxZ: z + radius,
          });
        }
      }
    });

    // Add billboards at strategic locations
    const billboardCount = 100; // Increased number of billboards
    let placedBillboards = 0;
    let totalAttempts = 0;

    while (placedBillboards < billboardCount && totalAttempts < 200) {
      totalAttempts++;

      // Choose a random position that's not in the central square or team exit areas
      let x, z;
      let validPosition = false;

      // Try to find a valid position
      let attempts = 0;
      while (!validPosition && attempts < 50) {
        attempts++;

        // Generate random position
        x = (Math.random() * this.width - this.width / 2) * 0.8; // 80% of map width to avoid outer edges
        z = (Math.random() * this.height - this.height / 2) * 0.8; // 80% of map height to avoid outer edges

        // Check if position is in central square
        const inCentralSquare =
          x > centralSquareMin &&
          x < centralSquareMax &&
          z > centralSquareMin &&
          z < centralSquareMax;

        // Check if position is in team exit areas
        const inTeamExitAreas = teamExitAreas.some(
          (area) =>
            x > area.minX && x < area.maxX && z > area.minZ && z < area.maxZ
        );

        // Choose a random billboard type for collision checking
        const billboardType =
          this.billboardTypes[
            Math.floor(Math.random() * this.billboardTypes.length)
          ];
        const { width, height, depth } = billboardType;

        // Check collision with obstacles
        const collisionWithObstacle = obstacles.some((obstacle) => {
          // Simple AABB collision check (bounding box)
          const halfWidth = width / 2;
          const halfDepth = depth / 2;
          const margin = 0.5; // Additional small margin

          // Billboard bounding box
          const billboardMinX = x - halfWidth - margin;
          const billboardMaxX = x + halfWidth + margin;
          const billboardMinZ = z - halfDepth - margin;
          const billboardMaxZ = z + halfDepth + margin;

          // Check if billboard intersects with obstacle
          return !(
            billboardMaxX < obstacle.minX ||
            billboardMinX > obstacle.maxX ||
            billboardMaxZ < obstacle.minZ ||
            billboardMinZ > obstacle.maxZ
          );
        });

        // Position is valid if it's not in central square, not in team exit areas, and not colliding with obstacles
        if (!inCentralSquare && !inTeamExitAreas && !collisionWithObstacle) {
          validPosition = true;
        }
      }

      if (!validPosition) continue; // Skip if no valid position found

      // Choose a random text from the available options
      const text =
        this.billboardTexts[
          Math.floor(Math.random() * this.billboardTexts.length)
        ];

      // Choose a random billboard type
      const billboardType =
        this.billboardTypes[
          Math.floor(Math.random() * this.billboardTypes.length)
        ];
      const { width, height, depth, yOffset } = billboardType;

      // Arbitrary rotation (any angle between 0 and 360 degrees)
      const rotationY = Math.random() * Math.PI * 2;

      // Create the billboard
      const billboard = {
        type: EntityType.BILLBOARD,
        position: { x: x!, y: yOffset, z: z! },
        dimensions: { width, height, depth },
        rotation: { x: 0, y: rotationY, z: 0 },
        text: text,
      };

      // Add the billboard to entities
      entities.push(billboard);

      // Add this billboard to obstacles list to prevent future overlaps
      const halfWidth = width / 2;
      const halfDepth = depth / 2;
      const margin = 1.5; // Minimum distance between objects

      obstacles.push({
        minX: x! - halfWidth - margin,
        maxX: x! + halfWidth + margin,
        minZ: z! - halfDepth - margin,
        maxZ: z! + halfDepth + margin,
      });

      placedBillboards++;
    }
  }

  /**
   * Add a flag to the center area of the map for CTF gameplay
   * @param entities Array of map entities to add flag to
   */
  private addFlag(entities: MapEntity[]): void {
    // Flag dimensions
    const flagHeight = 2;
    const flagPoleWidth = 0.1;
    const flagWidth = 1.5;

    // Place flag near the center of the map, but with some randomness
    // Random position within central area (±5 units from center)
    const x = Math.random() * 10 - 5;
    const z = Math.random() * 10 - 5;

    // Add the flag entity
    entities.push({
      type: EntityType.FLAG,
      position: { x, y: flagHeight / 2, z },
      dimensions: {
        width: flagWidth,
        height: flagHeight,
        depth: flagPoleWidth,
      },
    } as Flag);

    console.log(`Flag placed at position (${x}, ${z})`);
  }
}
