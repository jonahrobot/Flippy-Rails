class Loading extends Phaser.Scene{
    constructor(){
        super("Loading");
    }

    preload(){
       
        // Game 1 Assets
        this.load.image('spr_background_1','./assets/Game_1_background.png');
        this.load.image('photo_1','./assets/Photo_1.png');
        this.load.image('photo_2','./assets/Photo_2.png');
        this.load.image('photo_3','./assets/Photo_3.png');
        this.load.image('photo_4','./assets/Photo_4.png');
        this.load.image('photo_5','./assets/Photo_5.png');
        this.load.image('photo_6','./assets/Photo_6.png');
        this.load.image('photo_spot','./assets/Photo_Spot.png');
        this.load.image('box','./assets/Box.png');

        //this.load.image('spr_rail','./assets/rail.png');
        // this.load.audio('sfx_background','./assets/sfx/background.wav');
    }

    create(){
        console.log("LOADING");
    }

    update(){
        this.scene.start('playScene');
    }
}