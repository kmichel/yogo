yogo.levels.push({
    hints: [
        {
            text: "Can't touch this ?",
            rect: {x: 0, y: 0, width: 200, height: 401},
            max_bots_left: 0
        }
    ],
    player: {
        position: {x: 20.5, y: 380.5}
    },
    exit: {
        position: {x: 580.5, y: 100.5}
    },
    bots: [
        {
            position: {x: 120.5, y: 160.5}
        },
        {
            position: {x: 120.5, y: 40.5}
        },
        {
            position: {x: 300.5, y: 160.5}
        }
    ],
    barriers: {
        emitters: [
            {
                position: {x: 600.5, y: 80.5},
                direction: {x: -1, y: 0}
            },
            {
                position: {x: 40.5, y: 400.5},
                direction: {x: 0, y: -1}
            },
            {
                position: {x: 200.5, y: 400.5},
                direction: {x: 0, y: -1}
            }
        ],
        reflectors: [
            {
                position: {x: 40.5, y: 80.5},
                reflection: 'counter-clockwise'
            },
            {
                position: {x: 40.5, y: 120.5},
                reflection: 'counter-clockwise'
            },
            {
                position: {x: 160.5, y: 120.5},
                reflection: 'counter-clockwise'
            },
            {
                position: {x: 200.5, y: 120.5},
                reflection: 'counter-clockwise'
            }
        ]
    }
});
