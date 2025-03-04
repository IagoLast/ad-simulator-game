import * as THREE from 'three';
import { Projectile } from './Projectile';

export class WeaponSystem {
  private scene: THREE.Scene;
  private projectiles: Projectile[] = [];
  private cooldown: number = 0;
  
  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }
  
  public shoot(fromPosition: THREE.Vector3, direction: THREE.Vector3): void {
    if (this.cooldown > 0) return;
    
    // Crear un nuevo proyectil
    const projectile = new Projectile(fromPosition, direction, this.scene);
    this.projectiles.push(projectile);
    
    // Reiniciar el cooldown
    this.cooldown = 0.2; // 200ms entre disparos
  }
  
  public update(delta: number): void {
    // Actualizar cooldown
    if (this.cooldown > 0) {
      this.cooldown -= delta;
    }
    
    // Actualizar proyectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i];
      
      if (projectile.isActive) {
        projectile.update(delta);
      } else {
        projectile.remove(this.scene);
        this.projectiles.splice(i, 1);
      }
    }
  }
  
  public getProjectilePositions(): THREE.Vector3[] {
    return this.projectiles
      .filter(p => p.isActive)
      .map(p => p.getPosition());
  }
} 