var Phaser = Phaser || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.Room = function (game_state, coordinate) {
    "use strict";
    this.MIN_OBSTACLES = 5;
    this.MAX_OBSTACLES = 10;
    this.MIN_ENEMIES = 1;
    this.MAX_ENEMIES = 3;

    this.game_state = game_state;
    this.coordinate = coordinate;

    this.population = [];
    this.neighbors = {};
    this.obstacles = [];
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

DungeonExplorer.Room.prototype.populate = function (obstacle_tiles, enemies_data, tile_dimensions) {
    "use strict";
    var number_of_rows, number_of_columns, row_index, column_index;
    number_of_rows = this.game_state.game.world.height / tile_dimensions.y;
    number_of_columns = this.game_state.game.world.width / tile_dimensions.x;
    for (row_index = 0; row_index <= number_of_rows; row_index += 1) {
        this.population.push([]);
        for (column_index = 0; column_index <= number_of_columns; column_index += 1) {
            this.population[row_index][column_index] = null;
        }
    }
    this.populate_obstacles(obstacle_tiles, tile_dimensions);
    this.populate_enemies(enemies_data, tile_dimensions);
};

DungeonExplorer.Room.prototype.populate_obstacles = function (obstacle_tiles, tile_dimensions) {
    "use strict";
    var number_of_obstacles, obstacle_index, tile_index, obstacle_position;
    number_of_obstacles = this.game_state.game.rnd.between(this.MIN_OBSTACLES, this.MAX_OBSTACLES);
    for (obstacle_index = 0; obstacle_index < number_of_obstacles; obstacle_index += 1) {
        tile_index = this.game_state.game.rnd.between(0, obstacle_tiles.length - 1);
        obstacle_position = this.find_free_tile(tile_dimensions);
        this.obstacles.push({tile: obstacle_tiles[tile_index], position: obstacle_position});
    }
};

DungeonExplorer.Room.prototype.populate_enemies = function (enemy_prefabs, tile_dimensions) {
    "use strict";
    var number_of_enemies, enemy_index, enemy_prefab_index, enemy_tile, enemy_position;
    number_of_enemies = this.game_state.game.rnd.between(this.MIN_ENEMIES, this.MAX_ENEMIES);
    for (enemy_index = 0; enemy_index < number_of_enemies; enemy_index += 1) {
        enemy_prefab_index = this.game_state.game.rnd.between(0, enemy_prefabs.length - 1);
        enemy_tile = this.find_free_tile(tile_dimensions);
        enemy_position = new Phaser.Point(enemy_tile.x * tile_dimensions.x, enemy_tile.y * tile_dimensions.y);
        this.prefabs.push({name: "enemy" + enemy_index, prefab: enemy_prefabs[enemy_prefab_index], position: enemy_position});
    }
};

DungeonExplorer.Room.prototype.add_exit = function (exit_prefab, tile_dimensions) {
    "use strict";
    var tile, position;
    tile = this.find_free_tile(tile_dimensions);
    position = new Phaser.Point(tile.x * tile_dimensions.x, tile.y * tile_dimensions.y);
    this.prefabs.push({name: "exit", prefab: exit_prefab, position: position});
};

DungeonExplorer.Room.prototype.find_free_tile = function (tile_dimensions) {
    "use strict";
    var position;
    position = new Phaser.Point(this.game_state.game.rnd.between(2, (this.game_state.game.world.width / tile_dimensions.x) - 3),
                                this.game_state.game.rnd.between(2, (this.game_state.game.world.height / tile_dimensions.y) - 3));
    while (this.population[position.y][position.x]) {
        position = new Phaser.Point(this.game_state.game.rnd.between(2, (this.game_state.game.world.width / tile_dimensions.x) - 3),
                                    this.game_state.game.rnd.between(2, (this.game_state.game.world.height / tile_dimensions.y) - 3));
    }
    return position;
};
