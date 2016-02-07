var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ShowGameOver = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);
};

DungeonExplorer.ShowGameOver.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.ShowGameOver.prototype.constructor = DungeonExplorer.ShowGameOver;

DungeonExplorer.ShowGameOver.prototype.show = function () {
    "use strict";
    var game_over_message, restart_message;
    this.prefab.sprite.visible = true;
    
    game_over_message = new Phaser.Text(this.game_state.game, this.prefab.sprite.x, this.prefab.sprite.y, "Game Over", this.text_style);
    game_over_message.anchor.setTo(0.5);
    this.game_state.groups.hud.add(game_over_message);
    
    restart_message = new Phaser.Text(this.game_state.game, this.prefab.sprite.x, this.prefab.sprite.y + 100, "click to restart", this.text_style);
    restart_message.anchor.setTo(0.5);
    this.game_state.groups.hud.add(restart_message);
    
    this.prefab.sprite.inputEnabled = true;
    this.prefab.sprite.events.onInputDown.add(this.restart, this);
};

DungeonExplorer.ShowGameOver.prototype.restart = function () {
    "use strict";
    this.game_state.game.state.start("BootState", true, false, "TitleState", "assets/levels/title_screen.json");
};