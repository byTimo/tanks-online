import { Scene } from "phaser";

export class BootScene extends Scene {
    constructor() {
        super("boot");
    }

    public preload(): void {
        this.load.image("background", "assets/fly/images/background.png");
        this.load.spritesheet("ship", "assets/fly/spritesheets/ship.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("ship2", "assets/fly/spritesheets/ship2.png", {
            frameWidth: 32,
            frameHeight: 16
        });
        this.load.spritesheet("ship3", "assets/fly/spritesheets/ship3.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("explosion", "assets/fly/spritesheets/explosion.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("power-up", "assets/fly/spritesheets/power-up.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("player", "assets/fly/spritesheets/player.png", {
            frameWidth: 16,
            frameHeight: 24
        });
        this.load.spritesheet("beam", "assets/fly/spritesheets/beam.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.bitmapFont("pixelFont", "assets/fly/font/font.png", "assets/fly/font/font.xml");
    }

    public create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playScene");

        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship", {}),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2", {}),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3", {}),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {}),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 0,
                end: 1,
            }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 2,
                end: 3,
            }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "thrust",
            frames: this.anims.generateFrameNumbers("player", {}),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("beam", {}),
            frameRate: 20,
            repeat: -1,
        })
    }
}