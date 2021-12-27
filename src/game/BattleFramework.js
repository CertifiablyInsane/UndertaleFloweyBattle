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
        this.load.image('background', 'assets/background.png');
        this.load.image('battle_box', 'assets/ui/battle_box.png');
        this.load.image('battle_box_lr', 'assets/ui/battle_box_lr.png');
        this.load.image('battle_box_tb', 'assets/ui/battle_box_tb.png');
        this.load.image('test', '/assets/ui/battle_box_tb.png')
        this.load.image('star', 'assets/ui/star.png');
        this.load.spritesheet('player', 'assets/soul.png', 
        {
            frameWidth: 64, frameHeight: 64
        });
        this.load.spritesheet('battle_buttons', 'assets/ui/battle_buttons.png', 
        {
            frameWidth: 448, frameHeight: 192,
        });
        this.load.spritesheet('hpbar', 'assets/ui/hpbar.png', 
        {
            frameWidth: 64, frameHeight: 64,
        });

        //SOUND

        this.load.audio('hurt', 'assets/snd/battle/snd_hurt1.wav')

        this.load.audio('select1', 'assets/snd/menu/snd_select1.wav')
        this.load.audio('select2', 'assets/snd/menu/snd_select2.wav')
        this.load.audio('heal', 'assets/snd/menu/snd_heal.wav')
        this.load.audio('swing', 'assets/snd/menu/snd_swing.wav')
        this.load.audio('damage', 'assets/snd/menu/snd_damage.wav')
    }

    init()
    {
        this.menuOptions = [
            this.add.sprite(0, 0, null), 
            this.add.sprite(0, 0, null),
            this.add.sprite(0, 0, null),
            this.add.sprite(0, 0, null)
        ]
        this.textOptions = [
            this.add.text(0, 0, null),
            this.add.text(0, 0, null),
            this.add.text(0, 0, null),
            this.add.text(0, 0, null),
        ]
        this.flavourText = this.add.text(0, 0, null);
    
        this.clearMenu()

        /*
        Dear Mr. Wilson,

        If you are reading this, then I never figured out how to find a better way than this silliness.

        Allow me to explain myself.

        Calling this.destroy() doesn't work unless I establish what type of object the variable is.
        This is normally fine, but it causes issues when I don't establish the object type for menu options with less than four options
        (example MERCY)
        therefore, I must establish and then immediate delete all the variables on initiation so that 
        the engine cry like a toddler when I try to delete a non existant variable.

        By the way, I did look into the @type {Phaser.whatever you put here} thing but I found no luck.
        
        Thanks for understanding,
        Sorry.
        */
    }

    create()
    {

        //////////////////
        ////GLOBAL VARS///
        //////////////////
        this.controlType = 'menu1';
        this.currentButton = 1;
        this.menuOptionCols = true;
        this.menuOptionRows = true;
        this.menuOptionOverload;
        this.playerSelectedOption;
        this.pressReset = true;
        this.totalPlayerHP = 20;
        this.currentPlayerHP = 20;

        this.keyZ = this.input.keyboard.addKey('Z');
        this.keyX = this.input.keyboard.addKey('X');

        //////////////////
        //SCENE CREATION//
        //////////////////

        this.add.image(720, 450, 'background');

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

        this.battleBox = this.add.sprite(720, 612, 'battle_box')
            .setScale(2)

        this.battleBoxPhys = this.physics.add.staticGroup()

            this.battleBoxPhys.create(532, 528, 'battle_box_lr').setScale(2).body.updateFromGameObject(), 
            this.battleBoxPhys.create(908, 528, 'battle_box_lr').setScale(2).body.updateFromGameObject(),
            this.battleBoxPhys.create(720, 340, 'battle_box_tb').setScale(2).body.updateFromGameObject(),
            this.battleBoxPhys.create(720, 716, 'battle_box_tb').setScale(2).body.updateFromGameObject(),

        this.battleBoxPhys.setVisible(false)

        this.physics.add.collider(this.player, this.battleBoxPhys);
        this.hpbar = this.add.sprite(720, 766, 'hpbar')
        this.hptext = this.add.text(784, 746, '20 / 20', { fontFamily: 'Determination', fontSize: '40px'})
        this.add.text(624, 746, 'HP', { fontFamily: 'Determination', fontSize: '40px'})
        this.add.text(384, 746, 'LV 1', { fontFamily: 'Determination', fontSize: '40px'})

        this.generateMenu()
        //////////////////
        ////ANIMATIONS////
        //////////////////

        this.anims.generateFrameNames('player')
        this.anims.create({
            key: 'hurt',
            frames: [
                { key: 'player',frame:1 },
                { key: 'player',frame:0 },
            ],
            frameRate: 4,
            repeat: 4
        });
        this.anims.create({
            key: 'dead',
            frames: [
                { key: 'player',frame:2 },
            ],
            frameRate: 4,
            repeat: -1
        });

        //////////////////
        ///////SOUND//////
        //////////////////
        this.snd_select1 = this.sound.add('select1', { volume: 0.6, loop: false, });
        this.snd_select2 = this.sound.add('select2', { volume: 0.6, loop: false, });
        this.snd_heal = this.sound.add('heal', { volume: 0.8, loop: false, });
        this.snd_swing = this.sound.add('swing', { volume: 0.6, loop: false, });
        this.snd_damage = this.sound.add('damage', { volume: 0.8, loop: false, });

        this.snd_hurt = this.sound.add('hurt', { volume: 0.6, loop: false, });

    }

    update()
    {
        //var pos = [this.player.x, this.player.y]
        //console.log(pos)
        const playerSpeed = 256;

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
                    this.snd_select1.play()
                    this.currentButton--;
                    if(this.currentButton == 0){
                        this.currentButton = 4
                    }
                }else if(this.cursors.right.isDown)
                {
                    this.pressReset = false;
                    this.snd_select1.play()
                    this.currentButton++;
                    if(this.currentButton == 5){
                        this.currentButton = 1
                    }
                }else if(this.keyZ.isDown)
                {
                    this.pressReset = false;
                    if(this.currentButton != 3 || this.numItems > 0) //Fire as long as you aren't entering the item menu with no items
                    {
                    this.snd_select2.play()
                    this.controlType = 'menu2'
                    this.menuOptionCols = true;
                    this.menuOptionRows = true;
                    this.generateMenu()
                    }
                }
            }else if(this.cursors.left.isUp && this.cursors.right.isUp && this.keyZ.isUp && this.keyX.isUp)
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

                    this.menuOptionOverload = this.numItems //set number of menu options
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
                        this.snd_select1.play()
                        if(this.menuOptionCols == true){
                            this.menuOptionCols = false
                        }else{
                            this.menuOptionCols = true
                        }
                    }
                if(this.cursors.up.isDown || this.cursors.down.isDown)
                    {
                        this.pressReset = false;
                        this.snd_select1.play()
                        if(this.menuOptionRows == true){
                            this.menuOptionRows = false
                        }else{
                            this.menuOptionRows = true
                        }
                    }
                if(this.keyZ.isDown)
                {
                    this.pressReset = false;
                    this.snd_select2.play()
                    this.controlType = 'freemove'

                    if(this.currentButton == 1)
                    {
                        this.doFight()
                    }else if(this.currentButton == 2)
                    {
                        //ACT CODE
                        this.doAct(this.playerSelectedOption)
                    }else if(this.currentButton == 3)
                    {
                        //ITEM CODE
                        this.doItem(this.playerSelectedOption)
                    }else if(this.currentButton == 4)
                    {
                        //MERCY CODE
                        this.doMercy()

                    }
                }
                if(this.keyX.isDown)//Return
                {
                    this.controlType = 'menu1';
                    this.generateMenu();
                }
            }else if(this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp && this.keyZ.isUp && this.keyX.isUp)
            {
                this.pressReset = true;
            }
            if(this.menuOptionCols == true && this.menuOptionRows == true && this.menuOptionOverload > 0)
            {
                this.menuOptions[0].setVisible(0)
                this.menuOptions[1].setVisible(1)
                this.menuOptions[2].setVisible(1)
                this.menuOptions[3].setVisible(1)

                this.player.setPosition(this.menuOptions[0].x, this.menuOptions[0].y);

                switch(this.currentButton)
                {
                    case 2: //If on act button
                        this.playerSelectedOption = this.actsText[0]
                        break;
                    case 3: //If on item button
                        this.playerSelectedOption = this.itemsText[0]
                        break;
                }

            }else if(this.menuOptionCols == true && this.menuOptionRows == false && this.menuOptionOverload > 1)
            {
                this.menuOptions[0].setVisible(1)
                this.menuOptions[1].setVisible(0)
                this.menuOptions[2].setVisible(1)
                this.menuOptions[3].setVisible(1)

                this.player.setPosition(this.menuOptions[1].x, this.menuOptions[1].y);

                switch(this.currentButton)
                {
                    case 2: //If on act button
                        this.playerSelectedOption = this.actsText[1]
                        break;
                    case 3: //If on item button
                        this.playerSelectedOption = this.itemsText[1]
                        break;
                }

            }else if(this.menuOptionCols == false && this.menuOptionRows == true  && this.menuOptionOverload > 2)
            {
                this.menuOptions[0].setVisible(1)
                this.menuOptions[1].setVisible(1)
                this.menuOptions[2].setVisible(0)
                this.menuOptions[3].setVisible(1)

                this.player.setPosition(this.menuOptions[2].x, this.menuOptions[2].y);

                switch(this.currentButton)
                {
                    case 2: //If on act button
                        this.playerSelectedOption = this.actsText[2]
                        break;
                    case 3: //If on item button
                        this.playerSelectedOption = this.itemsText[2]
                        break;
                }

            }else if(this.menuOptionCols == false && this.menuOptionRows == false  && this.menuOptionOverload > 3)
            {
                this.menuOptions[0].setVisible(1)
                this.menuOptions[1].setVisible(1)
                this.menuOptions[2].setVisible(1)
                this.menuOptions[3].setVisible(0)

                this.player.setPosition(this.menuOptions[3].x, this.menuOptions[3].y);

                switch(this.currentButton)
                {
                    case 2: //If on act button
                        this.playerSelectedOption = this.actsText[3]
                        break;
                    case 3: //If on item button
                        this.playerSelectedOption = this.itemsText[3]
                        break;
                }
            }
        }
        /*
        if(this.controlType == 'text')
        {
            if(this.pressReset == true)
            {
                if(this.keyZ.isDown)
                {
                    this.pressReset = false
                    console.log('continue')
                }
            }else if(this.keyZ.isUp)
            {
                this.pressReset = true
            }
        }
        */
    }
    generateMenu()
    {
        this.clearMenu()
        if(this.controlType == 'menu1')
        {
            this.player.setVelocity(0, 0)
            this.battleBox.setVisible(true)
            this.battleBoxPhys.setVisible(false)
            //Flavour text stuff
            this.flavourText = this.add.text(320, 524, this.generateFlavourText('SAMPLE', 0), { fontFamily: 'Determination', fontSize: '40px'});
        }else if(this.controlType == 'menu2')
        {
            this.battleBox.setVisible(true)
            this.battleBoxPhys.setVisible(false)
            if(this.currentButton == 2)//Act button
            {
                this.menuOptions = [
                    this.add.sprite(320, 540, 'star'), 
                    this.add.sprite(320, 668, 'star'),
                    this.add.sprite(736, 540, 'star'),
                    this.add.sprite(736, 668, 'star')
                ]
                this.textOptions = [
                    this.add.text(352, 522, this.actsText[0], { fontFamily: 'Determination', fontSize: '40px'}),
                    this.add.text(352, 650, this.actsText[1], { fontFamily: 'Determination', fontSize: '40px'}),
                    this.add.text(768, 522, this.actsText[2], { fontFamily: 'Determination', fontSize: '40px'}),
                    this.add.text(768, 650, this.actsText[3], { fontFamily: 'Determination', fontSize: '40px'}),
                ]
                
            }else if(this.currentButton == 3)//Item button
            {
                this.menuOptions = [
                    this.add.sprite(320, 540, 'star'), 
                    this.add.sprite(320, 668, 'star'),
                    this.add.sprite(736, 540, 'star'),
                    this.add.sprite(736, 668, 'star')
                ]
                this.textOptions = [
                    this.add.text(352, 522, this.itemsText[0], { fontFamily: 'Determination', fontSize: '40px'}),
                    this.add.text(352, 650, this.itemsText[1], { fontFamily: 'Determination', fontSize: '40px'}),
                    this.add.text(768, 522, this.itemsText[2], { fontFamily: 'Determination', fontSize: '40px'}),
                    this.add.text(768, 650, this.itemsText[3], { fontFamily: 'Determination', fontSize: '40px'}),
                ]
            }else if(this.currentButton == 4)//Mercy button
            {
                this.menuOptions[0] = this.add.sprite(320, 540, 'star');
                this.textOptions[0] = this.add.text(352, 522, "Spare", { fontFamily: 'Determination', fontSize: '40px'});
            }
        }else if(this.controlType == 'freemove')
        {
            this.battleBox.setVisible(false)
            this.battleBoxPhys.setVisible(true)
            this.time.addEvent({ //adds slight delay to setPosition so that any movements called in Update() don't override this.
                delay: 1,
                callback: ()=>{
                    this.player.setPosition(720, 534);
                },
                loop: false
            });
            
        }
    }
    clearMenu()
    {
        this.menuOptions[0].destroy()
        this.menuOptions[1].destroy()
        this.menuOptions[2].destroy()
        this.menuOptions[3].destroy()
        this.textOptions[0].destroy()
        this.textOptions[1].destroy()
        this.textOptions[2].destroy()
        this.textOptions[3].destroy()
        this.flavourText.destroy()

    }
    onDamaged()
    {
        this.currentPlayerHP = this.currentPlayerHP - 3;
        console.log(this.currentPlayerHP)

        this.updateHealth()
    
        this.player.anims.play('hurt')
        this.snd_hurt.play()

        this.bulletOverlap.active = false
        this.time.addEvent({
            delay: 1250,
            callback: ()=>{
                this.bulletOverlap.active = true
            },
            loop: false
        });
    }

    updateHealth()
    {
        var hpPercent = this.currentPlayerHP / this.totalPlayerHP
        if(hpPercent == 1){
            this.hpbar.setFrame(0)
        }else if(hpPercent >= 0.875){
            this.hpbar.setFrame(1)
        }else if(hpPercent >= 0.750){
            this.hpbar.setFrame(2)
        }else if(hpPercent >= 0.625){
            this.hpbar.setFrame(3)
        }else if(hpPercent >= 0.500){
            this.hpbar.setFrame(4)
        }else if(hpPercent >= 0.375){
            this.hpbar.setFrame(5)
        }else if(hpPercent >= 0.250){
            this.hpbar.setFrame(6)
        }else if(hpPercent >= 0.125){
            this.hpbar.setFrame(7)
        }else if(hpPercent <= 0){
            this.hpbar.setFrame(8)
            this.playerDead()
        }

        this.hptext.setText(`${this.currentPlayerHP} / 20`)
    }

    textSequence(firstText, secondText)
    {
        this.clearMenu()
        this.player.setVisible(false)
        this.flavourText = this.add.text(320, 524, firstText, { fontFamily: 'Determination', fontSize: '40px'});
        let continueKey = this.keyZ.on('down', ()=>{
            if(secondText != null)
            {
                continueKey.destroy()
                this.clearMenu()
                this.flavourText = this.add.text(320, 524, secondText, { fontFamily: 'Determination', fontSize: '40px'});
                let continueKey2 = this.keyZ.on('down', ()=>{
                    continueKey2.destroy()
                    this.player.setVisible(true)
                    this.monsterAttack('generic', 5000)
                })
            }else{
                continueKey.destroy()
                this.player.setVisible(true)
                this.monsterAttack('generic', 5000)
            }
        })
        
    }
    playerDead()
    {
        this.scene.start('Dead')
    }
}