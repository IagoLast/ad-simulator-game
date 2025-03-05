import * as THREE from 'three';
import { io, Socket } from 'socket.io-client';
import { EntityType, GameState, MapData, PlayerMovement, PlayerState, SocketEvents, ShootEvent, WeaponType, HitEvent, WeaponConfig } from '../../shared/types';
import { Controls } from './Controls';
import { Player } from './Player';
import { MapRenderer } from './core/MapRenderer';
import { Sound } from './core/Sound';

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
  private sound: Sound;

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
    
    // Listen for flag drop events
    document.addEventListener('flag_dropped', (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (this.socket) {
        console.log('Sending flag dropped event to server:', detail);
        this.socket.emit(SocketEvents.FLAG_DROPPED, {
          playerId: detail.playerId,
          position: detail.position
        });
      }
    });
    
    this.sound = Sound.getInstance();
    
    // Add event listener for toggling sound with 'M' key
    window.addEventListener('keydown', (event) => {
      if (event.key.toLowerCase() === 'm') {
        const soundEnabled = this.sound.toggleSound();
        this.showGameMessage(`Sound ${soundEnabled ? 'enabled' : 'disabled'}`, soundEnabled ? '#00ff00' : '#ff0000', 1500);
      }
    });
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
    
    // Play win/lose sound when game ends
    if (message.includes('win') || message.includes('Win')) {
      const isWin = message.includes('You win') || message.includes('Your team wins');
      this.sound.playGameOverSound(isWin);
    }
  }

  /**
   * Set up socket event handlers
   */
  private setupSocketEvents(): void {
    // Handle game state updates
    this.socket.on(SocketEvents.GAME_STATE, (gameState: GameState) => {
      console.log('Received game state:', gameState);
      
      // Store the previous flag carrier to detect changes
      const previousFlagCarrier = this.flagCarrier;
      
      // Update flag carrier from game state
      this.flagCarrier = gameState.flagCarrier || null;
      console.log(`[FLAG DEBUG] Current client ID: ${this.socket.id}, flag carrier: ${this.flagCarrier}`);
      
      // Debug log for all players to check hasFlag status
      gameState.players.forEach(player => {
        console.log(`[FLAG DEBUG] Player ${player.id} hasFlag: ${player.hasFlag}`);
      });
      
      // If flag carrier has changed, update player visuals
      if (previousFlagCarrier !== this.flagCarrier) {
        console.log(`[FLAG DEBUG] Flag carrier changed from ${previousFlagCarrier} to ${this.flagCarrier}`);
        
        // Remove flag from previous carrier if they still exist
        if (previousFlagCarrier && this.players.has(previousFlagCarrier)) {
          const prevPlayer = this.players.get(previousFlagCarrier);
          if (prevPlayer) {
            console.log(`[FLAG DEBUG] Removing flag from previous carrier ${previousFlagCarrier}`);
            prevPlayer.setHasFlag(false);
          }
        } else if (previousFlagCarrier && this.localPlayer && previousFlagCarrier === this.socket.id) {
          console.log(`[FLAG DEBUG] Removing flag from local player ${this.socket.id}`);
          this.localPlayer.setHasFlag(false);
        }
        
        // Add flag to new carrier
        if (this.flagCarrier) {
          if (this.flagCarrier === this.socket.id && this.localPlayer) {
            console.log(`[FLAG DEBUG] Adding flag to local player ${this.socket.id}`);
            this.localPlayer.setHasFlag(true);
          } else if (this.players.has(this.flagCarrier)) {
            const newCarrier = this.players.get(this.flagCarrier);
            if (newCarrier) {
              console.log(`[FLAG DEBUG] Adding flag to remote player ${this.flagCarrier}`);
              newCarrier.setHasFlag(true);
            }
          }
        }
      }
      
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
      
      // Play player join sound
      this.sound.play('player_join');
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
      
      // Play player leave sound
      this.sound.play('player_leave');
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
      console.log('[FLAG DEBUG] Flag captured:', data);
      
      // Update flag carrier status
      this.flagCarrier = data.playerId;
      
      // Show game message
      const isLocalPlayer = data.playerId === this.socket.id;
      const teamName = data.teamId === 1 ? 'Red Team' : 'Blue Team';
      const teamColor = data.teamId === 1 ? '#FF3333' : '#3333FF';
      
      // First, clear any flag from ALL players to prevent duplication
      if (this.localPlayer) {
        this.localPlayer.setHasFlag(false);
      }
      
      for (const [_d, player] of this.players.entries()) {
        player.setHasFlag(false);
      }
      
      // Then set the flag on the correct player
      if (isLocalPlayer) {
        this.showGameMessage('You captured the flag! Return to your base!', 'gold', 4000);
        
        // Update local player flag status
        if (this.localPlayer) {
          console.log('[FLAG DEBUG] Setting local player hasFlag to true');
          this.localPlayer.setHasFlag(true);
        }
      } else {
        this.showGameMessage(`${teamName} captured the flag!`, teamColor, 3000);
        
        // Update other player flag status
        const player = this.players.get(data.playerId);
        if (player) {
          console.log('[FLAG DEBUG] Setting remote player hasFlag to true for player', data.playerId);
          player.setHasFlag(true);
        } else {
          console.log('[FLAG DEBUG] ERROR: Could not find remote player with ID', data.playerId);
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
    
    // Handle projectile creation from other players
    this.socket.on(SocketEvents.PROJECTILE_CREATED, (data: {
      id: string,
      shooterId: string,
      teamId: number,
      position: { x: number, y: number, z: number },
      direction: { x: number, y: number, z: number },
      speed: number,
      gravity: number,
      weaponType: WeaponType
    }) => {
      // Skip if this is our own projectile (we already created it locally)
      if (data.shooterId === this.socket.id) return;
      
      console.log('Remote projectile created:', data);
      
      // Create visual representation of the projectile
      const position = new THREE.Vector3(data.position.x, data.position.y, data.position.z);
      const direction = new THREE.Vector3(data.direction.x, data.direction.y, data.direction.z);
      
      // Pass server-defined physics parameters
      this.createProjectileVisual(position, direction, data.teamId, data.speed, data.gravity);
    });
    
    // Handle player hit events
    this.socket.on(SocketEvents.PLAYER_HIT, (data: HitEvent) => {
      console.log('Player hit:', data);
      
      // If local player was hit, apply damage
      if (data.targetId === this.socket.id && this.localPlayer) {
        this.localPlayer.takeDamage(data.damage);
      } 
      // If another player was hit, show hit effect
      else if (this.players.has(data.targetId)) {
        const hitPlayer = this.players.get(data.targetId);
        if (hitPlayer) {
          hitPlayer.takeDamage(data.damage);
        }
      }
    });
    
    // Handle player death events
    this.socket.on(SocketEvents.PLAYER_DIED, (data: { playerId: string, killerId: string }) => {
      console.log('[FLAG DEBUG] Player died:', data);
      
      // Check if the dead player was carrying the flag
      const wasCarryingFlag = this.flagCarrier === data.playerId;
      
      // If it's the local player
      if (data.playerId === this.socket.id && this.localPlayer) {
        // Clear flag status if they were the flag carrier
        if (wasCarryingFlag) {
          console.log('[FLAG DEBUG] Local player died while carrying flag, clearing status');
          this.localPlayer.setHasFlag(false);
        }
        
        // Show death message
        this.showGameMessage('You were eliminated! Respawning in 5 seconds...', '#FF0000', 5000);
      } else {
        // Update other player's state
        const player = this.players.get(data.playerId);
        if (player) {
          // Clear flag status if they were the flag carrier
          if (wasCarryingFlag) {
            console.log('[FLAG DEBUG] Remote player died while carrying flag, clearing status');
            player.setHasFlag(false);
          }
          
          player.takeDamage(999); // Force death state
        }
      }
      
      // If the dead player was the flag carrier, update the UI
      if (wasCarryingFlag) {
        this.flagCarrier = null;
        this.updateTeamInfo();
      }
    });
    
    // Handle player respawn events
    this.socket.on(SocketEvents.PLAYER_RESPAWNED, (data: { playerId: string, position: { x: number, y: number, z: number } }) => {
      console.log('Player respawned:', data);
      
      // If it's the local player
      if (data.playerId === this.socket.id && this.localPlayer) {
        console.log('Local player respawned');
        this.localPlayer.respawn(data.position);
        this.showGameMessage('You have respawned!', '#00FF00', 3000);
      }
      // If it's another player
      else if (data.playerId !== this.socket.id) {
        const player = this.players.get(data.playerId);
        if (player) {
          player.respawn(data.position);
        }
      }
    });
    
    // Handle flag dropped events
    this.socket.on(SocketEvents.FLAG_DROPPED, (data: { 
      position: { x: number, y: number, z: number },
      playerId: string
    }) => {
      console.log('[FLAG DEBUG] Flag dropped:', data);
      
      // If the flag carrier was the local player, remove flag
      if (data.playerId === this.socket.id && this.localPlayer) {
        this.localPlayer.setHasFlag(false);
      }
      
      // If the flag carrier was another player, remove flag
      const player = this.players.get(data.playerId);
      if (player) {
        player.setHasFlag(false);
      }
      
      // Clear flag carrier status
      this.flagCarrier = null;
      
      // Update team info to reflect flag status
      this.updateTeamInfo();
      
      // Show message
      this.showGameMessage('Flag has been dropped!', 'yellow', 3000);
      
      // Wait for the flag to be added to the map by the server
      setTimeout(() => {
        // Request updated map data to ensure flag is visible
        this.socket.emit('request_map_data');
      }, 500);
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
    console.log(`[FLAG DEBUG] Creating player ${playerState.id}, hasFlag: ${playerState.hasFlag}, isLocalPlayer: ${isLocalPlayer}`);
    
    const player = new Player(playerState, isLocalPlayer);
    
    // Ensure flag status is correctly set
    if (playerState.hasFlag) {
      console.log(`[FLAG DEBUG] New player ${playerState.id} has flag status true`);
    }
    
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
    // Request next frame
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
    
    // Update local player if exists
    if (this.localPlayer && !this.gameOver) {
      // Ensure flag visibility is correct
      if (this.flagCarrier) {
        // Check if the flag carrier has the flag visible
        if (this.flagCarrier === this.socket.id && this.localPlayer) {
          if (!this.localPlayer.isCarryingFlag()) {
            console.log(`[FLAG DEBUG] Local player should have flag but doesn't - fixing`);
            this.localPlayer.setHasFlag(true);
          }
        } else if (this.players.has(this.flagCarrier)) {
          const carrier = this.players.get(this.flagCarrier);
          if (carrier && !carrier.isCarryingFlag()) {
            console.log(`[FLAG DEBUG] Remote player ${this.flagCarrier} should have flag but doesn't - fixing`);
            carrier.setHasFlag(true);
          }
        }
      } else {
        // Make sure no player has a flag when there's no carrier
        for (const [id, player] of this.players.entries()) {
          if (player.isCarryingFlag()) {
            console.log(`[FLAG DEBUG] Player ${id} shouldn't have flag but does - fixing`);
            player.setHasFlag(false);
          }
        }
        
        if (this.localPlayer.isCarryingFlag()) {
          console.log(`[FLAG DEBUG] Local player shouldn't have flag but does - fixing`);
          this.localPlayer.setHasFlag(false);
        }
      }
      
      // Check for flag collision
      this.checkFlagCollision();
      
      // Check for exit/base collision
      this.checkExitCollision();
      
      // Handle shooting
      if (this.controls.isShooting() && !this.localPlayer.isDying()) {
        this.handlePlayerShoot();
      }
      
      // Update player position based on input
      const positionChanged = this.localPlayer.update(deltaTime, this.controls.getMovement(), this.walls);
      
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
    
    // Check if player is moving to play footstep sounds
    if (this.localPlayer && !this.gameOver) {
      const movement = this.controls.getMovement();
      const isMoving = movement.forward || movement.backward || movement.left || movement.right;
      this.sound.playFootsteps(isMoving);
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
      
      // When flag is picked up
      this.sound.playFlagSound('pickup');
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
   * Handle player shooting
   */
  private handlePlayerShoot(): void {
    // Check if socket is connected and has an ID and local player exists
    if (!this.socket || !this.socket.id || !this.localPlayer) return;
    
    // Try to shoot
    const shotData = this.localPlayer.shoot();
    if (!shotData) return; // Can't shoot yet
    
    // Get weapon configuration
    const weaponType = WeaponType.PAINTBALL_GUN;
    const weaponSettings = WeaponConfig[weaponType];
    
    // Create shoot event data
    const shootEvent: ShootEvent = {
      playerId: this.socket.id,
      position: {
        x: shotData.position.x,
        y: shotData.position.y,
        z: shotData.position.z
      },
      direction: {
        x: shotData.direction.x,
        y: shotData.direction.y,
        z: shotData.direction.z
      },
      weaponType: weaponType
    };
    
    // Send shoot event to server
    this.socket.emit(SocketEvents.PLAYER_SHOOT, shootEvent);
    
    // Create visual projectile (optional - server will create the actual projectile)
    this.createProjectileVisual(
      new THREE.Vector3(shotData.position.x, shotData.position.y, shotData.position.z),
      new THREE.Vector3(shotData.direction.x, shotData.direction.y, shotData.direction.z),
      this.localPlayer.getTeamId(),
      weaponSettings.speed,
      weaponSettings.gravity
    );
    
    // Add sound effect for shooting
    if (this.localPlayer) {
      this.sound.play('shoot');
    }
  }
  
  /**
   * Create a visual projectile without physics (for effects only)
   * @param position - Initial position of projectile
   * @param direction - Direction vector the projectile is moving
   * @param teamId - Team ID (determines color)
   * @param speed - Optional speed override (if not provided, uses default)
   * @param gravity - Optional gravity override (if not provided, uses default)
   */
  private createProjectileVisual(
    position: THREE.Vector3, 
    direction: THREE.Vector3, 
    teamId: number,
    speed?: number,
    gravity?: number
  ): void {
    // Get color based on team
    const color = teamId === 1 ? 0xFF3333 : 0x3333FF;
    
    // Create paintball
    const projectile = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 8, 8),
      new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5
      })
    );
    
    // Set position
    projectile.position.copy(position);
    
    // Add to scene
    this.scene.add(projectile);
    
    // Get default weapon settings for fallback
    const defaultSettings = WeaponConfig[WeaponType.PAINTBALL_GUN];
    
    // Animate projectile
    const projectileSpeed = speed || defaultSettings.speed; // Use provided speed or default
    const maxDistance = defaultSettings.maxDistance; // Max travel distance
    const startPosition = position.clone();
    const projectileGravity = gravity !== undefined ? gravity : defaultSettings.gravity; // Use provided gravity or default
    
    // Use a normalized direction vector
    const normalizedDirection = direction.clone().normalize();
    
    // Initial velocity
    const velocity = normalizedDirection.clone().multiplyScalar(projectileSpeed);
    
    // Time tracking for physics
    let elapsedTime = 0;
    const timeStep = 0.016; // ~60fps
    
    // Store previous position for more accurate collision detection
    let previousPosition = position.clone();
    
    // Animation function for projectile
    const animateProjectile = () => {
      // Update elapsed time
      elapsedTime += timeStep;
      
      // Store previous position for collision detection
      previousPosition.copy(projectile.position);
      
      // Apply gravity to velocity
      velocity.y -= projectileGravity * timeStep;
      
      // Calculate new position
      const newPosition = projectile.position.clone().add(velocity.clone().multiplyScalar(timeStep));
      
      // Create a movement vector for raycasting
      const movementVector = newPosition.clone().sub(previousPosition).normalize();
      const movementDistance = previousPosition.distanceTo(newPosition);
      
      // Check for collisions with walls and other objects
      // Use a raycaster that goes from previous position to new position
      const raycaster = new THREE.Raycaster();
      raycaster.set(previousPosition, movementVector);
      raycaster.far = movementDistance + 0.2; // Add a small buffer for detection
      
      // Check collisions with walls and any other collidable objects
      // We'll combine walls with any billboard objects if they exist
      const collidableObjects = [...this.walls];
      
      // Add collision check for ground
      const groundRaycaster = new THREE.Raycaster();
      groundRaycaster.set(
        projectile.position.clone(), 
        new THREE.Vector3(0, -1, 0) // Straight down
      );
      const groundDistance = projectile.position.y; // Distance to ground
      
      // Perform the collision check
      const intersects = raycaster.intersectObjects(collidableObjects);
      const groundIntersects = groundDistance < 0.2; // Close to ground
      
      // Check if we hit something
      if (intersects.length > 0 && intersects[0].distance < movementDistance + 0.2) {
        // We hit a wall or object
        // Get the intersection point and surface normal
        const hitPoint = intersects[0].point;
        const hitNormal = intersects[0].face ? intersects[0].face.normal.clone() : movementVector.clone().negate();
        
        // Create impact effect at hit location
        this.createImpactEffect(hitPoint, hitNormal, color);
        
        // Play impact sound
        this.sound.playImpactSound(
          { x: hitPoint.x, y: hitPoint.y, z: hitPoint.z },
          { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z }
        );
        
        // Remove projectile
        this.scene.remove(projectile);
        return;
      }
      
      // Check for ground collision
      if (groundIntersects || newPosition.y <= 0.1) {
        // We hit the ground
        const groundHitPoint = new THREE.Vector3(
          newPosition.x,
          0.01, // Slightly above ground to prevent z-fighting
          newPosition.z
        );
        
        // Create impact effect on ground
        this.createImpactEffect(
          groundHitPoint, 
          new THREE.Vector3(0, 1, 0), // Ground normal points up
          color
        );
        
        // Play impact sound
        this.sound.playImpactSound(
          { x: groundHitPoint.x, y: groundHitPoint.y, z: groundHitPoint.z },
          { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z }
        );
        
        // Remove projectile
        this.scene.remove(projectile);
        return;
      }
      
      // If no collision detected, update the position
      projectile.position.copy(newPosition);
      
      // Check if projectile has traveled too far
      const distanceTraveled = projectile.position.distanceTo(startPosition);
      if (distanceTraveled > maxDistance) {
        // Remove projectile
        this.scene.remove(projectile);
        return;
      }
      
      // Continue animation
      requestAnimationFrame(animateProjectile);
    };
    
    // Start animation
    animateProjectile();
  }
  
  /**
   * Create impact effect when projectile hits something
   */
  private createImpactEffect(position: THREE.Vector3, direction: THREE.Vector3, color: number): void {
    // Create explosion effect
    this.createExplosionEffect(position, color);
    
    // Create paint stain on the surface
    this.createPaintStain(position, direction, color);
  }
  
  /**
   * Create an explosion visual effect when a projectile impacts
   * @param position - Position of the explosion
   * @param color - Color of the explosion (based on team color)
   */
  private createExplosionEffect(position: THREE.Vector3, color: number): void {
    // Create explosion particle group
    const explosion = new THREE.Group();
    
    // Number of particles in the explosion
    const particleCount = 15;
    
    // Create multiple particles for explosion effect
    for (let i = 0; i < particleCount; i++) {
      // Create particle with random size
      const particleSize = 0.02 + Math.random() * 0.08;
      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(particleSize, 6, 6),
        new THREE.MeshStandardMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.7,
          transparent: true,
          opacity: 0.9
        })
      );
      
      // Set initial position at impact point
      particle.position.copy(position);
      
      // Add particle to explosion group
      explosion.add(particle);
      
      // Calculate random velocity for each particle
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 4,  // Random X direction
        Math.random() * 3,          // Mostly upward
        (Math.random() - 0.5) * 4   // Random Z direction
      );
      
      // Animate each particle
      const animateParticle = () => {
        // Move particle according to velocity
        particle.position.add(velocity.clone().multiplyScalar(0.016)); // 60fps approx
        
        // Apply gravity
        velocity.y -= 0.1;
        
        // Shrink particle over time (fade effect)
        particle.scale.multiplyScalar(0.95);
        
        // Reduce opacity
        const material = particle.material as THREE.MeshStandardMaterial;
        material.opacity *= 0.97;
        
        // Continue animation until particle is very small or transparent
        if (particle.scale.x > 0.1 && material.opacity > 0.1) {
          requestAnimationFrame(animateParticle);
        } else {
          // Remove this particle from the explosion group
          explosion.remove(particle);
          
          // If all particles are removed, remove the explosion group
          if (explosion.children.length === 0) {
            this.scene.remove(explosion);
          }
        }
      };
      
      // Start particle animation
      animateParticle();
    }
    
    // Add explosion to scene
    this.scene.add(explosion);
  }
  
  /**
   * Create a paint stain effect on surfaces
   * @param position - Impact position
   * @param direction - Impact direction (normal to the surface)
   * @param color - Color of the paint stain
   */
  private createPaintStain(position: THREE.Vector3, direction: THREE.Vector3, color: number): void {
    // Create a flat paint splatter facing the surface
    const paintGroup = new THREE.Group();
    
    // Get the normal vector of the surface (opposite of impact direction)
    const normal = direction.clone().negate().normalize();
    
    // Create main paint splat
    const mainSplat = new THREE.Mesh(
      new THREE.CircleGeometry(0.2, 16),
      new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide // Visible from both sides
      })
    );
    
    // Position slightly off the surface to prevent z-fighting
    mainSplat.position.copy(position).addScaledVector(normal, 0.01);
    
    // Orient the splat to face the surface (align with normal)
    mainSplat.lookAt(mainSplat.position.clone().add(normal));
    
    // Add to paint group
    paintGroup.add(mainSplat);
    
    // Add smaller drips and splatters around the main splat
    for (let i = 0; i < 6; i++) {
      // Create random direction in hemisphere facing away from wall
      const randomOffset = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      );
      
      // Ensure the direction tends away from the wall
      randomOffset.add(normal.clone().multiplyScalar(0.5)).normalize();
      
      // Random size for drip/splatter
      const dripSize = 0.03 + Math.random() * 0.1;
      
      // Create drip mesh
      const drip = new THREE.Mesh(
        new THREE.CircleGeometry(dripSize, 8),
        new THREE.MeshStandardMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide
        })
      );
      
      // Position drip near main splat
      const dripDistance = 0.1 + Math.random() * 0.3;
      drip.position.copy(position)
          .add(new THREE.Vector3(
            (Math.random() - 0.5) * dripDistance,
            (Math.random() - 0.5) * dripDistance,
            (Math.random() - 0.5) * dripDistance
          ))
          .addScaledVector(normal, 0.01); // Slight offset from surface
      
      // Orient to face the surface
      drip.lookAt(drip.position.clone().add(normal));
      
      // Add to paint group
      paintGroup.add(drip);
    }
    
    // Add paint stain to scene
    this.scene.add(paintGroup);
    
    // Keep stain for a longer duration (but not permanently to avoid memory buildup)
    // In a full implementation, you might want to limit the number of stains,
    // and remove the oldest when a new one is created after reaching a max count
    setTimeout(() => {
      // Fade out the paint stain gradually
      const fadeInterval = setInterval(() => {
        let allRemoved = true;
        
        // Reduce opacity of all paint elements
        paintGroup.children.forEach(child => {
          const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          material.opacity *= 0.95;
          
          // Keep track if any are still visible
          if (material.opacity > 0.1) {
            allRemoved = false;
          }
        });
        
        // If all elements have faded out, remove the paint group
        if (allRemoved) {
          clearInterval(fadeInterval);
          this.scene.remove(paintGroup);
        }
      }, 100);
    }, 20000); // Keep stain visible for 20 seconds before starting fade
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