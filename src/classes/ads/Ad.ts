import * as THREE from 'three';
import { Obstacle } from '../../types';

/**
 * Interface for ad style
 */
export interface AdStyle {
  apply(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, text: string): void;
}

/**
 * Simple ad style - minimalist design with just text and a frame
 */
export class SimpleAdStyle implements AdStyle {
  apply(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, text: string): void {
    // Fill background
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add border
    context.strokeStyle = '#000000';
    context.lineWidth = 8;
    context.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
    
    // Draw text
    const fontSize = Math.floor(canvas.width / 10);
    context.fillStyle = '#000000';
    context.font = `bold ${fontSize}px Arial, sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  }
}

/**
 * Ad class - represents a simple advertisement with text and frame
 */
export class Ad {
  public mesh: THREE.Group;
  public collider: {
    position: THREE.Vector3;
    size: THREE.Vector3;
  };

  /**
   * Create a new ad
   * @param scene THREE.js scene to add the ad to
   * @param position Position of the ad
   * @param rotation Y-axis rotation of the ad
   * @param adText Text to display in the ad
   * @param width Width of the ad frame
   * @param height Height of the ad frame
   * @param style Style to apply to the ad
   */
  constructor(
    scene: THREE.Scene,
    position: THREE.Vector3,
    rotation: number,
    adText: string = 'Advertisement',
    width: number = 3,
    height: number = 2,
    style: AdStyle = new SimpleAdStyle()
  ) {
    // Create a group to hold all ad components
    this.mesh = new THREE.Group();
    
    // Create the ad panel
    const panelGeometry = new THREE.PlaneGeometry(width, height);
    
    // Create canvas for the texture
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not create canvas context');
    
    // Set canvas size
    canvas.width = 512;
    canvas.height = 256;
    
    // Apply the provided style
    style.apply(context, canvas, adText);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    // Create material with the texture
    const panelMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    
    // Create the panel mesh
    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    
    // Create frame around ad
    const frameGeometry = new THREE.BoxGeometry(width + 0.2, height + 0.2, 0.1);
    const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 0, -0.05);
    
    // Add elements to group
    this.mesh.add(frame);
    this.mesh.add(panel);
    
    // Move panel slightly forward to avoid z-fighting
    panel.position.z = 0.01;
    
    // Set position and rotation
    this.mesh.position.copy(position);
    this.mesh.rotation.y = rotation;
    
    // Setup collider for the ad
    this.collider = {
      position: new THREE.Vector3(position.x, position.y, position.z),
      size: new THREE.Vector3(width, height, 0.2)
    };
    
    // Add shadow properties
    panel.castShadow = true;
    panel.receiveShadow = true;
    frame.castShadow = true;
    frame.receiveShadow = true;
    
    // Add to scene
    scene.add(this.mesh);
  }
  
  /**
   * Convert to an Obstacle type for collision system
   */
  public toObstacle(): Obstacle {
    return {
      mesh: this.mesh as unknown as THREE.Mesh, // Type cast for compatibility
      collider: this.collider
    };
  }
} 