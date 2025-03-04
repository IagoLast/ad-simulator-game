import * as THREE from 'three';
import { PROJECTILE_GRAVITY } from '../../physics';
import { ProjectileType } from '../../types';

/**
 * Abstract base class for all projectile types in the game.
 * This class defines the common interface and functionality that all projectiles share.
 */
export abstract class BaseProjectile {
  /** The 3D mesh representing the projectile */
  public mesh: THREE.Mesh;
  
  /** Current velocity vector of the projectile */
  public velocity: THREE.Vector3;
  
  /** Whether the projectile is active or should be removed */
  public isActive: boolean = true;
  
  /** Color of the projectile */
  public color: number;
  
  /** Remaining time in seconds before the projectile disappears */
  public lifespan: number;
  
  /** Damage inflicted by the projectile */
  public damage: number;
  
  /** Collision radius of the projectile */
  public radius: number;
  
  /** Visual trail effect (optional) */
  protected trail: THREE.Points | null = null;
  
  /** Type of projectile for identification */
  protected type: ProjectileType;
  
  /** The scene the projectile belongs to */
  protected scene: THREE.Scene;
  
  /**
   * Creates a new projectile
   * @param position Initial position vector
   * @param direction Direction vector (will be normalized)
   * @param scene Three.js scene
   * @param type Type of projectile
   * @param color Color of the projectile
   * @param speed Initial speed
   * @param damage Damage inflicted
   * @param lifespan Time in seconds before disappearing
   * @param radius Collision radius
   */
  constructor(
    position: THREE.Vector3,
    direction: THREE.Vector3,
    scene: THREE.Scene,
    type: ProjectileType,
    color: number = 0xff0000,
    speed: number = 50,
    damage: number = 10,
    lifespan: number = 2,
    radius: number = 0.15
  ) {
    this.scene = scene;
    this.type = type;
    this.color = color;
    this.damage = damage;
    this.lifespan = lifespan;
    this.radius = radius;
    
    // Create the projectile mesh (to be implemented by subclasses)
    this.mesh = this.createMesh();
    this.mesh.position.copy(position);
    
    // Set velocity based on direction and speed
    this.velocity = direction.normalize().multiplyScalar(speed);
    
    // Add to scene
    scene.add(this.mesh);
    
    // Debug logs
    console.log(`Proyectil creado - Tipo: ${type}, Posición: (${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)})`);
    console.log(`Velocidad inicial: (${this.velocity.x.toFixed(2)}, ${this.velocity.y.toFixed(2)}, ${this.velocity.z.toFixed(2)})`);
  }
  
  /**
   * Updates the projectile state for the current frame
   * @param delta Time in seconds since the last frame
   */
  public update(delta: number): void {
    if (!this.isActive) return;
    
    // Apply gravity with the option to override in subclasses
    this.applyGravity(delta);
    
    // Debug velocity after gravity
    const oldPosition = this.mesh.position.clone();
    
    // Update position based on velocity
    this.mesh.position.x += this.velocity.x * delta;
    this.mesh.position.y += this.velocity.y * delta;
    this.mesh.position.z += this.velocity.z * delta;
    
    // Log position change for debugging
    const displacement = this.mesh.position.clone().sub(oldPosition).length();
    if (Math.random() < 0.05) { // Log only occasionally to avoid console spam
      console.log(`Proyectil actualizado - Tipo: ${this.type}, Delta: ${delta.toFixed(4)}`);
      console.log(`Velocidad actual: (${this.velocity.x.toFixed(2)}, ${this.velocity.y.toFixed(2)}, ${this.velocity.z.toFixed(2)})`);
      console.log(`Posición actual: (${this.mesh.position.x.toFixed(2)}, ${this.mesh.position.y.toFixed(2)}, ${this.mesh.position.z.toFixed(2)})`);
      console.log(`Desplazamiento: ${displacement.toFixed(4)} unidades`);
    }
    
    // Update visual effects
    this.updateEffects(delta);
    
    // Decrease lifespan
    this.lifespan -= delta;
    if (this.lifespan <= 0) {
      console.log(`Proyectil desactivado por tiempo de vida`);
      this.deactivate();
    }
  }
  
  /**
   * Creates the mesh for this projectile type
   * @returns A Three.js mesh representing the projectile
   */
  protected abstract createMesh(): THREE.Mesh;
  
  /**
   * Applies gravity to the projectile
   * Can be overridden by subclasses for custom physics
   * @param delta Time since last frame in seconds
   */
  protected applyGravity(delta: number): void {
    this.velocity.y -= PROJECTILE_GRAVITY * delta;
  }
  
  /**
   * Updates visual effects like trails, particles, etc.
   * @param delta Time since last frame in seconds
   */
  protected updateEffects(_delta: number): void {
    // Default implementation does nothing
    // Subclasses can override to add effects
  }
  
  /**
   * Creates a trail effect for the projectile
   * @param scene The Three.js scene
   */
  protected createTrail(_scene: THREE.Scene): void {
    // Default implementation does nothing
    // Subclasses can override to add custom trail effects
  }
  
  /**
   * Deactivates the projectile, marking it for removal
   */
  public deactivate(): void {
    this.isActive = false;
  }
  
  /**
   * Gets the current position of the projectile
   * @returns Position vector
   */
  public getPosition(): THREE.Vector3 {
    return this.mesh.position;
  }
  
  /**
   * Gets the collision radius of the projectile
   * @returns Radius in world units
   */
  public getRadius(): number {
    return this.radius;
  }
  
  /**
   * Gets the type of this projectile
   * @returns ProjectileType enum value
   */
  public getType(): ProjectileType {
    return this.type;
  }
  
  /**
   * Removes the projectile from the scene and disposes resources
   * @param scene The Three.js scene
   */
  public remove(scene: THREE.Scene): void {
    scene.remove(this.mesh);
    
    // Remove trail if exists
    if (this.trail) {
      scene.remove(this.trail);
      (this.trail.geometry as THREE.BufferGeometry).dispose();
      (this.trail.material as THREE.Material).dispose();
      this.trail = null;
    }
    
    // Dispose resources
    if (this.mesh.geometry) (this.mesh.geometry as THREE.BufferGeometry).dispose();
    if (this.mesh.material) (this.mesh.material as THREE.Material).dispose();
  }
  
  /**
   * Handles collision response when hitting an obstacle
   * @param position Position of the collision
   * @param normal Surface normal at the collision point
   * @returns Whether the projectile should be deactivated after collision
   */
  public onCollision(_position: THREE.Vector3, _normal: THREE.Vector3): boolean {
    // Default behavior is to deactivate on collision
    return true;
  }
  
  /**
   * Handles collision response when hitting the ground
   * @param position Position of the collision
   * @returns Whether the projectile should be deactivated after collision
   */
  public onGroundCollision(_position: THREE.Vector3): boolean {
    // Default behavior is to deactivate on collision
    return true;
  }
} 