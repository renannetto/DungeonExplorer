var Engine = Engine || {};

Engine.PrefabFactory = function (game_state, script_factory) {
    "use strict";
    this.game_state = game_state;
    this.script_factory = script_factory;
    this.sprite_factory = new Engine.SpriteFactory(this.game_state);
};

Engine.PrefabFactory.prototype.create_prefab = function (prefab_name, position, prefab_parameters) {
    "use strict";
    var sprite, prefab, script_name, script;
    sprite = this.sprite_factory.create_sprite(position, prefab_parameters.sprite);
    prefab = new Engine.Prefab(this.game_state, prefab_name, sprite);
    for (script_name in prefab_parameters.scripts) {
        if (prefab_parameters.scripts.hasOwnProperty(script_name)) {
            script = this.script_factory.create_script(prefab, script_name, prefab_parameters.scripts[script_name]);
            prefab.scripts[script_name] = script;
        }
    }
    return prefab;
};