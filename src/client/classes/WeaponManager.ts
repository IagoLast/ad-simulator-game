import * as THREE from 'three';
import { Weapon } from './Weapon';
import { PaintballGun } from './weapons/PaintballGun';
import { WaterBalloonLauncher } from './weapons/WaterBalloonLauncher';
import { RapidFirePaintball } from './weapons/RapidFirePaintball';
import { Obstacle } from '../types';
import { Player } from './Player';
import { BaseProjectile } from './projectiles/BaseProjectile';
import { ObstacleManager } from '../map/ObstacleManager';

export class WeaponManager {
  private scene: THREE.Scene;
  private player: Player;
  private weapons: Weapon[] = [];
  private currentWeaponIndex: number = 0;
  private isAutoFiring: boolean = false;
  private autoFireInterval: number | null = null;
  private autoFireTimer: number = 0;
  private lastReloadingState: boolean = false;
  private obstacleManager: ObstacleManager;
  
  // Cooldown properties
  private weaponCooldowns: number[] = [0, 0, 0]; // Cooldown time remaining for each weapon
  private weaponCooldownTimes: number[] = [0.2, 1.0, 0.1]; // Cooldown durations in seconds
  private lastShootTimes: number[] = [0, 0, 0]; // Last time each weapon was fired

  constructor(scene: THREE.Scene, player: Player) {
    this.scene = scene;
    this.player = player;
    
    // Get obstacle manager from global window (will be set in game.ts)
    this.obstacleManager = (window as any).obstacleManager;
    
    // Inicializar armas
    this.initializeWeapons();
    
    // Mostrar información del arma inicial
    this.displayWeaponInfo();
  }

  private initializeWeapons(): void {
    // Inicializar armas
    const paintballGun = new PaintballGun(this.scene);
    const waterBalloonLauncher = new WaterBalloonLauncher(this.scene);
    const rapidFire = new RapidFirePaintball(this.scene);
    
    // Añadir a la array de armas
    this.weapons.push(paintballGun);
    this.weapons.push(waterBalloonLauncher);
    this.weapons.push(rapidFire);
    
    // Set this WeaponManager as the manager for each weapon
    this.weapons.forEach(weapon => {
      if (weapon instanceof WaterBalloonLauncher) {
        weapon.setWeaponManager(this);
      }
    });

    console.log("Armas inicializadas:", this.weapons.length);
    
    // Verificar que cada arma esté inicializada correctamente
    this.weapons.forEach((weapon, index) => {
      console.log(`Arma ${index}:`, weapon.getName(), 
        "Munición:", weapon.getCurrentAmmo(), "/", weapon.getMaxAmmo());
    });
  }

  /**
   * Updates the weapon manager
   * @param delta Time since last frame in seconds
   */
  public update(delta: number): void {
    // Update weapon timers
    const currentWeapon = this.getCurrentWeapon();
    if (currentWeapon) {
      currentWeapon.update(delta);
      
      // Check if we need to update the ammo display (e.g. after reload)
      if (currentWeapon.isReloading() !== this.lastReloadingState) {
        this.lastReloadingState = currentWeapon.isReloading();
        this.updateAmmoDisplay();
      }
    }
    
    // Auto-fire if enabled
    if (this.isAutoFiring) {
      this.autoFireTimer += delta;
      const fireInterval = 1 / currentWeapon.getFireRate();
      
      if (this.autoFireTimer >= fireInterval) {
        this.shoot();
        this.autoFireTimer = 0;
      }
    }
    
    // Update projectiles
    const obstacles = this.obstacleManager.getObstacles();
    this.updateProjectiles(delta, obstacles);
    
    // Clean up inactive projectiles
    this.cleanupInactiveProjectiles();
    
    // Update cooldowns
    this.updateCooldowns(delta);
  }
  
  /**
   * Removes inactive projectiles from the weapons array
   */
  private cleanupInactiveProjectiles(): void {
    // Clean up inactive projectiles from all weapons
    for (const weapon of this.weapons) {
      const projectiles = weapon.getProjectiles();
      const activeProjectiles = projectiles.filter(proj => proj.isActive);
      
      // Only perform cleanup if there are inactive projectiles
      if (activeProjectiles.length < projectiles.length) {
        // Get inactive projectiles to log them for debugging
        const inactiveCount = projectiles.length - activeProjectiles.length;
        console.log(`Removing ${inactiveCount} inactive projectiles from ${weapon.getName()}`);
        
        // Replace the entire projectiles array with only active ones
        // This avoids mutation issues during iteration
        weapon['projectiles'] = activeProjectiles;
      }
    }
  }

