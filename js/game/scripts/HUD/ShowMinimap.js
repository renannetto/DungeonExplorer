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
    var translation, row_index, column_index, room_name, room_position, room_color;

    translation = new Phaser.Point(this.game_state.room.coordinate.column * (this.room_dimensions.x + this.room_spacing.x),
                                           this.game_state.room.coordinate.row * (this.room_dimensions.y + this.room_spacing.y));

    for (row_index = 0; row_index < rooms_grid.length; row_index += 1) {
        for (column_index = 0; column_index < rooms_grid[row_index].length; column_index += 1) {
            if (rooms_grid[row_index][column_index] && this.visible(rooms_grid[row_index][column_index])) {
                room_name = "minimap_room_" + row_index + "_" + column_index;
                room_position = new Phaser.Point((this.prefab.sprite.width / 2) + (column_index * (this.room_dimensions.x + this.room_spacing.x)),
                                                (this.prefab.sprite.height / 2) + (row_index * (this.room_dimensions.y + this.room_spacing.y)));
                room_position.x -= translation.x;
                room_position.y -= translation.y;

                room_color = (rooms_grid[row_index][column_index] === this.game_state.room) ? this.current_room_color : this.room_color;
                this.prefab.sprite.key.rect(room_position.x, room_position.y, this.room_dimensions.x, this.room_dimensions.y, room_color);
            }
        }
    }
};

DungeonExplorer.ShowMinimap.prototype.visible = function (room) {
    "use strict";
    return room.cleared || (room === this.game_state.room);
};
