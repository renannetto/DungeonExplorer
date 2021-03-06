var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.EnemyMovement = function (game_state, prefab, properties) {
    "use strict";
    Engine.PrefabMovement.call(this, game_state, prefab, properties);
};

DungeonExplorer.EnemyMovement.prototype = Object.create(Engine.PrefabMovement.prototype);
DungeonExplorer.EnemyMovement.prototype.constructor = DungeonExplorer.EnemyMovement;

DungeonExplorer.EnemyMovement.prototype.init = function () {
    "use strict";
    var walking_state_name, walking_state, standing_state_name, standing_state;
    this.path = [];
    this.path_step = -1;

    this.find_next_path();

    this.animation_state_machine = new Engine.StateMachine();

    for (walking_state_name in this.walking_states) {
        if (this.walking_states.hasOwnProperty(walking_state_name)) {
            walking_state = new DungeonExplorer.WalkingState(walking_state_name, this.prefab, this.walking_states[walking_state_name].animation_name, this.walking_states[walking_state_name].standing_state);
            this.animation_state_machine.add_state(walking_state_name, walking_state);
        }
    }

    for (standing_state_name in this.standing_states) {
        if (this.standing_states.hasOwnProperty(standing_state_name)) {
            standing_state = new DungeonExplorer.StandingState(standing_state_name, this.prefab, this.standing_states[standing_state_name].frame);
            this.animation_state_machine.add_state(standing_state_name, standing_state);
        }
    }

    this.animation_state_machine.set_initial_state("standing_down");

    this.commands = {};
    this.commands.walk_left = new Engine.Command("walk", {direction: {x: -1, y: 0}});
    this.commands.walk_right = new Engine.Command("walk", {direction: {x: 1, y: 0}});
    this.commands.walk_up = new Engine.Command("walk", {direction: {x: 0, y: -1}});
    this.commands.walk_down = new Engine.Command("walk", {direction: {x: 0, y: 1}});
    this.commands.stop = new Engine.Command("stop", {});
};

DungeonExplorer.EnemyMovement.prototype.update = function () {
    "use strict";
    var next_position, next_position_coord, current_coord, velocity;

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

            if (velocity.x < -0.5) {
                this.animation_state_machine.handle_input(this.commands.walk_left);
            } else if (velocity.x > 0.5) {
                this.animation_state_machine.handle_input(this.commands.walk_right);
            } else if (velocity.y < -0.5) {
                this.animation_state_machine.handle_input(this.commands.walk_up);
            } else if (velocity.y > 0.5) {
                this.animation_state_machine.handle_input(this.commands.walk_down);
            }
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
