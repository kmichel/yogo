function draw_game(game, context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.translate(game.margin, game.margin);
    draw_background(game, context);
    draw_grid(game, context);
    draw_lasers(game.lasers, context);
    draw_pulses(game.pulses, context);
    draw_barriers(game.barriers, context);
    draw_overlay(game, context);
    draw_footsteps(game.footsteps, context);
    draw_player(game.player, context);
    draw_bots(game.bots, context);
    draw_exit(game.exit, context);
    draw_text(game, game.text, context);
    draw_buttons(game, context);
    draw_restart(game, context);
    context.translate(-game.margin, -game.margin);
}

function draw_background(game, context) {
    context.fillStyle = game.background_color;
    context.fillRect(0, 0, game.width + 1, game.height + 1);
}

function draw_overlay(game, context) {
    var left_gradient = context.createLinearGradient(-game.margin, 0, 0, 0);
    left_gradient.addColorStop(0, game.overlay_color);
    left_gradient.addColorStop(1, game.overlay_color_2);
    context.fillStyle = left_gradient;
    context.fillRect(-game.margin, -game.margin, game.margin, game.height + 2 * game.margin + 1);

    var right_gradient = context.createLinearGradient(game.width + game.margin + 1, 0, game.width, 0);
    right_gradient.addColorStop(0, game.overlay_color);
    right_gradient.addColorStop(1, game.overlay_color_2);
    context.fillStyle = right_gradient;
    context.fillRect(game.width + game.margin + 1, -game.margin, -game.margin, game.height + 2 * game.margin + 1);

    var top_gradient = context.createLinearGradient(0, -game.margin, 0, 0);
    top_gradient.addColorStop(0, game.overlay_color);
    top_gradient.addColorStop(1, game.overlay_color_2);
    context.fillStyle = top_gradient;
    context.fillRect(-game.margin, -game.margin, game.width + 2 * game.margin + 1, game.margin);

    var bottom_gradient = context.createLinearGradient(0, game.height + game.margin + 1, 0, game.height);
    bottom_gradient.addColorStop(0, game.overlay_color);
    bottom_gradient.addColorStop(1, game.overlay_color_2);
    context.fillStyle = bottom_gradient;
    context.fillRect(-game.margin, game.height + game.margin + 1, game.width + 2 * game.margin + 1, -game.margin);
}

function draw_grid(game, context) {
    context.lineWidth = 1;
    draw_subgrid(game, game.width, game.height, game.grid.minor_color, game.grid.minor_spacing, context);
    draw_subgrid(game, game.width, game.height, game.grid.major_color, game.grid.major_spacing, context);
}

function draw_subgrid(game, width, height, color, spacing, context) {
    context.strokeStyle = color;
    context.beginPath();
    for (var x = 0; x <= width; x += spacing) {
        context.moveTo(x + .5, -game.margin);
        context.lineTo(x + .5, height + game.margin);
    }
    for (var y = 0; y <= height; y += spacing) {
        context.moveTo(-game.margin, y + .5);
        context.lineTo(width + game.margin, y + .5);
    }
    for (var i = 0 - height; i <= width + height; i += spacing * 2) {
        context.moveTo(i + .5 + game.margin, .5 - game.margin);
        context.lineTo(i + .5 - height - game.margin, height + .5 + game.margin);
        context.moveTo(i + .5 - game.margin, .5 - game.margin);
        context.lineTo(i + .5 + height + game.margin, height + .5 + game.margin);
    }
    context.stroke();
}

