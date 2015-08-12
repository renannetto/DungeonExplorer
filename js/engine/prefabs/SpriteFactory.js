var Phaser = Phaser || {};
var Engine = Engine || {};

Engine.SpriteFactory = function (game_state) {
    "use strict";
    this.game_state = game_state;
};

Engine.SpriteFactory.prototype.create_sprite = function (position, params) {
    "use strict";
    var sprite, texture, property;
    texture = this.parse_texture(params.texture);
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
    
    for (property in params.properties) {
        if (params.properties.hasOwnProperty(property)) {
            sprite[property] = params.properties[property];
        }
    }

    return sprite;
};

Engine.SpriteFactory.prototype.parse_texture = function (texture_properties) {
    "use strict";
    var texture;
    if (!texture_properties || typeof (texture_properties) === "string") {
        texture = texture_properties;
    } else {
        texture = this.game_state.add.bitmapData(texture_properties.width, texture_properties.height);
        texture.ctx.fillStyle = texture_properties.color;
        texture.ctx.fillRect(0, 0, texture_properties.width, texture_properties.height);
    }
    return texture;
};
