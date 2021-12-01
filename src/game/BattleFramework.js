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
        this.load.spritesheet('battle_buttons', 'assets/battle_buttons.png', 
        {
            frameWidth: 448, frameHeight: 192,
        });
    }

    create()
    {
        console.log('Framework loaded');

        //////////////////
        ////GLOBAL VARS///
        //////////////////
        this.controlType = 'menu1';
        this.currentButton = 1;
        this.pressReset = true;

        //////////////////
        //SCENE CREATION//
        //////////////////
        this.player = this.physics.add.sprite(896, 560, 'player')
            .setCollideWorldBounds(true)
            .setDepth(1)

        this.player.body.setSize(40, 40, true)

        this.fightButton = this.add.sprite(288, 804, 'battle_buttons')
            .setScale(0.5)
            .setFrame(0)
        this.actButton = this.add.sprite(576, 804, 'battle_buttons')
            .setScale(0.5)
            .setFrame(2)
        this.itemButton = this.add.sprite(864, 804, 'battle_buttons')
            .setScale(0.5)
            .setFrame(4)
        this.mercyButton = this.add.sprite(1152, 804, 'battle_buttons')
            .setScale(0.5)
            .setFrame(6)
        //////////////////
        ////ANIMATIONS////
        //////////////////
    }

    update()
    {
        const playerSpeed = 256;

        const keyZ = this.input.keyboard.addKey('Z');
        const keyX = this.input.keyboard.addKey('X');
        //FREEMOVE CONTROLS
        if(this.controlType == 'freemove')
        {
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

        //MENU 1 CONTROLS

        if(this.controlType == 'menu1')
        {
            if(this.pressReset == true)
            {
                if(this.cursors.left.isDown)
                {
                    this.pressReset = false;
                    this.currentButton--;
                    if(this.currentButton == 0){
                        this.currentButton = 4
                    }
                }else if(this.cursors.right.isDown)
                {
                    this.pressReset = false;
                    this.currentButton++;
                    if(this.currentButton == 5){
                        this.currentButton = 1
                    }
                }else if(keyZ.isDown)
                {
                    this.pressReset = false;
                    this.controlType = 'menu2'
                }
            }else if(this.cursors.left.isUp && this.cursors.right.isUp && keyZ.isUp && keyX.isUp)
            {
                this.pressReset = true;
            }
            switch(this.currentButton)
            {
                case 1:
                    this.fightButton.setFrame(1); //set new active

                    this.actButton.setFrame(2); //set inactives
                    this.mercyButton.setFrame(6);

                    this.player.setPosition(this.fightButton.x - 80, this.fightButton.y); //set new player pos
                    break;
                case 2:
                    this.actButton.setFrame(3); //set new active

                    this.fightButton.setFrame(0); //set inactives
                    this.itemButton.setFrame(4);

                    this.player.setPosition(this.actButton.x - 80, this.actButton.y); //set new player pos
                    break;
                case 3:
                    this.itemButton.setFrame(5); //set new active

                    this.actButton.setFrame(2); //set inactives
                    this.mercyButton.setFrame(6);

                    this.player.setPosition(this.itemButton.x - 80, this.itemButton.y); //set new player pos
                    break;
                case 4:
                    this.mercyButton.setFrame(7); //set new active

                    this.fightButton.setFrame(0); //set inactives
                    this.itemButton.setFrame(4);

                    this.player.setPosition(this.mercyButton.x - 80, this.mercyButton.y); //set new player pos
                    break;
            }
        }
    }
}