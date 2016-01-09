var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ReachExit = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);

    this.prefab.sprite.body.setSize(16, 16, 0, 0);
};

DungeonExplorer.ReachExit.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.ReachExit.prototype.constructor = DungeonExplorer.ReachExit;

DungeonExplorer.ReachExit.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.overlap(this.prefab.sprite, this.game_state.groups.players, this.reach_exit, null, this);
};

DungeonExplorer.ReachExit.prototype.reach_exit = function () {
    "use strict";
    this.game_state.game.state.start("DungeonState", true, false, "assets/levels/room_level.json", 10);
};
