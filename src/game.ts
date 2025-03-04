import * as THREE from 'three';
import { Player } from './classes/Player';
import { ObstacleManager } from './classes/ObstacleManager';
import { CollisionSystem } from './classes/CollisionSystem';
import { WeaponSystem } from './classes/WeaponSystem';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GameState, Obstacle } from './types';
import { 
  GRAVITY, 
  JUMP_FORCE, 
  MOVEMENT_SPEED, 
  AIR_CONTROL, 
  FRICTION,
  checkCapsuleBoxCollision,
  isOnGround,
  applyFriction
} from './physics';

// Game state
const gameState: GameState = {
  health: 100,
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
  canJump: false,
  velocity: new THREE.Vector3(),
  direction: new THREE.Vector3(),
  prevTime: performance.now(),
  playerCollider: {
    position: new THREE.Vector3(0, 1.8, 0),
    radius: 0.5,
    height: 3.0,
  },
  isOnGround: false
};

// Game objects
const obstacles: Obstacle[] = [];
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: PointerLockControls;
let renderer: THREE.WebGLRenderer;
let player: Player;
let obstacleManager: ObstacleManager;
let collisionSystem: CollisionSystem;
let weaponSystem: WeaponSystem;

// Initialize the scene
function initScene(): void {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // Sky blue
  scene.fog = new THREE.Fog(0x87ceeb, 0, 750);

  // Camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 1.8; // Height of player

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Controls
  controls = new PointerLockControls(camera, document.body);

  setupEventListeners();
  createGround();
  createLighting();
}

// Setup event listeners
function setupEventListeners(): void {
  const instructions = document.getElementById('instructions');
  const crosshair = document.getElementById('crosshair');
  
  if (!instructions || !crosshair) return;

  instructions.addEventListener('click', () => {
    controls.lock();
  });

  controls.addEventListener('lock', () => {
    instructions.style.display = 'none';
    crosshair.style.display = 'block';
  });

  controls.addEventListener('unlock', () => {
    instructions.style.display = 'block';
    crosshair.style.display = 'none';
  });

  // Movement controls
  document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyW':
        gameState.moveForward = true;
        break;
      case 'KeyA':
        gameState.moveLeft = true;
        break;
      case 'KeyS':
        gameState.moveBackward = true;
        break;
      case 'KeyD':
        gameState.moveRight = true;
        break;
      case 'Space':
        if (gameState.canJump) {
          gameState.velocity.y = JUMP_FORCE;
          gameState.canJump = false;
        }
        break;
    }
  });

  document.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyW':
        gameState.moveForward = false;
        break;
      case 'KeyA':
        gameState.moveLeft = false;
        break;
      case 'KeyS':
        gameState.moveBackward = false;
        break;
      case 'KeyD':
        gameState.moveRight = false;
        break;
    }
  });

  // Shooting
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0 && controls.isLocked) { // Left mouse button
      weaponSystem.shoot();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Create the ground
function createGround(): void {
  const groundGeometry = new THREE.PlaneGeometry(200, 200);
  const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x254117 }); // Forest green
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
}

// Create lighting
function createLighting(): void {
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 30, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.left = -100;
  directionalLight.shadow.camera.right = 100;
  directionalLight.shadow.camera.top = 100;
  directionalLight.shadow.camera.bottom = -100;
  scene.add(directionalLight);
}

// Create obstacles
function createObstacles(): void {
  obstacleManager = new ObstacleManager(scene);
  obstacleManager.createObstacles(120);
}

// Check and resolve collisions between player and obstacles
function handleCollisions(): void {
  // Update player collider position to match camera position
  const playerPosition = controls.getObject().position;
  gameState.playerCollider.position.copy(playerPosition);
  
  // Check collisions with all obstacles
  for (const obstacle of obstacles) {
    const result = checkCapsuleBoxCollision(gameState.playerCollider, obstacle);
    
    if (result.collided && result.penetration) {
      // Resolve collision by moving player away
      playerPosition.add(result.penetration);
      
      // If collision is on y-axis, stop vertical velocity
      if (Math.abs(result.penetration.y) > 0.01) {
        gameState.velocity.y = 0;
      }
    }
  }
}

