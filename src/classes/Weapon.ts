import * as THREE from 'three';
import { Projectile } from './Projectile';
import { WeaponStats, WeaponState, ProjectileType } from '../types';

export abstract class Weapon {
  protected scene: THREE.Scene;
  protected stats: WeaponStats;
  protected state: WeaponState;
  protected model: THREE.Group | null = null;
  private projectiles: Projectile[] = [];

  constructor(scene: THREE.Scene, stats: WeaponStats) {
    this.scene = scene;
    this.stats = stats;
    this.state = {
      currentAmmo: stats.ammoCapacity,
      reloading: false,
      cooldown: 0
    };
  }

  public update(delta: number): void {
    // Actualizar cooldown
    if (this.state.cooldown > 0) {
      this.state.cooldown -= delta;
    }

    // Actualizar recarga
    if (this.state.reloading) {
      this.state.cooldown -= delta;
      if (this.state.cooldown <= 0) {
        this.completeReload();
      }
    }

    // Actualizar proyectiles
    this.updateProjectiles(delta);
  }
  
  // Método separado para actualizar solo los proyectiles
  public updateProjectiles(delta: number): void {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i];
      
      if (projectile.isActive) {
        // Llamar al método update del proyectil para aplicar la física
        projectile.update(delta);
      } else {
        projectile.remove(this.scene);
        this.projectiles.splice(i, 1);
      }
    }
  }

  // Método para disparar el arma
  public shoot(position: THREE.Vector3, direction: THREE.Vector3): Projectile | null {
    // Verificar si el arma puede disparar
    if (this.state.cooldown > 0 || this.state.reloading) {
      return null;
    }

    // Verificar munición
    if (this.stats.ammoCapacity !== -1 && this.state.currentAmmo <= 0) {
      this.reload();
      return null;
    }

    // Calcular cooldown basado en la velocidad de disparo (fireRate)
    this.state.cooldown = 1 / this.stats.fireRate;

    // Reducir munición si es limitada
    if (this.stats.ammoCapacity !== -1) {
      this.state.currentAmmo--;
    }

    // Aplicar dispersión basada en la precisión
    const spreadDirection = this.applySpread(direction);

    // Crear y añadir el proyectil
    const projectile = this.createProjectile(position, spreadDirection);
    this.projectiles.push(projectile);
    
    console.log(`Arma ${this.stats.name} disparó. Proyectiles activos: ${this.projectiles.length}`);

    // Implementar otros efectos (sonido, retroceso, etc.)
    this.onShoot();

    return projectile;
  }

  // Método para recargar el arma
  public reload(): void {
    if (this.state.reloading || 
        this.stats.ammoCapacity === -1 || 
        this.state.currentAmmo === this.stats.ammoCapacity) {
      return;
    }

    this.state.reloading = true;
    this.state.cooldown = this.stats.reloadTime;
    this.onReloadStart();
  }

  // Finalizar recarga
  protected completeReload(): void {
    this.state.reloading = false;
    this.state.currentAmmo = this.stats.ammoCapacity;
    this.onReloadComplete();
  }

  // Aplicar dispersión basada en la precisión
  protected applySpread(direction: THREE.Vector3): THREE.Vector3 {
    const spread = (1 - this.stats.accuracy) * 0.05;
    const spreadVector = new THREE.Vector3(
      (Math.random() * 2 - 1) * spread,
      (Math.random() * 2 - 1) * spread,
      (Math.random() * 2 - 1) * spread
    );
    
    // Clonar la dirección y añadir la dispersión
    const newDirection = direction.clone().add(spreadVector);
    return newDirection.normalize();
  }

  // Método abstracto para crear el proyectil específico
  protected abstract createProjectile(position: THREE.Vector3, direction: THREE.Vector3): Projectile;

  // Métodos que se pueden sobrescribir para comportamientos específicos
  protected onShoot(): void {
    // Implementación predeterminada vacía
  }

  protected onReloadStart(): void {
    // Implementación predeterminada vacía
  }

  protected onReloadComplete(): void {
    // Implementación predeterminada vacía
  }

  // Getters
  public getName(): string {
    return this.stats.name;
  }

  public getProjectiles(): Projectile[] {
    return this.projectiles;
  }

  public getCurrentAmmo(): number {
    return this.state.currentAmmo;
  }

  public getMaxAmmo(): number {
    return this.stats.ammoCapacity;
  }

  public isReloading(): boolean {
    return this.state.reloading;
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
} 