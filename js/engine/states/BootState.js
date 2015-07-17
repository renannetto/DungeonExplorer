var Phaser = Phaser || {};
var Engine = Engine || {};

Engine.BootState = function () {
    "use strict";
    Phaser.State.call(this);
};

Engine.prototype = Object.create(Phaser.State.prototype);
Engine.prototype.constructor = Engine.BootState;

Engine.BootState.prototype.init = function (level_file) {
    "use strict";
    this.level_file = level_file;
};

Engine.BootState.prototype.preload = function () {
    "use strict";
    this.load.text("level1", this.level_file);
};

Engine.BootState.prototype.create = function () {
    "use strict";
    var level_text, level_data;
    level_text = this.game.cache.getText("level1");
    level_data = JSON.parse(level_text);
    this.game.state.start("LoadingState", true, false, level_data);
};