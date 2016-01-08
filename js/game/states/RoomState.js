var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.RoomState = function () {
    "use strict";
    Engine.TiledState.call(this);

    this.MAP_KEY = "room_tilemap";
    this.MAP_TILESET = "dungeon_tileset";
};

DungeonExplorer.RoomState.prototype = Object.create(Engine.TiledState.prototype);
DungeonExplorer.RoomState.prototype.constructor = DungeonExplorer.RoomState;

DungeonExplorer.RoomState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    Engine.JsonLevelState.prototype.init.call(this, level_data);

    this.prefab_factory = new Engine.PrefabFactory(this, new DungeonExplorer.ScriptFactory(this));

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;

    this.user_input = this.game.plugins.add(Engine.UserInput, this, JSON.parse(this.game.cache.getText("user_input")));

    this.room = extra_parameters.room;
};

DungeonExplorer.RoomState.prototype.preload = function () {
    "use strict";
    var asset_loader;
    asset_loader = new Engine.AssetLoader(this);
    asset_loader.load_asset(this.MAP_KEY, {type: "tilemap", source: "assets/maps/" + this.room.template_name()});
};

DungeonExplorer.RoomState.prototype.create = function () {
    "use strict";
    var tile_dimensions, enemy_index, enemy_name;
    this.map = this.game.add.tilemap(this.MAP_KEY);
    this.map.addTilesetImage(this.map.tilesets[0].name, this.MAP_TILESET);

    tile_dimensions = new Phaser.Point(this.map.tileWidth, this.map.tileHeight);
    this.pathfinding = this.game.plugins.add(Engine.Pathfinding, this.map.layers[1].data, [-1], tile_dimensions);

    Engine.TiledState.prototype.create.call(this);

    this.create_prefab("player", "player", {x: this.game.world.width / 2, y: this.game.world.height / 2}, {});

    this.room.obstacles.forEach(function (obstacle) {
        this.map.putTile(obstacle.tile, obstacle.position.x, obstacle.position.y, this.layers.collision);
    }, this);
    this.set_collision_to_layer(this.layers.collision.layer);

    for (enemy_index = 0; enemy_index < this.room.enemies.length; enemy_index += 1) {
        enemy_name = "enemy_" + enemy_index;
        this.create_prefab(this.room.enemies[enemy_index].prefab, enemy_name, this.room.enemies[enemy_index].position, {});
    }
};

DungeonExplorer.RoomState.prototype.render = function () {
    "use strict";
    var prefab_name;
    for (prefab_name in this.prefabs) {
        if (this.prefabs.hasOwnProperty(prefab_name)) {
            this.game.debug.body(this.prefabs[prefab_name].sprite);
        }
    }
};
