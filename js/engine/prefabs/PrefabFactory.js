var Engine = Engine || {};

Engine.PrefabFactory = function (game_state, script_factory) {
    "use strict";
    this.game_state = game_state;
    this.script_factory = script_factory;
    this.sprite_factory = new Engine.SpriteFactory(this.game_state);
};

Engine.PrefabFactory.prototype.create_prefab = function (prefab_name, position, prefab_properties) {
    "use strict";
    var sprite, prefab, script_name, script;
    sprite = this.sprite_factory.create_sprite(position, prefab_properties.sprite);
    prefab = new Engine.Prefab(this.game_state, prefab_name, sprite);
    for (script_name in prefab_properties.scripts) {
        if (prefab_properties.scripts.hasOwnProperty(script_name)) {
            script = this.script_factory.create_script(prefab, script_name, prefab_properties.scripts[script_name]);
            prefab.scripts[script_name] = script;
        }
    }
    return prefab;
};
