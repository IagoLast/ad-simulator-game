import * as THREE from 'three';
import { Weapon } from '../Weapon';
import { WeaponStats } from '../../types';
import { ProjectileType } from '../../types';

export class PaintballGun extends Weapon {
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
    // Definir estadísticas para la marcadora estándar
    const stats: WeaponStats = {
      name: "Marcadora Estándar",
      description: "Marcadora básica de paintball con buena precisión",
      maxAmmo: 50,
      damage: 10,
      fireRate: 2,  // 2 disparos por segundo
      accuracy: 0.85,
      reloadTime: 2,
      projectileSpeed: 50,
      projectileColor: 0xff0000, // Este color puede ser sobrescrito
      weight: 5,
      automatic: false
    };
    
    super(scene, stats);
    
    // Configurar el tipo de proyectil para este arma
    this.projectileType = ProjectileType.PAINTBALL;
    
    // Configurar opciones personalizadas para este tipo de proyectil
    this.projectileOptions = {
      speed: stats.projectileSpeed,
      damage: stats.damage,
      lifespan: 2,
      radius: 0.15
    };
    
    // Crear el modelo 3D del arma
    this.createWeaponModel();
  }

  // Sobrescribir método para efectos específicos al disparar
  protected onShoot(): void {
    // Seleccionar un color aleatorio para cada disparo
    const randomColor = this.paintballColors[Math.floor(Math.random() * this.paintballColors.length)];
    this.projectileOptions.color = randomColor;
    
    // Aquí se podrían añadir efectos de sonido, animaciones o partículas
    console.log("¡Paintball disparado!");
  }

  // Crear un modelo simple para el arma (cubo colorido)
  private createWeaponModel(): void {
    // Crear grupo para el modelo
    this.model = new THREE.Group();
    
    // Crear el cuerpo del arma
    const bodyGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.5);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    
    // Crear el cañón
    const barrelGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.6, 8);
    const barrelMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
    const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -0.3;
    
    // Crear el tanque de aire
    const tankGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8);
    const tankMaterial = new THREE.MeshLambertMaterial({ color: 0x0066CC });
    const tank = new THREE.Mesh(tankGeometry, tankMaterial);
    tank.rotation.x = Math.PI / 2;
    tank.position.y = -0.1;
    tank.position.z = 0.1;
    
    // Agregar todas las partes al modelo
    this.model.add(body);
    this.model.add(barrel);
    this.model.add(tank);
  }
} 