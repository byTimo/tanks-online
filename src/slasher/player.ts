import { Scene, Physics, Types } from "phaser";
import { isInstanceOf } from "../Helpers";

export class Player {
    private static readonly speed = 300;

    public sprite: Physics.Arcade.Sprite;
    public body: Physics.Arcade.Body;
    private keys: Types.Input.Keyboard.CursorKeys

    constructor(private scene: Scene, x: number, y: number) {
        scene.anims.create({
            key: "player-walk",
            frames: scene.anims.generateFrameNumbers("characters", { start: 46, end: 49 }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: "player-walk-back",
            frames: scene.anims.generateFrameNumbers("characters", { start: 65, end: 68 }),
            frameRate: 8,
            repeat: -1
        });

        this.sprite = scene.physics.add
            .sprite(x, y, "characters", 0)
            .setSize(22, 33)
            .setOffset(23, 27);
        if (!isInstanceOf(this.sprite.body, Physics.Arcade.Body)) {
            throw new Error("body is not a Body");
        }
        this.body = this.sprite.body;

        this.keys = scene.input.keyboard.createCursorKeys();
    }

    public freeze(): void {
        this.body.moves = false;
    }

    public update(): void {
        const prevVelocity = this.body.velocity.clone();
        this.body.setVelocity(0);

        if (this.keys.left?.isDown) {
            this.body.setVelocityX(-Player.speed);
            this.sprite.setFlipX(true);
        } else if (this.keys.right?.isDown) {
            this.body.setVelocityX(Player.speed);
            this.sprite.setFlipX(false);
        }

        if (this.keys.up?.isDown) {
            this.body.setVelocityY(-Player.speed);
        } else if (this.keys.down?.isDown) {
            this.body.setVelocityY(Player.speed);
        }

        this.body.velocity.normalize().scale(Player.speed);

        if (this.keys.left?.isDown || this.keys.right?.isDown || this.keys.down?.isDown) {
            this.sprite.anims.play("player-walk", true);
        } else if (this.keys.up?.isDown) {
            this.sprite.anims.play("player-walk-back", true);
        } else {
            this.sprite.anims.stop();

            if (prevVelocity.y < 0) {
                this.sprite.setTexture("characters", 65);
            } else {
                this.sprite.setTexture("characters", 46);
            }
        }
    }

    public destroy() {
        this.sprite.destroy();
    }
}