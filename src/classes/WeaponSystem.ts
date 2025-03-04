import * as THREE from 'three';
import { Projectile } from './Projectile';
import { Player } from './Player';
import { Obstacle, Collider } from '../types';

export class WeaponSystem {
  private scene: THREE.Scene;
  private player: Player;
  private projectiles: Projectile[] = [];
  private cooldown: number = 0;
  private cooldownTime: number = 0.5; // Half second between shots
  private maxProjectiles: number = 30; // Maximum number of projectiles to avoid performance issues
  private projectileSpeed: number = 50; // Increased speed as requested
  
  // Array para almacenar proyectiles de bots
  private botProjectiles: Projectile[] = [];
  
  constructor(scene: THREE.Scene, player: Player) {
    this.scene = scene;
    this.player = player;
  }
  
  public update(delta: number, obstacles: Obstacle[]): void {
    // Update cooldown
    if (this.cooldown > 0) {
      this.cooldown -= delta;
    }
    
    // Update projectiles and check for collisions
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i];
      
      if (projectile.isActive) {
        projectile.update(delta);
        
        // Check for collisions with obstacles
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
            // Paint splash effect
            this.createPaintSplash(projectilePos, projectile.color, obstacle.mesh);
            projectile.deactivate();
            break;
          }
        }
        
        // Check for ground collision (improved with bouncing)
        if (projectile.getPosition().y <= projectile.getRadius()) {
          // Position correction to avoid sinking into ground
          projectile.mesh.position.y = projectile.getRadius();
          
          // Simple bounce with energy loss
          const bounceEnergy = 0.4; // 40% energy retention per bounce
          
          if (Math.abs(projectile.velocity.y) < 2.0) {
            // If velocity is too low, just create splash and deactivate
            this.createGroundPaintSplash(projectile.getPosition(), projectile.color);
            projectile.deactivate();
          } else {
            // Bounce with energy loss
            projectile.velocity.y = -projectile.velocity.y * bounceEnergy;
            // Also reduce horizontal velocity slightly to simulate friction
            projectile.velocity.x *= 0.9;
            projectile.velocity.z *= 0.9;
          }
        }
      } else {
        // Remove inactive projectiles
        projectile.remove(this.scene);
        this.projectiles.splice(i, 1);
      }
    }
    
    // Limit number of projectiles for performance
    if (this.projectiles.length > this.maxProjectiles) {
      const toRemove = this.projectiles.shift();
      if (toRemove) {
        toRemove.remove(this.scene);
      }
    }
  }
  
  public shoot(): void {
    if (this.cooldown > 0) return;
    
    // Reset cooldown
    this.cooldown = this.cooldownTime;
    
    // Get camera direction and position
    const camera = this.player.controls.getObject();
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(camera.quaternion);
    
    // Create projectile slightly in front of camera to avoid collision with player
    const position = new THREE.Vector3();
    position.copy(camera.position).add(direction.clone().multiplyScalar(1.0));
    
    // Add a slight upward angle to compensate for gravity
    // This makes medium-distance shots more accurate
    // Reduced compensation since the projectile is faster now
    const gravityCompensation = 0.03; // Adjusted for higher speed
    direction.y += gravityCompensation;
    direction.normalize(); // Re-normalize after adjustment
    
    // Random color for paintball
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Create and add projectile
    const projectile = new Projectile(position, direction, this.scene, color, this.projectileSpeed);
    this.projectiles.push(projectile);
    
    console.log(`Disparo creado. Total de proyectiles activos: ${this.projectiles.length}`);
    
    // Play sound (to be implemented)
  }
  
  // Método para obtener los proyectiles del jugador (para colisiones con bots)
  public getProjectiles(): Projectile[] {
    return this.projectiles;
  }
  
  // Método para verificar colisiones de proyectiles de bots con el jugador
  public checkPlayerCollisions(playerCollider: Collider): number {
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
  
  private createPaintSplash(position: THREE.Vector3, color: number, target: THREE.Mesh | THREE.Group): void {
    // Create paint splash decal on obstacle
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
    
    // Get target position
    let targetPosition: THREE.Vector3;
    
    // Handle Group objects (like billboards)
    if (target instanceof THREE.Group) {
      targetPosition = new THREE.Vector3();
      target.getWorldPosition(targetPosition);
    } else {
      targetPosition = target.position;
    }
    
    // Position the decal slightly off the surface to avoid z-fighting
    const normal = new THREE.Vector3().subVectors(position, targetPosition).normalize();
    decal.position.copy(position).addScaledVector(normal, 0.01);
    
    // Orient decal to face outward from the hit surface
    decal.lookAt(decal.position.clone().add(normal));
    
    // Randomize rotation for variety
    decal.rotation.z = Math.random() * Math.PI * 2;
    
    this.scene.add(decal);
  }
  
  private createGroundPaintSplash(position: THREE.Vector3, color: number): void {
    // Create larger paint splash for ground impacts
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
    
    // Position slightly above ground to avoid z-fighting
    position.y = 0.01;
    decal.position.copy(position);
    
    // Rotate to lay flat on ground
    decal.rotation.x = -Math.PI / 2;
    
    // Add some random rotation for variety
    decal.rotation.z = Math.random() * Math.PI * 2;
    
    this.scene.add(decal);
  }
} 