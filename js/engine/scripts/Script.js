var Engine = Engine || {};

Engine.Script = function (game_state, prefab) {
    "use strict";
    this.game_state = game_state;
    this.prefab = prefab;
};

Engine.Script.prototype.update = function () {
    "use strict";
};

Engine.Script.prototype.reset = function () {
    "use strict";
};