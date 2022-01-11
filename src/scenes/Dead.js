import Phaser from '../lib/phaser.js'

export default class Dead extends Phaser.Scene
{
    constructor()
    {
        super('Dead')
    }

    preload()
    {
        this.load.spritesheet('player', 'assets/soul.png', 
        {
            frameWidth: 64, frameHeight: 64
        });
        this.load.spritesheet('shard', 'assets/soul_shard.png', 
        {
            frameWidth: 32, frameHeight: 32
        });
        this.load.audio('break1', 'assets/snd/battle/snd_break1.wav')
        this.load.audio('break2', 'assets/snd/battle/snd_break2.wav')
        this.load.audio('gameover', 'assets/snd/music/mus_gameover.ogg')
    }

    init(data)
    {
        console.log(data)
        this.playerPos = data
    }

    create()
    {
        console.log('Started Dead Scene')

        this.anims.generateFrameNames('shard')
        this.anims.create({
            key: 'fly',
            frames: [
                { key: 'shard',frame:0 },
                { key: 'shard',frame:1 },
                { key: 'shard',frame:2 },
                { key: 'shard',frame:1 },
            ],
            frameRate: 8,
            repeat: -1,
        });

        this.player = this.add.sprite(this.playerPos[0], this.playerPos[1], 'player')
        .setScale(0.75)
        this.keyZ = this.input.keyboard.addKey('Z');
        this.snd_break1 = this.sound.add('break1', { volume: 0.6, loop: false, });
        this.snd_break2 = this.sound.add('break2', { volume: 0.7, loop: false, });
        this.mus_gameover = this.sound.add('gameover', { volume: 0.7, loop: true, });

        this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: ()=>{

                this.player.setFrame(2)
                this.snd_break1.play()

                this.time.addEvent({
                    delay: 1500,
                    loop: false,
                    callback: ()=>{

                        this.player.destroy()
                        this.snd_break2.play()

                        for (let i = 0; i < 5; i++) {
                            let shard = this.physics.add.sprite(this.playerPos[0], this.playerPos[1], 'shard')
                            shard.play('fly')
                            shard.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-800, -400))
                            shard.setGravityY(600)                         
                        }

                        this.time.addEvent({
                            delay: 3000,
                            loop: false,
                            callback: ()=>{

                                this.mus_gameover.play()
                                this.cameras.main.fadeIn(2500)
                                this.add.text(460, 0, 'GAME\nOVER', { fontFamily: 'Determination', fontSize: '256px', align: 'center' })
                                this.add.text(384, 512, 'Press [Z] to STAY DETERMINED', { fontFamily: 'Determination', fontSize: '48px', align: 'center' })
                                this.keyZ.on('down', ()=>{
                                    this.cameras.main.fadeOut(1500)
                                    this.tweens.add({
                                        targets: this.mus_gameover,
                                        volume: 0,
                                        duration: 1000,
                                    })
                                    this.time.addEvent({
                                        delay: 1750,
                                        loop: false,
                                        callback: ()=>{
                                            this.scene.start('Battle')
                                        }
                                    })
                                })
                            }
                        })
                    },
                });
            },
        });
    }

    update()
    {

    }
}