yogo.levels.push({
    hints: [
        {
            text: "Here is a surveillance bot.",
            rect: {x: 0, y: 0, width: 120, height: 100},
            min_bots_left: 1
        },
        {
            text: "Try to approach it, carefully.",
            rect: {x: 120, y: 0, width: 80, height: 100},
            min_bots_left: 1
        },
        {
            text: "You can use the shift key to walk instead of running.",
            rect: {x: 200, y: 0, width: 140, height: 150},
            min_bots_left: 1
        },
        {
            text: "A bit more...",
            rect: {x: 200, y: 150, width: 200, height: 50},
            min_bots_left: 1
        },
        {
            text: "OK, now press space to disable it.",
            rect: {x: 280, y: 182, width: 40, height: 28},
            min_bots_left: 1
        },
        {
            text: "OK, now press space to disable it.",
            rect: {x: 260, y: 185, width: 80, height: 25},
            min_bots_left: 1
        },
        {
            text: "Good job, now the exit is unlocked.",
            rect: {x: 260, y: 100, width: 80, height: 100},
            max_bots_left: 0
        },
        {
            text: "Later you will meet many bots...",
            rect: {x: 340, y: 0, width: 120, height: 100},
            max_bots_left: 0
        },
        {
            text: "But you only get one shot :)",
            rect: {x: 500, y: 0, width: 101, height: 140},
            max_bots_left: 0
        }
    ],
    player: {
        position: {x: 50.5, y: 50.5}
    },
    exit: {
        position: {x: 560.5, y: 200.5}
    },
    bots: [
        {
            is_deaf: true,
            position: {x: 300.5, y: 300.5}
        }
    ],
    barriers: {
        emitters: [
            {
                position: {x: 0.5, y: 100.5},
                direction: {x: 1, y: 0}
            }
        ],
        reflectors: [
            {
                position: {x: 260.5, y: 100.5},
                reflection: 'counter-clockwise'
            },
            {
                position: {x: 260.5, y: 200.5},
                reflection: 'clockwise'
            },
            {
                position: {x: 340.5, y: 200.5},
                reflection: 'clockwise'
            },
            {
                position: {x: 340.5, y: 100.5},
                reflection: 'counter-clockwise'
            },
            {
                position: {x: 500.5, y: 100.5},
                reflection: 'counter-clockwise'
            }
        ]
    }
});
