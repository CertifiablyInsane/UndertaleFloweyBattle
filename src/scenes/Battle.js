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
        this.itemFourText = 'MonsterCandy'

        this.numItems = 4
    }

    update()
    {
        super.update()
    }

    doFight()
    {
        console.log("fight")
        this.fightButton.setFrame(0);
    }

    doAct(selectedAction)
    {
        this.clearMenu()
        console.log(selectedAction)
        this.actButton.setFrame(2);
    }

    doItem(selectedItem)
    {
        this.clearMenu()
        this.itemButton.setFrame(4);
        this.flavourText = this.add.text(320, 520, this.generateFlavourText('USED_ITEM', selectedItem), { fontFamily: '"Trebuchet MS"', fontSize: '32px'})
        this.monsterAttack()
    }

    doMercy()
    {
        console.log("Spare")
        this.clearMenu()
        this.mercyButton.setFrame(6);
    }

    monsterAttack(attackParam)
    {
        this.bullet = this.physics.add.sprite(128, 128, 'player')
        this.bulletOverlap = this.physics.add.overlap(this.player, this.bullet,this.onDamaged,()=>true,this)
    }

    generateFlavourText(categoryParam, textParam)
    {
        var returnText;
        if(categoryParam == 'SAMPLE')
        {
            switch(textParam)
            {
                case 0:
                    returnText = 'Smells like sample text'
                    break;
                case 1:
                    returnText = 'The sample text fills the air'
                    break;
                case 2:
                    returnText = 'You feel like sample text'
            }
        }
        if(categoryParam == 'USED_ITEM')
        {
            switch(textParam)
            {
                case 'KromerBurger':
                    returnText = 'You ate the KromerBurger!'
                    break;
                case 'ClubsSandwich':
                    returnText = 'You ate the ClubsSandwich'
                    break;
                case 'Pie':
                    returnText = 'You ate the Pie!'
                    break;
                case 'MonsterCandy':
                    returnText = 'You ate the MonsterCandy!'
                    break;
            }
        }
        return returnText;
    }
}