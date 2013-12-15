function init_grid_cells(game) {
    var horizontal_cells_count = game.width / game.grid.minor_spacing + 1;
    var vertical_cells_count = game.height / game.grid.minor_spacing + 1;
    var cells = [];
    for (var y = 0; y < vertical_cells_count; ++y) {
        var row = [];
        for (var x = 0; x < horizontal_cells_count; ++x)
            row.push({
                position: {
                    x: x * game.grid.minor_spacing + .5,
                    y: y * game.grid.minor_spacing + .5
                },
                id: {
                    x: x,
                    y: y
                },
                allow_up: y != 0,
                allow_down: y + 1 != vertical_cells_count,
                allow_left: x != 0,
                allow_right: x + 1 != horizontal_cells_count,
                allow_diagonals: ((x + y) % 2) == 0
            });
        cells.push(row);
    }
    game.grid.cells = cells;
}

function init_bot(game, bot) {
    var cell_x = Math.round(bot.position.x / game.grid.minor_spacing);
    var cell_y = Math.round(bot.position.y / game.grid.minor_spacing);
    bot.state = 'moving';
    bot.target_cell = game.grid.cells[cell_y][cell_x];
}

function init_level(game, level) {
    game.state = 'playing';
    game.player.state = 'alive';
    game.exit.state = 'closed';
    game.player.position = {x: level.player.position.x, y: level.player.position.y};
    game.exit.position = {x: level.exit.position.x, y: level.exit.position.y};
    game.hints.list = [];
    for (var i = 0; i < level.hints.length; ++i)
        game.hints.list.push(level.hints[i]);
    game.bots.list = [];
    for (i = 0; i < level.bots.length; ++i)
        game.bots.list.push({
            is_deaf: level.bots[i].is_deaf,
            position: {x: level.bots[i].position.x, y: level.bots[i].position.y}
        });
    game.barriers.emitters.list = [];
    for (i = 0; i < level.barriers.emitters.length; ++i)
        game.barriers.emitters.list.push({
            position: {x: level.barriers.emitters[i].position.x, y: level.barriers.emitters[i].position.y},
            direction: {x: level.barriers.emitters[i].direction.x, y: level.barriers.emitters[i].direction.y}
        });
    game.barriers.reflectors.list = [];
    for (i = 0; i < level.barriers.reflectors.length; ++i)
        game.barriers.reflectors.list.push({
            position: {x: level.barriers.reflectors[i].position.x, y: level.barriers.reflectors[i].position.y},
            reflection: level.barriers.reflectors[i].reflection
        });
    for (i = 0; i < game.bots.list.length; ++i)
        init_bot(game, game.bots.list[i]);
    update_segments(game.barriers, game.bots);
    set_cookie('yogo_level', game.current_level, 100);
}

function init_game(game, canvas_id) {
    var canvas = document.getElementById(canvas_id);
    var context = canvas.getContext('2d');
    if (!context.setLineDash)
        context.setLineDash = function () {
        };

    init_grid_cells(game);
    game.current_level = parseInt(get_cookie('yogo_level', '0'));
    if (isNaN(game.current_level) || game.current_level < 0 || game.current_level >= game.levels.length)
        game.current_level = 0;
    init_level(game, game.levels[game.current_level]);

    for (var sound_name in game.sounds)
        if (game.sounds.hasOwnProperty(sound_name))
            load_sound(game.sounds[sound_name], sound_name);

    (function draw_loop() {
        draw_game(game, context);
        // TODO: add Polyfill
        requestAnimationFrame(draw_loop, canvas);
    })();

    setInterval(function () {
        tick_game(game);
    }, 1000 / game.tick_fps);

    function get_key_handler(state) {
        return function (event) {
            if (game.key_map.hasOwnProperty(event.keyCode)) {
                game.keys[game.key_map[event.keyCode]] = state;
                event.preventDefault();
            }
        }
    }

    document.addEventListener('keydown', get_key_handler(true));
    document.addEventListener('keyup', get_key_handler(false));
}

init_game(yogo, 'yogo');
