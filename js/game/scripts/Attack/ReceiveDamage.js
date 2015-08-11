var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ReceiveDamage = function (game_state, prefab, properties) {
    "use strict";
    Engine.PrefabMovement.call(this, game_state, prefab, properties);

    this.health = properties.health;

    this.bouncing_direction = [{"x": -1, "y": 0}, {"x": 1, "y": 0}, {"x": 0, "y": -1}, {"x": 0, "y": 1}];
};

DungeonExplorer.ReceiveDamage.prototype = Object.create(Engine.PrefabMovement.prototype);
DungeonExplorer.ReceiveDamage.prototype.constructor = DungeonExplorer.ReceiveDamage;

DungeonExplorer.ReceiveDamage.prototype.reset = function () {
    "use strict";
    this.health = this.properties.health;
};

DungeonExplorer.ReceiveDamage.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.overlap(this.prefab.sprite, this.game_state.groups[this.properties.attack_group], this.damage, null, this);
};

DungeonExplorer.ReceiveDamage.prototype.damage = function (attacked, attack) {
    "use strict";
    var attack_prefab, damage;
    attack_prefab = this.game_state.prefabs[attack.name];

    this.move(this.prefab.sprite.body.facing, this.properties.bouncing_speed);

    damage = attack.scripts.attack_damage.damage;
    this.health -= damage;
    if (this.health <= 0) {
        this.prefab.kill();
    }
};
