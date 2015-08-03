var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.AttackMovement = function (game_state, prefab, parameters) {
    "use strict";
    Engine.Script.call(this, game_state, prefab);
    
    this.game_state.game.physics.arcade.enable(this.prefab.sprite);
    this.prefab.sprite.checkWorldBounds = true;
    this.prefab.sprite.outOfBoundsKill = true;

    this.prefab.sprite.animations.add("moving", parameters.moving_animation.frames, parameters.moving_animation.fps, true);
    this.prefab.sprite.animations.play("moving");
};

DungeonExplorer.AttackMovement.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.AttackMovement.prototype.constructor = DungeonExplorer.AttackMovement;

DungeonExplorer.AttackMovement.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this.prefab.sprite, this.game_state.layers.collision, this.prefab.kill, null, this.prefab);
};