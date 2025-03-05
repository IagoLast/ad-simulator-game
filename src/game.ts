import * as THREE from 'three';
import { Player } from './classes/Player';
import { ObstacleManager } from './classes/ObstacleManager';
import { CollisionSystem } from './classes/CollisionSystem';
import { WeaponManager } from './classes/WeaponManager';
import { BotManager } from './classes/BotManager';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GameState } from './types';

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
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: PointerLockControls;
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

/**
 * Updates the weapon selection UI
 * @param selectedIndex Index of the selected weapon
 */
function updateWeaponSelection(selectedIndex: number): void {
  // Update the UI to show the selected weapon
  const weaponItems = document.querySelectorAll('.weapon-item');
  weaponItems.forEach((item, index) => {
    if (index === selectedIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Setup event listeners
function setupEventListeners(): void {
  const instructions = document.getElementById('instructions');
  const crosshair = document.getElementById('crosshair');
  const waveCountdown = document.getElementById('wave-countdown');
  const weaponSelector = document.getElementById('weapon-selector');
  
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
    if (weaponSelector) {
      weaponSelector.style.display = 'flex';
    }
  });

  controls.addEventListener('unlock', () => {
    instructions.style.display = 'block';
    crosshair.style.display = 'none';
    if (waveCountdown) {
      waveCountdown.style.display = 'none';
    }
  });

  // Setup weapon selector click events
  const weaponItems = document.querySelectorAll('.weapon-item');
  weaponItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (!controls.isLocked) return; // Only work when game is active
      
      const index = parseInt(item.getAttribute('data-index') || '0', 10);
      gameState.currentWeaponIndex = index;
      weaponManager.setWeapon(index);
      updateWeaponSelection(index);
    });
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
          player.jump();
          gameState.canJump = false;
        }
        break;
      case 'Digit1':
      case 'Digit2':
      case 'Digit3':
        // Cambiar al arma correspondiente (0-indexed)
        const weaponIndex = parseInt(event.code.slice(-1)) - 1;
        if (weaponIndex >= 0 && weaponIndex < 3) {
          gameState.currentWeaponIndex = weaponIndex;
          weaponManager.setWeapon(weaponIndex);
          updateWeaponSelection(weaponIndex);
        }
        break;
      case 'KeyQ': // Arma anterior
        weaponManager.previousWeapon();
        updateWeaponSelection(weaponManager.getCurrentWeaponIndex());
        break;
      case 'KeyE': // Arma siguiente
        weaponManager.nextWeapon();
        updateWeaponSelection(weaponManager.getCurrentWeaponIndex());
        break;
      case 'KeyR': // Recargar
        weaponManager.reload();
        break;
      case 'KeyB':
        // Generar un bot con proyectiles rebotantes
        const playerPos = controls.getObject().position.clone();
        // Colocar el bot a 10 unidades frente al jugador
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        const botPosition = playerPos.clone().add(forward.multiplyScalar(10));
        botPosition.y = 0; // En el suelo
        botManager.spawnBounceBot(botPosition);
        break;
    }
  });

  // Key up event (key release)
  document.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        gameState.moveForward = false;
        break;
      case 'KeyS':
      case 'ArrowDown':
        gameState.moveBackward = false;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        gameState.moveLeft = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        gameState.moveRight = false;
        break;
      case 'Space':
        // No es necesario hacer nada aquí
        break;
      case 'Digit1':
      case 'Digit2':
      case 'Digit3':
      case 'Digit4':
      case 'Digit5':
        // Cambiar arma por índice
        const weaponIndex = parseInt(event.code.slice(-1)) - 1;
        if (weaponIndex >= 0 && weaponIndex < 5) { // Máximo 5 armas
          weaponManager.setWeapon(weaponIndex);
        }
        break;
      case 'KeyB':
        // Generar un bot con proyectiles rebotantes
        const playerPos = controls.getObject().position.clone();
        // Colocar el bot a 10 unidades frente al jugador
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        const botPosition = playerPos.clone().add(forward.multiplyScalar(10));
        botPosition.y = 0; // En el suelo
        botManager.spawnBounceBot(botPosition);
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
  const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 }); // Forest green
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
}

// Create lighting
function createLighting(): void {
  const ambientLight = new THREE.AmbientLight(0xf0f0f0);
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

// @ts-ignore - Implemented but not currently used - part of the public API
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

// @ts-ignore - Implemented but not currently used - part of the public API
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

// @ts-ignore - Implemented but not currently used - part of the public API
function updateHealth(): void {
  const healthDisplay = document.getElementById('health');
  if (healthDisplay) {
    healthDisplay.textContent = `Health: ${gameState.health}%`;
  }
}

// Animation loop
function animate(): void {
  requestAnimationFrame(animate);
  
  const time = performance.now();
  const delta = (time - gameState.prevTime) / 1000; // Convert to seconds
  
  if (controls.isLocked) {
    // Update player movement using the Player class
    player.moveForward = gameState.moveForward;
    player.moveBackward = gameState.moveBackward;
    player.moveLeft = gameState.moveLeft;
    player.moveRight = gameState.moveRight;
    player.updateMovement(delta);
    
    // Update bot manager
    botManager.update(delta, player.controls.getObject().position, obstacleManager.getObstacles());
    
    // Update the wave countdown
    updateWaveCountdown(time);
    
    // Check if it's time to spawn new bots
    spawnBots();
    
    // Update collision system
    handleCollisions();
    
    // Update weapon system
    weaponManager.update(delta);
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
  
  // Hide weapon selector initially
  const weaponSelector = document.getElementById('weapon-selector');
  if (weaponSelector) {
    weaponSelector.style.display = 'none';
  }
  
  // Initialize scene
  initScene();
  
  // Initialize player
  player = new Player(camera, document.body);
  
  // Initialize obstacles
  obstacleManager = new ObstacleManager(scene);
  obstacleManager.createObstacles(120);
  
  // Make obstacleManager available globally for other systems
  (window as any).obstacleManager = obstacleManager;
  
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