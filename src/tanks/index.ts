import { Engine, Actor, Vector } from "excalibur";
import { GameLoader } from "./Resources/GameLoader";
import { Player } from "./GameObjects/Player";

const loader = new GameLoader();
export const game = new Engine();

game.start(loader).then(() => {
    const player = new Player({
        pos: new Vector(game.halfDrawWidth, game.halfDrawHeight),
    });
    game.add(player);
});