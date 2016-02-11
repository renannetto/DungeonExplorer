var Phaser = Phaser || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.Room = function (game_state, coordinate, tile_dimensions) {
    "use strict";
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

DungeonExplorer.Room.prototype.populate = function (population) {
    "use strict";
    var number_of_rows, number_of_columns, row_index, column_index, tile_type, number_of_tiles, prefab_type, number_of_prefabs;
    number_of_rows = this.game_state.game.world.height / this.tile_dimensions.y;
    number_of_columns = this.game_state.game.world.width / this.tile_dimensions.x;
    for (row_index = 0; row_index <= number_of_rows; row_index += 1) {
        this.population.push([]);
        for (column_index = 0; column_index <= number_of_columns; column_index += 1) {
            this.population[row_index][column_index] = null;
        }
    }

    for (tile_type in population.tiles) {
        if (population.tiles.hasOwnProperty(tile_type)) {
            number_of_tiles = this.game_state.game.rnd.between(population.tiles[tile_type].number.min, population.tiles[tile_type].number.min);
            this.populate_tiles(number_of_tiles, population.tiles[tile_type].layer, population.tiles[tile_type].possible_tiles, population.tiles[tile_type].sizes);
        }
    }

    for (prefab_type in population.prefabs) {
        if (population.prefabs.hasOwnProperty(prefab_type)) {
            number_of_prefabs = this.game_state.game.rnd.between(population.prefabs[prefab_type].number.min, population.prefabs[prefab_type].number.min);
            this.populate_prefabs(number_of_prefabs, population.prefabs[prefab_type].possible_prefabs);
        }
    }
};

DungeonExplorer.Room.prototype.populate_tiles = function (number_of_tiles, layer, possible_tiles, possible_sizes) {
    "use strict";
    var index, tile_id, region_size, region, coordinate_index, tile;
    for (index = 0; index < number_of_tiles; index += 1) {
        tile_id = this.game_state.game.rnd.pick(possible_tiles);
        region_size = this.game_state.game.rnd.pick(possible_sizes);
        region = this.find_free_region(region_size);
        for (coordinate_index = 0; coordinate_index < region.length; coordinate_index += 1) {
            tile = {layer: layer, tile: tile_id, position: region[coordinate_index]};
            this.tiles.push(tile);
            this.population[region[coordinate_index].y][region[coordinate_index].x] = tile;
        }
    }
};

DungeonExplorer.Room.prototype.populate_prefabs = function (number_of_prefabs, possible_prefabs_data) {
    "use strict";
    var index, prefab_data, prefab_type, tile_position, position, properties, prefab;
    for (index = 0; index < number_of_prefabs; index += 1) {
        prefab_data = this.game_state.game.rnd.pick(possible_prefabs_data);
        prefab_type = prefab_data.prefab;
        tile_position = this.find_free_region({x: 1, y: 1});
        position = new Phaser.Point((tile_position[0].x * this.tile_dimensions.x) + (this.tile_dimensions.x / 2),
                                (tile_position[0].y * this.tile_dimensions.y) + (this.tile_dimensions.y / 2));
        properties = prefab_data.properties;
        prefab = {name: prefab_type + index, prefab: prefab_type, position: position, properties: properties};
        this.prefabs.push(prefab);
        this.population[tile_position[0].y][tile_position[0].x] = prefab;
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
