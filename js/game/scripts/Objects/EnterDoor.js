var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.EnterDoor = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);

    this.prefab.sprite.body.setSize(16, 16, 0, 0);

    this.open = false;
};

DungeonExplorer.EnterDoor.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.EnterDoor.prototype.constructor = DungeonExplorer.EnterDoor;

DungeonExplorer.EnterDoor.prototype.update = function () {
    "use strict";
    if (this.open) {
        this.game_state.game.physics.arcade.overlap(this.prefab.sprite, this.game_state.groups.players, this.enter_door, null, this);
    }
};

DungeonExplorer.EnterDoor.prototype.enter_door = function (door, player) {
    "use strict";
    var next_room;
    next_room = this.game_state.room.neighbors[this.direction];
    this.game_state.game.state.start("BootState", true, false, "RoomState", "assets/levels/room_level.json", {room: next_room});
};

DungeonExplorer.EnterDoor.prototype.listen_to_enemies = function (enemy_group) {
    "use strict";
    enemy_group.forEach(function (enemy_sprite) {
        enemy_sprite.events.onKilled.add(this.check_door, this);
    }, this);
};

DungeonExplorer.EnterDoor.prototype.check_door = function () {
    "use strict";
    if (this.game_state.groups.enemies.countLiving() === 0) {
        this.open = true;
    }
};
