import Phaser from '../lib/phaser.js'

export default class End extends Phaser.Scene
{
    constructor()
    {
        super('End')
    }

    preload()
    {

    }

    init()
    {

    }

    create()
    {
        this.text1 = this.add.text(384, 512, 'FLOWEY FANBATTLE', { fontFamily: 'Determination', fontSize: '48px', align: 'center' })
        this.text2 = this.add.text(384, 512, 'by André Beaulieu', { fontFamily: 'Determination', fontSize: '32px', align: 'center' })
        this.time.addEvent({
            delay: 3000,
            callback: ()=>{
                this.text1.destroy()
                this.text2.destroy()
                this.text1 = this.add.text(384, 512, 'UNDERTALE', { fontFamily: 'Determination', fontSize: '48px', align: 'center' })
                this.text2 = this.add.text(384, 512, 'by Toby Fox', { fontFamily: 'Determination', fontSize: '32px', align: 'center' })
            }
        })
        this.time.addEvent({
            delay: 6000,
            callback: ()=>{
                this.text1.destroy()
                this.text2.destroy()
                this.text1 = this.add.text(384, 512, 'THE END', { fontFamily: 'Determination', fontSize: '48px', align: 'center' })
            }
        })
    }

    update()
    {

    }
}