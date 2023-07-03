class Title extends Phaser.Scene{
    constructor(){
        super("Title");
    }

    create(){
        this.add.image(233,31,'spr_logo').setOrigin(0,0);
        this.add.image(480,100,'spr_tutorial').setOrigin(0,0);
    }
}