import Phaser from '../lib/phaser.js'
import main from '../main.js';

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
    }

    create()
    {
        this.player = this.add.sprite(720, 450, 'player')
        this.snd_break1 = this.sound.add('break1', { volume: 0.6, loop: false, });
        this.snd_break2 = this.sound.add('break2', { volume: 0.7, loop: false, });

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
                    },
                });
            },
        });
    }

    update()
    {

    }
}