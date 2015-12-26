var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.EnemyMovement = function (game_state, prefab, properties) {
    "use strict";
    Engine.PrefabMovement.call(this, game_state, prefab, properties);

    //this.prefab.sprite.scale.setTo(1, 0.5);

    this.path = [];
    this.path_step = -1;

    this.find_next_path();

    this.prefab.sprite.body.setSize(24, 24, 0, 8);
    this.prefab.sprite.anchor.setTo(0.5, 0.75);
};

DungeonExplorer.EnemyMovement.prototype = Object.create(Engine.PrefabMovement.prototype);
DungeonExplorer.EnemyMovement.prototype.constructor = DungeonExplorer.EnemyMovement;

DungeonExplorer.EnemyMovement.prototype.update = function () {
    "use strict";
    var next_position, next_position_coord, current_coord, velocity;
    this.game_state.game.physics.arcade.collide(this.prefab.sprite, this.game_state.layers.collision);

    if (this.path.length > 0) {
        next_position = this.path[this.path_step];
        next_position_coord = this.game_state.pathfinding.get_coord_from_point(next_position);
        current_coord = this.game_state.pathfinding.get_coord_from_point(this.prefab.sprite.position);

        if (!this.reached_target_position(next_position)) {
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

DungeonExplorer.EnemyMovement.prototype.reached_target_position = function (target_position) {
    "use strict";
    var distance;
    distance = Phaser.Point.distance(this.prefab.sprite.position, target_position);
    return distance < 1;
};

DungeonExplorer.EnemyMovement.prototype.find_next_path = function () {
    "use strict";
    var distance, direction_index, iteration, direction, target_position, pathfinding_result;
    distance = new Phaser.Point(this.game_state.game.rnd.between(this.walking_distance.min, this.walking_distance.max),
                               this.game_state.game.rnd.between(this.walking_distance.min, this.walking_distance.max));

    direction_index = this.game_state.game.rnd.between(0, this.direction.length - 1);
    for (iteration = 0; iteration < this.direction.length; iteration += 1) {
        direction = this.direction[direction_index];
        target_position = new Phaser.Point(this.prefab.sprite.x + (direction.x * distance.x),
                                           this.prefab.sprite.y + (direction.y * distance.y));
        pathfinding_result = this.game_state.pathfinding.find_path(this.prefab.sprite.position, target_position, this.move_through_path, this);
        if (pathfinding_result) {
            break;
        } else {
            direction_index = (direction_index + 1) % this.direction.length;
        }
    }
};

DungeonExplorer.EnemyMovement.prototype.move_through_path = function (path) {
    "use strict";
    if (path !== null && path.length > 0) {
        this.path = path;
        this.path_step = 0;
    } else {
        this.find_next_path();
    }
};
