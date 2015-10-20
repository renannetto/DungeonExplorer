var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.EnemyMovement = function (game_state, prefab, properties) {
    "use strict";
    Engine.PrefabMovement.call(this, game_state, prefab, properties);

    this.path = [];
    this.path_step = -1;

    this.find_next_path();
};

DungeonExplorer.EnemyMovement.prototype = Object.create(Engine.PrefabMovement.prototype);
DungeonExplorer.EnemyMovement.prototype.constructor = DungeonExplorer.EnemyMovement;

DungeonExplorer.EnemyMovement.prototype.update = function () {
    "use strict";
    var next_position, next_position_coord, current_coord, velocity;
    if (this.path.length > 0) {
        next_position = this.path[this.path_step];
        next_position_coord = this.game_state.pathfinding.get_coord_from_point(next_position);
        current_coord = this.game_state.pathfinding.get_coord_from_point(this.prefab.sprite.position);

        if ((next_position_coord.row !== current_coord.row) ||
                (next_position_coord.column !== current_coord.column)) {
            velocity = new Phaser.Point(next_position.x - this.prefab.sprite.position.x,
                                   next_position.y - this.prefab.sprite.position.y);
            velocity.normalize();
            this.prefab.sprite.body.velocity.x = velocity.x * this.walking_speed;
            this.prefab.sprite.body.velocity.y = velocity.y * this.walking_speed;
        } else {
            if (this.path_step < this.path.length - 1) {
                this.path_step += 1;
            } else {
                this.path = [];
                this.path_step = -1;
                this.prefab.sprite.body.velocity.x = 0;
                this.prefab.sprite.body.velocity.y = 0;
                this.find_next_path();
            }
        }
    }
};

DungeonExplorer.EnemyMovement.prototype.find_next_path = function () {
    "use strict";
    var current_direction, target_position;
    current_direction = this.directions[this.current_direction_index];
    target_position = new Phaser.Point(this.prefab.sprite.position.x + (this.walking_radius * current_direction.x),
                                       this.prefab.sprite.position.y + (this.walking_radius * current_direction.y));
    this.game_state.pathfinding.find_path(this.prefab.sprite.position, target_position, this.move_through_path, this);
    this.current_direction_index = (this.current_direction_index + 1) % this.directions.length;
};

DungeonExplorer.EnemyMovement.prototype.move_through_path = function (path) {
    "use strict";
    if (path) {
        this.path = path;
        this.path_step = 0;
    } else {
        this.find_next_path();
    }
};
