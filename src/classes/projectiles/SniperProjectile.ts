import * as THREE from 'three';
import { BaseProjectile } from './BaseProjectile';
import { ProjectileType } from '../../types';

/**
 * Sniper projectile implementation.
 * This projectile has high velocity, extended range, and minimal gravity effect.
 * Useful for long-distance precision shooting.
 */
export class SniperProjectile extends BaseProjectile {
  /** Gravity reduction factor (lower values = less gravity effect) */
  private gravityFactor: number = 0.2;
  
  /**
   * Creates a new sniper projectile
   * @param position Initial position vector
   * @param direction Direction vector (will be normalized)
   * @param scene Three.js scene
   * @param color Color of the projectile
   * @param speed Initial speed (typically higher than regular paintballs)
   * @param damage Damage inflicted (typically higher than regular paintballs)
   * @param lifespan Time in seconds before disappearing (typically longer than regular paintballs)
   * @param radius Collision radius (typically smaller than regular paintballs)
   */
  constructor(
    position: THREE.Vector3,
    direction: THREE.Vector3,
    scene: THREE.Scene,
    color: number = 0x00ffff,
    speed: number = 100,
    damage: number = 25,
    lifespan: number = 4,
    radius: number = 0.1
  ) {
    super(position, direction, scene, ProjectileType.SNIPER, color, speed, damage, lifespan, radius);
    
    // Create a trail effect for the sniper projectile
    this.createTrail(scene);
    
    // Log creation for debugging
    console.log(`Sniper projectile created with speed: ${speed}`);
  }
  
  /**
   * Creates the mesh for the sniper projectile
   * @returns A Three.js mesh representing the sniper projectile
   */
  protected createMesh(): THREE.Mesh {
    // Create a elongated, bullet-like shape for the sniper projectile
    const geometry = new THREE.CylinderGeometry(0, this.radius, this.radius * 4, 8);
    
    // Rotate to align with the direction of travel
    geometry.rotateX(Math.PI / 2);
    
    const material = new THREE.MeshBasicMaterial({ 
      color: this.color,
      transparent: true,
      opacity: 0.8 
    });
    
    return new THREE.Mesh(geometry, material);
  }
  
  /**
   * Creates a trail effect for the sniper projectile
   * @param scene The Three.js scene
   */
  protected createTrail(scene: THREE.Scene): void {
    // Create a bright, thin trail effect
    const particleCount = 30;
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
      size: 0.03,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    
    this.trail = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(this.trail);
  }
  
  /**
   * Updates the position and effects of the sniper projectile
   * @param delta Time in seconds since the last frame
   */
  public update(delta: number): void {
    // Call the parent update logic, which will call our overridden applyGravity
    super.update(delta);
    
    // Keep the projectile oriented in the direction of travel
    if (this.isActive && this.velocity.lengthSq() > 0.001) {
      // Calculate direction of travel
      const direction = this.velocity.clone().normalize();
      
      // Create a rotation that aligns the projectile with its velocity
      const up = new THREE.Vector3(0, 1, 0);
      const axis = new THREE.Vector3().crossVectors(up, direction).normalize();
      const angle = Math.acos(up.dot(direction));
      
      // Apply the rotation to the mesh
      this.mesh.quaternion.setFromAxisAngle(axis, angle);
    }
  }
  
  /**
   * Applies reduced gravity to the sniper projectile
   * @param delta Time since last frame in seconds
   */
  protected applyGravity(delta: number): void {
    // Reduce gravity effect for more accurate long-range shots
    super.applyGravity(delta * this.gravityFactor);
  }
  
  /**
   * Updates visual effects for the sniper projectile
   * @param delta Time since last frame in seconds
   */
  protected updateEffects(delta: number): void {
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
} 