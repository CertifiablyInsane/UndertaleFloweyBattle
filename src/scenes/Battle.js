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
        this.actsText = ['Check', 'Talk', 'Deal', 'Negotiate']

        this.itemsText = ['KromerBurger', 'ClubsSandwich', 'Pie', 'MonsterCandy']

        this.numItems = 4

        this.monsterIsSpareable = false;
        this.monsterHP = 300;
        this.monsterStage = 0

        this.bullets = this.physics.add.group()
        this.bulletOverlap = this.physics.add.overlap(this.player, this.bullets,this.onDamaged,()=>true,this)
    }

    update()
    {
        super.update()
    }

    doFight()
    {
        console.log("fight")
        this.fightButton.setFrame(0);
        this.monsterAttack()
    }

    doAct(selectedAction)
    {
        this.clearMenu()
        console.log(selectedAction)
        this.actButton.setFrame(2);
        this.monsterAttack()
    }

    doItem(selectedItem)
    {
        this.clearMenu()
        this.itemButton.setFrame(4);
        this.flavourText = this.add.text(320, 520, this.generateFlavourText('USED_ITEM', selectedItem), { fontFamily: '"Trebuchet MS"', fontSize: '32px'})
        console.log(selectedItem)
        //ITEM EFFECTS
        switch(selectedItem)
        {
            case 'KromerBurger':
                this.currentPlayerHP = this.currentPlayerHP + 15;
                break;
            case 'ClubsSandwich':
                this.currentPlayerHP = this.currentPlayerHP + 11;
                break;
            case 'Pie':
                this.currentPlayerHP = this.currentPlayerHP + 20;
                break;
            case 'MonsterCandy':
                this.currentPlayerHP = this.currentPlayerHP + 7;
                break;
        }
        if(this.currentPlayerHP > 20){
            this.currentPlayerHP = 20
        }
        this.numItems--
        this.itemsText.splice(this.itemsText.indexOf(selectedItem), 1); //remove item from array
        this.updateHealth()
        this.monsterAttack()
    }

    doMercy()
    {
        console.log("Spare")
        this.clearMenu()
        this.mercyButton.setFrame(6);
        if(this.monsterIsSpareable)
        {
            //spare
        }
        //this.monsterAttack()
    }

    monsterAttack(attackParam)
    {
        this.generateMenu()
        this.bullet = this.bullets.create(758, 256, 'player')
        this.bullet = this.bullets.create(256, 256, 'player')
        this.bulletOverlap.active = true

        //Attack phase over
        this.time.addEvent({
            delay: 5000,
            callback: ()=>{
                this.bullets.clear(true, true);
                this.controlType = 'menu1'
                this.generateMenu()
                this.bulletOverlap.active = false
            },
            loop: false
        });
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