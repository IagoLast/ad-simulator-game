import * as THREE from 'three';
import { Billboard, EntityType } from "../../../shared/types";

export class BillboardClass {
  /**
   * Create a 3D billboard object
   * @returns THREE.Group representing the billboard
   */
  public static create(data: Billboard): THREE.Group {
    const dimensions = data.dimensions || { width: 5, height: 3, depth: 0.2 };
    const billboardGroup = new THREE.Group();
    
    // Billboard structure (frame)
    const frameGeometry = new THREE.BoxGeometry(
      dimensions.width,
      dimensions.height,
      dimensions.depth
    );
    
    // Frame material
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333, // Dark gray
      roughness: 0.6,
      metalness: 0.3
    });
    
    // Create the billboard frame
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.castShadow = true;
    frame.receiveShadow = true;
    billboardGroup.add(frame);
    
    // Create text on both sides of the billboard
    this.addTextToFace(billboardGroup, data.text, dimensions, 1); // Front face
    this.addTextToFace(billboardGroup, data.text, dimensions, -1); // Back face
    
    // Set position
    billboardGroup.position.set(
      data.position.x,
      data.position.y,
      data.position.z
    );
    
    // Apply rotation if provided
    if (data.rotation) {
      billboardGroup.rotation.set(
        data.rotation.x || 0,
        data.rotation.y || 0,
        data.rotation.z || 0
      );
    }
    
    // Set name for later identification
    billboardGroup.name = 'billboard';
    
    // Add to userData for collision detection
    billboardGroup.userData.type = EntityType.BILLBOARD;
    billboardGroup.userData.isCollidable = true;
    billboardGroup.userData.text = data.text;
    
    return billboardGroup;
  }

  /**
   * Add text to a face of the billboard
   * @param group The group to add the text to
   * @param text The text to display
   * @param dimensions The dimensions of the billboard
   * @param direction 1 for front, -1 for back
   */
  private static addTextToFace(
    group: THREE.Group, 
    text: string, 
    dimensions: { width: number, height: number, depth: number },
    direction: number
  ): void {
    // Create canvas with correct aspect ratio
    const canvas = document.createElement('canvas');
    const aspectRatio = dimensions.width / dimensions.height;
    
    // Fixed resolution with correct aspect ratio
    canvas.width = 1024;
    canvas.height = Math.round(1024 / aspectRatio);
    
    // Get context
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Fill white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw simple border
    const borderWidth = Math.max(2, Math.round(canvas.width * 0.01));
    context.strokeStyle = 'black';
    context.lineWidth = borderWidth;
    context.strokeRect(borderWidth, borderWidth, canvas.width - borderWidth * 2, canvas.height - borderWidth * 2);
    
    // Set text properties
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Calculate the maximum size the text can be
    const maxWidth = canvas.width * 0.8;
    let fontSize = Math.min(canvas.width, canvas.height) * 0.2;
    
    // Adjust font size to fit text
    context.font = `bold ${fontSize}px Arial`;
    
    // Check if text is too wide and reduce font size until it fits
    let textWidth = context.measureText(text).width;
    while (textWidth > maxWidth && fontSize > 12) {
      fontSize *= 0.9;
      context.font = `bold ${fontSize}px Arial`;
      textWidth = context.measureText(text).width;
    }
    
    // Draw text centered
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // Create texture with improved quality settings
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    
    // Create material with the texture
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.FrontSide
    });
    
    // Create plane for text display
    const textPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(dimensions.width - 0.1, dimensions.height - 0.1),
      material
    );
    
    // Position and rotate correctly
    textPlane.position.z = (dimensions.depth / 2 + 0.01) * direction;
    if (direction === -1) {
      textPlane.rotation.y = Math.PI;
    }
    
    group.add(textPlane);
  }
}
