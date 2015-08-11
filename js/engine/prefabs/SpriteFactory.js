var Phaser = Phaser || {};
var Engine = Engine || {};

Engine.SpriteFactory = function (game_state) {
    "use strict";
    this.game_state = game_state;
};

Engine.SpriteFactory.prototype.create_sprite = function (position, params) {
    "use strict";
    var sprite, texture;
    if (!params.texture || typeof (params.texture) === "string") {
        texture = params.texture;
    } else {
        texture = this.game_state.add.bitmapData(params.texture.width, params.texture.height);
        texture.ctx.fillStyle = params.texture.color;
        texture.ctx.fillRect(0, 0, params.texture.width, params.texture.height);
    }
    switch (params.type) {
    case "sprite":
        sprite = new Phaser.Sprite(this.game_state.game, position.x, position.y, texture, params.frame);
        break;
    case "tilesprite":
        sprite = new Phaser.TileSprite(this.game_state.game, position.x, position.y, params.width, params.height, texture, params.frame);
        break;
    case "text":
        sprite = new Phaser.Text(this.game_state.game, position.x, position.y, params.text, params.style);
        break;
    }
    if (params.group) {
        this.game_state.groups[params.group].add(sprite);
    } else {
        this.game_state.game.add.existing(sprite);
    }
    
    return sprite;
};
