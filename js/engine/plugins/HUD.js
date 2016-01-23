var Phaser = Phaser || {};
var Engine = Engine || {};

Engine.HUD = function (game, parent) {
    "use strict";
    Phaser.Plugin.call(this, game, parent);
};

Engine.HUD.prototype = Object.create(Phaser.Plugin.prototype);
Engine.HUD.prototype.constructor = Engine.HUD;

Engine.HUD.prototype.init = function (game_state, hud_data) {
    "use strict";
    var prefab_name, prefab_parameters, prefab_position;
    this.game_state = game_state;
    this.positions = {
        top_left: {x: hud_data.margins.left, y: hud_data.margins.top},
        center_top: {x: this.game_state.game.world.centerX, y: hud_data.margins.top},
        top_right: {x: this.game_state.game.world.width - hud_data.margins.right, y: hud_data.margins.top},
        center_right: {x: this.game_state.game.world.width - hud_data.margins.right, y: this.game_state.game.world.centerY},
        bottom_right: {x: this.game_state.game.world.width - hud_data.margins.right, y: this.game_state.game.world.height - hud_data.margins.bottom},
        center_bottom: {x: this.game_state.game.world.centerX, y: this.game_state.game.world.height - hud_data.margins.bottom},
        bottom_left: {x: hud_data.margins.left, y: this.game_state.game.world.height - hud_data.margins.bottom},
        center_left: {x: hud_data.margins.left, y: this.game_state.game.world.centerY},
        center: {x: this.game_state.game.world.centerX, y: this.game_state.game.world.centerY}
    };

    for (prefab_name in hud_data.elements) {
        if (hud_data.elements.hasOwnProperty(prefab_name)) {
            prefab_parameters = hud_data.elements[prefab_name];
            prefab_position = this.positions[prefab_parameters.position];
            this.game_state.create_prefab(prefab_parameters.type, prefab_name, prefab_position, prefab_parameters.properties);
        }
    }
};
