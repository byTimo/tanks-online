import { Tilemaps } from "phaser";
import { Room } from "@mikewesthad/dungeon";

export class TilemapVisibility {
    public activeRoom: Room | null = null;
    constructor(public layer: Tilemaps.DynamicTilemapLayer) {
    }

    public setActiveRoom(room: Room) {
        if (room !== this.activeRoom) {
            this.setRoomAlpha(room, 0);
            if (this.activeRoom != null) {
                this.setRoomAlpha(this.activeRoom, 0.5);
            }
            this.activeRoom = room;
        }
    }

    private setRoomAlpha(room: Room, alpha: number): void {
        const { x, y, width, height } = room;
        this.layer.forEachTile(tile => tile.alpha = alpha, this, x, y, width, height);
    }
}