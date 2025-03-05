import * as THREE from 'three';
import { io, Socket } from 'socket.io-client';
import { EntityType, GameState, MapData, PlayerMovement, PlayerState, SocketEvents } from '../../shared/types';
import { Controls } from './Controls';
import { Player } from './Player';
import { MapRenderer } from './core/MapRenderer';

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
  private mapRenderer: MapRenderer;
  private walls: THREE.Object3D[] = [];
  private teamInfo: HTMLElement | null = null;

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
    
    // Initialize map renderer
    this.mapRenderer = new MapRenderer(this.scene);
    
    // Create team info display
    this.createTeamInfo();
    
    // Set up socket connection
    this.socket = io();
    this.setupSocketEvents();
    
    // Add event listener for window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    // Add lighting to the scene
    this.addLighting();
    
    // Start the animation loop
    this.lastUpdateTime = performance.now();
    this.animate();
  }

  /**
   * Create a UI element to display team information
   */
  private createTeamInfo(): void {
    // Create team info element
    this.teamInfo = document.createElement('div');
    this.teamInfo.style.position = 'absolute';
    this.teamInfo.style.top = '10px';
    this.teamInfo.style.left = '10px';
    this.teamInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.teamInfo.style.color = 'white';
    this.teamInfo.style.padding = '10px';
    this.teamInfo.style.borderRadius = '5px';
    this.teamInfo.style.fontFamily = 'Arial, sans-serif';
    this.teamInfo.style.zIndex = '1000';
    this.teamInfo.innerHTML = 'Waiting for team assignment...';
    
    // Add to document
    document.body.appendChild(this.teamInfo);
  }

  /**
   * Update team info display
   */
  private updateTeamInfo(): void {
    if (!this.teamInfo || !this.localPlayer) return;
    
    const teamId = this.localPlayer.getTeamId();
    const teamName = teamId === 1 ? 'Red Team' : 'Blue Team';
    const teamColor = teamId === 1 ? '#FF3333' : '#3333FF';
    
    // Count players on each team
    let redCount = 0;
    let blueCount = 0;
    
    this.players.forEach(player => {
      if (player.getTeamId() === 1) {
        redCount++;
      } else if (player.getTeamId() === 2) {
        blueCount++;
      }
    });
    
    // Update the team info display
    this.teamInfo.innerHTML = `
      <div style="margin-bottom: 5px; font-weight: bold; color: ${teamColor};">
        You are on: ${teamName}
      </div>
      <div>Players: Red Team (${redCount}) - Blue Team (${blueCount})</div>
    `;
  }

  /**
   * Set up socket event handlers
   */
  private setupSocketEvents(): void {
    // Handle game state updates
    this.socket.on(SocketEvents.GAME_STATE, (gameState: GameState) => {
      console.log('Received game state:', gameState);
      
      // Process players from game state
      gameState.players.forEach(playerState => {
        // Check if this is the local player
        const isLocalPlayer = playerState.id === this.socket.id;
        
        if (isLocalPlayer) {
          if (!this.localPlayer) {
            // Create new local player if it doesn't exist
            this.localPlayer = this.createPlayer(playerState);
            
            // Attach camera to local player
            this.localPlayer.attachCamera(this.camera);
            
            // Update team info
            this.updateTeamInfo();
          } else {
            // Update existing local player
            this.localPlayer.updateFromState(playerState);
          }
        } else {
          // Handle other players
          if (this.players.has(playerState.id)) {
            // Update existing player
            const player = this.players.get(playerState.id);
            if (player) {
              player.updateFromState(playerState);
            }
          } else {
            // Create new player
            this.createPlayer(playerState);
          }
        }
      });
      
      // If we have map data in the game state, render it
      if (gameState.map) {
        this.mapRenderer.renderMap(gameState.map);
        this.updateWallsList();
      }
      
      // Update team info display
      this.updateTeamInfo();
    });
    
    // Handle player joined
    this.socket.on(SocketEvents.PLAYER_JOINED, (playerState: PlayerState) => {
      console.log('Player joined:', playerState);
      
      // Create new player if not already created
      if (!this.players.has(playerState.id)) {
        this.createPlayer(playerState);
        
        // Update team info display
        this.updateTeamInfo();
      }
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
        
        // Update team info display
        this.updateTeamInfo();
      }
    });
    
    // Handle dedicated map data updates
    this.socket.on(SocketEvents.MAP_DATA, (mapData: MapData) => {
      console.log('Received map data from server:', mapData);
      this.mapRenderer.renderMap(mapData);
      this.updateWallsList();
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
   * Update the list of walls for collision detection
   */
  private updateWallsList(): void {
    // Clear the current walls list
    this.walls = [];
    
    // Find all objects in the scene with isCollidable flag
    this.scene.traverse((object) => {
      if (
        object.userData && 
        object.userData.isCollidable && 
        (object.userData.type === EntityType.WALL || object.userData.type === EntityType.BILLBOARD)
      ) {
        this.walls.push(object);
      }
    });
    
    console.log(`Found ${this.walls.length} collidable objects for collision detection`);
    
    // If we have a local player, update its wall references for collision detection
    if (this.localPlayer) {
      this.localPlayer.setWalls(this.walls);
    }
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
    
    // Calculate delta time
    const deltaTime = (time - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = time;
    
    // Update controls
    this.controls.update(deltaTime);
    
    // Update local player if exists
    if (this.localPlayer) {
      // Update player using controls
      const movement = this.controls.getMovement();
      const shouldEmit = this.localPlayer.update(deltaTime, movement, this.walls);
      
      // Emit player movement if changed
      if (shouldEmit) {
        this.socket.emit(SocketEvents.PLAYER_MOVED, {
          playerId: this.socket.id,
          position: this.localPlayer.getPosition(),
          rotation: this.localPlayer.getRotation()
        });
      }
    }
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }
  
  /**
   * Add lighting to the scene
   */
  private addLighting(): void {
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 16);
    this.scene.add(ambientLight);
    
    // Add directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    
    // Set up shadow properties
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -25;
    directionalLight.shadow.camera.right = 25;
    directionalLight.shadow.camera.top = 25;
    directionalLight.shadow.camera.bottom = -25;
    
    this.scene.add(directionalLight);
  }
} 