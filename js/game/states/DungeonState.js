var Phaser = Phaser || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.DungeonState = function () {
    "use strict";
    Phaser.State.call(this);
};

DungeonExplorer.DungeonState.prototype = Object.create(Phaser.State.prototype);
DungeonExplorer.DungeonState.prototype.constructor = DungeonExplorer.DungeonState;

DungeonExplorer.DungeonState.prototype.init = function (level_file, number_of_rooms) {
    "use strict";
    this.level_file = level_file;
    
    this.number_of_rooms = number_of_rooms;
    this.dungeon = this.dungeon || new DungeonExplorer.Dungeon(this);
};

DungeonExplorer.DungeonState.prototype.create = function () {
    "use strict";
    var initial_room;
    initial_room = this.dungeon.generate_dungeon(this.number_of_rooms);
    this.game.state.start("BootState", true, false, "RoomState", this.level_file, {room: initial_room});
};
