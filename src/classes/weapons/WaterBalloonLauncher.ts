import * as THREE from 'three';
import { Weapon } from '../Weapon';
import { WeaponStats } from '../../types';
import { ProjectileType } from '../../types';

export class WaterBalloonLauncher extends Weapon {
  constructor(scene: THREE.Scene) {
    // Definir estadísticas para el lanzagranadas de agua
    const stats: WeaponStats = {
      name: "Lanzador de Globos",
      description: "Dispara globos de agua que rebotan y generan salpicaduras amplias",
      maxAmmo: 5,
      damage: 30,         // Más daño por globo
      fireRate: 0.5,  
      accuracy: 0.7,      // Menor precisión
      reloadTime: 3,      // Recarga moderada
      projectileSpeed: 40, // Menor velocidad pero mayor radio
      projectileColor: 0x00aaff, // Azul claro para agua
      weight: 10,
      automatic: false
    };
    
    super(scene, stats);
    
    // Configurar el tipo de proyectil para este arma - usamos BounceBall para permitir rebotes
    this.projectileType = ProjectileType.BOUNCE_BALL;
    
    // Configurar opciones personalizadas para este tipo de proyectil
    this.projectileOptions = {
      speed: stats.projectileSpeed,
      damage: stats.damage,
      lifespan: 3,    // Mayor tiempo de vida para permitir más rebotes
      radius: 0.4,    // Globos más grandes
      maxBounces: 2   // Número de rebotes
    };
    
    // Crear modelo del arma
    this.createWeaponModel();
  }

  // Sobrescribir método para efectos específicos al disparar
  protected onShoot(): void {
    console.log("¡Globo de agua lanzado!");
  }

  // Crear un modelo simple para el arma
  private createWeaponModel(): void {
    this.model = new THREE.Group();
    
    // Cuerpo del lanzador - más corto y ancho
    const bodyGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.5, 12);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x0088cc });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 2;
    
    // Mango
    const handleGeometry = new THREE.CylinderGeometry(0.03, 0.04, 0.2, 8);
    const handleMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.y = -0.15;
    handle.position.x = -0.1;
    
    // Decoraciones
    const ringGeometry = new THREE.TorusGeometry(0.08, 0.02, 8, 16);
    const ringMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.y = Math.PI / 2;
    ring.position.x = 0.25;
    
    this.model.add(body);
    this.model.add(handle);
    this.model.add(ring);
  }
} 