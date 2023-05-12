class Loading extends Phaser.Scene{
    constructor(){
        super("Loading");
    }

    preload(){
        // Load player assets 
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
    }

    create(){
        console.log("LOADING");
    }

    update(){
        this.scene.start('playScene');
    }
}