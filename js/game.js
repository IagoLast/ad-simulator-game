import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

// Game state
let health = 100;
let player;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let prevTime = performance.now();
let obstacles = [];

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue
scene.fog = new THREE.Fog(0x87ceeb, 0, 750);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 1.8; // Height of player

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new PointerLockControls(camera, document.body);

// Click to start and lock pointer
const instructions = document.getElementById('instructions');
instructions.addEventListener('click', () => {
    controls.lock();
});

controls.addEventListener('lock', () => {
    instructions.style.display = 'none';
});

controls.addEventListener('unlock', () => {
    instructions.style.display = 'block';
});

// Create the ground
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x254117 }); // Forest green
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Create obstacles
function createObstacles() {
    // Create several random obstacles
    for (let i = 0; i < 50; i++) {
        const size = Math.random() * 3 + 1;
        const height = Math.random() * 3 + 1;
        const geometry = new THREE.BoxGeometry(size, height, size);
        const material = new THREE.MeshLambertMaterial({ color: 0x8b4513 }); // Brown
        const obstacle = new THREE.Mesh(geometry, material);
        
        // Random position
        obstacle.position.x = Math.random() * 180 - 90;
        obstacle.position.y = height / 2;
        obstacle.position.z = Math.random() * 180 - 90;
        
        obstacle.castShadow = true;
        obstacle.receiveShadow = true;
        
        scene.add(obstacle);
        obstacles.push(obstacle);
    }
}

// Lighting
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

// Event listeners for movement
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyA':
            moveLeft = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyD':
            moveRight = true;
            break;
        case 'Space':
            if (canJump) {
                velocity.y += 10;
                canJump = false;
            }
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
            moveForward = false;
            break;
        case 'KeyA':
            moveLeft = false;
            break;
        case 'KeyS':
            moveBackward = false;
            break;
        case 'KeyD':
            moveRight = false;
            break;
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Player initialization
function spawnPlayer() {
    // Random spawn position
    let spawnX = Math.random() * 180 - 90;
    let spawnZ = Math.random() * 180 - 90;
    
    // Ensure player doesn't spawn inside an obstacle
    let validSpawn = false;
    while (!validSpawn) {
        validSpawn = true;
        for (const obstacle of obstacles) {
            const obstaclePos = obstacle.position;
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
    velocity.set(0, 0, 0);
}

// Update health display
function updateHealth() {
    const healthDisplay = document.getElementById('health');
    healthDisplay.textContent = `Health: ${health}%`;
}

// Initialize the game
function init() {
    createObstacles();
    spawnPlayer();
    animate();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (controls.isLocked) {
        const time = performance.now();
        const delta = (time - prevTime) / 1000;
        
        // Apply gravity and handle jumping
        velocity.y -= 9.8 * delta;
        
        // Movement direction
        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize();
        
        // Update velocity based on movement
        const movementSpeed = 10.0;
        if (moveForward || moveBackward) velocity.z -= direction.z * movementSpeed * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * movementSpeed * delta;
        
        // Apply velocity to controls
        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);
        
        // Update player position with gravity
        controls.getObject().position.y += velocity.y * delta;
        
        // Check if player is on ground
        if (controls.getObject().position.y < 1.8) {
            velocity.y = 0;
            controls.getObject().position.y = 1.8;
            canJump = true;
        }
        
        prevTime = time;
    }
    
    renderer.render(scene, camera);
}

// Start the game
init(); 