var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.PlayerAttack = function (game_state, prefab, properties) {
    "use strict";
    Engine.CreatePrefabFromPool.call(this, game_state, prefab, properties);
};

DungeonExplorer.PlayerAttack.prototype = Object.create(Engine.CreatePrefabFromPool.prototype);
DungeonExplorer.PlayerAttack.prototype.constructor = DungeonExplorer.PlayerAttack;

DungeonExplorer.PlayerAttack.prototype.init = function () {
    "use strict";
    this.attack_timer = this.game_state.game.time.create();
    this.attack_timer.loop(Phaser.Timer.SECOND / this.attack_rate, this.shoot, this);
};

DungeonExplorer.PlayerAttack.prototype.kill = function () {
    "use strict";
    this.attack_timer.stop();
};

DungeonExplorer.PlayerAttack.prototype.update = function () {
    "use strict";
    if (this.game_state.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        if (!this.attack_timer.running) {
            this.shoot();
            this.attack_timer.start();
        }
    } else {
        this.attack_timer.stop(false);
    }
};

DungeonExplorer.PlayerAttack.prototype.shoot = function () {
    "use strict";
    var prefab, player_direction;

    prefab = this.create_object(this.prefab.sprite.x, this.prefab.sprite.y);
    prefab.sprite.body.facing = this.prefab.sprite.body.facing;
};
