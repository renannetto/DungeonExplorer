var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.SaveGameStats = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);
};

DungeonExplorer.SaveGameStats.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.SaveGameStats.prototype.constructor = DungeonExplorer.SaveGameStats;

DungeonExplorer.SaveGameStats.prototype.init = function () {
    "use strict";
    this.game_stats = {};
    this.listeners.forEach(function (listener) {
        this.game_stats[listener.stat_name] = 0;
    }, this);

};

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
    this.game_stats[stat_name] += value;
};
