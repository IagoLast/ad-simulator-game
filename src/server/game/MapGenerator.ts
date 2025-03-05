import { Billboard, EntityType, Exit, MapData, MapEntity, Wall } from '../../shared/types';

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
    "www.theirstack.com"
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
    this.addInnerWalls(entities);
    
    // Add exits for both teams
    this.addExits(entities);
    
    // Add billboards as obstacles
    this.addBillboards(entities);
    
    return {
      width: this.width,
      height: this.height,
      entities
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
      dimensions: { width: this.width, height: wallHeight, depth: wallDepth }
    } as Wall);
    
    // South wall (along z = this.height/2)
    entities.push({
      type: EntityType.WALL,
      position: { x: 0, y: wallHeight / 2, z: this.height / 2 },
      dimensions: { width: this.width, height: wallHeight, depth: wallDepth }
    } as Wall);
    
    // East wall (along x = this.width/2)
    entities.push({
      type: EntityType.WALL,
      position: { x: this.width / 2, y: wallHeight / 2, z: 0 },
      dimensions: { width: wallDepth, height: wallHeight, depth: this.height }
    } as Wall);
    
    // West wall (along x = -this.width/2)
    entities.push({
      type: EntityType.WALL,
      position: { x: -this.width / 2, y: wallHeight / 2, z: 0 },
      dimensions: { width: wallDepth, height: wallHeight, depth: this.height }
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
        const intersectsLeft = segmentStart < centralSquareMin && segmentEnd > centralSquareMin;
        const intersectsRight = segmentStart < centralSquareMax && segmentEnd > centralSquareMax;
        const containedInSquare = segmentStart >= centralSquareMin && segmentEnd <= centralSquareMax;
        
        if (!containedInSquare) {
          // If segment intersects left edge of square, create left part only
          if (intersectsLeft) {
            entities.push({
              type: EntityType.WALL,
              position: { 
                x: lastEnd + (centralSquareMin - lastEnd) / 2, 
                y: wallHeight / 2, 
                z: zPos 
              },
              dimensions: { 
                width: centralSquareMin - lastEnd, 
                height: wallHeight, 
                depth: wallDepth 
              }
            } as Wall);
          }
          // If segment intersects right edge of square, create right part only
          else if (intersectsRight) {
            entities.push({
              type: EntityType.WALL,
              position: { 
                x: centralSquareMax + (segmentEnd - centralSquareMax) / 2, 
                y: wallHeight / 2, 
                z: zPos 
              },
              dimensions: { 
                width: segmentEnd - centralSquareMax, 
                height: wallHeight, 
                depth: wallDepth 
              }
            } as Wall);
          }
          // If segment doesn't intersect with square at all, create it normally
          else if (gap.start > lastEnd) {
            entities.push({
              type: EntityType.WALL,
              position: { 
                x: lastEnd + (gap.start - lastEnd) / 2, 
                y: wallHeight / 2, 
                z: zPos 
              },
              dimensions: { 
                width: gap.start - lastEnd, 
                height: wallHeight, 
                depth: wallDepth 
              }
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
        const intersectsLeft = segmentStart < centralSquareMin && segmentEnd > centralSquareMin;
        const intersectsRight = segmentStart < centralSquareMax && segmentEnd > centralSquareMax;
        const containedInSquare = segmentStart >= centralSquareMin && segmentEnd <= centralSquareMax;
        
        if (!containedInSquare) {
          // If segment intersects left edge of square, create left part only
          if (intersectsLeft) {
            entities.push({
              type: EntityType.WALL,
              position: { 
                x: lastEnd + (centralSquareMin - lastEnd) / 2, 
                y: wallHeight / 2, 
                z: zPos 
              },
              dimensions: { 
                width: centralSquareMin - lastEnd, 
                height: wallHeight, 
                depth: wallDepth 
              }
            } as Wall);
          }
          // If segment intersects right edge of square, create right part only
          else if (intersectsRight) {
            entities.push({
              type: EntityType.WALL,
              position: { 
                x: centralSquareMax + (segmentEnd - centralSquareMax) / 2, 
                y: wallHeight / 2, 
                z: zPos 
              },
              dimensions: { 
                width: segmentEnd - centralSquareMax, 
                height: wallHeight, 
                depth: wallDepth 
              }
            } as Wall);
          }
          // If segment doesn't intersect with square at all, create it normally
          else {
            entities.push({
              type: EntityType.WALL,
              position: { 
                x: lastEnd + (startX + length - lastEnd) / 2, 
                y: wallHeight / 2, 
                z: zPos 
              },
              dimensions: { 
                width: startX + length - lastEnd, 
                height: wallHeight, 
                depth: wallDepth 
              }
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
        const intersectsBottom = segmentStart < centralSquareMin && segmentEnd > centralSquareMin;
        const intersectsTop = segmentStart < centralSquareMax && segmentEnd > centralSquareMax;
        const containedInSquare = segmentStart >= centralSquareMin && segmentEnd <= centralSquareMax;
        
        if (!containedInSquare) {
          // If segment intersects bottom edge of square, create bottom part only
          if (intersectsBottom) {
            entities.push({
              type: EntityType.WALL,
              position: { 
                x: xPos, 
                y: wallHeight / 2, 
                z: lastEnd + (centralSquareMin - lastEnd) / 2 
              },
              dimensions: { 
                width: wallDepth, 
                height: wallHeight, 
                depth: centralSquareMin - lastEnd 
              }
            } as Wall);
          }
          // If segment intersects top edge of square, create top part only
          else if (intersectsTop) {
            entities.push({
              type: EntityType.WALL,
              position: { 
                x: xPos, 
                y: wallHeight / 2, 
                z: centralSquareMax + (segmentEnd - centralSquareMax) / 2 
              },
              dimensions: { 
                width: wallDepth, 
                height: wallHeight, 
                depth: segmentEnd - centralSquareMax 
              }
            } as Wall);
          }
          // If segment doesn't intersect with square at all, create it normally
          else if (gap.start > lastEnd) {
            entities.push({
              type: EntityType.WALL,
              position: { 
                x: xPos, 
                y: wallHeight / 2, 
                z: lastEnd + (gap.start - lastEnd) / 2 
              },
              dimensions: { 
                width: wallDepth, 
                height: wallHeight, 
                depth: gap.start - lastEnd 
              }
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
        const intersectsBottom = segmentStart < centralSquareMin && segmentEnd > centralSquareMin;
        const intersectsTop = segmentStart < centralSquareMax && segmentEnd > centralSquareMax;
        const containedInSquare = segmentStart >= centralSquareMin && segmentEnd <= centralSquareMax;
        
        if (!containedInSquare) {
          // If segment intersects bottom edge of square, create bottom part only
          if (intersectsBottom) {
            entities.push({
              type: EntityType.WALL,
              position: { 
                x: xPos, 
                y: wallHeight / 2, 
                z: lastEnd + (centralSquareMin - lastEnd) / 2 
              },
              dimensions: { 
                width: wallDepth, 
                height: wallHeight, 
                depth: centralSquareMin - lastEnd 
              }
            } as Wall);
          }
          // If segment intersects top edge of square, create top part only
          else if (intersectsTop) {
            entities.push({
              type: EntityType.WALL,
              position: { 
                x: xPos, 
                y: wallHeight / 2, 
                z: centralSquareMax + (segmentEnd - centralSquareMax) / 2 
              },
              dimensions: { 
                width: wallDepth, 
                height: wallHeight, 
                depth: segmentEnd - centralSquareMax 
              }
            } as Wall);
          }
          // If segment doesn't intersect with square at all, create it normally
          else {
            entities.push({
              type: EntityType.WALL,
              position: { 
                x: xPos, 
                y: wallHeight / 2, 
                z: lastEnd + (startZ + length - lastEnd) / 2 
              },
              dimensions: { 
                width: wallDepth, 
                height: wallHeight, 
                depth: startZ + length - lastEnd 
              }
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
        { x: this.width / 4, z: -this.height / 4 }
      ];
      
      const position = positions[i];
      const length = 8 + Math.floor(Math.random() * 4); // Shorter diagonal walls
      
      // Create diagonal wall (45 degrees)
      entities.push({
        type: EntityType.WALL,
        position: { 
          x: position.x, 
          y: wallHeight / 2, 
          z: position.z 
        },
        dimensions: { 
          width: length, 
          height: wallHeight, 
          depth: wallDepth 
        }
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
  private addCornerBarriers(entities: MapEntity[], wallHeight: number, wallDepth: number): void {
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
      rotation: { x: 0, y: angle, z: 0 }
    } as Wall);
  }
  
  /**
   * Add team exits to the map
   * @param entities Array of map entities to add exits to
   */
  private addExits(entities: MapEntity[]): void {
    // Team 1 exit (near west wall) - Larger size
    entities.push({
      type: EntityType.EXIT,
      position: { x: -this.width / 2 + 8, y: 0.1, z: -this.height / 2 + 8 },
      dimensions: { width: 4, height: 0.2, depth: 4 },
      teamId: 1
    } as Exit);
    
    // Team 2 exit (near east wall) - Larger size
    entities.push({
      type: EntityType.EXIT,
      position: { x: this.width / 2 - 8, y: 0.1, z: this.height / 2 - 8 },
      dimensions: { width: 4, height: 0.2, depth: 4 },
      teamId: 2
    } as Exit);
  }
  
  /**
   * Add billboards as obstacles with text
   * @param entities Array of map entities to add billboards to
   */
  private addBillboards(entities: MapEntity[]): void {
    const billboardHeight = 3;
    const billboardWidth = 5;
    const billboardDepth = 0.2;
    
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
        maxZ: -this.height / 2 + 15 
      },
      { 
        minX: this.width / 2 - 15, 
        maxX: this.width / 2, 
        minZ: this.height / 2 - 15, 
        maxZ: this.height / 2 
      }
    ];
    
    // Add billboards at strategic locations
    const numBillboards = 10; // Number of billboards to add
    
    for (let i = 0; i < numBillboards; i++) {
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
          x > centralSquareMin && x < centralSquareMax && 
          z > centralSquareMin && z < centralSquareMax;
        
        // Check if position is in team exit areas
        const inTeamExitAreas = teamExitAreas.some(area => 
          x > area.minX && x < area.maxX && 
          z > area.minZ && z < area.maxZ
        );
        
        // Position is valid if it's not in central square or team exit areas
        if (!inCentralSquare && !inTeamExitAreas) {
          validPosition = true;
        }
      }
      
      if (!validPosition) continue; // Skip if no valid position found
      
      // Choose a random text from the available options
      const text = this.billboardTexts[Math.floor(Math.random() * this.billboardTexts.length)];
      
      // Random rotation (0, 90, 180, or 270 degrees)
      const rotationY = Math.floor(Math.random() * 4) * (Math.PI / 2);
      
      // Add the billboard
      entities.push({
        type: EntityType.BILLBOARD,
        position: { x: x!, y: billboardHeight / 2, z: z! },
        dimensions: { width: billboardWidth, height: billboardHeight, depth: billboardDepth },
        rotation: { x: 0, y: rotationY, z: 0 },
        text: text
      } as Billboard);
    }
  }
} 