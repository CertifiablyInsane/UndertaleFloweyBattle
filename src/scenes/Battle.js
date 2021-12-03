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
        this.actOneText = 'Check'
        this.actTwoText = 'Talk'
        this.actThreeText = 'Deal'
        this.actFourText = 'Negotiate'

        this.itemOneText = 'KromerBurger'
        this.itemTwoText = 'ClubsSandwich'
        this.itemThreeText = 'Pie'
        //this.itemFourText = 'MonsterCandy'
    }

    update()
    {
        super.update()
    }
}