function get_allowed_directions(cell) {
    var directions = [];
    if (cell.allow_up)
        directions.push({y: -1, x: 0});
    if (cell.allow_down)
        directions.push({y: 1, x: 0});
    if (cell.allow_left)
        directions.push({y: 0, x: -1});
    if (cell.allow_right)
        directions.push({y: 0, x: 1});
    if (cell.allow_diagonals) {
        if (cell.allow_up && cell.allow_left)
            directions.push({y: -1, x: -1});
        if (cell.allow_up && cell.allow_right)
            directions.push({y: -1, x: 1});
        if (cell.allow_down && cell.allow_left)
            directions.push({y: 1, x: -1});
        if (cell.allow_down && cell.allow_right)
            directions.push({y: 1, x: 1});
    }
    return directions;
}

function is_distance_less_than(a, b, distance) {
    var delta_x = a.x - b.x;
    var delta_y = a.y - b.y;
    return (delta_x * delta_x + delta_y * delta_y) < distance * distance;
}

function get_nearest_bot_alive(position, bots, radius) {
    var nearest_bot = null;
    var min_squared_distance = radius ? radius * radius : Infinity;
    for (var i = 0; i < bots.list.length; ++i) {
        var bot = bots.list[i];
        if (bot.state == 'resting' || bot.state == 'moving') {
            var dx = bot.position.x - position.x;
            var dy = bot.position.y - position.y;
            var squared_distance = dx * dx + dy * dy;
            if (squared_distance < min_squared_distance) {
                min_squared_distance = squared_distance;
                nearest_bot = bot;
            }
        }
    }
    return nearest_bot;
}

function get_nearest_item(position, items, radius) {
    var nearest_item = null;
    var min_squared_distance = radius ? radius * radius : Infinity;
    for (var i = 0; i < items.length; ++i) {
        var item = items[i];
        var dx = item.position.x - position.x;
        var dy = item.position.y - position.y;
        var squared_distance = dx * dx + dy * dy;
        if (squared_distance < min_squared_distance) {
            min_squared_distance = squared_distance;
            nearest_item = item;
        }
    }
    return nearest_item;
}

function rotate(vector, angle) {
    return {
        x: Math.cos(angle) * vector.x - Math.sin(angle) * vector.y,
        y: Math.sin(angle) * vector.x + Math.cos(angle) * vector.y
    }
}

function get_point_segment_distance(point, start, stop) {
    var b_x = start.x;
    var b_y = start.y;
    var d_x = stop.x - start.x;
    var d_y = stop.y - start.y;
    var length = Math.sqrt(d_x * d_x + d_y * d_y);
    var n_x = d_x / length;
    var n_y = d_y / length;
    var rel_x = point.x - b_x;
    var rel_y = point.y - b_y;
    var dot = rel_x * n_x + rel_y * n_y;
    if (dot <= 0)
        return Math.sqrt(rel_x * rel_x + rel_y * rel_y);
    else if (dot > 0 && dot < length) {
        var along_x = dot * n_x;
        var along_y = dot * n_y;
        var across_x = rel_x - along_x;
        var across_y = rel_y - along_y;
        return Math.sqrt(across_x * across_x + across_y * across_y);
    } else {
        var rel_end_x = point.x - stop.x;
        var rel_end_y = point.y - stop.y;
        return Math.sqrt(rel_end_x * rel_end_x + rel_end_y * rel_end_y);
    }
}

function update_segments(barriers, bots) {
    var segments = [];
    var todo = [];
    for (var i = 0; i < barriers.emitters.list.length; ++i) {
        var emitter = barriers.emitters.list[i];
        todo.push({position: emitter.position, direction: emitter.direction});
    }
    var colliders = [];
    for (i = 0; i < barriers.reflectors.list.length; ++i)
        colliders.push(barriers.reflectors.list[i]);
    for (i = 0; i < bots.list.length; ++i)
        colliders.push(bots.list[i]);

    for (i = 0; i < todo.length; ++i) {
        var e_x = todo[i].position.x;
        var e_y = todo[i].position.y;
        var d_x = todo[i].direction.x;
        var d_y = todo[i].direction.y;
        var length = Math.sqrt(d_x * d_x + d_y * d_y);
        var n_x = d_x / length;
        var n_y = d_y / length;
        var nearest_dot = 1000;
        var epsilon = 0.0001;
        var nearest_reflection = null;
        for (var j = 0; j < colliders.length; ++j) {
            var collider = colliders[j];
            var rel_x = collider.position.x - e_x;
            var rel_y = collider.position.y - e_y;
            var dot = rel_x * n_x + rel_y * n_y;
            var along_x = dot * n_x;
            var along_y = dot * n_y;
            var across_x = rel_x - along_x;
            var across_y = rel_y - along_y;
            var distance = Math.sqrt(across_x * across_x + across_y * across_y);
            if (dot > epsilon && dot < nearest_dot && distance < 1) {
                nearest_dot = dot;
                nearest_reflection = collider.reflection;
            }
        }
        if (nearest_reflection) {
            todo.push({
                position: {x: e_x + nearest_dot * n_x, y: e_y + nearest_dot * n_y},
                direction: rotate({x: d_x, y: d_y}, (nearest_reflection == 'clockwise' ? -1 : 1) * Math.PI * 0.5)
            });
        }
        segments.push({
            start: {x: e_x, y: e_y},
            stop: {x: e_x + nearest_dot * n_x, y: e_y + nearest_dot * n_y}
        });
    }
    barriers.segments.list = segments;
}

function remove_item(array, item) {
    array.splice(array.indexOf(item), 1);
}

function count_bots_alive(bots) {
    var bots_left = 0;
    for (var i = 0; i < bots.list.length; ++i)
        if (bots.list[i].state != 'dead')
            bots_left += 1;
    return bots_left;
}
