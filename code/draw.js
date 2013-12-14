function draw_game(game, context) {
    draw_background(game, context);
    draw_grid(game, context);
    for (var i = 0; i < game.bots.length; ++i)
        draw_bot(game.bots[i], context);
    draw_player(game.player, context);
}

function draw_background(game, context) {
    context.fillStyle = game.background_color;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

function draw_grid(game, context) {
    context.lineWidth = 1;
    draw_subgrid(game.grid.minor_color, game.grid.minor_spacing, context);
    draw_subgrid(game.grid.major_color, game.grid.major_spacing, context);
}

function draw_subgrid(color, spacing, context) {
    var width = context.canvas.width;
    var height = context.canvas.height;
    context.strokeStyle = color;
    context.beginPath();
    for (var x = 0; x <= width; x += spacing) {
        context.moveTo(x + .5, 0);
        context.lineTo(x + .5, height);
    }
    for (var y = 0; y <= height; y += spacing) {
        context.moveTo(0, y + .5);
        context.lineTo(width, y + .5);
    }
    for (var i = 0 - height; i <= width + height; i += spacing * 2) {
        context.moveTo(i + 1.5, .5);
        context.lineTo(i + 1.5 - height, height + .5);
        context.moveTo(i + 1.5, .5);
        context.lineTo(i + 1.5 + height, height + .5);
    }
    context.stroke();
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
