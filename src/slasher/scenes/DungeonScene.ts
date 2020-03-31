import { generate } from "../DungeonGenerator";
import { Scene, Utils, Tilemaps } from "phaser";
import { Player } from "../player";
import Dungeon, { Room } from "@mikewesthad/dungeon";
import { tileMapping } from "../TileMapping";
import { TilemapVisibility } from "../TilemapVisibility";

export class DungeonScene extends Scene {
    public player: Player | undefined;
    public dungeon: Dungeon | undefined;
    public tilemapVisibility: TilemapVisibility | undefined;
    public groundLayer: Tilemaps.DynamicTilemapLayer | undefined;

    public preload() {
        this.load.image("tiles", "assets/slasher/tilesets/buch-tileset-48px-extruded.png");
        this.load.spritesheet(
            "characters",
            "assets/slasher/spritesheets/buch-characters-64px-extruded.png",
            {
                frameWidth: 64,
                frameHeight: 64,
                margin: 1,
                spacing: 2
            }
        );
    }

    public create() {
        this.dungeon = generate();
        const map = this.make.tilemap({
            tileWidth: 48,
            tileHeight: 48,
            width: this.dungeon.width,
            height: this.dungeon.height
        });

        const tileset = map.addTilesetImage("tiles", undefined, 48, 48, 1, 2);
        const groundLayer = map.createBlankDynamicLayer("Ground", tileset);
        this.groundLayer = groundLayer;
        const stuffLayer = map.createBlankDynamicLayer("Stuff", tileset);

        groundLayer.fill(tileMapping.blank);

        for (const room of this.dungeon.rooms) {
            const { x, y, width, height, left, right, top, bottom } = room;
            groundLayer.weightedRandomize(x + 1, y + 1, width - 2, height - 2, tileMapping.floor);
            groundLayer.putTileAt(tileMapping.wall.topLeft, left, top);
            groundLayer.putTileAt(tileMapping.wall.topRight, right, top);
            groundLayer.putTileAt(tileMapping.wall.bottomRight, right, bottom);
            groundLayer.putTileAt(tileMapping.wall.bottomLeft, left, bottom);

            groundLayer.weightedRandomize(left + 1, top, width - 2, 1, tileMapping.wall.top);
            groundLayer.weightedRandomize(left + 1, bottom, width - 2, 1, tileMapping.wall.bottom);
            groundLayer.weightedRandomize(left, top + 1, 1, height - 2, tileMapping.wall.left);
            groundLayer.weightedRandomize(right, top + 1, 1, height - 2, tileMapping.wall.right);

            const doors = room.getDoorLocations();
            for (const door of doors) {
                if (door.y === 0) {
                    groundLayer.putTilesAt(tileMapping.door.top, x + door.x - 1, y + door.y)
                } else if (door.y === room.height - 1) {
                    groundLayer.putTilesAt(tileMapping.door.bottom, x + door.x - 1, y + door.y)
                } else if (door.x === 0) {
                    groundLayer.putTilesAt(tileMapping.door.left, x + door.x, y + door.y - 1);
                } else {
                    groundLayer.putTilesAt(tileMapping.door.right, x + door.x, y + door.y - 1);
                }
            }
        }

        groundLayer.setCollisionByExclusion([-1, 6, 7, 8, 26]);

        // stuffLayer.fill(tileMapping.blank);

        const rooms = this.dungeon.rooms.slice();
        const startRoom = rooms.shift();
        const endRoom = Utils.Array.RemoveRandomElement(rooms) as Room;
        const otherRoom = Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);

        stuffLayer.putTileAt(tileMapping.stairs, endRoom.centerX, endRoom.centerY);

        for (const room of otherRoom) {
            const rand = Math.random();
            if (rand <= 0.25) {
                // 25% chance of chest
                stuffLayer.putTileAt(tileMapping.chest, room.centerX, room.centerY);
            } else if (rand <= 0.5) {
                // 50% chance of a pot anywhere in the room... except don't block a door!
                const x = Phaser.Math.Between(room.left + 2, room.right - 2);
                const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
                stuffLayer.weightedRandomize(x, y, 1, 1, tileMapping.pot);
            } else {
                // 25% of either 2 or 4 towers, depending on the room size
                if (room.height >= 9) {
                    stuffLayer.putTilesAt(tileMapping.tower, room.centerX - 1, room.centerY + 1);
                    stuffLayer.putTilesAt(tileMapping.tower, room.centerX + 1, room.centerY + 1);
                    stuffLayer.putTilesAt(tileMapping.tower, room.centerX - 1, room.centerY - 2);
                    stuffLayer.putTilesAt(tileMapping.tower, room.centerX + 1, room.centerY - 2);
                } else {
                    stuffLayer.putTilesAt(tileMapping.tower, room.centerX - 1, room.centerY - 1);
                    stuffLayer.putTilesAt(tileMapping.tower, room.centerX + 1, room.centerY - 1);
                }
            }
        }
        stuffLayer.setCollisionByExclusion([-1, 6, 7, 8, 26]);

        const shadowLayer = map.createBlankDynamicLayer("Shadow", tileset).fill(tileMapping.blank);
        this.tilemapVisibility = new TilemapVisibility(shadowLayer);


        this.player = new Player(this, map.widthInPixels / 2, map.heightInPixels / 2);
        this.physics.add.collider(this.player.sprite, groundLayer);
        this.physics.add.collider(this.player.sprite, stuffLayer);
        const camera = this.cameras.main;
        camera.startFollow(this.player.sprite);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Help text that has a "fixed" position on the screen
        this.add
            .text(16, 16, "Arrow keys to move", {
                font: "18px monospace",
                fill: "#000000",
                padding: { x: 20, y: 10 },
                backgroundColor: "#ffffff"
            })
            .setScrollFactor(0);
    }

    public update() {
        this.player?.update();

        // const playerTile = this.groundLayer?.worldToTileXY(this.player!.sprite.x, this.player!.sprite.y);
        // const playerRoom = this.dungeon?.getRoomAt(playerTile!.x, playerTile!.y)!;
        const playerTileX = this.groundLayer!.worldToTileX(this.player!.sprite.x);
        const playerTileY = this.groundLayer!.worldToTileY(this.player!.sprite.y);
        const playerRoom = this.dungeon?.getRoomAt(playerTileX, playerTileY)!;
        this.tilemapVisibility?.setActiveRoom(playerRoom);
    }
}