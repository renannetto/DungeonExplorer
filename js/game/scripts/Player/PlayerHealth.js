var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.PlayerHealth = function (game_state, prefab, properties) {
    "use strict";
    DungeonExplorer.ReceiveDamage.call(this, game_state, prefab, properties);

    this.invincible = false;
};

DungeonExplorer.PlayerHealth.prototype = Object.create(DungeonExplorer.ReceiveDamage.prototype);
DungeonExplorer.PlayerHealth.prototype.constructor = DungeonExplorer.PlayerHealth;

DungeonExplorer.PlayerHealth.prototype.damage = function (attacked, attack) {
    "use strict";
    var damage_tween;
    if (!this.invincible) {
        DungeonExplorer.ReceiveDamage.prototype.damage.call(this, attacked, attack);
        damage_tween = this.game_state.game.tweens.create(this.prefab.sprite);
        damage_tween.to({alpha: 0}, Phaser.Timer.SECOND * this.tween_duration);
        damage_tween.to({alpha: 1}, Phaser.Timer.SECOND * this.tween_duration);
        damage_tween.repeat(10);
        damage_tween.onComplete.add(this.end_damage, this);
        damage_tween.start();
        this.invincible = true;
    }
};

DungeonExplorer.PlayerHealth.prototype.end_damage = function () {
    "use strict";
    this.invincible = false;
};
