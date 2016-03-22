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
        this.save_persistent_data();
        this.game_state.game.state.start("BootState", true, false, "DungeonState", "assets/levels/dungeon.json", {level: this.game_state.current_level + 1});
    }
};

DungeonExplorer.ReachExit.prototype.save_persistent_data = function () {
    "use strict";
    this.game_state.persistent_data.player = {
        "player_stats.stats": this.game_state.prefabs.player.scripts.player_stats.stats
    };
};
