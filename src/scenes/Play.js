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

        this.cursorX = -64;
        this.cursorY = 240;

        // Create Rail group
        this.rails = this.add.group(config);

        this.rails.add(new Rail(this,30,30,'spr_rail',0,this.rails,0));
        this.rails.add(new Rail(this,10,30,'spr_rail',0,this.rails,0));

        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
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
            this.rails.incX(this.railSpeed);
            this.distance -= this.railSpeed;
        }
        
        console.log(this.rails.countActive());
    }

    moveCursorUp(times){
        this.rails.add(new Rail(this,this.cursorX,this.cursorY,'spr_rail',0,this.rails,0));
        while(times > 0){
            this.rails.add(new Rail(this,this.cursorX,this.cursorY-64,'spr_rail',0,this.rails,0));
            times -= 1;
            this.cursorY -= 64;
        }
    }

    moveCursorDown(times){
        this.rails.add(new Rail(this,this.cursorX,this.cursorY,'spr_rail',0,this.rails,0));
        while(times > 0){
            this.rails.add(new Rail(this,this.cursorX,this.cursorY+64,'spr_rail',0,this.rails,0));
            times -= 1;
            this.cursorY += 64;
        }
    }
}