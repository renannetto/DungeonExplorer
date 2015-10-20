var Phaser = Phaser || {};
var Engine = Engine || {};

Engine.UserInput = function (game, parent, game_state, user_input_data) {
    "use strict";
    Phaser.Plugin.call(this, game, parent);
};

Engine.UserInput.prototype = Object.create(Phaser.Plugin.prototype);
Engine.UserInput.prototype.constructor = Engine.UserInput;

Engine.UserInput.prototype.init = function (game_state, user_input_data) {
    "use strict";
    var input_type, key, key_code;
    this.game_state = game_state;
    this.user_inputs = {"keydown": {}, "keyup": {}, "keypress": {}};

    for (input_type in user_input_data) {
        if (user_input_data.hasOwnProperty(input_type)) {
            for (key in user_input_data[input_type]) {
                if (user_input_data[input_type].hasOwnProperty(key)) {
                    key_code = Phaser.Keyboard[key];
                    this.user_inputs[input_type][key_code] = user_input_data[input_type][key];
                }
            }
        }
    }

    this.game.input.keyboard.addCallbacks(this, this.process_input, this.process_input, this.process_input);
};

Engine.UserInput.prototype.process_input = function (event) {
    "use strict";
    var user_input, callback_data, script;
    user_input = this.user_inputs[event.type][event.keyCode];
    if (user_input) {
        callback_data = user_input.callback.split(".");
        script = this.game_state.prefabs[callback_data[0]].scripts[callback_data[1]];
        script[callback_data[2]].apply(script, user_input.args);
    }
};
