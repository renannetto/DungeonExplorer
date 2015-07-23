var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.Player = function (game_state, name, parameters, group) {
    "use strict";
    Engine.Prefab.call(this, game_state, name, parameters, group);
    
    this.anchor.setTo(0.5);
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(24, 24, 0, 16);
    
    this.animations.add("walking_down", [0, 1, 2], 6, true);
    this.animations.add("walking_left", [12, 13, 14], 6, true);
    this.animations.add("walking_right", [24, 25, 26], 6, true);
    this.animations.add("walking_up", [36, 37, 38], 6, true);
    
    this.frame = 1;
};

DungeonExplorer.Player.prototype = Object.create(Engine.Prefab.prototype);
DungeonExplorer.Player.prototype.constructor = DungeonExplorer.Player;

DungeonExplorer.Player.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    
    Engine.Prefab.prototype.update.call(this);
};