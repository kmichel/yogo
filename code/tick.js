function tick_game(game) {
    tick_player(game, game.player);
    for (var i = 0; i < game.pulses.list.length; ++i)
        tick_pulse(game, game.pulses.list[i]);
    for (i = 0; i < game.bots.list.length; ++i)
        tick_bot(game, game.bots.list[i], game.bots.speed);
    for (i = 0; i < game.lasers.list.length; ++i)
        tick_laser(game, game.lasers.list[i]);
    for (i = 0; i < game.barriers.segments.list.length; ++i)
        tick_segment(game, game.barriers.segments.list[i]);
    game.tick += 1;
}

function tick_player(game, player) {
    if (player.state == 'alive') {
        if (player.can_shoot)
            player.nearest_bot_alive = get_nearest_bot_alive(game.player.position, game.bots, player.shooting_radius);
        if (game.keys.space && player.can_shoot) {
            if (player.nearest_bot_alive) {
                player.can_shoot = false;
                game.lasers.list.push({
                    start: {x: player.nearest_bot_alive.position.x, y: player.nearest_bot_alive.position.y},
                    stop: {x: game.player.position.x, y: game.player.position.y},
                    age: 0
                });
                player.nearest_bot_alive.state = 'dying';
                player.nearest_bot_alive = null;
            }
            game.keys.space = false;
        }
        var x = 0;
        var y = 0;
        if (game.keys.left)
            x -= 1;
        if (game.keys.up)
            y -= 1;
        if (game.keys.right)
            x += 1;
        if (game.keys.down)
            y += 1;
        if (x != 0 || y != 0) {
            var inverse_length = 1 / Math.sqrt(x * x + y * y);
            player.direction.x = x * inverse_length;
            player.direction.y = y * inverse_length;
            player.position.x += x * inverse_length * player.speed;
            player.position.y += y * inverse_length * player.speed;
        }
    }
}

function tick_pulse(game, pulse) {
    if (pulse.position.x < 0 && pulse.direction.x < 0)
        pulse.direction.x *= -1;
    if (pulse.position.x > game.width && pulse.direction.x > 0)
        pulse.direction.x *= -1;
    if (pulse.position.y < 0 && pulse.direction.y < 0)
        pulse.direction.y *= -1;
    if (pulse.position.y > game.height && pulse.direction.y > 0)
        pulse.direction.y *= -1;
    var length = Math.sqrt(pulse.direction.x * pulse.direction.x + pulse.direction.y * pulse.direction.y);
    if (length != 0) {
        pulse.position.x += pulse.direction.x / length * game.pulses.speed;
        pulse.position.y += pulse.direction.y / length * game.pulses.speed;
    }
    var must_delete_pulse = false;
    var nearest_bot = get_nearest_bot_alive(pulse.position, game.bots, 2);
    if (nearest_bot) {
        nearest_bot.state = 'dying';
        must_delete_pulse = true;
    }

    var nearest_emitter = get_nearest_item(pulse.position, game.barriers.emitters.list, 2);
    if (nearest_emitter) {
        remove_item(game.barriers.emitters.list, nearest_emitter);
        update_segments(game.barriers);
        must_delete_pulse = true;
    }

    var nearest_reflector = get_nearest_item(pulse.position, game.barriers.reflectors.list, 2);
    if (nearest_reflector) {
        remove_item(game.barriers.reflectors.list, nearest_reflector);
        update_segments(game.barriers);
        must_delete_pulse = true;
    }

    pulse.age += 1;
    if (pulse.age > game.pulses.max_age)
        must_delete_pulse = true;

    if (must_delete_pulse)
        remove_item(game.pulses.list, pulse);
}

function tick_laser(game, laser) {
    laser.age += 1;
    if (laser.age >= game.lasers.max_age)
        game.lasers.list.splice(game.lasers.list.indexOf(laser), 1);
}

function tick_bot(game, bot, speed) {
    if (bot.state == 'dead') {
        bot.dead_age += 1;
    }
    if (bot.state == 'dying') {
        fire_pulses_around_bot(game, bot);
        bot.dead_age = 0;
        bot.state = 'dead';
    }
    if (bot.state == 'resting' || bot.state == 'moving') {
        if (game.player.state == 'alive') {
            if (is_distance_less_than(bot.position, game.player.position, game.bots.shooting_zone.radius)) {
                game.lasers.list.push({
                    start: {x: bot.position.x, y: bot.position.y},
                    stop: {x: game.player.position.x, y: game.player.position.y},
                    age: 0
                });
                game.player.state = 'dead';
            }
        }
    }
    if (bot.state == 'resting') {
        if (game.player.state == 'alive') {
            if (is_distance_less_than(bot.position, game.player.position, game.bots.detection_zone.radius)) {
                var directions = get_allowed_directions(bot.cell);
                var min_direction = null;
                var min_squared_distance = Infinity;
                for (var i = 0; i < directions.length; ++i) {
                    var direction = directions[i];
                    var dx = bot.position.x + direction.x * game.grid.minor_spacing - game.player.position.x;
                    var dy = bot.position.y + direction.y * game.grid.minor_spacing - game.player.position.y;
                    var squared_distance = dx * dx + dy * dy;
                    if (squared_distance < min_squared_distance) {
                        min_squared_distance = squared_distance;
                        min_direction = direction;
                    }
                }
                bot.target_cell = game.grid.cells[bot.cell.id.y + min_direction.y][bot.cell.id.x + min_direction.x];
                bot.state = 'moving';
            }
        }
    } else if (bot.state == 'moving') {
        var target_x = bot.target_cell.position.x;
        var target_y = bot.target_cell.position.y;
        var delta_x = target_x - bot.position.x;
        var delta_y = target_y - bot.position.y;
        var delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
        if (delta_length <= speed) {
            bot.position.x = target_x;
            bot.position.y = target_y;
            bot.cell = bot.target_cell;
            bot.target_cell = null;
            bot.state = 'resting';
        } else {
            bot.position.x += delta_x * speed / delta_length;
            bot.position.y += delta_y * speed / delta_length;
        }
    }
}

function fire_pulses_around_bot(game, bot) {
    if (bot.target_cell == null) {
        var directions = get_allowed_directions(bot.cell);
        for (var i = 0; i < directions.length; ++i)
            game.pulses.list.push({
                position: {x: bot.position.x, y: bot.position.y},
                direction: {x: directions[i].x, y: directions[i].y},
                age: 0
            });
    } else {
        // The bot is on the line between two cells
        var dx = bot.target_cell.position.x - bot.cell.position.x;
        var dy = bot.target_cell.position.y - bot.cell.position.y;
        var length = Math.sqrt(dx * dx + dy * dy);
        game.pulses.list.push({
            position: {x: bot.position.x, y: bot.position.y},
            direction: {x: dx / length, y: dy / length},
            age: 0
        });
        game.pulses.list.push({
            position: {x: bot.position.x, y: bot.position.y},
            direction: {x: -dx / length, y: -dy / length},
            age: 0
        });
    }
}

function tick_segment(game, segment) {
    var distance = get_point_segment_distance(game.player.position, segment.start, segment.stop);
    if (distance < game.player.radius)
        game.player.state = 'dead';
}
