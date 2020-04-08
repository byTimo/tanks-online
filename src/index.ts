import { Game } from "phaser";
import { slasherStarter } from "./slasher";
import { flyStarter } from "./fly";
import { tanksStarter } from "./tanksPhaser";
import * as ex from "excalibur";
import { game } from "./tanks";

const gameMap: Record<string, any> = {
    "#slasher": slasherStarter,
    "#fly": flyStarter,
    "#tanksPhaser": tanksStarter,
    "#tanks": game,
}

const gameName = window.location.hash;
const config = gameMap[gameName] || game;

if (config instanceof ex.Engine) {
    config.start();
} else {
    new Game(config);
}
