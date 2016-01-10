var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.EnterDoor = function (game_state, prefab, properties) {
    "use strict";
    DungeonExplorer.LockedByEnemies.call(this, game_state, prefab, properties);

    this.prefab.sprite.body.setSize(16, 16, 0, 0);

    this.player_positions = {
        S: {x: this.game_state.game.world.width / 2, y: 3 * this.prefab.sprite.height / 2},
        W: {x: this.game_state.game.world.width - 3 * this.prefab.sprite.width / 2, y: this.game_state.game.world.height / 2},
        N: {x: this.game_state.game.world.width / 2, y: this.game_state.game.world.height - 3 * this.prefab.sprite.height / 2},
        E: {x: 3 * this.prefab.sprite.width / 2, y: this.game_state.game.world.height / 2}
    };
};

DungeonExplorer.EnterDoor.prototype = Object.create(DungeonExplorer.LockedByEnemies.prototype);
DungeonExplorer.EnterDoor.prototype.constructor = DungeonExplorer.EnterDoor;

DungeonExplorer.EnterDoor.prototype.update = function () {
    "use strict";
    if (!this.locked) {
        this.game_state.game.physics.arcade.overlap(this.prefab.sprite, this.game_state.groups.players, this.enter_door, null, this);
    }
};

DungeonExplorer.EnterDoor.prototype.enter_door = function (door, player) {
    "use strict";
    var next_room;
    next_room = this.game_state.room.neighbors[this.direction];
    this.game_state.player_position = this.player_positions[this.direction];
    this.game_state.cleared_rooms.push(this.game_state.room.template_name());
    this.game_state.game.state.start("BootState", true, false, "RoomState", "assets/levels/room_level.json", {room: next_room});
};
