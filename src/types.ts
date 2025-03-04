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
  currentWeaponIndex: number;
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

export interface WeaponStats {
  name: string;
  damage: number;
  fireRate: number;
  projectileSpeed: number;
  projectileLifespan: number;
  accuracy: number;
  ammoCapacity: number;
  reloadTime: number;
  automatic: boolean;
}

export interface WeaponState {
  currentAmmo: number;
  reloading: boolean;
  cooldown: number;
}

export enum ProjectileType {
  PAINTBALL,
  WATER_BALLOON,
  FIREBALL,
  LASER
} 