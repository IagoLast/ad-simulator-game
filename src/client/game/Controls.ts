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
export class Controls {
  private keys: { [key: string]: boolean };
  private mouseX: number;
  private mouseY: number;
  private mouseSensitivity: number;
  private isPointerLocked: boolean;
  private canvas: HTMLCanvasElement;
  
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
    this.canvas.addEventListener('click', this.requestPointerLock.bind(this));
    
    // Handle pointer lock changes
    document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));
    
    // Initialize keys
    for (const key of ['w', 'a', 's', 'd']) {
      this.keys[key] = false;
    }
  }
  
  /**
   * Handle key down events
   */
  private onKeyDown(event: KeyboardEvent): void {
    // Store key state (lowercase for consistency)
    this.keys[event.key.toLowerCase()] = true;
    
    // Prevent scrolling with WASD
    if (['w', 'a', 's', 'd'].includes(event.key.toLowerCase())) {
      event.preventDefault();
    }
  }
  
  /**
   * Handle key up events
   */
  private onKeyUp(event: KeyboardEvent): void {
    // Store key state (lowercase for consistency)
    this.keys[event.key.toLowerCase()] = false;
  }
  
  /**
   * Handle mouse movement
   */
  private onMouseMove(event: MouseEvent): void {
    if (this.isPointerLocked) {
      // Get mouse movement (not position)
      this.mouseX = event.movementX * this.mouseSensitivity;
      this.mouseY = event.movementY * this.mouseSensitivity;
    }
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
   * Get the current movement input (including mouse)
   */
  public getMovement(): MovementInput {
    // Reset mouse movement after it's been consumed
    const result = {
      forward: this.isKeyPressed('w'),
      backward: this.isKeyPressed('s'),
      left: this.isKeyPressed('a'),
      right: this.isKeyPressed('d'),
      mouseX: this.mouseX,
      mouseY: this.mouseY
    };
    
    // Reset mouse deltas after they've been used
    this.mouseX = 0;
    this.mouseY = 0;
    
    return result;
  }
  
  /**
   * Check if a key is currently pressed
   */
  private isKeyPressed(key: string): boolean {
    return this.keys[key] === true;
  }
  
  /**
   * Check if pointer is locked
   */
  public isControlActive(): boolean {
    return this.isPointerLocked;
  }
} 