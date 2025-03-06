import * as THREE from "three";
import { io, Socket } from "socket.io-client";
import {
  EntityType,
  GameState,
  MapData,
  PlayerMovement,
  PlayerState,
  SocketEvents,
  ShootEvent,
  WeaponType,
  HitEvent,
  WeaponConfig,
} from "../../shared/types";
import { Player } from "./Player";
import { MapRenderer } from "./core/MapRenderer";
import { Sound } from "./core/Sound";
import { UI } from "./UI";
import controlsFactory from "./controls/controls.factory";
import { MovementInput } from "./controls/ControlsDesktop";

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
  private controls: any; // Will be either ControlsDesktop or ControlsMobile
  private lastUpdateTime: number;
  private mapRenderer: MapRenderer;
  private walls: THREE.Object3D[] = [];
  private gameOver: boolean = false;
  private winningTeam: number | null = null;
  private sound: Sound;
  private ui: UI;

  /**
   * Create a new game instance
   */
  constructor(namespace: string) {
    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // Sky blue background

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

    // Check if we're on a mobile device
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // Initialize UI
    this.ui = new UI(isMobileDevice);

    // Initialize map renderer
    this.mapRenderer = new MapRenderer(this.scene);

    // Initialize socket connection with proper Socket.IO configuration for Docker
    this.socket = io(namespace, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    // Initialize players collection
    this.players = new Map();
    this.localPlayer = null;

    // Initialize controls
    this.controls = controlsFactory.createControls(this.renderer.domElement);

    // Initialize sound
    this.sound = new Sound();

    // Handle window resize
    window.addEventListener("resize", this.onWindowResize.bind(this));

    // Set up event handlers for socket events
    this.setupSocketEvents();

    // Add lighting to the scene
    this.addLighting();

    // Store last update time
    this.lastUpdateTime = 0;

    // Start animation loop
    this.animate();

    // Add event listener for toggling sound with 'M' key
    window.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "m") {
        const soundEnabled = this.sound.toggleSound();
        this.showGameMessage(
          `Sound ${soundEnabled ? "enabled" : "disabled"}`,
          soundEnabled ? "#00ff00" : "#ff0000",
          1500
        );
      }
    });
  }

  /**
   * Set up socket event handlers
   */
  private setupSocketEvents(): void {
    // Handle game state updates
    this.socket.on(SocketEvents.GAME_STATE, (gameState: GameState) => {
      console.info("GAME STATE RECEIVED");

      // Update game over state
      this.gameOver = gameState.gameOver || false;
      this.winningTeam = gameState.winningTeam || null;
      const flagCarrier = gameState.players.find((p) => p.hasFlag) || null;

      // Update UI with the latest game state
      if (this.localPlayer) {
        this.ui.updateTeamInfo(
          gameState,
          this.localPlayer.getId(),
          flagCarrier?.id || null
        );
      }

      if (this.gameOver && this.winningTeam) {
        const winningTeamName =
          this.winningTeam === 1 ? "Red Team" : "Blue Team";
        const teamColor = this.winningTeam === 1 ? "#FF3333" : "#3333FF";
        this.showGameMessage(
          `${winningTeamName} Wins! The game will restart shortly...`,
          teamColor,
          5000
        );
      }

      // Process players from game state
      gameState.players.forEach((playerState) => {
        // Check if this is the local player
        const isLocalPlayer = playerState.id === this.socket.id;

        if (isLocalPlayer) {
          if (!this.localPlayer) {
            // Create new local player if it doesn't exist
            this.localPlayer = this.createPlayer(playerState);

            // Attach camera to local player
            this.localPlayer.attachCamera(this.camera);
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
    });

    // Handle player join events
    this.socket.on(SocketEvents.PLAYER_JOINED, (playerState: PlayerState) => {
      console.info("PLAYER JOINED RECEIVED");

      // Don't create a duplicate player if already exists
      if (
        playerState.id === this.socket.id ||
        this.players.has(playerState.id)
      ) {
        return;
      }

      // Create a new player
      this.createPlayer(playerState);

      // Play player join sound
      this.sound.play("player_join");
    });

    // Handle player leave events
    this.socket.on(SocketEvents.PLAYER_LEFT, (playerId: string) => {
      console.info("PLAYER_LEFT RECEIVED");
      // Remove player from the scene
      if (this.players.has(playerId)) {
        const player = this.players.get(playerId);
        if (player) {
          this.scene.remove(player.mesh);
        }
        this.players.delete(playerId);
      }

      // Play player leave sound
      this.sound.play("player_leave");
    });

    // Handle player movement updates from other players
    this.socket.on(SocketEvents.PLAYER_MOVED, (movement: PlayerMovement) => {
      console.info("PLAYER_MOVED RECEIVED");
      // Only process if it's for another player (not local player)
      if (
        movement.playerId !== this.socket.id &&
        this.players.has(movement.playerId)
      ) {
        const player = this.players.get(movement.playerId);
        if (player) {
          player.updatePosition(movement.position);
          player.updateRotation(movement.rotation);
        }
      }
    });

    // Handle map data
    this.socket.on(SocketEvents.MAP_DATA, (mapData: MapData) => {
      console.info("MAP_DATA RECEIVED");

      // Render the map
      this.mapRenderer.renderMap(mapData);

      // Update the walls list for collision detection
      this.updateWallsList();
    });

    // Handle flag captured events
    this.socket.on(
      SocketEvents.FLAG_CAPTURED,
      (data: { playerId: string; teamId: number }) => {
        this.sound.playFlagSound("capture");
        console.info("FLAG_CAPTURED RECEIVED");
        // Update flag carrier status

        // Show game message
        const hasLocalPlayerCapturedTheFlag = data.playerId === this.socket.id;
        const teamName = data.teamId === 1 ? "Red Team" : "Blue Team";
        const teamColor = data.teamId === 1 ? "#FF3333" : "#3333FF";

        for (const [_d, player] of this.players.entries()) {
          player.setHasFlag(false);
        }

        // Then set the flag on the correct player
        if (hasLocalPlayerCapturedTheFlag) {
          this.showGameMessage(
            "You captured the flag! Return to your base!",
            "gold",
            4000
          );

          // Update local player flag status
          if (this.localPlayer) {
            this.localPlayer.setHasFlag(true);
          }
        } else {
          this.showGameMessage(
            `${teamName} captured the flag!`,
            teamColor,
            3000
          );
        }

        // Remove flag from scene
        this.mapRenderer.removeFlag();
      }
    );

    // Handle flag returned events (team scored)
    this.socket.on(SocketEvents.FLAG_RETURNED, (teamId: number) => {
      console.info("FLAG_RETURNED RECEIVED");
      this.sound.playFlagSound("return");
      // Show game message
      const teamName = teamId === 1 ? "Red Team" : "Blue Team";
      const teamColor = teamId === 1 ? "#FF3333" : "#3333FF";

      this.showGameMessage(
        `${teamName} returned the flag to their base!`,
        teamColor,
        3000
      );
    });

    // Handle game over events
    this.socket.on(SocketEvents.GAME_OVER, (data: { winningTeam: number }) => {
      console.info("GAME_OVER RECEIVED");
      this.gameOver = true;
      this.winningTeam = data.winningTeam;

      const winningTeamName = data.winningTeam === 1 ? "Red Team" : "Blue Team";
      const teamColor = data.winningTeam === 1 ? "#FF3333" : "#3333FF";

      this.showGameMessage(
        `${winningTeamName} Wins! The game will restart shortly...`,
        teamColor,
        5000
      );
    });

    // Handle game restart events
    this.socket.on(SocketEvents.GAME_RESTART, () => {
      console.info("GAME_RESTART RECEIVED");
      // Reset game state
      this.gameOver = false;
      this.winningTeam = null;

      this.showGameMessage("New game starting!", "white", 3000);
    });

    // Handle projectile creation from other players
    this.socket.on(
      SocketEvents.PROJECTILE_CREATED,
      (data: {
        id: string;
        shooterId: string;
        teamId: number;
        position: { x: number; y: number; z: number };
        direction: { x: number; y: number; z: number };
        speed: number;
        gravity: number;
        weaponType: WeaponType;
      }) => {
        console.info("PROJECTILE_CREATED RECEIVED");

        // Skip if this is our own projectile (we already created it locally)
        if (data.shooterId === this.socket.id) return;

        // Create visual representation of the projectile
        const position = new THREE.Vector3(
          data.position.x,
          data.position.y,
          data.position.z
        );
        const direction = new THREE.Vector3(
          data.direction.x,
          data.direction.y,
          data.direction.z
        );

        // Pass server-defined physics parameters
        this.createProjectileVisual(
          position,
          direction,
          data.teamId,
          data.speed,
          data.gravity
        );
      }
    );

    // Handle player hit events
    this.socket.on(SocketEvents.PLAYER_HIT, (data: HitEvent) => {
      console.info("PLAYER_HIT RECEIVED");
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
    this.socket.on(
      SocketEvents.PLAYER_DIED,
      (data: { playerId: string; killerId: string }) => {
        console.info("PLAYER_DIED RECEIVED");

        const player = this.players.get(data.playerId);

        if (!player) {
          console.error("PLAYER_DIED RECEIVED FOR NON-EXISTING PLAYER");
          return;
        }

        if (data.playerId === this.socket.id) {
          // Show death message
          this.showGameMessage(
            "You were eliminated! Respawning in 5 seconds...",
            "#FF0000",
            5000
          );
        }

        player.die();
      }
    );

    // Handle player respawn events
    this.socket.on(
      SocketEvents.PLAYER_RESPAWNED,
      (data: {
        playerId: string;
        position: { x: number; y: number; z: number };
      }) => {
        console.info("PLAYER_RESPAWNED RECEIVED");
        const player = this.players.get(data.playerId);

        if (!player) {
          console.error("PLAYER_RESPAWNED RECEIVED FOR NON-EXISTING PLAYER");
          return;
        }

        // If it's the local player
        if (data.playerId === this.socket.id) {
          this.showGameMessage("You have respawned!", "#00FF00", 3000);
        }

        player.respawn(data.position);
      }
    );

    // Handle flag dropped events
    this.socket.on(
      SocketEvents.FLAG_DROPPED,
      (data: {
        position: { x: number; y: number; z: number };
        playerId: string;
      }) => {
        console.info("FLAG_DROPPED RECEIVED");
        // TODO: ADD SOUND HERE

        const player = this.players.get(data.playerId);

        if (!player) {
          console.error("FLAG_DROPPED RECEIVED FOR NON-EXISTING PLAYER");
          return;
        }

        player.setHasFlag(false);

        /**
         * When a player takes the flag we remove it from the scene so
         * when is dropped we need to add it back to the scene in the last position.
         */
        this.mapRenderer.addFlag({
          type: EntityType.FLAG,
          position: data.position,
        });

        // Show message
        this.showGameMessage("Flag has been dropped!", "yellow", 3000);
      }
    );

    // Join the game when connected
    this.socket.on("connect", () => {
      console.warn("CONNECTED TO SERVER");
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
        (object.userData.type === EntityType.WALL ||
          object.userData.type === EntityType.BILLBOARD ||
          object.userData.type === EntityType.CUBE)
      ) {
        this.walls.push(object);
      }
    });

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
      // Handle shooting
      if (this.controls.isShooting() && !this.localPlayer.isDying()) {
        this.handlePlayerShoot();
      }

      // Update player position based on input
      const positionChanged = this.localPlayer.update(
        deltaTime,
        this.controls.getMovement(),
        this.walls
      );

      // If position changed significantly, send update to server
      if (positionChanged) {
        const position = this.localPlayer.getPosition();
        const rotation = this.localPlayer.getRotation();

        this.socket.emit(SocketEvents.PLAYER_MOVED, {
          playerId: this.socket.id,
          position,
          rotation,
        });
      }
    }

    // Check if player is moving to play footstep sounds
    if (this.localPlayer && !this.gameOver) {
      const movement = this.controls.getMovement();
      const isMoving =
        movement.forward ||
        movement.backward ||
        movement.left ||
        movement.right;
      this.sound.playFootsteps(isMoving);
    }

    // Render the scene
    this.renderer.render(this.scene, this.camera);
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
        z: shotData.position.z,
      },
      direction: {
        x: shotData.direction.x,
        y: shotData.direction.y,
        z: shotData.direction.z,
      },
      weaponType: weaponType,
    };

    // Send shoot event to server
    this.socket.emit(SocketEvents.PLAYER_SHOOT, shootEvent);

    // Create visual projectile (optional - server will create the actual projectile)
    this.createProjectileVisual(
      new THREE.Vector3(
        shotData.position.x,
        shotData.position.y,
        shotData.position.z
      ),
      new THREE.Vector3(
        shotData.direction.x,
        shotData.direction.y,
        shotData.direction.z
      ),
      this.localPlayer.getTeamId(),
      weaponSettings.speed,
      weaponSettings.gravity
    );

    // Add sound effect for shooting
    if (this.localPlayer) {
      this.sound.play("shoot");
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
    const color = teamId === 1 ? 0xff3333 : 0x3333ff;

    // Create paintball
    const projectile = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 8, 8),
      new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
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
    const projectileGravity =
      gravity !== undefined ? gravity : defaultSettings.gravity; // Use provided gravity or default

    // Use a normalized direction vector
    const normalizedDirection = direction.clone().normalize();

    // Initial velocity
    const velocity = normalizedDirection
      .clone()
      .multiplyScalar(projectileSpeed);

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
      const newPosition = projectile.position
        .clone()
        .add(velocity.clone().multiplyScalar(timeStep));

      // Create a movement vector for raycasting
      const movementVector = newPosition
        .clone()
        .sub(previousPosition)
        .normalize();
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
      if (
        intersects.length > 0 &&
        intersects[0].distance < movementDistance + 0.2
      ) {
        // We hit a wall or object
        // Get the intersection point and surface normal
        const hitPoint = intersects[0].point;
        const hitNormal = intersects[0].face
          ? intersects[0].face.normal.clone()
          : movementVector.clone().negate();

        // Create impact effect at hit location
        this.createImpactEffect(hitPoint, hitNormal, color);

        // Play impact sound
        this.sound.playImpactSound(
          { x: hitPoint.x, y: hitPoint.y, z: hitPoint.z },
          {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z,
          }
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
          {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z,
          }
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
  private createImpactEffect(
    position: THREE.Vector3,
    direction: THREE.Vector3,
    color: number
  ): void {
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
          opacity: 0.9,
        })
      );

      // Set initial position at impact point
      particle.position.copy(position);

      // Add particle to explosion group
      explosion.add(particle);

      // Calculate random velocity for each particle
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 4, // Random X direction
        Math.random() * 3, // Mostly upward
        (Math.random() - 0.5) * 4 // Random Z direction
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
  private createPaintStain(
    position: THREE.Vector3,
    direction: THREE.Vector3,
    color: number
  ): void {
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
        side: THREE.DoubleSide, // Visible from both sides
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
          side: THREE.DoubleSide,
        })
      );

      // Position drip near main splat
      const dripDistance = 0.1 + Math.random() * 0.3;
      drip.position
        .copy(position)
        .add(
          new THREE.Vector3(
            (Math.random() - 0.5) * dripDistance,
            (Math.random() - 0.5) * dripDistance,
            (Math.random() - 0.5) * dripDistance
          )
        )
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
        paintGroup.children.forEach((child) => {
          const material = (child as THREE.Mesh)
            .material as THREE.MeshStandardMaterial;
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

  /**
   * Show game message
   * @param message The message to display
   * @param color Optional text color
   * @param duration How long to show the message in ms
   */
  private showGameMessage(
    message: string,
    color: string = "white",
    duration: number = 3000
  ): void {
    this.ui.showGameMessage(message, color, duration);
  }
}
