var Phaser = Phaser || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.DungeonState = function () {
    "use strict";
    Phaser.State.call(this);

    this.LEVEL_FILE = "assets/levels/room_level.json";
    this.POPULATION_FILE = "assets/levels/population.json";
};

DungeonExplorer.DungeonState.prototype = Object.create(Phaser.State.prototype);
DungeonExplorer.DungeonState.prototype.constructor = DungeonExplorer.DungeonState;

DungeonExplorer.DungeonState.prototype.init = function (number_of_rooms) {
    "use strict";
    this.number_of_rooms = number_of_rooms;
    this.dungeon = this.dungeon || new DungeonExplorer.Dungeon(this);
};

DungeonExplorer.DungeonState.prototype.preload = function () {
    "use strict";
    this.load.text("population", this.POPULATION_FILE);
};

DungeonExplorer.DungeonState.prototype.create = function () {
    "use strict";
    var initial_room;
    initial_room = this.dungeon.generate_dungeon(this.number_of_rooms);
    this.game.state.start("BootState", true, false, "RoomState", this.LEVEL_FILE, {room: initial_room});
};
