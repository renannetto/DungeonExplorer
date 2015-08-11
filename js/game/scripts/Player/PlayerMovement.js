var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.PlayerMovement = function (game_state, prefab, parameters) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, parameters);

    this.walking_speed = parameters.walking_speed;
    this.prefab.sprite.animations.add("walking_down", parameters.walking_down_animation.frames, parameters.walking_down_animation.fps, true);
    this.prefab.sprite.animations.add("walking_left", parameters.walking_left_animation.frames, parameters.walking_left_animation.fps, true);
    this.prefab.sprite.animations.add("walking_right", parameters.walking_right_animation.frames, parameters.walking_right_animation.fps, true);
    this.prefab.sprite.animations.add("walking_up", parameters.walking_up_animation.frames, parameters.walking_up_animation.fps, true);

    this.stopped_frames = parameters.stopped_frames;

    this.game_state.game.physics.arcade.enable(this.prefab.sprite);
    this.prefab.sprite.body.allowGravity = false;
    this.prefab.sprite.body.setSize(24, 24, 0, 16);

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
