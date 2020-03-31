import { GameScene } from "./scenes/GameScene";
import { BootScene } from "./scenes/BootScene";

export const flyStarter = {
    width: 256,
    height: 272,
    backgroundColor: 0x000000,
    scene: [BootScene, GameScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}