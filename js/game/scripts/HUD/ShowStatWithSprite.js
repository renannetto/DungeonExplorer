var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ShowStatWithSprite = function (game_state, prefab, properties) {
    "use strict";
    var initial_stat, stat_index, stat;
    this.stats = [];
    DungeonExplorer.ShowStat.call(this, game_state, prefab, properties);

    initial_stat = this.game_state.prefabs[this.prefab_to_show].scripts[this.script_to_show][this.property_to_show];
    for (stat_index = 0; stat_index < initial_stat; stat_index += 1) {
        stat = this.create_new_stat_sprite();
        this.stats.push(stat);
    }
    this.stat = initial_stat;
};

DungeonExplorer.ShowStatWithSprite.prototype = Object.create(DungeonExplorer.ShowStat.prototype);
DungeonExplorer.ShowStatWithSprite.prototype.constructor = DungeonExplorer.ShowStatWithSprite;

DungeonExplorer.ShowStatWithSprite.prototype.update_stat = function (new_stat) {
    "use strict";
    var stat_difference, prefab_index, stat, stat_position;
    if (new_stat > this.stat) {
        stat = this.create_new_stat_sprite();
        this.stats.push(stat);
    } else {
        stat = this.stats.pop();
        stat.kill();
    }
    DungeonExplorer.ShowStat.prototype.update_stat.call(this, new_stat);
};

DungeonExplorer.ShowStatWithSprite.prototype.create_new_stat_sprite = function () {
    "use strict";
    var stat_position, stat;
    stat_position = new Phaser.Point(this.prefab.sprite.x + (this.stats.length * this.stats_spacing.x),
                                          this.prefab.sprite.y + (this.stats.length * this.stats_spacing.y));
    stat = this.game_state.groups[this.stats_group].getFirstDead();
    if (stat) {
        stat.reset(stat_position.x, stat_position.y);
    } else {
        stat = this.game_state.groups[this.stats_group].create(stat_position.x, stat_position.y, this.prefab.sprite.texture);
    }
    stat.anchor.setTo(0.5);
    return stat;
};
