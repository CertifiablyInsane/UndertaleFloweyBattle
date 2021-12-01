import Phaser from '../lib/phaser.js'

export default class BattleFramework extends Phaser.Scene
{
    /**@type {Phaser.Physics.Arcade.Sprite} */
    player

    /**@type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors

    preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.load.image('player', 'assets/soul.png');
    }

    create()
    {
        console.log('Framework loaded');

        this.player = this.physics.add.sprite(896, 560, 'player');

        this.playerSelector = this.add.sprite(128, 772, 'player');

        this.player.body.setSize(40, 40, true);
        this.player.setCollideWorldBounds(true);
    }

    update()
    {
        const playerSpeed = 256;

        if(this.cursors.left.isDown)
        {
            this.player.setVelocityX(-playerSpeed);
        }
        else if(this.cursors.right.isDown)
        {
            this.player.setVelocityX(playerSpeed);
        }
        else
        {
            this.player.setVelocityX(0);
        }

        if(this.cursors.up.isDown)
        {
            this.player.setVelocityY(-playerSpeed);
        }
        else if(this.cursors.down.isDown)
        {
            this.player.setVelocityY(playerSpeed);
        }
        else
        {
            this.player.setVelocityY(0);
        }
    }
}