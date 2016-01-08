var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.EnterDoor = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);
};

DungeonExplorer.EnterDoor.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.EnterDoor.prototype.constructor = DungeonExplorer.EnterDoor;

DungeonExplorer.EnterDoor.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.overlap(this.prefab.sprite, this.game_state.groups.players, this.enter_door, null, this);
};

DungeonExplorer.EnterDoor.prototype.enter_door = function (door, player) {
    "use strict";
    var next_room;
    next_room = this.game_state.room.neighbors[this.direction];
    this.game_state.game.state.start("BootState", true, false, "RoomState", "assets/levels/example_level.json", {room: next_room});
};
