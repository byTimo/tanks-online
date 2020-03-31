export const tileMapping = {
    blank: 20,
    wall: {
        topLeft: 3,
        topRight: 4,
        bottomRight: 23,
        bottomLeft: 22,
        top: [{ index: 39, weight: 4 }, { index: [57, 58, 59], weight: 1 }],
        left: [{ index: 21, weight: 4 }, { index: [76, 95, 114], weight: 1 }],
        right: [{ index: 19, weight: 4 }, { index: [77, 96, 115], weight: 1 }],
        bottom: [{ index: 1, weight: 4 }, { index: [78, 79, 80], weight: 1 }],
    },
    floor: [{ index: 6, weight: 9 }, { index: [7, 8, 26], weight: 1 }],
    pot: [{ index: 13, weight: 1 }, { index: 32, weight: 1 }, { index: 51, weight: 1 }],
    door: {
        top: [40, 6, 38],
        left: [[40], [6], [2]],
        bottom: [2, 6, 0],
        right: [[38], [6], [0]]
    },
    chest: 166,
    stairs: 81,
    tower: [[186], [205]]
}