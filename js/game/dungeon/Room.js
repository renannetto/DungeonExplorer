var Phaser = Phaser || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.Room = function (game_state, coordinate, tile_dimensions) {
    "use strict";
    this.NUMBER_OF_OBSTACLES = {min: 3, max: 5};
    this.NUMBER_OF_ENEMIES = {min: 1, max: 3};
    this.OBSTACLE_SIZES = [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3},
                           {x: 2, y: 1}, {x: 3, y: 1}];
    this.OBSTACLE_LAYER = "collision";

    this.game_state = game_state;
    this.coordinate = coordinate;
    this.tile_dimensions = tile_dimensions;

    this.population = [];
    this.neighbors = {};
    this.tiles = [];
    this.prefabs = [];
};

DungeonExplorer.Room.prototype.neighbor_coordinates = function () {
    "use strict";
    var neighbor_coordinates;
    neighbor_coordinates = [
        {direction: "N", row: this.coordinate.row - 1, column: this.coordinate.column},
        {direction: "E", row: this.coordinate.row, column: this.coordinate.column + 1},
        {direction: "S", row: this.coordinate.row + 1, column: this.coordinate.column},
        {direction: "W", row: this.coordinate.row, column: this.coordinate.column - 1}
    ];
    return neighbor_coordinates;
};

DungeonExplorer.Room.prototype.connect = function (direction, room) {
    "use strict";
    this.neighbors[direction] = room;
};

DungeonExplorer.Room.prototype.template_name = function () {
    "use strict";
    var template_name;
    template_name = "template_";
    this.neighbor_coordinates().forEach(function (coordinate) {
        if (this.neighbors[coordinate.direction]) {
            template_name += coordinate.direction;
        }
    }, this);
    template_name += ".json";
    return template_name;
};

DungeonExplorer.Room.prototype.populate = function (obstacle_tiles, enemies_data) {
    "use strict";
    var number_of_rows, number_of_columns, row_index, column_index, number_of_obstacles, number_of_enemies;
    number_of_rows = this.game_state.game.world.height / this.tile_dimensions.y;
    number_of_columns = this.game_state.game.world.width / this.tile_dimensions.x;
    for (row_index = 0; row_index <= number_of_rows; row_index += 1) {
        this.population.push([]);
        for (column_index = 0; column_index <= number_of_columns; column_index += 1) {
            this.population[row_index][column_index] = null;
        }
    }
    number_of_obstacles = this.game_state.game.rnd.between(this.NUMBER_OF_OBSTACLES.min, this.NUMBER_OF_OBSTACLES.max);
    this.populate_tiles(number_of_obstacles, this.OBSTACLE_LAYER, obstacle_tiles, this.OBSTACLE_SIZES);
    number_of_enemies = this.game_state.game.rnd.between(this.NUMBER_OF_ENEMIES.min, this.NUMBER_OF_ENEMIES.max);
    this.populate_prefabs(number_of_enemies, enemies_data);
};

DungeonExplorer.Room.prototype.populate_tiles = function (number_of_tiles, layer, possible_tiles, possible_sizes) {
    "use strict";
    var index, tile, region_size, region, coordinate_index;
    for (index = 0; index < number_of_tiles; index += 1) {
        tile = this.game_state.game.rnd.pick(possible_tiles);
        region_size = this.game_state.game.rnd.pick(possible_sizes);
        region = this.find_free_region(region_size);
        for (coordinate_index = 0; coordinate_index < region.length; coordinate_index += 1) {
            this.tiles.push({layer: layer, tile: tile, position: region[coordinate_index]});
        }
    }
};

DungeonExplorer.Room.prototype.populate_prefabs = function (number_of_prefabs, possible_prefabs) {
    "use strict";
    var index, prefab, tile_position, position;
    for (index = 0; index < number_of_prefabs; index += 1) {
        prefab = this.game_state.game.rnd.pick(possible_prefabs);
        tile_position = this.find_free_region({x: 1, y: 1});
        position = new Phaser.Point((tile_position[0].x * this.tile_dimensions.x) + (this.tile_dimensions.x / 2),
                                (tile_position[0].y * this.tile_dimensions.y) + (this.tile_dimensions.y / 2));
        this.prefabs.push({name: prefab + index, prefab: prefab, position: position});
    }
};

DungeonExplorer.Room.prototype.find_free_region = function (size_in_tiles) {
    "use strict";
    var center_tile, region, x_coordinate, y_coordinate, initial_x_coordinate, initial_y_coordinate;
    do {
        center_tile = new Phaser.Point(this.game_state.game.rnd.between(2, (this.game_state.game.world.width / this.tile_dimensions.x) - 3),
                                    this.game_state.game.rnd.between(2, (this.game_state.game.world.height / this.tile_dimensions.y) - 3));
        region = [center_tile];
        initial_x_coordinate = center_tile.x - Math.floor(size_in_tiles.x / 2);
        initial_y_coordinate = center_tile.y - Math.floor(size_in_tiles.y / 2);
        for (x_coordinate = initial_x_coordinate; x_coordinate < initial_x_coordinate + size_in_tiles.x; x_coordinate += 1) {
            for (y_coordinate = initial_y_coordinate; y_coordinate < initial_y_coordinate + size_in_tiles.y; y_coordinate += 1) {
                region.push(new Phaser.Point(x_coordinate, y_coordinate));
            }
        }
    } while (!this.is_free(region));
    return region;
};

DungeonExplorer.Room.prototype.is_free = function (region) {
    "use strict";
    var coordinate_index, coordinate;
    for (coordinate_index = 0; coordinate_index < region.length; coordinate_index += 1) {
        coordinate = region[coordinate_index];
        if (this.population[coordinate.y][coordinate.x]) {
            return false;
        }
    }
    return true;
};
