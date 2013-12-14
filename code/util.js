function get_allowed_directions(cell) {
    var directions = [];
    if (cell.allow_up)
        directions.push({y:-1, x:0});
    if (cell.allow_down)
        directions.push({y:1, x:0});
    if (cell.allow_left)
        directions.push({y:0, x:-1});
    if (cell.allow_right)
        directions.push({y:0, x:1});
    if (cell.allow_diagonals) {
        if (cell.allow_up && cell.allow_left)
            directions.push({y:-1, x:-1});
        if (cell.allow_up && cell.allow_right)
            directions.push({y:-1, x:1});
        if (cell.allow_down && cell.allow_left)
            directions.push({y:1, x:-1});
        if (cell.allow_down && cell.allow_right)
            directions.push({y:1, x:1});
    }
    return directions;
}

function pick_random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function is_distance_less_than(a, b, distance) {
    var delta_x = a.x - b.x;
    var delta_y = a.y - b.y;
    return (delta_x * delta_x + delta_y * delta_y) < distance * distance;
}

function get_nearest_bot_alive(player, bots, radius) {
    var nearest_bot = null;
    var min_squared_distance = radius ? radius * radius : Infinity;
    for (var i = 0; i < bots.list.length; ++i) {
        var bot = bots.list[i];
        if (bot.state == 'resting' || bot.state == 'moving') {
            var dx = bot.position.x - player.position.x;
            var dy = bot.position.y - player.position.y;
            var squared_distance = dx * dx + dy * dy;
            if (squared_distance < min_squared_distance) {
                min_squared_distance = squared_distance;
                nearest_bot = bot;
            }
        }
    }
    return nearest_bot;
}
