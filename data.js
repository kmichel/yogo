var yogo = {
    tick: 0,
    tick_fps: 60,
    width: 600,
    height: 400,
    margin: 85,
    state: 'playing',
    has_just_started: false,
    current_level: 0,
    max_level: 0,
    levels: [],
    text: "",
    hints: {
        list: []
    },
    cursor: {
        pressed: false,
        position: {x: -1, y: -1}
    },
    background_color: '#262A2C',
    overlay_color: 'rgba(26, 30, 31, 1)',
    overlay_color_2: 'rgba(26, 30, 31, 0)',
    sounds: {
        'barrier_broken': 'sounds/barrier_broken.wav',
        'exit_open': 'sounds/exit_open.wav',
        'footstep_1': 'sounds/footstep_1.wav',
        'footstep_2': 'sounds/footstep_2.wav',
        'laser': 'sounds/laser.wav',
        'level_complete': 'sounds/level_complete.wav',
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
        40: 'down',
        82: 'restart'
    },
    keys: {
        shift: false,
        space: false,
        left: false,
        up: false,
        right: false,
        down: false,
        restart: false
    },
    player: {
        can_shoot: true,
        position: {x: 50.5, y: 50.5},
        direction: {x: 0, y: 0},
        walk_speed: 0.5,
        run_speed: 2,
        radius: 6.001,
        shooting_radius: 120,
        direction_radius: 10,
        aim_color: 'rgba(255, 255, 255, 0.6)',
        run_color: 'rgba(156, 209, 227, 1.0)',
        walk_color: 'rgba(156, 209, 227, 0.5)',
        state: 'alive',
        footstep_interval: 20,
        footsteps_chain: 0,
        distance_since_last_footstep: 0,
        was_moving: false,
        was_aiming: false,
        age: 0
    },
    exit: {
        state: 'closed',
        closed_color: 'rgba(255, 255, 255, 0.1)',
        open_color: '#fff',
        radius: 12,
        position: {x: 560.5, y: 360.5}
    },
    bots: {
        color: '#a45300',
        radius: 6.001,
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
        list: []
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
            list: []
        },
        reflectors: {
            color: '#bef',
            size: 6,
            list: []
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
        list: []
    },
    images: {
        icon_restart: {
            url: 'images/icon_restart.png'
        },
        icon_toggle_sound: {
            url: 'images/icon_toggle_sound.png'
        },
        icon_toggle_sound_off: {
            url: 'images/icon_toggle_sound_off.png'
        },
        icon_previous_level: {
            url: 'images/icon_previous_level.png'
        },
        icon_next_level: {
            url: 'images/icon_next_level.png'
        }
    },
    buttons: {
        list: [
            {
                action: 'restart',
                image: 'icon_restart',
                state: 'resting',
                rect: {x: 600, y: 0, width: 40, height: 40}
            },
            {
                action: 'toggle_sound',
                image: 'icon_toggle_sound',
                state: 'resting',
                rect: {x: 600, y: 40, width: 40, height: 40}
            },
            {
                action: 'previous_level',
                image: 'icon_previous_level',
                state: 'resting',
                rect: {x: 600, y: 80, width: 40, height: 40}
            },
            {
                action: 'next_level',
                image: 'icon_next_level',
                state: 'resting',
                rect: {x: 600, y: 120, width: 40, height: 40}
            }
        ]
    }
};
