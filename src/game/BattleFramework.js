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
        this.load.image('box_helper', 'assets/ui/box_helper.png');
        this.load.image('fightbar', 'assets/ui/fightbar.png');
        this.load.image('battle_box_lr', 'assets/ui/battle_box_lr.png');
        this.load.image('battle_box_tb', 'assets/ui/battle_box_tb.png');
        this.load.image('star', 'assets/ui/star.png');
        this.load.image('text_box', 'assets/ui/text_box.png');
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
        this.load.spritesheet('slash', 'assets/ui/slash.png', 
        {
            frameWidth: 128, frameHeight: 128,
        });
        this.load.spritesheet('fightbar_indicator', 'assets/ui/fightbar_indicator.png',
        {
            frameWidth: 16, frameHeight: 248,
        });

        //SOUND
        this.load.audio('mus_flowey', 'assets/snd/music/mus_flowey.mp3')

        this.load.audio('hurt', 'assets/snd/battle/snd_hurt1.wav')
        this.load.audio('break2', 'assets/snd/battle/snd_break2.wav')

        this.load.audio('select1', 'assets/snd/menu/snd_select1.wav')
        this.load.audio('select2', 'assets/snd/menu/snd_select2.wav')
        this.load.audio('heal', 'assets/snd/menu/snd_heal.wav')
        this.load.audio('swing', 'assets/snd/menu/snd_swing.wav')
        this.load.audio('damage', 'assets/snd/menu/snd_damage.wav')
        this.load.audio('text', 'assets/snd/menu/snd_text.wav')
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
        this.monsterText = this.add.text(0, 0, null)
        this.star = this.add.sprite(0, 0, null)
        this.fightbar = this.add.sprite(0, 0, null)
    
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
        this.damageFrameOverride = 0

        this.keyZ = this.input.keyboard.addKey('Z');
        this.keyX = this.input.keyboard.addKey('X');

        //////////////////
        //SCENE CREATION//
        //////////////////

        this.add.image(720, 450, 'background')

        this.player = this.physics.add.sprite(896, 560, 'player')
            .setCollideWorldBounds(true)
            .setDepth(10)
            .setScale(0.75)

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

        this.boxhelper = this.add.sprite(720, 612, 'box_helper')
        //this.boxhelper.alpha = 0.05
        .setVisible(false)
        this.boxEdges = [
            this.physics.add.staticSprite(590, 612, 'battle_box_lr'), //592 - 2 for origin
            this.physics.add.staticSprite(850, 612, 'battle_box_lr'),
            this.physics.add.staticSprite(720, 482, 'battle_box_tb'), //480 + 2
            this.physics.add.staticSprite(720, 742, 'battle_box_tb'),
        ]
        /*
        this.boxL = this.add.sprite(590, 612, 'battle_box_lr') //592 - 2 for origin
        this.boxR = this.add.sprite(850, 612, 'battle_box_lr')
        this.boxT = this.add.sprite(720, 482, 'battle_box_tb') //480 + 2
        this.boxB = this.add.sprite(720, 742, 'battle_box_tb')
        */
       this.physics.add.collider(this.player, this.boxEdges)

        this.hpbar = this.add.sprite(720, 766, 'hpbar')
        this.hptext = this.add.text(784, 746, '20 / 20', { fontFamily: 'Determination', fontSize: '40px'})
        this.add.text(624, 746, 'HP', { fontFamily: 'Determination', fontSize: '40px'})
        this.add.text(320, 746, 'LV 1', { fontFamily: 'Determination', fontSize: '40px'})
        this.add.text(174, 746, 'CHARA', { fontFamily: 'Determination', fontSize: '40px'})

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
        this.anims.generateFrameNames('fightbar_indicator')
        this.anims.create({
            key: 'hit',
            frames: [
                { key: 'fightbar_indicator',frame:1 },
                { key: 'fightbar_indicator',frame:0 },
            ],
            frameRate: 8,
            repeat: -1
        });
        this.anims.generateFrameNames('slash')
        this.anims.create({
            key: 'swing',
            frames: [
                { key: 'slash',frame:0 },
                { key: 'slash',frame:1 },
                { key: 'slash',frame:2 },
                { key: 'slash',frame:3 },
                { key: 'slash',frame:4 },
            ],
            frameRate: 4,
            repeat: 0
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
        this.snd_break2 = this.sound.add('break2', { volume: 0.7, loop: false, });
        
        this.snd_text = this.sound.add('text', { volume: 0.6, loop: false, });
        this.mus_flowey = this.sound.add('mus_flowey', { volume: 0.7, loop: true, });

        this.mus_flowey.play()
        
        //this.mus_flowey.pause()

    }

    update()
    {
        const playerSpeed = 200;

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
                        this.flavourText_looper.destroy()
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

                    this.menuOptionOverload = 1 //set number of menu options
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
                if(this.menuOptionOverload > 2)
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

                    if(this.currentButton == 1)
                    {
                        this.controlType = 'noControl'
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
                this.player.setPosition(this.menuOptions[0].x - 64, this.menuOptions[0].y);

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
                this.player.setPosition(this.menuOptions[1].x - 64, this.menuOptions[1].y);

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
                this.player.setPosition(this.menuOptions[2].x - 64, this.menuOptions[2].y);

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

                this.player.setPosition(this.menuOptions[3].x - 64, this.menuOptions[3].y);

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
    }
    generateMenu()
    {
        this.clearMenu()
        if(this.controlType == 'menu1')
        {
            this.player.setVelocity(0, 0)
            
            this.setBoxSize('text')
            
            //Flavour text stuff
            this.time.addEvent({
                delay: 300,
                callback: ()=>{
                    this.star = this.add.sprite(240, 548, 'star')
                    this.typeText('flavourText', this.generateText('FLAVOUR_TEXT', this.monsterStage))
                }
            })
        }else if(this.controlType == 'menu2')
        {
            if(this.currentButton == 1)//Fight button
            {
                this.menuOptions[0] = this.add.sprite(320, 548, 'star');
                this.textOptions[0] = this.add.text(368, 524, "Flowey", { fontFamily: 'Determination', fontSize: '56px'});
            }
            if(this.currentButton == 2)//Act button
            {
                this.menuOptions = [
                    this.add.sprite(320, 548, 'star'), 
                    this.add.sprite(320, 676, 'star'),
                    this.add.sprite(768, 548, 'star'),
                    this.add.sprite(768, 676, 'star')
                ]
                this.textOptions = [
                    this.add.text(368, 524, this.actsText[0], { fontFamily: 'Determination', fontSize: '56px'}),
                    this.add.text(368, 650, this.actsText[1], { fontFamily: 'Determination', fontSize: '56px'}),
                    this.add.text(816, 522, this.actsText[2], { fontFamily: 'Determination', fontSize: '56px'}),
                    this.add.text(816, 650, this.actsText[3], { fontFamily: 'Determination', fontSize: '56px'}),
                ]
                
            }else if(this.currentButton == 3)//Item button
            {
                /*
                    this.add.sprite(320, 548, 'star'), 
                    this.add.sprite(320, 676, 'star'),
                    this.add.sprite(768, 548, 'star'),
                    this.add.sprite(768, 676, 'star')
                */

                    //this is inefficient and bleh
                if(this.menuOptionOverload == 1)
                {
                    this.menuOptions = [
                        this.add.sprite(320, 548, 'star'), 
                        this.add.sprite(-128, 0, null),
                        this.add.sprite(-128, 0, null),
                        this.add.sprite(-128, 0, null)
                    ]
                }else if(this.menuOptionOverload == 2)
                {
                    this.menuOptions = [
                        this.add.sprite(320, 548, 'star'), 
                        this.add.sprite(320, 676, 'star'),
                        this.add.sprite(-128, 0, null),
                        this.add.sprite(-128, 0, null),
                    ]
                }else if(this.menuOptionOverload == 3)
                {
                    this.menuOptions = [
                        this.add.sprite(320, 548, 'star'), 
                        this.add.sprite(320, 676, 'star'),
                        this.add.sprite(768, 548, 'star'),
                        this.add.sprite(-128, 0, null),
                    ]
                }else if(this.menuOptionOverload == 4)
                {
                    this.menuOptions = [
                        this.add.sprite(320, 548, 'star'), 
                        this.add.sprite(320, 676, 'star'),
                        this.add.sprite(768, 548, 'star'),
                        this.add.sprite(768, 676, 'star')
                    ]
                }
                this.textOptions = [
                    this.add.text(368, 524, this.itemsText[0], { fontFamily: 'Determination', fontSize: '56px'}),
                    this.add.text(368, 650, this.itemsText[1], { fontFamily: 'Determination', fontSize: '56px'}),
                    this.add.text(816, 522, this.itemsText[2], { fontFamily: 'Determination', fontSize: '56px'}),
                    this.add.text(816, 650, this.itemsText[3], { fontFamily: 'Determination', fontSize: '56px'}),
                ]
            }else if(this.currentButton == 4)//Mercy button
            {
                this.menuOptions[0] = this.add.sprite(320, 548, 'star');
                this.textOptions[0] = this.add.text(368, 524, "Spare", { fontFamily: 'Determination', fontSize: '56px'});
            }
        }else if(this.controlType == 'fight')
        {

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
        this.star.destroy()

    }
    onDamaged()
    {
        if(this.damageFrameOverride == 0)
        {
            this.damageFrameOverride++;
            this.currentPlayerHP = this.currentPlayerHP - 3;
            console.log(this.currentPlayerHP)
        }

        this.updateHealth()
    
        this.player.anims.play('hurt')
        this.snd_hurt.play()

        this.bulletOverlap.active = false
        this.time.addEvent({
            delay: 1250,
            callback: ()=>{
                this.bulletOverlap.active = true
                this.damageFrameOverride = 0;
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
            this.killPlayer();
        }

        this.hptext.setText(`${this.currentPlayerHP} / 20`)
    }

    textSequence(firstText, secondText)
    {
        this.controlType = 'noControl'
        this.clearMenu()
        this.player.setVisible(false)
        if(firstText != null)
        {
            this.star = this.add.sprite(240, 548, 'star')
            this.typeText('flavourText', firstText)
            let continueKey = this.keyZ.on('down', ()=>{
                if(secondText != null)
                {
                    continueKey.destroy()
                    this.flavourText_looper.destroy()
                    this.clearMenu()
                    this.star = this.add.sprite(240, 548, 'star')
                    this.typeText('flavourText', secondText)
                    continueKey = this.keyZ.on('down', ()=>{
                        continueKey.destroy()
                        this.flavourText_looper.destroy()
                        this.monsterSpeak(this.monsterStage)
                    })
                }else{
                    continueKey.destroy()
                    this.flavourText_looper.destroy()
                    this.monsterSpeak(this.monsterStage)
                }
            })
        }else{
            this.monsterSpeak(this.monsterStage)
        }
        
    }
    monsterSpeak(param)
    {
        this.clearMenu()
        const generatedText = this.generateText('FLOWEY_DIALOGUE', param)
        if(generatedText[0])
        {
            var dialogue = generatedText[0].split(' | ') //dialogue[0] = emotion context, dialogue[1] = text
            this.flowey.play(dialogue[0])
            let textbox = this.add.sprite(1088, 320, 'text_box')
            this.typeText('dialogue', dialogue[1])
            let continueKey = this.keyZ.on('down', ()=>{
                continueKey.destroy()
                if(generatedText[1])
                {
                    dialogue = generatedText[1].split(' | ')
                    this.flowey.play(dialogue[0])
                    this.monsterText.destroy()
                    this.monsterText_looper.destroy()
                    this.monsterSpeak_looper.destroy()
                    this.typeText('dialogue', dialogue[1])
                    continueKey = this.keyZ.on('down', ()=>{
                        continueKey.destroy()
                        if(generatedText[2])
                        {
                            dialogue = generatedText[2].split(' | ')
                            this.flowey.play(dialogue[0])
                            this.monsterText.destroy()
                            this.monsterText_looper.destroy()
                            this.monsterSpeak_looper.destroy()
                            this.typeText('dialogue', dialogue[1])
                            continueKey = this.keyZ.on('down', ()=>{
                                continueKey.destroy()

                                this.monsterText.destroy()
                                this.monsterText_looper.destroy()
                                this.flowey.play(this.currentAnim)
                                this.monsterSpeak_looper.destroy()
                                textbox.destroy()
                                this.monsterAttack()
                            })
                        }else{
                            this.monsterText.destroy()
                            this.monsterText_looper.destroy()
                            this.flowey.play(this.currentAnim)
                            this.monsterSpeak_looper.destroy()
                            textbox.destroy()
                            this.monsterAttack()
                        }

                    })
                }else{
                    this.monsterText.destroy()
                    textbox.destroy()
                    this.monsterAttack()
                }
            })
        }else{
            this.monsterAttack('generic', 5000)
        }
        
    }
    setBoxSize(param)
    {
        switch(param)
        {
            case 'text':
                this.tweens.add({
                    targets: this.boxhelper,
                    props: {
                        scaleX: { value: 4.25, duration: 300, ease: 'Linear' },
                        scaleY: {value: 1, duration: 100, ease: 'Linear'},
                        y: { value: 612, duration: 100, ease: 'Linear'},
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[0],
                    props: {
                        x: { value: 178, duration: 300, ease: 'Linear' },
                        y: { value: 612, duration: 100, ease: 'Linear'},
                        scaleY: {value: 1, duration: 100, ease: 'Linear'},
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[1],
                    props: {
                        x: { value: 1262, duration: 300, ease: 'Linear' },
                        y: { value: 612, duration: 100, ease: 'Linear'},
                        scaleY: {value: 1, duration: 100, ease: 'Linear'},
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[2],
                    props: {
                        scaleX: { value: 4.25, duration: 300, ease: 'Linear' },
                        y: { value: 486, duration: 100, ease: 'Linear' },
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[3],
                    props: {
                        scaleX: { value: 4.25, duration: 300, ease: 'Linear' },
                        y: { value: 738, duration: 100, ease: 'Linear' },
                    },
                });
                this.tweens.add({
                    targets: this.flowey,
                    props: {
                        y: { value: 256, duration: 100, ease: 'Linear' },
                    },
                });
            break;
            case 'square':
                this.tweens.add({
                    targets: this.boxhelper,
                    props: {
                        scaleX: { value: 1, duration: 300, ease: 'Linear' },
                        scaleY: {value: 1, duration: 100, ease: 'Linear'},
                        y: { value: 612, duration: 100, ease: 'Linear'},
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[0],
                    props: {
                        x: { value: 594, duration: 300, ease: 'Linear' },
                        y: { value: 612, duration: 100, ease: 'Linear'},
                        scaleY: {value: 1, duration: 100, ease: 'Linear'},
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[1],
                    props: {
                        x: { value: 846, duration: 300, ease: 'Linear' },
                        y: { value: 612, duration: 100, ease: 'Linear'},
                        scaleY: {value: 1, duration: 100, ease: 'Linear'},
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[2],
                    props: {
                        scaleX: { value: 1, duration: 300, ease: 'Linear' },
                        y: { value: 486, duration: 100, ease: 'Linear' },
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[3],
                    props: {
                        scaleX: { value: 1, duration: 300, ease: 'Linear' },
                        y: { value: 738, duration: 100, ease: 'Linear' },
                    },
                });
            break;
            case 'rect384':
                this.tweens.add({
                    targets: this.boxhelper,
                    props: {
                        scaleX: { value: 1.5, duration: 300, ease: 'Linear' },
                        scaleY: {value: 1, duration: 100, ease: 'Linear'},
                        y: { value: 612, duration: 100, ease: 'Linear'},
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[0],
                    props: {
                        x: { value: 530, duration: 300, ease: 'Linear' },
                        y: { value: 612, duration: 100, ease: 'Linear'},
                        scaleY: {value: 1, duration: 100, ease: 'Linear'},
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[1],
                    props: {
                        x: { value: 910, duration: 300, ease: 'Linear' },
                        y: { value: 612, duration: 100, ease: 'Linear'},
                        scaleY: {value: 1, duration: 100, ease: 'Linear'},
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[2],
                    props: {
                        scaleX: { value: 1.5, duration: 300, ease: 'Linear' },
                        y: { value: 486, duration: 100, ease: 'Linear' },
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[3],
                    props: {
                        scaleX: { value: 1.5, duration: 300, ease: 'Linear' },
                        y: { value: 738, duration: 100, ease: 'Linear' },
                    },
                });
            break;
            case 'tall384':
                this.tweens.add({
                    targets: this.boxhelper,
                    props: {
                        scaleX: { value: 1, duration: 300, ease: 'Linear' },
                        scaleY: {value: 1.5, duration: 100, ease: 'Linear'},
                        y: { value: 548, duration: 100, ease: 'Linear'},
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[0],
                    props: {
                        x: { value: 594, duration: 300, ease: 'Linear' },
                        y: { value: 548, duration: 100, ease: 'Linear'},
                        scaleY: {value: 1.5, duration: 100, ease: 'Linear'},
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[1],
                    props: {
                        x: { value: 846, duration: 300, ease: 'Linear' },
                        y: { value: 548, duration: 100, ease: 'Linear'},
                        scaleY: {value: 1.5, duration: 100, ease: 'Linear'},
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[2],
                    props: {
                        scaleX: { value: 1, duration: 300, ease: 'Linear' },
                        y: { value: 358, duration: 100, ease: 'Linear' },
                    },
                });
                this.tweens.add({
                    targets: this.boxEdges[3],
                    props: {
                        scaleX: { value: 1, duration: 300, ease: 'Linear' },
                        y: { value: 738, duration: 100, ease: 'Linear' },
                    },
                });
                this.tweens.add({
                    targets: this.flowey,
                    props: {
                        y: { value: 192, duration: 100, ease: 'Linear' },
                    },
                });
            break;
        }
            this.time.addEvent({
                delay: 350,
                callback: ()=>{
                    this.boxEdges[0].body.updateFromGameObject()
                    this.boxEdges[1].body.updateFromGameObject()
                    this.boxEdges[2].body.updateFromGameObject()
                    this.boxEdges[3].body.updateFromGameObject()
                }
            })
    }
    typeText(location, textInput) // top  548, mid 612, bot  676
    {
        var x = 0;
        var newText;

        switch(location)
        {
            case 'flavourText':
                console.log(textInput)
                this.flavourText = this.add.text(288 , 524, '', { fontFamily: 'Determination', fontSize: '56px'});

                this.flavourText_looper = this.time.addEvent({
                    delay: 35,
                    repeat: textInput.length,
                    callback: ()=>{
                        newText = textInput.slice(0, x)
                        this.flavourText.setText(newText)
                        this.snd_text.play()
                        x++
                    }
                });
            break;
            case 'dialogue':

                this.monsterText = this.add.text(940, 256, '', { fontFamily: 'Determination', fontSize: '32px', color: 'Black'})
                this.currentAnim = this.flowey.anims.currentAnim.key
                this.flowey.play(this.currentAnim + '_talk')
                this.monsterText_looper = this.time.addEvent({
                    delay: 40,
                    repeat: textInput.length,
                    callback: ()=>{
                        newText = textInput.slice(0, x)
                        this.monsterText.setText(newText)
                        if(this.flowey.frame.name == 12 || this.flowey.frame.name == 13){
                            //sinister and evil
                            this.snd_floweytalk2.play()
                        }else{
                            //others
                            this.snd_floweytalk1.play()
                        }
                        x++
                    }
                });
                this.monsterSpeak_looper = this.time.addEvent({
                    delay: 40 * this.monsterText_looper.repeatCount,
                    callback: ()=>{
                        this.flowey.play(this.currentAnim)
                    },
                })
            break;
        }
    }
}