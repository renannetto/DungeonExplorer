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

    this.player_position = this.player_position || new Phaser.Point(this.game.world.width / 2, this.game.world.height / 2);

    this.cleared_rooms = this.cleared_rooms || [];
    
    this.persistent_data = this.persistent_data || {};
};

DungeonExplorer.RoomState.prototype.preload = function () {
    "use strict";
    var asset_loader;
    asset_loader = new Engine.AssetLoader(this);
    asset_loader.load_asset(this.MAP_KEY, {type: "tilemap", source: "assets/maps/" + this.room.template_name()});
};

DungeonExplorer.RoomState.prototype.create = function () {
    "use strict";
    var tile_dimensions, prefab_index;
    this.map = this.game.add.tilemap(this.MAP_KEY);
    this.map.addTilesetImage(this.map.tilesets[0].name, this.MAP_TILESET);

    tile_dimensions = new Phaser.Point(this.map.tileWidth, this.map.tileHeight);
    this.pathfinding = this.game.plugins.add(Engine.Pathfinding, this.map.layers[1].data, [-1], tile_dimensions);

    Engine.TiledState.prototype.create.call(this);

    this.create_prefab("player", "player", this.player_position, {});

    this.room.tiles.forEach(function (tile) {
        this.map.putTile(tile.tile, tile.position.x, tile.position.y, tile.layer);
    }, this);
    this.set_collision_to_layer(this.layers.collision.layer);

    if (this.cleared_rooms.indexOf(this.room.template_name()) === -1) {
        for (prefab_index = 0; prefab_index < this.room.prefabs.length; prefab_index += 1) {
            this.create_prefab(this.room.prefabs[prefab_index].prefab, this.room.prefabs[prefab_index].name, this.room.prefabs[prefab_index].position, this.room.prefabs[prefab_index].properties);
        }
    }

    this.hud = this.game.plugins.add(Engine.HUD, this, this.level_data.hud);

    this.groups.doors.forEach(function (door_sprite) {
        var door_prefab;
        door_prefab = this.prefabs[door_sprite.name];
        door_prefab.scripts.enter_door.listen_to_enemies(this.groups.enemies);
    }, this);
    this.groups.exits.forEach(function (exit_sprite) {
        var exit_prefab;
        exit_prefab = this.prefabs[exit_sprite.name];
        exit_prefab.scripts.reach_exit.listen_to_enemies(this.groups.enemies);
    }, this);

    this.prefabs.pause_menu.scripts.navigate_menu.show(false);
    
    this.restore_persistent_data();
};

DungeonExplorer.RoomState.prototype.restore_persistent_data = function () {
    "use strict";
    var prefab_name, property, script_name, property_name;
    for (prefab_name in this.persistent_data) {
        if (this.persistent_data.hasOwnProperty(prefab_name)) {
            for (property in this.persistent_data[prefab_name]) {
                if (this.persistent_data[prefab_name].hasOwnProperty(property)) {
                    script_name = property.split(".")[0];
                    property_name = property.split(".")[1];
                    this.prefabs[prefab_name].scripts[script_name][property_name] = this.persistent_data[prefab_name][property];
                }
            }
        }
    }
};

DungeonExplorer.RoomState.prototype.game_over = function () {
    "use strict";
    this.prefabs.game_over_panel.scripts.show_game_over.show();
};

DungeonExplorer.RoomState.prototype.pauseUpdate = function () {
    "use strict";
    this.game.input.update();
};

DungeonExplorer.RoomState.prototype.pause = function (pause) {
    "use strict";
    this.game.paused = pause;
    this.prefabs.pause_menu.scripts.navigate_menu.show(pause);
    this.groups.pause_hud.forEach(function (prefab) {
        prefab.visible = pause;
    }, this);
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
