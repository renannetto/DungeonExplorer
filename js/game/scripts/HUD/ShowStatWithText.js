var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ShowStatWithText = function (game_state, prefab, properties) {
    "use strict";
    Engine.ShowStat.call(this, game_state, prefab, properties);
};

DungeonExplorer.ShowStatWithText.prototype = Object.create(Engine.ShowStat.prototype);
DungeonExplorer.ShowStatWithText.prototype.constructor = DungeonExplorer.ShowStatWithText;

DungeonExplorer.ShowStatWithText.prototype.update_stat = function (new_stat) {
    "use strict";
    DungeonExplorer.ShowStat.prototype.update_stat.call(this, new_stat);
    this.prefab.sprite.text = this.label + ": " + this.stat;
};
