var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.Room = function (game_state, coordinate) {
    "use strict";
    this.MIN_OBSTACLES = 5;
    this.MAX_OBSTACLES = 10;

    this.game_state = game_state;
    this.coordinate = coordinate;

    this.neighbors = {};
    this.obstacles = [];
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

DungeonExplorer.Room.prototype.populate = function (obstacle_tiles, tile_dimensions) {
    "use strict";
    var number_of_obstacles, obstacle_index, tile_index, obstacle_position, tile_dimensions;
    number_of_obstacles = this.game_state.game.rnd.between(this.MIN_OBSTACLES, this.MAX_OBSTACLES);
    for (obstacle_index = 0; obstacle_index < number_of_obstacles; obstacle_index += 1) {
        tile_index = this.game_state.game.rnd.between(0, obstacle_tiles.length - 1);
        obstacle_position = new Phaser.Point(this.game_state.game.rnd.between(1, (this.game_state.game.world.width / tile_dimensions.x) - 2),
                                            this.game_state.game.rnd.between(1, (this.game_state.game.world.height / tile_dimensions.y) - 2));
        this.obstacles.push({tile: obstacle_tiles[tile_index], position: obstacle_position});
    }
};
