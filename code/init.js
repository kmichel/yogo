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

function init_game(game, canvas_id) {
    var canvas = document.getElementById(canvas_id);
    var context = canvas.getContext('2d');

    init_grid_cells(game);
    for (var i = 0; i < game.bots.list.length; ++i)
        init_bot(game, game.bots.list[i]);
    update_segments(game.barriers);

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
