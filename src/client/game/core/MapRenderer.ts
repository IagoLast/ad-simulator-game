import * as THREE from 'three';
import { Billboard, EntityType, Flag, MapData, MapEntity } from '../../../shared/types';

/**
 * MapRenderer class for rendering map entities like walls and exits
 */
export class MapRenderer {
  private scene: THREE.Scene;
  private mapEntities: THREE.Object3D[] = [];
  private flagObject: THREE.Object3D | null = null;
  
  /**
   * Create a new MapRenderer
   * @param scene THREE.js scene to add map objects to
   */
  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }
  
  /**
   * Render map data received from the server
   * @param mapData Map data containing walls and exits
   */
  public renderMap(mapData: MapData): void {
    // Clear any existing map entities
    this.clearMap();
    
    // Create new map entities
    if (mapData.entities) {
      mapData.entities.forEach(entity => {
        const object = this.createEntity(entity);
        if (object) {
          this.scene.add(object);
          this.mapEntities.push(object);
          
          // Store reference to flag object if it's a flag
          if (entity.type === EntityType.FLAG) {
            this.flagObject = object;
          }
        }
      });
    }
    
    // Add a ground plane
    this.addGround(mapData.width, mapData.height);
  }
  
  /**
   * Get the flag object for collision detection
   */
  public getFlag(): THREE.Object3D | null {
    return this.flagObject;
  }
  
  /**
   * Remove the flag from the scene (when captured)
   */
  public removeFlag(): void {
    if (this.flagObject) {
      this.scene.remove(this.flagObject);
      const index = this.mapEntities.indexOf(this.flagObject);
      if (index > -1) {
        this.mapEntities.splice(index, 1);
      }
      this.flagObject = null;
    }
  }
  
  /**
   * Clear all map entities from the scene
   */
  public clearMap(): void {
    // Remove all map entities from the scene
    this.mapEntities.forEach(entity => {
      this.scene.remove(entity);
      
      // Type casting to access geometry and material properties
      const mesh = entity as THREE.Mesh;
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }
      
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(material => material.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });
    
    this.mapEntities = [];
  }
  
  /**
   * Create a 3D object for a map entity
   * @param entity Map entity data
   * @returns THREE.Object3D representing the entity
   */
  private createEntity(entity: MapEntity): THREE.Object3D | null {
    switch (entity.type) {
      case EntityType.WALL:
        return this.createWall(entity);
      case EntityType.EXIT:
        return this.createExit(entity);
      case EntityType.BILLBOARD:
        return this.createBillboard(entity as Billboard);
      case EntityType.FLAG:
        return this.createFlag(entity as Flag);
      default:
        console.warn(`Unknown entity type: ${entity.type}`);
        return null;
    }
  }
  
  /**
   * Create a wall object
   * @param entity Wall entity data
   * @returns THREE.Mesh representing the wall
   */
  private createWall(entity: MapEntity): THREE.Mesh {
    const dimensions = entity.dimensions || { width: 1, height: 3, depth: 1 };
    const geometry = new THREE.BoxGeometry(
      dimensions.width,
      dimensions.height,
      dimensions.depth
    );
    
    const material = new THREE.MeshStandardMaterial({
      color: 0x808080, // Gray
      roughness: 0.7,
      metalness: 0.2
    });
    
    const wall = new THREE.Mesh(geometry, material);
    wall.position.set(
      entity.position.x,
      entity.position.y,
      entity.position.z
    );
    
    // Apply rotation if provided
    if (entity.rotation) {
      wall.rotation.set(
        entity.rotation.x || 0,
        entity.rotation.y || 0,
        entity.rotation.z || 0
      );
    }
    
    // Enable shadows
    wall.castShadow = true;
    wall.receiveShadow = true;
    
    // Set name for later identification
    wall.name = 'wall';
    
    // Add to userData for collision detection
    wall.userData.type = EntityType.WALL;
    wall.userData.isCollidable = true;
    
    return wall;
  }
  
  /**
   * Create an exit object
   * @param entity Exit entity data
   * @returns THREE.Mesh representing the exit
   */
  private createExit(entity: MapEntity): THREE.Mesh {
    const dimensions = entity.dimensions || { width: 2, height: 0.1, depth: 2 };
    const geometry = new THREE.BoxGeometry(
      dimensions.width,
      dimensions.height,
      dimensions.depth
    );
    
    // Color based on team (red for team 1, blue for team 2)
    const color = entity.teamId === 1 ? 0xff0000 : 0x0000ff;
    
    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7,
      emissive: color,
      emissiveIntensity: 0.5
    });
    
    const exit = new THREE.Mesh(geometry, material);
    exit.position.set(
      entity.position.x,
      entity.position.y,
      entity.position.z
    );
    
    // Receive shadows
    exit.receiveShadow = true;
    
    // Set name for later identification
    exit.name = 'exit';
    
    // Add to userData for interaction detection
    exit.userData.type = EntityType.EXIT;
    exit.userData.teamId = entity.teamId;
    exit.userData.isCollidable = false;
    
    return exit;
  }
  
  /**
   * Create a billboard object with text
   * @param entity Billboard entity data
   * @returns THREE.Group representing the billboard with text
   */
  private createBillboard(entity: Billboard): THREE.Group {
    const dimensions = entity.dimensions || { width: 5, height: 3, depth: 0.2 };
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
    this.addTextToFace(billboardGroup, entity.text, dimensions, 1); // Front face
    this.addTextToFace(billboardGroup, entity.text, dimensions, -1); // Back face
    
    // Set position
    billboardGroup.position.set(
      entity.position.x,
      entity.position.y,
      entity.position.z
    );
    
    // Apply rotation if provided
    if (entity.rotation) {
      billboardGroup.rotation.set(
        entity.rotation.x || 0,
        entity.rotation.y || 0,
        entity.rotation.z || 0
      );
    }
    
    // Set name for later identification
    billboardGroup.name = 'billboard';
    
    // Add to userData for collision detection
    billboardGroup.userData.type = EntityType.BILLBOARD;
    billboardGroup.userData.isCollidable = true;
    billboardGroup.userData.text = entity.text;
    
    return billboardGroup;
  }
  
  /**
   * Add text to a face of the billboard
   * @param group The group to add the text to
   * @param text The text to display
   * @param dimensions The dimensions of the billboard
   * @param direction 1 for front, -1 for back
   */
  private addTextToFace(
    group: THREE.Group, 
    text: string, 
    dimensions: { width: number, height: number, depth: number },
    direction: number
  ): void {
    // Create canvas for dynamic text rendering
    const canvas = document.createElement('canvas');
    const textureSize = 512;
    canvas.width = textureSize;
    canvas.height = textureSize;
    
    // Get 2D context and configure
    const context = canvas.getContext('2d');
    if (context) {
      // Clear background
      context.fillStyle = 'white';
      context.fillRect(0, 0, textureSize, textureSize);
      
      // Draw border
      context.strokeStyle = 'black';
      context.lineWidth = 8;
      context.strokeRect(10, 10, textureSize - 20, textureSize - 20);
      
      // Configure text
      context.fillStyle = 'black';
      const fontSize = 48;
      context.font = `bold ${fontSize}px Arial`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // Calculate text position and break into lines if needed
      const maxLineWidth = textureSize - 40;
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      
      words.forEach(word => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const metrics = context.measureText(testLine);
        
        if (metrics.width > maxLineWidth && currentLine !== '') {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      
      if (currentLine) {
        lines.push(currentLine);
      }
      
      // Draw text lines
      const lineHeight = fontSize * 1.2;
      const totalTextHeight = lineHeight * lines.length;
      const startY = (textureSize - totalTextHeight) / 2 + lineHeight / 2;
      
      lines.forEach((line, index) => {
        context.fillText(line, textureSize / 2, startY + index * lineHeight);
      });
    }
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    // Create material with the texture
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: false,
      side: THREE.FrontSide
    });
    
    // Create plane for text display
    const planeGeometry = new THREE.PlaneGeometry(
      dimensions.width - 0.1,
      dimensions.height - 0.1
    );
    
    const textPlane = new THREE.Mesh(planeGeometry, material);
    textPlane.position.z = (dimensions.depth / 2 + 0.01) * direction; // Position just in front of the frame
    
    // Flip text for back face to read correctly
    if (direction === -1) {
      textPlane.rotation.y = Math.PI;
    }
    
    group.add(textPlane);
  }
  
  /**
   * Add a ground plane to the scene
   * @param width Width of the ground
   * @param height Height of the ground
   */
  private addGround(width: number, height: number): void {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8,
      metalness: 0.2
    });
    
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    ground.position.y = 0;
    
    // Enable shadows
    ground.receiveShadow = true;
    
    // Set name for later identification
    ground.name = 'ground';
    
    this.scene.add(ground);
    this.mapEntities.push(ground);
  }
  
  /**
   * Create a flag object
   * @param entity Flag entity data
   * @returns THREE.Group representing the flag
   */
  private createFlag(entity: Flag): THREE.Group {
    const flagGroup = new THREE.Group();
    const dimensions = entity.dimensions || { width: 1.5, height: 2, depth: 0.1 };
    
    // Create flag pole (cylinder)
    const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, dimensions.height, 8);
    const poleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513, // Brown
      metalness: 0.3,
      roughness: 0.8
    });
    
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.y = dimensions.height / 2;
    flagGroup.add(pole);
    
    // Create flag (rectangular plane)
    const flagGeometry = new THREE.PlaneGeometry(dimensions.width, dimensions.height * 0.5);
    const flagMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFD700, // Gold
      side: THREE.DoubleSide,
      emissive: 0xFFD700,
      emissiveIntensity: 0.3
    });
    
    const flag = new THREE.Mesh(flagGeometry, flagMaterial);
    flag.position.set(dimensions.width * 0.4, dimensions.height * 0.7, 0);
    flagGroup.add(flag);
    
    // Add a small sphere on top of the pole
    const topSphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const topSphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xE0E0E0, // Light gray
      metalness: 0.8,
      roughness: 0.2
    });
    
    const topSphere = new THREE.Mesh(topSphereGeometry, topSphereMaterial);
    topSphere.position.y = dimensions.height;
    flagGroup.add(topSphere);
    
    // Set the overall position
    flagGroup.position.set(
      entity.position.x,
      entity.position.y,
      entity.position.z
    );
    
    // Add to userData for collision detection
    flagGroup.userData.type = EntityType.FLAG;
    flagGroup.userData.isCollidable = false; // Not for wall collision but for player interaction
    flagGroup.userData.isFlag = true;
    
    // Enable shadows
    flagGroup.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    
    // Add animation to make the flag wave
    this.addFlagWaveAnimation(flag);
    
    return flagGroup;
  }
  
  /**
   * Add waving animation to the flag
   * @param flagMesh The flag mesh to animate
   */
  private addFlagWaveAnimation(flagMesh: THREE.Mesh): void {
    // Create vertices for the flag (we need to modify these for the animation)
    const geometry = flagMesh.geometry as THREE.PlaneGeometry;
    
    // Store original positions to animate from
    const originalVertices: THREE.Vector3[] = [];
    const positions = geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      originalVertices.push(new THREE.Vector3(
        positions[i], 
        positions[i + 1], 
        positions[i + 2]
      ));
    }
    
    // Animation function to be called every frame
    const animate = () => {
      const time = Date.now() * 0.002;
      
      // Update vertices to create a wave effect
      for (let i = 0; i < originalVertices.length; i++) {
        const vertex = originalVertices[i];
        const pos = geometry.attributes.position;
        
        // Only apply wave to vertices away from the pole (right side)
        if (vertex.x > 0) {
          // Create a wave effect based on distance from pole and time
          const waveX = Math.sin(time + vertex.y) * 0.1 * (vertex.x / 2);
          const waveZ = Math.cos(time + vertex.y) * 0.05 * (vertex.x / 2);
          
          pos.setXYZ(
            i,
            vertex.x + waveX,
            vertex.y,
            vertex.z + waveZ
          );
        }
      }
      
      geometry.attributes.position.needsUpdate = true;
      requestAnimationFrame(animate);
    };
    
    // Start the animation
    animate();
  }
} 