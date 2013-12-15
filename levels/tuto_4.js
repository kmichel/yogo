yogo.levels.push({
    hints: [
        {
            text: "A few more things about the bots...",
            rect: {x: 0, y: 0, width: 200, height: 40}
        },
        {
            text: "First, the outer ring is their hearing zone.",
            rect: {x: 0, y: 40, width: 160, height: 60}
        },
        {
            text: "And the inner circle is their killing zone.",
            rect: {x: 0, y: 100, width: 80, height: 100}
        },
        {
            text: "Also known as your dying zone :)",
            rect: {x: 0, y: 200, width: 80, height: 100}
        },
        {
            text: "If they hear you, they will follow the noise.",
            rect: {x: 100, y: 140, width: 120, height: 40}
        },
        {
            text: "If they hear you, they will follow the noise.",
            rect: {x: 140, y: 140, width: 80, height: 40}
        },
        {
            text: "Use shift to walk silently and escape.",
            rect: {x: 180, y: 40, width: 80, height: 80}
        },
        {
            text: "Use shift to walk silently and escape.",
            rect: {x: 200, y: 0, width: 100, height: 101}
        },
        {
            text: "Finally, when you kill a bot, you'll notice some electric pulses.",
            rect: {x: 340, y: 0, width: 261, height: 140}
        },
        {
            text: "They can destroy other bots and equipments.",
            rect: {x: 380, y: 140, width: 221, height: 60}
        },
        {
            text: "Use them.",
            rect: {x: 480, y: 200, width: 121, height: 100}
        }
    ],
    player: {
        position: {x: 140.5, y: 20.5}
    },
    exit: {
        position: {x: 300.5, y: 140.5}
    },
    bots: [
        {
            position: {x: 240.5, y: 320.5}
        },
        {
            position: {x: 360.5, y: 320.5}
        }
    ],
    barriers: {
        emitters: [
            {
                position: {x: 560.5, y: 360.5},
                direction: {x: -1, y: -1}
            },
            {
                position: {x: 200.5, y: 0.5},
                direction: {x: -1, y: 1}
            }
        ],
        reflectors: [
            {
                position: {x: 300.5, y: 100.5},
                reflection: 'clockwise'
            },
            {
                position: {x: 40.5, y: 160.5},
                reflection: 'clockwise'
            },
            {
                position: {x: 80.5, y: 200.5},
                reflection: 'clockwise'
            }
        ]
    }
});
