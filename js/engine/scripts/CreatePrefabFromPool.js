var Engine = Engine || {};

Engine.CreatePrefabFromPool = function (game_state, prefab, parameters) {
    "use strict";
    Engine.Script.call(this, game_state, prefab);
    
    this.pool = parameters.pool;
    this.prefab_parameters = JSON.parse(this.game_state.cache.getText(parameters.prefab));
    
    this.created_prefabs = 0;
};

Engine.CreatePrefabFromPool.prototype = Object.create(Engine.Script.prototype);
Engine.CreatePrefabFromPool.prototype.constructor = Engine.CreatePrefabFromPool;

Engine.CreatePrefabFromPool.prototype.create_object = function (position_x, position_y) {
    "use strict";
    var prefab, prefab_name;
    
    prefab = this.game_state.groups[this.pool].getFirstExists(false);
    if (!prefab) {
        prefab_name = this.prefab + "_created_" + this.created_prefabs;
        this.created_prefabs += 1;
        prefab = this.game_state.prefab_factory.create_prefab(prefab_name, this.prefab_parameters);
    }
    prefab.reset(position_x, position_y);

    return prefab;
};
