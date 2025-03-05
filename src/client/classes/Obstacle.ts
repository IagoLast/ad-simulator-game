import * as THREE from 'three';

/**
 * Represents a physical obstacle in the game world
 * Obstacles can be hit by projectiles and block player movement
 */
export class Obstacle {
  /** The 3D mesh representing the obstacle */
  public mesh: THREE.Mesh | THREE.Group;
  
  /** Collision data for physics calculations */
  public collider: {
    position: THREE.Vector3;
    size: THREE.Vector3;
    type: 'box' | 'sphere';
    radius?: number;
  };
  
  /**
   * Creates a new obstacle
   * @param mesh The 3D mesh representing the obstacle
   * @param position Position of the obstacle
   * @param size Size of the obstacle for collision detection
   * @param type Type of collider to use (box or sphere)
   */
  constructor(
    mesh: THREE.Mesh | THREE.Group, 
    position: THREE.Vector3, 
    size: THREE.Vector3, 
    type: 'box' | 'sphere' = 'box'
  ) {
    this.mesh = mesh;
    this.mesh.position.copy(position);
    
    this.collider = {
      position: position,
      size: size,
      type: type
    };
    
    // Add radius property for sphere colliders
    if (type === 'sphere') {
      this.collider.radius = Math.max(size.x, size.y, size.z) / 2;
    }
  }
  
  /**
   * Gets the mesh of this obstacle
   * @returns The mesh or group representing the obstacle
   */
  public getMesh(): THREE.Mesh | THREE.Group {
    return this.mesh;
  }
  
  /**
   * Updates the obstacle position
   * @param position New position
   */
  public setPosition(position: THREE.Vector3): void {
    this.mesh.position.copy(position);
    this.collider.position.copy(position);
  }
  
  /**
   * Gets the current position of the obstacle
   * @returns Position vector
   */
  public getPosition(): THREE.Vector3 {
    return this.mesh.position;
  }
  
  /**
   * Checks if a point is inside this obstacle
   * @param point Point to check
   * @returns Whether the point is inside
   */
  public containsPoint(point: THREE.Vector3): boolean {
    if (this.collider.type === 'box') {
      const halfSize = this.collider.size.clone().multiplyScalar(0.5);
      const min = this.collider.position.clone().sub(halfSize);
      const max = this.collider.position.clone().add(halfSize);
      
      return (
        point.x >= min.x && point.x <= max.x &&
        point.y >= min.y && point.y <= max.y &&
        point.z >= min.z && point.z <= max.z
      );
    } else if (this.collider.type === 'sphere' && this.collider.radius) {
      const distance = point.distanceTo(this.collider.position);
      return distance <= this.collider.radius;
    }
    
    return false;
  }
} 