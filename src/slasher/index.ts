import { DungeonScene } from "./scenes/DungeonScene";

export const slasherStarter = {
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
    scene: DungeonScene,
}