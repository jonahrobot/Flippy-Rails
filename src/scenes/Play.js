class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){

        // Load player assets 
        this.load.image('spr_player','./assets/player.png');

        // Load rails 
        this.load.image('spr_rail','./assets/rail.png');
        this.load.image('spr_flip_rail','./assets/flip_rail.png');
    }

    create(){
        let config = {
            classType: Phaser.GameObjects.Sprite,
            defaultKey: null,
            defaultFrame: null,
            active: true,
            maxSize: -1,
            runChildUpdate: false,
            createCallback: null,
            removeCallback: null,
            createMultipleCallback: null
        }

        // Create Rail group
        this.rails = this.add.group(config);

        this.rails.add(new Rail(this,30,30,'spr_rail',0,this.rails,0));
        this.rails.add(new Rail(this,10,30,'spr_rail',0,this.rails,0));
    }

    update(){
        this.rails.add(new Rail(this,30,30,'spr_rail',0,this.rails,0));
        this.rails.incX(2);
        console.log(this.rails.countActive());
    }
}