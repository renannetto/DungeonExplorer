var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.TitleState = function () {
    "use strict";
    Engine.LevelState.call(this);
};

DungeonExplorer.TitleState.prototype = Object.create(Engine.LevelState.prototype);
DungeonExplorer.TitleState.prototype.constructor = DungeonExplorer.TitleState;

DungeonExplorer.TitleState.prototype.init = function (level_data) {
    "use strict";
    Engine.LevelState.prototype.init.call(this, level_data);

    this.prefab_factory = new Engine.PrefabFactory(this, new DungeonExplorer.ScriptFactory(this));
    
    this.user_input = this.game.plugins.add(Engine.UserInput, this, JSON.parse(this.game.cache.getText("user_input")));
};

DungeonExplorer.TitleState.prototype.start_game = function () {
    "use strict";
    this.game.state.start("DungeonState", true, false, 1);
};
