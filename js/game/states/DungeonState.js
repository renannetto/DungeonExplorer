var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.DungeonState = function () {
    "use strict";
    Engine.JsonLevelState.call(this);

    this.LEVEL_FILE = "assets/levels/room_level.json";
    this.POPULATIONS = [
        {level: 1, file: "assets/levels/population1.json"},
        {level: 2, file: "assets/levels/population2.json"}
    ];
    this.NUMBER_OF_ROOMS = [
        10,
        15
    ];
};

DungeonExplorer.DungeonState.prototype = Object.create(Engine.JsonLevelState.prototype);
DungeonExplorer.DungeonState.prototype.constructor = DungeonExplorer.DungeonState;

DungeonExplorer.DungeonState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    Engine.LevelState.prototype.init.call(this, level_data);

    this.prefab_factory = new Engine.PrefabFactory(this, new DungeonExplorer.ScriptFactory(this));

    this.level = extra_parameters.level;
    this.dungeon = this.dungeon || new DungeonExplorer.Dungeon(this);
};

DungeonExplorer.DungeonState.prototype.preload = function () {
    "use strict";
    this.POPULATIONS.forEach(function (population) {
        this.load.text("population" + population.level, population.file);
    }, this);
};

DungeonExplorer.DungeonState.prototype.create = function () {
    "use strict";
    var initial_room, population, stats;
    Engine.JsonLevelState.prototype.create.call(this);

    if (!this.game_stats) {
        this.game_stats = this.create_prefab("game_stats", "game_stats", {x: 0, y: 0}, {});
    }

    if (this.level <= this.NUMBER_OF_ROOMS.length) {
        population = JSON.parse(this.game.cache.getText("population" + this.level));
        initial_room = this.dungeon.generate_dungeon(this.NUMBER_OF_ROOMS[this.level - 1], population);
        this.game.state.start("BootState", true, false, "RoomState", this.LEVEL_FILE, {room: initial_room, current_level: this.level, game_stats: this.game_stats});
    } else {
        this.game.state.start("BootState", true, false, "GameOverState", "assets/levels/game_over.json", {game_stats: this.game_stats});
    }
};
