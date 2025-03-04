import * as THREE from 'three';

export interface GameState {
  health: number;
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  canJump: boolean;
  velocity: THREE.Vector3;
  direction: THREE.Vector3;
  prevTime: number;
  playerCollider: Collider;
  isOnGround: boolean;
}

export interface Collider {
  position: THREE.Vector3;
  radius: number;
  height: number;
}

export interface Obstacle {
  mesh: THREE.Mesh;
  collider: {
    position: THREE.Vector3;
    size: THREE.Vector3;
  };
}

export type CollisionResult = {
  collided: boolean;
  penetration?: THREE.Vector3;
}; 