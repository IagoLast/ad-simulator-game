import * as THREE from 'three';
import { BaseProjectile } from './projectiles/BaseProjectile';
import { ProjectileFactory, ProjectileOptions } from './projectiles/ProjectileFactory';
import { WeaponStats, WeaponState, ProjectileType } from '../types';

export class Weapon {
  protected scene: THREE.Scene;
  protected stats: WeaponStats;
  protected state: WeaponState;
  protected model: THREE.Group | null = null;
  private projectiles: BaseProjectile[] = [];
  
  // Add projectile configuration
  protected projectileType: ProjectileType = ProjectileType.PAINTBALL;
  protected projectileOptions: ProjectileOptions = {};
  
  constructor(scene: THREE.Scene, stats: WeaponStats) {
    this.scene = scene;
    this.stats = stats;
    this.state = {
      currentAmmo: stats.maxAmmo,
      isReloading: false,
      reloadTimeLeft: 0,
      shootCooldown: 0
    };
    
    // Set default projectile options from stats
    this.projectileOptions = {
      speed: stats.projectileSpeed,
      damage: stats.damage,
      lifespan: 2, // Default lifespan
      radius: 0.15, // Default radius
    };
  }

  /**
   * Updates the weapon state and projectiles
   * @param delta Time in seconds since last frame
   */
  public update(delta: number): void {
    // Update cooldown timer
    if (this.state.shootCooldown > 0) {
      this.state.shootCooldown -= delta;
    }
    
    // Update reload timer
    if (this.state.isReloading) {
      this.state.reloadTimeLeft -= delta;
      if (this.state.reloadTimeLeft <= 0) {
        this.state.isReloading = false;
        this.state.currentAmmo = this.stats.maxAmmo;
      }
    }
    
    // Update projectiles
    this.updateProjectiles(delta);
  }
  
  /**
   * Updates all projectiles and removes inactive ones
   * @param delta Time in seconds since last frame
   */
  public updateProjectiles(delta: number): void {
    // Update each projectile and filter out inactive ones
    const activeProjectiles: BaseProjectile[] = [];
    
    for (let i = 0; i < this.projectiles.length; i++) {
      const projectile = this.projectiles[i];
      
      if (projectile.isActive) {
        projectile.update(delta);
        
        if (projectile.isActive) {
          activeProjectiles.push(projectile);
        } else {
          // Remove from scene when inactive
          projectile.remove(this.scene);
        }
      }
    }
    
    this.projectiles = activeProjectiles;
  }
  
  /**
   * Fires the weapon, creating a projectile
   * @param position Start position for the projectile
   * @param direction Direction to fire in
   * @returns The created projectile or null if firing failed
   */
  public shoot(position: THREE.Vector3, direction: THREE.Vector3): BaseProjectile | null {
    // Check if we can shoot
    if (this.state.shootCooldown > 0 || this.state.isReloading || this.state.currentAmmo <= 0) {
      return null;
    }
    
    // Update state
    this.state.shootCooldown = 1 / this.stats.fireRate;
    this.state.currentAmmo--;
    
    // Create a projectile using the factory
    const projectileOptions = {
      ...this.projectileOptions,
      // For cluster projectiles, we need to provide the callback
      addProjectileCallback: (projectile: BaseProjectile) => {
        this.projectiles.push(projectile);
      }
    };
    
    const projectile = ProjectileFactory.createProjectile(
      this.projectileType,
      position.clone(),
      direction.clone(),
      this.scene,
      this.stats.projectileColor,
      projectileOptions
    );
    
    // Add to our projectiles array
    this.projectiles.push(projectile);
    
    return projectile;
  }

  /**
   * Called when the weapon is fired
   */
  protected onShoot(): void {
    // Default implementation does nothing
  }
  
  /**
   * Called when weapon reload starts
   */
  protected onReloadStart(): void {
    // Default implementation does nothing
  }
  
  /**
   * Called when weapon reload completes
   */
  protected onReloadComplete(): void {
    // Default implementation does nothing
  }

  /**
   * Gets all active projectiles from this weapon
   * @returns Array of active projectiles
   */
  public getProjectiles(): BaseProjectile[] {
    return this.projectiles;
  }

  // Getters
  public getName(): string {
    return this.stats.name;
  }

  public getCurrentAmmo(): number {
    return this.state.currentAmmo;
  }

  public getMaxAmmo(): number {
    return this.stats.maxAmmo;
  }

  public isReloading(): boolean {
    return this.state.isReloading;
  }

  public isAutomatic(): boolean {
    return this.stats.automatic;
  }

  public getDamage(): number {
    return this.stats.damage;
  }

  public getFireRate(): number {
    return this.stats.fireRate;
  }

  // Setters para personalización
  public setDamage(damage: number): void {
    this.stats.damage = damage;
  }

  public setFireRate(fireRate: number): void {
    this.stats.fireRate = fireRate;
  }

  /**
   * Reloads the weapon
   */
  public reload(): void {
    if (this.state.isReloading || this.state.currentAmmo === this.stats.maxAmmo) {
      return;
    }
    
    this.state.isReloading = true;
    this.state.reloadTimeLeft = this.stats.reloadTime;
    console.log(`Reloading weapon: ${this.stats.name}`);
  }
} 