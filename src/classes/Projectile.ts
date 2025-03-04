import * as THREE from 'three';
import { PROJECTILE_GRAVITY } from '../physics';

export class Projectile {
  public mesh: THREE.Mesh;
  public velocity: THREE.Vector3;
  public isActive: boolean = true;
  public color: number;
  public lifespan: number = 2; // Seconds before disappearing
  public damage: number = 10;
  private trail: THREE.Points | null = null;
  
  constructor(
    position: THREE.Vector3, 
    direction: THREE.Vector3,
    scene: THREE.Scene,
    color: number = 0xff0000, // Red by default
    speed: number = 50
  ) {
    // Create paintball sphere
    const geometry = new THREE.SphereGeometry(0.15, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    this.color = color;
    
    // Set velocity based on direction and speed
    this.velocity = direction.normalize().multiplyScalar(speed);
    
    // Add optional trail effect
    this.createTrail(scene);
    
    // Add to scene
    scene.add(this.mesh);
  }
  
  public update(delta: number): void {
    if (!this.isActive) return;
    
    // Apply gravity to velocity - using projectile-specific gravity
    this.velocity.y -= PROJECTILE_GRAVITY * delta;
    
    // Update position based on velocity
    this.mesh.position.x += this.velocity.x * delta;
    this.mesh.position.y += this.velocity.y * delta;
    this.mesh.position.z += this.velocity.z * delta;
    
    // Update trail if exists
    this.updateTrail();
    
    // Decrease lifespan
    this.lifespan -= delta;
    if (this.lifespan <= 0) {
      this.deactivate();
    }
  }
  
  private createTrail(scene: THREE.Scene): void {
    // Create a simple particle trail
    const trailGeometry = new THREE.BufferGeometry();
    const trailMaterial = new THREE.PointsMaterial({
      color: this.color,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
    
    // Set initial positions (just the projectile position)
    const positions = new Float32Array(30 * 3); // Store up to 10 trail points
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Set initial count to 0
    trailGeometry.setDrawRange(0, 0);
    
    this.trail = new THREE.Points(trailGeometry, trailMaterial);
    scene.add(this.trail);
  }
  
  private updateTrail(): void {
    if (!this.trail) return;
    
    const positions = (this.trail.geometry.attributes.position as THREE.BufferAttribute).array;
    const maxTrailPoints = 10;
    
    // Shift positions
    for (let i = maxTrailPoints - 1; i > 0; i--) {
      const targetIdx = i * 3;
      const sourceIdx = (i - 1) * 3;
      
      positions[targetIdx] = positions[sourceIdx];
      positions[targetIdx + 1] = positions[sourceIdx + 1];
      positions[targetIdx + 2] = positions[sourceIdx + 2];
    }
    
    // Add current position
    positions[0] = this.mesh.position.x;
    positions[1] = this.mesh.position.y;
    positions[2] = this.mesh.position.z;
    
    // Update trail geometry
    (this.trail.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    
    // Update draw range
    const currentCount = this.trail.geometry.drawRange.count;
    if (currentCount < maxTrailPoints) {
      this.trail.geometry.setDrawRange(0, currentCount + 1);
    }
  }
  
  public deactivate(): void {
    this.isActive = false;
  }
  
  public getPosition(): THREE.Vector3 {
    return this.mesh.position;
  }
  
  public getRadius(): number {
    return 0.15; // Same as sphere radius
  }
  
  public remove(scene: THREE.Scene): void {
    scene.remove(this.mesh);
    
    // Remove trail
    if (this.trail) {
      scene.remove(this.trail);
      (this.trail.geometry as THREE.BufferGeometry).dispose();
      (this.trail.material as THREE.Material).dispose();
      this.trail = null;
    }
    
    // Help garbage collection
    (this.mesh.geometry as THREE.BufferGeometry).dispose();
    (this.mesh.material as THREE.Material).dispose();
  }
} 