var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.PlayerMovement = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);
};

DungeonExplorer.PlayerMovement.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.PlayerMovement.prototype.constructor = DungeonExplorer.PlayerMovement;

DungeonExplorer.PlayerMovement.prototype.init = function () {
    "use strict";
    var walking_state_name, walking_state, standing_state_name, standing_state;

    this.prefab.sprite.anchor.setTo(0.5, 0.75);

    this.movement = {left: false, right: false, up: false, down: false};

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

DungeonExplorer.PlayerMovement.prototype.update = function () {
    "use strict";
    var speed_bonus;
    speed_bonus = this.prefab.scripts.player_stats.stats.speed;
    if (this.movement.left && this.prefab.sprite.body.velocity.x <= 0) {
        this.prefab.sprite.body.velocity.x = -(this.base_speed * speed_bonus);
        if (this.prefab.sprite.body.velocity.y === 0) {
            this.animation_state_machine.handle_input(this.commands.walk_left);
        }
    } else if (this.movement.right && this.prefab.sprite.body.velocity.x >= 0) {
        this.prefab.sprite.body.velocity.x = (this.base_speed * speed_bonus);
        if (this.prefab.sprite.body.velocity.y === 0) {
            this.animation_state_machine.handle_input(this.commands.walk_right);
        }
    } else {
        this.prefab.sprite.body.velocity.x = 0;
    }

    if (this.movement.up && this.prefab.sprite.body.velocity.y <= 0) {
        this.prefab.sprite.body.velocity.y = -(this.base_speed * speed_bonus);
        if (this.prefab.sprite.body.velocity.x === 0) {
            this.animation_state_machine.handle_input(this.commands.walk_up);
        }
    } else if (this.movement.down && this.prefab.sprite.body.velocity.y >= 0) {
        this.prefab.sprite.body.velocity.y = (this.base_speed * speed_bonus);
        if (this.prefab.sprite.body.velocity.x === 0) {
            this.animation_state_machine.handle_input(this.commands.walk_down);
        }
    } else {
        this.prefab.sprite.body.velocity.y = 0;
    }

    if (this.prefab.sprite.body.velocity.x === 0 && this.prefab.sprite.body.velocity.y === 0) {
        this.animation_state_machine.handle_input(this.commands.stop);
    }
};

DungeonExplorer.PlayerMovement.prototype.change_movement = function (direction_x, direction_y, move) {
    "use strict";
    if (direction_x < 0) {
        this.movement.left = move;
    } else if (direction_x > 0) {
        this.movement.right = move;
    }

    if (direction_y < 0) {
        this.movement.up = move;
    } else if (direction_y > 0) {
        this.movement.down = move;
    }
};
