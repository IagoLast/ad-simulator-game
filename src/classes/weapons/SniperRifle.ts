import * as THREE from 'three';
import { Weapon } from '../Weapon';
import { WeaponStats } from '../../types';
import { ProjectileType } from '../../types';

/**
 * Sniper Rifle weapon implementation.
 * This weapon fires high-velocity, accurate projectiles with minimal gravity effect.
 * Excellent for long-range precision shots but has a slow fire rate and limited ammo.
 */
export class SniperRifle extends Weapon {
  /**
   * Creates a new sniper rifle
   * @param scene Three.js scene
   */
  constructor(scene: THREE.Scene) {
    // Define the sniper rifle's stats
    const stats: WeaponStats = {
      name: 'Sniper Rifle',
      description: 'High-precision rifle with exceptional range and accuracy',
      maxAmmo: 5,
      damage: 25,
      fireRate: 0.5, // Shots per second (slow fire rate)
      accuracy: 0.95, // Very high accuracy
      reloadTime: 2.5, // Seconds to reload
      projectileSpeed: 100, // Very fast projectiles
      projectileColor: 0x00ffff, // Cyan color
      weight: 8, // Heavy weapon
      automatic: false // Semi-automatic only
    };
    
    super(scene, stats);
    
    // Set the projectile type for this weapon
    this.projectileType = ProjectileType.SNIPER;
    
    // Additional projectile options specific to this weapon
    this.projectileOptions = {
      ...this.projectileOptions,
      lifespan: 4, // Extended range
      radius: 0.1 // Smaller projectile
    };
    
    // Load the weapon model
    this.loadModel();
  }
  
  /**
   * Loads the 3D model for the sniper rifle
   */
  private loadModel(): void {
    // Create a simple placeholder model
    // In a real game, you would load a proper 3D model here
    const group = new THREE.Group();
    
    // Barrel
    const barrelGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.2, 8);
    barrelGeometry.rotateZ(Math.PI / 2);
    const barrelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.position.set(0.6, 0, 0);
    group.add(barrel);
    
    // Scope
    const scopeGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.2, 8);
    scopeGeometry.rotateZ(Math.PI / 2);
    const scopeMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const scope = new THREE.Mesh(scopeGeometry, scopeMaterial);
    scope.position.set(0.6, 0.08, 0);
    group.add(scope);
    
    // Body
    const bodyGeometry = new THREE.BoxGeometry(0.8, 0.15, 0.1);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0.2, -0.1, 0);
    group.add(body);
    
    // Stock
    const stockGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.08);
    const stockMaterial = new THREE.MeshStandardMaterial({ color: 0x663300 });
    const stock = new THREE.Mesh(stockGeometry, stockMaterial);
    stock.position.set(-0.25, -0.08, 0);
    group.add(stock);
    
    // Set the model
    this.model = group;
  }
  
  /**
   * Custom shooting effect for the sniper rifle
   */
  public onShoot(): void {
    // Add custom effects when firing the sniper rifle
    console.log('Sniper rifle fired with a loud bang!');
    
    // In a real game, you would add sound effects, muzzle flash, etc.
  }
} 