import Phaser from '../lib/phaser.js'

import BattleFramework from '../game/BattleFramework.js'

export default class Battle extends BattleFramework
{
    /**@type {Phaser.Physics.Arcade.Sprite} */
    player

    /**@type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors

    constructor()
    {
        super('Battle');
    }

    preload()
    {
        super.preload()
    }

    create()
    {
        super.create()
    }

    update()
    {
        super.update()
    }
}