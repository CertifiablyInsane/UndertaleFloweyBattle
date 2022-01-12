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
        this.load.spritesheet('warning_graphic', 'assets/battle/warningGraphic.png', 
        {
            frameWidth: 64, frameHeight: 192,
        });
        this.load.audio('floweytalk1', 'assets/snd/misc/snd_floweytalk1.wav')
        this.load.audio('floweytalk2', 'assets/snd/misc/snd_floweytalk2.wav')
        this.load.audio('floweylaugh', 'assets/snd/misc/snd_floweylaugh.wav')
        this.load.audio('snd_noise', 'assets/snd/battle/snd_noise.wav')
        this.load.audio('snd_spawn', 'assets/snd/battle/snd_spawn.wav')
        this.load.audio('snd_warn', 'assets/snd/battle/snd_warn.wav')
    }

    init()
    {
        super.init()
        this.cameras.main.fadeIn()
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
        this.snd_warn = this.sound.add('snd_warn', { volume: 0.6, loop: false,});

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
        this.anims.generateFrameNames('warning_graphic')
        this.anims.create({
            key: 'warn',
            frames: [
                { key: 'warning_graphic',frame:0 },
                { key: 'warning_graphic',frame:1 },
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
            key: 'evil_laugh',
            frames: [
                { key: 'flowey', frame: 13},
                { key: 'flowey', frame: 26},
            ],
            frameRate: 12,
            repeat: -1
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

            if(this.monsterStage < 12 || this.monsterStage > 17)
            {
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
            }else{
                var animNum = this.monsterStage - 10 //returns number for hurt1, hurt2, etc
                if(this.monsterStage == 12)
                {
                    this.flowey.play('appear')
                    this.time.addEvent({
                        delay: 500,
                        callback: ()=>{
                            this.flowey.play('hurt1')
                            this.tweens.add({
                                targets: this.mus_flowey,
                                volume: 0,
                                duration: 2000
                            })
                        }
                    })
                }
                this.monsterStage++;
                
                this.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                        
                        this.snd_damage.play()
                        this.flowey.play('hurt'+animNum);
                        if(this.monsterStage == 17)
                        {
                            this.cameras.main.fade(0)
                            this.controlType = 'noControl'
                            this.time.addEvent({
                                delay: 1000,
                                callback: ()=>{
                                    this.scene.start('End')
                                }
                            })
                        }

                        //shake
                        var shakeAmount = 32
                        this.time.addEvent({
                            delay: 150,
                            repeat: 8,
                            callback: ()=>{
                                this.flowey.x = 720 + shakeAmount
                                shakeAmount = shakeAmount - 2
                            }
                        })
                        this.time.addEvent({
                            delay: 150,
                            startAt:75,
                            repeat: 8,
                            callback: ()=>{
                                this.flowey.x = 720 - shakeAmount
                                shakeAmount = shakeAmount - 2
                            }
                        })

                        //end shake

                        this.time.addEvent({
                            delay: 1500,
                            callback: ()=>{
                                fightbar_indicator.destroy()
                                fightbar.destroy()
                                slash.destroy()
                                this.monsterSpeak(this.monsterStage)
                            }
                        })
                    }
                })
            }
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
        this.player.setVisible(false)
        this.controlType = 'noControl'
        this.clearMenu()
        this.mercyButton.setFrame(6);
        if(this.monsterStage == 12)
        {
            this.monsterStage = 17
            this.flowey.play('appear')
            this.time.addEvent({
                delay: 500,
                callback: ()=>{
                    this.tweens.add({
                        targets: this.mus_flowey,
                        duration: 2000,
                        volume: 0
                    })
                    this.monsterSpeak(this.monsterStage)
                }
            })
        }
        if(this.monsterStage > 16)
        {
            this.monsterStage++
        }
        if(this.monsterStage != 24 && this.monsterStage != 18){
            this.monsterSpeak(this.monsterStage)
        }else if(this.monsterStage == 24){
            this.player.setVisible(false)
            this.controlType = 'noControl'
            this.flowey.play('evil_laugh')
            this.snd_floweylaugh.play()
            this.time.addEvent({
                delay: 4000,
                callback: ()=>{
                    this.flowey.play('disappear')
                    this.cameras.main.fadeOut(4000)
                    this.time.addEvent({
                        delay: 5000,
                        callback: ()=>{
                            this.scene.start('End')
                        }
                    })
                }
            })
        }
    }

    monsterAttack()
    {
        var attackParam;
        var length;
        this.controlType = 'freemove'
        this.generateMenu()
        this.player.setPosition(720, 612);
        this.player.setVisible(true)
        
        //MANUAL OVERRIDE FOR DEBUG
        //this.monsterStage = 12
                
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
                attackParam = 'shooter_side'
                length = 7500
            break;
            case 5: //Over and over
                attackParam = 'rain_fast'
                length = 10000
            break;
            case 6:
                attackParam = 'sidetoside'
                length = 10000
            break;
            case 7:
                attackParam = 'horizcross'
                length = 7500
            break;
            case 8:
                attackParam = 'shooter_side'
                length = 15000
            break;
            case 9:
                attackParam = 'warning'
                length = 15000
            break;
            case 10:
                attackParam = 'shooter'
                length = 15000
            break;
            case 11:
                this.flowey.play('disappear')
                attackParam = 'rain_fast'
                length = 15000
            break;
            case 12:
                attackParam = 'wimpy'
                length = 2000
            break;
            case 13:

            break;
            case 14:

            break;
            case 15:

            break;
            case 16:

            break;
            case 17:

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
                                
                    },
                    loop: true
                });
                            
                break;
            case 'rain_fast':
                this.setBoxSize('square')
                this.bulletMaker = this.time.addEvent({
                    delay: 200,
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
                        this.physics.moveTo(this.bullet, destination, 720, undefined, 1500)
                                
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
                            this.bullet.alpha = 0

                            this.tweens.add({
                                targets: this.bullet,
                                duration: 250,
                                alpha: 1
                            })
                            
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
                    startAt: 600,
                    callback: ()=>{
                        this.bulletMaker = this.time.addEvent({
                            delay: 40,
                            callback: ()=>{
                                this.bullet = this.physics.add.sprite(Phaser.Math.Between(656, 784), 128, 'bullet')
                                    .setScale(1)
                                    .setBodySize(16, 16)
                                    .anims.play('idle')
                                this.bullet.alpha = 0

                                this.tweens.add({
                                    targets: this.bullet,
                                    duration: 250,
                                    alpha: 1
                                })
                                this.snd_spawn.play()
                                    
                                this.bullets.add(this.bullet)
                                this.physics.moveTo(this.bullet, this.player.x, this.player.y, 384)
                                    
                            },
                            repeat: 16
                        });
                    },
                    loop: true
                })
            break;
            case 'shooter_side':
                this.setBoxSize('flavourText')
                this.bulletMaker = this.time.addEvent({
                    delay: 500,
                    repeat: -1,
                    callback: ()=>{
                        this.bullet = this.physics.add.sprite(64, Phaser.Math.Between(420, 804), 'bullet')
                        .setBodySize(16, 16)
                        .anims.play('idle')
                    this.bullet.alpha = 0

                    this.tweens.add({
                        targets: this.bullet,
                        duration: 250,
                        alpha: 1
                    })
                    this.bullets.add(this.bullet)
                    this.physics.moveTo(this.bullet, this.player.x, this.player.y, 256)
                    }
                })
                this.bulletMakerExtra = this.time.addEvent({
                    delay: 500,
                    startAt: 250,
                    repeat: -1,
                    callback: ()=>{
                        this.bullet = this.physics.add.sprite(1376, Phaser.Math.Between(420, 804), 'bullet')
                        .setBodySize(16, 16)
                        .anims.play('idle')
                    this.bullet.alpha = 0

                    this.tweens.add({
                        targets: this.bullet,
                        duration: 250,
                        alpha: 1
                    })
                    this.bullets.add(this.bullet)
                    this.physics.moveTo(this.bullet, this.player.x, this.player.y, 256)
                    }
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
                            this.bullet = this.physics.add.sprite(spawn, 804, 'bullet')
                                .setBodySize(16, 16)
                                .anims.play('idle')
                            this.bullet.alpha = 0

                            this.tweens.add({
                                targets: this.bullet,
                                duration: 250,
                                alpha: 1
                            })
                            this.bullets.add(this.bullet)
                            this.physics.moveTo(this.bullet, destination, 420, undefined, Phaser.Math.Between(2250, 2750))
                        }
                    })
                this.bulletLooper = this.time.addEvent({
                    delay: 3600,
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
                        this.warningGraphic = this.add.sprite(warningGraphicOrigin, 612, 'warning_graphic')
                            .play('warn')
                        this.snd_warn.play()
                        this.warningTimer = this.time.addEvent({
                            delay: 1000,
                            callback: ()=>{
                                this.warningGraphic.destroy()
                                this.snd_break2.play()
                                this.bulletMakerExtra = this.time.addEvent({
                                    delay: 35,
                                    repeat: 50,
                                    callback: ()=>{
                                        var spawn = Phaser.Math.Between(spawnMin, spawnMax);
                                        var destination = spawn
                                        this.bullet = this.physics.add.sprite(spawn, 804, 'bullet')
                                            .setBodySize(16, 16)
                                            .anims.play('idle')
                                        this.bullet.alpha = 0
            
                                        this.tweens.add({
                                            targets: this.bullet,
                                            duration: 125,
                                            alpha: 1
                                        })
                                        this.bullets.add(this.bullet)
                                        this.physics.moveTo(this.bullet, destination, 420, undefined, Phaser.Math.Between(1250, 1750))
                                    }
                                })
                            }
                        })
                    }
                })
            break;
            case 'sidetoside':
                this.setBoxSize('tall384')
                this.bulletMaker = this.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                            for (let i = 0; i < 8; i++) {
                                this.bullet = this.physics.add.sprite(600 + (i * 16), 804, 'bullet')
                                    .setBodySize(16, 16)
                                    .anims.play('idle')   
                                this.bullet.alpha = 0
            
                                this.tweens.add({
                                    targets: this.bullet,
                                    duration: 250,
                                    alpha: 1
                                })
                                this.bullets.add(this.bullet)
                                this.physics.moveTo(this.bullet, 600 + (i * 16), 292, undefined, 3000)                                                          
                            }                                                            
                        },
                        loop: true
                    });
                this.bulletMakerExtra = this.time.addEvent({
                    delay: 1000,
                    startAt: 500,
                    callback: ()=>{
                            for (let i = 0; i < 8; i++) {
                                this.bullet = this.physics.add.sprite(840 - (i * 16), 292, 'bullet')
                                    .setBodySize(16, 16)
                                    .anims.play('idle')   
                                this.bullet.alpha = 0
            
                                this.tweens.add({
                                    targets: this.bullet,
                                    duration: 250,
                                    alpha: 1
                                })
                                this.bullets.add(this.bullet)
                                this.physics.moveTo(this.bullet, 840 - (i * 16), 804, undefined, 3000)                                                          
                            }                                                            
                        },
                        loop: true
                    });
            break;
            case 'wimpy':
                this.setBoxSize('square')
                this.bullet = this.physics.add.sprite(800, 512, 'bullet')
                    .setBodySize(16, 16)
                    .anims.play('idle')   
                this.bullet.alpha = 0

                this.tweens.add({
                    targets: this.bullet,
                    duration: 250,
                    alpha: 1
                })
                this.bullets.add(this.bullet)
                this.physics.moveTo(this.bullet, this.player.x, this.player.y, undefined, 10000) 
            break;
            }
                
            this.bulletOverlap.active = true
        
            //Attack phase over
            this.time.addEvent({
                delay: length,
                callback: ()=>{
                    this.player.setVisible(false)
                    this.controlType = 'menu1'
                    this.generateMenu()
                    this.controlType = 'noControl'
                    this.time.addEvent({
                        delay: 300,
                        callback: ()=>{
                            this.controlType = 'menu1'
                            this.player.setVisible(true)
                        }
                    })
                    if(this.monsterStage < 12)
                    {
                        this.monsterStage++; //Increment monster stages < 12
                    }
    
                    //disable all attack related stuffs
                    this.bullets.clear(true, true);
                    this.bulletOverlap.active = false
                    if(attackParam){
                        this.bulletMaker.remove()
                    }

                    if(attackParam == 'shooter'){
                        this.bulletLooper.remove()
                    }
                    if(attackParam == 'shooter_side'){
                        this.bulletMakerExtra.remove()
                    }
                    else if(attackParam == 'warning')
                    {
                        this.warningTimer.remove()
                        this.bulletMakerExtra.remove()
                        this.bulletLooper.remove()
                        this.warningGraphic.destroy()
                    }
                    else if(attackParam == 'sidetoside')
                    {
                        this.bulletMakerExtra.remove()
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
        if(categoryParam == 'FLAVOUR_TEXT')
        {
            switch(textParam)
            {
                case 0:
                    returnText = 'Flowey is eager to fight'
                    break;
                case 1:
                    returnText = 'Yellow petals fill the air'
                    break;
                case 2:
                    returnText = 'You feel vines crawling on your\nback'
                    break;
                case 3:
                    returnText = `Flowey prepares an attack of...\n'friendliness pellets'`
                    break;
                case 4:
                    returnText = 'Flowey smiles menacingly'
                    break;
                case 5:
                    returnText = 'Flowey is getting angrier'
                    break;
                case 6:
                    returnText = 'Smells like floral sweat'
                    break;
                case 7:
                    returnText = `Flowey considers putting the\n'petal to the metal'\nHe then decides against this`
                    break;
                case 8:
                    returnText = 'Flowey seems surprised you are\nstill alive'
                    break;
                case 9:
                    returnText = 'Smells like a garden'
                    break;
                case 10:
                    returnText = 'Flowey seems to be getting tired'
                    break;
                case 11:
                    returnText = 'Flowey looks like he needs a break'
                    break;
                case 12:
                    returnText = 'Flowey has not emerged'
                    break;
                case 13:
                    returnText = 'Flowey is in pain'
                    break;
                case 14:
                    returnText = '...'
                    break;
                case 15:
                    returnText = '...'
                    break;
                case 16:
                    returnText = '...'
                    break;
                case 17:
                    returnText = '...'
                    break;
                case 18:
                    returnText = 'Flowey is beyond exhausted'
                    break;
                case 19:
                    returnText = 'Flowey is beyond exhausted'
                    break;
                case 20:
                    returnText = 'Flowey is beyond exhausted'
                    break;
                case 21:
                    returnText = `Flowey doesn't seem to want to\nfight anymore`
                    break;
                case 22:
                    returnText = `Flowey doesn't seem to want to\nfight anymore`
                    break;
                case 23:
                    returnText = 'Flowey is sparing you'
                    break;
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
                    returnText[1] = `frown | Only to take it all\naway at the last\nsecond.`
                    returnText[2] = `smug | Sound familiar?`
                break;
                case 5:
                    returnText[0] = `smug | Oh, but it wasn't\n just once.`
                    returnText[1] = `angry | OVER AND OVER\nAND OVER.`
                break;
                case 13: //beginning of fight ending
                    returnText[0] = `hurt2 | Th- the...`
                    returnText[1] = `hurt2 | The... pain...`
                break;
                case 14: 
                    returnText[0] = `hurt3 | P-please...`
                    returnText[1] = `hurt3 | ...`
                break;
                case 18: //beginning of mercy ending
                    returnText[0] = `sheepish | Huff... puff...`
                    returnText[1] = `smile | You're still not\nfighting back, huh?`
                break;
                case 19:
                    returnText[0] = `smug | Well... huff...\nthat's fine.`
                    returnText[1] = `evil | Easier to kill\nsomeone who isn't\na threat!`
                break;
                case 20:
                    returnText[0] = `frown | Huff...\nPuff...`
                    returnText[1] = `frown | Huff... that said...`
                break;
                case 21:
                    returnText[0] = `lookaway | Maybe I should...`
                    returnText[1] = `sheepish | Just kill you\nsometime later`
                break;
                case 22:
                    returnText[0] = `lookaway | When I'm a little\nless...`
                    returnText[1] = `wink | Exhausted.`
                break;
                case 23:
                    returnText[0] = `sinister | Don't think you've\nwon, though.`
                    returnText[1] = `evil | I'll be back.`
                break;
                }
        }
        return returnText;
    }
    killPlayer()
    {
        console.log("DEADEDEDD")
        this.time.addEvent({
            delay: 1,
            callback: ()=>{
                //this.scene.start('Dead')
                this.mus_flowey.stop()
                this.scene.start('Dead', [this.player.x, this.player.y]);
            }
        })
        
    }
}