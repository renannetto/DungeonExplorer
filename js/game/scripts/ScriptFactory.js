var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.ScriptFactory = function (game_state) {
    "use strict";
    Engine.ScriptFactory.call(this, game_state);
    this.scripts = {
        "player_movement": DungeonExplorer.PlayerMovement.prototype.constructor,
        "player_attack": DungeonExplorer.PlayerAttack.prototype.constructor,
        "attack_movement": DungeonExplorer.AttackMovement.prototype.constructor,
        "receive_damage": DungeonExplorer.ReceiveDamage.prototype.constructor,
        "cause_damage": Engine.Script.prototype.constructor,
        "enemy_movement": DungeonExplorer.EnemyMovement.prototype.constructor,
        "player_health": DungeonExplorer.PlayerHealth.prototype.constructor,
        "enter_door": DungeonExplorer.EnterDoor.prototype.constructor,
        "reach_exit": DungeonExplorer.ReachExit.prototype.constructor,
        "show_stat_with_sprite": DungeonExplorer.ShowStatWithSprite.prototype.constructor,
        "show_stat_with_text": DungeonExplorer.ShowStatWithText.prototype.constructor,
        "player_stats": Engine.Script.prototype.constructor,
        "navigate_menu": DungeonExplorer.NavigateMenu.prototype.constructor,
        "collect_item": DungeonExplorer.CollectItem.prototype.constructor,
        "show_game_over": DungeonExplorer.ShowGameOver.prototype.constructor
    };
};

DungeonExplorer.ScriptFactory.prototype = Object.create(Engine.ScriptFactory.prototype);
DungeonExplorer.ScriptFactory.prototype.constructor = DungeonExplorer.ScriptFactory;
