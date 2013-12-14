function init_game(game, canvas_id) {
    var canvas = document.getElementById(canvas_id);
    var context = canvas.getContext('2d');

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
