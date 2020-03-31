import { Scene, GameObjects, Physics, Types, Input, Game } from "phaser";
import { config } from "../Config";
import { Explosion } from "../gameObjects/Explosion";
import { Beam } from "../gameObjects/Beam";
import { isInstanceOf } from "../../Helpers";

export class GameScene extends Scene {
    background: GameObjects.TileSprite | undefined;
    ship1: GameObjects.Sprite | undefined;
    ship2: GameObjects.Sprite | undefined;
    ship3: GameObjects.Sprite | undefined;
    player: Physics.Arcade.Sprite | undefined;
    enemies: Physics.Arcade.Group | undefined;
    powerUps: Physics.Arcade.Group | undefined;
    projectiles: GameObjects.Group | undefined;
    cursorKeys: Types.Input.Keyboard.CursorKeys | undefined;
    spacebar: Input.Keyboard.Key | undefined;
    score: number = 0;
    scoreLabel: GameObjects.BitmapText | undefined;

    constructor() {
        super("playScene");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);

        this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship");
        this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
        this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "ship3");

        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        this.powerUps = this.physics.add.group();
        const maxObjects = 4;
        for (let i = 0; i <= maxObjects; i++) {
            const powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, config.width, config.height);

            powerUp.play(Math.random() > 0.5 ? "red" : "gray");
            powerUp.setVelocity(100, 100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }

        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
        this.player.play("thrust");
        this.player.setCollideWorldBounds(true);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();

        this.physics.add.collider(this.projectiles, this.powerUps, function (projectile, powerUp) {
            projectile.destroy();
        });

        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, undefined, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, undefined, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, undefined, this);

        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();

        this.score = 0;
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", `SCORE ${this.score.toString().padStart(6, "0")}`, 16);
    }

    pickPowerUp(player: GameObjects.GameObject, powerUp: GameObjects.GameObject) {
        if (isInstanceOf(powerUp, Physics.Arcade.Sprite)) {
            powerUp.disableBody(true, true);
        }
    }

    // hurtPlayer(player: Physics.Arcade.Sprite, enemy: GameObjects.Sprite) {
    hurtPlayer(player: GameObjects.GameObject, enemy: GameObjects.GameObject) {
        if (!isInstanceOf(player, Physics.Arcade.Sprite) || !isInstanceOf(enemy, GameObjects.Sprite)) {
            return;
        }

        if (player.alpha < 1) {
            return;
        }
        new Explosion(this, enemy.x, enemy.y);
        new Explosion(this, player.x, player.y);
        this.resetShipPos(enemy);
        player.disableBody(true, true);
        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        })
    }

    resetPlayer() {
        const x = config.width / 2 - 8;
        const y = config.height;
        this.player!.enableBody(true, x, y, true, true);
        this.player!.alpha = 0.5;
        this.tweens.add({
            targets: this.player,
            y: config.height - 64,
            ease: "Power1",
            duration: 1500,
            repeat: 0,
            onComplete: () => {
                this.player!.alpha = 1;
            }
        })
    }

    hitEnemy(projectile: GameObjects.GameObject, enemy: GameObjects.GameObject) {
        if (isInstanceOf(enemy, GameObjects.Sprite)) {
            new Explosion(this, enemy.x, enemy.y);
            projectile.destroy();
            this.resetShipPos(enemy);
            this.score += 15;
            this.scoreLabel!.text = `SCORE ${this.score.toString().padStart(6, "0")}`;
        }
    }

    update() {
        this.moveShip(this.ship1!, 1);
        this.moveShip(this.ship2!, 2);
        this.moveShip(this.ship3!, 3);
        this.background!.tilePositionY -= 0.5;
        this.movePlayer();
        if (Phaser.Input.Keyboard.JustDown(this.spacebar!)) {
            if (this.player!.active) {
                new Beam(this, this.player!, this.projectiles!);
            }
        }

        for (const beam of this.projectiles!.getChildren()) {
            beam.update();
        }
    }

    movePlayer() {
        this.player!.setVelocity(0, 0);

        if (this.cursorKeys!.left!.isDown) {
            this.player!.setVelocityX(-200);
        } else if (this.cursorKeys!.right!.isDown) {
            this.player!.setVelocityX(200);
        }

        if (this.cursorKeys!.up!.isDown) {
            this.player!.setVelocityY(-200);
        } else if (this.cursorKeys!.down!.isDown) {
            this.player!.setVelocityY(200);
        }
    }

    moveShip(ship: GameObjects.Sprite, speed: number) {
        ship.y += speed;
        if (ship.y > config.height) {
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship: GameObjects.Components.Transform) {
        ship.y = 0;
        ship.x = Phaser.Math.Between(0, config.width);
    }
}