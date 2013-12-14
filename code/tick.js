function tick_game(game) {
    tick_player_movements(game.keys, game.player);
    for (var i = 0; i < game.bots.length; ++i)
        tick_bot(game, game.bots[i]);
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

function tick_bot(game, bot) {
    if (bot.state == 'resting') {
        bot.target_cell = pick_random(get_neighbors(game, bot.cell));
        bot.state = 'moving';
    } else if (bot.state == 'moving') {
        var target_x = bot.target_cell.position.x;
        var target_y = bot.target_cell.position.y;
        var delta_x = target_x - bot.position.x;
        var delta_y = target_y - bot.position.y;
        var delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
        if (delta_length <= bot.speed) {
            bot.position.x = target_x;
            bot.position.y = target_y;
            bot.cell = bot.target_cell;
            bot.target_cell = null;
            bot.state = 'resting';
        } else {
            bot.position.x += delta_x * bot.speed / delta_length;
            bot.position.y += delta_y * bot.speed / delta_length;
        }
    }
}
