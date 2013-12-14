var yogo = {
    tick_fps: 60,
    width: 600,
    height: 400,
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
        position: {x: 50.5, y: 50.5},
        direction: {x: 0, y: 0},
        speed: 2,
        radius: 6,
        direction_radius: 10,
        color: '#9cd1e3'
    },
    bots: [
        {
            position: {x: 205.5, y: 110.5},
            radius: 6,
            speed: 3,
            color: '#a45300',
            state: 'resting',
            cell: null,
            target_cell: null
        },
        {
            position: {x: 110.5, y: 210.5},
            radius: 6,
            speed: 3,
            color: '#a45300',
            state: 'resting',
            cell: null,
            target_cell: null
        }
    ]
};