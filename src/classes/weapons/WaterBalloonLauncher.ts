import * as THREE from 'three';
import { Weapon } from '../Weapon';
import { WeaponStats } from '../../types';
import { ProjectileType } from '../../types';
import { WeaponManager } from '../WeaponManager';

export class WaterBalloonLauncher extends Weapon {
  private weaponManager: WeaponManager | null = null;
  
  constructor(scene: THREE.Scene) {
    // Define stats for the water balloon launcher - now with higher damage!
    const stats: WeaponStats = {
      name: "Lanzador de Globos",
      description: "Dispara globos de agua explosivos que causan daño en área",
      maxAmmo: 5,
      damage: 45,         // Higher base damage
      fireRate: 0.5,  
      accuracy: 0.7,      // Less accuracy
      reloadTime: 3,      // Moderate reload time
      projectileSpeed: 35, // Slower speed but larger area effect
      projectileColor: 0x00aaff, // Light blue for water
      weight: 10,
      automatic: false
    };
    
    super(scene, stats);
    
    // Configure the projectile type to explosive for this weapon
    this.projectileType = ProjectileType.EXPLOSIVE;
    
    // Configure custom options for this projectile type
    this.projectileOptions = {
      speed: stats.projectileSpeed,
      damage: stats.damage,
      lifespan: 3,    // Longer lifespan to allow for more travel distance
      radius: 0.4,    // Larger projectiles
      explosionRadius: 4.0, // Large explosion radius
      damageCallback: (position, radius, damage) => {
        this.applyExplosionDamage(position, radius, damage);
      }
    };
    
    // Create weapon model
    this.createWeaponModel();
  }

  /**
   * Sets the weapon manager reference for this weapon
   * @param manager The WeaponManager instance
   */
  public setWeaponManager(manager: WeaponManager): void {
    this.weaponManager = manager;
  }

  // Apply damage to entities within the explosion radius
  private applyExplosionDamage(position: THREE.Vector3, radius: number, maxDamage: number): void {
    // Use the proper WeaponManager reference if available
    if (this.weaponManager) {
      // Use the WeaponManager's area damage function
      this.weaponManager.applyAreaDamage(position, radius, maxDamage);
    } else {
      // Fallback if WeaponManager is not available
      console.log(`EXPLOSION! Radius: ${radius}, Max Damage: ${maxDamage}`);
    }
    
    // Create a visual explosion effect
    this.createExplosionEffect(position, radius);
  }
  
  // Create a visual explosion effect
  private createExplosionEffect(position: THREE.Vector3, radius: number): void {
    // Create an expanding sphere for the explosion
    const explosionGeometry = new THREE.SphereGeometry(1, 32, 32);
    const explosionMaterial = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    
    const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
    explosion.position.copy(position);
    this.scene.add(explosion);
    
    // Create water splash particles
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    // Random positions within a sphere
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random()); // Cube root for more uniform distribution
      
      particlePositions[i * 3] = position.x + r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = position.y + r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = position.z + r * Math.cos(phi);
      
      particleSizes[i] = 0.05 + Math.random() * 0.15;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00aaff,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    this.scene.add(particles);
    
    // Animate the explosion
    const startTime = Date.now();
    const duration = 1000; // 1 second explosion
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1.0);
      
      // Grow the explosion
      const scale = progress * 2.0;
      explosion.scale.set(scale, scale, scale);
      
      // Fade out
      explosionMaterial.opacity = 0.6 * (1.0 - progress);
      particleMaterial.opacity = 0.8 * (1.0 - progress);
      
      if (progress < 1.0) {
        requestAnimationFrame(animate);
      } else {
        // Clean up
        this.scene.remove(explosion);
        this.scene.remove(particles);
        explosionGeometry.dispose();
        explosionMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
      }
    };
    
    // Start animation
    animate();
  }

  // Override method for weapon-specific firing effects
  protected onShoot(): void {
    console.log("¡Globo de agua explosivo lanzado!");
  }

  // Create a simple model for the weapon
  private createWeaponModel(): void {
    this.model = new THREE.Group();
    
    // Launcher body - wider and shorter
    const bodyGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.5, 12);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x0088cc });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 2;
    
    // Handle
    const handleGeometry = new THREE.CylinderGeometry(0.03, 0.04, 0.2, 8);
    const handleMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.y = -0.15;
    handle.position.x = -0.1;
    
    // Add red highlights to show it's more powerful
    const ringGeometry = new THREE.TorusGeometry(0.08, 0.02, 8, 16);
    const ringMaterial = new THREE.MeshLambertMaterial({ color: 0xff3333 });  // Red highlight
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.y = Math.PI / 2;
    ring.position.x = 0.25;
    
    this.model.add(body);
    this.model.add(handle);
    this.model.add(ring);
  }
} 