var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.WalkingState = function (name, prefab, animation_name, animation_frames, animation_fps, loop, standing_state) {
    "use strict";
    Engine.AnimationState.call(this, name, prefab, animation_name, animation_frames, animation_fps, loop);
    this.prefab = prefab;
    this.standing_state = standing_state;
};

DungeonExplorer.WalkingState.prototype = Object.create(Engine.AnimationState.prototype);
DungeonExplorer.WalkingState.prototype.constructor = DungeonExplorer.WalkingState;

DungeonExplorer.WalkingState.prototype.handle_input = function (command) {
    "use strict";
    if (command.name === "walk") {
        if (command.direction.x < 0) {
            return "walk_left";
        } else if (command.direction.x > 0) {
            return "walk_right";
        } else if (command.direction.y < 0) {
            return "walk_up";
        } else if (command.direction.y > 0) {
            return "walk_down";
        }
    } else if (command.name === "stop") {
        return this.standing_state;
    }
    Engine.AnimationState.prototype.handle_input.call(this, command);
};
