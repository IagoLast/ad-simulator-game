import * as THREE from 'three';

export class WorldBounds {
  // Límites del mundo de juego
  private minX: number;
  private maxX: number;
  private minZ: number;
  private maxZ: number;
  private wallHeight: number = 10;
  
  // Meshes para visualización en modo debug
  private walls: THREE.Mesh[] = [];
  private debugMode: boolean = false;
  
  constructor(size: number = 100, scene?: THREE.Scene) {
    // Definir límites como un cuadrado centrado en el origen
    this.minX = -size / 2;
    this.maxX = size / 2;
    this.minZ = -size / 2;
    this.maxZ = size / 2;
    
    // Si se proporciona una escena, crear paredes invisibles para debug
    if (scene && this.debugMode) {
      this.createDebugWalls(scene);
    }
  }
  
  // Restringir una posición para que esté dentro de los límites
  public clampPosition(position: THREE.Vector3): THREE.Vector3 {
    position.x = Math.max(this.minX, Math.min(this.maxX, position.x));
    position.z = Math.max(this.minZ, Math.min(this.maxZ, position.z));
    return position;
  }
  
  // Verificar si una posición está dentro de los límites
  public isInBounds(position: THREE.Vector3): boolean {
    return (
      position.x >= this.minX && 
      position.x <= this.maxX && 
      position.z >= this.minZ && 
      position.z <= this.maxZ
    );
  }
  
  // Obtener la distancia al borde más cercano
  public getDistanceToBorder(position: THREE.Vector3): number {
    const distToMinX = Math.abs(position.x - this.minX);
    const distToMaxX = Math.abs(position.x - this.maxX);
    const distToMinZ = Math.abs(position.z - this.minZ);
    const distToMaxZ = Math.abs(position.z - this.maxZ);
    
    return Math.min(distToMinX, distToMaxX, distToMinZ, distToMaxZ);
  }
  
  // Obtener la normal hacia el interior en el punto de colisión con el borde
  public getBorderNormal(position: THREE.Vector3): THREE.Vector3 {
    const normal = new THREE.Vector3(0, 0, 0);
    
    // Determinar qué borde está más cerca y calcular la normal
    if (Math.abs(position.x - this.minX) <= Math.abs(position.x - this.maxX) &&
        Math.abs(position.x - this.minX) <= Math.abs(position.z - this.minZ) &&
        Math.abs(position.x - this.minX) <= Math.abs(position.z - this.maxZ)) {
      // Borde izquierdo (minX)
      normal.set(1, 0, 0);
    } else if (Math.abs(position.x - this.maxX) <= Math.abs(position.z - this.minZ) &&
               Math.abs(position.x - this.maxX) <= Math.abs(position.z - this.maxZ)) {
      // Borde derecho (maxX)
      normal.set(-1, 0, 0);
    } else if (Math.abs(position.z - this.minZ) <= Math.abs(position.z - this.maxZ)) {
      // Borde inferior (minZ)
      normal.set(0, 0, 1);
    } else {
      // Borde superior (maxZ)
      normal.set(0, 0, -1);
    }
    
    return normal;
  }
  
  // Método para visualizar los límites (solo para debug)
  private createDebugWalls(scene: THREE.Scene): void {
    const wallMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    
    // Pared izquierda (minX)
    const leftWallGeometry = new THREE.PlaneGeometry(
      Math.abs(this.maxZ - this.minZ), 
      this.wallHeight
    );
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(this.minX, this.wallHeight / 2, (this.minZ + this.maxZ) / 2);
    leftWall.rotation.y = Math.PI / 2;
    scene.add(leftWall);
    this.walls.push(leftWall);
    
    // Pared derecha (maxX)
    const rightWallGeometry = new THREE.PlaneGeometry(
      Math.abs(this.maxZ - this.minZ), 
      this.wallHeight
    );
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.set(this.maxX, this.wallHeight / 2, (this.minZ + this.maxZ) / 2);
    rightWall.rotation.y = -Math.PI / 2;
    scene.add(rightWall);
    this.walls.push(rightWall);
    
    // Pared trasera (minZ)
    const backWallGeometry = new THREE.PlaneGeometry(
      Math.abs(this.maxX - this.minX), 
      this.wallHeight
    );
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set((this.minX + this.maxX) / 2, this.wallHeight / 2, this.minZ);
    scene.add(backWall);
    this.walls.push(backWall);
    
    // Pared frontal (maxZ)
    const frontWallGeometry = new THREE.PlaneGeometry(
      Math.abs(this.maxX - this.minX), 
      this.wallHeight
    );
    const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
    frontWall.position.set((this.minX + this.maxX) / 2, this.wallHeight / 2, this.maxZ);
    frontWall.rotation.y = Math.PI;
    scene.add(frontWall);
    this.walls.push(frontWall);
  }
  
  // Getters para los límites
  public getMinX(): number { return this.minX; }
  public getMaxX(): number { return this.maxX; }
  public getMinZ(): number { return this.minZ; }
  public getMaxZ(): number { return this.maxZ; }
  
  // Remover las paredes de debug
  public removeDebugWalls(scene: THREE.Scene): void {
    for (const wall of this.walls) {
      scene.remove(wall);
      if (wall.geometry) {
        wall.geometry.dispose();
      }
      if (wall.material) {
        (wall.material as THREE.Material).dispose();
      }
    }
    this.walls = [];
  }
  
  // Método para aplicar una restricción gradual de velocidad al acercarse al borde
  public applyBorderSlowdown(position: THREE.Vector3, velocity: THREE.Vector3, borderDistance: number = 5): void {
    // Calcular la distancia a cada borde
    const distToMinX = Math.abs(position.x - this.minX);
    const distToMaxX = Math.abs(position.x - this.maxX);
    const distToMinZ = Math.abs(position.z - this.minZ);
    const distToMaxZ = Math.abs(position.z - this.maxZ);
    
    // Aplicar slowdown en X
    if (distToMinX < borderDistance && velocity.x < 0) {
      // Cerca del borde izquierdo y moviéndose hacia él
      const factor = distToMinX / borderDistance;
      velocity.x *= factor;
    } else if (distToMaxX < borderDistance && velocity.x > 0) {
      // Cerca del borde derecho y moviéndose hacia él
      const factor = distToMaxX / borderDistance;
      velocity.x *= factor;
    }
    
    // Aplicar slowdown en Z
    if (distToMinZ < borderDistance && velocity.z < 0) {
      // Cerca del borde inferior y moviéndose hacia él
      const factor = distToMinZ / borderDistance;
      velocity.z *= factor;
    } else if (distToMaxZ < borderDistance && velocity.z > 0) {
      // Cerca del borde superior y moviéndose hacia él
      const factor = distToMaxZ / borderDistance;
      velocity.z *= factor;
    }
  }
} 