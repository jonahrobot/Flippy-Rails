class Lose extends Phaser.Scene{
    constructor(){
        super("Lose");
    }

    create(){
        this.add.image(233,31,'spr_gameover').setOrigin(0,0);
        this.add.image(480,100,'spr_tutorial').setOrigin(0,0);
    }

}