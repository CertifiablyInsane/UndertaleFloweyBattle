import Phaser from '../lib/phaser.js'

export default class End extends Phaser.Scene
{
    constructor()
    {
        super('End')
    }

    preload()
    {
        this.load.audio('mus_intronoise', 'assets/snd/music/mus_intronoise.ogg')
    }

    init()
    {

    }

    create()
    {
        this.mus_boom = this.sound.add('mus_intronoise', { volume: 0.7, loop: false, });
        this.keyZ = this.input.keyboard.addKey('Z');

        this.time.addEvent({
            delay: 5000,
            callback: ()=>{
                this.mus_boom.play()
                this.text1 = this.add.text(720, 400, 'FLOWEY BATTLE', { fontFamily: 'Determination', fontSize: '72px', align: 'center' }).setOrigin(0.5)
                this.text2 = this.add.text(720, 500, 'by André Beaulieu', { fontFamily: 'Determination', fontSize: '64px', align: 'center' }).setOrigin(0.5)
            }
        })
        this.time.addEvent({
            delay: 10000,
            callback: ()=>{
                this.text1.destroy()
                this.text2.destroy()
                this.mus_boom.play()
                this.text1 = this.add.text(720, 400, 'UNDERTALE', { fontFamily: 'Determination', fontSize: '72px', align: 'center' }).setOrigin(0.5)
                this.text2 = this.add.text(720, 500, 'by Toby Fox', { fontFamily: 'Determination', fontSize: '64px', align: 'center' }).setOrigin(0.5)
            }
        })
        this.time.addEvent({
            delay: 15000,
            callback: ()=>{
                this.text1.destroy()
                this.text2.destroy()
                this.mus_boom.play()
                this.text1 = this.add.text(720, 450, 'THE END', { fontFamily: 'Determination', fontSize: '72px', align: 'center' }).setOrigin(0.5)
                
                this.keyZ.on('down', ()=>{
                    this.scene.start('Battle')
                })
            }
        })
    }

    update()
    {

    }
}