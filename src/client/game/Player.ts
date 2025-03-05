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
  private camera: THREE.PerspectiveCamera | null = null;
  private walls: THREE.Object3D[] = [];
  private playerHeight: number = 1.8;
  private playerRadius: number = 0.5;
  private lastSentPosition: THREE.Vector3;
  private positionThreshold: number = 0.1;
  private playerBody: THREE.Mesh;
  private eyes: THREE.Group;
  private teamId: number;
  private teamIndicator: THREE.Mesh;
  private flag: THREE.Group | null = null; // Reference to flag object when carrying
  private hasFlag: boolean = false;
  
  /**
   * Create a new player
   */
  constructor(playerState: PlayerState, isLocalPlayer: boolean) {
    this.id = playerState.id;
    this.isLocalPlayer = isLocalPlayer;
    this.moveSpeed = 5; // Units per second
    this.position = new THREE.Vector3(playerState.position.x, playerState.position.y, playerState.position.z);
    this.rotation = { 
      x: playerState.rotation.x || 0, // Vertical rotation (pitch)
      y: playerState.rotation.y || 0 // Horizontal rotation (yaw)
    };
    this.lastSentPosition = this.position.clone();
    this.teamId = playerState.teamId;
    this.hasFlag = playerState.hasFlag || false;
    
    // Create player mesh
    this.mesh = new THREE.Group();
    
    // Create player body (simple box)
    const bodyGeometry = new THREE.BoxGeometry(1, this.playerHeight, 1);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xdddddd, // Light gray base color
      transparent: isLocalPlayer, // Make local player transparent
      opacity: isLocalPlayer ? 0.3 : 1.0 // Semi-transparent for local player
    });
    
    this.playerBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.playerBody.position.y = this.playerHeight / 2; // Center the body vertically
    this.playerBody.castShadow = true;
    this.mesh.add(this.playerBody);
    
    // Create team indicator (shoulder badge)
    const badgeGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const badgeMaterial = new THREE.MeshStandardMaterial({
      color: playerState.color,
      emissive: playerState.color,
      emissiveIntensity: 0.5
    });
    this.teamIndicator = new THREE.Mesh(badgeGeometry, badgeMaterial);
    
    // Position badge on the shoulder/chest
    this.teamIndicator.position.set(0, this.playerHeight - 0.4, -0.3);
    this.mesh.add(this.teamIndicator);
    
    // Create eyes to indicate direction
    this.eyes = new THREE.Group();
    this.eyes.position.y = this.playerHeight - 0.3; // Place eyes near the top of the body
    this.eyes.position.z = -0.51; // Slightly in front of the body surface
    this.mesh.add(this.eyes);
    
    // Left eye
    const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.x = -0.2;
    this.eyes.add(leftEye);
    
    // Right eye
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.x = 0.2;
    this.eyes.add(rightEye);
    
    // Add pupils to make direction even clearer
    const pupilGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    
    // Left pupil
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.z = -0.08;
    leftEye.add(leftPupil);
    
    // Right pupil
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.z = -0.08;
    rightEye.add(rightPupil);
    
    // Create team flag/banner on player's back
    const flagGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.05);
    const flagMaterial = new THREE.MeshStandardMaterial({
      color: playerState.color,
      emissive: playerState.color,
      emissiveIntensity: 0.3
    });
    const flag = new THREE.Mesh(flagGeometry, flagMaterial);
    flag.position.set(0, this.playerHeight - 0.5, 0.5);
    this.mesh.add(flag);
    
    // Hide eyes and front-facing elements for local player to avoid obscuring view
    if (isLocalPlayer) {
      this.eyes.visible = false;
      
      // Make team indicator less obtrusive for local player
      if (this.teamIndicator) {
        this.teamIndicator.visible = false;
      }
    }
    
    // If player has the flag, create and attach it
    if (this.hasFlag) {
      this.addFlagToPlayer();
    }
    
    // Update initial transform
    this.updateMeshTransform();
  }
  
  /**
   * Update player from state received from server
   * @param playerState Updated player state from server
   */
  public updateFromState(playerState: PlayerState): void {
    // Update position if changed significantly
    if (
      Math.abs(playerState.position.x - this.position.x) > 0.01 ||
      Math.abs(playerState.position.y - this.position.y) > 0.01 ||
      Math.abs(playerState.position.z - this.position.z) > 0.01
    ) {
      this.position.set(playerState.position.x, playerState.position.y, playerState.position.z);
    }
    
    // Update rotation
    this.rotation.y = playerState.rotation.y;
    if (playerState.rotation.x !== undefined) {
      this.rotation.x = playerState.rotation.x;
    }
    
    // Check if flag status has changed
    const newHasFlag = playerState.hasFlag || false;
    console.log(`Player ${this.id} flag status update - old: ${this.hasFlag}, new: ${newHasFlag}`);
    
    if (newHasFlag !== this.hasFlag) {
      this.hasFlag = newHasFlag;
      
      if (this.hasFlag) {
        console.log(`Player ${this.id} now has the flag, adding visual representation`);
        this.addFlagToPlayer();
      } else {
        console.log(`Player ${this.id} no longer has the flag, removing visual representation`);
        this.removeFlagFromPlayer();
      }
    }
    
    // Update mesh position and rotation
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
   * Attach a camera to this player
   */
  public attachCamera(camera: THREE.PerspectiveCamera): void {
    this.camera = camera;
    
    // Position the camera at eye level
    camera.position.y = this.playerHeight - 0.2;
    this.mesh.add(camera);
  }
  
  /**
   * Set the walls for collision detection
   */
  public setWalls(walls: THREE.Object3D[]): void {
    this.walls = walls;
  }
  
  /**
   * Get the player's team ID
   */
  public getTeamId(): number {
    return this.teamId;
  }
  
  /**
   * Get player ID
   */
  public getId(): string {
    return this.id;
  }
  
  /**
   * Update player based on movement controls
   * @param deltaTime Time since last update in seconds
   * @param movement Movement input { forward, backward, left, right, mouseX, mouseY }
   * @param walls Array of wall objects for collision detection
   * @returns Whether the position has changed enough to send to server
   */
  public update(
    deltaTime: number, 
    movement: { forward: boolean, backward: boolean, left: boolean, right: boolean, mouseX: number, mouseY: number },
    walls: THREE.Object3D[]
  ): boolean {
    // Update walls reference
    this.walls = walls;
    
    // Store previous position for comparison
    const previousPosition = this.position.clone();
    
    // Apply rotation from mouse movement
    if (this.isLocalPlayer) {
      this.rotate(movement.mouseX, movement.mouseY);
    }
    
    // Apply movement
    this.move(
      movement.forward,
      movement.backward,
      movement.left,
      movement.right,
      deltaTime
    );
    
    // Check if position has changed enough to send to server
    const movedEnough = this.position.distanceTo(this.lastSentPosition) > this.positionThreshold;
    if (movedEnough) {
      this.lastSentPosition.copy(this.position);
    }
    
    return movedEnough;
  }
  
  /**
   * Move the player
   */
  public move(
    forward: boolean, 
    backward: boolean, 
    left: boolean, 
    right: boolean, 
    deltaTime: number
  ): void {
    // Skip if no movement
    if (!forward && !backward && !left && !right) {
      return;
    }
    
    // Calculate movement vector
    const moveVector = new THREE.Vector3(0, 0, 0);
    
    // Forward/backward movement along z-axis
    if (forward) moveVector.z -= 1;
    if (backward) moveVector.z += 1;
    
    // Left/right movement along x-axis
    if (left) moveVector.x -= 1;
    if (right) moveVector.x += 1;
    
    // Normalize to prevent diagonal movement being faster
    if (moveVector.length() > 0) {
      moveVector.normalize();
    }
    
    // Convert to world space based on player rotation
    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(this.rotation.y);
    moveVector.applyMatrix4(rotationMatrix);
    
    // Scale by move speed and delta time
    moveVector.multiplyScalar(this.moveSpeed * deltaTime);
    
    // Apply movement with collision detection
    this.moveWithCollision(moveVector);
    
    // Update mesh transform
    this.updateMeshTransform();
  }
  
  /**
   * Move with collision detection
   */
  private moveWithCollision(moveVector: THREE.Vector3): void {
    // If no walls, just apply the movement
    if (this.walls.length === 0) {
      this.position.add(moveVector);
      return;
    }
    
    // Create a ray for collision detection
    const raycaster = new THREE.Raycaster();
    const playerCenter = this.position.clone();
    playerCenter.y += this.playerHeight / 2; // Center of player (not feet)
    
    // Try to move in X direction
    if (Math.abs(moveVector.x) > 0) {
      const direction = new THREE.Vector3(Math.sign(moveVector.x), 0, 0);
      raycaster.set(playerCenter, direction);
      const intersects = raycaster.intersectObjects(this.walls);
      
      if (intersects.length > 0 && intersects[0].distance < Math.abs(moveVector.x) + this.playerRadius) {
        moveVector.x = 0; // Cannot move in this direction
      }
    }
    
    // Try to move in Z direction
    if (Math.abs(moveVector.z) > 0) {
      const direction = new THREE.Vector3(0, 0, Math.sign(moveVector.z));
      raycaster.set(playerCenter, direction);
      const intersects = raycaster.intersectObjects(this.walls);
      
      if (intersects.length > 0 && intersects[0].distance < Math.abs(moveVector.z) + this.playerRadius) {
        moveVector.z = 0; // Cannot move in this direction
      }
    }
    
    // Apply the adjusted movement
    this.position.add(moveVector);
  }
  
  /**
   * Rotate the player
   */
  public rotate(mouseX: number, mouseY: number): void {
    // Apply horizontal rotation (yaw)
    this.rotation.y -= mouseX * 0.002;
    
    // Apply vertical rotation (pitch) with limits
    this.rotation.x -= mouseY * 0.002;
    this.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotation.x));
    
    // Update mesh transform
    this.updateMeshTransform();
    
    // Update camera rotation if attached
    if (this.camera) {
      this.camera.rotation.x = this.rotation.x;
    }
  }
  
  /**
   * Update mesh transform based on position and rotation
   */
  private updateMeshTransform(): void {
    // Update position
    this.mesh.position.copy(this.position);
    
    // Update rotation (yaw only for the mesh)
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
  
  /**
   * Add a flag to the player to show they're carrying it
   */
  public addFlagToPlayer(): void {
    console.log(`Adding flag to player ${this.id}`);
    
    // If already has a flag, remove it first
    if (this.flag) {
      this.removeFlagFromPlayer();
    }
    
    // Create flag pole
    const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.castShadow = true;
    
    // Create flag
    const flagGeometry = new THREE.PlaneGeometry(0.6, 0.4);
    const flagMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFD700, // Gold flag
      side: THREE.DoubleSide 
    });
    const flagMesh = new THREE.Mesh(flagGeometry, flagMaterial);
    flagMesh.position.set(0.3, 0.6, 0);
    flagMesh.castShadow = true;
    
    // Create flag group
    this.flag = new THREE.Group();
    this.flag.add(pole);
    this.flag.add(flagMesh);
    
    // Position the flag on the player's back
    this.flag.position.set(0, this.playerHeight - 0.5, -0.3);
    this.flag.rotation.set(0, 0, 0);
    
    // Add to player mesh
    this.mesh.add(this.flag);
    
    console.log(`Flag added to player ${this.id}`);
  }
  
  /**
   * Remove the flag from the player
   */
  public removeFlagFromPlayer(): void {
    console.log(`Removing flag from player ${this.id}`);
    if (this.flag) {
      this.mesh.remove(this.flag);
      this.flag = null;
      console.log(`Flag removed from player ${this.id}`);
    }
  }
  
  /**
   * Check if the player is carrying the flag
   */
  public isCarryingFlag(): boolean {
    console.log(`Checking if player ${this.id} is carrying flag: ${this.hasFlag}`);
    return this.hasFlag;
  }
  
  /**
   * Set flag carrying status and update visual representation
   * @param hasFlag Whether the player is carrying the flag
   */
  public setHasFlag(hasFlag: boolean): void {
    console.log(`Setting flag status for player ${this.id} to ${hasFlag}`);
    
    if (this.hasFlag !== hasFlag) {
      this.hasFlag = hasFlag;
      
      if (this.hasFlag) {
        console.log(`Adding flag visual to player ${this.id}`);
        this.addFlagToPlayer();
      } else {
        console.log(`Removing flag visual from player ${this.id}`);
        this.removeFlagFromPlayer();
      }
    }
  }
} 