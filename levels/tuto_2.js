yogo.levels.push({
    hints: [
        {
            text: "Do not touch the lasers.",
            rect: {x: 0, y: 0, width: 300, height: 401}
        },
        {
            text: "Also, reach the exit.",
            rect: {x: 300, y: 0, width: 301, height: 401}
        }
    ],
    player: {
        position: {x: 40.5, y: 40.5}
    },
    exit: {
        position: {x: 540.5, y: 60.5}
    },
    bots: [],
    barriers: {
        emitters: [
            {
                position: {x: 80.5, y: 0.5},
                direction: {x: 1, y: 1}
            },
            {
                position: {x: 0.5, y: 80.5},
                direction: {x: 1, y: 1}
            }
        ],
        reflectors: [
            {
                position: {x: 300.5, y: 220.5},
                reflection: 'clockwise'
            },
            {
                position: {x: 260.5, y: 340.5},
                reflection: 'clockwise'
            },
            {
                position: {x: 300.5, y: 300.5},
                reflection: 'counter-clockwise'
            },
            {
                position: {x: 340.5, y: 340.5},
                reflection: 'clockwise'
            }
        ]
    }
});