// Spawn player at random position
function spawnPlayer(): void {
  // Random spawn position
  let spawnX = Math.random() * 180 - 90;
  let spawnZ = Math.random() * 180 - 90;
  
  // Ensure player doesn't spawn inside an obstacle
  let validSpawn = false;
  while (!validSpawn) {
    validSpawn = true;
    for (const obstacle of obstacles) {
      const obstaclePos = obstacle.mesh.position;
      const distance = Math.sqrt(
        Math.pow(spawnX - obstaclePos.x, 2) + 
        Math.pow(spawnZ - obstaclePos.z, 2)
      );
      if (distance < 3) {
        validSpawn = false;
        spawnX = Math.random() * 180 - 90;
        spawnZ = Math.random() * 180 - 90;
        break;
      }
    }
  }
  
  controls.getObject().position.set(spawnX, 1.8, spawnZ);
  gameState.velocity.set(0, 0, 0);
  gameState.playerCollider.position.set(spawnX, 1.8, spawnZ);
}

// Update health display
function updateHealth(): void {
  const healthDisplay = document.getElementById('health');
  if (healthDisplay) {
    healthDisplay.textContent = `Health: ${gameState.health}%`;
  }
}

// Update player movement
function updatePlayerMovement(delta: number): void {
  // Apply gravity
  gameState.velocity.y -= GRAVITY * delta;
  
  // Check if on ground
  gameState.isOnGround = isOnGround(controls.getObject().position.y, 1.8, 0.1);
  
  if (gameState.isOnGround) {
    gameState.velocity.y = Math.max(0, gameState.velocity.y);
    gameState.canJump = true;
    
    // Apply friction when on ground
    applyFriction(gameState.velocity, FRICTION);
  }
  
  // Movement direction
  gameState.direction.z = Number(gameState.moveForward) - Number(gameState.moveBackward);
  gameState.direction.x = Number(gameState.moveRight) - Number(gameState.moveLeft);
  gameState.direction.normalize();
  
  // Apply movement speed with air control consideration
  const controlFactor = gameState.isOnGround ? 1.0 : AIR_CONTROL;
  
  if (gameState.moveForward || gameState.moveBackward) {
    gameState.velocity.z -= gameState.direction.z * MOVEMENT_SPEED * delta * controlFactor;
  }
  
  if (gameState.moveLeft || gameState.moveRight) {
    gameState.velocity.x -= gameState.direction.x * MOVEMENT_SPEED * delta * controlFactor;
  }
  
  // Apply velocity to controls
  controls.moveRight(-gameState.velocity.x * delta);
  controls.moveForward(-gameState.velocity.z * delta);
  
  // Update player position with gravity
  controls.getObject().position.y += gameState.velocity.y * delta;
  
  // Check if player fell through the floor
  if (controls.getObject().position.y < 1.8) {
    gameState.velocity.y = 0;
    controls.getObject().position.y = 1.8;
    gameState.canJump = true;
    gameState.isOnGround = true;
  }
}

// Animation loop
function animate(): void {
  requestAnimationFrame(animate);
  
  const time = performance.now();
  const delta = (time - gameState.prevTime) / 1000; // Convert to seconds
  
  if (controls.isLocked) {
    // Update player movement
    updatePlayerMovement(delta);
    
    // Update collision system
    handleCollisions();
    
    // Update weapon system
    weaponSystem.update(delta, obstacleManager.getObstacles());
  }
  
  renderer.render(scene, camera);
  gameState.prevTime = time;
}

// Initialize the game
function init(): void {
  // Hide crosshair initially
  const crosshair = document.getElementById('crosshair');
  if (crosshair) {
    crosshair.style.display = 'none';
  }
  
  // Initialize scene
  initScene();
  
  // Initialize player
  player = new Player(camera, document.body);
  
  // Initialize obstacles
  obstacleManager = new ObstacleManager(scene);
  obstacleManager.createObstacles(120);
  
  // Initialize collision system
  collisionSystem = new CollisionSystem(player, obstacleManager);
  
  // Initialize weapon system
  weaponSystem = new WeaponSystem(scene, player);
  
  // Setup event listeners
  setupEventListeners();
  
  // Spawn player at random position
  const spawnPosition = obstacleManager.findSpawnPosition();
  player.spawn(spawnPosition);
  
  // Update health display
  player.updateHealthDisplay();
  
  // Start animation loop
  animate();
}

// Start the game
init(); 