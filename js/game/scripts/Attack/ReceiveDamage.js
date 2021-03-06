var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ReceiveDamage = function (game_state, prefab, properties) {
    "use strict";
    Engine.PrefabMovement.call(this, game_state, prefab, properties);
};

DungeonExplorer.ReceiveDamage.prototype = Object.create(Engine.PrefabMovement.prototype);
DungeonExplorer.ReceiveDamage.prototype.constructor = DungeonExplorer.ReceiveDamage;

DungeonExplorer.ReceiveDamage.prototype.init = function () {
    "use strict";
    this.initial_health = this.health;
};

DungeonExplorer.ReceiveDamage.prototype.reset = function () {
    "use strict";
    this.health = this.initial_health;
};

DungeonExplorer.ReceiveDamage.prototype.damage = function (attacked, attack) {
    "use strict";
    var attacked_prefab, attack_prefab, damage;
    attacked_prefab = this.game_state.prefabs[attacked.name];
    attack_prefab = this.game_state.prefabs[attack.name];

    if (attack_prefab.sprite.body.facing) {
        this.prefab.sprite.x += this.direction[attack_prefab.sprite.body.facing].x * this.bouncing;
        this.prefab.sprite.y += this.direction[attack_prefab.sprite.body.facing].y * this.bouncing;
    } else {
        this.prefab.sprite.x += -1 * this.direction[attacked_prefab.sprite.body.facing].x * this.bouncing;
        this.prefab.sprite.y += -1 * this.direction[attacked_prefab.sprite.body.facing].y * this.bouncing;
    }

    damage = attack_prefab.scripts.cause_damage.damage;
    this.health -= damage;
    if (this.health <= 0) {
        this.die();
    }

    if (attack_prefab.scripts.cause_damage.destroy) {
        attack_prefab.kill();
    }
};

DungeonExplorer.ReceiveDamage.prototype.die = function () {
    "use strict";
    this.prefab.kill();
};
