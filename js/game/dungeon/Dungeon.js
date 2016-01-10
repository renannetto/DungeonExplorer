var Phaser = Phaser || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.Dungeon = function (game_state) {
    "use strict";
    this.OBSTACLE_TILES = [35, 37];
    this.ENEMY_PREFABS = ["enemy"];
    this.EXIT_PREFAB = "exit";
    this.TILE_DIMENSIONS = new Phaser.Point(32, 32);

    this.game_state = game_state;
};

DungeonExplorer.Dungeon.prototype.generate_dungeon = function (number_of_rooms) {
    "use strict";
    var grid_size, open_rooms, current_room_coordinate, current_room, created_rooms, initial_room_coordinate, final_room_coordinate, max_distance_to_initial_room, distance_to_initial_room;
    grid_size = 2 * number_of_rooms;
    this.initialize_grid(grid_size);

    initial_room_coordinate = new Phaser.Point((grid_size / 2) - 1, (grid_size / 2) - 1);
    final_room_coordinate = new Phaser.Point(initial_room_coordinate.x, initial_room_coordinate.y);
    open_rooms = [];
    open_rooms.push({row: initial_room_coordinate.y, column: initial_room_coordinate.x});
    created_rooms = [];
    while (open_rooms.length > 0 && created_rooms.length < number_of_rooms) {
        current_room_coordinate = open_rooms.shift();
        current_room = new DungeonExplorer.Room(this.game_state, current_room_coordinate);
        this.grid[current_room_coordinate.row][current_room_coordinate.column] = current_room;
        created_rooms.push(current_room);
        this.check_for_neighbors(current_room, open_rooms);
    }

    max_distance_to_initial_room = 0;
    created_rooms.forEach(function (room) {
        room.neighbor_coordinates().forEach(function (coordinate) {
            if (this.grid[coordinate.row][coordinate.column]) {
                room.connect(coordinate.direction, this.grid[coordinate.row][coordinate.column]);
            }
        }, this);
        room.populate(this.OBSTACLE_TILES, this.ENEMY_PREFABS, this.TILE_DIMENSIONS);
        distance_to_initial_room = Math.abs(room.coordinate.column - initial_room_coordinate.x) + Math.abs(room.coordinate.row - initial_room_coordinate.y);
        if (distance_to_initial_room > max_distance_to_initial_room) {
            final_room_coordinate.x = room.coordinate.column;
            final_room_coordinate.y = room.coordinate.row;
        }
    }, this);

    this.grid[initial_room_coordinate.y][initial_room_coordinate.x].add_exit(this.EXIT_PREFAB, this.TILE_DIMENSIONS);

    this.print_grid();

    return this.grid[initial_room_coordinate.y][initial_room_coordinate.x];
};

DungeonExplorer.Dungeon.prototype.print_grid = function () {
    "use strict";
    var row_index, column_index, row;
    for (row_index = 0; row_index < this.grid.length; row_index += 1) {
        row = "";
        for (column_index = 0; column_index < this.grid[row_index].length; column_index += 1) {
            if (this.grid[row_index][column_index]) {
                row += "R";
            } else {
                row += "X";
            }
        }
        console.log(row);
    }
};

DungeonExplorer.Dungeon.prototype.initialize_grid = function (grid_size) {
    "use strict";
    var row_index, column_index;
    this.grid = [];
    for (row_index = 0; row_index < grid_size; row_index += 1) {
        this.grid.push([]);
        for (column_index = 0; column_index < grid_size; column_index += 1) {
            this.grid[row_index].push(null);
        }
    }
};

DungeonExplorer.Dungeon.prototype.check_for_neighbors = function (room, open_rooms) {
    "use strict";
    var coordinates_to_check, available_neighbors, number_of_neighbors, neighbor_index, random_number, room_frac, available_neighbor_index;
    coordinates_to_check = room.neighbor_coordinates();
    available_neighbors = [];
    coordinates_to_check.forEach(function (coordinate) {
        if (!this.grid[coordinate.row][coordinate.column]) {
            available_neighbors.push(coordinate);
        }
    }, this);
    number_of_neighbors = this.game_state.game.rnd.between(1, available_neighbors.length - 1);

    for (neighbor_index = 0; neighbor_index < number_of_neighbors; neighbor_index += 1) {
        random_number = this.game_state.game.rnd.frac();
        room_frac = 1 / available_neighbors.length;
        for (available_neighbor_index = 0; available_neighbor_index < available_neighbors.length; available_neighbor_index += 1) {
            if (random_number < room_frac) {
                open_rooms.push(available_neighbors[available_neighbor_index]);
                available_neighbors.splice(available_neighbor_index, 1);
                break;
            } else {
                room_frac += (1 / available_neighbors.length);
            }
        }
    }
};
