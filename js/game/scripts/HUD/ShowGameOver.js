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
    
    this.messages.forEach(function (message) {
        var message_sprite;
        message_sprite = new Phaser.Text(this.game_state.game, this.prefab.sprite.x + message.offset.x, this.prefab.sprite.y + message.offset.y,
                                        message.text, message.style);
        message_sprite.anchor.setTo(this.prefab.sprite.anchor.x, this.prefab.sprite.anchor.y);
        this.game_state.groups[message.group].add(message_sprite);

    }, this);
    
    this.prefab.sprite.inputEnabled = true;
    this.prefab.sprite.events.onInputDown.add(this.restart, this);
};

DungeonExplorer.ShowGameOver.prototype.restart = function () {
    "use strict";
    this.game_state.game.state.start("BootState", true, false, "TitleState", "assets/levels/title_screen.json");
};
