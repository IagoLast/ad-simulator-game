"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const THREE = __importStar(require("three"));
const socket_io_client_1 = require("socket.io-client");
const types_1 = require("../../shared/types");
const Controls_1 = require("./Controls");
const Player_1 = require("./Player");
class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.controls = new Controls_1.Controls(this.renderer.domElement);
        this.players = new Map();
        this.localPlayer = null;
        this.socket = (0, socket_io_client_1.io)();
        this.setupSocketEvents();
        this.playerCount = document.getElementById('player-count');
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.lastUpdateTime = performance.now();
        this.animate();
    }
    setupSocketEvents() {
        this.socket.on(types_1.SocketEvents.GAME_STATE, (gameState) => {
            console.log('Received game state:', gameState);
            gameState.players.forEach(playerState => {
                if (playerState.id === this.socket.id) {
                    this.localPlayer = this.createPlayer(playerState);
                }
                else {
                    this.createPlayer(playerState);
                }
            });
            this.updatePlayerCount();
        });
        this.socket.on(types_1.SocketEvents.PLAYER_JOINED, (playerState) => {
            console.log('Player joined:', playerState);
            this.createPlayer(playerState);
            this.updatePlayerCount();
        });
        this.socket.on(types_1.SocketEvents.PLAYER_MOVED, (playerMovement) => {
            const player = this.players.get(playerMovement.playerId);
            if (player && playerMovement.playerId !== this.socket.id) {
                player.updatePosition(playerMovement.position);
                player.updateRotation(playerMovement.rotation);
            }
        });
        this.socket.on(types_1.SocketEvents.PLAYER_LEFT, (playerId) => {
            console.log('Player left:', playerId);
            const player = this.players.get(playerId);
            if (player) {
                this.scene.remove(player.mesh);
                this.players.delete(playerId);
                this.updatePlayerCount();
            }
        });
    }
    createPlayer(playerState) {
        const isLocalPlayer = playerState.id === this.socket.id;
        const player = new Player_1.Player(playerState, isLocalPlayer);
        this.scene.add(player.mesh);
        this.players.set(playerState.id, player);
        return player;
    }
    updatePlayerCount() {
        this.playerCount.textContent = `Players: ${this.players.size}`;
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    animate(time = 0) {
        requestAnimationFrame(this.animate.bind(this));
        const deltaTime = (time - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = time;
        if (this.localPlayer && this.socket.id) {
            const movement = this.controls.getMovement();
            if (movement.forward || movement.backward || movement.left || movement.right) {
                this.localPlayer.move(movement.forward, movement.backward, movement.left, movement.right, deltaTime);
            }
            if (movement.mouseX !== 0 || movement.mouseY !== 0) {
                this.localPlayer.rotate(movement.mouseX, movement.mouseY);
            }
            const playerPos = this.localPlayer.getPosition();
            const playerRot = this.localPlayer.getRotation();
            this.camera.position.set(playerPos.x, playerPos.y + 1.7, playerPos.z);
            this.camera.rotation.order = 'YXZ';
            this.camera.rotation.y = playerRot.y;
            this.camera.rotation.x = playerRot.x;
            this.socket.emit(types_1.SocketEvents.PLAYER_MOVED, {
                playerId: this.socket.id,
                position: this.localPlayer.getPosition(),
                rotation: this.localPlayer.getRotation()
            });
        }
        this.renderer.render(this.scene, this.camera);
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map