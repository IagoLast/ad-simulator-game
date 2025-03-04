import * as THREE from 'three';
import { Weapon } from '../Weapon';
import { Projectile } from '../Projectile';
import { WeaponStats } from '../../types';

export class WaterBalloonLauncher extends Weapon {
  constructor(scene: THREE.Scene) {
    // Definir estadísticas para el lanzador de globos de agua
    const stats: WeaponStats = {
      name: "Lanzador de Globos",
      damage: 15,
      fireRate: 1,  // 1 disparo por segundo
      projectileSpeed: 40,
      projectileLifespan: 3,
      accuracy: 0.7,
      ammoCapacity: 20,
      reloadTime: 3,
      automatic: false
    };
    
    super(scene, stats);
    
    // Crear modelo del arma
    this.createWeaponModel();
  }

  protected createProjectile(position: THREE.Vector3, direction: THREE.Vector3): Projectile {
    // Globos de agua siempre azules
    const color = 0x00aaff;
    
    // Mayor compensación para la gravedad debido a que los globos son más pesados
    const gravityCompensation = 0.06;
    const adjustedDirection = direction.clone();
    adjustedDirection.y += gravityCompensation;
    adjustedDirection.normalize();
    
    // Crear el proyectil (un globo de agua es más grande)
    const projectile = new Projectile(
      position,
      adjustedDirection,
      this.scene,
      color,
      this.stats.projectileSpeed
    );
    
    // Personalizar el proyectil para que sea más grande
    this.customizeProjectile(projectile);
    
    return projectile;
  }

  // Personalizar el proyectil para que parezca un globo de agua
  private customizeProjectile(projectile: Projectile): void {
    // Hacer el proyectil más grande
    projectile.mesh.scale.set(1.5, 1.5, 1.5);
    
    // Aumentar el radio del collider
    projectile.customRadius = 0.25;
    
    // Daño específico
    projectile.damage = this.stats.damage;
    
    // Duración específica
    projectile.lifespan = this.stats.projectileLifespan;
  }

  // Sobrescribir método para efectos específicos al disparar
  protected onShoot(): void {
    console.log("¡Globo de agua lanzado!");
  }

  // Crear un modelo simple para el arma
  private createWeaponModel(): void {
    this.model = new THREE.Group();
    
    // Crear el cuerpo del lanzador
    const bodyGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.4);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x22aa22 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    
    // Crear el cañón (más ancho para los globos)
    const barrelGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8);
    const barrelMaterial = new THREE.MeshLambertMaterial({ color: 0x44cc44 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -0.3;
    
    // Crear el depósito de agua
    const tankGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const tankMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x00aaff,
      transparent: true,
      opacity: 0.7
    });
    const tank = new THREE.Mesh(tankGeometry, tankMaterial);
    tank.position.y = 0.15;
    
    // Agregar todas las partes al modelo
    this.model.add(body);
    this.model.add(barrel);
    this.model.add(tank);
  }
} 