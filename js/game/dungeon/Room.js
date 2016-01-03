var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.Room = function (coordinate) {
    "use strict";
    this.coordinate = coordinate;

    this.neighbors = {};
};

DungeonExplorer.Room.prototype.neighbor_coordinates = function () {
    "use strict";
    var neighbor_coordinates;
    neighbor_coordinates = [
        {direction: "N", row: this.coordinate.row - 1, column: this.coordinate.column},
        {direction: "E", row: this.coordinate.row, column: this.coordinate.column + 1},
        {direction: "S", row: this.coordinate.row + 1, column: this.coordinate.column},
        {direction: "W", row: this.coordinate.row, column: this.coordinate.column - 1}
    ];
    return neighbor_coordinates;
};

DungeonExplorer.Room.prototype.connect = function (direction, room) {
    "use strict";
    this.neighbors[direction] = room;
};

DungeonExplorer.Room.prototype.template_name = function () {
    "use strict";
    var template_name;
    template_name = "template_";
    this.neighbor_coordinates().forEach(function (coordinate) {
        if (this.neighbors[coordinate.direction]) {
            template_name += coordinate.direction;
        }
    }, this);
    template_name += ".json";
    return template_name;
};
