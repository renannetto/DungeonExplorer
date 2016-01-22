var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ReachExit = function (game_state, prefab, properties) {
    "use strict";
    DungeonExplorer.LockedByEnemies.call(this, game_state, prefab, properties);
};

DungeonExplorer.ReachExit.prototype = Object.create(DungeonExplorer.LockedByEnemies.prototype);
DungeonExplorer.ReachExit.prototype.constructor = DungeonExplorer.ReachExit;

DungeonExplorer.ReachExit.prototype.reach_exit = function () {
    "use strict";
    if (!this.locked) {
        this.game_state.game.state.start("DungeonState", true, false, 10);
    }
};
