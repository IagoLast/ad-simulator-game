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
    
    const ammoElement = document.getElementById('ammo');
    const nameElement = document.getElementById('weapon-name');
    const ammoCounter = document.getElementById('ammo-counter');
    
    const ammo = weapon.getCurrentAmmo();
    const maxAmmo = weapon.getMaxAmmo();
    
    if (ammoElement) {
        ammoElement.textContent = `Arma: ${weapon.getName()} | Munición: ${ammo}/${maxAmmo}`;
        
        // Mostrar estado de recarga si es aplicable
        if (weapon.isReloading()) {
            ammoElement.textContent += ' (Recargando...)';
        }
    }
    
    if (nameElement) {
        nameElement.textContent = weapon.getName();
    }
    
    if (ammoCounter) {
        ammoCounter.textContent = `${ammo}/${maxAmmo}`;
    }
  }

  public shoot(): void {
    if (this.weapons.length === 0) return;
    
    const currentWeapon = this.getCurrentWeapon();
    
    // Verificar que el arma tenga munición y no esté en recarga
    if (currentWeapon.getCurrentAmmo() <= 0) {
        console.log("Sin munición. Recargando...");
        this.reload();
        return;
    }
    
    if (currentWeapon.isReloading()) {
        console.log("El arma está recargando...");
        return;
    }
    
    // Obtener la posición y dirección del jugador
    const camera = this.player.controls.getObject();
    const position = camera.position.clone();
    
    // Calcular la dirección de disparo desde la cámara
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(camera.quaternion);
    
    // Ajustar la posición para que el disparo salga desde un punto más adelante del jugador
    const firingOffset = 0.5; // Distancia adelante del jugador
    position.add(direction.clone().multiplyScalar(firingOffset));
    
    // Disparar y obtener el proyectil creado
    const projectile = currentWeapon.shoot(position, direction);
    
    // Actualizar el display de munición
    this.updateAmmoDisplay();
    
    if (projectile) {
        console.log(`Proyectil disparado desde ${currentWeapon.getName()}. Munición restante: ${currentWeapon.getCurrentAmmo()}`);
    }
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
} 