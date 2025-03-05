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
exports.Player = void 0;
const THREE = __importStar(require("three"));
class Player {
    constructor(playerState, isLocalPlayer) {
        this.id = playerState.id;
        this.isLocalPlayer = isLocalPlayer;
        this.moveSpeed = 5;
        this.position = new THREE.Vector3(playerState.position.x, playerState.position.y, playerState.position.z);
        this.rotation = {
            x: 0,
            y: playerState.rotation.y || 0
        };
        this.mesh = new THREE.Group();
        const bodyGeometry = new THREE.BoxGeometry(1, 1.8, 1);
        const bodyMaterial = new THREE.MeshBasicMaterial({
            color: isLocalPlayer ? 0x00ff00 : 0xff0000
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.9;
        this.mesh.add(body);
        this.updateMeshTransform();
    }
    updatePosition(position) {
        this.position.set(position.x, position.y, position.z);
        this.updateMeshTransform();
    }
    updateRotation(rotation) {
        if (rotation.x !== undefined) {
            this.rotation.x = rotation.x;
        }
        this.rotation.y = rotation.y;
        this.updateMeshTransform();
    }
    move(forward, backward, left, right, deltaTime) {
        const direction = new THREE.Vector3();
        if (forward)
            direction.z -= 1;
        if (backward)
            direction.z += 1;
        if (left)
            direction.x -= 1;
        if (right)
            direction.x += 1;
        if (direction.length() > 0) {
            direction.normalize();
            const rotationMatrix = new THREE.Matrix4();
            rotationMatrix.makeRotationY(this.rotation.y);
            direction.applyMatrix4(rotationMatrix);
            direction.multiplyScalar(this.moveSpeed * deltaTime);
            this.position.add(direction);
            this.updateMeshTransform();
        }
    }
    rotate(mouseX, mouseY) {
        if (mouseX !== 0 || mouseY !== 0) {
            this.rotation.y -= mouseX;
            this.rotation.x -= mouseY;
            this.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotation.x));
            this.updateMeshTransform();
        }
    }
    updateMeshTransform() {
        this.mesh.position.copy(this.position);
        this.mesh.rotation.y = this.rotation.y;
    }
    getPosition() {
        return {
            x: this.position.x,
            y: this.position.y,
            z: this.position.z
        };
    }
    getRotation() {
        return {
            x: this.rotation.x,
            y: this.rotation.y
        };
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map