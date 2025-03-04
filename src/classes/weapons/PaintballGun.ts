import * as THREE from 'three';
import { Weapon } from '../Weapon';
import { Projectile } from '../Projectile';
import { WeaponStats } from '../../types';

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
      damage: 10,
      fireRate: 2,  // 2 disparos por segundo
      projectileSpeed: 50,
      projectileLifespan: 2,
      accuracy: 0.85,
      ammoCapacity: 50,
      reloadTime: 2,
      automatic: false
    };
    
    super(scene, stats);
    
    // Aquí se podría añadir código para cargar/crear el modelo 3D del arma
    this.createWeaponModel();
  }

  protected createProjectile(position: THREE.Vector3, direction: THREE.Vector3): Projectile {
    // Seleccionar un color aleatorio
    const color = this.paintballColors[Math.floor(Math.random() * this.paintballColors.length)];
    
    // Añadir compensación para la gravedad (como en la implementación original)
    const gravityCompensation = 0.03;
    const adjustedDirection = direction.clone();
    adjustedDirection.y += gravityCompensation;
    adjustedDirection.normalize();
    
    // Log para depuración
    console.log(`Disparando proyectil: Dirección=(${adjustedDirection.x.toFixed(2)}, ${adjustedDirection.y.toFixed(2)}, ${adjustedDirection.z.toFixed(2)}), Velocidad=${this.stats.projectileSpeed}`);
    
    // Crear el proyectil
    return new Projectile(
      position,
      adjustedDirection,
      this.scene,
      color,
      this.stats.projectileSpeed
    );
  }

  // Sobrescribir método para efectos específicos al disparar
  protected onShoot(): void {
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
    
    // El modelo se añadirá a la escena cuando se equipe el arma
  }
} 