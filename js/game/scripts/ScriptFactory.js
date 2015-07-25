var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ScriptFactory = function (game_state) {
    "use strict";
    Engine.ScriptFactory.call(this, game_state);
    this.scripts = {
        "player_movement": DungeonExplorer.PlayerMovement.prototype.constructor,
        "player_attack": DungeonExplorer.PlayerAttack.prototype.constructor
    };
};

DungeonExplorer.ScriptFactory.prototype = Object.create(Engine.ScriptFactory.prototype);
DungeonExplorer.ScriptFactory.prototype.constructor = DungeonExplorer.ScriptFactory;
