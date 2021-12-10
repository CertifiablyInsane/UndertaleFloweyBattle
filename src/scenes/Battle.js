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
        this.load.spritesheet('bullet_cirlce', 'assets/battle/bullet_circle.png', 
        {
            frameWidth: 32, frameHeight: 32,
        });
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

        //ANIM
        this.anims.generateFrameNames('bullet_circle')
        this.anims.create({
            key: 'idle',
            frames: [
                { key: 'bullet_circle',frame:0 },
                { key: 'bullet_circle',frame:1 },
                { key: 'bullet_circle',frame:2 },
                { key: 'bullet_circle',frame:1 },
            ],
            frameRate: 8,
            repeat: -1
        });

        this.test = this.physics.add.sprite(256, 256, 'bullet_circle');
        this.test.anims.play('idle')
    }

    update()
    {
        super.update()
    }

    doFight()
    {
        console.log("fight")
        this.fightButton.setFrame(0);
        this.monsterAttack('generic', 5000)
    }

    doAct(selectedAction)
    {
        this.clearMenu()
        console.log(selectedAction)
        this.actButton.setFrame(2);
        this.monsterAttack('generic', 5000)
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
        this.monsterAttack('generic', 5000)
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
        this.monsterAttack('generic', 5000)
    }

    monsterAttack(attackParam, length)
    {
        this.generateMenu()
        //this.bullet = this.bullets.create(758, 256, 'player')
        if(attackParam == 'generic')
        {
            var rndNum = Phaser.Math.Between(0, 0);
            console.log(rndNum)
            switch(rndNum)
            {
                case 0:
                    attackParam = 'rain'
                    break;
                case 1:
                    attackParam = 'horizcross'
                    break;
                case 2:
                    attackParam = 'shooter'
                    break;
            }
        }
        
        console.log(attackParam)
        switch(attackParam)
        {
            case 'rain':
                    this.bullet = this.bullets.create(720, 320, 'bullet_circle')
                    this.bullets.playAnimation('idle')
                    
                break;
            
            case 'finale':
                break;
        }
        
        this.bulletOverlap.active = true

        //Attack phase over
        this.time.addEvent({
            delay: length,
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