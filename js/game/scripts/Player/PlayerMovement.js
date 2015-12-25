var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.PlayerMovement = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);

    this.prefab.sprite.scale.setTo(1, 0.5);

    this.prefab.sprite.animations.add("walking_down", properties.walking_down_animation.frames, properties.walking_down_animation.fps, true);
    this.prefab.sprite.animations.add("walking_left", properties.walking_left_animation.frames, properties.walking_left_animation.fps, true);
    this.prefab.sprite.animations.add("walking_right", properties.walking_right_animation.frames, properties.walking_right_animation.fps, true);
    this.prefab.sprite.animations.add("walking_up", properties.walking_up_animation.frames, properties.walking_up_animation.fps, true);

    this.prefab.sprite.body.setSize(24, 12, 0, 8);

    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
};

DungeonExplorer.PlayerMovement.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.PlayerMovement.prototype.constructor = DungeonExplorer.PlayerMovement;

DungeonExplorer.PlayerMovement.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this.prefab.sprite, this.game_state.layers.collision);

    if (this.cursors.left.isDown && this.prefab.sprite.body.velocity.x <= 0) {
        this.prefab.sprite.body.velocity.x = -this.walking_speed;
        if (this.prefab.sprite.body.velocity.y === 0) {
            this.prefab.sprite.animations.play("walking_left");
        }
    } else if (this.cursors.right.isDown && this.prefab.sprite.body.velocity.x >= 0) {
        this.prefab.sprite.body.velocity.x = +this.walking_speed;
        if (this.prefab.sprite.body.velocity.y === 0) {
            this.prefab.sprite.animations.play("walking_right");
        }
    } else {
        this.prefab.sprite.body.velocity.x = 0;
    }

    if (this.cursors.up.isDown && this.prefab.sprite.body.velocity.y <= 0) {
        this.prefab.sprite.body.velocity.y = -this.walking_speed;
        if (this.prefab.sprite.body.velocity.x === 0) {
            this.prefab.sprite.animations.play("walking_up");
        }
    } else if (this.cursors.down.isDown && this.prefab.sprite.body.velocity.y >= 0) {
        this.prefab.sprite.body.velocity.y = +this.walking_speed;
        if (this.prefab.sprite.body.velocity.x === 0) {
            this.prefab.sprite.animations.play("walking_down");
        }
    } else {
        this.prefab.sprite.body.velocity.y = 0;
    }

    if (this.prefab.sprite.body.velocity.x === 0 && this.prefab.sprite.body.velocity.y === 0) {
        this.prefab.sprite.animations.stop();
        this.prefab.sprite.frame = this.stopped_frames[this.prefab.sprite.body.facing];
    }
};
