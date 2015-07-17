var Phaser = Phaser || {};
var Engine = Engine || {};

Engine.TilePrefab = function (game_state, name, parameters, group) {
    "use strict";
    Phaser.TileSprite.call(this, game_state.game, parameters.position_x, parameters.position_y, parameters.width, parameters.height, parameters.texture);
    this.game_state = game_state;
    this.name = name;
    if (group) {
        this.game_state.groups[group].add(this);
    } else {
        this.game_state.game.add.existing(this);
    }
    this.game_state.prefabs[this.name] = this;
    this.scripts = {};
};

Engine.TilePrefab.prototype = Object.create(Phaser.TileSprite.prototype);
Engine.TilePrefab.prototype.constructor = Engine.TilePrefab;

Engine.TilePrefab.prototype.update = function () {
    "use strict";
    var script_name;
    Phaser.TileSprite.prototype.update.call(this);
    
    for (script_name in this.scripts) {
        if (this.scripts.hasOwnProperty(script_name)) {
            this.scripts[script_name].update();
        }
    }
};

Engine.TilePrefab.prototype.reset = function (position_x, position_y) {
    "use strict";
    var script_name;
    Phaser.TileSprite.prototype.reset.call(this, position_x, position_y);
    
    for (script_name in this.scripts) {
        if (this.scripts.hasOwnProperty(script_name)) {
            this.scripts[script_name].reset();
        }
    }
};