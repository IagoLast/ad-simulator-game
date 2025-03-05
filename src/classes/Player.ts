import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { Collider } from '../types';
import { JUMP_FORCE, GRAVITY, MOVEMENT_SPEED, AIR_CONTROL, FRICTION, isOnGround, applyFriction } from '../physics';
import { ObstacleManager } from '../map/ObstacleManager';
import { checkCapsuleBoxCollision } from '../physics';

export class Player {
  public health: number = 100;
  public velocity: THREE.Vector3 = new THREE.Vector3();
  public direction: THREE.Vector3 = new THREE.Vector3();
  public controls: PointerLockControls;
  public moveForward: boolean = false;
  public moveBackward: boolean = false;
  public moveLeft: boolean = false;
  public moveRight: boolean = false;
  public canJump: boolean = false;
  public isOnGround: boolean = false;
  public collider: Collider;
  private obstacleManager: ObstacleManager | null = null;
  
  constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
    this.controls = new PointerLockControls(camera, domElement);
    this.collider = {
      position: new THREE.Vector3(0, 1.8, 0),
      radius: 0.5,
      height: 3.0,
    };
  }

  /**
   * Sets the ObstacleManager reference to check for collisions
   */
  public setObstacleManager(obstacleManager: ObstacleManager): void {
    this.obstacleManager = obstacleManager;
  }

  public updateMovement(delta: number): void {
    // Apply gravity
    this.velocity.y -= GRAVITY * delta;
    
    // Check if on ground
    this.isOnGround = isOnGround(this.controls.getObject().position.y, 1.8, 0.1);
    
    if (this.isOnGround) {
      this.velocity.y = Math.max(0, this.velocity.y);
      this.canJump = true;
      
      // Apply friction when on ground
      applyFriction(this.velocity, FRICTION);
    }
    
    // Movement direction
    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize();
    
    // Apply movement speed with air control consideration
    const controlFactor = this.isOnGround ? 1.0 : AIR_CONTROL;
    
    if (this.moveForward || this.moveBackward) {
      this.velocity.z -= this.direction.z * MOVEMENT_SPEED * delta * controlFactor;
    }
    
    if (this.moveLeft || this.moveRight) {
      this.velocity.x -= this.direction.x * MOVEMENT_SPEED * delta * controlFactor;
    }
    
    // Apply velocity to controls
    this.controls.moveRight(-this.velocity.x * delta);
    this.controls.moveForward(-this.velocity.z * delta);
    
    // Update player position with gravity
    this.controls.getObject().position.y += this.velocity.y * delta;
    
    // Check if player fell through the floor
    if (this.controls.getObject().position.y < 1.8) {
      this.velocity.y = 0;
      this.controls.getObject().position.y = 1.8;
      this.canJump = true;
      this.isOnGround = true;
    }
    
    // Update collider position
    this.collider.position.copy(this.controls.getObject().position);
  }

  public jump(): void {
    if (this.canJump) {
      this.velocity.y = JUMP_FORCE;
      this.canJump = false;
    }
  }

  public spawn(position: THREE.Vector3): void {
    this.controls.getObject().position.copy(position);
    this.velocity.set(0, 0, 0);
    this.collider.position.copy(position);
  }
  
  public takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
    this.updateHealthDisplay();
  }
  
  public updateHealthDisplay(): void {
    const healthDisplay = document.getElementById('health');
    if (healthDisplay) {
      healthDisplay.textContent = `Health: ${this.health}%`;
    }
  }

  /**
   * Handles collisions with obstacles in the world
   */
  public handleCollisions(): void {
    if (!this.obstacleManager) return;
    
    // Get player position and update collider
    const playerPosition = this.controls.getObject().position;
    this.collider.position.copy(playerPosition);
    
    // Check collisions with all obstacles
    for (const obstacle of this.obstacleManager.getObstacles()) {
      const result = checkCapsuleBoxCollision(this.collider, obstacle);
      
      if (result.collided && result.penetration) {
        // Resolve collision by moving player away
        playerPosition.add(result.penetration);
        
        // If collision is on y-axis, stop vertical velocity
        if (Math.abs(result.penetration.y) > 0.01) {
          this.velocity.y = 0;
        }
      }
    }
  }
} 