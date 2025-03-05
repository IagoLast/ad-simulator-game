import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { BaseProjectile } from './BaseProjectile';
import { ProjectileType } from '../../types';
import { PaintballProjectile } from './PaintballProjectile';

/**
 * Cluster projectile implementation.
 * This projectile splits into multiple smaller projectiles when it hits a surface.
 * Useful for area coverage and hitting multiple targets.
 */
export class ClusterBallProjectile extends BaseProjectile {
  /** Number of smaller projectiles to spawn on impact */
  private clusterCount: number;
  
  /** Reference to any child projectiles created after impact */
  private childProjectiles: BaseProjectile[] = [];
  
  /** Whether this cluster has exploded yet */
  private hasExploded: boolean = false;
  
  /** Callback to add projectiles to the main projectile array */
  private addProjectileCallback: ((projectile: BaseProjectile) => void) | null = null;
  
  /**
   * Creates a new cluster projectile
   * @param position Initial position vector
   * @param direction Direction vector (will be normalized)
   * @param scene Three.js scene
   * @param addProjectileCallback Callback to add spawned projectiles to the main array
   * @param color Color of the cluster projectile
   * @param speed Initial speed
   * @param damage Damage inflicted
   * @param lifespan Time in seconds before disappearing
   * @param radius Collision radius
   * @param clusterCount Number of smaller projectiles to spawn on impact
   */
  constructor(
    position: THREE.Vector3,
    direction: THREE.Vector3,
    scene: THREE.Scene,
    addProjectileCallback: (projectile: BaseProjectile) => void,
    color: number = 0xff6600,
    speed: number = 40,
    damage: number = 5,
    lifespan: number = 1.5,
    radius: number = 0.2,
    clusterCount: number = 6
  ) {
    super(position, direction, scene, ProjectileType.CLUSTER_BALL, color, speed, damage, lifespan, radius);
    this.clusterCount = clusterCount;
    this.addProjectileCallback = addProjectileCallback;
    
    // Log creation for debugging
    console.log(`Cluster Ball created with ${clusterCount} sub-projectiles`);
  }
  
  /**
   * Creates the mesh for the cluster projectile
   * @returns A Three.js mesh representing the cluster projectile
   */
  protected createMesh(): THREE.Mesh {
    // Create a unique mesh for the cluster projectile
    const geometries = [];
    const sphereGeometry = new THREE.SphereGeometry(this.radius, 12, 12);
    geometries.push(sphereGeometry);
    
    // Add some spikes to make it look different
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const spikeGeometry = new THREE.ConeGeometry(this.radius * 0.4, this.radius * 0.6, 4);
      spikeGeometry.translate(0, this.radius * 0.6, 0);
      
      // Rotate the spike outward from the center
      const matrix = new THREE.Matrix4().makeRotationX(Math.PI / 2);
      matrix.multiply(new THREE.Matrix4().makeRotationZ(angle));
      spikeGeometry.applyMatrix4(matrix);
      
      // Add to the geometries array
      geometries.push(spikeGeometry);
    }
    
    // Merge all geometries
    const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);
    
    const material = new THREE.MeshBasicMaterial({ color: this.color });
    return new THREE.Mesh(mergedGeometry, material);
  }
  
  /**
   * Updates the projectile and any child projectiles
   * @param delta Time in seconds since the last frame
   * @returns Whether the projectile is still active
   */
  public update(delta: number): boolean {
    // Call the parent update logic
    const isActive = super.update(delta);
    
    // If we've exploded and have child projectiles, update them too
    if (this.hasExploded) {
      // This is no longer needed since the projectiles will be managed by the weapon system
      // We keep the array to track which were our children
      this.childProjectiles = this.childProjectiles.filter(p => p.isActive);
    }
    
    return isActive && this.isActive;
  }
  
  /**
   * Splits the cluster projectile into multiple smaller projectiles
   * @param position Position of the impact
   * @param normal Surface normal at the impact point
   */
  private explode(position: THREE.Vector3, normal: THREE.Vector3): void {
    if (this.hasExploded || !this.addProjectileCallback) return;
    
    this.hasExploded = true;
    
    // Create multiple smaller projectiles in a cone pattern away from the surface
    for (let i = 0; i < this.clusterCount; i++) {
      // Calculate a random direction in a hemisphere oriented with the normal
      const randomDir = this.randomHemisphereDirection(normal);
      
      // Create a smaller paintball with slightly randomized properties
      const paintball = new PaintballProjectile(
        position.clone().add(randomDir.clone().multiplyScalar(0.05)), // Slightly offset to avoid collision
        randomDir,
        this.scene,
        this.color,
        15 + Math.random() * 10, // Randomize speed
        Math.max(1, Math.floor(this.damage / 3)), // Reduce damage of each sub-projectile
        1 + Math.random(), // Randomize lifespan
        this.radius * 0.5 // Smaller radius
      );
      
      // Add to our tracking array
      this.childProjectiles.push(paintball);
      
      // Add to the weapon's projectile array via callback
      this.addProjectileCallback(paintball);
    }
    
    // Log the explosion
    console.log(`Cluster ball exploded into ${this.clusterCount} projectiles`);
  }
  
  /**
   * Generates a random direction vector in a hemisphere oriented with the given normal
   * @param normal The normal vector defining the hemisphere orientation
   * @returns A normalized direction vector
   */
  private randomHemisphereDirection(normal: THREE.Vector3): THREE.Vector3 {
    // Generate a random point on a unit sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);
    
    const randomDir = new THREE.Vector3(x, y, z);
    
    // Ensure the direction is in the hemisphere defined by the normal
    if (randomDir.dot(normal) < 0) {
      randomDir.negate(); // Flip if it's in the wrong hemisphere
    }
    
    return randomDir;
  }
  
  /**
   * Handles collision response when hitting an obstacle
   * @param position Position of the collision
   * @param normal Surface normal at the collision point
   * @returns Always returns true as cluster balls explode on impact
   */
  public onCollision(position: THREE.Vector3, normal: THREE.Vector3): boolean {
    // Explode on impact
    this.explode(position, normal);
    return true; // Deactivate the main projectile
  }
  
  /**
   * Handles collision response when hitting the ground
   * @param position Position of the collision
   * @returns Always returns true as cluster balls explode on ground impact
   */
  public onGroundCollision(position: THREE.Vector3): boolean {
    // Use the same logic as for other collisions, but with an upward normal
    const normal = new THREE.Vector3(0, 1, 0);
    return this.onCollision(position, normal);
  }
} 