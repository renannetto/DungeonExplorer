var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ShowStatWithSprite = function (game_state, prefab, properties) {
    "use strict";
    this.prefabs = [];
    this.prefab_properties = JSON.parse(this.game_state.cache.getText(this.stat_prefab));
    DungeonExplorer.ShowStat.call(this, game_state, prefab, properties);
};

DungeonExplorer.ShowStatWithSprite.prototype = Object.create(DungeonExplorer.ShowStat.prototype);
DungeonExplorer.ShowStatWithSprite.prototype.constructor = DungeonExplorer.ShowStatWithSprite;

DungeonExplorer.ShowStatWithSprite.prototype.update_stat = function (new_stat) {
    "use strict";
    var stat_difference, prefab_index, stat, prefab_name, prefab_position;
    stat_difference = Math.abs(new_stat - this.prefabs.length);
    if (new_stat > this.prefabs.length) {
        for (prefab_index = 0; prefab_index < stat_difference; prefab_index += 1) {
            prefab_name = this.prefab.sprite.name + this.prefabs.length;
            prefab_position = new Phaser.Point(this.prefab.sprite.x + (this.prefabs.length * this.prefab_spacing.x),
                                              this.prefab.sprite.y + (this.prefabs.length * this.prefab.spacing.y));
            stat = this.game_state.prefab_factory.create_prefab(prefab_name, prefab_position, this.prefab_properties);
        }
    } else {
        for (prefab_index = 0; prefab_index < stat_difference; prefab_index += 1) {
            stat = this.prefabs.pop();
            stat.kill();
        }
    }
    DungeonExplorer.ShowStat.prototype.update_stat.call(this, new_stat);
};
