import * as THREE from 'three';

/**
 * Represents a flag (balloon) that can be captured by the player
 * When the player takes the flag to the maze exit, they win
 */
export class Flag {
  /** Static properties to control flag appearance */
  private static readonly BALLOON_RADIUS: number = 1;
  private static readonly BALLOON_SEGMENTS: number = 16;
  private static readonly BALLOON_COLOR: number = 0xff0000; // Red
  
  private static readonly STRING_THICKNESS: number = 0.05;
  private static readonly STRING_LENGTH: number = 5;
  private static readonly STRING_SEGMENTS: number = 8;
  private static readonly STRING_COLOR: number = 0xffffff; // White
  
  private static readonly BALLOON_HEIGHT: number = 3; // Y position of balloon
  private static readonly STRING_HEIGHT: number = -1; // Y position of string
  
  private static readonly COLLIDER_RADIUS: number = 1.5; // Interaction radius
  
  /** The 3D mesh representing the flag */
  public mesh: THREE.Group;
  
  /** Flag state */
  public isCaptured: boolean = false;
  
  /** Collision sphere for detecting player interaction */
  public collider: {
    position: THREE.Vector3;
    radius: number;
  };
  
  /** Reference to the scene for adding/removing the flag */
  private scene: THREE.Scene;
  
  constructor(scene: THREE.Scene, position: THREE.Vector3) {
    this.scene = scene;
    
    // Create the flag mesh (balloon-like)
    this.mesh = new THREE.Group();
    
    // Create balloon part
    const balloonGeometry = new THREE.SphereGeometry(
      Flag.BALLOON_RADIUS, 
      Flag.BALLOON_SEGMENTS, 
      Flag.BALLOON_SEGMENTS
    );
    const balloonMaterial = new THREE.MeshLambertMaterial({ 
      color: Flag.BALLOON_COLOR 
    });
    const balloon = new THREE.Mesh(balloonGeometry, balloonMaterial);
    
    // Create string part
    const stringGeometry = new THREE.CylinderGeometry(
      Flag.STRING_THICKNESS, 
      Flag.STRING_THICKNESS, 
      Flag.STRING_LENGTH, 
      Flag.STRING_SEGMENTS
    );
    const stringMaterial = new THREE.MeshBasicMaterial({ 
      color: Flag.STRING_COLOR 
    });
    const string = new THREE.Mesh(stringGeometry, stringMaterial);
    
    // Position the parts
    balloon.position.y = Flag.BALLOON_HEIGHT;
    string.position.y = Flag.STRING_HEIGHT;
    
    // Add parts to the group
    this.mesh.add(balloon);
    this.mesh.add(string);
    
    // Set the position
    this.mesh.position.copy(position);
    
    // Set up the collider
    this.collider = {
      position: position,
      radius: Flag.COLLIDER_RADIUS
    };
    
    // Add mesh to scene
    scene.add(this.mesh);
    
    // Add floating animation
    this.animate();
  }
  
  /**
   * Checks if the player is close enough to capture the flag
   * @param playerPosition The player's current position
   * @returns Whether the player can capture the flag
   */
  public canCapture(playerPosition: THREE.Vector3): boolean {
    const distance = playerPosition.distanceTo(this.mesh.position);
    return !this.isCaptured && distance <= this.collider.radius;
  }
  
  /**
   * Captures the flag, attaching it to the player
   */
  public capture(): void {
    this.isCaptured = true;
    
    // Make the flag semi-transparent to indicate it's captured
    this.mesh.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        child.material.opacity = 0.7;
        child.material.transparent = true;
      }
    });
  }
  
  /**
   * Updates the flag position when captured to follow the player
   * @param playerPosition The player's current position
   */
  public updatePosition(playerPosition: THREE.Vector3): void {
    if (this.isCaptured) {
      // Position the flag slightly above and behind the player
      const newPosition = playerPosition.clone();
      newPosition.y += 2;
      newPosition.z += 1;
      
      this.mesh.position.copy(newPosition);
      this.collider.position.copy(newPosition);
    }
  }
  
  /**
   * Animate the flag to make it float slightly
   */
  private animate(): void {
    // Create a floating animation
    const initialY = this.mesh.position.y;
    let time = 0;
    
    const animateFlag = () => {
      if (!this.isCaptured) {
        time += 0.01;
        this.mesh.position.y = initialY + Math.sin(time) * 0.2;
        
        // Also slightly rotate
        this.mesh.rotation.y += 0.005;
      }
      
      requestAnimationFrame(animateFlag);
    };
    
    animateFlag();
  }
  
  /**
   * Checks if the player with the flag is at the exit
   * @param playerPosition Player's current position
   * @param exitPosition Exit position
   * @returns Whether the player has reached the exit with the flag
   */
  public isAtExit(playerPosition: THREE.Vector3, exitPosition: THREE.Vector3): boolean {
    if (!this.isCaptured) return false;
    
    // Check if player is close to the exit
    const distance = playerPosition.distanceTo(exitPosition);
    return distance < 3; // Within 3 units of the exit
  }
} 