import * as THREE from 'three';
import { PlayerState } from '../../shared/types';
export declare class Player {
    mesh: THREE.Group;
    private playerBody;
    private id;
    private isLocalPlayer;
    private moveSpeed;
    private position;
    private rotation;
    constructor(playerState: PlayerState, isLocalPlayer: boolean);
    updatePosition(position: {
        x: number;
        y: number;
        z: number;
    }): void;
    updateRotation(rotation: {
        y: number;
    }): void;
    move(forward: boolean, backward: boolean, left: boolean, right: boolean, deltaTime: number): void;
    private updateMeshTransform;
    getPosition(): {
        x: number;
        y: number;
        z: number;
    };
    getRotation(): {
        y: number;
    };
}
//# sourceMappingURL=Player.d.ts.map