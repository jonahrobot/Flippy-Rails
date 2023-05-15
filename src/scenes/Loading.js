class Loading extends Phaser.Scene{
    constructor(){
        super("Loading");
    }

    preload(){
        // Load player assets 
        this.load.atlas('playerAtlas','assets/textureAtlas.png','assets/textureAtlas.json');
        this.load.image('spr_player','./assets/player.png');

        // Load rails 
        this.load.image('spr_rail','./assets/rail.png');
        this.load.image('spr_rail_up','./assets/rail_up.png');
        this.load.image('spr_flip_rail','./assets/flip_rail.png');
        this.load.image('spr_flip_ID','./assets/flip_indicator.png')
        this.load.image('spr_flip_ID_2','./assets/flip_switcher.png')

        // Load Logo
        this.load.image('spr_logo','./assets/logo.png')
        this.load.image('spr_tutorial','./assets/tutorial.png')
        this.load.image('spr_gameover','./assets/gameover.png')

        this.load.audio('sfx_background','./assets/sfx/background.wav');
        this.load.audio('sfx_on','./assets/sfx/toggleon.wav');
        this.load.audio('sfx_off','./assets/sfx/toggleoff.wav');
        this.load.audio('sfx_explosion','./assets/sfx/explosion.wav');
    }

    create(){
        console.log("LOADING");

        this.anims.create({
            key: 'playerAnim',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'Player (',
                start: 1,
                end: 2,
                suffix: ')'
            }),
            frameRate: 2,
            repeat: -1
        });
    }

    update(){
        this.scene.start('playScene');
    }
}