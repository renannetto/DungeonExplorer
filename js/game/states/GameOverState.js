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

    this.final_stats = extra_parameters.stats;
};

DungeonExplorer.GameOverState.prototype.create = function () {
    "use strict";
    Engine.LevelState.prototype.create.call(this);

    this.final_stats.forEach(function (final_stat) {
        console.log(this.prefabs);
        this.prefabs[final_stat.prefab_name].sprite.text += final_stat.value;
    }, this);
};

DungeonExplorer.GameOverState.prototype.restart_game = function () {
    "use strict";
    this.game.state.start("BootState", true, false, "TitleState", "assets/levels/title_screen.json");
};
