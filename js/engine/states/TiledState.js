var Phaser = Phaser || {};
var Engine = Engine || {};

Engine.TiledState = function () {
    "use strict";
    Phaser.State.call(this);
};

Engine.TiledState.prototype = Object.create(Phaser.State.prototype);
Engine.TiledState.prototype.constructor = Engine.TiledState;

Engine.TiledState.prototype.init = function (level_data) {
    "use strict";
    
    this.level_data = level_data;
    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    this.map = this.game.add.tilemap(level_data.map.key);
    this.map.addTilesetImage(this.map.tilesets[0].name, level_data.map.tileset);
    
    this.prefab_factory = new Engine.PrefabFactory(this);
};

Engine.TiledState.prototype.create = function () {
    "use strict";
    var group_name, object_layer, collision_tiles;
    
    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) {
            collision_tiles = [];
            layer.data.forEach(function (data_row) {
                data_row.forEach(function (tile) {
                    if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                        collision_tiles.push(tile.index);
                    }
                }, this);
            }, this);
            this.map.setCollision(collision_tiles, true, layer.name);
        }
    }, this);
    this.layers[this.map.layer.name].resizeWorld();
    
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    this.prefabs = {};
    
    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }
    
    for (group_name in this.groups) {
        if (this.groups.hasOwnProperty(group_name)) {
            this.game.world.bringToTop(this.groups[group_name]);
        }
    }
};

Engine.TiledState.prototype.create_object = function (object) {
    "use strict";
    var prefab_json, prefab_position, prefab, property, script_name, property_name;
    
    prefab_json = JSON.parse(this.game.cache.getText(object.type));
    prefab_position = {"x": object.x, "y": object.y};
    prefab = this.prefab_factory.create_prefab(object.name, prefab_position, prefab_json);
    prefab.reset(prefab_position.x, prefab_position.y - prefab.sprite.height);
    
    for (property in object.properties) {
        if (object.properties.hasOwnProperty(property)) {
            script_name = property.split(".")[0];
            property_name = property.split(".")[1];
            prefab.scripts[script_name][property_name] = object.properties[property];
        }
    }
};

Engine.TiledState.prototype.update = function () {
    "use strict";
    var prefab_name;
    for (prefab_name in this.prefabs) {
        if (this.prefabs.hasOwnProperty(prefab_name)) {
            this.prefabs[prefab_name].update();
        }
    }
};
