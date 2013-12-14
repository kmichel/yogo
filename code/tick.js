function tick_game(game) {
    tick_player_movements(game.keys, game.player);
}

function tick_player_movements(keys, player) {
    var x = 0;
    var y = 0;
    if (keys.left)
        x -= 1;
    if (keys.up)
        y -= 1;
    if (keys.right)
        x += 1;
    if (keys.down)
        y += 1;
    if (x != 0 || y != 0) {
        var inverse_length = 1 / Math.sqrt(x * x + y * y);
        player.direction.x = x * inverse_length;
        player.direction.y = y * inverse_length;
        player.position.x += x * inverse_length * player.speed;
        player.position.y += y * inverse_length * player.speed;
    }
}