yogo.levels.push({
    hints: [
    ],
    player: {
        position: {x: 100.5, y: 300.5}
    },
    exit: {
        position: {x: 500.5, y: 100.5}
    },
    bots: [
        {
            position: {x: 260.5, y: 200.5}
        },
        {
            position: {x: 340.5, y: 200.5}
        }
    ],
    barriers: {
        emitters: [
            {
                position: {x: 220.5, y: 0.5},
                direction: {x: 0, y: 1}
            },
            {
                position: {x: 380.5, y: 400.5},
                direction: {x: 0, y: -1}
            }
        ],
        reflectors: [
            {
                position: {x: 220.5, y: 180.5},
                reflection: 'clockwise'
            },
            {
                position: {x: 380.5, y: 220.5},
                reflection: 'clockwise'
            },
            {
                position: {x: 180.5, y: 220.5},
                reflection: 'counter-clockwise'
            },
            {
                position: {x: 420.5, y: 180.5},
                reflection: 'counter-clockwise'
            }
        ]
    }
});
