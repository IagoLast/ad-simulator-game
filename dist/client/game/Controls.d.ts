export interface MovementInput {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
}
export declare class Controls {
    private keys;
    constructor();
    private onKeyDown;
    private onKeyUp;
    getMovement(): MovementInput;
    private isKeyPressed;
}
//# sourceMappingURL=Controls.d.ts.map