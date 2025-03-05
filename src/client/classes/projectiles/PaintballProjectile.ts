import * as THREE from 'three';
import { BaseProjectile } from './BaseProjectile';
import { ProjectileType } from '../../types';

/**
 * Standard paintball projectile implementation.
 * Represents a basic paintball that follows a standard ballistic trajectory and
 * leaves a paint splatter on impact.
 */
export class PaintballProjectile extends BaseProjectile {
  /**
   * Creates a new paintball projectile
   * @param position Initial position vector
   * @param direction Direction vector (will be normalized)
   * @param scene Three.js scene
   * @param color Color of the paintball (and resulting splatter)
   * @param speed Initial speed
   * @param damage Damage inflicted
   * @param lifespan Time in seconds before disappearing
   * @param radius Collision radius
   */
  constructor(
    position: THREE.Vector3,
    direction: THREE.Vector3,
    scene: THREE.Scene,
    color: number = 0xff0000,
    speed: number = 50,
    damage: number = 10,
    lifespan: number = 2,
    radius: number = 0.15
  ) {
    super(position, direction, scene, ProjectileType.PAINTBALL, color, speed, damage, lifespan, radius);
    
    // Log creation for debugging
    console.log(`Paintball created with velocity: (${this.velocity.x.toFixed(2)}, ${this.velocity.y.toFixed(2)}, ${this.velocity.z.toFixed(2)})`);
  }
  
  /**
   * Creates the mesh for the paintball
   * @returns A Three.js mesh representing the paintball
   */
  protected createMesh(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(this.radius, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: this.color });
    return new THREE.Mesh(geometry, material);
  }
  
  /**
   * Handles collision response when hitting an obstacle
   * Paintballs always deactivate on collision
   */
  public onCollision(_position: THREE.Vector3, _normal: THREE.Vector3): boolean {
    return true; // Deactivate the projectile
  }
} 