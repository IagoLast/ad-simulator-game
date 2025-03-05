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

/**
 * Defines the statistical properties of a weapon
 */
export interface WeaponStats {
  /** Name of the weapon */
  name: string;
  
  /** Description of the weapon */
  description: string;
  
  /** Maximum ammunition capacity */
  maxAmmo: number;
  
  /** Base damage dealt by the weapon */
  damage: number;
  
  /** Fire rate in shots per second */
  fireRate: number;
  
  /** Accuracy factor (0.0-1.0) where 1.0 is perfect accuracy */
  accuracy: number;
  
  /** Time in seconds to reload the weapon */
  reloadTime: number;
  
  /** Initial speed of projectiles in units per second */
  projectileSpeed: number;
  
  /** Color used for the projectile and paint splatter */
  projectileColor: number;
  
  /** Weight of the weapon, affects player movement */
  weight: number;
  
  /** Whether the weapon supports automatic fire */
  automatic: boolean;
}

/**
 * Defines the current state of a weapon
 */
export interface WeaponState {
  /** Current ammunition count */
  currentAmmo: number;
  
  /** Whether the weapon is being reloaded */
  isReloading: boolean;
  
  /** Time remaining until reload completes */
  reloadTimeLeft: number;
  
  /** Cooldown time until next shot can be fired */
  shootCooldown: number;
}

/**
 * Enum representing the different types of projectiles in the game.
 * Used for type identification and specialized behavior.
 */
export enum ProjectileType {
  /** Standard paintball projectile */
  PAINTBALL = 'paintball',
  
  /** Bouncing paintball that can ricochet */
  BOUNCE_BALL = 'bounce_ball',
  
  /** Cluster projectile that splits into multiple projectiles */
  CLUSTER_BALL = 'cluster_ball',
  
  /** Time-delayed projectile that explodes after a delay */
  TIMED_EXPLOSIVE = 'timed_explosive',
  
  /** Smoke or gas projectile that creates a cloud effect */
  SMOKE = 'smoke',
  
  /** Fast-moving sniper projectile with high accuracy */
  SNIPER = 'sniper',
  
  /** Projectile with a trail effect */
  TRACER = 'tracer',
  
  /** Explosive projectile that causes area damage */
  EXPLOSIVE = 'explosive'
} 