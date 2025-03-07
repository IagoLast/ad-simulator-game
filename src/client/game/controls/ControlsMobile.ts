import { MovementInput } from './ControlsDesktop';

/**
 * Mobile controls for handling touch input with virtual joystick and touchpad
 */
export class ControlsMobile {
  private canvas: HTMLCanvasElement;
  private joystickContainer!: HTMLDivElement;
  private joystickInner!: HTMLDivElement;
  private touchpadContainer!: HTMLDivElement;
  private touchpadInner!: HTMLDivElement;
  private fireButton!: HTMLDivElement;
  private audioButton!: HTMLDivElement;
  
  private joystickActive: boolean = false;
  private joystickPosition = { x: 0, y: 0 };
  private joystickStartPosition = { x: 0, y: 0 };
  private touchpadActive: boolean = false;
  private touchpadStartPosition = { x: 0, y: 0 };
  private touchpadCurrentPosition = { x: 0, y: 0 };
  private touchpadPosition = { x: 0, y: 0 };
  private shooting: boolean = false;
  private audioTogglePressed: boolean = false;
  
  private movementDirection = {
    forward: false,
    backward: false,
    left: false,
    right: false
  };
  
  private mouseX: number = 0;
  private mouseY: number = 0;
  private joystickId: number | null = null;
  private touchpadId: number | null = null;
  
  private joystickMaxDistance: number = 50; // Maximum distance joystick can move from center
  private touchpadMaxDistance: number = 50; // Maximum distance look-around joystick can move
  
