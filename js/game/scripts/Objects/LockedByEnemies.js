var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.LockedByEnemies = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);

    this.locked = true;
};

DungeonExplorer.LockedByEnemies.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.LockedByEnemies.prototype.constructor = DungeonExplorer.LockedByEnemies;

DungeonExplorer.LockedByEnemies.prototype.listen_to_enemies = function (enemy_group) {
    "use strict";
    enemy_group.forEach(function (enemy_sprite) {
        enemy_sprite.events.onKilled.add(this.check_if_unlocked, this);
    }, this);
    this.check_if_unlocked();
};

DungeonExplorer.LockedByEnemies.prototype.check_if_unlocked = function () {
    "use strict";
    if (this.game_state.groups.enemies.countLiving() === 0) {
        this.unlock();
    }
};

DungeonExplorer.LockedByEnemies.prototype.unlock = function () {
    "use strict";
    this.locked = false;
};
