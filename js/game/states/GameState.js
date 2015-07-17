var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.GameState = function () {
    "use strict";
    Engine.GameState.call(this);
};

DungeonExplorer.GameState.prototype = Object.create(Engine.GameState.prototype);
DungeonExplorer.GameState.prototype.constructor = DungeonExplorer.GameState;

DungeonExplorer.GameState.prototype.init = function (level_data) {
    "use strict";
    Engine.GameState.prototype.init.call(this, level_data);
    this.prefab_factory = new DungeonExplorer.PrefabFactory(this);
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
};