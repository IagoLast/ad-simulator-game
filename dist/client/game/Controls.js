"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controls = void 0;
class Controls {
    constructor(canvas) {
        this.keys = {};
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseSensitivity = 0.002;
        this.isPointerLocked = false;
        this.canvas = canvas;
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('click', this.requestPointerLock.bind(this));
        document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));
        for (const key of ['w', 'a', 's', 'd']) {
            this.keys[key] = false;
        }
    }
    onKeyDown(event) {
        this.keys[event.key.toLowerCase()] = true;
        if (['w', 'a', 's', 'd'].includes(event.key.toLowerCase())) {
            event.preventDefault();
        }
    }
    onKeyUp(event) {
        this.keys[event.key.toLowerCase()] = false;
    }
    onMouseMove(event) {
        if (this.isPointerLocked) {
            this.mouseX = event.movementX * this.mouseSensitivity;
            this.mouseY = event.movementY * this.mouseSensitivity;
        }
    }
    requestPointerLock() {
        if (!this.isPointerLocked) {
            this.canvas.requestPointerLock();
        }
    }
    onPointerLockChange() {
        this.isPointerLocked = document.pointerLockElement === this.canvas;
        const pointerLockMessage = document.getElementById('pointer-lock-message');
        if (pointerLockMessage) {
            pointerLockMessage.style.display = this.isPointerLocked ? 'none' : 'block';
        }
    }
    getMovement() {
        const result = {
            forward: this.isKeyPressed('w'),
            backward: this.isKeyPressed('s'),
            left: this.isKeyPressed('a'),
            right: this.isKeyPressed('d'),
            mouseX: this.mouseX,
            mouseY: this.mouseY
        };
        this.mouseX = 0;
        this.mouseY = 0;
        return result;
    }
    isKeyPressed(key) {
        return this.keys[key] === true;
    }
    isControlActive() {
        return this.isPointerLocked;
    }
}
exports.Controls = Controls;
//# sourceMappingURL=Controls.js.map