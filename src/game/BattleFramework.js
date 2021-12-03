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
        this.load.image('battle_box', 'assets/battle_box.png');
        this.load.image('star', 'assets/star.png');
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
        this.menuOptionCols = true;
        this.menuOptionRows = true;
        this.menuOptionOverload;
        this.pressReset = true;
        this.isSpareable = false;

        //////////////////
        //SCENE CREATION//
        //////////////////
        this.player = this.physics.add.sprite(896, 560, 'player')
            .setCollideWorldBounds(true)
            .setDepth(1)

        this.player.body.setSize(40, 40, true)

        this.fightButton = this.add.sprite(288, 836, 'battle_buttons')
            .setScale(0.5)
            .setFrame(0)
        this.actButton = this.add.sprite(576, 836, 'battle_buttons')
            .setScale(0.5)
            .setFrame(2)
        this.itemButton = this.add.sprite(864, 836, 'battle_buttons')
            .setScale(0.5)
            .setFrame(4)
        this.mercyButton = this.add.sprite(1152, 836, 'battle_buttons')
            .setScale(0.5)
            .setFrame(6)

        this.battleBox = this.add.sprite(720, 640, 'battle_box')
            .setScale(2)

        this.menuOptionFour;

        this.generateMenu()
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
                    this.generateMenu()
                    this.menuOptionCols = true;
                    this.menuOptionRows = true;
                    this.flavourText.destroy()
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

                    this.menuOptionOverload = 0 //set number of menu options
                    break;
                case 2:
                    this.actButton.setFrame(3); //set new active

                    this.fightButton.setFrame(0); //set inactives
                    this.itemButton.setFrame(4);

                    this.player.setPosition(this.actButton.x - 80, this.actButton.y); //set new player pos

                    this.menuOptionOverload = 4 //set number of menu options
                    break;
                case 3:
                    this.itemButton.setFrame(5); //set new active

                    this.actButton.setFrame(2); //set inactives
                    this.mercyButton.setFrame(6);

                    this.player.setPosition(this.itemButton.x - 80, this.itemButton.y); //set new player pos

                    this.menuOptionOverload = 3 //set number of menu options
                    break;
                case 4:
                    this.mercyButton.setFrame(7); //set new active

                    this.fightButton.setFrame(0); //set inactives
                    this.itemButton.setFrame(4);

                    this.player.setPosition(this.mercyButton.x - 80, this.mercyButton.y); //set new player pos

                    this.menuOptionOverload = 1 //set number of menu options
                    break;
            }
        }
        if(this.controlType == 'menu2')
        {
            if(this.pressReset == true)
            {
                    if(this.cursors.left.isDown || this.cursors.right.isDown)
                    {
                        this.pressReset = false;
                        if(this.menuOptionCols == true){
                            this.menuOptionCols = false
                        }else{
                            this.menuOptionCols = true
                        }
                    }
                if(this.cursors.up.isDown || this.cursors.down.isDown)
                    {
                        this.pressReset = false;
                        if(this.menuOptionRows == true){
                            this.menuOptionRows = false
                        }else{
                            this.menuOptionRows = true
                        }
                    }
                if(keyZ.isDown)
                {
                    this.pressReset = false;
                    if(this.currentButton == 1)
                    {
                        //FIGHT CODE
                    }else if(this.currentButton == 2)
                    {
                        //ACT CODE
                    }else if(this.currentButton == 3)
                    {
                        //ITEM CODE
                    }else if(this.currentButton == 4)
                    {
                        //MERCY CODE
                        if(this.isSpareable == true){
                            //spare
                        }
                    }
                }
                if(keyX.isDown)//Return
                {
                    this.controlType = 'menu1';
                    this.menuOptionOne.destroy()
                    this.menuOptionTwo.destroy()
                    this.menuOptionThree.destroy()
                    this.menuOptionFour.destroy()
                    this.textOne.destroy()
                    this.textTwo.destroy()
                    this.textThree.destroy()
                    this.textFour.destroy()
                    this.generateMenu();
                }
            }else if(this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp && keyZ.isUp && keyX.isUp)
            {
                this.pressReset = true;
            }
            if(this.menuOptionCols == true && this.menuOptionRows == true && this.menuOptionOverload > 0)
            {
                this.menuOptionOne.setVisible(0)
                this.menuOptionTwo.setVisible(1)
                this.menuOptionThree.setVisible(1)
                this.menuOptionFour.setVisible(1)

                this.player.setPosition(this.menuOptionOne.x, this.menuOptionOne.y);
            }else if(this.menuOptionCols == true && this.menuOptionRows == false && this.menuOptionOverload > 1)
            {
                this.menuOptionOne.setVisible(1)
                this.menuOptionTwo.setVisible(0)
                this.menuOptionThree.setVisible(1)
                this.menuOptionFour.setVisible(1)
                this.player.setPosition(this.menuOptionTwo.x, this.menuOptionTwo.y);
            }else if(this.menuOptionCols == false && this.menuOptionRows == true  && this.menuOptionOverload > 2)
            {
                this.menuOptionOne.setVisible(1)
                this.menuOptionTwo.setVisible(1)
                this.menuOptionThree.setVisible(0)
                this.menuOptionFour.setVisible(1)
                this.player.setPosition(this.menuOptionThree.x, this.menuOptionThree.y);
            }else if(this.menuOptionCols == false && this.menuOptionRows == false  && this.menuOptionOverload > 3)
            {
                this.menuOptionOne.setVisible(1)
                this.menuOptionTwo.setVisible(1)
                this.menuOptionThree.setVisible(1)
                this.menuOptionFour.setVisible(0)
                this.player.setPosition(this.menuOptionFour.x, this.menuOptionFour.y);
            }
        }
    }
    generateMenu()
    {
        if(this.controlType == 'menu1')
        {
            //Flavour text stuff
            this.flavourText = this.add.text(320, 568, this.generateFlavourText('sample', 0), { fontFamily: '"Trebuchet MS"', fontSize: '32px'});
        }else if(this.controlType == 'menu2')
        {
            if(this.currentButton == 2)//Act button
            {
                this.menuOptionOne = this.add.sprite(320, 568, 'star');
                this.textOne = this.add.text(352, 552, this.actOneText, { fontFamily: '"Trebuchet MS"', fontSize: '32px'});
                this.menuOptionTwo = this.add.sprite(320, 696, 'star');
                this.textTwo = this.add.text(352, 680, this.actTwoText, { fontFamily: '"Trebuchet MS"', fontSize: '32px'});
                this.menuOptionThree = this.add.sprite(736, 568, 'star');
                this.textThree = this.add.text(768, 552, this.actThreeText, { fontFamily: '"Trebuchet MS"', fontSize: '32px'});
                this.menuOptionFour = this.add.sprite(736, 696, 'star');
                this.textFour = this.add.text(768, 680, this.actFourText, { fontFamily: '"Trebuchet MS"', fontSize: '32px'});
            }else if(this.currentButton == 3)//Item button
            {
                this.menuOptionOne = this.add.sprite(320, 568, 'star');
                this.textOne = this.add.text(352, 552, this.itemOneText, { fontFamily: '"Trebuchet MS"', fontSize: '32px'});
                this.menuOptionTwo = this.add.sprite(320, 696, 'star');
                this.textTwo = this.add.text(352, 680, this.itemTwoText, { fontFamily: '"Trebuchet MS"', fontSize: '32px'});
                this.menuOptionThree = this.add.sprite(736, 568, 'star');
                this.textThree = this.add.text(768, 552, this.itemThreeText, { fontFamily: '"Trebuchet MS"', fontSize: '32px'});
                //this.menuOptionFour = this.add.sprite(736, 696, 'star');
                //this.textFour = this.add.text(768, 680, this.itemFourText, { fontFamily: '"Trebuchet MS"', fontSize: '32px'});
            }else if(this.currentButton == 4)//Mercy button
            {
                this.menuOptionOne = this.add.sprite(320, 568, 'star');
                this.textOne = this.add.text(352, 552, "Spare", { fontFamily: '"Trebuchet MS"', fontSize: '32px'});
            }
        }
    }
    generateFlavourText(textParam, numParam)
    {
        var returnText;
        if(textParam == 'sample')
        {
            switch(numParam)
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
            return returnText;
        }
    }
}