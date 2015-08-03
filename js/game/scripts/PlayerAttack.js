var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.PlayerAttack = function (game_state, prefab, parameters) {
    "use strict";
    Engine.CreatePrefabFromPool.call(this, game_state, prefab, parameters);

    this.attack_rate = parameters.attack_rate;
    this.shoot_speed = parameters.shoot_speed;

    this.attack_timer = this.game_state.game.time.create();
    this.attack_timer.loop(Phaser.Timer.SECOND / this.attack_rate, this.shoot, this);
    this.attack_timer.start();
};

DungeonExplorer.PlayerAttack.prototype = Object.create(Engine.CreatePrefabFromPool.prototype);
DungeonExplorer.PlayerAttack.prototype.constructor = DungeonExplorer.PlayerAttack;

DungeonExplorer.PlayerAttack.prototype.update = function () {
    "use strict";
    if (this.game_state.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        if (this.attack_timer.paused) {
            this.attack_timer.resume();
        }
    } else {
        this.attack_timer.pause();
    }
};

DungeonExplorer.PlayerAttack.prototype.shoot = function () {
    "use strict";
    var prefab, player_direction;

    prefab = this.create_object(this.prefab.sprite.x, this.prefab.sprite.y);

    player_direction = this.prefab.scripts.player_movement.direction;
    prefab.sprite.scale.setTo(1, 1);
    prefab.sprite.angle = 0;
    switch (player_direction) {
    case "left":
        prefab.sprite.scale.setTo(-1, 1);
        prefab.sprite.body.velocity.x = -this.shoot_speed;
        break;
    case "right":
        prefab.sprite.scale.setTo(1, 1);
        prefab.sprite.body.velocity.x = this.shoot_speed;
        break;
    case "up":
        prefab.sprite.angle = -90;
        prefab.sprite.body.velocity.y = -this.shoot_speed;
        break;
    case "down":
        prefab.sprite.angle = 90;
        prefab.sprite.body.velocity.y = this.shoot_speed;
        break;
    }
};
