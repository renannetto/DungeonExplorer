var Phaser = Phaser || {};
var Engine = Engine || {};

Engine.LoadingState = function () {
    "use strict";
    Phaser.State.call(this);
};

Engine.prototype = Object.create(Phaser.State.prototype);
Engine.prototype.constructor = Engine.LoadingState;

Engine.LoadingState.prototype.init = function (level_data) {
    "use strict";
    this.level_data = level_data;
};

Engine.LoadingState.prototype.preload = function () {
    "use strict";
    var assets, asset_loader, asset_key, asset;
    assets = this.level_data.assets;
    asset_loader = new Engine.AssetLoader(this);
    for (asset_key in assets) {
        if (assets.hasOwnProperty(asset_key)) {
            asset = assets[asset_key];
            asset_loader.load_asset(asset_key, asset);
        }
    }
};

Engine.LoadingState.prototype.create = function () {
    "use strict";
    this.game.state.start("GameState", true, false, this.level_data);
};