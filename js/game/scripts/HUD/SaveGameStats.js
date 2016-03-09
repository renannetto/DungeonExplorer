var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.SaveGameStats = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);
};

DungeonExplorer.SaveGameStats.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.SaveGameStats.prototype.constructor = DungeonExplorer.SaveGameStats;

DungeonExplorer.SaveGameStats.prototype.listen_to_events = function (groups) {
    "use strict";
    this.listeners.forEach(function (listener) {
        groups[listener.group].forEach(function (sprite) {
            sprite.events[listener.signal].add(this.save_stat, this, 0, listener.stat_name, listener.value);
        }, this);
    }, this);
};

DungeonExplorer.SaveGameStats.prototype.save_stat = function (sprite, stat_name, value) {
    "use strict";
    this.game_stats[stat_name].value += value;
};

DungeonExplorer.SaveGameStats.prototype.show_stats = function (game_state) {
    "use strict";
    var position, game_stat, game_stat_text;
    position = new Phaser.Point(this.game_stats_position.x, this.game_stats_position.y);
    for (game_stat in this.game_stats) {
        if (this.game_stats.hasOwnProperty(game_stat)) {
            game_stat_text = new Phaser.Text(game_state.game, position.x, position.y,
                                             this.game_stats[game_stat].text + this.game_stats[game_stat].value,
                                            Object.create(this.game_stats_text_style));
            game_stat_text.anchor.setTo(this.prefab.sprite.anchor.x, this.prefab.sprite.anchor.y);
            game_state.groups[this.game_stats_group].add(game_stat_text);
            position.y += this.game_stats_spacing;
        }
    }
};
