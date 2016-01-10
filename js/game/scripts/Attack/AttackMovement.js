var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.AttackMovement = function (game_state, prefab, properties) {
    "use strict";
    Engine.PrefabMovement.call(this, game_state, prefab, properties);

    this.game_state.game.physics.arcade.enable(this.prefab.sprite);
    this.prefab.sprite.body.setSize(8, 8, 0, 0);

    this.prefab.sprite.checkWorldBounds = true;
    this.prefab.sprite.outOfBoundsKill = true;

    this.prefab.sprite.animations.add("moving", properties.moving_animation.frames, properties.moving_animation.fps, true);
    this.prefab.sprite.animations.play("moving");
};

DungeonExplorer.AttackMovement.prototype = Object.create(Engine.PrefabMovement.prototype);
DungeonExplorer.AttackMovement.prototype.constructor = DungeonExplorer.AttackMovement;

DungeonExplorer.AttackMovement.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this.prefab.sprite, this.game_state.layers.collision, this.prefab.kill, null, this.prefab);

    this.move(this.prefab.sprite.body.facing, this.speed);

    this.prefab.sprite.scale.setTo(1, 1);
    this.prefab.sprite.angle = 0;
    switch (this.prefab.sprite.body.facing) {
    case 0:
        this.prefab.sprite.angle = 90;
        break;
    case 1:
        this.prefab.sprite.scale.setTo(-1, 1);
        break;
    case 2:
        this.prefab.sprite.scale.setTo(1, 1);
        break;
    case 3:
        this.prefab.sprite.angle = -90;
        break;
    case 4:
        this.prefab.sprite.angle = 90;
        break;
    }
};
