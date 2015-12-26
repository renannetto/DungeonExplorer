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
    var tile_dimensions;
    Engine.TiledState.prototype.init.call(this, level_data);
    this.prefab_factory = new Engine.PrefabFactory(this, new DungeonExplorer.ScriptFactory(this));
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;

    tile_dimensions = new Phaser.Point(this.map.tileWidth, this.map.tileHeight);
    this.pathfinding = this.game.plugins.add(Engine.Pathfinding, this.map.layers[1].data, [-1], tile_dimensions);

    this.user_input = this.game.plugins.add(Engine.UserInput, this, JSON.parse(this.game.cache.getText("user_input")));
};

DungeonExplorer.DungeonState.prototype.create = function () {
    "use strict";
    Engine.TiledState.prototype.create.call(this);
    
    this.game.camera.follow(this.prefabs.player.sprite);
};

DungeonExplorer.DungeonState.prototype.render = function () {
    "use strict";
    var prefab_name;
    for (prefab_name in this.prefabs) {
        if (this.prefabs.hasOwnProperty(prefab_name)) {
            this.game.debug.body(this.prefabs[prefab_name].sprite);
        }
    }
};
