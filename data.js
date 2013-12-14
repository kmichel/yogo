var yogo = {
    tick_fps: 60,
    background_color: '#000',
    key_map: {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    },
    keys: {
        space: false,
        left: false,
        up: false,
        right: false,
        down: false
    },
    player: {
        position: {x: 50, y: 50},
        direction: {x: 0, y: 0},
        speed: 2,
        radius: 10,
        direction_radius: 20,
        color: '#fff'
    },
    bots: [
        {
            position: {x: 200, y: 100},
            radius: 5,
            color: '#a40000'
        },
        {
            position: {x: 100, y: 200},
            radius: 5,
            color: '#a40000'
        }
    ]
};