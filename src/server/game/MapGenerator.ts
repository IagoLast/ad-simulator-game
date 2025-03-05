import { EntityType, Exit, MapData, MapEntity, Wall } from '../../shared/types';

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
  
  /**
   * Create a new MapGenerator
   * @param width Width of the map (in grid units)
   * @param height Height of the map (in grid units)
   */
  constructor(width: number = 40, height: number = 40) {
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
    
    // Add more horizontal inner walls (5 instead of 3)
    for (let i = 0; i < 5; i++) {
      const zPos = -this.height / 2 + (i + 1) * (this.height / 6);
      const length = this.width - 4 - Math.floor(Math.random() * 8);
      const startX = -this.width / 2 + 2;
      
      // Add more gaps in walls to create more paths
      const numGaps = Math.floor(Math.random() * 2) + 2; // 2-3 gaps per wall
      
      // Generate gap positions
      const gapPositions: GapPosition[] = [];
      for (let g = 0; g < numGaps; g++) {
        const gapPos = startX + Math.floor(Math.random() * (length - 4)) + 2;
        const gapWidth = Math.floor(Math.random() * 2) + 3; // 3-4 units wide
        gapPositions.push({ start: gapPos, width: gapWidth });
      }
      
      // Sort gaps by position
      gapPositions.sort((a, b) => a.start - b.start);
      
      // Create wall segments between gaps
      let lastEnd = startX;
      for (let g = 0; g < gapPositions.length; g++) {
        const gap = gapPositions[g];
        
        // If there's space for a wall segment before this gap
        if (gap.start > lastEnd) {
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
        
        lastEnd = gap.start + gap.width;
      }
      
      // Add final wall segment if there's space
      if (startX + length > lastEnd) {
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
    
    // Add more vertical inner walls (5 instead of 3)
    for (let i = 0; i < 5; i++) {
      const xPos = -this.width / 2 + (i + 1) * (this.width / 6);
      const length = this.height - 4 - Math.floor(Math.random() * 8);
      const startZ = -this.height / 2 + 2;
      
      // Add more gaps in walls to create more paths
      const numGaps = Math.floor(Math.random() * 2) + 2; // 2-3 gaps per wall
      
      // Generate gap positions
      const gapPositions: GapPosition[] = [];
      for (let g = 0; g < numGaps; g++) {
        const gapPos = startZ + Math.floor(Math.random() * (length - 4)) + 2;
        const gapWidth = Math.floor(Math.random() * 2) + 3; // 3-4 units wide
        gapPositions.push({ start: gapPos, width: gapWidth });
      }
      
      // Sort gaps by position
      gapPositions.sort((a, b) => a.start - b.start);
      
      // Create wall segments between gaps
      let lastEnd = startZ;
      for (let g = 0; g < gapPositions.length; g++) {
        const gap = gapPositions[g];
        
        // If there's space for a wall segment before this gap
        if (gap.start > lastEnd) {
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
        
        lastEnd = gap.start + gap.width;
      }
      
      // Add final wall segment if there's space
      if (startZ + length > lastEnd) {
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
    
    // Add some diagonal walls for more interesting paths
    for (let i = 0; i < 3; i++) {
      const startX = -this.width / 3 + i * (this.width / 3);
      const startZ = -this.height / 3 + i * (this.height / 3);
      const length = 10 + Math.floor(Math.random() * 5);
      
      // Create diagonal wall (45 degrees)
      entities.push({
        type: EntityType.WALL,
        position: { 
          x: startX, 
          y: wallHeight / 2, 
          z: startZ 
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
  }
  
  /**
   * Add team exits to the map
   * @param entities Array of map entities to add exits to
   */
  private addExits(entities: MapEntity[]): void {
    // Team 1 exit (near west wall) - Larger size
    entities.push({
      type: EntityType.EXIT,
      position: { x: -this.width / 2 + 5, y: 0.1, z: -this.height / 2 + 5 },
      dimensions: { width: 4, height: 0.2, depth: 4 },
      teamId: 1
    } as Exit);
    
    // Team 2 exit (near east wall) - Larger size
    entities.push({
      type: EntityType.EXIT,
      position: { x: this.width / 2 - 5, y: 0.1, z: this.height / 2 - 5 },
      dimensions: { width: 4, height: 0.2, depth: 4 },
      teamId: 2
    } as Exit);
  }
} 