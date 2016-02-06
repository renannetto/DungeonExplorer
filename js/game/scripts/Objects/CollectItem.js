var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.CollectItem = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);
};

DungeonExplorer.CollectItem.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.CollectItem.prototype.constructor = DungeonExplorer.CollectItem;

DungeonExplorer.CollectItem.prototype.collect_item = function (item, player) {
    "use strict";
    var player_prefab;
    player_prefab = this.game_state.prefabs[player.name];
    player_prefab.scripts.player_stats.stats[this.stat] += this.value;
    this.prefab.kill();
};
