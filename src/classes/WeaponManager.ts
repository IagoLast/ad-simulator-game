import * as THREE from 'three';
import { Weapon } from './Weapon';
import { PaintballGun } from './weapons/PaintballGun';
import { WaterBalloonLauncher } from './weapons/WaterBalloonLauncher';
import { RapidFirePaintball } from './weapons/RapidFirePaintball';
import { Obstacle } from '../types';
import { Projectile } from './Projectile';
import { Player } from './Player';

export class WeaponManager {
  private scene: THREE.Scene;
  private player: Player;
  private weapons: Weapon[] = [];
  private currentWeaponIndex: number = 0;
  private isAutoFiring: boolean = false;
  private autoFireInterval: number | null = null;

  constructor(scene: THREE.Scene, player: Player) {
    this.scene = scene;
    this.player = player;

    // Inicializar armas disponibles
    this.initializeWeapons();
  }

  private initializeWeapons(): void {
    // Crear instancias de las armas disponibles
    this.weapons.push(new PaintballGun(this.scene));
    this.weapons.push(new WaterBalloonLauncher(this.scene));
    this.weapons.push(new RapidFirePaintball(this.scene));
    
    console.log(`Armas disponibles: ${this.weapons.length}`);
    for (const weapon of this.weapons) {
      console.log(`- ${weapon.getName()}`);
    }
  }

  public update(delta: number, obstacles: Obstacle[]): void {
    // Actualizar el arma actual para gestionar recarga, cooldown, etc.
    if (this.weapons.length > 0) {
      const currentWeapon = this.getCurrentWeapon();
      
      console.log(`Actualizando arma: ${currentWeapon.getName()}, delta: ${delta.toFixed(4)}`);
      
      // Actualizar estado del arma actual (cooldown, recarga, etc.)
      currentWeapon.update(delta);
      
      // Actualizar TODAS las armas para que sus proyectiles sigan moviéndose
      for (const weapon of this.weapons) {
        if (weapon !== currentWeapon) {
          // Solo actualizar los proyectiles de las otras armas, no su estado
          this.updateWeaponProjectiles(weapon, delta);
        }
      }
      
      // Comprobar colisiones para todos los proyectiles
      this.updateProjectiles(delta, obstacles);
    }
  }

  // Método auxiliar para actualizar solo los proyectiles de un arma
  private updateWeaponProjectiles(weapon: Weapon, delta: number): void {
    // Ahora podemos llamar directamente al método público
    weapon.updateProjectiles(delta);
  }

  public getCurrentWeapon(): Weapon {
    return this.weapons[this.currentWeaponIndex];
  }

  public getAllProjectiles(): Projectile[] {
    // Recopilar todos los proyectiles de todas las armas
    const allProjectiles: Projectile[] = [];
    
    for (const weapon of this.weapons) {
      allProjectiles.push(...weapon.getProjectiles());
    }
    
    return allProjectiles;
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
    const weapon = this.getCurrentWeapon();
    console.log(`Arma actual: ${weapon.getName()}`);
    
    // Actualizar el display de munición
    this.updateAmmoDisplay();
  }

  public updateAmmoDisplay(): void {
    const weapon = this.getCurrentWeapon();
    const ammoElement = document.getElementById('ammo');
    
    if (ammoElement) {
      if (weapon.getMaxAmmo() === -1) {
        ammoElement.textContent = `Arma: ${weapon.getName()} | Munición: ∞`;
      } else {
        ammoElement.textContent = `Arma: ${weapon.getName()} | Munición: ${weapon.getCurrentAmmo()}/${weapon.getMaxAmmo()}`;
      }
      
      // Mostrar estado de recarga si es aplicable
      if (weapon.isReloading()) {
        ammoElement.textContent += ' (Recargando...)';
      }
    }
  }

  public shoot(): void {
    const currentWeapon = this.getCurrentWeapon();
    const camera = this.player.controls.getObject();
    
    // Obtener dirección y posición de la cámara
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(camera.quaternion);
    
    // Crear posición ligeramente adelante de la cámara
    const position = new THREE.Vector3();
    position.copy(camera.position).add(direction.clone().multiplyScalar(1.0));
    
    // Intentar disparar
    currentWeapon.shoot(position, direction);
    
    // Actualizar la interfaz de usuario
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

  public reload(): void {
    const currentWeapon = this.getCurrentWeapon();
    currentWeapon.reload();
    this.updateAmmoDisplay();
  }

  private updateProjectiles(delta: number, obstacles: Obstacle[]): void {
    // Obtener todos los proyectiles de todas las armas
    const allProjectiles = this.getAllProjectiles();
    
    // Verificar colisiones con obstáculos
    for (const projectile of allProjectiles) {
      if (!projectile.isActive) continue;
      
      // Verificar colisiones con obstáculos
      for (const obstacle of obstacles) {
        const obstaclePos = obstacle.collider.position;
        const projectilePos = projectile.getPosition();
        const obstacleSize = obstacle.collider.size;
        
        // Simple collision check: if projectile is within obstacle bounds
        if (
          projectilePos.x > obstaclePos.x - obstacleSize.x/2 - projectile.getRadius() &&
          projectilePos.x < obstaclePos.x + obstacleSize.x/2 + projectile.getRadius() &&
          projectilePos.y > obstaclePos.y - obstacleSize.y/2 - projectile.getRadius() &&
          projectilePos.y < obstaclePos.y + obstacleSize.y/2 + projectile.getRadius() &&
          projectilePos.z > obstaclePos.z - obstacleSize.z/2 - projectile.getRadius() &&
          projectilePos.z < obstaclePos.z + obstacleSize.z/2 + projectile.getRadius()
        ) {
          // Desactivar el proyectil al colisionar
          projectile.deactivate();
          
          // Crear efecto de salpicadura (splash)
          this.createPaintSplash(projectilePos, projectile.color, obstacle.mesh);
          break;
        }
      }
      
      // Verificar colisión con el suelo
      if (projectile.getPosition().y <= projectile.getRadius()) {
        // Corregir posición para evitar hundirse en el suelo
        projectile.mesh.position.y = projectile.getRadius();
        
        // Simular rebote con pérdida de energía
        const bounceEnergy = 0.4; // 40% de energía retenida por rebote
        
        if (Math.abs(projectile.velocity.y) < 2.0) {
          // Si la velocidad es muy baja, crear salpicadura y desactivar
          this.createGroundPaintSplash(projectile.getPosition(), projectile.color);
          projectile.deactivate();
        } else {
          // Rebotar con pérdida de energía
          projectile.velocity.y = -projectile.velocity.y * bounceEnergy;
          // Reducir también la velocidad horizontal para simular fricción
          projectile.velocity.x *= 0.9;
          projectile.velocity.z *= 0.9;
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
    
    // Manejar objetos Group (como billboards)
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
} 