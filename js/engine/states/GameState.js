var Phaser = Phaser || {};
var Engine = Engine || {};

Engine.GameState = function () {
    "use strict";
    Phaser.State.call(this);
};

Engine.prototype = Object.create(Phaser.State.prototype);
Engine.prototype.constructor = Engine.GameState;

Engine.GameState.prototype.init = function (level_data) {
    "use strict";
    this.level_data = level_data;
    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    var world_dimensions = this.level_data.world;
    this.game.world.setBounds(world_dimensions.origin_x, world_dimensions.origin_y, world_dimensions.width, world_dimensions.height);
    
    this.prefab_factory = new Engine.PrefabFactory(this);
};

Engine.GameState.prototype.create = function () {
    "use strict";
    var level_groups, level_prefabs, prefab_name, group_name;
    this.groups = {};
    level_groups = this.level_data.groups;
    level_groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    this.prefabs = {};
    level_prefabs = this.level_data.prefabs;
    for (prefab_name in level_prefabs) {
        if (level_prefabs.hasOwnProperty(prefab_name)) {
            this.prefab_factory.create_prefab(prefab_name, level_prefabs[prefab_name]);
        }
    }
    
    for (group_name in this.groups) {
        if (this.groups.hasOwnProperty(group_name)) {
            this.game.world.bringToTop(this.groups[group_name]);
        }
    }
};