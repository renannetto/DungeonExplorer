var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.Shoot = function (game_state, name, parameters, group) {
    "use strict";
    Engine.Prefab.call(this, game_state, name, parameters, group);

    this.game_state.game.physics.arcade.enable(this);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    this.animations.add("moving", [0, 1, 2, 3, 4, 5], 10, true);
    this.animations.play("moving");

    this.anchor.setTo(0.5);
};

DungeonExplorer.Shoot.prototype = Object.create(Engine.Prefab.prototype);
DungeonExplorer.Shoot.prototype.constructor = DungeonExplorer.Shoot;

DungeonExplorer.Shoot.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision, this.kill, null, this);
    Engine.Prefab.prototype.update.call(this);
};