  /**
   * Initialize mobile controls
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    
    // Create touch control elements
    this.createTouchControls();
    
    // Set up touch event listeners
    this.setupEventListeners();
    
    // Prevent default browser behaviors on mobile
    this.preventBrowserBehaviors();
  }
  
  /**
   * Create the touch control UI elements
   */
  private createTouchControls(): void {
    // Create joystick container - positioned in the bottom left (moved more toward center)
    this.joystickContainer = document.createElement('div');
    this.joystickContainer.className = 'mobile-joystick-container';
    this.joystickContainer.style.position = 'absolute';
    this.joystickContainer.style.left = '80px'; // Moved 50px toward center (was 30px)
    this.joystickContainer.style.bottom = '80px'; // Lower position
    this.joystickContainer.style.width = '90px'; // Smaller (was 120px)
    this.joystickContainer.style.height = '90px'; // Smaller (was 120px)
    this.joystickContainer.style.borderRadius = '50%';
    this.joystickContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    this.joystickContainer.style.border = '2px solid rgba(255, 255, 255, 0.3)';
    this.joystickContainer.style.zIndex = '1000';
    this.joystickContainer.style.touchAction = 'none';
    
    // Create joystick inner circle
    this.joystickInner = document.createElement('div');
    this.joystickInner.className = 'mobile-joystick-inner';
    this.joystickInner.style.position = 'absolute';
    this.joystickInner.style.left = '50%';
    this.joystickInner.style.top = '50%';
    this.joystickInner.style.transform = 'translate(-50%, -50%)';
    this.joystickInner.style.width = '40px'; // Smaller (was 50px)
    this.joystickInner.style.height = '40px'; // Smaller (was 50px)
    this.joystickInner.style.borderRadius = '50%';
    this.joystickInner.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    this.joystickInner.style.zIndex = '1001';
    
    // Add joystick to container
    this.joystickContainer.appendChild(this.joystickInner);
    
    // Create look-around joystick container (bottom right)
    this.touchpadContainer = document.createElement('div');
    this.touchpadContainer.className = 'mobile-touchpad-container';
    this.touchpadContainer.style.position = 'absolute';
    this.touchpadContainer.style.right = '80px'; // Position
    this.touchpadContainer.style.bottom = '80px'; // Bottom aligned position
    this.touchpadContainer.style.width = '90px'; // Same size as movement joystick
    this.touchpadContainer.style.height = '90px'; // Same size as movement joystick
    this.touchpadContainer.style.borderRadius = '50%'; // Circle shape
    this.touchpadContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    this.touchpadContainer.style.border = '2px solid rgba(255, 255, 255, 0.3)';
    this.touchpadContainer.style.zIndex = '999';
    this.touchpadContainer.style.touchAction = 'none';
    
    // Create inner circle for the look-around joystick
    const touchpadInner = document.createElement('div');
    touchpadInner.className = 'mobile-touchpad-inner';
    touchpadInner.style.position = 'absolute';
    touchpadInner.style.left = '50%';
    touchpadInner.style.top = '50%';
    touchpadInner.style.transform = 'translate(-50%, -50%)';
    touchpadInner.style.width = '40px';
    touchpadInner.style.height = '40px';
    touchpadInner.style.borderRadius = '50%';
    touchpadInner.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    touchpadInner.style.zIndex = '1001';
    touchpadInner.style.display = 'flex';
    touchpadInner.style.alignItems = 'center';
    touchpadInner.style.justifyContent = 'center';
    touchpadInner.style.fontSize = '10px';
    touchpadInner.style.color = 'rgba(0, 0, 0, 0.7)';
    touchpadInner.textContent = 'LOOK';
    
    // Add inner circle to the look-around container and store reference
    this.touchpadContainer.appendChild(touchpadInner);
    this.touchpadInner = touchpadInner;
    
    // Create fire button - smaller and positioned 100px from bottom
    this.fireButton = document.createElement('div');
    this.fireButton.className = 'mobile-fire-button';
    this.fireButton.style.position = 'absolute';
    this.fireButton.style.right = '40px';
    this.fireButton.style.bottom = '100px'; // Exactly 100px from bottom
    this.fireButton.style.width = '70px'; // Smaller (was 90px)
    this.fireButton.style.height = '70px'; // Smaller (was 90px)
    this.fireButton.style.borderRadius = '50%';
    this.fireButton.style.backgroundColor = 'rgba(255, 50, 50, 0.5)';
    this.fireButton.style.border = '2px solid rgba(255, 255, 255, 0.5)';
    this.fireButton.style.zIndex = '1000';
    this.fireButton.style.touchAction = 'none';
    this.fireButton.style.display = 'flex';
    this.fireButton.style.alignItems = 'center';
    this.fireButton.style.justifyContent = 'center';
    this.fireButton.innerHTML = '<span style="color: white; font-weight: bold;">FIRE</span>';
    
    // Create audio toggle button
    this.audioButton = document.createElement('div');
    this.audioButton.className = 'mobile-control audio-button';
    this.audioButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="#FFFFFF"/></svg>`;
    Object.assign(this.audioButton.style, {
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      zIndex: '9999'
    });
    
    // Add controls to document
    document.body.appendChild(this.joystickContainer);
    document.body.appendChild(this.touchpadContainer);
    document.body.appendChild(this.fireButton);
    document.body.appendChild(this.audioButton);
  }
  
  /**
   * Set up touch event listeners
   */
  private setupEventListeners(): void {
    // Joystick touch events
    this.joystickContainer.addEventListener('touchstart', this.onJoystickStart.bind(this));
    this.joystickContainer.addEventListener('touchmove', this.onJoystickMove.bind(this));
    this.joystickContainer.addEventListener('touchend', this.onJoystickEnd.bind(this));
    
    // Touchpad for camera rotation
    this.touchpadContainer.addEventListener('touchstart', this.onTouchpadStart.bind(this));
    this.touchpadContainer.addEventListener('touchmove', this.onTouchpadMove.bind(this));
    this.touchpadContainer.addEventListener('touchend', this.onTouchpadEnd.bind(this));
    
    // Fire button
    this.fireButton.addEventListener('touchstart', this.onFireStart.bind(this));
    this.fireButton.addEventListener('touchend', this.onFireEnd.bind(this));
    
    // Handle orientation changes
    window.addEventListener('orientationchange', this.onOrientationChange.bind(this));
    window.addEventListener('resize', this.onOrientationChange.bind(this));
    
    // Set up audio button event listeners
    this.audioButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.audioTogglePressed = true;
    });
    
    this.audioButton.addEventListener('touchend', (e) => {
      e.preventDefault();
      setTimeout(() => {
        this.audioTogglePressed = false;
      }, 100);
    });
    
    // Initial orientation adjustment
    this.onOrientationChange();
  }
  
  /**
   * Handle joystick touch start
   */
  private onJoystickStart(event: TouchEvent): void {
    event.preventDefault();
    
    // Get the joystick container bounds
    const rect = this.joystickContainer.getBoundingClientRect();
    
    // Find a touch that's within the joystick area
    let joystickTouch: Touch | null = null;
    for (let i = 0; i < event.touches.length; i++) {
      const touch = event.touches[i];
      // Check if this touch is within joystick bounds
      if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
          touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        joystickTouch = touch;
        break;
      }
    }
    
    // If no touch found in joystick area, exit
    if (!joystickTouch) return;
    
    // Store the touch identifier to track this touch
    this.joystickId = joystickTouch.identifier;
    this.joystickActive = true;
    
    // Get the center position of the joystick container
    this.joystickStartPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    
    // Reset the joystick position
    this.joystickPosition = { x: 0, y: 0 };
    this.joystickInner.style.transform = 'translate(-50%, -50%)';
  }
  
  /**
   * Handle joystick touch move
   */
  private onJoystickMove(event: TouchEvent): void {
    event.preventDefault();
    
    if (!this.joystickActive) return;
    
    // Find the touch that started on the joystick
    let touch: Touch | null = null;
    for (let i = 0; i < event.touches.length; i++) {
      if (event.touches[i].identifier === this.joystickId) {
        touch = event.touches[i];
        break;
      }
    }
    
    if (!touch) return;
    
    // Calculate joystick position relative to center
    const dx = touch.clientX - this.joystickStartPosition.x;
    const dy = touch.clientY - this.joystickStartPosition.y;
    
    // Calculate distance from center
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Normalize joystick position if it exceeds max distance
    let normX = dx;
    let normY = dy;
    if (distance > this.joystickMaxDistance) {
      normX = (dx / distance) * this.joystickMaxDistance;
      normY = (dy / distance) * this.joystickMaxDistance;
    }
    
    // Update joystick position
    this.joystickPosition = { x: normX, y: normY };
    
    // Move the joystick visually
    this.joystickInner.style.transform = 
      `translate(calc(-50% + ${normX}px), calc(-50% + ${normY}px))`;
    
    // Update movement direction based on joystick position
    const threshold = this.joystickMaxDistance * 0.3; // Sensitivity threshold
    
    this.movementDirection.forward = normY < -threshold;
    this.movementDirection.backward = normY > threshold;
    this.movementDirection.left = normX < -threshold;
    this.movementDirection.right = normX > threshold;
  }
  
  /**
   * Handle joystick touch end
   */
  private onJoystickEnd(event: TouchEvent): void {
    event.preventDefault();
    
    // Check if the ended touch was the joystick touch
    let joystickTouchEnded = true;
    for (let i = 0; i < event.touches.length; i++) {
      if (event.touches[i].identifier === this.joystickId) {
        joystickTouchEnded = false;
        break;
      }
    }
    
    if (joystickTouchEnded) {
      this.joystickActive = false;
      this.joystickId = null;
      
      // Reset joystick position
      this.joystickPosition = { x: 0, y: 0 };
      this.joystickInner.style.transform = 'translate(-50%, -50%)';
      
      // Reset movement
      this.movementDirection.forward = false;
      this.movementDirection.backward = false;
      this.movementDirection.left = false;
      this.movementDirection.right = false;
    }
  }
  
  /**
   * Handle touchpad touch start
   */
  private onTouchpadStart(event: TouchEvent): void {
    event.preventDefault();
    
    // Get the touchpad container bounds
    const rect = this.touchpadContainer.getBoundingClientRect();
    
    // Find a touch that's within the touchpad area
    let touchpadTouch: Touch | null = null;
    for (let i = 0; i < event.touches.length; i++) {
      const touch = event.touches[i];
      // Check if this touch is within touchpad bounds
      if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
          touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        touchpadTouch = touch;
        break;
      }
    }
    
    // If no valid touch found, try to find a touch in the right side of the screen
    if (!touchpadTouch) {
      for (let i = 0; i < event.touches.length; i++) {
        const touch = event.touches[i];
        // Only consider touches in the right half of the screen that aren't already tracked
        if (touch.clientX >= window.innerWidth / 2 && 
            touch.identifier !== this.joystickId) {
          touchpadTouch = touch;
          break;
        }
      }
    }
    
    // If no valid touch found, exit
    if (!touchpadTouch) return;
    
    // Set this as the touchpad touch
    this.touchpadId = touchpadTouch.identifier;
    this.touchpadActive = true;
    
    // Get the center position of the touchpad container
    this.touchpadStartPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    
    // Reset touchpad position
    this.touchpadPosition = { x: 0, y: 0 };
    this.touchpadInner.style.transform = 'translate(-50%, -50%)';
    
    // Initialize current position
    this.touchpadCurrentPosition = { x: touchpadTouch.clientX, y: touchpadTouch.clientY };
    
    // Reset mouse movement values
    this.mouseX = 0;
    this.mouseY = 0;
  }
  
  /**
   * Handle touchpad touch move
   */
  private onTouchpadMove(event: TouchEvent): void {
    event.preventDefault();
    
    if (!this.touchpadActive) return;
    
    // Find the touch that started on the touchpad
    let touch: Touch | null = null;
    for (let i = 0; i < event.touches.length; i++) {
      if (event.touches[i].identifier === this.touchpadId) {
        touch = event.touches[i];
        break;
      }
    }
    
    if (!touch) return;
    
    // Calculate movement delta for camera rotation
    const dx = touch.clientX - this.touchpadCurrentPosition.x;
    const dy = touch.clientY - this.touchpadCurrentPosition.y;
    
    // Update current position
    this.touchpadCurrentPosition = { x: touch.clientX, y: touch.clientY };
    
    // Apply sensitivity to make camera rotation smoother
    // Increased sensitivity for more responsive look controls
    this.mouseX = dx * 3.5; // Increased from 2 to 3.5
    this.mouseY = dy * 3.5; // Increased from 2 to 3.5
    
    // Calculate joystick position relative to center
    const tdx = touch.clientX - this.touchpadStartPosition.x;
    const tdy = touch.clientY - this.touchpadStartPosition.y;
    
    // Calculate distance from center
    const distance = Math.sqrt(tdx * tdx + tdy * tdy);
    
    // Normalize touchpad position if it exceeds max distance
    let normX = tdx;
    let normY = tdy;
    if (distance > this.touchpadMaxDistance) {
      normX = (tdx / distance) * this.touchpadMaxDistance;
      normY = (tdy / distance) * this.touchpadMaxDistance;
    }
    
    // Update touchpad position
    this.touchpadPosition = { x: normX, y: normY };
    
    // Move the touchpad inner circle visually
    this.touchpadInner.style.transform = 
      `translate(calc(-50% + ${normX}px), calc(-50% + ${normY}px))`;
  }
  
  /**
   * Handle touchpad touch end
   */
  private onTouchpadEnd(event: TouchEvent): void {
    event.preventDefault();
    
    // Check if the ended touch was the touchpad touch
    let touchpadTouchEnded = true;
    for (let i = 0; i < event.touches.length; i++) {
      if (event.touches[i].identifier === this.touchpadId) {
        touchpadTouchEnded = false;
        break;
      }
    }
    
    if (touchpadTouchEnded) {
      this.touchpadActive = false;
      this.touchpadId = null;
      
      // Reset mouse movement
      this.mouseX = 0;
      this.mouseY = 0;
      
      // Reset touchpad visual position
      this.touchpadInner.style.transform = 'translate(-50%, -50%)';
    }
  }
  
  /**
   * Handle fire button touch start
   */
  private onFireStart(event: TouchEvent): void {
    event.preventDefault();
    
    // Get the fire button bounds
    const rect = this.fireButton.getBoundingClientRect();
    
    // Check if any touch is on the fire button
    let fireButtonTouched = false;
    for (let i = 0; i < event.touches.length; i++) {
      const touch = event.touches[i];
      if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
          touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        fireButtonTouched = true;
        break;
      }
    }
    
    if (fireButtonTouched) {
      this.shooting = true;
    }
  }
  
  /**
   * Handle fire button touch end
   */
  private onFireEnd(event: TouchEvent): void {
    event.preventDefault();
    
    // Get the fire button bounds
    const rect = this.fireButton.getBoundingClientRect();
    
    // Check if any remaining touch is still on the fire button
    let stillTouching = false;
    for (let i = 0; i < event.touches.length; i++) {
      const touch = event.touches[i];
      if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
          touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        stillTouching = true;
        break;
      }
    }
    
    // Only stop shooting if no touches remain on the fire button
    if (!stillTouching) {
      this.shooting = false;
    }
  }
  
  /**
   * Get the current movement input (including touch movements)
   */
  public getMovement(): MovementInput {
    return {
      forward: this.movementDirection.forward,
      backward: this.movementDirection.backward,
      left: this.movementDirection.left,
      right: this.movementDirection.right,
      mouseX: this.mouseX,
      mouseY: this.mouseY
    };
  }
  
  /**
   * Update controls state (called each frame)
   */
  public update(deltaTime: number): void {
    // Reset mouse movement after processing
    setTimeout(() => {
      this.mouseX = 0;
      this.mouseY = 0;
    }, 0);
  }
  
  /**
   * Check if player is shooting
   */
  public isShooting(): boolean {
    return this.shooting;
  }
  
  /**
   * Mobile controls are always active
   */
  public isControlActive(): boolean {
    return true;
  }
  
  /**
   * Show mobile controls
   */
  public show(): void {
    this.joystickContainer.style.display = 'block';
    this.touchpadContainer.style.display = 'block';
    this.fireButton.style.display = 'flex';
    this.audioButton.style.display = 'flex';
  }
  
  /**
   * Hide mobile controls
   */
  public hide(): void {
    this.joystickContainer.style.display = 'none';
    this.touchpadContainer.style.display = 'none';
    this.fireButton.style.display = 'none';
    this.audioButton.style.display = 'none';
  }
  
  /**
   * Handle orientation changes
   */
  private onOrientationChange(): void {
    // Get window dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscape = width > height;
    
    // Adjust joystick position
    if (isLandscape) {
      // Landscape mode
      this.joystickContainer.style.left = '80px';
      this.joystickContainer.style.bottom = '80px';
      this.fireButton.style.right = '80px';
      this.fireButton.style.bottom = '80px';
    } else {
      // Portrait mode
      this.joystickContainer.style.left = '30px';
      this.joystickContainer.style.bottom = '150px';
      this.fireButton.style.right = '30px';
      this.fireButton.style.bottom = '150px';
    }
  }
  
  /**
   * Prevent default browser behaviors on mobile devices
   */
  private preventBrowserBehaviors(): void {
    // Prevent pull-to-refresh
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    // Prevent pinch-to-zoom
    document.addEventListener('touchmove', (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, { passive: false });
    
    // Prevent context menu on long press
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
    
    // Prevent text selection
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * Check if the audio toggle button was pressed
   */
  public isAudioTogglePressed(): boolean {
    if (this.audioTogglePressed) {
      this.audioTogglePressed = false; // Reset after being read once
      return true;
    }
    return false;
  }
} 