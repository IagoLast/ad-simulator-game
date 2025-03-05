import * as THREE from 'three';
import { Obstacle } from '../types';

/**
 * Interface for ad style
 */
export interface AdStyle {
  apply(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, text: string): void;
}

/**
 * Simple ad style - minimalist design
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
    
    // Helper function to measure text and find optimal font size
    const findOptimalFontSize = (text: string, maxWidth: number, initialSize: number): number => {
      let fontSize = initialSize;
      context.font = `bold ${fontSize}px Arial, sans-serif`;
      
      // Reduce font size until text fits
      while (fontSize > 20 && context.measureText(text).width > maxWidth) {
        fontSize -= 5;
        context.font = `bold ${fontSize}px Arial, sans-serif`;
      }
      
      return fontSize;
    };
    
    // Process the text - check if it's a URL
    const isUrl = text.includes('.');
    if (isUrl) {
      // Handle URL formatting
      const parts = text.split('.');
      const domain = parts[0];
      const extension = '.' + parts.slice(1).join('.');
      
      // Calculate optimal font sizes
      const maxWidth = canvas.width * 0.85;
      const domainFontSize = findOptimalFontSize(domain, maxWidth, Math.floor(canvas.width / 8));
      const extensionFontSize = Math.floor(domainFontSize * 0.8); // Slightly smaller extension
      
      // Draw domain
      context.fillStyle = '#000000';
      context.font = `bold ${domainFontSize}px Arial, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(domain, canvas.width / 2, canvas.height / 2 - domainFontSize * 0.6);
      
      // Draw extension
      context.font = `bold ${extensionFontSize}px Arial, sans-serif`;
      context.fillText(extension, canvas.width / 2, canvas.height / 2 + extensionFontSize * 0.6);
    } else {
      // Handle non-URL text - split into words
      const words = text.split(' ');
      
      // For single words or very short text
      if (words.length <= 2 && text.length < 15) {
        const fontSize = findOptimalFontSize(text, canvas.width * 0.85, Math.floor(canvas.width / 8));
        context.fillStyle = '#000000';
        context.font = `bold ${fontSize}px Arial, sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, canvas.width / 2, canvas.height / 2);
      } else {
        // For longer text, break into multiple lines
        const lineHeight = Math.floor(canvas.width / 12); // Initial line height
        const maxWidth = canvas.width * 0.85;
        
        // Set initial font
        context.font = `bold ${lineHeight}px Arial, sans-serif`;
        context.fillStyle = '#000000';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Generate lines that fit within maxWidth
        const lines: string[] = [];
        let currentLine = words[0];
        
        for (let i = 1; i < words.length; i++) {
          const testLine = currentLine + ' ' + words[i];
          const metrics = context.measureText(testLine);
          
          if (metrics.width > maxWidth) {
            lines.push(currentLine);
            currentLine = words[i];
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine);
        
        // Adjust font size if too many lines
        let fontSize = lineHeight;
        if (lines.length > 3) {
          fontSize = Math.floor(lineHeight * (3 / lines.length) * 0.9);
          context.font = `bold ${fontSize}px Arial, sans-serif`;
        }
        
        // Draw lines
        const totalTextHeight = fontSize * lines.length;
        const startY = (canvas.height - totalTextHeight) / 2 + fontSize / 2;
        
        lines.forEach((line, index) => {
          context.fillText(line, canvas.width / 2, startY + index * fontSize);
        });
      }
    }
  }
}

/**
 * Ad class - represents an advertisement frame on a wall
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
    adText: string = 'www.timetime.in',
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
    
    // Set canvas size - higher for better text quality
    canvas.width = 1024; // Increased resolution
    canvas.height = 512; // Increased resolution
    
    // Apply the provided style
    style.apply(context, canvas, adText);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    // Create material with the texture
    const panelMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      side: THREE.DoubleSide,
      emissive: 0x555555, // Add some emissive property to make it more visible
      emissiveIntensity: 0.2
    });
    
    // Create the panel mesh
    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    
    // Create more visible frame around ad
    const frameGeometry = new THREE.BoxGeometry(width + 0.3, height + 0.3, 0.15);
    const frameMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x222222, // Darker frame
      emissive: 0x111111,
      emissiveIntensity: 0.3
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 0, -0.07);
    
    // Create support structure for freestanding ads
    const supportMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x333333 // Dark gray support
    });
    
    // Check if the ad is a wall-mounted type (smaller offset) or freestanding
    const isWallMounted = Math.abs(position.x) % 1 < 0.1 || Math.abs(position.z) % 1 < 0.1;
    
    if (!isWallMounted) {
      // This is a freestanding ad, add support structure
      // Create main post
      const postHeight = height + 0.5; // Slightly taller than the ad
      const postGeometry = new THREE.BoxGeometry(0.3, postHeight, 0.3);
      const post = new THREE.Mesh(postGeometry, supportMaterial);
      post.position.set(0, -height/2, -0.2);
      
      // Create base for stability
      const baseGeometry = new THREE.BoxGeometry(width * 0.8, 0.2, 0.8);
      const base = new THREE.Mesh(baseGeometry, supportMaterial);
      base.position.set(0, -height/2 - postHeight/2 + 0.1, -0.2);
      
      // Add supports to group
      this.mesh.add(post);
      this.mesh.add(base);
    }
    
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
      size: new THREE.Vector3(width, height, 0.5) // Thin depth for wall mounting
    };
    
    // Add shadow properties
    panel.castShadow = true;
    panel.receiveShadow = true;
    frame.castShadow = true;
    frame.receiveShadow = true;
    
    // Add to scene
    scene.add(this.mesh);
    
    // Debug log
    console.log(`Created ad at position (${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}), rotation: ${rotation.toFixed(2)}`);
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