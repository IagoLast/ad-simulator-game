export declare class Game {
    private scene;
    private camera;
    private renderer;
    private socket;
    private players;
    private localPlayer;
    private controls;
    private lastUpdateTime;
    private playerCount;
    private ground;
    constructor();
    start(): void;
    private setupSocketEvents;
    private createPlayer;
    private updatePlayerCount;
    private onWindowResize;
    private animate;
}
//# sourceMappingURL=Game.d.ts.map