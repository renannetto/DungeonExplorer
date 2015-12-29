var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.StandingState = function (name, prefab, animation_name, animation_frames, animation_fps, loop) {
    "use strict";
    Engine.SingleFrameState.call(this, name, prefab, animation_name, animation_frames, animation_fps, loop);
};

DungeonExplorer.StandingState.prototype = Object.create(Engine.SingleFrameState.prototype);
DungeonExplorer.StandingState.prototype.constructor = DungeonExplorer.StandingState;

DungeonExplorer.StandingState.prototype.handle_input = function (command) {
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
    }
    Engine.AnimationState.prototype.handle_input.call(this, command);
};
