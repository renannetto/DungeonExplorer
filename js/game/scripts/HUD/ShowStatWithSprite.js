var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ShowStatWithSprite = function (game_state, prefab, properties) {
    "use strict";
    DungeonExplorer.ShowStat.call(this, game_state, prefab, properties);
};

DungeonExplorer.ShowStatWithSprite.prototype = Object.create(DungeonExplorer.ShowStat.prototype);
DungeonExplorer.ShowStatWithSprite.prototype.constructor = DungeonExplorer.ShowStatWithSprite;

DungeonExplorer.ShowStatWithSprite.prototype.init = function () {
    "use strict";
    this.stat = 0;
    this.stats = [];
};

DungeonExplorer.ShowStatWithSprite.prototype.update_stat = function (new_stat) {
    "use strict";
    var stat_difference, stat_index, stat;
    stat_difference = Math.abs(new_stat - this.stat);
    if (new_stat > this.stat) {
        for (stat_index = 0; stat_index < stat_difference; stat_index += 1) {
            stat = this.create_new_stat_sprite();
            this.stats.push(stat);
        }
    } else {
        for (stat_index = 0; stat_index < stat_difference; stat_index += 1) {
            stat = this.stats.pop();
            stat.kill();
        }
    }
    DungeonExplorer.ShowStat.prototype.update_stat.call(this, new_stat);
};

DungeonExplorer.ShowStatWithSprite.prototype.create_new_stat_sprite = function () {
    "use strict";
    var stat_position, stat, stat_property;
    stat_position = new Phaser.Point(this.prefab.sprite.x + (this.stats.length * this.stats_spacing.x),
                                          this.prefab.sprite.y + (this.stats.length * this.stats_spacing.y));
    stat = this.game_state.groups[this.stats_group].getFirstDead();
    if (stat) {
        stat.reset(stat_position.x, stat_position.y);
    } else {
        stat = this.game_state.groups[this.stats_group].create(stat_position.x, stat_position.y, this.prefab.sprite.texture);
    }
    for (stat_property in this.stats_properties) {
        if (this.stats_properties.hasOwnProperty(stat_property)) {
            if (stat_property === "anchor") {
                stat[stat_property].setTo(this.stats_properties[stat_property].x, this.stats_properties[stat_property].y);
            } else if (stat_property === "scale") {
                stat[stat_property].setTo(this.stats_properties[stat_property].x, this.stats_properties[stat_property].y);
            } else {
                stat[stat_property] = this.stats_properties[stat_property];
            }
        }
    }
    return stat;
};
