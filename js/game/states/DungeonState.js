var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.DungeonState = function () {
    "use strict";
    Engine.TiledState.call(this);
};

DungeonExplorer.DungeonState.prototype = Object.create(Engine.TiledState.prototype);
DungeonExplorer.DungeonState.prototype.constructor = DungeonExplorer.DungeonState;

DungeonExplorer.DungeonState.prototype.init = function (level_data) {
    "use strict";
    Engine.TiledState.prototype.init.call(this, level_data);
    this.prefab_factory = new Engine.PrefabFactory(this, new DungeonExplorer.ScriptFactory(this));
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;
};

DungeonExplorer.DungeonState.prototype.create = function () {
    "use strict";
    Engine.TiledState.prototype.create.call(this);
    
    this.game.camera.follow(this.prefabs.player.sprite);
};