  /**
   * Gets all projectiles from all weapons
   * @returns Array of all active projectiles
   */
  public getAllProjectiles(): BaseProjectile[] {
    const allProjectiles: BaseProjectile[] = [];
    
    for (const weapon of this.weapons) {
      allProjectiles.push(...weapon.getProjectiles());
    }
    
    return allProjectiles;
  }

  public getCurrentWeapon(): Weapon {
    return this.weapons[this.currentWeaponIndex];
  }

  /**
   * Gets the index of the current weapon
   * @returns The index of the currently selected weapon
   */
  public getCurrentWeaponIndex(): number {
    return this.currentWeaponIndex;
  }

  public setWeapon(index: number): void {
    if (index >= 0 && index < this.weapons.length) {
      this.currentWeaponIndex = index;
      this.displayWeaponInfo();
    }
  }

  public nextWeapon(): void {
    // Detener disparo automático si estaba activo
    this.stopAutoFire();
    
    // Cambiar al siguiente arma
    this.currentWeaponIndex = (this.currentWeaponIndex + 1) % this.weapons.length;
    this.displayWeaponInfo();
  }

  public previousWeapon(): void {
    // Detener disparo automático si estaba activo
    this.stopAutoFire();
    
    // Cambiar al arma anterior
    this.currentWeaponIndex = (this.currentWeaponIndex - 1 + this.weapons.length) % this.weapons.length;
    this.displayWeaponInfo();
  }

  public displayWeaponInfo(): void {
    if (this.weapons.length === 0) return;
    
    const currentWeapon = this.getCurrentWeapon();
    if (!currentWeapon) return;
    
    // Validar que los datos existan antes de mostrarlos
    const ammo = currentWeapon.getCurrentAmmo();
    const maxAmmo = currentWeapon.getMaxAmmo();
    
    console.log(`Arma actual: ${currentWeapon.getName()}`);
    console.log(`Munición: ${ammo !== undefined ? ammo : 'N/A'}/${maxAmmo !== undefined ? maxAmmo : 'N/A'}`);
    
    // Actualizar la UI
    this.updateAmmoDisplay();
  }

  public updateAmmoDisplay(): void {
    const weapon = this.getCurrentWeapon();
    if (!weapon) return;
    
    // Update all weapon ammo displays in weapon selector
    this.weapons.forEach((weapon, index) => {
      // Get the weapon item element
      const weaponItem = document.querySelector(`.weapon-item[data-index="${index}"]`);
      const ammoElement = document.getElementById(`ammo-${index}`);
      
      if (ammoElement && weaponItem) {
        const ammo = weapon.getCurrentAmmo();
        const maxAmmo = weapon.getMaxAmmo();
        ammoElement.textContent = `${ammo}/${maxAmmo}`;
        
        // Handle reloading animation
        if (weapon.isReloading()) {
          // Add reloading class to trigger animation
          weaponItem.classList.add('reloading');
          ammoElement.style.color = '#ffcc00'; // Yellow during reload
        } else {
          // Remove reloading class when not reloading
          weaponItem.classList.remove('reloading');
          
          // Set color based on ammo state
          if (ammo === 0) {
            ammoElement.style.color = '#ff3333'; // Red when empty
          } else {
            ammoElement.style.color = 'white'; // Normal color
          }
        }
        
        // Update cooldown display for each weapon
        this.updateCooldownDisplay(index);
      }
    });
  }

