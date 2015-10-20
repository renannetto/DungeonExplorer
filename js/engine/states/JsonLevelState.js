var Phaser = Phaser || {};
var Engine = Engine || {};

Engine.JsonLevelState = function () {
    "use strict";
    Phaser.State.call(this);
};

Engine.JsonLevelState.prototype = Object.create(Phaser.State.prototype);
Engine.JsonLevelState.prototype.constructor = Engine.JsonLevelState;

Engine.JsonLevelState.prototype.init = function (level_data) {
    "use strict";

    this.level_data = level_data;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.prefab_factory = new Engine.PrefabFactory(this, new Engine.ScriptFactory(this));
};

Engine.JsonLevelState.prototype.create = function () {
    "use strict";
    var group_name;

    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);

    this.prefabs = {};
};

Engine.JsonLevelState.prototype.create_prefab = function (type, name, position, properties) {
    "use strict";
    var prefab_json, prefab, property, property_changed, script_name, property_name;

    prefab_json = JSON.parse(this.game.cache.getText(type));
    prefab = this.prefab_factory.create_prefab(name, position, prefab_json);

    property_changed = false;
    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            if (property.indexOf(".") === -1) {
                if (property === "texture") {
                    prefab.sprite.loadTexture(properties[property]);
                } else {
                    prefab.sprite[property] = properties[property];
                }
            } else {
                property_changed = true;
                script_name = property.split(".")[0];
                property_name = property.split(".")[1];
                prefab.scripts[script_name][property_name] = properties[property];
            }
        }
    }
    if (property_changed) {
        prefab.reset(position.x, position.y);
    }
};

Engine.JsonLevelState.prototype.update = function () {
    "use strict";
    var prefab_name;
    for (prefab_name in this.prefabs) {
        if (this.prefabs.hasOwnProperty(prefab_name)) {
            this.prefabs[prefab_name].update();
        }
    }
};
