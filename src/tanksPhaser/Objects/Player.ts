import { Scene, GameObjects, Types, Physics, Utils, Math, Geom } from "phaser";
import { tank } from "../Images";
import { TanksGameObject, mock } from "./Types";

export class Player implements TanksGameObject {
    public image: Physics.Arcade.Image = mock;
    public keys: Types.Input.Keyboard.CursorKeys = mock;
    private body: Physics.Arcade.Body = mock;

    constructor(public scene: Scene) {
    }

    public create(): void {
        this.image = this.scene.physics.add.image(0, 0, tank.body.red.key) as any;
        this.body = this.image.body as Physics.Arcade.Body;
        this.keys = this.scene.input.keyboard.createCursorKeys();
    }

    public update(): void {
        this.body.setAcceleration(0, 0);
        


        if (this.keys.left?.isDown) {
            this.body.rotation += 5
        } else if (this.keys.right?.isDown) {
            this.body.rotation += -5
        }

        if (this.keys.up?.isDown) {
            this.body.setAccelerationY(10);
        } else if (this.keys.down?.isDown) {
            this.body.setAccelerationY(-10);
        }

        

        this.body.velocity = new Math.Vector2(Math.Rotate(this.body.velocity, this.body.rotation));
    }
}