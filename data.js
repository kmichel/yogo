var yogo = {
    tick_fps: 60,
    background_color: '#2e3436',
    grid: {
        minor_color: 'rgba(255, 255, 255, 0.05)',
        minor_spacing: 20,
        major_color: 'rgba(255, 255, 255, 0.10)',
        major_spacing: 100
    },
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
        radius: 5,
        direction_radius: 10,
        color: '#9cd1e3'
    },
    bots: [
        {
            position: {x: 200, y: 100},
            radius: 5,
            color: '#a45300'
        },
        {
            position: {x: 100, y: 200},
            radius: 5,
            color: '#a45300'
        }
    ]
};