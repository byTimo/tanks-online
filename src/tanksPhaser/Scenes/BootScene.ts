import { Scene } from "phaser";
import { tank } from "../Images";

export class BootScene extends Scene {
    constructor() {
        super("boot");
    }

    public preload(): void {
        this.load.image(tank.body.red.key, tank.body.red.url);
        this.load.image(tank.barrel.red.key, tank.barrel.red.url);
    }

    public create() {
        this.scene.start("test");
    }
}