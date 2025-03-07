/**
 * Movement input data
 */
export interface MovementInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  mouseX: number;
  mouseY: number;
}

/**
 * Controls class for handling keyboard and mouse input
 */
export class ControlsDesktop {
  private keys: { [key: string]: boolean };
  private mouseX: number;
  private mouseY: number;
  private mouseSensitivity: number;
  private isPointerLocked: boolean;
  private canvas: HTMLCanvasElement;
  private shooting: boolean = false;
  private toggleAudioPressed: boolean = false;
  
  /**
   * Initialize controls
   */
  constructor(canvas: HTMLCanvasElement) {
    this.keys = {};
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseSensitivity = 0.002; // Adjust sensitivity as needed
    this.isPointerLocked = false;
    this.canvas = canvas;
    
    // Set up keyboard event listeners
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    
    // Set up mouse event listeners
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('click', this.requestPointerLock.bind(this));
    
    // Handle pointer lock changes
    document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));
    
    // Initialize keys
    for (const key of ['w', 'a', 's', 'd', 'c']) {
      this.keys[key] = false;
    }
  }
  
  /**
   * Handle key down events
   */
  private onKeyDown(event: KeyboardEvent): void {
    // Only handle key press if pointer is locked
    if (!this.isPointerLocked) {
      return;
    }
    
    // Update key state
    const key = event.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'c'].includes(key)) {
      this.keys[key] = true;
    }
  }
  
  /**
   * Handle key up events
   */
  private onKeyUp(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'c'].includes(key)) {
      this.keys[key] = false;
    }
  }
  
  /**
   * Handle mouse down events
   */
  private onMouseDown(event: MouseEvent): void {
    // Only handle mouse if pointer is locked
    if (!this.isPointerLocked) {
      return;
    }
    
    // Left mouse button (0) for shooting
    if (event.button === 0) {
      this.shooting = true;
    }
  }
  
  /**
   * Handle mouse up events
   */
  private onMouseUp(event: MouseEvent): void {
    // Left mouse button (0) for shooting
    if (event.button === 0) {
      this.shooting = false;
    }
  }
  
  /**
   * Handle mouse movement
   */
  private onMouseMove(event: MouseEvent): void {
    // Only handle mouse movement if pointer is locked
    if (!this.isPointerLocked) {
      return;
    }
    
    // Apply mouse sensitivity
    this.mouseX = event.movementX;
    this.mouseY = event.movementY;
  }
  
  /**
   * Request pointer lock on canvas
   */
  private requestPointerLock(): void {
    if (!this.isPointerLocked) {
      this.canvas.requestPointerLock();
    }
  }
  
  /**
   * Handle pointer lock change
   */
  private onPointerLockChange(): void {
    this.isPointerLocked = document.pointerLockElement === this.canvas;
  }
  
  /**
   * Update controls state (can be called each frame)
   * @param deltaTime Time elapsed since last frame in seconds
   */
  public update(deltaTime: number): void {
    // Reset mouse movement after each frame
    // This prevents continuous rotation when mouse is not moving
    setTimeout(() => {
      this.mouseX = 0;
      this.mouseY = 0;
    }, 0);
  }
  
  /**
   * Get the current movement input (including mouse)
   */
  public getMovement(): MovementInput {
    return {
      forward: this.isKeyPressed('w'),
      backward: this.isKeyPressed('s'),
      left: this.isKeyPressed('a'),
      right: this.isKeyPressed('d'),
      mouseX: this.mouseX,
      mouseY: this.mouseY
    };
  }
  
  /**
   * Check if a key is currently pressed
   */
  private isKeyPressed(key: string): boolean {
    return this.keys[key] === true;
  }
  
  /**
   * Check if player is shooting
   */
  public isShooting(): boolean {
    return this.shooting;
  }
  
  /**
   * Check if pointer is locked
   */
  public isControlActive(): boolean {
    return this.isPointerLocked;
  }
  
  /**
   * Check if the audio toggle key (C) was pressed
   * Returns true only once per key press to avoid toggling rapidly
   */
  public isAudioTogglePressed(): boolean {
    const isPressed = this.isKeyPressed('c');
    
    // If key is pressed but wasn't pressed before
    if (isPressed && !this.toggleAudioPressed) {
      this.toggleAudioPressed = true;
      return true;
    }
    
    // If key is released, reset the toggleAudioPressed state
    if (!isPressed && this.toggleAudioPressed) {
      this.toggleAudioPressed = false;
    }
    
    return false;
  }
} 