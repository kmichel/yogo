var yogo = {
    tick: 0,
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
        can_shoot: true,
        position: {x: 50.5, y: 50.5},
        direction: {x: 0, y: 0},
        speed: 2,
        radius: 6,
        shooting_radius: 120,
        direction_radius: 10,
        color: '#9cd1e3',
        state: 'alive'
    },
    bots: {
        color: '#a45300',
        radius: 6,
        death_animation_length: 20,
        shooting_zone: {
            color: 'rgba(255, 255, 255, 0.1)',
            radius: 40
        },
        detection_zone: {
          color: 'rgba(255, 255, 255, 0.3)',
            radius: 80
        },
        speed: 1,
        list: [
            {
                position: {x: 205.5, y: 110.5}
            },
            {
                position: {x: 110.5, y: 200.5}
            }
        ]
    },
    pulses: {
        max_age: 200,
        phases: 6,
        length: 12,
        steps: 10,
        speed: 1,
        list: []
    },
    lasers: {
        max_age: 20,
        color: '#fff',
        width: 3,
        list: []
    }
};