function draw_player(player, context) {
    if (player.state == 'alive' && player.nearest_bot_alive) {
        context.strokeStyle = player.aim_color;
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.setLineDash([1, 6]);
        context.lineDashOffset = -player.age / 5;
        context.beginPath();
        var dx = player.nearest_bot_alive.position.x - player.position.x;
        var dy = player.nearest_bot_alive.position.y - player.position.y;
        var length = Math.sqrt(dx * dx + dy * dy);
        var nx = dx * player.radius / length;
        var ny = dy * player.radius / length;
        context.moveTo(player.position.x + nx, player.position.y + ny);
        context.lineTo(player.nearest_bot_alive.position.x, player.nearest_bot_alive.position.y);
        context.stroke();
        context.setLineDash([]);
    }
    context.fillStyle = player.is_running ? player.run_color : player.walk_color;
    context.beginPath();
    context.arc(player.position.x, player.position.y, player.radius, 0, 2 * Math.PI);
    context.fill();
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
        var bot = bots.list[i];
        var ratio = bot.state == 'dead' ? Math.max(0, 1 - bot.dead_age / bots.death_animation_length) : 1;
        context.moveTo(bot.position.x + ratio * bots.detection_zone.radius, bot.position.y);
        context.arc(bot.position.x, bot.position.y, ratio * bots.detection_zone.radius, 0, 2 * Math.PI);
    }
    context.stroke();

    context.fillStyle = bots.shooting_zone.color;
    context.beginPath();
    for (i = 0; i < bots.list.length; ++i) {
        bot = bots.list[i];
        ratio = bot.state == 'dead' ? Math.max(0, 1 - bot.dead_age / bots.death_animation_length) : 1;
        context.moveTo(bot.position.x + ratio * bots.shooting_zone.radius, bot.position.y);
        context.arc(bot.position.x, bot.position.y, ratio * bots.shooting_zone.radius, 0, 2 * Math.PI);
    }
    context.fill();

    context.fillStyle = bots.color;
    context.beginPath();
    for (i = 0; i < bots.list.length; ++i) {
        bot = bots.list[i];
        context.moveTo(bot.position.x + ratio * bots.radius, bot.position.y);
        context.arc(bot.position.x, bot.position.y, bots.radius, 0, 2 * Math.PI);
    }
    context.fill();
}

function draw_barriers(barriers, context) {
    context.strokeStyle = barriers.segments.color;
    context.lineWidth = 1;
    context.beginPath();
    for (var i = 0; i < barriers.segments.list.length; ++i) {
        var segment = barriers.segments.list[i];
        context.moveTo(segment.start.x, segment.start.y);
        context.lineTo(segment.stop.x, segment.stop.y);
    }
    context.stroke();

    context.strokeStyle = barriers.reflectors.color;
    context.beginPath();
    for (i = 0; i < barriers.reflectors.list.length; ++i) {
        var reflector = barriers.reflectors.list[i];
        context.moveTo(reflector.position.x + barriers.reflectors.size, reflector.position.y);
        context.lineTo(reflector.position.x, reflector.position.y + barriers.reflectors.size);
        context.lineTo(reflector.position.x - barriers.reflectors.size, reflector.position.y);
        context.lineTo(reflector.position.x, reflector.position.y - barriers.reflectors.size);
        context.lineTo(reflector.position.x + barriers.reflectors.size, reflector.position.y);
    }
    context.stroke();

    context.fillStyle = barriers.emitters.color;
    context.beginPath();
    for (i = 0; i < barriers.emitters.list.length; ++i) {
        emitter = barriers.emitters.list[i];
        var angle = Math.atan2(emitter.direction.y, emitter.direction.x);
        var left_x = emitter.position.x + Math.cos(angle) * -1 - Math.sin(angle) * barriers.emitters.size;
        var left_y = emitter.position.y + Math.sin(angle) * -1 + Math.cos(angle) * barriers.emitters.size;

        var right_x = emitter.position.x + Math.cos(angle) * -1 - Math.sin(angle) * -barriers.emitters.size;
        var right_y = emitter.position.y + Math.sin(angle) * -1 + Math.cos(angle) * -barriers.emitters.size;

        var front_x = emitter.position.x + emitter.direction.x * barriers.emitters.size;
        var front_y = emitter.position.y + emitter.direction.y * barriers.emitters.size;
        context.moveTo(left_x, left_y);
        context.lineTo(front_x, front_y);
        context.lineTo(right_x, right_y);
    }
    context.fill();
}

function draw_footsteps(footsteps, context) {
    context.lineWidth = 1.0001;
    for (var i = 0; i < footsteps.list.length; ++i) {
        var footstep = footsteps.list[i];
        context.strokeStyle = 'rgba(255, 255, 255,' + (0.3 * (1 - Math.pow(footstep.age / footsteps.max_age, 4))) + ')';
        context.beginPath();
        context.arc(footstep.position.x, footstep.position.y, footstep.radius, 0, 2 * Math.PI);
        context.stroke();
    }
}

