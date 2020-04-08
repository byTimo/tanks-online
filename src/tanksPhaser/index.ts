import { BootScene } from "./Scenes/BootScene";
import { TestScene } from "./Scenes/TestScene";

export const tanksStarter = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [BootScene, TestScene],
}