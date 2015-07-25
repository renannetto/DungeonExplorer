var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.PlayerMovement = function (game_state, prefab, parameters) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, parameters);
    
    this.walking_speed = parameters.walking_speed;
    this.stopped_frame = this.prefab.frame;
    
    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();

    this.direction = {x: 0, y: 1};
};

DungeonExplorer.PlayerMovement.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.PlayerMovement.prototype.constructor = DungeonExplorer.PlayerMovement;

DungeonExplorer.PlayerMovement.prototype.update = function () {
    "use strict";
    
    if (this.cursors.left.isDown && this.prefab.body.velocity.x <= 0) {
        this.prefab.body.velocity.x = -this.walking_speed;
        if (this.prefab.body.velocity.y === 0) {
            this.stopped_frame = 13;
            this.prefab.animations.play("walking_left");
            this.direction.x = -1;
            this.direction.y = 0;
        }
    } else if (this.cursors.right.isDown && this.prefab.body.velocity.x >= 0) {
        this.prefab.body.velocity.x = +this.walking_speed;
        if (this.prefab.body.velocity.y === 0) {
            this.stopped_frame = 25;
            this.prefab.animations.play("walking_right");
            this.direction.x = 1;
            this.direction.y = 0;
        }
    } else {
        this.prefab.body.velocity.x = 0;
    }
    
    if (this.cursors.up.isDown && this.prefab.body.velocity.y <= 0) {
        this.prefab.body.velocity.y = -this.walking_speed;
        if (this.prefab.body.velocity.x === 0) {
            this.stopped_frame = 37;
            this.prefab.animations.play("walking_up");
            this.direction.x = 0;
            this.direction.y = -1;
        }
    } else if (this.cursors.down.isDown && this.prefab.body.velocity.y >= 0) {
        this.prefab.body.velocity.y = +this.walking_speed;
        if (this.prefab.body.velocity.x === 0) {
            this.stopped_frame = 1;
            this.prefab.animations.play("walking_down");
            this.direction.x = 0;
            this.direction.y = 1;
        }
    } else {
        this.prefab.body.velocity.y = 0;
    }
    
    if (this.prefab.body.velocity.x === 0 && this.prefab.body.velocity.y === 0) {
        this.prefab.animations.stop();
        this.prefab.frame = this.stopped_frame;
    }
};
