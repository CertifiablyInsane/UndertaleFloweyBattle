import Phaser from './lib/phaser.js'

import Battle from './scenes/Battle.js'
import Dead from './scenes/Dead.js'
import End from './scenes/End.js'

export default new Phaser.Game({
    type: Phaser.CANVAS,
    width: 1440,
    height: 900,
    scene: [Battle, Dead, End],
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    canvas: document.querySelector('canvas'),
})