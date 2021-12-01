import Phaser from './lib/phaser.js'

import Battle from './scenes/Battle.js'

export default new Phaser.Game({
    type: Phaser.CANVAS,
    width: 1440,
    height: 900,
    scene: [Battle],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    canvas: document.querySelector('canvas'),
})