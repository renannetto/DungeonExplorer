var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ShowMinimap = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);
};

DungeonExplorer.ShowMinimap.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.ShowMinimap.prototype.constructor = DungeonExplorer.ShowMinimap;

DungeonExplorer.ShowMinimap.prototype.init = function () {
    "use strict";
    this.show(this.game_state.dungeon.grid);
};

DungeonExplorer.ShowMinimap.prototype.show = function (rooms_grid) {
    "use strict";
    var translation, row_index, column_index, room_name, room_position, dungeon_string;

    dungeon_string = "";

    translation = new Phaser.Point(this.game_state.room.coordinate.column * this.room_dimensions.x,
                                           this.game_state.room.coordinate.row * this.room_dimensions.y);

    for (row_index = 0; row_index < rooms_grid.length; row_index += 1) {
        for (column_index = 0; column_index < rooms_grid[row_index].length; column_index += 1) {
            if (rooms_grid[row_index][column_index]) {
                room_name = "minimap_room_" + row_index + "_" + column_index;
                room_position = new Phaser.Point(this.prefab.sprite.position.x + (column_index * this.room_dimensions.x),
                                                this.prefab.sprite.position.y + (row_index * this.room_dimensions.y));
                room_position.x -= translation.x;
                room_position.y -= translation.y;

                dungeon_string += "R";
            } else {
                dungeon_string += "X";
            }
        }
        dungeon_string += "\n";
    }

    console.log(dungeon_string);
};
