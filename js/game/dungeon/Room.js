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
        {direction: "S", row: this.coordinate.row + 1, column: this.coordinate.column},
        {direction: "W", row: this.coordinate.row, column: this.coordinate.column - 1},
        {direction: "E", row: this.coordinate.row, column: this.coordinate.column + 1}
    ];
    return neighbor_coordinates;
};

DungeonExplorer.Room.prototype.connect = function (direction, room) {
    "use strict";
    this.neighbors[direction] = room;
};
