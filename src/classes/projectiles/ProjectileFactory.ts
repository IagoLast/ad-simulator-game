import * as THREE from 'three';
import { BaseProjectile } from './BaseProjectile';
import { PaintballProjectile } from './PaintballProjectile';
import { BounceBallProjectile } from './BounceBallProjectile';
import { ClusterBallProjectile } from './ClusterBallProjectile';
import { SniperProjectile } from './SniperProjectile';
import { ProjectileType } from '../../types';

/**
 * Factory class for creating different types of projectiles.
 * This centralizes projectile creation logic and provides a clean interface
 * for weapons to create projectiles without knowing the specific implementation details.
 */
export class ProjectileFactory {
  /**
   * Creates a projectile of the specified type
   * @param type The type of projectile to create
   * @param position Initial position vector
   * @param direction Direction vector (will be normalized)
   * @param scene Three.js scene
   * @param color Color of the projectile
   * @param options Additional options specific to the projectile type
   * @returns The created projectile
   */
  public static createProjectile(
    type: ProjectileType,
    position: THREE.Vector3,
    direction: THREE.Vector3,
    scene: THREE.Scene,
    color: number,
    options: ProjectileOptions = {}
  ): BaseProjectile {
    switch (type) {
      case ProjectileType.PAINTBALL:
        return new PaintballProjectile(
          position,
          direction,
          scene,
          color,
          options.speed,
          options.damage,
          options.lifespan,
          options.radius
        );
        
      case ProjectileType.BOUNCE_BALL:
        return new BounceBallProjectile(
          position,
          direction,
          scene,
          color,
          options.speed,
          options.damage,
          options.lifespan,
          options.radius,
          options.maxBounces
        );
        
      case ProjectileType.CLUSTER_BALL:
        if (!options.addProjectileCallback) {
          console.error('ClusterBallProjectile requires addProjectileCallback');
          // Fall back to a regular paintball if callback is missing
          return new PaintballProjectile(position, direction, scene, color);
        }
        
        return new ClusterBallProjectile(
          position,
          direction,
          scene,
          options.addProjectileCallback,
          color,
          options.speed,
          options.damage,
          options.lifespan,
          options.radius,
          options.clusterCount
        );
        
      case ProjectileType.SNIPER:
        return new SniperProjectile(
          position,
          direction,
          scene,
          color,
          options.speed || 100, // Default high speed
          options.damage || 25,  // Default high damage
          options.lifespan || 4, // Default long lifespan
          options.radius || 0.1  // Default small radius
        );
        
      default:
        console.warn(`Unknown projectile type: ${type}, defaulting to paintball`);
        return new PaintballProjectile(position, direction, scene, color);
    }
  }
}

/**
 * Interface for projectile creation options.
 * Contains all possible options for any projectile type.
 */
export interface ProjectileOptions {
  /** Initial speed of the projectile */
  speed?: number;
  
  /** Damage inflicted by the projectile */
  damage?: number;
  
  /** Time in seconds before the projectile disappears */
  lifespan?: number;
  
  /** Collision radius of the projectile */
  radius?: number;
  
  /** Color of the projectile (overrides default color) */
  color?: number;
  
  /** For BounceBall: Maximum number of bounces before deactivation */
  maxBounces?: number;
  
  /** For ClusterBall: Number of smaller projectiles to spawn on impact */
  clusterCount?: number;
  
  /** For ClusterBall: Callback to add spawned projectiles to the main array */
  addProjectileCallback?: (projectile: BaseProjectile) => void;
} 