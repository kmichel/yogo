yogo.levels.push({
    hints: [
        {
            text: "The other way...",
            rect: {x: 0, y: 0, width: 80, height: 401}
        },
        {
            text: "Use arrows to reach the exit.",
            rect: {x: 80, y: 0, width: 360, height: 401}
        },
        {
            text: "Almost there...",
            rect: {x: 440, y: 0, width: 100, height: 401}
        },
        {
            text: "Too far !",
            rect: {x: 540, y: 0, width: 61, height: 401}
        }
    ],
    player: {
        position: {x: 100.5, y: 200.5}
    },
    exit: {
        position: {x: 500.5, y: 200.5}
    },
    bots: [],
    barriers: {
        emitters: [],
        reflectors: []
    }
});
