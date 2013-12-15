function tick_game(game) {
    tick_player(game, game.player);
    tick_list(tick_footstep, game, game.footsteps.list);
    tick_list(tick_pulse, game, game.pulses.list);
    tick_list(tick_bot, game, game.bots.list);
    tick_list(tick_laser, game, game.lasers.list);
    tick_list(tick_segment, game, game.barriers.segments.list);
    update_segments(game.barriers, game.bots);
    game.tick += 1;
}

function tick_list(callback, game, list) {
    for (var i = 0; i < list.length; ++i) {
        var must_delete_item = callback(game, list[i]);
        if (must_delete_item) {
            list.splice(i, 1);
            --i;
        }
    }
}

function tick_player(game, player) {
    if (player.state == 'alive') {
        if (player.can_shoot)
            player.nearest_bot_alive = get_nearest_bot_alive(game.player.position, game.bots, player.shooting_radius);
        if (player.was_aiming && !game.keys.space && player.can_shoot) {
            if (player.nearest_bot_alive) {
                player.can_shoot = false;
                game.lasers.list.push({
                    start: {x: game.player.position.x, y: game.player.position.y},
                    stop: {x: player.nearest_bot_alive.position.x, y: player.nearest_bot_alive.position.y},
                    age: 0
                });
                play_sound('laser');
                player.nearest_bot_alive.state = 'dying';
                player.nearest_bot_alive = null;
            }
        }
        player.was_aiming = game.keys.space;
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
        var is_moving = false;
        player.is_running = !game.keys.shift;
        var speed = player.is_running ? game.player.run_speed : game.player.walk_speed;
        if (x != 0 || y != 0) {
            var inverse_length = 1 / Math.sqrt(x * x + y * y);
            player.direction.x = x * inverse_length;
            player.direction.y = y * inverse_length;
            player.position.x += x * inverse_length * speed;
            player.position.y += y * inverse_length * speed;
            player.distance_since_last_footstep += speed;
            is_moving = true;
        }
        if (player.is_running) {
            if (player.distance_since_last_footstep > player.footstep_interval || (player.was_moving && !is_moving)) {
                play_sound(game.footsteps.sound_cycle == 0 ? 'footstep_1' : 'footstep_2');
                game.footsteps.sound_cycle = (game.footsteps.sound_cycle + 1) % 2;
                game.footsteps.list.push({
                    position: {x: player.position.x, y: player.position.y},
                    radius: game.footsteps.start_radius,
                    age: 0
                });
                player.distance_since_last_footstep = 0;
            }
        } else {
            // Allow 'run-toggling' but make it dangerous
            player.distance_since_last_footstep *= 0.9;
        }
        player.was_moving = is_moving;
        player.age += 1;
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
        play_sound('barrier_broken');
        must_delete_pulse = true;
    }

    var nearest_reflector = get_nearest_item(pulse.position, game.barriers.reflectors.list, 2);
    if (nearest_reflector) {
        remove_item(game.barriers.reflectors.list, nearest_reflector);
        play_sound('barrier_broken');
        must_delete_pulse = true;
    }

    pulse.age += 1;
    if (pulse.age > game.pulses.max_age)
        must_delete_pulse = true;

    return must_delete_pulse;
}

function tick_laser(game, laser) {
    laser.age += 1;
    laser.start.x = laser.start.x * 0.9 + laser.stop.x * 0.1;
    laser.start.y = laser.start.y * 0.9 + laser.stop.y * 0.1;
    return laser.age >= game.lasers.max_age;
}

function tick_bot(game, bot) {
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
            if (is_distance_less_than(bot.position, game.player.position, game.bots.shooting_zone.radius + game.player.radius)) {
                game.lasers.list.push({
                    start: {x: bot.position.x, y: bot.position.y},
                    stop: {x: game.player.position.x, y: game.player.position.y},
                    age: 0
                });
                play_sound('laser');
                setTimeout(function () {
                    play_sound('player_death');
                }, 50);
                game.player.state = 'dead';
            }
        }
    }
    if (bot.state == 'resting') {
        if (game.player.state == 'alive') {
            for (var i = 0; i < game.footsteps.list.length; ++i) {
                var footstep = game.footsteps.list[i];
                if (is_distance_less_than(bot.position, footstep.position, game.bots.detection_zone.radius + footstep.radius)) {
                    var directions = get_allowed_directions(bot.cell);
                    var min_direction = null;
                    var min_squared_distance = Infinity;
                    for (var j = 0; j < directions.length; ++j) {
                        var direction = directions[j];
                        var dx = bot.position.x + direction.x * game.grid.minor_spacing - footstep.position.x;
                        var dy = bot.position.y + direction.y * game.grid.minor_spacing - footstep.position.y;
                        var squared_distance = dx * dx + dy * dy;
                        if (squared_distance < min_squared_distance) {
                            min_squared_distance = squared_distance;
                            min_direction = direction;
                        }
                    }
                    bot.target_cell = game.grid.cells[bot.cell.id.y + min_direction.y][bot.cell.id.x + min_direction.x];
                    bot.state = 'moving';
                    break;
                }
            }
        }
    } else if (bot.state == 'moving') {
        var target_x = bot.target_cell.position.x;
        var target_y = bot.target_cell.position.y;
        var delta_x = target_x - bot.position.x;
        var delta_y = target_y - bot.position.y;
        var delta_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
        if (delta_length <= game.bots.speed) {
            bot.position.x = target_x;
            bot.position.y = target_y;
            bot.cell = bot.target_cell;
            bot.target_cell = null;
            bot.state = 'resting';
        } else {
            bot.position.x += delta_x * game.bots.speed / delta_length;
            bot.position.y += delta_y * game.bots.speed / delta_length;
        }
    }
    return false;
}

function fire_pulses_around_bot(game, bot) {
    play_sound('pulse');
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
    if (game.player.state != 'dead') {
        var distance = get_point_segment_distance(game.player.position, segment.start, segment.stop);
        if (distance < game.player.radius) {
            play_sound('player_burned');
            game.player.state = 'dead';
        }
    }
    return false;
}

function tick_footstep(game, footstep) {
    footstep.age += 1;
    var ratio = Math.pow(footstep.age / game.footsteps.max_age, 1 / 2);
    footstep.radius = game.footsteps.start_radius + ratio * (game.footsteps.end_radius - game.footsteps.start_radius);
    return footstep.age >= game.footsteps.max_age;
}
