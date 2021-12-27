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
        this.load.spritesheet('bullet_circle', 'assets/battle/bullet_circle.png', 
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
        this.monsterPhase = 0
        this.monsterPhaseMod = 0

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
        const generatedText = this.generateFlavourText('ACT', selectedAction)
        this.textSequence(generatedText[0], generatedText[1]);
    }

    doItem(selectedItem)
    {
        this.clearMenu()
        this.itemButton.setFrame(4);
        const generatedText = this.generateFlavourText('USED_ITEM', selectedItem)
        this.textSequence(generatedText[0], generatedText[1]);

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
        this.snd_heal.play()
        this.numItems--
        this.itemsText.splice(this.itemsText.indexOf(selectedItem), 1); //remove item from array
        this.updateHealth()
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

        console.log('MONSTER PHASE: ' + this.monsterPhase);
        console.log('MONSTER PHASE MOD: ' + this.monsterPhaseMod);

        //this.bullet = this.bullets.create(758, 256, 'player')
        if(attackParam == 'generic')
        {
            var rndNum = Phaser.Math.Between(0, 2);
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
                this.bulletMaker = this.time.addEvent({
                    delay: 250,
                    callback: ()=>{
                        var spawn = Phaser.Math.Between(512, 938);
                        var destination = Phaser.Math.Between(512, 938);
                        this.bullet = this.physics.add.sprite(spawn, 256, 'bullet_circle')
                            .setBodySize(16, 16)
                            .anims.play('idle')
                        
                        this.bullets.add(this.bullet)
                        this.physics.moveTo(this.bullet, destination, 720, undefined, 2000)
                        
                    },
                    loop: true
                });
                    
                break;
            case 'horizcross':
                this.bulletMaker = this.time.addEvent({
                    delay: 300,
                    callback: ()=>{
                        var spawn = Phaser.Math.Between(348, 708);
                        var side = Phaser.Math.Between(0, 1);
                        var destination
                        if(side == 0){
                            side = 448
                            destination = 1002
                        }else{
                            side = 1002
                            destination = 448
                        }
                        this.bullet = this.physics.add.sprite(side, spawn, 'bullet_circle')
                            .setScale(1.5)
                            .setBodySize(20, 20)
                            .anims.play('idle')
                        
                        this.bullets.add(this.bullet)
                        this.physics.moveTo(this.bullet, destination, spawn, undefined, 1750)
                        
                    },
                    loop: true
                });
                break;
            case 'shooter':
                this.bulletLooper = this.time.addEvent({
                    delay: 1000,
                    startAt: 900,
                    callback: ()=>{
                        this.bulletMaker = this.time.addEvent({
                            delay: 40,
                            callback: ()=>{
                                this.bullet = this.physics.add.sprite(720, 256, 'bullet_circle')
                                    .setScale(1)
                                    .setBodySize(16, 16)
                                    .anims.play('idle')
                                
                                this.bullets.add(this.bullet)
                                this.physics.moveTo(this.bullet, this.player.x, this.player.y, 384)
                                
                            },
                            repeat: 16
                        });
                    },
                    loop: true
                })
                break;

            case 'finale':
                break;
        }
        
        this.bulletOverlap.active = true

        //Attack phase over
        this.time.addEvent({
            delay: length,
            callback: ()=>{
                this.controlType = 'menu1'
                this.monsterPhaseMod++
                this.generateMenu()

                //disable all attack related stuffs
                this.bullets.clear(true, true);
                this.bulletOverlap.active = false
                this.bulletMaker.remove()
                if(attackParam == 'shooter'){
                    this.bulletLooper.remove()
                }
            },
            loop: false
        });
    }

    generateFlavourText(categoryParam, textParam)
    {
        var returnText = [null, null];
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
        if(categoryParam == 'ACT')
        {
            switch(textParam)
            {
                case 'Check':
                    returnText[0] = '[TEMP MONSTER] - ATK 6 DEF 13 \nThis foe is a fan of magic orbs'
                break;
            }
        }
        if(categoryParam == 'USED_ITEM')
        {
            switch(textParam)
            {
                case 'KromerBurger':
                    returnText[0] = 'You ate the KromerBurger!'
                    returnText[1] = 'Tastes... interesting. Recovered 15 HP!'
                    break;
                case 'ClubsSandwich':
                    returnText[0] = 'You ate the ClubsSandwich'
                    returnText[1] = 'Tastes like a sweaty casino. Recovered 11 HP!'
                    break;
                case 'Pie':
                    returnText[0] = 'You ate the Pie!'
                    returnText[1] = 'Tastes like snails. Recovered 20 HP!'
                    break;
                case 'MonsterCandy':
                    returnText[0] = 'You ate the MonsterCandy!'
                    returnText[1] = 'Tastes awful. Recovered 7 HP!'
                    break;
            }
        }
        return returnText;
    }
}