var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.DungeonState = function () {
    "use strict";
    Engine.JsonLevelState.call(this);
};

DungeonExplorer.DungeonState.prototype = Object.create(Engine.JsonLevelState.prototype);
DungeonExplorer.DungeonState.prototype.constructor = DungeonExplorer.DungeonState;

DungeonExplorer.DungeonState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    Engine.LevelState.prototype.init.call(this, level_data);

    this.prefab_factory = new Engine.PrefabFactory(this, new DungeonExplorer.ScriptFactory(this));

    this.current_level = extra_parameters.level;
    if (this.current_level > this.level_data.levels.length) {
        this.game_over();
    }
    this.current_level_data = this.level_data.levels[this.current_level - 1];

    this.dungeon = this.dungeon || new DungeonExplorer.Dungeon(this);
};

DungeonExplorer.DungeonState.prototype.preload = function () {
    "use strict";
    this.load.text("population", this.current_level_data.population_file);
};

DungeonExplorer.DungeonState.prototype.create = function () {
    "use strict";
    var initial_room, population, stats;
    Engine.JsonLevelState.prototype.create.call(this);

    if (!this.game_stats) {
        this.game_stats = this.game.plugins.add(Engine.GameStats, this, this.level_data.game_stats);
    }

    population = JSON.parse(this.game.cache.getText("population"));
    initial_room = this.dungeon.generate_dungeon(this.current_level_data.number_of_rooms, population);
    this.game.state.start("BootState", true, false, "RoomState", this.level_data.level_files.room, {room: initial_room, current_level: this.current_level, game_stats: this.game_stats});
};

DungeonExplorer.DungeonState.prototype.game_over = function () {
    "use strict";
    this.game.state.start("BootState", true, false, "GameOverState", this.level_data.level_files.game_over, {game_stats: this.game_stats});
};
