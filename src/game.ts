import * as THREE from 'three';
import { Player } from './classes/Player';
import { ObstacleManager } from './map/ObstacleManager';
import { WeaponManager } from './classes/WeaponManager';
import { BotManager } from './classes/BotManager';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GameState } from './types';
import { Flag } from './classes/Flag';

// Flag capture timer configuration
const FLAG_CAPTURE_TIME_LIMIT = 60; // Time in seconds to capture the flag (1 minute)

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
let weaponManager: WeaponManager;
let botManager: BotManager;
let flag: Flag;

// Flag captured notification element
let flagNotification: HTMLElement | null;
let timerElement: HTMLElement | null;
let flagCaptureTimer: number = FLAG_CAPTURE_TIME_LIMIT;
let flagTimerActive: boolean = false;
let lastTimerUpdate: number = 0;

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
  
  // Create flag notification element
  flagNotification = document.createElement('div');
  flagNotification.id = 'flag-notification';
  flagNotification.style.position = 'absolute';
  flagNotification.style.bottom = '10px';
  flagNotification.style.left = '50%';
  flagNotification.style.transform = 'translateX(-50%)';
  flagNotification.style.background = 'rgba(0,0,0,0.5)';
  flagNotification.style.color = 'white';
  flagNotification.style.padding = '10px 20px';
  flagNotification.style.borderRadius = '5px';
  flagNotification.style.fontFamily = 'Arial, sans-serif';
  flagNotification.style.display = 'none';
  document.body.appendChild(flagNotification);
  
  // Create timer element (make it visible from the start)
  timerElement = document.createElement('div');
  timerElement.id = 'flag-timer';
  timerElement.style.position = 'absolute';
  timerElement.style.top = '10px';
  timerElement.style.left = '50%';
  timerElement.style.transform = 'translateX(-50%)';
  timerElement.style.background = 'rgba(0,0,0,0.7)';
  timerElement.style.color = 'white';
  timerElement.style.padding = '10px 20px';
  timerElement.style.borderRadius = '5px';
  timerElement.style.fontFamily = 'Arial, sans-serif';
  timerElement.style.fontSize = '24px';
  timerElement.style.fontWeight = 'bold';
  timerElement.style.display = 'block'; // Make it visible immediately
  document.body.appendChild(timerElement);
  
  if (!instructions || !crosshair) return;

  instructions.addEventListener('click', () => {
    controls.lock();
  });

  controls.addEventListener('lock', () => {
    instructions.style.display = 'none';
    crosshair.style.display = 'block';
    if (waveCountdown) waveCountdown.style.display = 'block';
    if (weaponSelector) weaponSelector.style.display = 'flex';
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

// Handle collisions between player and obstacles
function handleCollisions(): void {
  // Use the player's collision handler instead of collision system
  player.handleCollisions();
  
  // Check player projectile collisions with bots
  botManager.checkProjectileCollisions(weaponManager.getAllProjectiles());
  
  // Check if player has been hit by bot projectiles (to be implemented)
  const playerCollisions = weaponManager.checkPlayerCollisions(player.collider);
  
  if (playerCollisions > 0) {
    player.takeDamage(10 * playerCollisions);
  }
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
  
  // Update flag timer
  updateFlagTimer();
  
  // Handle flag interaction
  handleFlagInteraction();
  
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
  obstacleManager.createObstacles(200);
  
  // Make obstacleManager available globally for other systems
  (window as any).obstacleManager = obstacleManager;
  
  // Set the obstacle manager in the player for collision detection
  player.setObstacleManager(obstacleManager);
  
  // Initialize bot manager
  botManager = new BotManager(scene);
  
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
  
  // Create flag after obstacles are created
  createFlag();
  
  // Start the flag timer when the game starts
  flagCaptureTimer = FLAG_CAPTURE_TIME_LIMIT;
  flagTimerActive = true;
  lastTimerUpdate = Date.now();
  
  // Show the timer immediately
  if (timerElement) {
    timerElement.style.display = 'block';
    updateTimerDisplay();
  }
  
  animate();
}

// Create the flag at a random position in the maze
function createFlag(): void {
  // Place the flag at a random position away from the spawn point
  const flagSpawnPosition = findFlagSpawnPosition();
  flag = new Flag(scene, flagSpawnPosition);
  
  console.log("Flag created at position:", flagSpawnPosition);
}

// Find a suitable position for the flag (away from spawn)
function findFlagSpawnPosition(): THREE.Vector3 {
  // Try to use a position from obstacleManger if available
  if (obstacleManager && obstacleManager.findSpawnPosition) {
    // Get spawn position for player
    const playerSpawnPos = obstacleManager.findSpawnPosition();
    
    // Get all obstacles to check for collisions
    const obstacles = obstacleManager.getObstacles();
    
    // Try multiple positions to find one that doesn't collide with obstacles
    const attempts = 30; // Increase number of attempts to find a suitable position
    for (let i = 0; i < attempts; i++) {
      const testPos = obstacleManager.findSpawnPosition();
      
      // If this position is far enough from player spawn
      if (testPos.distanceTo(playerSpawnPos) > 30) {
        // Check if the position collides with any obstacle
        const collides = checkPositionCollision(testPos, obstacles);
        
        if (!collides) {
          // Found a good position with no collisions
          console.log(`Found non-colliding flag position on attempt ${i+1}`);
          // Raise it a bit off the ground
          testPos.y = 2; 
          return testPos;
        }
      }
    }
    
    console.warn("Could not find collision-free position for flag after multiple attempts");
  }
  
  // Fallback to a hardcoded position if we couldn't find a good one
  // Try several random positions until we find one that doesn't collide
  const obstacles = obstacleManager ? obstacleManager.getObstacles() : [];
  
  for (let i = 0; i < 20; i++) {
    const randomPosition = new THREE.Vector3(
      (Math.random() - 0.5) * 80, 
      2, 
      (Math.random() - 0.5) * 80
    );
    
    // Check if this random position collides with obstacles
    if (!checkPositionCollision(randomPosition, obstacles)) {
      console.log(`Found non-colliding random flag position on attempt ${i+1}`);
      return randomPosition;
    }
  }
  
  // Last resort - fixed position far from origin
  console.warn("Using last resort flag position");
  return new THREE.Vector3(50, 2, 50);
}

/**
 * Check if a position collides with any obstacles
 * @param position The position to check
 * @param obstacles Array of obstacles to check against
 * @returns True if there's a collision, false otherwise
 */
function checkPositionCollision(position: THREE.Vector3, obstacles: any[]): boolean {
  // Flag collider size (using the static values from Flag class)
  const flagColliderRadius = 1.5; // Same as Flag.COLLIDER_RADIUS
  
  // Check against each obstacle
  for (const obstacle of obstacles) {
    // For box obstacles
    if (obstacle.collider && obstacle.collider.type === 'box') {
      const obstaclePos = obstacle.collider.position;
      const obstacleSize = obstacle.collider.size;
      
      // Create a box representing the obstacle bounds
      const halfSize = obstacleSize.clone().multiplyScalar(0.5);
      const min = obstaclePos.clone().sub(halfSize);
      const max = obstaclePos.clone().add(halfSize);
      
      // Simple check if the flag's bounding sphere intersects with the obstacle's box
      // For each axis, check if the flag is too close to the box
      if (
        position.x + flagColliderRadius >= min.x && position.x - flagColliderRadius <= max.x &&
        position.y + flagColliderRadius >= min.y && position.y - flagColliderRadius <= max.y &&
        position.z + flagColliderRadius >= min.z && position.z - flagColliderRadius <= max.z
      ) {
        return true; // Collision detected
      }
    }
    // For sphere obstacles
    else if (obstacle.collider && obstacle.collider.type === 'sphere' && obstacle.collider.radius) {
      const obstaclePos = obstacle.collider.position;
      const obstacleRadius = obstacle.collider.radius;
      
      // Check if the distance between centers is less than the sum of the radii
      const distance = position.distanceTo(obstaclePos);
      if (distance < (flagColliderRadius + obstacleRadius)) {
        return true; // Collision detected
      }
    }
  }
  
  return false; // No collision
}

// Handle flag interaction and win condition
function handleFlagInteraction(): void {
  if (!flag || !player || !obstacleManager) return;
  
  const playerPosition = player.controls.getObject().position;
  
  // Check if player can capture the flag
  if (!flag.isCaptured && flag.canCapture(playerPosition)) {
    flag.capture();
    showFlagNotification(`Flag captured! Get to the exit before time runs out!`);
    
    // No longer starting the timer here since it already started with the game
  }
  
  // Update flag position when captured
  if (flag.isCaptured) {
    flag.updatePosition(playerPosition);
    
    // Check if player has reached the exit with the flag
    const exitPosition = obstacleManager.getExitPosition();
    if (exitPosition && flag.isAtExit(playerPosition, exitPosition)) {
      // Player wins!
      showWinScreen();
    }
  }
}

// Update the timer countdown
function updateFlagTimer(): void {
  if (!flagTimerActive) return;
  
  const now = Date.now();
  const deltaTime = (now - lastTimerUpdate) / 1000; // Convert to seconds
  lastTimerUpdate = now;
  
  flagCaptureTimer -= deltaTime;
  
  // Update timer display
  updateTimerDisplay();
  
  // Check if time ran out
  if (flagCaptureTimer <= 0) {
    // Time's up - game over
    flagTimerActive = false;
    showGameOverScreen();
  }
}

// Update the timer display
function updateTimerDisplay(): void {
  if (!timerElement) return;
  
  // Format time as M:SS
  const minutes = Math.floor(flagCaptureTimer / 60);
  const seconds = Math.floor(flagCaptureTimer % 60);
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  // Change color to red when time is running low
  if (flagCaptureTimer <= 10) {
    timerElement.style.color = '#ff0000';
  } else {
    timerElement.style.color = 'white';
  }
  
  timerElement.textContent = formattedTime;
}

// Show flag notification
function showFlagNotification(message: string): void {
  if (!flagNotification) return;
  
  flagNotification.textContent = message;
  flagNotification.style.display = 'block';
  
  // Hide after 5 seconds
  setTimeout(() => {
    if (flagNotification) {
      flagNotification.style.display = 'none';
    }
  }, 5000);
}

// Show game over screen
function showGameOverScreen(): void {
  // Create a game over notification
  const gameOverScreen = document.createElement('div');
  gameOverScreen.style.position = 'absolute';
  gameOverScreen.style.top = '0';
  gameOverScreen.style.left = '0';
  gameOverScreen.style.width = '100%';
  gameOverScreen.style.height = '100%';
  gameOverScreen.style.background = 'rgba(0,0,0,0.8)';
  gameOverScreen.style.display = 'flex';
  gameOverScreen.style.flexDirection = 'column';
  gameOverScreen.style.justifyContent = 'center';
  gameOverScreen.style.alignItems = 'center';
  gameOverScreen.style.color = 'white';
  gameOverScreen.style.fontFamily = 'Arial, sans-serif';
  gameOverScreen.style.zIndex = '1000';
  
  const title = document.createElement('h1');
  title.textContent = 'TIME\'S UP!';
  title.style.fontSize = '5rem';
  title.style.marginBottom = '20px';
  title.style.color = '#FF3333'; // Red color
  
  const message = document.createElement('p');
  message.textContent = 'You ran out of time! Find and capture the flag faster next time!';
  message.style.fontSize = '1.5rem';
  message.style.marginBottom = '40px';
  
  const restartButton = document.createElement('button');
  restartButton.textContent = 'Try Again';
  restartButton.style.padding = '15px 30px';
  restartButton.style.fontSize = '1.2rem';
  restartButton.style.background = '#4CAF50';
  restartButton.style.border = 'none';
  restartButton.style.borderRadius = '5px';
  restartButton.style.cursor = 'pointer';
  
  restartButton.addEventListener('click', () => {
    document.body.removeChild(gameOverScreen);
    restartGame();
  });
  
  gameOverScreen.appendChild(title);
  gameOverScreen.appendChild(message);
  gameOverScreen.appendChild(restartButton);
  
  document.body.appendChild(gameOverScreen);
  
  // Unlock controls when showing game over screen
  controls.unlock();
  
  // Hide the timer
  if (timerElement) {
    timerElement.style.display = 'none';
  }
}

// Show win screen
function showWinScreen(): void {
  // Stop the timer
  flagTimerActive = false;
  
  // Hide the timer
  if (timerElement) {
    timerElement.style.display = 'none';
  }
  
  // Create a win notification
  const winScreen = document.createElement('div');
  winScreen.style.position = 'absolute';
  winScreen.style.top = '0';
  winScreen.style.left = '0';
  winScreen.style.width = '100%';
  winScreen.style.height = '100%';
  winScreen.style.background = 'rgba(0,0,0,0.8)';
  winScreen.style.display = 'flex';
  winScreen.style.flexDirection = 'column';
  winScreen.style.justifyContent = 'center';
  winScreen.style.alignItems = 'center';
  winScreen.style.color = 'white';
  winScreen.style.fontFamily = 'Arial, sans-serif';
  winScreen.style.zIndex = '1000';
  
  const title = document.createElement('h1');
  title.textContent = 'VICTORY!';
  title.style.fontSize = '5rem';
  title.style.marginBottom = '20px';
  title.style.color = '#FFD700'; // Gold color
  
  const message = document.createElement('p');
  message.textContent = 'You successfully captured the flag and reached the exit!';
  message.style.fontSize = '1.5rem';
  message.style.marginBottom = '40px';
  
  const restartButton = document.createElement('button');
  restartButton.textContent = 'Play Again';
  restartButton.style.padding = '15px 30px';
  restartButton.style.fontSize = '1.2rem';
  restartButton.style.background = '#4CAF50';
  restartButton.style.border = 'none';
  restartButton.style.borderRadius = '5px';
  restartButton.style.cursor = 'pointer';
  
  restartButton.addEventListener('click', () => {
    document.body.removeChild(winScreen);
    restartGame();
  });
  
  winScreen.appendChild(title);
  winScreen.appendChild(message);
  winScreen.appendChild(restartButton);
  
  document.body.appendChild(winScreen);
  
  // Unlock controls when showing win screen
  controls.unlock();
}

// Restart the game
function restartGame(): void {
  // Simply reload the page to restart everything
  window.location.reload();
}

// Start the game
init(); 