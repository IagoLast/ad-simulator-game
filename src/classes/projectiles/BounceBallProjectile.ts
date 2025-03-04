import * as THREE from 'three';
import { BaseProjectile } from './BaseProjectile';
import { ProjectileType } from '../../types';

/**
 * Bouncing paintball projectile implementation.
 * This projectile can bounce off surfaces multiple times before deactivating.
 * Each bounce reduces the projectile's energy until it eventually stops.
 */
export class BounceBallProjectile extends BaseProjectile {
  /** Maximum number of bounces before deactivation */
  private maxBounces: number;
  
  /** Current bounce count */
  private bounceCount: number = 0;
  
  /** Energy loss factor per bounce (0.0-1.0) */
  private energyLoss: number = 0.25;
  
  /**
   * Creates a new bouncing paintball projectile
   * @param position Initial position vector
   * @param direction Direction vector (will be normalized)
   * @param scene Three.js scene
   * @param color Color of the paintball
   * @param speed Initial speed
   * @param damage Damage inflicted
   * @param lifespan Time in seconds before disappearing
   * @param radius Collision radius
   * @param maxBounces Maximum number of bounces before deactivation
   */
  constructor(
    position: THREE.Vector3,
    direction: THREE.Vector3,
    scene: THREE.Scene,
    color: number = 0x00ff00,
    speed: number = 45,
    damage: number = 7,
    lifespan: number = 3,
    radius: number = 0.18,
    maxBounces: number = 3
  ) {
    super(position, direction, scene, ProjectileType.BOUNCE_BALL, color, speed, damage, lifespan, radius);
    this.maxBounces = maxBounces;
    
    // Create a particle trail for this projectile
    this.createTrail(scene);
    
    // Log creation for debugging
    console.log(`Bounce Ball created with max bounces: ${maxBounces}`);
  }
  
  /**
   * Creates the mesh for the bounce ball
   * @returns A Three.js mesh representing the bounce ball
   */
  protected createMesh(): THREE.Mesh {
    // Create a slightly larger sphere with a shell-like material
    const geometry = new THREE.SphereGeometry(this.radius, 12, 12);
    const material = new THREE.MeshStandardMaterial({ 
      color: this.color,
      metalness: 0.7,
      roughness: 0.2,
      emissive: this.color,
      emissiveIntensity: 0.2
    });
    return new THREE.Mesh(geometry, material);
  }
  
  /**
   * Creates a particle trail effect
   * @param scene The Three.js scene
   */
  protected createTrail(scene: THREE.Scene): void {
    // Create a simple particle system for the trail
    const particleCount = 20;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    // Initialize all particles at the current position
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = this.mesh.position.x;
      particlePositions[i3 + 1] = this.mesh.position.y;
      particlePositions[i3 + 2] = this.mesh.position.z;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: this.color,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    this.trail = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(this.trail);
  }
  
  /**
   * Updates visual effects for the bouncing ball
   * @param delta Time since last frame in seconds
   */
  protected updateEffects(_delta: number): void {
    if (this.trail) {
      // Update the trail particles
      const positions = (this.trail.geometry as THREE.BufferGeometry).getAttribute('position');
      const array = positions.array as Float32Array;
      
      // Shift all particles one position down
      for (let i = array.length - 3; i >= 3; i -= 3) {
        array[i] = array[i - 3];
        array[i + 1] = array[i - 2];
        array[i + 2] = array[i - 1];
      }
      
      // Set the first particle to the current position
      array[0] = this.mesh.position.x;
      array[1] = this.mesh.position.y;
      array[2] = this.mesh.position.z;
      
      positions.needsUpdate = true;
    }
  }
  
  /**
   * Handles collision response when hitting an obstacle
   * @param position Position of the collision
   * @param normal Surface normal at the collision point
   * @returns Whether the projectile should be deactivated after collision
   */
  public onCollision(position: THREE.Vector3, normal: THREE.Vector3): boolean {
    this.bounceCount++;
    
    // Check if we've reached max bounces
    if (this.bounceCount >= this.maxBounces) {
      return true; // Deactivate the projectile
    }
    
    // Calculate reflection vector
    const dot = this.velocity.dot(normal);
    const reflection = new THREE.Vector3();
    reflection.copy(this.velocity).sub(normal.clone().multiplyScalar(2 * dot));
    
    // Apply energy loss
    reflection.multiplyScalar(1 - this.energyLoss);
    
    // Minimum speed check - deactivate if too slow
    if (reflection.length() < 5) {
      return true;
    }
    
    // Update velocity with reflection
    this.velocity.copy(reflection);
    
    // Move slightly away from the collision point to prevent getting stuck
    this.mesh.position.copy(position).add(normal.clone().multiplyScalar(0.01));
    
    // Reduce damage on each bounce
    this.damage = Math.floor(this.damage * 0.7);
    
    return false; // Don't deactivate, continue bouncing
  }
  
  /**
   * Handles collision response when hitting the ground
   * @param position Position of the collision
   * @returns Whether the projectile should be deactivated
   */
  public onGroundCollision(position: THREE.Vector3): boolean {
    // Use the same logic as for other collisions, but with an upward normal
    const normal = new THREE.Vector3(0, 1, 0);
    return this.onCollision(position, normal);
  }
} 