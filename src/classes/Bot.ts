import * as THREE from 'three';
import { Collider, Obstacle } from '../types';
import { GRAVITY, MOVEMENT_SPEED } from '../physics';
import { Projectile } from './Projectile';

export class Bot {
  // Propiedades del bot
  public mesh: THREE.Group;
  public velocity: THREE.Vector3 = new THREE.Vector3();
  public direction: THREE.Vector3 = new THREE.Vector3();
  public health: number = 3; // Muere a los 3 disparos
  public isActive: boolean = true;
  public collider: Collider;
  
  // Propiedades para disparos
  private shootCooldown: number = 0;
  private shootCooldownTime: number = 1.5; // 1.5 segundos entre disparos
  private projectiles: Projectile[] = [];
  private maxProjectiles: number = 5; // Límite de proyectiles por bot
  private projectileSpeed: number = 40;
  
  // Propiedades para el movimiento
  private movementPattern: 'patrol' | 'chase' | 'random' = 'patrol';
  private targetPosition: THREE.Vector3 = new THREE.Vector3();
  private patrolPoints: THREE.Vector3[] = [];
  private currentPatrolIndex: number = 0;
  private movementSpeed: number = 3; // Más lento que el jugador
  private rotationSpeed: number = 2;
  private changeDirectionTimer: number = 0;
  private changeDirectionInterval: number = 3; // Cambiar dirección cada 3 segundos en modo random
  
