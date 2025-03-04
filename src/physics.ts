import * as THREE from 'three';
import { Collider, Obstacle, CollisionResult } from './types';

/**
 * Gravity applied to projectiles in units per second squared
 */
export const PROJECTILE_GRAVITY = 9.8;

/**
 * Physics constants for the game world
 */
export const PHYSICS = {
  GRAVITY: 9.8,
  PLAYER_JUMP_FORCE: 5,
  PLAYER_MOVE_SPEED: 10,
  PLAYER_AIR_MOVE_MULTIPLIER: 0.5
};

// Physics constants
export const GRAVITY = 20.0;
export const JUMP_FORCE = 10.0;
export const MOVEMENT_SPEED = 60.0;
export const AIR_CONTROL = 0.3; // Air control factor (0-1)
export const FRICTION = 0.9; // Ground friction (0-1)

/**
 * Check collision between a capsule (player) and box (obstacle)
 */
export function checkCapsuleBoxCollision(
  capsule: Collider,
  box: Obstacle
): CollisionResult {
  // Get box dimensions and position from the mesh
  const boxSize = box.collider.size;
  const boxPosition = box.collider.position;
  
  // First check if the capsule's center is within box bounds on the x-z plane
  const playerX = capsule.position.x;
  const playerZ = capsule.position.z;
  
  // Calculate distances from capsule center to box edges on the x-z plane
  const dx = Math.max(
    Math.abs(playerX - boxPosition.x) - (boxSize.x / 2 + capsule.radius),
    0
  );
  const dz = Math.max(
    Math.abs(playerZ - boxPosition.z) - (boxSize.z / 2 + capsule.radius),
    0
  );
  
  // If either dx or dz is > 0, there's no collision on the x-z plane
  if (dx > 0 || dz > 0) {
    return { collided: false };
  }
  
  // Now check vertical collision
  // Calculate top and bottom of capsule
  const capsuleBottom = capsule.position.y - capsule.height / 2;
  const capsuleTop = capsule.position.y + capsule.height / 2;
  
  // Calculate top and bottom of box
  const boxBottom = boxPosition.y - boxSize.y / 2;
  const boxTop = boxPosition.y + boxSize.y / 2;
  
  // Check if capsule overlaps box vertically
  if (capsuleBottom > boxTop || capsuleTop < boxBottom) {
    return { collided: false };
  }
  
  // Calculate penetration vector
  const penetration = new THREE.Vector3();
  
  // Determine the smallest axis of penetration
  const penetrationX = boxSize.x / 2 + capsule.radius - Math.abs(playerX - boxPosition.x);
  const penetrationZ = boxSize.z / 2 + capsule.radius - Math.abs(playerZ - boxPosition.z);
  
  // Use the axis with the smallest penetration
  if (penetrationX < penetrationZ) {
    penetration.x = penetrationX * (playerX > boxPosition.x ? 1 : -1);
  } else {
    penetration.z = penetrationZ * (playerZ > boxPosition.z ? 1 : -1);
  }
  
  return {
    collided: true,
    penetration
  };
}

/**
 * Check if the player is on the ground
 */
export function isOnGround(playerY: number, groundY: number, threshold: number = 0.1): boolean {
  return playerY <= groundY + threshold;
}

/**
 * Apply friction to velocity
 */
export function applyFriction(velocity: THREE.Vector3, friction: number): void {
  velocity.x *= friction;
  velocity.z *= friction;
} 