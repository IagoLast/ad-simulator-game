import * as THREE from 'three';
import { EntityType, MapData, MapEntity } from '../../../shared/types';

/**
 * MapRenderer class for rendering map entities like walls and exits
 */
export class MapRenderer {
  private scene: THREE.Scene;
  private mapEntities: THREE.Object3D[] = [];
  
  /**
   * Create a new MapRenderer
   * @param scene THREE.js scene to add map objects to
   */
  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }
  
  /**
   * Render map data received from the server
   * @param mapData Map data containing walls and exits
   */
  public renderMap(mapData: MapData): void {
    // Clear any existing map entities
    this.clearMap();
    
    // Create new map entities
    if (mapData.entities) {
      mapData.entities.forEach(entity => {
        const object = this.createEntity(entity);
        if (object) {
          this.scene.add(object);
          this.mapEntities.push(object);
        }
      });
    }
    
    // Add a ground plane
    this.addGround(mapData.width, mapData.height);
  }
  
  /**
   * Clear all map entities from the scene
   */
  public clearMap(): void {
    // Remove all map entities from the scene
    this.mapEntities.forEach(entity => {
      this.scene.remove(entity);
      
      // Type casting to access geometry and material properties
      const mesh = entity as THREE.Mesh;
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }
      
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(material => material.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });
    
    this.mapEntities = [];
  }
  
  /**
   * Create a 3D object for a map entity
   * @param entity Map entity data
   * @returns THREE.Object3D representing the entity
   */
  private createEntity(entity: MapEntity): THREE.Object3D | null {
    switch (entity.type) {
      case EntityType.WALL:
        return this.createWall(entity);
      case EntityType.EXIT:
        return this.createExit(entity);
      default:
        console.warn(`Unknown entity type: ${entity.type}`);
        return null;
    }
  }
  
  /**
   * Create a wall object
   * @param entity Wall entity data
   * @returns THREE.Mesh representing the wall
   */
  private createWall(entity: MapEntity): THREE.Mesh {
    const dimensions = entity.dimensions || { width: 1, height: 3, depth: 1 };
    const geometry = new THREE.BoxGeometry(
      dimensions.width,
      dimensions.height,
      dimensions.depth
    );
    
    const material = new THREE.MeshStandardMaterial({
      color: 0x808080, // Gray
      roughness: 0.7,
      metalness: 0.2
    });
    
    const wall = new THREE.Mesh(geometry, material);
    wall.position.set(
      entity.position.x,
      entity.position.y,
      entity.position.z
    );
    
    // Apply rotation if provided
    if (entity.rotation) {
      wall.rotation.set(
        entity.rotation.x || 0,
        entity.rotation.y || 0,
        entity.rotation.z || 0
      );
    }
    
    // Enable shadows
    wall.castShadow = true;
    wall.receiveShadow = true;
    
    // Set name for later identification
    wall.name = 'wall';
    
    // Add to userData for collision detection
    wall.userData.type = EntityType.WALL;
    wall.userData.isCollidable = true;
    
    return wall;
  }
  
  /**
   * Create an exit object
   * @param entity Exit entity data
   * @returns THREE.Mesh representing the exit
   */
  private createExit(entity: MapEntity): THREE.Mesh {
    const dimensions = entity.dimensions || { width: 2, height: 0.1, depth: 2 };
    const geometry = new THREE.BoxGeometry(
      dimensions.width,
      dimensions.height,
      dimensions.depth
    );
    
    // Color based on team (red for team 1, blue for team 2)
    const color = entity.teamId === 1 ? 0xff0000 : 0x0000ff;
    
    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7,
      emissive: color,
      emissiveIntensity: 0.5
    });
    
    const exit = new THREE.Mesh(geometry, material);
    exit.position.set(
      entity.position.x,
      entity.position.y,
      entity.position.z
    );
    
    // Receive shadows
    exit.receiveShadow = true;
    
    // Set name for later identification
    exit.name = 'exit';
    
    // Add to userData for interaction detection
    exit.userData.type = EntityType.EXIT;
    exit.userData.teamId = entity.teamId;
    exit.userData.isCollidable = false;
    
    return exit;
  }
  
  /**
   * Add a ground plane to the scene
   * @param width Width of the ground
   * @param height Height of the ground
   */
  private addGround(width: number, height: number): void {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8,
      metalness: 0.2
    });
    
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    ground.position.y = 0;
    
    // Enable shadows
    ground.receiveShadow = true;
    
    // Set name for later identification
    ground.name = 'ground';
    
    this.scene.add(ground);
    this.mapEntities.push(ground);
  }
} 