var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ScriptFactory = function (game_state) {
    "use strict";
    Engine.ScriptFactory.call(this, game_state);
    this.scripts = {
    };
};

DungeonExplorer.ScriptFactory.prototype = Object.create(Engine.ScriptFactory.prototype);
DungeonExplorer.ScriptFactory.prototype.constructor = DungeonExplorer.ScriptFactory;