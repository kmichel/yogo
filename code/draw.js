function draw_game(game, context) {
    draw_background(game, context);
    draw_player(game.player, context);
    for (var i = 0; i < game.bots.length; ++i)
        draw_bot(game.bots[i], context);
}

function draw_background(game, context) {
    context.fillStyle = game.background_color;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

function draw_player(player, context) {
    context.fillStyle = player.color;
    context.beginPath();
    context.arc(player.position.x, player.position.y, player.radius, 0, 2 * Math.PI);
    context.fill();
    context.strokeStyle = player.color;
    context.moveTo(
        player.position.x + player.radius * player.direction.x,
        player.position.y + player.radius * player.direction.y);
    context.lineTo(
        player.position.x + player.direction_radius * player.direction.x,
        player.position.y + player.direction_radius * player.direction.y);
    context.stroke();
}

function draw_bot(bot, context) {
    context.fillStyle = bot.color;
    context.beginPath();
    context.arc(bot.position.x, bot.position.y, bot.radius, 0, 2 * Math.PI);
    context.fill();
}
