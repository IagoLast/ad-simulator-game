import * as THREE from 'three';
import { io, Socket } from 'socket.io-client';
import { GameState, PlayerMovement, PlayerState, SocketEvents } from '../../shared/types';
import { Controls } from './Controls';
import { Player } from './Player';

/**
 * Game class for a first-person multiplayer 3D game
 */
export class Game {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private socket: Socket;
  private players: Map<string, Player>;
  private localPlayer: Player | null;
  private controls: Controls;
  private lastUpdateTime: number;
  private playerCount: HTMLElement;
  private ground: THREE.Mesh;

  /**
   * Initialize the game
   */
  constructor() {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // Sky blue
    
    // Set up renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);
    
    // Create camera (will be positioned by the player later)
    this.camera = new THREE.PerspectiveCamera(
      75, // FOV
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near plane
      1000 // Far plane
    );
    
    // Initialize controls with canvas element
    this.controls = new Controls(this.renderer.domElement);
    
    // Create collections
    this.players = new Map();
    this.localPlayer = null;
    
    // Set up socket connection
    this.socket = io();
    this.setupSocketEvents();
    
    // Get player count element
    this.playerCount = document.getElementById('player-count') as HTMLElement;
    
    // Set up the ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x555555, 
      side: THREE.DoubleSide
    });
    this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
    this.ground.rotation.x = Math.PI / 2;
    this.ground.position.y = 0;
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    // Add directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
    
    // Configure shadow properties
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    
    // Set up window resize handler
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    // Initialize time tracking
    this.lastUpdateTime = performance.now();
    
    // Start animation loop
    this.animate();
  }

  /**
   * Set up socket event handlers
   */
  private setupSocketEvents(): void {
    // Handle initial game state
    this.socket.on(SocketEvents.GAME_STATE, (gameState: GameState) => {
      console.log('Received game state:', gameState);
      
      // Create players from game state
      gameState.players.forEach(playerState => {
        if (playerState.id === this.socket.id) {
          // Create local player
          this.localPlayer = this.createPlayer(playerState);
        } else {
          // Create other players
          this.createPlayer(playerState);
        }
      });
      
      // Update player count
      this.updatePlayerCount();
    });
    
    // Handle player joined
    this.socket.on(SocketEvents.PLAYER_JOINED, (playerState: PlayerState) => {
      console.log('Player joined:', playerState);
      
      // Create new player
      this.createPlayer(playerState);
      
      // Update player count
      this.updatePlayerCount();
    });
    
    // Handle player moved
    this.socket.on(SocketEvents.PLAYER_MOVED, (playerMovement: PlayerMovement) => {
      // Get player from map
      const player = this.players.get(playerMovement.playerId);
      
      // Update player if found and not local player
      if (player && playerMovement.playerId !== this.socket.id) {
        player.updatePosition(playerMovement.position);
        player.updateRotation(playerMovement.rotation);
      }
    });
    
    // Handle player left
    this.socket.on(SocketEvents.PLAYER_LEFT, (playerId: string) => {
      console.log('Player left:', playerId);
      
      // Get player from map
      const player = this.players.get(playerId);
      
      // Remove player if found
      if (player) {
        // Remove from scene
        this.scene.remove(player.mesh);
        
        // Remove from map
        this.players.delete(playerId);
        
        // Update player count
        this.updatePlayerCount();
      }
    });
  }

  /**
   * Create a player from player state
   */
  private createPlayer(playerState: PlayerState): Player {
    // Create player
    const isLocalPlayer = playerState.id === this.socket.id;
    const player = new Player(playerState, isLocalPlayer);
    
    // Add player to scene
    this.scene.add(player.mesh);
    
    // Add player to map
    this.players.set(playerState.id, player);
    
    // Return player
    return player;
  }

  /**
   * Update player count display
   */
  private updatePlayerCount(): void {
    // Update player count text
    this.playerCount.textContent = `Players: ${this.players.size}`;
  }

  /**
   * Handle window resize
   */
  private onWindowResize(): void {
    // Update camera aspect ratio
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    
    // Update renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * Animation loop
   */
  private animate(time: number = 0): void {
    // Request next frame
    requestAnimationFrame(this.animate.bind(this));
    
    // Calculate delta time (in seconds)
    const deltaTime = (time - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = time;
    
    // Update local player movement and rotation
    if (this.localPlayer && this.socket.id) {
      // Get movement input
      const movement = this.controls.getMovement();
      
      // Apply movement to local player
      if (movement.forward || movement.backward || movement.left || movement.right) {
        this.localPlayer.move(
          movement.forward, 
          movement.backward, 
          movement.left, 
          movement.right, 
          deltaTime
        );
      }

      // Apply rotation from mouse input
      if (movement.mouseX !== 0 || movement.mouseY !== 0) {
        this.localPlayer.rotate(movement.mouseX, movement.mouseY);
      }

      // Position camera for first-person view
      const playerPos = this.localPlayer.getPosition();
      const playerRot = this.localPlayer.getRotation();
      
      // Position camera at player's head
      this.camera.position.set(playerPos.x, playerPos.y + 1.7, playerPos.z);
      
      // Apply player rotation to camera
      this.camera.rotation.order = 'YXZ'; // Important for FPS camera
      this.camera.rotation.y = playerRot.y;
      this.camera.rotation.x = playerRot.x;
      
      // Send position and rotation update to server
      this.socket.emit(SocketEvents.PLAYER_MOVED, {
        playerId: this.socket.id,
        position: this.localPlayer.getPosition(),
        rotation: this.localPlayer.getRotation()
      });
    }
    
    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }
} 