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
        this.load.spritesheet('bullet', 'assets/battle/bullet.png', 
        {
            frameWidth: 32, frameHeight: 32,
        });
        this.load.spritesheet('flowey', 'assets/battle/flowey.png', 
        {
            frameWidth: 256, frameHeight: 256,
        });
        this.load.audio('floweytalk1', 'assets/snd/misc/snd_floweytalk1.wav')
        this.load.audio('floweytalk2', 'assets/snd/misc/snd_floweytalk2.wav')
        this.load.audio('floweylaugh', 'assets/snd/misc/snd_floweylaugh.wav')
        this.load.audio('snd_noise', 'assets/snd/battle/snd_noise.wav')
        this.load.audio('snd_spawn', 'assets/snd/battle/snd_spawn.wav')
    }

    create()
    {
        super.create()
        this.actsText = ['Check', 'Talk', 'Plead', 'Cry']

        this.itemsText = ['KromerBar', 'AstroFood', 'ButtsPie', 'MonsterCandy']

        this.numItems = 4

        this.monsterStage = 0;

        this.bullets = this.physics.add.group()
        this.bulletOverlap = this.physics.add.overlap(this.player, this.bullets,this.onDamaged,()=>true,this)

        this.flowey = this.add.sprite(720, 256, 'flowey')
        .setScale(1.25)

        this.snd_floweytalk1 = this.sound.add('floweytalk1', { volume: 0.6, loop: false, });
        this.snd_floweytalk2 = this.sound.add('floweytalk2', { volume: 0.6, loop: false, });
        this.snd_floweylaugh = this.sound.add('floweylaugh', { volume: 0.8, loop: false, });
        
        this.snd_noise = this.sound.add('snd_noise', { volume: 0.6, loop: false, });
        this.snd_spawn = this.sound.add('snd_spawn', { volume: 0.6, loop: false, });

        //ANIM
        this.anims.generateFrameNames('bullet')
        this.anims.create({
            key: 'idle',
            frames: [
                { key: 'bullet',frame:0 },
                { key: 'bullet',frame:1 },
            ],
            frameRate: 12,
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
        this.clearMenu()
        this.player.setVisible(false)
        this.fightButton.setFrame(0);
        let fightbar = this.add.sprite(720, 612, 'fightbar')
            .setScale(2)
        let fightbar_indicator = this.physics.add.sprite(192, 612, 'fightbar_indicator');
        this.physics.moveTo(fightbar_indicator, 1262, 612, undefined, 1500)
        let missTimer = this.time.addEvent({
            delay: 1500,
            callback: ()=>{
                fightbar_indicator.destroy()
                fightbar.destroy()
                this.monsterSpeak(this.monsterStage)
            }
        })
        let fightKey = this.keyZ.on('down', ()=>{
            fightKey.destroy()
            missTimer.destroy()
            fightbar_indicator.setVelocity(0)
            fightbar_indicator.play('hit')
            this.snd_swing.play()
            let slash = this.add.sprite(720, 256, 'slash')
            slash.play('swing')
            this.flowey.play('disappear')
            this.time.addEvent({
                delay: 1500,
                callback: ()=>{
                    this.flowey.play('appear')
                    this.time.addEvent({
                        delay: 500,
                        callback: ()=>{
                            fightbar_indicator.destroy()
                            fightbar.destroy()
                            slash.destroy()
                            this.monsterSpeak(this.monsterStage)
                        }
                    })
                }
            })
        })   
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
            case 'KromerBar':
                this.currentPlayerHP = this.currentPlayerHP + 15;
                break;
            case 'AstroFood':
                this.currentPlayerHP = this.currentPlayerHP + 11;
                break;
            case 'ButtsPie':
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

    monsterAttack()
    {
        var attackParam;
        var length;
        this.controlType = 'freemove'
        this.generateMenu()
        this.player.setPosition(720, 534);
        this.player.setVisible(true)
        
        //MANUAL OVERRIDE FOR DEBUG
        this.monsterStage = 3
                
        switch(this.monsterStage)
        {
            case 0: //hi I'm flowey
                attackParam = 'rain'
                length = 5000
            break;
            case 1: //how many times?
                attackParam = 'horizcross'
                length = 5000
            break;
            case 2: //You don't care
                attackParam = 'shooter'
                length = 5000
            break;     
            case 3: //Who am I to judge
                attackParam = 'warning'
                length = 15000
            break;
            case 4: //Gave your life back

            break;
            case 5: //Over and over

            break;
            case 6:

            break;
            case 7:

            break;
            case 8:

            break;
            case 9:

            break;
            case 10:

            break;
            case 11:

            break;
            case 12:

            break;
            case 13:

            break;
            case 14:

            break;
            case 15:

            break;
            case 16:

            break;
        }
                
        switch(attackParam)
        {
            case 'rain':
                this.setBoxSize('square')
                this.bulletMaker = this.time.addEvent({
                    delay: 250,
                    callback: ()=>{
                        var spawn = Phaser.Math.Between(512, 938);
                        var destination = Phaser.Math.Between(512, 938);
                        this.bullet = this.physics.add.sprite(spawn, 256, 'bullet')
                            .setBodySize(16, 16)
                            .anims.play('idle')
                        this.bullet.alpha = 0
                            this.tweens.add({
                                targets: this.bullet,
                                alpha: 1,
                                duration: 250,
                            })
                        this.bullets.add(this.bullet)
                        this.physics.moveTo(this.bullet, destination, 720, undefined, 2000)
                        this.snd_spawn.play()
                                
                    },
                    loop: true
                });
                            
                break;
            case 'horizcross':
                this.setBoxSize('square')
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
                            this.bullet = this.physics.add.sprite(side, spawn, 'bullet')
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
                this.setBoxSize('rect384')
                this.bulletLooper = this.time.addEvent({
                    delay: 1000,
                    startAt: 900,
                    callback: ()=>{
                        this.bulletMaker = this.time.addEvent({
                            delay: 40,
                            callback: ()=>{
                                this.bullet = this.physics.add.sprite(720, 256, 'bullet')
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
            case 'warning':
                var atkCounter = 0
                var warningGraphicOrigin
                var spawnMin
                var spawnMax
                this.setBoxSize('rect384')
                    this.bulletMaker = this.time.addEvent({
                        delay: Phaser.Math.Between(125, 500),
                        loop: true,
                        callback: ()=>{
                            var spawn = Phaser.Math.Between(656, 784);
                            var destination = spawn
                            this.bullet = this.physics.add.sprite(spawn, 804, 'bullet_circle')
                                .setBodySize(16, 16)
                                .anims.play('idle')
                            this.bullet.alpha = 0

                            this.tweens.add({
                                targets: this.bullet,
                                duration: 250,
                                alpha: 1
                            })
                            this.bullets.add(this.bullet)
                            this.physics.moveTo(this.bullet, destination, 420, undefined, 2500)
                        }
                    })
                this.bulletLooper = this.time.addEvent({
                    delay: 4000,
                    loop: true,
                    callback: ()=>{
                        atkCounter++;
                        if(atkCounter % 2 == 1){ //left side attack
                            warningGraphicOrigin = 592
                            spawnMin = 528
                            spawnMax = 656
                        }else{ //right side attacks
                            warningGraphicOrigin = 848
                            spawnMin = 784
                            spawnMax = 912
                        }
                        this.warningGraphic = this.add.sprite(warningGraphicOrigin, 612, 'star')
                        var warningTimer = this.time.addEvent({
                            delay: 250,
                            repeat: 8,
                            callback: ()=>{
                                this.warningGraphic.toggleData('visible')
                                console.log('toggle')
                                if(warningTimer.repeatCount == 9)
                                {
                                    console.log('done warning')
                                    this.warningGraphic.destroy()
                                }
                            }
                        })
                    }
                })
            break;
            }
                
            this.bulletOverlap.active = true

            this.tweens.add({
                targets: this.boxhelper,
                props: {
                    scaleX: { value: 1, duration: 300, ease: 'Linear' },
                    scaleY: { value: 1, duration: 100, ease: 'Linear' },
                },
            });
        
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
                    returnText[0] = 'Flowey - ATK 6 DEF 0 \nA tiny little flower.\nExceptionally cruel.'
                break;
                case 'Talk':
                    returnText[0] = 'You try to talk to Flowey.'
                    returnText[1] = `He doesn't seem keen on chatting.`
                break;
                case 'Plead':
                    returnText[0] = 'You beg Flowey to stop attacking.'
                    returnText[1] = 'Did you really think that would\ndo anything?'
                break;
                case 'Cry':
                    this.flowey.play('evil')
                    returnText[0] = 'You lie on your back and break\ndown into tears.'
                    returnText[1] = 'Flowey seems pleased by this.'
                break;
            }
        }
        if(categoryParam == 'USED_ITEM')
        {
            switch(textParam)
            {
                case 'KromerBar':
                    returnText[0] = `yUO'RE [[eated]] TH3\nTHE     KrOMERBAR(TM)!!!`
                    returnText[1] = 'Tastes like a computer virus.\nRecovered 15 HP!'
                    break;
                case 'AstroFood':
                    returnText[0] = 'You ate the Astronaut Food'
                    returnText[1] = 'Tastes cold and lonely.\nRecovered 11 HP!'
                    break;
                case 'ButtsPie':
                    returnText[0] = 'You ate the Butterscotch Pie!'
                    returnText[1] = 'Tastes like snails and goat fur.\nRecovered 20 HP!'
                    break;
                case 'MonsterCandy':
                    returnText[0] = 'You ate the Monster Candy!'
                    returnText[1] = 'Tastes like rotting teeth.\nRecovered 7 HP!'
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