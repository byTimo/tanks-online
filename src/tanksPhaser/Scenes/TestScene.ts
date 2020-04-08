import { Scene } from "phaser";
import { Player } from "../Objects/Player";
import { tank } from "../Images";

export class TestScene extends Scene {
    private player: Player;

    constructor() {
        super("test");
        this.player = new Player(this);
    }

    public create() {
        this.player.create();
        //this.cameras.main.startFollow(this.player.image);
        this.cameras.main.centerOn(0,0);
    }

    public update() {
        this.player.update();
    }
}