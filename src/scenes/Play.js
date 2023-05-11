class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){

        // Load player assets 
        this.load.image('spr_player','./assets/player.png');

        // Load rails 
        this.railImage = this.load.image('spr_rail','./assets/rail.png');
        this.load.image('spr_flip_rail','./assets/flip_rail.png');
    }

    create(){
        let config = {
            classType: Phaser.GameObjects.Sprite,
            defaultKey: null,
            defaultFrame: null,
            active: true,
            maxSize: -1,
            runChildUpdate: true,
            createCallback: null,
            removeCallback: null,
            createMultipleCallback: null
        }

        this.distance = 0;
        this.railSpeed = 2;

        this.cursorX = 640 + 64;
        this.cursorY = 240;

        // Create Rail group
        this.rails = this.add.group(config);

        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.player = new Player(this, 64, this.cursorY, 'spr_player');
        this.player.setDepth(1);
       
    }
    update(){

        if (Phaser.Input.Keyboard.JustDown(this.keyLEFT)) {
            this.moveCursorDown(2);
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.keyRIGHT)) {
            this.moveCursorUp(2);
        }

        if(this.distance <= 0){
            this.rails.add(new Rail(this,this.cursorX,this.cursorY,'spr_rail',0,this.rails,0));
            this.distance = 64;
        }else{
            this.rails.incX(-1 * this.railSpeed);
            this.distance -= this.railSpeed;
        }
        
        console.log(this.rails.countActive());
        
        this.physics.world.collide(this.player, this.rails, this.collision, null, this);


    }

    collision(){
        console.log("DID IT");
    }

    moveCursorUp(times){
        this.rails.add(new RailFlip(this,this.cursorX,this.cursorY,'spr_flip_rail',0,this.rails,0));
        while(times > 0){
            this.rails.add(new Rail(this,this.cursorX,this.cursorY-64,'spr_rail',0,this.rails,0));
            times -= 1;
            this.cursorY -= 64;
        }
        this.distance = 64;
    }

    moveCursorDown(times){
        this.rails.add(new RailFlip(this,this.cursorX,this.cursorY,'spr_flip_rail',0,this.rails,1));
        while(times > 0){
            this.rails.add(new Rail(this,this.cursorX,this.cursorY+64,'spr_rail',0,this.rails,0));
            times -= 1;
            this.cursorY += 64;
        }
        this.distance = 64;
    }
}