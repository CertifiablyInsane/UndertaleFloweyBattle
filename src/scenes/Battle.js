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
        this.load.spritesheet('flowey', 'assets/battle/flowey.png', 
        {
            frameWidth: 256, frameHeight: 256,
        });
    }

    create()
    {
        super.create()
        this.actsText = ['Check', 'Talk', 'Deal', 'Negotiate']

        this.itemsText = ['KromerBurger', 'ClubsSandwich', 'Pie', 'MonsterCandy']

        this.numItems = 4

        this.monsterStage = 0;

        this.bullets = this.physics.add.group()
        this.bulletOverlap = this.physics.add.overlap(this.player, this.bullets,this.onDamaged,()=>true,this)

        this.flowey = this.add.sprite(720, 256, 'flowey')
        .setScale(1.5)

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

        this.anims.generateFrameNames('flowey')
        this.anims.create({
            key: 'smile',
            frames: [
                { key: 'flowey', frame: 0}
            ]
        });
        this.anims.create({
            key: 'smile_talk',
            frames: [
                { key: 'flowey', frame: 0},
                { key: 'flowey', frame: 1},
            ],
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: 'lookaway',
            frames: [
                { key: 'flowey', frame: 2}
            ]
        });
        this.anims.create({
            key: 'lookaway_talk',
            frames: [
                { key: 'flowey', frame: 2},
                { key: 'flowey', frame: 3},
            ],
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: 'sheepish',
            frames: [
                { key: 'flowey', frame: 4}
            ]
        });
        this.anims.create({
            key: 'sheepish_talk',
            frames: [
                { key: 'flowey', frame: 4},
                { key: 'flowey', frame: 5},
            ],
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: 'smug',
            frames: [
                { key: 'flowey', frame: 6}
            ]
        });
        this.anims.create({
            key: 'smug_talk',
            frames: [
                { key: 'flowey', frame: 6},
                { key: 'flowey', frame: 7},
            ],
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: 'angry',
            frames: [
                { key: 'flowey', frame: 8}
            ]
        });
        this.anims.create({
            key: 'angry_talk',
            frames: [
                { key: 'flowey', frame: 8},
                { key: 'flowey', frame: 9},
            ],
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: 'frown',
            frames: [
                { key: 'flowey', frame: 10}
            ]
        });
        this.anims.create({
            key: 'wink',
            frames: [
                { key: 'flowey', frame: 11}
            ]
        });
        this.anims.create({
            key: 'sinister',
            frames: [
                { key: 'flowey', frame: 12}
            ]
        });
        this.anims.create({
            key: 'evil',
            frames: [
                { key: 'flowey', frame: 13}
            ]
        });
        this.anims.create({
            key: 'hurt1',
            frames: [
                { key: 'flowey', frame: 14}
            ]
        });
        this.anims.create({
            key: 'hurt2',
            frames: [
                { key: 'flowey', frame: 15}
            ]
        });
        this.anims.create({
            key: 'hurt3',
            frames: [
                { key: 'flowey', frame: 16}
            ]
        });
        this.anims.create({
            key: 'hurt4',
            frames: [
                { key: 'flowey', frame: 17}
            ]
        });
        this.anims.create({
            key: 'hurt5',
            frames: [
                { key: 'flowey', frame: 18}
            ]
        });
        this.anims.create({
            key: 'appear',
            frames: [
                { key: 'flowey', frame: 19},
                { key: 'flowey', frame: 20},
                { key: 'flowey', frame: 21},
                { key: 'flowey', frame: 22},
                { key: 'flowey', frame: 23},
                { key: 'flowey', frame: 24},
                { key: 'flowey', frame: 25},
                { key: 'flowey', frame: 0},
            ],
            frameRate: 16,
            repeat: false,
        });
        this.anims.create({
            key: 'disappear',
            frames: [
                { key: 'flowey', frame: 0},
                { key: 'flowey', frame: 25},
                { key: 'flowey', frame: 24},
                { key: 'flowey', frame: 23},
                { key: 'flowey', frame: 22},
                { key: 'flowey', frame: 21},
                { key: 'flowey', frame: 20},
                { key: 'flowey', frame: 19},
            ],
            frameRate: 16,
            repeat: false,
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
        this.textSequence(null, null)
    }

    doAct(selectedAction)
    {
        this.clearMenu()
        console.log(selectedAction)
        this.actButton.setFrame(2);
        const generatedText = this.generateText('ACT', selectedAction)
        this.textSequence(generatedText[0], generatedText[1]);
    }

    doItem(selectedItem)
    {
        this.clearMenu()
        this.itemButton.setFrame(4);
        const generatedText = this.generateText('USED_ITEM', selectedItem)
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
        this.textSequence(null, null)
    }

    monsterAttack(attackParam, length)
    {
        this.flowey.play('disappear')
        this.controlType = 'freemove'
        this.generateMenu()
        this.player.setPosition(720, 534);
        this.player.setVisible(true)
                
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
            }
                
            this.bulletOverlap.active = true
        
            //Attack phase over
            this.time.addEvent({
                delay: length,
                callback: ()=>{
                    this.controlType = 'menu1'
                    this.generateMenu()
    
                    //disable all attack related stuffs
                    this.bullets.clear(true, true);
                    this.bulletOverlap.active = false
                    this.bulletMaker.remove()
                    this.flowey.play('appear')
                    this.monsterStage++; //Increment monster stage
                    if(attackParam == 'shooter'){
                        this.bulletLooper.remove()
                    }
                },
                loop: false
            });
    }

    generateText(categoryParam, textParam)
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
        if(categoryParam == 'FLOWEY_DIALOGUE')
        {
            switch(textParam)
            {
                case 0:
                    returnText[0] = `smile | Howdy! I'm Flowey!\nFlowey the Flower!`
                    returnText[1] = `sinister | Boy, am I tired of\nsaying THAT!`
                break;
                case 1:
                    returnText[0] = `lookaway | How many times have\nyou come though here?`
                    returnText[1] = `sheepish | Tens? Hundreds?\nMaybe even some I\ndon't remember?`
                    returnText[2] = `frown | I'm sick of it.`
                break;
                case 2:
                    returnText[0] = `angry | But you don't even\ncare, do you?`
                    returnText[1] = `wink | "Look at me!\nI'm messing up\npeoples' lives!"`
                break;
                case 3:
                    returnText[0] = `lookaway | And who am I\nto judge, right?`
                    returnText[1] = `sinister | I'm supposed to\nbe "the bad guy".`
                break;
                case 4:
                    returnText[0] = `lookaway | Imagine if someone\ngave you your\nlife back...`
                    returnText[1] = `frown | Only to take it all\naway at the last second.`
                    returnText[2] = `smug | Sound familiar?`
                break;
                case 5:
                    returnText[0] = `smug | Oh, but it wasn't\n just once.`
                    returnText[1] = `angry | OVER AND OVER\nAND OVER.`
                break;
            }
        }
        return returnText;
    }
    killPlayer()
    {
        console.log("DEADEDEDD")
        this.scene.start('Dead')
    }
}