  public shoot(): void {
    const weapon = this.getCurrentWeapon();
    if (!weapon) return;
    
    // Check if weapon is on cooldown
    if (this.weaponCooldowns[this.currentWeaponIndex] > 0) {
      // Weapon is on cooldown, can't shoot
      console.log(`Weapon ${this.currentWeaponIndex} on cooldown: ${this.weaponCooldowns[this.currentWeaponIndex].toFixed(1)}s`);
      return;
    }
    
    // Obtener la posición y dirección del jugador
    const cameraDirection = new THREE.Vector3();
    this.player.controls.getDirection(cameraDirection);
    
    const position = this.player.controls.getObject().position.clone();
    const direction = cameraDirection.clone();
    
    // If weapon has ammo and is not reloading, proceed with shooting
    const projectile = weapon.shoot(position, direction);
    
    if (projectile) {
      // Shooting was successful, apply cooldown
      this.weaponCooldowns[this.currentWeaponIndex] = this.weaponCooldownTimes[this.currentWeaponIndex];
      this.lastShootTimes[this.currentWeaponIndex] = Date.now();
      
      // Update display
      this.updateCooldownDisplay(this.currentWeaponIndex);
      
      console.log(`Proyectil disparado desde ${weapon.getName()}. Munición restante: ${weapon.getCurrentAmmo()}`);
    }
    
    // Actualizar el display de munición
    this.updateAmmoDisplay();
  }

  public startAutoFire(): void {
    const currentWeapon = this.getCurrentWeapon();
    
    // Solo iniciar disparo automático si el arma es automática y no está ya disparando
    if (currentWeapon.isAutomatic() && !this.isAutoFiring) {
      this.isAutoFiring = true;
      
      // Disparar inmediatamente
      this.shoot();
      
      // Establecer intervalo para disparos continuos
      // Usar la tasa de fuego del arma para calcular el intervalo
      const fireInterval = 1000 / currentWeapon.getFireRate();
      
      this.autoFireInterval = window.setInterval(() => {
        this.shoot();
      }, fireInterval);
    }
  }

  public stopAutoFire(): void {
    if (this.isAutoFiring && this.autoFireInterval !== null) {
      clearInterval(this.autoFireInterval);
      this.autoFireInterval = null;
      this.isAutoFiring = false;
    }
  }

  /**
   * Initiates reload of the current weapon
   */
  public reload(): void {
    const currentWeapon = this.getCurrentWeapon();
    if (currentWeapon && !currentWeapon.isReloading()) {
      currentWeapon.reload();
      console.log(`Reloading weapon: ${currentWeapon.getName()}`);
    }
  }

  /**
   * Updates all projectiles and checks for collisions with obstacles
   * @param delta Time since last frame in seconds
   * @param obstacles Obstacles to check for collisions
   */
  private updateProjectiles(delta: number, obstacles: Obstacle[]): void {
    // Collect all projectiles from all weapons
    const allProjectiles = this.getAllProjectiles();
    
    // Update each projectile (movement, effects, etc.)
    for (const projectile of allProjectiles) {
      // Skip already inactive projectiles
      if (!projectile.isActive) continue;
      
      // Update projectile and check if still active
      const isActive = projectile.update(delta);
      
      // No need to check collisions if the projectile was deactivated during update
      if (!isActive) continue;
      
      const position = projectile.getPosition();
      const radius = projectile.getRadius();
      
      // Check for ground collision first
      if (position.y <= radius) {
        console.log(`Colisión con el suelo detectada en (${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)})`);
        
        const shouldDeactivate = projectile.onGroundCollision(
          new THREE.Vector3(position.x, 0, position.z)
        );
        
        if (shouldDeactivate) {
          this.createGroundPaintSplash(
            new THREE.Vector3(position.x, 0.01, position.z),
            projectile.color
          );
          projectile.deactivate();
          console.log(`Proyectil desactivado por colisión con el suelo`);
          continue;
        }
      }
      
      // Check for obstacle collisions
      for (const obstacle of obstacles) {
        const mesh = obstacle.mesh;
        
        if (this.checkProjectileCollision(projectile, mesh)) {
          console.log(`Colisión con obstáculo detectada`);
          
          // Apply hit visualization
          const collisionPoint = this.getCollisionPoint(position, mesh);
          const normal = this.getCollisionNormal(collisionPoint, mesh);
          
          // Let the projectile handle its own collision behavior
          const shouldDeactivate = projectile.onCollision(collisionPoint, normal);
          
          if (shouldDeactivate) {
            this.createPaintSplash(collisionPoint, projectile.color, mesh);
            projectile.deactivate();
            console.log(`Proyectil desactivado por colisión con obstáculo`);
          }
          
          break;
        }
      }
    }
  }
  
