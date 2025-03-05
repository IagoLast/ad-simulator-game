import * as THREE from 'three';
import { BaseProjectile } from './BaseProjectile';
import { ProjectileType } from '../../types';

/**
 * Explosive projectile implementation.
 * This projectile explodes on impact, creating a visual effect and dealing area damage.
 */
export class ExplosiveProjectile extends BaseProjectile {
  /** Radius of the explosion effect */
  private explosionRadius: number = 3.0;
  
  /** Maximum damage at the center of the explosion */
  private maxExplosionDamage: number = 50;
  
  /** Whether this grenade has exploded yet */
  private hasExploded: boolean = false;
  
  /** The explosion mesh (visual effect) */
  private explosionMesh: THREE.Mesh | null = null;
  
  /** Callback to damage entities in the explosion radius */
  private damageCallback: ((position: THREE.Vector3, radius: number, damage: number) => void) | null = null;
  
  /**
   * Creates a new explosive projectile
   * @param position Initial position vector
   * @param direction Direction vector (will be normalized)
   * @param scene Three.js scene
   * @param damageCallback Callback to damage entities in the explosion radius
   * @param color Color of the explosive
   * @param speed Initial speed
   * @param damage Base damage 
   * @param lifespan Time in seconds before disappearing
   * @param radius Collision radius
   * @param explosionRadius Radius of the explosion effect
   */
  constructor(
    position: THREE.Vector3,
    direction: THREE.Vector3,
    scene: THREE.Scene,
    damageCallback: (position: THREE.Vector3, radius: number, damage: number) => void,
    color: number = 0x00aaff, // Blue for water balloon
    speed: number = 35,
    damage: number = 20,
    lifespan: number = 3,
    radius: number = 0.3,
    explosionRadius: number = 3.0
  ) {
    super(position, direction, scene, ProjectileType.EXPLOSIVE, color, speed, damage, lifespan, radius);
    this.damageCallback = damageCallback;
    this.explosionRadius = explosionRadius;
    
    // Create a particle trail for this projectile
    this.createTrail(scene);
    
    // Log creation for debugging
    console.log(`Explosive grenade created with explosion radius: ${explosionRadius}`);
  }
  
  /**
   * Creates the mesh for the explosive projectile
   * @returns A Three.js mesh representing the explosive
   */
  protected createMesh(): THREE.Mesh {
    // Create a sphere with a more complex material
    const geometry = new THREE.SphereGeometry(this.radius, 16, 16);
    const material = new THREE.MeshStandardMaterial({ 
      color: this.color,
      metalness: 0.3,
      roughness: 0.7,
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
      size: 0.1,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    this.trail = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(this.trail);
  }
  
  /**
   * Updates visual effects for the explosive
   * @param delta Time since last frame in seconds
   */
  protected updateEffects(_: number): void {
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
    
    // If we have an explosion mesh, update its effect
    if (this.explosionMesh && this.hasExploded) {
      // Animate the explosion (grow and fade)
      const age = this.lifespan * 0.8; // Just a factor to control the animation speed
      const scale = 1.0 + (age * 5.0); // Grows over time
      
      this.explosionMesh.scale.set(scale, scale, scale);
      
      // Fade out over time
      if (this.explosionMesh.material instanceof THREE.Material) {
        this.explosionMesh.material.opacity = Math.max(0, 1.0 - (age * 2.0));
        
        // Remove the explosion mesh when it's fully transparent
        if (this.explosionMesh.material.opacity <= 0) {
          this.scene.remove(this.explosionMesh);
          this.explosionMesh = null;
        }
      }
    }
  }
  
  /**
   * Creates an explosion effect at the given position
   * @param position Position of the explosion
   */
  private explode(position: THREE.Vector3): void {
    if (this.hasExploded) return;
    
    this.hasExploded = true;
    
    // Visual explosion effect
    const explosionGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const explosionMaterial = new THREE.MeshBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    
    this.explosionMesh = new THREE.Mesh(explosionGeometry, explosionMaterial);
    this.explosionMesh.position.copy(position);
    this.scene.add(this.explosionMesh);
    
    // Play explosion sound
    this.playExplosionSound();
    
    // Apply damage to entities in the radius
    if (this.damageCallback) {
      this.damageCallback(position, this.explosionRadius, this.maxExplosionDamage);
    }
    
    // Play explosion sound (if available)
    // TODO: Add sound effect
    
    console.log(`Explosion at (${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}) with radius ${this.explosionRadius}`);
  }
  
  /**
   * Plays the explosion sound effect
   */
  private playExplosionSound(): void {
    try {
      // Create an audio context
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      // Create oscillators for a more complex explosion sound
      const mainOscillator = audioContext.createOscillator();
      mainOscillator.type = 'sine';
      mainOscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      mainOscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.5);
      
      const subOscillator = audioContext.createOscillator();
      subOscillator.type = 'square';
      subOscillator.frequency.setValueAtTime(80, audioContext.currentTime);
      subOscillator.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 0.7);
      
      // Create noise for a more realistic explosion
      const noiseNode = audioContext.createBufferSource();
      const bufferSize = audioContext.sampleRate;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Fill the buffer with noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      noiseNode.buffer = buffer;
      
      // Create a gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);
      
      // Connect nodes
      mainOscillator.connect(gainNode);
      subOscillator.connect(gainNode);
      noiseNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Start and stop oscillators
      mainOscillator.start();
      subOscillator.start();
      noiseNode.start();
      
      mainOscillator.stop(audioContext.currentTime + 0.6);
      subOscillator.stop(audioContext.currentTime + 0.8);
      noiseNode.stop(audioContext.currentTime + 0.8);
      
    } catch (error) {
      console.error('Error playing explosion sound:', error);
    }
  }
  
  /**
   * Handles collision response when hitting an obstacle
   * @param position Position of the collision
   * @param normal Surface normal at the collision point
   * @returns Always returns true as explosives detonate on impact
   */
  public onCollision(position: THREE.Vector3, _normal: THREE.Vector3): boolean {
    // Explode on impact
    this.explode(position);
    
    // Keep the projectile active for a short while to show the explosion
    this.lifespan = 0.5; // Short time to let the explosion animation play
    
    // Hide the original projectile mesh
    if (this.mesh) {
      this.mesh.visible = false;
    }
    
    return false; // Don't immediately deactivate (let the explosion play out)
  }
  
  /**
   * Handles collision response when hitting the ground
   * @param position Position of the collision
   * @returns Whether the projectile should be deactivated
   */
  public onGroundCollision(position: THREE.Vector3): boolean {
    // Use the same logic as for other collisions
    const normal = new THREE.Vector3(0, 1, 0);
    return this.onCollision(position, normal);
  }
  
  /**
   * Clean up resources when removed
   */
  public remove(scene: THREE.Scene): void {
    super.remove(scene);
    
    // Remove explosion mesh if it exists
    if (this.explosionMesh) {
      scene.remove(this.explosionMesh);
      if (this.explosionMesh.geometry) this.explosionMesh.geometry.dispose();
      if (this.explosionMesh.material instanceof THREE.Material) this.explosionMesh.material.dispose();
      this.explosionMesh = null;
    }
  }
} 