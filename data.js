var yogo = {
    tick: 0,
    tick_fps: 60,
    width: 600,
    height: 400,
    margin: 85,
    background_color: '#262A2C',
    overlay_color: 'rgba(26, 30, 31, 1)',
    overlay_color_2: 'rgba(26, 30, 31, 0)',
    sounds: {
        'barrier_broken': 'sounds/barrier_broken.wav',
        'footstep_1': 'sounds/footstep_1.wav',
        'footstep_2': 'sounds/footstep_2.wav',
        'laser': 'sounds/laser.wav',
        'player_burned': 'sounds/player_burned.wav',
        'player_death': 'sounds/player_death.wav',
        'pulse': 'sounds/pulse.wav'
    },
    grid: {
        minor_color: 'rgba(255, 255, 255, 0.03)',
        minor_spacing: 20,
        major_color: 'rgba(255, 255, 255, 0.07)',
        major_spacing: 100
    },
    key_map: {
        16: 'shift',
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    },
    keys: {
        shift: false,
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
        walk_speed: 0.5,
        run_speed: 2,
        radius: 6,
        shooting_radius: 120,
        direction_radius: 10,
        aim_color: 'rgba(255, 255, 255, 0.6)',
        run_color: 'rgba(156, 209, 227, 1.0)',
        walk_color: 'rgba(156, 209, 227, 0.5)',
        state: 'alive',
        footstep_interval: 20,
        distance_since_last_footstep: 0,
        was_moving: false,
        was_aiming: false,
        age: 0
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
            },
            {
                position: {x: 310.5, y: 200.5}
            },
            {
                position: {x: 510.5, y: 200.5}
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
        max_age: 50,
        color: '#fff',
        width: 3,
        list: []
    },
    barriers: {
        emitters: {
            color: '#bef',
            size: 5,
            list: [
                {
                    direction: {x: 1, y: 1},
                    position: {x: 200.5, y: 200.5}
                },
                {
                    direction: {x: 1, y: 0},
                    position: {x: 40.5, y: 300.5}
                }
            ]
        },
        reflectors: {
            color: '#bef',
            size: 6,
            list: [
                {
                    position: {x: 300.5, y: 300.5},
                    reflection: 'clockwise'
                },
                {
                    position: {x: 500.5, y: 100.5},
                    reflection: 'counter-clockwise'
                },
                {
                    position: {x: 600.5, y: 200.5},
                    reflection: 'counter-clockwise'
                }
            ]
        },
        segments: {
            color: '#bef',
            list: []
        }
    },
    footsteps: {
        start_radius: 0,
        end_radius: 30,
        max_age: 20,
        sound_cycle: 0,
        list: []
    }
};
