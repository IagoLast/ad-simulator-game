import * as THREE from 'three';
import { Cube } from '../../../shared/types';

/**
 * 3D representation of a cube entity
 */
export class Cube3D {
  public mesh: THREE.Group;
  private entity: Cube;
  private cubeMesh!: THREE.Mesh;

  /**
   * Create a new cube 3D object
   * @param entity Cube entity data
   */
  constructor(entity: Cube) {
    this.entity = entity;
    this.mesh = new THREE.Group();

    // Create cube with dimensions
    this.createCube(entity);

    // Position the cube
    this.mesh.position.set(
      entity.position.x,
      entity.position.y || entity.dimensions.height / 2, // Default to half height if not specified
      entity.position.z
    );

    // Apply rotation if specified
    if (entity.rotation) {
      this.mesh.rotation.set(
        entity.rotation.x || 0,
        entity.rotation.y || 0,
        entity.rotation.z || 0
      );
    }
  }

  /**
   * Create cube geometry and material
   * @param entity Cube entity data
   */
  private createCube(entity: Cube): void {
    // Create cube geometry with custom dimensions
    const geometry = new THREE.BoxGeometry(
      entity.dimensions.width,
      entity.dimensions.height,
      entity.dimensions.depth
    );
    
    // Create concrete material
    const material = new THREE.MeshStandardMaterial({
      color: 0x888888, // Concrete gray
      roughness: 0.9,
      metalness: 0.1,
    });

    // Create mesh
    this.cubeMesh = new THREE.Mesh(geometry, material);
    
    // Enable shadows
    this.cubeMesh.castShadow = true;
    this.cubeMesh.receiveShadow = true;
    
    // Add mesh to group
    this.mesh.add(this.cubeMesh);
  }
} 