import * as THREE from 'three';
import { Player } from './classes/Player';
import { ObstacleManager } from './classes/ObstacleManager';
import { CollisionSystem } from './classes/CollisionSystem';
import { WeaponManager } from './classes/WeaponManager';
import { BotManager } from './classes/BotManager';
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
  isOnGround: false,
  currentWeaponIndex: 0
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
let weaponManager: WeaponManager;
let botManager: BotManager;

// Bot spawning variables
let lastBotSpawnTime = 0;
const botSpawnInterval = 15000; // Generar bots cada 15 segundos
const botsPerWave = 3; // Número de bots por oleada
let nextWaveCountdown = botSpawnInterval / 1000; // Contador en segundos

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
  const waveCountdown = document.getElementById('wave-countdown');
  
  if (!instructions || !crosshair) return;

  instructions.addEventListener('click', () => {
    controls.lock();
  });

  controls.addEventListener('lock', () => {
    instructions.style.display = 'none';
    crosshair.style.display = 'block';
    if (waveCountdown) {
      waveCountdown.style.display = 'block';
    }
  });

  controls.addEventListener('unlock', () => {
    instructions.style.display = 'block';
    crosshair.style.display = 'none';
    if (waveCountdown) {
      waveCountdown.style.display = 'none';
    }
  });

  // Movement controls
  document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyW':
        gameState.moveForward = true;
        break;
      case 'KeyS':
        gameState.moveBackward = true;
        break;
      case 'KeyA':
        gameState.moveLeft = true;
        break;
      case 'KeyD':
        gameState.moveRight = true;
        break;
      case 'Space':
        if (gameState.canJump) {
          gameState.velocity.y += JUMP_FORCE;
          gameState.canJump = false;
        }
        break;
      // Añadir teclas para cambiar de arma
      case 'Digit1': // Tecla 1
      case 'Digit2': // Tecla 2
      case 'Digit3': // Tecla 3
        // Cambiar al arma correspondiente (0-indexed)
        const weaponIndex = parseInt(event.code.slice(-1)) - 1;
        if (weaponIndex >= 0 && weaponIndex < 3) {
          gameState.currentWeaponIndex = weaponIndex;
          weaponManager.setWeapon(weaponIndex);
        }
        break;
      case 'KeyQ': // Arma anterior
        weaponManager.previousWeapon();
        break;
      case 'KeyE': // Arma siguiente
        weaponManager.nextWeapon();
        break;
      case 'KeyR': // Recargar
        weaponManager.reload();
        break;
    }
  });

  document.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyW':
        gameState.moveForward = false;
        break;
      case 'KeyS':
        gameState.moveBackward = false;
        break;
      case 'KeyA':
        gameState.moveLeft = false;
        break;
      case 'KeyD':
        gameState.moveRight = false;
        break;
    }
  });

  // Shooting
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0 && controls.isLocked) { // Left mouse button
      // Si es un arma automática, iniciar disparo automático
      if (weaponManager.getCurrentWeapon().isAutomatic()) {
        weaponManager.startAutoFire();
      } else {
        // Si no es automática, solo dispara una vez
        weaponManager.shoot();
      }
    }
  });

  // Añadir evento para detener el disparo automático
  document.addEventListener('mouseup', (event) => {
    if (event.button === 0 && controls.isLocked) { // Left mouse button
      weaponManager.stopAutoFire();
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
  obstacleManager.createObstacles(120);
}

// Handle collisions between player and obstacles
function handleCollisions(): void {
  collisionSystem.update();
  
  // Check player projectile collisions with bots
  botManager.checkProjectileCollisions(weaponManager.getAllProjectiles());
  
  // Check if player has been hit by bot projectiles (to be implemented)
  const playerCollisions = weaponManager.checkPlayerCollisions(player.collider);
  
  if (playerCollisions > 0) {
    player.takeDamage(10 * playerCollisions);
  }
}

// Spawn player at a suitable position
function spawnPlayer(): void {
  const spawnPosition = obstacleManager.findSpawnPosition();
  player.spawn(spawnPosition);
}

// Spawn bots at suitable positions
function spawnBots(): void {
  const currentTime = performance.now();
  
  // Verificar si es momento de generar una nueva oleada de bots
  if (currentTime - lastBotSpawnTime > botSpawnInterval) {
    lastBotSpawnTime = currentTime;
    nextWaveCountdown = botSpawnInterval / 1000; // Reiniciar el contador
    
    // Encontrar posiciones adecuadas para los bots
    const spawnPositions = [];
    for (let i = 0; i < botsPerWave; i++) {
      const spawnPosition = obstacleManager.findSpawnPosition();
      spawnPositions.push(spawnPosition);
    }
    
    // Generar los bots
    botManager.spawnBots(botsPerWave, spawnPositions);
    
    // Mostrar mensaje de nueva oleada
    showWaveNotification();
  }
}

// Mostrar notificación de nueva oleada
function showWaveNotification(): void {
  const notification = document.createElement('div');
  notification.classList.add('wave-notification');
  notification.textContent = '¡Nueva oleada de bots!';
  document.body.appendChild(notification);
  
  // Estilo para la notificación
  notification.style.position = 'absolute';
  notification.style.top = '20%';
  notification.style.left = '50%';
  notification.style.transform = 'translateX(-50%)';
  notification.style.padding = '10px 20px';
  notification.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
  notification.style.color = 'white';
  notification.style.fontFamily = 'Arial, sans-serif';
  notification.style.fontSize = '24px';
  notification.style.fontWeight = 'bold';
  notification.style.borderRadius = '5px';
  notification.style.zIndex = '1000';
  
  // Eliminar la notificación después de unos segundos
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

// Update player health display
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
    
    // Update bot manager
    botManager.update(delta, player.controls.getObject().position, obstacleManager.getObstacles());
    
    // Update the wave countdown
    updateWaveCountdown(time);
    
    // Check if it's time to spawn new bots
    spawnBots();
    
    // Update collision system
    handleCollisions();
    
    // Update weapon system
    weaponManager.update(delta, obstacleManager.getObstacles());
  }
  
  renderer.render(scene, camera);
  gameState.prevTime = time;
}

// Update the countdown for the next bot wave
function updateWaveCountdown(currentTime: number): void {
  const timeRemaining = Math.max(0, botSpawnInterval - (currentTime - lastBotSpawnTime));
  nextWaveCountdown = Math.ceil(timeRemaining / 1000);
  
  const countdownElement = document.getElementById('wave-countdown');
  if (countdownElement) {
    countdownElement.textContent = `Next wave: ${nextWaveCountdown}s`;
    
    // Cambiar el color según el tiempo restante
    if (nextWaveCountdown <= 5) {
      countdownElement.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    } else if (nextWaveCountdown <= 10) {
      countdownElement.style.backgroundColor = 'rgba(255, 165, 0, 0.6)';
    } else {
      countdownElement.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    }
  }
}

// Initialize the game
function init(): void {
  // Hide crosshair initially
  const crosshair = document.getElementById('crosshair');
  if (crosshair) {
    crosshair.style.display = 'none';
  }
  
  // Hide wave countdown initially
  const waveCountdown = document.getElementById('wave-countdown');
  if (waveCountdown) {
    waveCountdown.style.display = 'none';
  }
  
  // Initialize scene
  initScene();
  
  // Initialize player
  player = new Player(camera, document.body);
  
  // Initialize obstacles
  obstacleManager = new ObstacleManager(scene);
  obstacleManager.createObstacles(120);
  
  // Initialize bot manager
  botManager = new BotManager(scene);
  
  // Initialize collision system
  collisionSystem = new CollisionSystem(player, obstacleManager);
  
  // Initialize weapon system
  weaponManager = new WeaponManager(scene, player);
  
  // Mostrar información del arma inicial
  weaponManager.displayWeaponInfo();
  
  // Setup event listeners
  setupEventListeners();
  
  // Spawn player at random position
  const spawnPosition = obstacleManager.findSpawnPosition();
  player.spawn(spawnPosition);
  
  // Spawn initial bots
  lastBotSpawnTime = performance.now();
  spawnBots();
  
  // Update health display
  player.updateHealthDisplay();
  
  // Start animation loop
  animate();
}

// Start the game
init(); 