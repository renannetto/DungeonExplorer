var Engine = Engine || {};

Engine.PrefabFactory = function (game_state) {
    "use strict";
    this.game_state = game_state;
    this.prefabs = {
    };
    
    this.script_factory = new Engine.ScriptFactory(game_state);
};

Engine.PrefabFactory.prototype.create_prefab = function (prefab_name, prefab_parameters) {
    "use strict";
    var prefab, script_name, script;
    if (this.prefabs[prefab_parameters.prefab]) {
        prefab = new this.prefabs[prefab_parameters.prefab](this.game_state, prefab_name, prefab_parameters, prefab_parameters.group);
        for (script_name in prefab_parameters.scripts) {
            if (prefab_parameters.scripts.hasOwnProperty(script_name)) {
                script = this.script_factory.create_script(prefab, script_name, prefab_parameters.scripts[script_name]);
                prefab.scripts[script_name] = script;
            }
        }
        return prefab;
    }
};