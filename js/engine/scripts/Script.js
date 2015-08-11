var Engine = Engine || {};

Engine.Script = function (game_state, prefab, properties) {
    "use strict";
    this.game_state = game_state;
    this.prefab = prefab;
    this.properties = properties;
};

Engine.Script.prototype.update = function () {
    "use strict";
};

Engine.Script.prototype.kill = function () {
    "use strict";
};

Engine.Script.prototype.reset = function () {
    "use strict";
};