function draw_exit(exit, context) {
    context.strokeStyle = exit.state == 'open' ? exit.open_color : exit.closed_color;
    context.lineWidth = 2;
    context.beginPath();
    context.arc(exit.position.x, exit.position.y, exit.radius, 0, 2 * Math.PI);
    context.stroke();
}

function draw_text(game, text, context) {
    if (text) {
        var opacity = Math.min(1, Math.max(0.1, 0.02 * ((game.height - game.grid.minor_spacing * 3) - game.player.position.y)));
        context.fillStyle = 'rgba(0, 0, 0, ' + (0.35 * opacity) + ')';
        context.beginPath();
        context.rect(
            game.grid.minor_spacing * 2 + 1, game.height - game.grid.minor_spacing * 3 + 1,
            game.width - game.grid.minor_spacing * 4 - 1, game.grid.minor_spacing * 2 - 1);
        context.fill();
        context.strokeStyle = 'rgba(255, 255, 255,' + (0.07 * opacity) + ')';
        context.lineWidth = 1;
        context.beginPath();
        context.rect(
            game.grid.minor_spacing * 2 + .5, game.height - game.grid.minor_spacing * 3 + .5,
            game.width - game.grid.minor_spacing * 4, game.grid.minor_spacing * 2);
        context.stroke();
        context.font = game.grid.minor_spacing * .8 + "px 'Roboto Slab' monospace";
        context.textAlign = 'center';
        context.textBaseline = 'alphabetic';
        context.fillStyle = 'rgba(0, 0, 0, ' + (0.8 * opacity) + ')';
        context.fillText(text, game.width * .5, game.height - game.grid.minor_spacing * 1.75 + 1);
        context.fillStyle = 'rgba(255, 255, 255,' + (0.7 * opacity) + ')';
        context.fillText(text, game.width * .5, game.height - game.grid.minor_spacing * 1.75);
    }
}

function draw_buttons(game, context) {
    var is_any_button_hovered = false;
    for (var i = 0; i < game.buttons.list.length; ++i) {
        var button = game.buttons.list[i];
        if (button.state != 'disabled') {
            if (button.state != 'resting')
                is_any_button_hovered = true;
            draw_box(
                button.rect.x, button.rect.y, button.rect.width, button.rect.height,
                button.state == 'resting' ? 0.1 : 1, game.images[button.image], context);
        }
    }
    var expected_cursor = is_any_button_hovered ? 'pointer' : null;
    // This reduces styles recalculation
    if (context.canvas.style.cursor != expected_cursor)
        context.canvas.style.cursor = expected_cursor;
}

function draw_restart(game, context) {
    if (game.state == 'level_failed') {
        draw_box(140, 180, 320, 40, 1.0, null, context);
        context.font = game.grid.minor_spacing * .8 + "px 'Roboto Slab' monospace";
        context.textAlign = 'center';
        context.textBaseline = 'alphabetic';
        context.fillStyle = 'rgba(0, 0, 0, ' + (0.8) + ')';
        context.fillText('Press R to restart.', game.width * .5, 205);
        context.fillStyle = 'rgba(255, 255, 255,' + (0.7) + ')';
        context.fillText('Press R to restart.', game.width * .5, 205);
    }
}

function draw_box(x, y, width, height, opacity, image, context) {
    context.fillStyle = 'rgba(0, 0, 0, ' + (0.35 * opacity) + ')';
    context.beginPath();
    context.rect(x + 1, y + 1, width - 1, height - 1);
    context.fill();
    context.strokeStyle = 'rgba(255, 255, 255,' + (0.07 * opacity) + ')';
    context.lineWidth = 1;
    context.beginPath();
    context.rect(x + .5, y + .5, width, height);
    context.stroke();
    if (image && image.state == 'loaded') {
        context.globalAlpha = Math.min(0.7, Math.max(0.2, opacity));
        context.drawImage(image.element, x + 1, y + 1);
        context.globalAlpha = 1;
    }
}
