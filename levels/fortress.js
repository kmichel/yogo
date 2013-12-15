yogo.levels.push({
    hints: [],
    player: {
        position: {x: 100.5, y: 200.5}
    },
    exit: {
        position: {x: 500.5, y: 200.5}
    },
    bots: [
        {
            position: {x: 300.5, y: 100.5}
        },
        {
            position: {x: 300.5, y: 320.5}
        }
    ],
    barriers: {
        emitters: [
            {
                position: {x: 420.5, y: 0.5},
                direction: {x: 0, y: 1}
            },
            {
                position: {x: 240.5, y: 0.5},
                direction: {x: -1, y: 1}
            }
        ],
        reflectors: [
            {
                position: {x: 420.5, y: 220.5},
                reflection: 'counter-clockwise'
            },
            {
                position: {x: 180.5, y: 220.5},
                reflection: 'counter-clockwise'
            },
            {
                position: {x: 140.5, y: 100.5},
                reflection: 'clockwise'
            },
            {
                position: {x: 300.5, y: 260.5},
                reflection: 'clockwise'
            },
            {
                position: {x: 460.5, y: 100.5},
                reflection: 'clockwise'
            }
        ]
    }
});
