var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.EnterDoor = function (game_state, prefab, properties) {
    "use strict";
    DungeonExplorer.LockedByEnemies.call(this, game_state, prefab, properties);
};

DungeonExplorer.EnterDoor.prototype = Object.create(DungeonExplorer.LockedByEnemies.prototype);
DungeonExplorer.EnterDoor.prototype.constructor = DungeonExplorer.EnterDoor;

DungeonExplorer.EnterDoor.prototype.init = function () {
    "use strict";
    this.player_positions = {
        S: {x: this.game_state.game.world.width / 2, y: 3 * this.prefab.sprite.height / 2},
        W: {x: this.game_state.game.world.width - 3 * this.prefab.sprite.width / 2, y: this.game_state.game.world.height / 2},
        N: {x: this.game_state.game.world.width / 2, y: this.game_state.game.world.height - 3 * this.prefab.sprite.height / 2},
        E: {x: 3 * this.prefab.sprite.width / 2, y: this.game_state.game.world.height / 2}
    };
};

DungeonExplorer.EnterDoor.prototype.enter_door = function () {
    "use strict";
    var next_room, persistent_data;
    if (!this.locked) {
        next_room = this.game_state.room.neighbors[this.direction];
        this.save_persistent_data();
        this.game_state.room.cleared = true;
        this.game_state.game.state.start("BootState", true, false, "RoomState", "assets/levels/room_level.json", {room: next_room});
    }
};

DungeonExplorer.EnterDoor.prototype.save_persistent_data = function () {
    "use strict";
    this.game_state.player_position = this.player_positions[this.direction];
    this.game_state.persistent_data.player = {
        "player_stats.stats": this.game_state.prefabs.player.scripts.player_stats.stats
    };
};
