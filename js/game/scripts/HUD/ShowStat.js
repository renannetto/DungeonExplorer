var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ShowStat = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);
    this.update_stat(this.game_state.prefabs[this.prefab_to_show].scripts[this.script_to_show][this.property_to_show]);
};

DungeonExplorer.ShowStat.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.ShowStat.prototype.constructor = DungeonExplorer.ShowStat;

DungeonExplorer.ShowStat.prototype.update = function () {
    "use strict";
    var new_stat;
    new_stat = this.game_state.prefabs[this.prefab_to_show].scripts[this.script_to_show][this.property_to_show];
    if (this.stat !== new_stat) {
        this.update_stat(new_stat);
    }
};

DungeonExplorer.ShowStat.prototype.update_stat = function (new_stat) {
    "use strict";
    this.stat = new_stat;
};
