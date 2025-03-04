import * as THREE from 'three';
import { Obstacle } from '../types';

// Interface for billboard style
export interface BillboardStyle {
  apply(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, text: string): void;
}

// Generic billboard style - the only style we'll use now
export class GenericBillboardStyle implements BillboardStyle {
  apply(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, text: string): void {
    // Fill background
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add border
    context.strokeStyle = '#000000';
    context.lineWidth = 8;
    context.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
    
    // Add text
    const fontSize = Math.floor(canvas.width / 10);
    context.fillStyle = '#000000';
    context.font = `bold ${fontSize}px Arial, sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  }
}

export class Billboard {
  public mesh: THREE.Group;
  public collider: {
    position: THREE.Vector3;
    size: THREE.Vector3;
  };

  constructor(
    scene: THREE.Scene,
    position: THREE.Vector3,
    rotation: number,
    adText: string = 'www.timetime.in',
    width: number = 5,
    height: number = 3,
    style: BillboardStyle = new GenericBillboardStyle() // Default and only style
  ) {
    // Create a group to hold all billboard components
    this.mesh = new THREE.Group();
    
    // Create the billboard panel (main sign)
    const panelGeometry = new THREE.PlaneGeometry(width, height);
    
    // Create canvas for the texture
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not create canvas context');
    
    // Set canvas size - higher for better text quality
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
    
    // Create supporting posts
    const postGeometry = new THREE.BoxGeometry(0.3, height + 1, 0.3);
    const postMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 }); // Brown
    
    const leftPost = new THREE.Mesh(postGeometry, postMaterial);
    leftPost.position.set(-width / 2 + 0.15, -height / 2 - 0.5, 0);
    
    const rightPost = new THREE.Mesh(postGeometry, postMaterial);
    rightPost.position.set(width / 2 - 0.15, -height / 2 - 0.5, 0);
    
    // Add elements to group
    this.mesh.add(panel);
    this.mesh.add(leftPost);
    this.mesh.add(rightPost);
    
    // Set position and rotation
    this.mesh.position.copy(position);
    this.mesh.rotation.y = rotation;
    
    // Setup collider for the whole billboard
    this.collider = {
      position: new THREE.Vector3(position.x, position.y, position.z),
      size: new THREE.Vector3(width, height, 1.5) // Increased depth for better collision detection
    };
    
    // Add cast and receive shadows
    panel.castShadow = true;
    panel.receiveShadow = true;
    leftPost.castShadow = true;
    leftPost.receiveShadow = true;
    rightPost.castShadow = true;
    rightPost.receiveShadow = true;
    
    // Add to scene
    scene.add(this.mesh);
  }
  
  // Convert to an Obstacle type for collision system
  public toObstacle(): Obstacle {
    return {
      mesh: this.mesh as unknown as THREE.Mesh, // Type cast for compatibility
      collider: this.collider
    };
  }
} 