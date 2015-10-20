var Phaser = Phaser || {};
var EasyStar = EasyStar || {};
var Engine = Engine || {};

Engine.Pathfinding = function (game, parent) {
    "use strict";
    Phaser.Plugin.call(this, game, parent);
    this.easy_star = new EasyStar.js();
};

Engine.Pathfinding.prototype = Object.create(Phaser.Plugin.prototype);
Engine.Pathfinding.prototype.constructor = Engine.Pathfinding;

Engine.Pathfinding.prototype.init = function (world_grid, acceptable_tiles, tile_dimensions) {
    "use strict";
    var grid_row, grid_column, grid_indices;
    grid_indices = [];
    for (grid_row = 0; grid_row < world_grid.length; grid_row += 1) {
        grid_indices[grid_row] = [];
        for (grid_column = 0; grid_column < world_grid[grid_row].length; grid_column += 1) {
            grid_indices[grid_row][grid_column] = world_grid[grid_row][grid_column].index;
        }
    }

    this.easy_star.setGrid(grid_indices);
    this.easy_star.setAcceptableTiles(acceptable_tiles);

    this.tile_dimensions = tile_dimensions;
};

Engine.Pathfinding.prototype.find_path = function (origin, target, callback, context) {
    "use strict";
    var origin_coord, target_coord;

    origin_coord = this.get_coord_from_point(origin);
    target_coord = this.get_coord_from_point(target);

    this.easy_star.findPath(origin_coord.row, origin_coord.column, target_coord.row, target_coord.column, this.call_callback_function.bind(this, callback, context));
    this.easy_star.calculate();
};

Engine.Pathfinding.prototype.call_callback_function = function (callback, context, path) {
    "use strict";
    var path_positions;
    path_positions = [];
    path.forEach(function (path_coord) {
        path_positions.push(this.get_point_from_coord({row: path_coord.x, column: path_coord.y}));
    }, this);
    callback.call(context, path_positions);
};

Engine.Pathfinding.prototype.get_coord_from_point = function (point) {
    "use strict";
    var row, column;
    row = Math.floor(point.y / this.tile_dimensions.y);
    column = Math.floor(point.x / this.tile_dimensions.x);
    return {row: row, column: column};
};

Engine.Pathfinding.prototype.get_point_from_coord = function (coord) {
    "use strict";
    var x, y;
    x = (coord.column * this.tile_dimensions.x) + (this.tile_dimensions.x / 2);
    y = (coord.row * this.tile_dimensions.y) + (this.tile_dimensions.y / 2);
    return new Phaser.Point(x, y);
};
