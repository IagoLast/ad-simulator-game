import * as THREE from 'three';
import { Obstacle } from '../types';
import { Bot } from './Bot';
import { BaseProjectile } from './projectiles/BaseProjectile';

export class BotManager {
  public bots: Bot[] = [];
  private scene: THREE.Scene;
  private maxBots: number = 10;
  
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    
    // Hacer que el objeto esté disponible globalmente para simplificar el acceso
    (window as any).botManager = this;
  }
  
  public spawnBot(position: THREE.Vector3, patrolPoints?: THREE.Vector3[]): Bot {
    const bot = new Bot(position, this.scene, patrolPoints);
    this.bots.push(bot);
    
    // Limitar el número de bots
    if (this.bots.length > this.maxBots) {
      const oldestBot = this.bots.shift();
      if (oldestBot) {
        oldestBot.remove(this.scene);
      }
    }
    
    return bot;
  }
  
  public spawnBots(count: number, spawnPositions: THREE.Vector3[]): void {
    // Crear 'count' bots en posiciones aleatorias del array
    for (let i = 0; i < count; i++) {
      if (spawnPositions.length > 0) {
        const randomIndex = Math.floor(Math.random() * spawnPositions.length);
        const position = spawnPositions[randomIndex];
        this.spawnBot(position);
      }
    }
  }
  
  public update(delta: number, playerPosition: THREE.Vector3, obstacles: Obstacle[]): void {
    // Mostrar estadísticas de bots cada 5 segundos
    const currentTime = Math.floor(Date.now() / 5000);
    if (currentTime !== this._lastStatsTime) {
      this._lastStatsTime = currentTime;
      console.log(`Estadísticas de bots: ${this.bots.length} bots, ${this.bots.filter(b => b.isActive).length} activos`);
      
      // Mostrar salud de cada bot
      this.bots.forEach((bot, index) => {
        if (bot.isActive) {
          console.log(`Bot #${index}: Salud = ${bot.health}, Posición = (${bot.mesh.position.x.toFixed(1)}, ${bot.mesh.position.y.toFixed(1)}, ${bot.mesh.position.z.toFixed(1)})`);
        }
      });
    }
    
    for (let i = this.bots.length - 1; i >= 0; i--) {
      const bot = this.bots[i];
      
      if (bot.isActive) {
        bot.update(delta, playerPosition, obstacles, this.scene);
      }
    }
  }
  
  public checkProjectileCollisions(projectiles: BaseProjectile[]): void {
    // Comprobar colisiones entre proyectiles del jugador y bots
    if (projectiles.length === 0 || this.bots.length === 0) return;
    
    // Añadir mensajes de depuración (menos frecuentes para no llenar la consola)
    if (Math.random() < 0.1) {
      console.log(`Comprobando ${projectiles.length} proyectiles contra ${this.bots.length} bots`);
    }
    
    for (const projectile of projectiles) {
      if (!projectile.isActive) continue;
      
      const projectilePos = projectile.getPosition();
      const projectileRadius = projectile.getRadius();
      
      for (const bot of this.bots) {
        if (!bot.isActive) continue;
        
        // Implementación mejorada de colisiones: comprobamos la distancia al centro del bot
        // y también si el proyectil está dentro del cilindro que representa al bot
        
        // Vector desde el bot al proyectil
        const botToProjectile = new THREE.Vector3().subVectors(projectilePos, bot.mesh.position);
        
        // Distancia horizontal (ignorando componente Y)
        const horizontalDistance = Math.sqrt(
          botToProjectile.x * botToProjectile.x + 
          botToProjectile.z * botToProjectile.z
        );
        
        // Distancia vertical desde la base del bot
        const verticalPosition = projectilePos.y - bot.mesh.position.y;
        
        // Comprobar si el proyectil está dentro del cilindro del bot
        const isInCylinderRadius = horizontalDistance < (bot.collider.radius + projectileRadius);
        const isInCylinderHeight = verticalPosition > 0 && verticalPosition < bot.collider.height;
        
        // Comprobar si el proyectil está cerca de la cabeza (esfera)
        const headCenter = new THREE.Vector3(
          bot.mesh.position.x,
          bot.mesh.position.y + bot.collider.height,
          bot.mesh.position.z
        );
        const distanceToHead = projectilePos.distanceTo(headCenter);
        const isNearHead = distanceToHead < (bot.collider.radius * 0.8 + projectileRadius);
        
        // Si el proyectil está dentro del cilindro o cerca de la cabeza, es un impacto
        if ((isInCylinderRadius && isInCylinderHeight) || isNearHead) {
          console.log(`¡Impacto! Bot recibe daño. Salud antes: ${bot.health}`);
          
          // El bot recibe daño
          const died = bot.takeDamage();
          
          console.log(`Salud después: ${bot.health}, ¿Murió?: ${died}`);
          
          // Desactivar el proyectil
          projectile.deactivate();
          
          // Mostrar puntuación cuando un bot muere
          if (died) {
            this.showScore(bot.mesh.position);
            console.log('Bot eliminado. Mostrando puntuación.');
          }
          
          // No seguir comprobando este proyectil
          break;
        }
      }
    }
  }
  
  private showScore(position: THREE.Vector3): void {
    // Crear un sprite con texto "+100" que se eleva y desaparece
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = 100;
    canvas.height = 50;
    context.fillStyle = 'white';
    context.font = 'Bold 36px Arial';
    context.fillText('+100', 5, 40);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 1.0
    });
    
    const sprite = new THREE.Sprite(material);
    sprite.position.copy(position);
    sprite.position.y += 2.0; // Encima del bot
    sprite.scale.set(2, 1, 1);
    
    this.scene.add(sprite);
    
    // Animación para que el sprite se eleva y desaparezca
    const startTime = Date.now();
    const duration = 1500; // 1.5 segundos
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      
      if (progress < 1.0) {
        // Mover hacia arriba
        sprite.position.y += 0.01;
        
        // Desvanecer gradualmente
        sprite.material.opacity = 1.0 - progress;
        
        requestAnimationFrame(animate);
      } else {
        // Eliminar el sprite
        this.scene.remove(sprite);
        (sprite.material as THREE.SpriteMaterial).dispose();
      }
    };
    
    animate();
  }
  
  public getActiveBotCount(): number {
    return this.bots.filter(bot => bot.isActive).length;
  }
  
  public removeAllBots(): void {
    for (const bot of this.bots) {
      bot.remove(this.scene);
    }
    this.bots = [];
  }
  
  // Añadir método para obtener todos los proyectiles de los bots
  public getAllBotProjectiles(): BaseProjectile[] {
    const allProjectiles: BaseProjectile[] = [];
    
    for (const bot of this.bots) {
      if (bot.isActive && bot.getProjectiles) {
        allProjectiles.push(...bot.getProjectiles());
      }
    }
    
    return allProjectiles;
  }
  
  // Propiedad para tracking de estadísticas
  private _lastStatsTime: number = 0;

  /**
   * Crea un bot que dispara proyectiles rebotantes
   * @param position Posición inicial del bot
   * @param bounces Número máximo de rebotes de los proyectiles
   * @param patrolPoints Puntos de patrulla opcionales
   * @returns El bot creado
   */
  public spawnBounceBot(position: THREE.Vector3, bounces: number = 3, patrolPoints?: THREE.Vector3[]): Bot {
    const bot = this.spawnBot(position, patrolPoints);
    bot.useBounceBallProjectiles(bounces);
    console.log(`Bot rebotante creado en (${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)})`);
    return bot;
  }

  /**
   * Clears all bots from the scene
   */
  public clearBots(): void {
    // Remove each bot from the scene
    this.bots.forEach(bot => {
      if (bot.mesh) {
        this.scene.remove(bot.mesh);
      }
    });
    
    // Clear the bots array
    this.bots = [];
  }
} 