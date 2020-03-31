import Dungeon from "@mikewesthad/dungeon";

export function generate(): Dungeon {
    return new Dungeon({
        height: 40,
        width: 40,
        doorPadding: 2,
        rooms: {
            width: { min: 5, max: 10, onlyOdd: true },
            height: { min: 8, max: 20, onlyOdd: true }
        },
    });
}