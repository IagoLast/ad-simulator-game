import * as THREE from 'three';
import { Billboard, EntityType } from "../../../shared/types";

export class BillboardClass {
  // Array of vibrant colors for billboards
  private static colors: number[] = [
    0x3498db, // Blue
    0x2ecc71, // Green
    0xe74c3c, // Red
    0xf39c12, // Orange
    0x9b59b6, // Purple
    0x1abc9c, // Teal
    0xd35400, // Dark Orange
    0x27ae60, // Emerald
    0xc0392b, // Dark Red
    0x8e44ad  // Violet
  ];

  /**
   * Get a random color from the colors array
   * @returns Random color as a hex number
   */
  private static getRandomColor(): number {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  /**
   * Create a 3D billboard object
   * @returns THREE.Group representing the billboard
   */
  public static create(data: Billboard): THREE.Group {
    const dimensions = data.dimensions || { width: 5, height: 3, depth: 0.2 };
    const billboardGroup = new THREE.Group();
    
    // Get a random color for this billboard
    const frameColor = this.getRandomColor();
    
    // Billboard structure (frame)
    const frameGeometry = new THREE.BoxGeometry(
      dimensions.width,
      dimensions.height,
      dimensions.depth
    );
    
    // Frame material with random color
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: frameColor,
      roughness: 0.6,
      metalness: 0.3
    });
    
    // Create the billboard frame
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.castShadow = true;
    frame.receiveShadow = true;
    billboardGroup.add(frame);
    
    // Create text on both sides of the billboard
    this.addTextToFace(billboardGroup, data.text, dimensions, frameColor, 1); // Front face
    this.addTextToFace(billboardGroup, data.text, dimensions, frameColor, -1); // Back face
    
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
    billboardGroup.userData.color = frameColor;
    
    return billboardGroup;
  }

  /**
   * Add text to a face of the billboard
   * @param group The group to add the text to
   * @param text The text to display
   * @param dimensions The dimensions of the billboard
   * @param frameColor The color of the billboard frame
   * @param direction 1 for front, -1 for back
   */
  private static addTextToFace(
    group: THREE.Group, 
    text: string, 
    dimensions: { width: number, height: number, depth: number },
    frameColor: number,
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
    
    // Fill background with light color that matches the frame
    const colorObject = new THREE.Color(frameColor);
    const r = Math.round(colorObject.r * 255);
    const g = Math.round(colorObject.g * 255);
    const b = Math.round(colorObject.b * 255);
    
    // Create a lighter version for the background (80% white + 20% frame color)
    const bgR = Math.min(255, r + 200);
    const bgG = Math.min(255, g + 200);
    const bgB = Math.min(255, b + 200);
    const bgColorString = `rgb(${bgR}, ${bgG}, ${bgB})`;
    context.fillStyle = bgColorString;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw border matching the frame color
    const borderWidth = Math.max(2, Math.round(canvas.width * 0.01));
    context.strokeStyle = `rgb(${r}, ${g}, ${b})`;
    context.lineWidth = borderWidth * 2;
    context.strokeRect(borderWidth, borderWidth, canvas.width - borderWidth * 2, canvas.height - borderWidth * 2);
    
    // Set text color to match the frame color for consistency and visibility
    context.fillStyle = `rgb(${r}, ${g}, ${b})`;
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
  
  /**
   * Get the best contrast color (black or white) for a given background color
   * @param r Red component (0-255)
   * @param g Green component (0-255)
   * @param b Blue component (0-255)
   * @returns Color string for contrast
   */
  private static getContrastColor(r: number, g: number, b: number): string {
    // Calculate perceived brightness using the formula: (0.299*R + 0.587*G + 0.114*B)
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
    
    // Use black text for light backgrounds, white text for dark backgrounds
    return brightness > 128 ? 'black' : 'white';
  }
}
