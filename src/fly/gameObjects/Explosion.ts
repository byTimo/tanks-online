import { Scene } from "phaser";

export class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "explosion");
        scene.add.existing(this);
        this.play("explode");
    }
}