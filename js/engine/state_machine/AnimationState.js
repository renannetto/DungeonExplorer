var Engine = Engine || {};

Engine.AnimationState = function (name, prefab, animation_name, animation_frames, animation_fps, loop) {
    "use strict";
    Engine.State.call(this, name);
    this.animation = prefab.sprite.animations.add(animation_name, animation_frames, animation_fps, loop);
};

Engine.AnimationState.prototype = Object.create(Engine.State.prototype);
Engine.AnimationState.prototype.constructor = Engine.AnimationState;

Engine.AnimationState.prototype.enter = function () {
    "use strict";
    this.animation.play();
};

Engine.AnimationState.prototype.exit = function () {
    "use strict";
    this.animation.stop();
};

Engine.AnimationState.prototype.handle_input = function (command) {
    "use strict";
    return null;
};
