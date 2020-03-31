import { Game, Types, Scene, Display, GameObjects, Physics } from "phaser";
import { DungeonScene } from "./slasher/scenes/DungeonScene";
import { slasherStarter } from "./slasher";
import { flyStarter } from "./fly";

const gameMap: Record<string, any> = {
    "#slasher": slasherStarter,
    "#fly": flyStarter
}

const gameName = window.location.hash;
const config = gameMap[gameName];

const game = new Game(config);
