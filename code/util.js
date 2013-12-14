function get_neighbors(game, cell) {
    var neighbors = [];
    var cells = game.grid.cells;
    if (cell.allow_up)
        neighbors.push(cells[cell.id.y - 1][cell.id.x]);
    if (cell.allow_down)
        neighbors.push(cells[cell.id.y + 1][cell.id.x]);
    if (cell.allow_left)
        neighbors.push(cells[cell.id.y][cell.id.x - 1]);
    if (cell.allow_right)
        neighbors.push(cells[cell.id.y][cell.id.x + 1]);
    if (cell.allow_diagonals) {
        if (cell.allow_up && cell.allow_left)
            neighbors.push(cells[cell.id.y - 1][cell.id.x - 1]);
        if (cell.allow_up && cell.allow_right)
            neighbors.push(cells[cell.id.y - 1][cell.id.x + 1]);
        if (cell.allow_down && cell.allow_left)
            neighbors.push(cells[cell.id.y + 1][cell.id.x - 1]);
        if (cell.allow_down && cell.allow_right)
            neighbors.push(cells[cell.id.y + 1][cell.id.x + 1]);
    }
    return neighbors;
}

function pick_random(array) {
    return array[Math.floor(Math.random() * array.length)];
}