  // Crear salpicadura de pintura en un obstáculo
  private createPaintSplash(position: THREE.Vector3, color: number, target: THREE.Mesh | THREE.Group): void {
    // Crear decal de salpicadura de pintura en el obstáculo
    const splashSize = 0.5 + Math.random() * 0.5;
    const decalGeometry = new THREE.PlaneGeometry(splashSize, splashSize);
    const decalMaterial = new THREE.MeshBasicMaterial({ 
      color, 
      transparent: true,
      opacity: 0.8,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    
    const decal = new THREE.Mesh(decalGeometry, decalMaterial);
    
    // Obtener posición del objetivo
    let targetPosition: THREE.Vector3;
    
    // Manejar objetos Group (como ads)
    if (target instanceof THREE.Group) {
      targetPosition = new THREE.Vector3();
      target.getWorldPosition(targetPosition);
    } else {
      targetPosition = target.position;
    }
    
    // Posicionar el decal ligeramente fuera de la superficie para evitar z-fighting
    const normal = new THREE.Vector3().subVectors(position, targetPosition).normalize();
    decal.position.copy(position).addScaledVector(normal, 0.01);
    
    // Orientar el decal para que mire hacia afuera desde la superficie impactada
    decal.lookAt(decal.position.clone().add(normal));
    
    // Aleatorizar la rotación para variedad
    decal.rotation.z = Math.random() * Math.PI * 2;
    
    this.scene.add(decal);
  }
  
  // Crear salpicadura de pintura en el suelo
  private createGroundPaintSplash(position: THREE.Vector3, color: number): void {
    // Crear salpicadura de pintura más grande para impactos en el suelo
    const splashSize = 0.8 + Math.random() * 0.7;
    const decalGeometry = new THREE.CircleGeometry(splashSize, 8);
    const decalMaterial = new THREE.MeshBasicMaterial({ 
      color, 
      transparent: true,
      opacity: 0.7,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    
    const decal = new THREE.Mesh(decalGeometry, decalMaterial);
    
    // Posicionar ligeramente sobre el suelo para evitar z-fighting
    position.y = 0.01;
    decal.position.copy(position);
    
    // Rotar para que quede plano en el suelo
    decal.rotation.x = -Math.PI / 2;
    
    // Añadir algo de rotación aleatoria para variedad
    decal.rotation.z = Math.random() * Math.PI * 2;
    
    this.scene.add(decal);
  }

  public checkPlayerCollisions(playerCollider: { position: THREE.Vector3, radius: number, height: number }): number {
    let hitCount = 0;
    
    // Obtener botManager de la ventana global
    const botManager = (window as any).botManager;
    if (!botManager) return 0;
    
    // Obtener todos los proyectiles de bots
    const botProjectiles = botManager.getAllBotProjectiles();
    
    // Verificar colisiones con el jugador
    for (const projectile of botProjectiles) {
      if (!projectile.isActive) continue;
      
      const projectilePos = projectile.getPosition();
      const projectileRadius = projectile.getRadius();
      
      // Calcular distancia al jugador
      const distance = projectilePos.distanceTo(playerCollider.position);
      
      // Si el proyectil está lo suficientemente cerca del jugador
      if (distance < projectileRadius + playerCollider.radius) {
        // Desactivar el proyectil
        projectile.deactivate();
        
        // Incrementar contador de impactos
        hitCount++;
      }
    }
    
    return hitCount;
  }

  /**
   * Checks if a projectile is colliding with an obstacle mesh
   * @param projectile The projectile to check
   * @param mesh The obstacle mesh
   * @returns Whether collision occurred
   */
  private checkProjectileCollision(projectile: BaseProjectile, mesh: THREE.Mesh | THREE.Group): boolean {
    const projectilePos = projectile.getPosition();
    const projectileRadius = projectile.getRadius();
    
    // Get bounding box of the mesh
    const bbox = new THREE.Box3().setFromObject(mesh);
    
    // Simple bounding box collision check
    if (
      projectilePos.x > bbox.min.x - projectileRadius &&
      projectilePos.x < bbox.max.x + projectileRadius &&
      projectilePos.y > bbox.min.y - projectileRadius &&
      projectilePos.y < bbox.max.y + projectileRadius &&
      projectilePos.z > bbox.min.z - projectileRadius &&
      projectilePos.z < bbox.max.z + projectileRadius
    ) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Gets the exact collision point on an obstacle
   * @param projectilePosition The position of the projectile
   * @param mesh The obstacle mesh
   * @returns The collision point
   */
  private getCollisionPoint(projectilePosition: THREE.Vector3, _mesh: THREE.Mesh | THREE.Group): THREE.Vector3 {
    // We don't have proper ray-triangle collision detection yet,
    // so we'll just return the projectile position as an approximation
    return projectilePosition.clone();
  }
  
  /**
   * Gets the surface normal at the collision point
   * @param collisionPoint The point of collision
   * @param mesh The obstacle mesh
   * @returns The surface normal
   */
  private getCollisionNormal(collisionPoint: THREE.Vector3, mesh: THREE.Mesh | THREE.Group): THREE.Vector3 {
    // For simple implementation, estimate normal based on closest face
    // In a more advanced implementation, this would use raycasting to find exact normal
    
    // Get center of the mesh
    const bbox = new THREE.Box3().setFromObject(mesh);
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    
    // Calculate direction from center to collision point
    const normal = collisionPoint.clone().sub(center).normalize();
    
    // Determine which face was hit based on the strongest component
    const absX = Math.abs(normal.x);
    const absY = Math.abs(normal.y);
    const absZ = Math.abs(normal.z);
    
    const faceNormal = new THREE.Vector3();
    
    if (absX > absY && absX > absZ) {
      // X-axis face
      faceNormal.set(Math.sign(normal.x), 0, 0);
    } else if (absY > absX && absY > absZ) {
      // Y-axis face
      faceNormal.set(0, Math.sign(normal.y), 0);
    } else {
      // Z-axis face
      faceNormal.set(0, 0, Math.sign(normal.z));
    }
    
    return faceNormal;
  }

  // New method to update weapon cooldowns
  private updateCooldowns(delta: number): void {
    // Update cooldowns for all weapons
    for (let i = 0; i < this.weaponCooldowns.length; i++) {
      if (this.weaponCooldowns[i] > 0) {
        // Reduce cooldown time
        this.weaponCooldowns[i] -= delta;
        
        // Make sure it doesn't go below 0
        if (this.weaponCooldowns[i] < 0) {
          this.weaponCooldowns[i] = 0;
        }
        
        // Update cooldown display
        this.updateCooldownDisplay(i);
      }
    }
  }
  
  // New method to update the cooldown display
  private updateCooldownDisplay(weaponIndex: number): void {
    const cooldownOverlay = document.getElementById(`cooldown-${weaponIndex}`);
    const cooldownText = document.getElementById(`cooldown-text-${weaponIndex}`);
    const weaponItem = document.querySelector(`.weapon-item[data-index="${weaponIndex}"]`);
    
    if (cooldownOverlay && cooldownText && weaponItem) {
      const maxCooldown = this.weaponCooldownTimes[weaponIndex];
      const currentCooldown = this.weaponCooldowns[weaponIndex];
      
      if (currentCooldown > 0) {
        // Weapon is on cooldown
        weaponItem.classList.add('cooldown');
        
        // Update height of cooldown overlay (100% when full cooldown, 0% when no cooldown)
        const heightPercentage = (currentCooldown / maxCooldown) * 100;
        cooldownOverlay.style.height = `${heightPercentage}%`;
        
        // Update cooldown text
        cooldownText.textContent = currentCooldown.toFixed(1) + 's';
      } else {
        // Weapon cooldown complete
        weaponItem.classList.remove('cooldown');
        cooldownOverlay.style.height = '0%';
        cooldownText.textContent = '';
      }
    }
  }

  /**
   * Applies area damage to objects within a radius
   * @param center Center of the explosion
   * @param radius Radius of the explosion effect
   * @param maxDamage Maximum damage at the center of the explosion
   */
  public applyAreaDamage(center: THREE.Vector3, radius: number, maxDamage: number): void {
    console.log(`Applying area damage at (${center.x.toFixed(2)}, ${center.y.toFixed(2)}, ${center.z.toFixed(2)})`);
    console.log(`Radius: ${radius}, Max Damage: ${maxDamage}`);
    
    // Add screen shake effect for more impact
    this.applyScreenShake(radius * 0.25); // intensity based on explosion radius
    
    // Create a permanent scorch mark on the ground
    this.createScorchMark(center, radius * 1.2);
    
    // Get all obstacles from the obstacle manager
    const obstacles = this.obstacleManager.getObstacles();
    
    // Check each obstacle for damage
    obstacles.forEach(obstacle => {
      // Get the position of the obstacle
      const obstaclePosition = obstacle.mesh.position.clone();
      
      // Calculate distance from explosion center
      const distance = center.distanceTo(obstaclePosition);
      
      // If within explosion radius, apply damage based on distance
      if (distance <= radius) {
        // Calculate damage (linear falloff with distance)
        const distanceRatio = 1 - (distance / radius);
        const damage = Math.floor(maxDamage * distanceRatio);
        
        // In a real implementation, apply damage to the obstacle
        console.log(`Obstacle hit by explosion! Distance: ${distance.toFixed(2)}, Damage: ${damage}`);
        
        // Create a splash effect at the hit position
        const normal = new THREE.Vector3().subVectors(obstaclePosition, center).normalize();
        const hitPosition = center.clone().add(normal.multiplyScalar(distance));
        
        // Create paint splash with blue color for water explosion
        this.createPaintSplash(hitPosition, 0x00aaff, obstacle.mesh);
      }
    });
    
    // Also check if the player is within the explosion radius
    const playerPosition = this.player.controls.getObject().position.clone();
    const playerDistance = center.distanceTo(playerPosition);
    
    if (playerDistance <= radius) {
      // Calculate damage to player based on distance
      const distanceRatio = 1 - (playerDistance / radius);
      const damage = Math.floor(maxDamage * distanceRatio * 0.3); // Reduce self-damage
      
      // In a real implementation, apply damage to the player
      console.log(`Player hit by explosion! Distance: ${playerDistance.toFixed(2)}, Damage: ${damage}`);
      
      // Let the player know they were hit
      // this.player.takeDamage(damage);
    }
  }
  
  /**
   * Creates a screen shake effect for explosions
   * @param intensity The intensity of the shake effect
   */
  private applyScreenShake(intensity: number = 1.0): void {
    if (!this.player.controls) return;
    
    const camera = this.player.controls.getObject();
    if (!camera) return;
    
    // Save the original camera position
    const originalPosition = camera.position.clone();
    
    // Set up shake parameters
    const shakeDuration = 350; // milliseconds
    const startTime = Date.now();
    
    // Define the shake animation
    const shakeAnimation = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / shakeDuration;
      
      if (progress < 1.0) {
        // Generate random offsets for the camera position
        const offsetX = (Math.random() * 2 - 1) * intensity * (1 - progress);
        const offsetY = (Math.random() * 2 - 1) * intensity * (1 - progress);
        const offsetZ = (Math.random() * 2 - 1) * intensity * (1 - progress);
        
        // Apply the offsets to the camera
        camera.position.set(
          originalPosition.x + offsetX,
          originalPosition.y + offsetY,
          originalPosition.z + offsetZ
        );
        
        // Continue the animation
        requestAnimationFrame(shakeAnimation);
      } else {
        // Reset to original position when done
        camera.position.copy(originalPosition);
      }
    };
    
    // Start the shake animation
    shakeAnimation();
  }

  /**
   * Creates a scorch mark on the ground from an explosion
   * @param position The center of the explosion
   * @param radius The radius of the scorch mark
   */
  private createScorchMark(position: THREE.Vector3, radius: number): void {
    // Create a disc geometry for the scorch mark
    const segments = 32;
    const scorchGeometry = new THREE.CircleGeometry(radius, segments);
    
    // Create a material with a dark color, slightly transparent
    const scorchMaterial = new THREE.MeshBasicMaterial({
      color: 0x222222,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    
    // Create the mesh
    const scorchMark = new THREE.Mesh(scorchGeometry, scorchMaterial);
    
    // Position just above the ground to avoid z-fighting
    scorchMark.position.set(position.x, 0.01, position.z);
    scorchMark.rotation.x = -Math.PI / 2; // Rotate to lie flat on the ground
    
    // Add to scene
    this.scene.add(scorchMark);
    
    // Optionally, animate the opacity to fade out over time
    const startTime = Date.now();
    const duration = 10000; // 10 seconds fade
    
    const fadeAnimation = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < duration) {
        // Calculate opacity
        const progress = elapsed / duration;
        scorchMaterial.opacity = 0.6 * (1 - progress);
        
        // Continue animation
        requestAnimationFrame(fadeAnimation);
      } else {
        // Remove from scene when fully faded
        this.scene.remove(scorchMark);
        scorchGeometry.dispose();
        scorchMaterial.dispose();
      }
    };
    
    // Start the animation
    fadeAnimation();
  }
} 