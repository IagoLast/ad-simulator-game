import { Weapon, WeaponType } from '../../../shared/types';

/**
 * Paintball gun implementation
 */
export class PaintballGun implements Weapon {
  public type: WeaponType = WeaponType.PAINTBALL_GUN;
  public damage: number = 1; // 1 damage per hit (3 hits to kill)
  public fireRate: number = 2; // 2 shots per second
  public projectileSpeed: number = 30; // Units per second
  public lastFired: number = 0;
  public ammo: number = -1; // Infinite ammo
  public maxAmmo: number = -1;
  
  constructor() {
    // Initialize weapon
    this.lastFired = Date.now();
  }
} 