import Phaser from '../lib/phaser.js'

export default class Dead extends Phaser.Scene
{
    preload()
    {
        this.load.spritesheet('player', 'assets/soul.png', 
        {
            frameWidth: 64, frameHeight: 64
        });
        this.load.audio('break1', 'assets/snd/battle/snd_break1.wav')
        this.load.audio('break2', 'assets/snd/battle/snd_break2.wav')
        this.load.audio('gameover', 'assets/snd/music/mus_gameover.ogg')
    }

    create()
    {
        console.log('Started Dead Scene')
        this.player = this.add.sprite(720, 450, 'player')
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

                        this.time.addEvent({
                            delay: 2000,
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