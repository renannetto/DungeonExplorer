var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.GameOverState = function () {
    "use strict";
    Engine.LevelState.call(this);
};

DungeonExplorer.GameOverState.prototype = Object.create(Engine.LevelState.prototype);
DungeonExplorer.GameOverState.prototype.constructor = DungeonExplorer.GameOverState;

DungeonExplorer.GameOverState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    Engine.LevelState.prototype.init.call(this, level_data);

    this.prefab_factory = new Engine.PrefabFactory(this, new DungeonExplorer.ScriptFactory(this));

    this.user_input = this.game.plugins.add(Engine.UserInput, this, JSON.parse(this.game.cache.getText("user_input")));

    this.game_stats = extra_parameters.game_stats;
};

DungeonExplorer.GameOverState.prototype.create = function () {
    "use strict";
    var final_stats, game_stat;
    Engine.LevelState.prototype.create.call(this);
    this.game_stats.show_stats(this);
};

DungeonExplorer.GameOverState.prototype.restart_game = function () {
    "use strict";
    this.game.state.start("BootState", true, false, "TitleState", "assets/levels/title_screen.json");
};
