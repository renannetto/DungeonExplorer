var Phaser = Phaser || {};
var Engine = Engine || {};

Engine.TiledState = function () {
    "use strict";
    Engine.JsonLevelState.call(this);
};

Engine.TiledState.prototype = Object.create(Engine.JsonLevelState.prototype);
Engine.TiledState.prototype.constructor = Engine.TiledState;

Engine.TiledState.prototype.init = function (level_data) {
    "use strict";
    Engine.JsonLevelState.prototype.init.call(this, level_data);
    
    this.map = this.game.add.tilemap(level_data.map.key);
    this.map.addTilesetImage(this.map.tilesets[0].name, level_data.map.tileset);
};

Engine.TiledState.prototype.create = function () {
    "use strict";
    var group_name, object_layer;
    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) {
            this.set_collision_to_layer(layer);
        }
    }, this);
    this.layers[this.map.layer.name].resizeWorld();
    
    Engine.JsonLevelState.prototype.create.call(this);
    
    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }
};

Engine.TiledState.prototype.set_collision_to_layer = function (layer) {
    "use strict";
    var collision_tiles;
    collision_tiles = [];
    layer.data.forEach(function (data_row) {
        data_row.forEach(function (tile) {
            if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                collision_tiles.push(tile.index);
            }
        }, this);
    }, this);
    this.map.setCollision(collision_tiles, true, layer.name);
};

Engine.TiledState.prototype.create_object = function (object) {
    "use strict";
    var prefab_position;
    prefab_position = {"x": object.x + (this.map.tileHeight / 2), "y": object.y - (this.map.tileHeight / 2)};
    this.create_prefab(object.type, object.name, prefab_position, object.properties);

};
