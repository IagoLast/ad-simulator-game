import * as THREE from 'three';
import { PlayerState } from '../../shared/types';

/**
 * Player class for handling movement and rotation in a first-person game
 */
export class Player {
  public mesh: THREE.Group;
  private id: string;
  private isLocalPlayer: boolean;
  private moveSpeed: number;
  private position: THREE.Vector3;
  private rotation: { x: number, y: number };
  
  /**
   * Create a new player
   */
  constructor(playerState: PlayerState, isLocalPlayer: boolean) {
    this.id = playerState.id;
    this.isLocalPlayer = isLocalPlayer;
    this.moveSpeed = 5; // Units per second
    this.position = new THREE.Vector3(playerState.position.x, playerState.position.y, playerState.position.z);
    this.rotation = { 
      x: 0, // Vertical rotation (pitch)
      y: playerState.rotation.y || 0 // Horizontal rotation (yaw)
    };
    
    // Create player mesh
    this.mesh = new THREE.Group();
    
    // Create player body (simple box)
    const bodyGeometry = new THREE.BoxGeometry(1, 1.8, 1);
    const bodyMaterial = new THREE.MeshBasicMaterial({ 
      color: isLocalPlayer ? 0x00ff00 : 0xff0000
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.9; // Center the body vertically
    this.mesh.add(body);
    
    // Update initial transform
    this.updateMeshTransform();
  }
  
  /**
   * Update player position
   */
  public updatePosition(position: { x: number, y: number, z: number }): void {
    this.position.set(position.x, position.y, position.z);
    this.updateMeshTransform();
  }
  
  /**
   * Update player rotation
   */
  public updateRotation(rotation: { x?: number, y: number }): void {
    if (rotation.x !== undefined) {
      this.rotation.x = rotation.x;
    }
    this.rotation.y = rotation.y;
    this.updateMeshTransform();
  }
  
  /**
   * Move the player based on input
   */
  public move(
    forward: boolean, 
    backward: boolean, 
    left: boolean, 
    right: boolean, 
    deltaTime: number
  ): void {
    // Calculate direction vector in player's local space
    const direction = new THREE.Vector3();
    
    if (forward) direction.z -= 1;
    if (backward) direction.z += 1;
    if (left) direction.x -= 1;
    if (right) direction.x += 1;
    
    // Apply movement if any direction keys are pressed
    if (direction.length() > 0) {
      // Normalize direction for consistent movement speed in all directions
      direction.normalize();
      
      // Convert to world space based on player's current rotation
      const rotationMatrix = new THREE.Matrix4();
      rotationMatrix.makeRotationY(this.rotation.y);
      direction.applyMatrix4(rotationMatrix);
      
      // Apply movement speed and delta time
      direction.multiplyScalar(this.moveSpeed * deltaTime);
      
      // Update position
      this.position.add(direction);
      
      // Update mesh transform
      this.updateMeshTransform();
    }
  }
  
  /**
   * Rotate the player based on mouse input
   */
  public rotate(mouseX: number, mouseY: number): void {
    if (mouseX !== 0 || mouseY !== 0) {
      // Update yaw (horizontal rotation)
      this.rotation.y -= mouseX;
      
      // Update pitch (vertical rotation) with limits to prevent flipping
      this.rotation.x -= mouseY;
      this.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.rotation.x));
      
      // Update mesh transform
      this.updateMeshTransform();
    }
  }
  
  /**
   * Update mesh transform to match position and rotation
   */
  private updateMeshTransform(): void {
    // Update position
    this.mesh.position.copy(this.position);
    
    // Update rotation (only Y rotation for the mesh)
    this.mesh.rotation.y = this.rotation.y;
  }
  
  /**
   * Get player position
   */
  public getPosition(): { x: number, y: number, z: number } {
    return {
      x: this.position.x,
      y: this.position.y,
      z: this.position.z
    };
  }
  
  /**
   * Get player rotation
   */
  public getRotation(): { x: number, y: number } {
    return {
      x: this.rotation.x,
      y: this.rotation.y
    };
  }
} 