  constructor(
    position: THREE.Vector3,
    scene: THREE.Scene,
    patrolPoints?: THREE.Vector3[]
  ) {
    // Crear el mesh del bot (un cuerpo cilíndrico con una cabeza esférica)
    this.mesh = new THREE.Group();
    
    // Cuerpo (cilindro)
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1.0; // Centro del cilindro a 1 unidad del suelo
    this.mesh.add(body);
    
    // Cabeza (esfera)
    const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2.2; // Encima del cuerpo
    this.mesh.add(head);
    
    // Ojos (esferas pequeñas)
    const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 }); // Ojos rojos
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(0.2, 2.2, 0.3);
    this.mesh.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(-0.2, 2.2, 0.3);
    this.mesh.add(rightEye);
    
    // Posicionar el bot
    this.mesh.position.copy(position);
    scene.add(this.mesh);
    
    // Configurar el collider
    this.collider = {
      position: new THREE.Vector3().copy(position),
      radius: 1.0,
      height: 2.0
    };
    
    // Configurar los puntos de patrulla
    if (patrolPoints && patrolPoints.length > 0) {
      this.patrolPoints = patrolPoints;
      this.targetPosition.copy(this.patrolPoints[0]);
    } else {
      // Si no hay puntos de patrulla, crear un área de patrulla aleatoria
      this.generateRandomPatrolArea(position);
    }
  }
  
  public update(delta: number, playerPosition: THREE.Vector3, obstacles: Obstacle[], scene: THREE.Scene): void {
    if (!this.isActive) return;
    
    // Actualizar cooldown de disparo
    if (this.shootCooldown > 0) {
      this.shootCooldown -= delta;
    }
    
    // Actualizar proyectiles
    this.updateProjectiles(delta, obstacles, scene);
    
    // Actualizar movimiento según el patrón seleccionado
    switch (this.movementPattern) {
      case 'patrol':
        this.updatePatrolMovement(delta, obstacles);
        break;
      case 'chase':
        this.updateChaseMovement(delta, playerPosition, obstacles);
        break;
      case 'random':
        this.updateRandomMovement(delta, obstacles);
        break;
    }
    
    // Determinar si debe perseguir al jugador
    const distanceToPlayer = this.mesh.position.distanceTo(playerPosition);
    if (distanceToPlayer < 15) {
      // Si el jugador está cerca, perseguirlo
      this.movementPattern = 'chase';
    } else if (this.movementPattern === 'chase') {
      // Si estaba persiguiendo pero el jugador se alejó, volver a patrullar
      this.movementPattern = 'patrol';
    }
    
    // Determinar si debe disparar al jugador
    if (distanceToPlayer < 20 && this.shootCooldown <= 0) {
      this.shootAtTarget(playerPosition, scene);
    }
  }
  
  private updatePatrolMovement(delta: number, obstacles: Obstacle[]): void {
    // Mover hacia el punto de patrulla actual
    const direction = new THREE.Vector3().subVectors(this.targetPosition, this.mesh.position).normalize();
    
    // Rotar gradualmente hacia la dirección objetivo
    this.rotateTowards(direction, delta);
    
    // Mover en la dirección actual
    const movement = new THREE.Vector3()
      .copy(this.direction)
      .multiplyScalar(this.movementSpeed * delta);
    
    // Aplicar el movimiento
    this.mesh.position.add(movement);
    
    // IMPORTANTE: Actualizar la posición del collider para que coincida con la posición del mesh
    this.collider.position.copy(this.mesh.position);
    
    // Comprobar si ha llegado al punto de patrulla
    if (this.mesh.position.distanceTo(this.targetPosition) < 1.0) {
      // Avanzar al siguiente punto
      this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
      this.targetPosition.copy(this.patrolPoints[this.currentPatrolIndex]);
    }
  }
  
  private updateChaseMovement(delta: number, playerPosition: THREE.Vector3, obstacles: Obstacle[]): void {
    // Mover hacia el jugador
    const direction = new THREE.Vector3().subVectors(playerPosition, this.mesh.position).normalize();
    
    // Rotar gradualmente hacia la dirección objetivo
    this.rotateTowards(direction, delta);
    
    // Mover en la dirección actual, un poco más lento que en patrulla para dar oportunidad al jugador
    const movement = new THREE.Vector3()
      .copy(this.direction)
      .multiplyScalar(this.movementSpeed * 0.8 * delta);
    
    // Aplicar el movimiento
    this.mesh.position.add(movement);
    
    // IMPORTANTE: Actualizar la posición del collider para que coincida con la posición del mesh
    this.collider.position.copy(this.mesh.position);
  }
  
  private updateRandomMovement(delta: number, obstacles: Obstacle[]): void {
    // Actualizar temporizador de cambio de dirección
    this.changeDirectionTimer -= delta;
    if (this.changeDirectionTimer <= 0) {
      // Elegir una nueva dirección aleatoria
      const angle = Math.random() * Math.PI * 2;
      this.direction.set(Math.cos(angle), 0, Math.sin(angle));
      this.changeDirectionTimer = this.changeDirectionInterval;
    }
    
    // Mover en la dirección actual
    const movement = new THREE.Vector3()
      .copy(this.direction)
      .multiplyScalar(this.movementSpeed * delta);
    
    // Aplicar el movimiento
    this.mesh.position.add(movement);
    
    // IMPORTANTE: Actualizar la posición del collider para que coincida con la posición del mesh
    this.collider.position.copy(this.mesh.position);
  }
  
  private rotateTowards(targetDirection: THREE.Vector3, delta: number): void {
    // Gradualmente rotar hacia la dirección objetivo
    const currentAngle = Math.atan2(this.direction.x, this.direction.z);
    const targetAngle = Math.atan2(targetDirection.x, targetDirection.z);
    
    // Calcular la diferencia de ángulo más corta
    let angleDiff = targetAngle - currentAngle;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    
    // Rotar gradualmente
    const maxRotation = this.rotationSpeed * delta;
    const rotation = Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), maxRotation);
    
    // Actualizar la dirección
    const newAngle = currentAngle + rotation;
    this.direction.set(Math.sin(newAngle), 0, Math.cos(newAngle));
    
    // Rotar el mesh
    this.mesh.rotation.y = -newAngle;
  }
  
  private shootAtTarget(targetPosition: THREE.Vector3, scene: THREE.Scene): void {
    if (this.shootCooldown > 0) return;
    
    // Reiniciar cooldown
    this.shootCooldown = this.shootCooldownTime;
    
    // Calcular dirección hacia el objetivo
    const shootPosition = new THREE.Vector3(
      this.mesh.position.x,
      this.mesh.position.y + 2.0, // Dispara desde la cabeza
      this.mesh.position.z
    );
    
    const direction = new THREE.Vector3()
      .subVectors(targetPosition, shootPosition)
      .normalize();
    
    // Añadir algo de imprecisión al disparo
    const randomSpread = 0.05;
    direction.x += (Math.random() - 0.5) * randomSpread;
    direction.y += (Math.random() - 0.5) * randomSpread;
    direction.z += (Math.random() - 0.5) * randomSpread;
    direction.normalize();
    
    // Crear proyectil (rojo para los bots)
    const projectile = new Projectile(shootPosition, direction, scene, 0xff0000, this.projectileSpeed);
    this.projectiles.push(projectile);
    
    // Limitar el número de proyectiles
    if (this.projectiles.length > this.maxProjectiles) {
      const oldestProjectile = this.projectiles.shift();
      if (oldestProjectile) {
        oldestProjectile.remove(scene);
      }
    }
  }
  
  private updateProjectiles(delta: number, obstacles: Obstacle[], scene: THREE.Scene): void {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i];
      
      if (projectile.isActive) {
        projectile.update(delta);
        
        // Comprobar colisiones con obstáculos
        for (const obstacle of obstacles) {
          const obstaclePos = obstacle.collider.position;
          const projectilePos = projectile.getPosition();
          const obstacleSize = obstacle.collider.size;
          
          if (
            projectilePos.x > obstaclePos.x - obstacleSize.x/2 - projectile.getRadius() &&
            projectilePos.x < obstaclePos.x + obstacleSize.x/2 + projectile.getRadius() &&
            projectilePos.y > obstaclePos.y - obstacleSize.y/2 - projectile.getRadius() &&
            projectilePos.y < obstaclePos.y + obstacleSize.y/2 + projectile.getRadius() &&
            projectilePos.z > obstaclePos.z - obstacleSize.z/2 - projectile.getRadius() &&
            projectilePos.z < obstaclePos.z + obstacleSize.z/2 + projectile.getRadius()
          ) {
            projectile.deactivate();
            break;
          }
        }
        
        // Comprobar colisión con el suelo
        if (projectile.getPosition().y <= projectile.getRadius()) {
          projectile.deactivate();
        }
      } else {
        // Eliminar proyectiles inactivos
        projectile.remove(scene);
        this.projectiles.splice(i, 1);
      }
    }
  }
  
  public takeDamage(): boolean {
    if (!this.isActive) return false;
    
    this.health--;
    console.log(`Bot dañado. Nueva salud: ${this.health}`);
    
    // Cambiar el color del bot al recibir daño
    const bodyMaterial = (this.mesh.children[0] as THREE.Mesh).material as THREE.MeshPhongMaterial;
    bodyMaterial.color.set(0xff0000); // Cambiar a rojo
    
    // Programar el retorno al color normal
    setTimeout(() => {
      if (this.isActive) {
        bodyMaterial.color.set(0x444444);
      }
    }, 150);
    
    // Cambiar a movimiento aleatorio al recibir daño
    this.movementPattern = 'random';
    this.changeDirectionTimer = 0; // Forzar cambio de dirección inmediato
    
    // Comprobar si debe morir
    if (this.health <= 0) {
      console.log('Bot debe morir. Llamando a deactivate()');
      this.deactivate();
      return true; // Murió
    }
    
    return false; // Sigue vivo
  }
  
  public getProjectiles(): Projectile[] {
    return this.projectiles;
  }
  
  public deactivate(): void {
    this.isActive = false;
    
    // Cambiar el color a gris oscuro
    const bodyMaterial = (this.mesh.children[0] as THREE.Mesh).material as THREE.MeshPhongMaterial;
    const headMaterial = (this.mesh.children[1] as THREE.Mesh).material as THREE.MeshPhongMaterial;
    bodyMaterial.color.set(0x222222);
    headMaterial.color.set(0x222222);
    
    // Inclinar el bot para mostrar que está "muerto"
    this.mesh.rotation.x = Math.PI / 2;
  }
  
  public remove(scene: THREE.Scene): void {
    // Eliminar todos los proyectiles
    for (const projectile of this.projectiles) {
      projectile.remove(scene);
    }
    this.projectiles = [];
    
    // Eliminar el mesh
    scene.remove(this.mesh);
  }
  
  private generateRandomPatrolArea(centerPosition: THREE.Vector3): void {
    // Generar 3-5 puntos aleatorios alrededor de la posición inicial
    const numPoints = 3 + Math.floor(Math.random() * 3);
    const radius = 5 + Math.random() * 10; // Radio entre 5 y 15 unidades
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const x = centerPosition.x + Math.cos(angle) * radius;
      const z = centerPosition.z + Math.sin(angle) * radius;
      this.patrolPoints.push(new THREE.Vector3(x, centerPosition.y, z));
    }
    
    this.targetPosition.copy(this.patrolPoints[0]);
  }
} 