var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ShowStatWithText = function (game_state, prefab, properties) {
    "use strict";
    DungeonExplorer.ShowStat.call(this, game_state, prefab, properties);

    this.prefab.sprite.anchor.setTo(0);
};

DungeonExplorer.ShowStatWithText.prototype = Object.create(DungeonExplorer.ShowStat.prototype);
DungeonExplorer.ShowStatWithText.prototype.constructor = DungeonExplorer.ShowStatWithText;

DungeonExplorer.ShowStatWithText.prototype.update_stat = function (new_stat) {
    "use strict";
    DungeonExplorer.ShowStat.prototype.update_stat.call(this, new_stat);
    this.prefab.sprite.text = this.label + ": " + this.stat;
};
