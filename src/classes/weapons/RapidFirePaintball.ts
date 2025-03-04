import * as THREE from 'three';
import { Weapon } from '../Weapon';
import { Projectile } from '../Projectile';
import { WeaponStats } from '../../types';

export class RapidFirePaintball extends Weapon {
  // Colores disponibles para las bolas de pintura
  private paintballColors: number[] = [
    0xff0000, // Rojo
    0x00ff00, // Verde
    0x0000ff, // Azul
    0xffff00, // Amarillo
    0xff00ff, // Magenta
    0x00ffff  // Cian
  ];

  constructor(scene: THREE.Scene) {
    // Definir estadísticas para la ametralladora de paintball
    const stats: WeaponStats = {
      name: "Ametralladora",
      damage: 5,         // Menos daño por disparo
      fireRate: 8,       // 8 disparos por segundo
      projectileSpeed: 60,
      projectileLifespan: 2,
      accuracy: 0.7,     // Menos precisa que la marcadora estándar
      ammoCapacity: 100, // Mayor capacidad
      reloadTime: 4,     // Mayor tiempo de recarga
      automatic: true    // Disparo automático manteniendo presionado
    };
    
    super(scene, stats);
    
    // Crear modelo del arma
    this.createWeaponModel();
  }

  protected createProjectile(position: THREE.Vector3, direction: THREE.Vector3): Projectile {
    // Seleccionar un color aleatorio
    const color = this.paintballColors[Math.floor(Math.random() * this.paintballColors.length)];
    
    // Menor compensación para la gravedad debido a la mayor velocidad
    const gravityCompensation = 0.02;
    const adjustedDirection = direction.clone();
    adjustedDirection.y += gravityCompensation;
    adjustedDirection.normalize();
    
    // Proyectiles más pequeños
    const projectile = new Projectile(
      position,
      adjustedDirection,
      this.scene,
      color,
      this.stats.projectileSpeed
    );
    
    // Personalizar el proyectil
    projectile.customRadius = 0.1; // Más pequeño
    projectile.damage = this.stats.damage;
    
    return projectile;
  }

  // Sobrescribir método para efectos específicos al disparar
  protected onShoot(): void {
    console.log("¡Ráfaga de paintball!");
  }

  // Crear un modelo simple para el arma
  private createWeaponModel(): void {
    this.model = new THREE.Group();
    
    // Crear el cuerpo del arma (más grande)
    const bodyGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.6);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    
    // Crear el cañón
    const barrelGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.8, 8);
    const barrelMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -0.4;
    
    // Crear el cargador
    const magazineGeometry = new THREE.BoxGeometry(0.08, 0.25, 0.15);
    const magazineMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
    const magazine = new THREE.Mesh(magazineGeometry, magazineMaterial);
    magazine.position.y = -0.2;
    
    // Agregar todas las partes al modelo
    this.model.add(body);
    this.model.add(barrel);
    this.model.add(magazine);
    
    // Añadir detalles adicionales para que se vea más como una ametralladora
    const sightGeometry = new THREE.BoxGeometry(0.03, 0.05, 0.03);
    const sightMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const sight = new THREE.Mesh(sightGeometry, sightMaterial);
    sight.position.y = 0.1;
    sight.position.z = 0.1;
    
    this.model.add(sight);
  }
} 