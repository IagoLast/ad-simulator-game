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
  private gameMessageElement: HTMLElement | null = null;
  private flagObject: THREE.Object3D | null = null;
  private flagCarrier: string | null = null;
  private gameOver: boolean = false;
  private winningTeam: number | null = null;

  /**
   * Create a new game instance
   */
  constructor() {
    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB); // Sky blue background
    
    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    
    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);
    
    // Create team info display
    this.createTeamInfo();
    
    // Create game message display
    this.createGameMessage();
    
    // Initialize map renderer
    this.mapRenderer = new MapRenderer(this.scene);
    
    // Initialize socket connection
    this.socket = io();
    
    // Initialize players collection
    this.players = new Map();
    this.localPlayer = null;
    
    // Initialize controls
    this.controls = new Controls(this.renderer.domElement);
    
    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    // Set up event handlers for socket events
    this.setupSocketEvents();
    
    // Add lighting to the scene
    this.addLighting();
    
    // Store last update time
    this.lastUpdateTime = 0;
    
    // Start animation loop
    this.animate();
  }

  /**
   * Create team info display
   */
  private createTeamInfo(): void {
    // Create team info element
    this.teamInfo = document.createElement('div');
    this.teamInfo.style.position = 'absolute';
    this.teamInfo.style.top = '20px';
    this.teamInfo.style.left = '20px';
    this.teamInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.teamInfo.style.color = 'white';
    this.teamInfo.style.padding = '10px';
    this.teamInfo.style.borderRadius = '5px';
    this.teamInfo.style.fontFamily = 'Arial, sans-serif';
    this.teamInfo.style.fontSize = '16px';
    this.teamInfo.style.zIndex = '100';
    
    document.body.appendChild(this.teamInfo);
  }

  /**
   * Create game message display for CTF status
   */
  private createGameMessage(): void {
    // Create game message element
    this.gameMessageElement = document.createElement('div');
    this.gameMessageElement.style.position = 'absolute';
    this.gameMessageElement.style.top = '20px';
    this.gameMessageElement.style.left = '50%';
    this.gameMessageElement.style.transform = 'translateX(-50%)';
    this.gameMessageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    this.gameMessageElement.style.color = 'white';
    this.gameMessageElement.style.padding = '10px 20px';
    this.gameMessageElement.style.borderRadius = '5px';
    this.gameMessageElement.style.fontFamily = 'Arial, sans-serif';
    this.gameMessageElement.style.fontSize = '18px';
    this.gameMessageElement.style.fontWeight = 'bold';
    this.gameMessageElement.style.zIndex = '100';
    this.gameMessageElement.style.textAlign = 'center';
    this.gameMessageElement.style.transition = 'all 0.3s ease';
    this.gameMessageElement.style.opacity = '0';
    
    document.body.appendChild(this.gameMessageElement);
  }

  /**
   * Update team info display
   */
  private updateTeamInfo(): void {
    if (!this.teamInfo || !this.localPlayer) return;
    
    const teamId = this.localPlayer.getTeamId();
    const teamColor = teamId === 1 ? 'red' : 'blue';
    const teamName = teamId === 1 ? 'Red Team' : 'Blue Team';
    
    // Count players on each team
    let team1Count = 0;
    let team2Count = 0;
    
    this.players.forEach(player => {
      if (player.getTeamId() === 1) {
        team1Count++;
      } else {
        team2Count++;
      }
    });
    
    // Add local player to count
    if (this.localPlayer.getTeamId() === 1) {
      team1Count++;
    } else {
      team2Count++;
    }
    
    this.teamInfo.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <div style="width: 20px; height: 20px; background-color: ${teamColor}; margin-right: 10px; border-radius: 50%;"></div>
        <div>You are on <strong>${teamName}</strong></div>
      </div>
      <div>Team Members: ${this.localPlayer.getTeamId() === 1 ? team1Count : team2Count}</div>
      <div style="margin-top: 10px;">
        <div style="display: flex; justify-content: space-between;">
          <span>Red Team: ${team1Count}</span>
          <span>Blue Team: ${team2Count}</span>
        </div>
      </div>
    `;
    
    // Add flag status if someone has the flag
    if (this.flagCarrier) {
      const carrier = this.players.get(this.flagCarrier) || 
        (this.localPlayer.getId() === this.flagCarrier ? this.localPlayer : null);
      
      if (carrier) {
        const carrierTeam = carrier.getTeamId() === 1 ? 'Red Team' : 'Blue Team';
        const isLocalPlayer = carrier === this.localPlayer;
        
        this.teamInfo.innerHTML += `
          <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.3);">
            <strong style="color: gold;">Flag Status: </strong>
            <span>${isLocalPlayer ? 'You have' : carrierTeam + ' has'} the flag!</span>
          </div>
        `;
      }
    }
  }

  /**
   * Show game message
   * @param message The message to display
   * @param color Optional text color
   * @param duration How long to show the message in ms
   */
  private showGameMessage(message: string, color: string = 'white', duration: number = 3000): void {
    if (!this.gameMessageElement) return;
    
    this.gameMessageElement.textContent = message;
    this.gameMessageElement.style.color = color;
    this.gameMessageElement.style.opacity = '1';
    
    // Clear any existing timeout
    setTimeout(() => {
      if (this.gameMessageElement) {
        this.gameMessageElement.style.opacity = '0';
      }
    }, duration);
  }

  /**
   * Set up socket event handlers
   */
  private setupSocketEvents(): void {
    // Handle game state updates
    this.socket.on(SocketEvents.GAME_STATE, (gameState: GameState) => {
      console.log('Received game state:', gameState);
      
      // Update flag carrier from game state
      this.flagCarrier = gameState.flagCarrier || null;
      
      // Update game over state
      this.gameOver = gameState.gameOver || false;
      this.winningTeam = gameState.winningTeam || null;
      
      if (this.gameOver && this.winningTeam) {
        const winningTeamName = this.winningTeam === 1 ? 'Red Team' : 'Blue Team';
        const teamColor = this.winningTeam === 1 ? '#FF3333' : '#3333FF';
        this.showGameMessage(`${winningTeamName} Wins! The game will restart shortly...`, teamColor, 5000);
      }
      
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
      
      // Update team info after processing players
      this.updateTeamInfo();
    });
    
    // Handle player join events
    this.socket.on(SocketEvents.PLAYER_JOINED, (playerState: PlayerState) => {
      console.log('Player joined:', playerState);
      
      // Don't create a duplicate player if already exists
      if (playerState.id === this.socket.id || this.players.has(playerState.id)) {
        return;
      }
      
      // Create a new player
      this.createPlayer(playerState);
      
      // Update team info to reflect new player count
      this.updateTeamInfo();
    });
    
    // Handle player leave events
    this.socket.on(SocketEvents.PLAYER_LEFT, (playerId: string) => {
      console.log('Player left:', playerId);
      
      // Remove player from the scene
      if (this.players.has(playerId)) {
        const player = this.players.get(playerId);
        if (player) {
          this.scene.remove(player.mesh);
        }
        this.players.delete(playerId);
      }
      
      // Update team info to reflect new player count
      this.updateTeamInfo();
    });
    
    // Handle player movement updates from other players
    this.socket.on(SocketEvents.PLAYER_MOVED, (movement: PlayerMovement) => {
      // Only process if it's for another player (not local player)
      if (movement.playerId !== this.socket.id && this.players.has(movement.playerId)) {
        const player = this.players.get(movement.playerId);
        if (player) {
          player.updatePosition(movement.position);
          player.updateRotation(movement.rotation);
        }
      }
    });
    
    // Handle map data
    this.socket.on(SocketEvents.MAP_DATA, (mapData: MapData) => {
      console.log('Received map data', mapData);
      
      // Render the map
      this.mapRenderer.renderMap(mapData);
      
      // Update the walls list for collision detection
      this.updateWallsList();
      
      // Get and store reference to the flag object
      this.flagObject = this.mapRenderer.getFlag();
    });
    
    // Handle flag captured events
    this.socket.on(SocketEvents.FLAG_CAPTURED, (data: { playerId: string, teamId: number }) => {
      console.log('Flag captured:', data);
      
      // Update flag carrier status
      this.flagCarrier = data.playerId;
      
      // Show game message
      const isLocalPlayer = data.playerId === this.socket.id;
      const teamName = data.teamId === 1 ? 'Red Team' : 'Blue Team';
      const teamColor = data.teamId === 1 ? '#FF3333' : '#3333FF';
      
      if (isLocalPlayer) {
        this.showGameMessage('You captured the flag! Return to your base!', 'gold', 4000);
        
        // Update local player flag status directly
        if (this.localPlayer) {
          console.log('Setting local player hasFlag to true');
          this.localPlayer.setHasFlag(true);
        }
      } else {
        this.showGameMessage(`${teamName} captured the flag!`, teamColor, 3000);
        
        // Update other player flag status
        const player = this.players.get(data.playerId);
        if (player) {
          player.setHasFlag(true);
        }
      }
      
      // Remove flag from scene
      this.mapRenderer.removeFlag();
      this.flagObject = null;
      
      // Update team info to show flag carrier
      this.updateTeamInfo();
    });
    
    // Handle flag returned events (team scored)
    this.socket.on(SocketEvents.FLAG_RETURNED, (teamId: number) => {
      console.log('Flag returned by team:', teamId);
      
      // Show game message
      const teamName = teamId === 1 ? 'Red Team' : 'Blue Team';
      const teamColor = teamId === 1 ? '#FF3333' : '#3333FF';
      
      this.showGameMessage(`${teamName} returned the flag to their base!`, teamColor, 3000);
      
      // Clear flag carrier
      this.flagCarrier = null;
      
      // Update team info
      this.updateTeamInfo();
    });
    
    // Handle game over events
    this.socket.on(SocketEvents.GAME_OVER, (data: { winningTeam: number }) => {
      console.log('Game over, winning team:', data.winningTeam);
      
      this.gameOver = true;
      this.winningTeam = data.winningTeam;
      
      const winningTeamName = data.winningTeam === 1 ? 'Red Team' : 'Blue Team';
      const teamColor = data.winningTeam === 1 ? '#FF3333' : '#3333FF';
      
      this.showGameMessage(`${winningTeamName} Wins! The game will restart shortly...`, teamColor, 5000);
    });
    
    // Handle game restart events
    this.socket.on(SocketEvents.GAME_RESTART, () => {
      console.log('Game restarting with new map');
      
      // Reset game state
      this.gameOver = false;
      this.winningTeam = null;
      this.flagCarrier = null;
      this.flagObject = null;
      
      this.showGameMessage('New game starting!', 'white', 3000);
    });
    
    // Join the game when connected
    this.socket.on('connect', () => {
      console.log('Connected to server with ID:', this.socket.id);
      this.socket.emit(SocketEvents.JOIN);
    });
  }

  /**
   * Create a new player
   * @param playerState Initial player state
   * @returns The created player
   */
  private createPlayer(playerState: PlayerState): Player {
    const isLocalPlayer = playerState.id === this.socket.id;
    const player = new Player(playerState, isLocalPlayer);
    
    // Add player mesh to scene
    this.scene.add(player.mesh);
    
    // Add player to collection if not local player
    if (!isLocalPlayer) {
      this.players.set(playerState.id, player);
    }
    
    return player;
  }
  
  /**
   * Update the list of walls and obstacles for collision detection
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
    requestAnimationFrame(this.animate.bind(this));
    
    // Calculate delta time (in seconds)
    const deltaTime = (time - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = time;
    
    // Skip if delta time is invalid or too large (e.g., after tab switch)
    if (isNaN(deltaTime) || deltaTime > 0.1) {
      return;
    }
    
    // Update controls and get input state
    this.controls.update(deltaTime);
    const movement = this.controls.getMovement();
    
    // Update local player if exists
    if (this.localPlayer && !this.gameOver) {
      // Check for flag collision
      this.checkFlagCollision();
      
      // Check for exit/base collision
      this.checkExitCollision();
      
      // Update player position based on input
      const positionChanged = this.localPlayer.update(deltaTime, movement, this.walls);
      
      // If position changed significantly, send update to server
      if (positionChanged) {
        const position = this.localPlayer.getPosition();
        const rotation = this.localPlayer.getRotation();
        
        this.socket.emit(SocketEvents.PLAYER_MOVED, {
          playerId: this.socket.id,
          position,
          rotation
        });
      }
    }
    
    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }
  
  /**
   * Check if the local player is colliding with the flag
   */
  private checkFlagCollision(): void {
    if (!this.localPlayer || !this.flagObject || this.flagCarrier) {
      return; // No local player, no flag, or flag already captured
    }
    
    const playerPosition = this.localPlayer.getPosition();
    const flagPosition = this.flagObject.position;
    
    // Calculate distance between player and flag
    const dx = playerPosition.x - flagPosition.x;
    const dz = playerPosition.z - flagPosition.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    
    // If player is close enough to the flag (within 1.5 units)
    if (distance < 1.5) {
      console.log('Local player collided with flag');
      
      // Update local player flag status directly
      this.localPlayer.setHasFlag(true);
      
      // Emit flag captured event
      this.socket.emit(SocketEvents.FLAG_CAPTURED, {
        playerId: this.socket.id,
        teamId: this.localPlayer.getTeamId()
      });
    }
  }
  
  /**
   * Check if the local player with the flag is colliding with their team exit
   */
  private checkExitCollision(): void {
    if (!this.localPlayer) {
      console.log('No local player to check exit collision');
      return; // No local player
    }

    console.log('Checking exit collision, hasFlag:', this.localPlayer.isCarryingFlag());
    
    if (!this.localPlayer.isCarryingFlag()) {
      return; // Player doesn't have the flag
    }
    
    const playerPosition = this.localPlayer.getPosition();
    const playerTeamId = this.localPlayer.getTeamId();
    
    console.log('Player position:', playerPosition, 'Team ID:', playerTeamId);
    
    // Find team exit in the scene
    let teamExit: THREE.Object3D | undefined;
    let exitCount = 0;
    this.scene.traverse((object) => {
      if (
        object.userData && 
        object.userData.type === EntityType.EXIT
      ) {
        exitCount++;
        console.log('Found exit with teamId:', object.userData.teamId, 'at position:', object.position);
        
        if (object.userData.teamId === playerTeamId) {
          teamExit = object;
        }
      }
    });
    
    console.log('Total exits found:', exitCount);
    
    if (!teamExit) {
      console.log('No team exit found for team', playerTeamId);
      return;
    }
    
    const exitPosition = teamExit.position;
    console.log('Exit position:', exitPosition);
    
    // Calculate distance between player and exit
    const dx = playerPosition.x - exitPosition.x;
    const dz = playerPosition.z - exitPosition.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    
    console.log('Distance to team exit:', distance);
    
    // If player is close enough to their team exit (within 2 units)
    if (distance < 2) {
      console.log('Local player returned flag to base!');
      
      // Emit flag returned event (team scored)
      this.socket.emit(SocketEvents.FLAG_RETURNED, playerTeamId);
    }
  }
  
  /**
   * Add lighting to the scene
   */
  private addLighting(): void {
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    this.scene.add(ambientLight);
    
    // Add directional light (like sunlight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 200, 100);
    directionalLight.castShadow = true;
    
    // Configure shadow properties
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    
    this.scene.add(directionalLight);
  }
} 