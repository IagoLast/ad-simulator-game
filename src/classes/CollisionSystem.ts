import { checkCapsuleBoxCollision } from '../physics';
import { Player } from './Player';
import { ObstacleManager } from './ObstacleManager';

export class CollisionSystem {
  private player: Player;
  private obstacleManager: ObstacleManager;
  
  constructor(player: Player, obstacleManager: ObstacleManager) {
    this.player = player;
    this.obstacleManager = obstacleManager;
  }
  
  public update(): void {
    this.handleObstacleCollisions();
    this.handleProjectileCollisions();
  }
  
  private handleObstacleCollisions(): void {
    // Get player position and update collider
    const playerPosition = this.player.controls.getObject().position;
    this.player.collider.position.copy(playerPosition);
    
    // Check collisions with all obstacles
    for (const obstacle of this.obstacleManager.getObstacles()) {
      const result = checkCapsuleBoxCollision(this.player.collider, obstacle);
      
      if (result.collided && result.penetration) {
        // Resolve collision by moving player away
        playerPosition.add(result.penetration);
        
        // If collision is on y-axis, stop vertical velocity
        if (Math.abs(result.penetration.y) > 0.01) {
          this.player.velocity.y = 0;
        }
      }
    }
  }
  
  private handleProjectileCollisions(): void {
    // To be implemented when we add shooting mechanics
  }
} 