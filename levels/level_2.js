yogo.levels.push({
    player: {
        position: {x: 20.5, y: 200.5}
    },
    exit: {
        position: {x: 580.5, y: 200.5}
    },
    bots: [
        {position: {x: 300.5, y: 200.5}}
    ],
    barriers: {
        emitters: [
            {
                position: {x: 100.5, y: 300.5},
                direction: {x: 1, y: 0}
            }
        ],
        reflectors: [
            {
                position: {x: 400.5, y: 300.5},
                reflection: 'clockwise'
            },
            {
                position: {x: 400.5, y: 100.5},
                reflection: 'clockwise'
            }
        ]
    }
});
