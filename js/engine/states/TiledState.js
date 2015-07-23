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
    var group_name, object_layer;
    
    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) {
            this.map.setCollisionBetween(layer.properties.tiles_min, layer.properties.tiles_max, true, layer.name);
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
    var prefab_json, prefab, parameter, script_name, parameter_name;
    
    prefab_json = JSON.parse(this.game.cache.getText(object.type));
    prefab = this.prefab_factory.create_prefab(object.name, prefab_json);
    prefab.reset(object.x, object.y - Math.abs(prefab.height));
    
    for (parameter in object.properties) {
        if (object.properties.hasOwnProperty(parameter)) {
            script_name = parameter.split(".")[0];
            parameter_name = parameter.split(".")[1];
            prefab.scripts[script_name][parameter_name] = object.properties[parameter];
        }
    }
};