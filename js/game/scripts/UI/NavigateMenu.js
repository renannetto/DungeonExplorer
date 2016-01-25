var Phaser = Phaser || {};
var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.NavigateMenu = function (game_state, prefab, properties) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, properties);

    this.items = [];
    this.items_data.forEach(function (item_data) {
        var item_position, item_text;
        item_position = new Phaser.Point(this.prefab.sprite.x + (this.items.length * this.items_spacing.x),
                                        this.prefab.sprite.y + (this.items.length * this.items_spacing.y));
        item_text = new Phaser.Text(this.game_state.game, item_position.x, item_position.y, item_data.text, Object.create(this.items_style));
        this.game_state.groups[this.ui_group].add(item_text);
        item_text.anchor.setTo(0.5);
        this.items.push({text: item_text, callback: item_data.callback});
    }, this);

    this.current_item_index = 0;
    this.items[this.current_item_index].text.fill = this.selected_color;
};

DungeonExplorer.NavigateMenu.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.NavigateMenu.prototype.constructor = DungeonExplorer.NavigateMenu;

DungeonExplorer.NavigateMenu.prototype.navigate = function (direction) {
    "use strict";
    this.items[this.current_item_index].text.fill = this.items_style.fill;

    this.current_item_index += direction;
    if (this.current_item_index < 0) {
        this.current_item_index = 0;
    } else if (this.current_item_index >= this.items.length) {
        this.current_item_index = this.items.length - 1;
    }

    this.items[this.current_item_index].text.fill = this.selected_color;
};

DungeonExplorer.NavigateMenu.prototype.select = function () {
    "use strict";
    var callback_data, context, method;
    callback_data = this.items[this.current_item_index].callback.method.split(".");
    if (callback_data.length === 2) {
        context = this.game_state;
        method = context[callback_data[1]];
    } else {
        context = this.game_state.prefabs[callback_data[0]].scripts[callback_data[1]];
        method = context[callback_data[2]];
    }
    method.apply(context, this.items[this.current_item_index].callback.args);
};

DungeonExplorer.NavigateMenu.prototype.show = function (show) {
    "use strict";
    this.items.forEach(function (item) {
        item.text.visible = show;
    }, this);
};
