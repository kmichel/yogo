function draw_game(game, context) {
    draw_background(game, context);
    draw_grid(game, context);
    draw_lasers(game.lasers, context);
    draw_pulses(game.pulses, context);
    draw_bots(game.bots, context);
    draw_player(game.player, context);
}

function draw_background(game, context) {
    context.fillStyle = game.background_color;
    context.fillRect(0, 0, game.width + 1, game.height + 1);
}

function draw_grid(game, context) {
    context.lineWidth = 1;
    draw_subgrid(game.width, game.height, game.grid.minor_color, game.grid.minor_spacing, context);
    draw_subgrid(game.width, game.height, game.grid.major_color, game.grid.major_spacing, context);
}

function draw_subgrid(width, height, color, spacing, context) {
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
        context.moveTo(i + .5, .5);
        context.lineTo(i + .5 - height, height + .5);
        context.moveTo(i + .5, .5);
        context.lineTo(i + .5 + height, height + .5);
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

function draw_lasers(lasers, context) {
    context.lineCap = 'round';
    for (var i = 0; i < lasers.list.length; ++i) {
        var age = lasers.list[i].age / lasers.max_age;
        context.strokeStyle = 'rgba(255, 255, 255,' + (1 - age) + ')';
        context.lineWidth = lasers.width * (1 - age);
        context.beginPath();
        context.moveTo(lasers.list[i].start.x, lasers.list[i].start.y);
        context.lineTo(lasers.list[i].stop.x, lasers.list[i].stop.y);
        context.stroke();
    }
    context.opacity = 1;
}

function draw_pulses(pulses, context) {
    context.lineWidth = 1;
    var length = pulses.length;
    var steps = pulses.steps;
    for (var i = 0; i < pulses.list.length; ++i) {
        var pulse = pulses.list[i];
        context.strokeStyle = 'rgba(255, 255, 255,' + (1 - Math.pow(pulse.age / pulses.max_age, 4)) + ')';
        context.beginPath();
        var normalizer = 1 / Math.sqrt(pulse.direction.x * pulse.direction.x + pulse.direction.y * pulse.direction.y);
        var start_x = pulse.position.x - pulse.direction.x * 0.5 * length * normalizer;
        var start_y = pulse.position.y - pulse.direction.y * 0.5 * length * normalizer;
        var stop_x = pulse.position.x + pulse.direction.x * 0.5 * length * normalizer;
        var stop_y = pulse.position.y + pulse.direction.y * 0.5 * length * normalizer;
        context.moveTo(start_x, start_y);
        for (var j = 0; j < steps; ++j) {
            var ratio = j / steps;
            var amplitude = 2 * Math.sin(0.5 * pulse.age + pulses.phases * Math.PI * j / steps) * Math.cos(Math.PI * j / steps - 0.5 * Math.PI);
            var nx = amplitude * pulse.direction.y * normalizer;
            var ny = amplitude * -pulse.direction.x * normalizer;
            var x = start_x + (stop_x - start_x) * ratio + nx;
            var y = start_y + (stop_y - start_y) * ratio + ny;
            context.lineTo(x, y);
        }
        context.stroke();
    }
}

function draw_bots(bots, context) {
    context.strokeStyle = bots.detection_zone.color;
    context.lineWidth = 1;
    context.beginPath();
    for (var i = 0; i < bots.list.length; ++i) {
        if (bots.list[i].state != 'dead') {
            context.moveTo(bots.list[i].position.x + bots.detection_zone.radius, bots.list[i].position.y);
            context.arc(bots.list[i].position.x, bots.list[i].position.y, bots.detection_zone.radius, 0, 2 * Math.PI);
        }
    }
    context.stroke();

    context.fillStyle = bots.shooting_zone.color;
    context.beginPath();
    for (i = 0; i < bots.list.length; ++i)
        if (bots.list[i].state != 'dead')
            context.arc(bots.list[i].position.x, bots.list[i].position.y, bots.shooting_zone.radius, 0, 2 * Math.PI);
    context.fill();

    context.fillStyle = bots.color;
    context.beginPath();
    for (i = 0; i < bots.list.length; ++i)
        context.arc(bots.list[i].position.x, bots.list[i].position.y, bots.radius, 0, 2 * Math.PI);
    context.fill();
}

