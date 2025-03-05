import * as THREE from 'three';
import { PlayerState, Weapon, WeaponType } from '../../shared/types';
import { PaintballGun } from './weapons/PaintballGun';

/**
 * Player class representing a player in the game
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
  
  // Combat properties
  private health: number;
  private maxHealth: number = 3; // 3 hits to die
  private isDead: boolean = false;
  private respawnTime: number | null = null;
  private weapons: Map<WeaponType, Weapon> = new Map();
  private currentWeapon!: Weapon; // Using definite assignment assertion
  private weaponMesh: THREE.Group | null = null;
  
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
    this.health = playerState.health !== undefined ? playerState.health : this.maxHealth;
    this.isDead = playerState.isDead || false;
    
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
    this.teamIndicator.position.set(0, this.playerHeight - 0.5, 0.6); // Position on shoulder/chest
    
    // Add team indicator only if it's not a local player (to avoid blocking view)
    if (!isLocalPlayer) {
      this.mesh.add(this.teamIndicator);
    }
    
    // Add eyes to show which direction player is facing
    this.eyes = new THREE.Group();
    
    const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, this.playerHeight - 0.3, 0.5);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, this.playerHeight - 0.3, 0.5);
    
    this.eyes.add(leftEye);
    this.eyes.add(rightEye);
    
    // Only add eyes for non-local players to avoid view obstruction
    if (!isLocalPlayer) {
      this.mesh.add(this.eyes);
    }
    
    // Position mesh at player position
    this.mesh.position.copy(this.position);
    
    // Create flag if player already has it
    if (this.hasFlag) {
      this.addFlagToPlayer();
    }
    
    // Initialize weapons
    this.initializeWeapons();
    
    // Create weapon mesh
    this.createWeaponMesh();
    
    // Update visibility based on dead status
    this.updateVisibility();
  }
  
  /**
   * Initialize player's weapons
   */
  private initializeWeapons(): void {
    // Create paintball gun as the default weapon
    const paintballGun = new PaintballGun();
    this.weapons.set(WeaponType.PAINTBALL_GUN, paintballGun);
    
    // Set current weapon
    this.currentWeapon = paintballGun;
  }
  
  /**
   * Create a visual representation of the weapon
   */
  private createWeaponMesh(): void {
    if (this.isLocalPlayer) {
      // For local player, create a first-person weapon model
      const weaponGroup = new THREE.Group();
      
      // Simple gun model
      const gunBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.4),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
      );
      gunBody.position.set(0, -0.05, 0.2);
      
      const gunBarrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8),
        new THREE.MeshStandardMaterial({ color: 0x555555 })
      );
      gunBarrel.rotation.x = Math.PI / 2;
      gunBarrel.position.set(0, 0, 0.4);
      
      const paintballChamber = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 8),
        new THREE.MeshStandardMaterial({ 
          color: 0x888888, 
          transparent: true,
          opacity: 0.8 
        })
      );
      paintballChamber.position.set(0, 0.1, 0.2);
      
      // Add parts to weapon group
      weaponGroup.add(gunBody);
      weaponGroup.add(gunBarrel);
      weaponGroup.add(paintballChamber);
      
      // Position the weapon in the player's view
      weaponGroup.position.set(
        0.3, // Right side
        -0.2, // Below center
        -0.5  // In front
      );
      
      this.weaponMesh = weaponGroup;
      
      // If camera is attached, add weapon to camera
      if (this.camera) {
        this.camera.add(this.weaponMesh);
      }
    } else {
      // For other players, create a third-person weapon model attached to their hand
      const weaponGroup = new THREE.Group();
      
      // Simple gun
      const gunBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.3),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
      );
      
      const gunBarrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8),
        new THREE.MeshStandardMaterial({ color: 0x555555 })
      );
      gunBarrel.rotation.x = Math.PI / 2;
      gunBarrel.position.set(0, 0, 0.2);
      
      weaponGroup.add(gunBody);
      weaponGroup.add(gunBarrel);
      
      // Position at player's hand
      weaponGroup.position.set(0.5, this.playerHeight - 0.5, 0.3);
      weaponGroup.rotation.y = -Math.PI / 4; // Angle the gun forward
      
      this.weaponMesh = weaponGroup;
      this.mesh.add(this.weaponMesh);
    }
  }
  
  /**
   * Update player visibility based on dead status
   */
  private updateVisibility(): void {
    if (this.isDead) {
      this.mesh.visible = false;
      
      // Also hide weapon if local player
      if (this.isLocalPlayer && this.camera && this.weaponMesh) {
        this.weaponMesh.visible = false;
      }
    } else {
      this.mesh.visible = true;
      
      // Show weapon if local player
      if (this.isLocalPlayer && this.camera && this.weaponMesh) {
        this.weaponMesh.visible = true;
      }
    }
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
    console.log(`[FLAG DEBUG] Player ${this.id} flag status update - old: ${this.hasFlag}, new: ${newHasFlag} (isLocalPlayer: ${this.isLocalPlayer})`);
    
    // Always update flag status to ensure visual state matches server state
    this.setHasFlag(newHasFlag);
    
    // Update health and death status
    this.health = playerState.health;
    const wasDeadBefore = this.isDead;
    this.isDead = playerState.isDead;
    
    // If death status changed, update visibility
    if (wasDeadBefore !== this.isDead) {
      this.updateVisibility();
    }
    
    // Update respawn time
    if (playerState.respawnTime) {
      this.respawnTime = playerState.respawnTime;
    } else {
      this.respawnTime = null;
    }
    
    // Update mesh position and rotation
    this.updateMeshTransform();
  }
  
  /**
   * Update player position
   * @param position New position
   */
  public updatePosition(position: { x: number, y: number, z: number }): void {
    this.position.set(position.x, position.y, position.z);
    this.updateMeshTransform();
  }
  
  /**
   * Update player rotation
   * @param rotation New rotation
   */
  public updateRotation(rotation: { x?: number, y: number }): void {
    this.rotation.y = rotation.y;
    if (rotation.x !== undefined) {
      this.rotation.x = rotation.x;
    }
    this.updateMeshTransform();
  }
  
  /**
   * Attach camera to player for first-person view
   * @param camera The camera to attach
   */
  public attachCamera(camera: THREE.PerspectiveCamera): void {
    this.camera = camera;
    
    // Don't parent the camera to the mesh - we'll update its position manually
    // This prevents issues with rotations and hierarchy
    
    // Set initial camera position
    camera.position.copy(this.position);
    camera.position.y += this.playerHeight * 0.8; // Position at eye level
    
    // Set initial camera rotation
    camera.rotation.order = 'YXZ';
    camera.rotation.x = this.rotation.x;
    camera.rotation.y = this.rotation.y;
    
    // Update mesh transform to ensure everything is positioned correctly
    this.updateMeshTransform();
  }
  
  /**
   * Set walls for collision detection
   * @param walls Array of wall objects
   */
  public setWalls(walls: THREE.Object3D[]): void {
    this.walls = walls;
  }
  
  /**
   * Get player's team ID
   */
  public getTeamId(): number {
    return this.teamId;
  }
  
  /**
   * Get player's ID
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
    // Don't update if player is dead
    if (this.isDead) {
      return false;
    }
    
    // Store previous position for comparison
    const prevPosition = this.position.clone();
    
    // Update player rotation based on mouse movement
    this.rotate(movement.mouseX, movement.mouseY);
    
    // Move player based on keyboard input
    this.move(movement.forward, movement.backward, movement.left, movement.right, deltaTime);
    
    // Compare with previous position to see if significant change
    const distance = this.position.distanceTo(this.lastSentPosition);
    const positionChanged = distance > this.positionThreshold;
    
    // Update last sent position if changed significantly
    if (positionChanged) {
      this.lastSentPosition.copy(this.position);
    }
    
    return positionChanged;
  }
  
  /**
   * Move player based on input
   * @param forward Whether forward key is pressed
   * @param backward Whether backward key is pressed
   * @param left Whether left key is pressed
   * @param right Whether right key is pressed
   * @param deltaTime Time since last update in seconds
   */
  public move(
    forward: boolean, 
    backward: boolean, 
    left: boolean, 
    right: boolean, 
    deltaTime: number
  ): void {
    // Skip if player is dead
    if (this.isDead) {
      return;
    }
    
    // Calculate direction based on rotation
    const direction = new THREE.Vector3();
    
    // Forward/backward movement (Z-axis)
    if (forward) {
      direction.z = -1; // Forward is negative Z in three.js
    } else if (backward) {
      direction.z = 1; // Backward is positive Z
    }
    
    // Left/right movement (X-axis)
    if (left) {
      direction.x = -1; // Left is negative X
    } else if (right) {
      direction.x = 1; // Right is positive X
    }
    
    // Normalize the direction vector to maintain consistent speed in all directions
    if (direction.length() > 0) {
      direction.normalize();
      
      // Calculate move amount based on speed and delta time
      const moveAmount = this.moveSpeed * deltaTime;
      
      // Apply movement amount to direction
      direction.multiplyScalar(moveAmount);
      
      // Apply rotation to movement direction (so forward is camera direction)
      const matrix = new THREE.Matrix4();
      matrix.makeRotationY(this.rotation.y);
      direction.applyMatrix4(matrix);
      
      // Move with collision detection
      this.moveWithCollision(direction);
    }
  }
  
  /**
   * Move player with collision detection
   * @param moveVector Vector to move by
   */
  private moveWithCollision(moveVector: THREE.Vector3): void {
    // Create a raycaster for collision detection
    const raycaster = new THREE.Raycaster();
    
    // Movement distance
    const distance = moveVector.length();
    
    // Skip if not moving
    if (distance === 0) return;
    
    // Normalize the movement vector
    const moveDirection = moveVector.clone().normalize();
    
    // Set raycaster position and direction
    raycaster.set(
      this.position.clone().add(new THREE.Vector3(0, this.playerHeight / 2, 0)),
      moveDirection
    );
    
    // Check distance to closest wall in movement direction
    const intersections = raycaster.intersectObjects(this.walls);
    
    // If there's a wall within movement distance + player radius, adjust movement
    if (intersections.length > 0 && intersections[0].distance < distance + this.playerRadius) {
      // Move up to the wall, but not into it
      const adjustedDistance = Math.max(0, intersections[0].distance - this.playerRadius - 0.1);
      moveVector.setLength(adjustedDistance);
    }
    
    // Apply movement
    this.position.add(moveVector);
    
    // Update mesh transform
    this.updateMeshTransform();
  }
  
  /**
   * Rotate player based on mouse movement
   * @param mouseX Mouse X movement
   * @param mouseY Mouse Y movement
   */
  public rotate(mouseX: number, mouseY: number): void {
    // Skip if no mouse movement or player is dead
    if ((mouseX === 0 && mouseY === 0) || this.isDead) {
      return;
    }
    
    // Apply horizontal rotation (around Y axis)
    this.rotation.y -= mouseX * 0.003;
    
    // Apply vertical rotation (around X axis) with limits to prevent flipping
    this.rotation.x -= mouseY * 0.003;
    this.rotation.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, this.rotation.x));
      
      // Update mesh transform
      this.updateMeshTransform();
  }
  
  /**
   * Update mesh transform based on position and rotation
   */
  private updateMeshTransform(): void {
    // Update position
    this.mesh.position.copy(this.position);
    
    // Update player body rotation (Y axis only)
    this.mesh.rotation.y = this.rotation.y;
    
    // Update camera if this is local player
    if (this.isLocalPlayer && this.camera) {
      // Position camera at eye level
      this.camera.position.copy(this.position);
      this.camera.position.y += this.playerHeight * 0.8; // Position at eye level
      
      // Apply both rotations to camera (look direction)
      this.camera.rotation.order = 'YXZ'; // Important for proper first-person camera
      this.camera.rotation.x = this.rotation.x;
      this.camera.rotation.y = this.rotation.y;
      this.camera.rotation.z = 0;
    }
    
    // Update weapon position if present
    if (this.weaponMesh) {
      this.positionWeaponMesh();
    }
    
    // Update flag position if carrying
    if (this.flag) {
      this.positionFlagOnPlayer();
    }
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
    console.log(`[FLAG DEBUG] Adding flag to player ${this.id} (local: ${this.isLocalPlayer})`);
    
    // If already has a flag, remove it first
    if (this.flag) {
      console.log(`[FLAG DEBUG] Player ${this.id} already has flag, removing it first`);
      this.removeFlagFromPlayer();
    }
    
    // Create flag pole
    const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.0, 8);
    const poleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513,
      emissive: 0x3d1c02,
      emissiveIntensity: 0.3
    });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.castShadow = true;
    
    // Create flag
    const flagGeometry = new THREE.PlaneGeometry(1.2, 0.8);
    const flagMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFD700, // Gold flag
      side: THREE.DoubleSide,
      emissive: 0xFFA500, // Orange emissive color to make it glow
      emissiveIntensity: 0.8 // Stronger glow
    });
    const flagMesh = new THREE.Mesh(flagGeometry, flagMaterial);
    flagMesh.position.set(0.4, 0.7, 0);
    flagMesh.castShadow = true;
    
    // Create flag group
    this.flag = new THREE.Group();
    this.flag.add(pole);
    this.flag.add(flagMesh);
    
    // Position differently based on whether it's the local or remote player
    if (this.isLocalPlayer) {
      // Position for local player - slightly behind and to the side
      this.flag.position.set(-0.3, 0, -0.5);
    } else {
      // Position for remote players - more visible on top
      this.flag.position.set(0, 0.8, 0);
      // Scale up for better visibility
      this.flag.scale.set(1.5, 1.5, 1.5);
    }
    
    // Add to player mesh
    this.mesh.add(this.flag);
    
    // Set flag status
    this.hasFlag = true;
    
    console.log(`[FLAG DEBUG] Flag added to player ${this.id} (flag object exists: ${this.flag !== null})`);
  }
  
  /**
   * Remove the flag from the player
   */
  public removeFlagFromPlayer(): void {
    console.log(`[FLAG DEBUG] Removing flag from player ${this.id} (local: ${this.isLocalPlayer})`);
    
    try {
      if (this.flag) {
        // Check if the flag is actually a child of the mesh
        const flagIndex = this.mesh.children.indexOf(this.flag);
        if (flagIndex !== -1) {
          // Found the flag in the children, remove it
          this.mesh.remove(this.flag);
          console.log(`[FLAG DEBUG] Flag successfully removed from player ${this.id}`);
        } else {
          console.log(`[FLAG DEBUG] Flag reference exists but not found in mesh children for player ${this.id}`);
        }
        
        // Clear flag reference regardless
        this.flag = null;
      } else {
        console.log(`[FLAG DEBUG] No flag to remove from player ${this.id}`);
      }
      
      // Always ensure hasFlag is set to false
      this.hasFlag = false;
    } catch (error) {
      console.error(`[FLAG DEBUG] Error removing flag from player ${this.id}:`, error);
      // Ensure flag state is reset even in case of error
      this.flag = null;
      this.hasFlag = false;
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
    console.log(`[FLAG DEBUG] Setting flag status for player ${this.id} to ${hasFlag} (local: ${this.isLocalPlayer})`);
    
    // Update flag state
    this.hasFlag = hasFlag;
    
    // Change player color based on flag status
    if (this.hasFlag) {
      console.log(`[FLAG DEBUG] Player ${this.id} now has flag, changing to yellow`);
      // Change body to bright yellow color with emission
      (this.playerBody.material as THREE.MeshStandardMaterial).color.set(0xFFFF00); // Bright yellow
      (this.playerBody.material as THREE.MeshStandardMaterial).emissive.set(0xFFAA00); // Orange-yellow emission
      (this.playerBody.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.7;
      
      // Make player fully opaque even if local player
      (this.playerBody.material as THREE.MeshStandardMaterial).opacity = 1.0;
    } else {
      console.log(`[FLAG DEBUG] Player ${this.id} no longer has flag, resetting color`);
      // Reset to original color
      (this.playerBody.material as THREE.MeshStandardMaterial).color.set(0xdddddd); // Light gray
      (this.playerBody.material as THREE.MeshStandardMaterial).emissive.set(0x000000); // No emission
      (this.playerBody.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
      
      // Reset opacity for local player
      if (this.isLocalPlayer) {
        (this.playerBody.material as THREE.MeshStandardMaterial).opacity = 0.3;
      }
    }
  }
  
  /**
   * Check if player is dead
   */
  public isDying(): boolean {
    return this.isDead;
  }
  
  /**
   * Get player's current health
   */
  public getHealth(): number {
    return this.health;
  }
  
  /**
   * Take damage from a hit
   * @param damage Amount of damage to take
   * @returns True if the damage caused death
   */
  public takeDamage(damage: number): boolean {
    // Play hit animation
    this.showHitEffect();
    
    // Reduce health
    this.health = Math.max(0, this.health - damage);
    
    console.log(`Player ${this.id} took ${damage} damage, health now: ${this.health}`);
    
    // Check if player died
    if (this.health <= 0 && !this.isDead) {
      this.die();
      return true;
    }
    
    return false;
  }
  
  /**
   * Show hit visual effect
   */
  private showHitEffect(): void {
    // Flash player body red
    if (this.playerBody) {
      const originalMaterial = this.playerBody.material as THREE.MeshStandardMaterial;
      const originalColor = originalMaterial.color.clone();
      const hitColor = new THREE.Color(0xff0000); // Red
      
      // Store original emissive intensity
      const originalEmissiveIntensity = originalMaterial.emissiveIntensity;
      
      // Set hit effect
      originalMaterial.emissive.set(hitColor);
      originalMaterial.emissiveIntensity = 1.0;
      
      // Reset after a short time
      setTimeout(() => {
        originalMaterial.emissive.set(originalColor);
        originalMaterial.emissiveIntensity = originalEmissiveIntensity;
      }, 150);
    }
    
    // Create hit particles
    this.createHitParticles();
  }
  
  /**
   * Create particle effect for hit
   */
  private createHitParticles(): void {
    // Create particles at player position
    const particleCount = 15;
    const particleGroup = new THREE.Group();
    
    // Set position to player with random offset
    particleGroup.position.copy(this.position);
    particleGroup.position.y += this.playerHeight * 0.5 + (Math.random() * 0.5 - 0.25);
    
    // Get team color for particles
    const color = this.teamId === 1 ? 0xFF3333 : 0x3333FF;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.05, 4, 4);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8
      });
      
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      
      // Random initial position around center
      particle.position.set(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3
      );
      
      // Random velocity
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 2,
        (Math.random() - 0.5) * 2
      );
      
      // Store velocity in userData for animation
      particle.userData.velocity = velocity;
      particle.userData.life = 1.0; // Full opacity to start
      
      particleGroup.add(particle);
    }
    
    // Add to scene
    this.mesh.parent?.add(particleGroup);
    
    // Animate particles
    const animateParticles = () => {
      let allDead = true;
      
      // Update particles
      particleGroup.children.forEach((child) => {
        const particle = child as THREE.Mesh;
        const velocity = particle.userData.velocity as THREE.Vector3;
        
        // Apply gravity
        velocity.y -= 0.05;
        
        // Move particle
        particle.position.add(velocity.clone().multiplyScalar(0.05));
        
        // Reduce life/opacity
        particle.userData.life -= 0.02;
        
        // Update opacity
        const material = particle.material as THREE.MeshBasicMaterial;
        material.opacity = particle.userData.life;
        
        // Check if still alive
        if (particle.userData.life > 0) {
          allDead = false;
        }
      });
      
      // If all particles are dead, remove the group
      if (allDead) {
        particleGroup.parent?.remove(particleGroup);
        return;
      }
      
      // Continue animation
      requestAnimationFrame(animateParticles);
    };
    
    // Start animation
    animateParticles();
  }
  
  /**
   * Handle player death
   */
  private die(): void {
    console.log(`Player ${this.id} died!`);
    
    // Set dead state
    this.isDead = true;
    
    // Remove flag if carrying
    if (this.hasFlag) {
      this.dropFlag();
    }
    
    // Hide player object
    this.updateVisibility();
  }
  
  /**
   * Drop the flag at the current position
   */
  private dropFlag(): void {
    console.log(`Player ${this.id} dropped the flag`);
    
    // Only handle on server side, but notify server we dropped it
    if (this.isLocalPlayer) {
      // Emit event to server
      const customEvent = new CustomEvent('flag_dropped', {
        detail: {
          position: this.position,
          playerId: this.id
        }
      });
      document.dispatchEvent(customEvent);
    }
    
    // Remove flag from player
    this.removeFlagFromPlayer();
  }
  
  /**
   * Respawn the player
   * @param position Position to respawn at
   */
  public respawn(position: { x: number, y: number, z: number }): void {
    this.isDead = false;
    this.health = this.maxHealth;
    this.respawnTime = null;
    
    // Update position
    this.position.set(position.x, position.y, position.z);
    
    // Update visibility
    this.updateVisibility();
    
    // Update mesh transform
    this.updateMeshTransform();
  }
  
  /**
   * Fire the player's weapon
   * @returns Object with shot data if successful, null if couldn't shoot
   */
  public shoot(): { position: THREE.Vector3, direction: THREE.Vector3 } | null {
    // Skip if dead or weapon not available
    if (this.isDead || !this.currentWeapon) {
      return null;
    }
    
    // Check fire rate
    const now = Date.now();
    if (now - this.currentWeapon.lastFired < 1000 / this.currentWeapon.fireRate) {
      return null; // Can't fire yet
    }
    
    // Update last fired time
    this.currentWeapon.lastFired = now;
    
    // Calculate shot position (from camera or player position)
    const shotPosition = new THREE.Vector3();
    if (this.isLocalPlayer && this.camera) {
      // For local player, use camera position
      this.camera.getWorldPosition(shotPosition);
    } else {
      // For other players, use player position plus height
      shotPosition.copy(this.position).add(new THREE.Vector3(0, this.playerHeight - 0.3, 0));
    }
    
    // Calculate shot direction
    const shotDirection = new THREE.Vector3(0, 0, -1); // Forward
    
    // Apply rotation
    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationY(this.rotation.y);
    rotationMatrix.multiply(new THREE.Matrix4().makeRotationX(this.rotation.x));
    shotDirection.applyMatrix4(rotationMatrix);
    
    return {
      position: shotPosition,
      direction: shotDirection
    };
  }
  
  /**
   * Position the weapon mesh relative to the player
   */
  private positionWeaponMesh(): void {
    if (!this.weaponMesh || !this.camera) return;
    
    if (this.isLocalPlayer) {
      // For local player, position weapon relative to camera
      // Remove from scene if it's there
      if (this.weaponMesh.parent !== this.camera) {
        if (this.weaponMesh.parent) {
          this.weaponMesh.parent.remove(this.weaponMesh);
        }
        this.camera.add(this.weaponMesh);
      }
      
      // Position in front of camera
      this.weaponMesh.position.set(0.3, -0.3, -0.5); // Right, down, forward
      this.weaponMesh.rotation.set(0, 0, 0);
    } else {
      // For other players, position weapon in hand
      // Remove from camera if it's there
      if (this.weaponMesh.parent !== this.mesh) {
        if (this.weaponMesh.parent) {
          this.weaponMesh.parent.remove(this.weaponMesh);
        }
        this.mesh.add(this.weaponMesh);
      }
      
      // Position in hand
      const offset = new THREE.Vector3(0.3, -0.2, -0.5); // Right, down, forward
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotation.y);
      this.weaponMesh.position.copy(offset);
      this.weaponMesh.rotation.y = 0; // Relative to player
    }
  }
  
  /**
   * Position the flag on the player's back
   */
  private positionFlagOnPlayer(): void {
    if (!this.flag) return;
    
    // Remove from scene if it's there
    if (this.flag.parent !== this.mesh) {
      if (this.flag.parent) {
        this.flag.parent.remove(this.flag);
      }
      this.mesh.add(this.flag);
    }
    
    // Position flag on the player's back
    this.flag.position.set(0, 0.5, 0.3); // Up and back
    this.flag.rotation.set(0, 0, 0); // Reset rotation
    
    // Scale down the flag when carried
    this.flag.scale.set(0.5, 0.5, 0.5);
  }
} 