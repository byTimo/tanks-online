import { GameObjects, Scene, Physics } from "phaser";

export class Beam extends Physics.Arcade.Sprite {
    constructor(scene: Scene, player: GameObjects.Components.Transform, projectiles: GameObjects.Group) {
        const { x, y } = player;
        super(scene, x, y, "beam");
        scene.add.existing(this);
        projectiles.add(this);

        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = - 250;
    }

    update() {
        if (this.y < 32) {
            this.destroy();
        }
    }
}