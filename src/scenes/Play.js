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

        // Create Player
        this.player = new Player(this, 64, this.cursorY, 'spr_player');
        this.player.setDepth(1);

        // Set up Rail Group
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
        }; this.rails = this.add.group(config);
        
        // State Trackers
        this.currentFlipState = 0;      // 0 = DOWN, 1 = UP

        // Constants
        this.railSpeed = 2;

        // Track Creation Trackers
        this.cursorX = 640 + 64;
        this.cursorY = 240;
        this.distanceTillNextTrack = 0; 

        // Set up Inputs
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Start Track Flip Switch Generation
        this.time.delayedCall(2500, () => { 
            this.changeTracks(); 
        });
    }

    update(){

        if (Phaser.Input.Keyboard.JustDown(this.keyLEFT)) {
            this.moveCursorDown(2);
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.keyRIGHT)) {
            this.moveCursorUp(2);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            if(this.currentFlipState == 0){
                this.currentFlipState = 1;
            }else{
                this.currentFlipState = 0;
            }
        }

        // Check if we need to create a new track
        if(this.distanceTillNextTrack <= 0){

            // If so create rail
            this.rails.add(new Rail(this,this.cursorX,this.cursorY,'spr_rail',0,this.rails,0));
            this.distanceTillNextTrack = 64;

        }else{

            // Otherwise move rails down
            this.rails.incX(-1 * this.railSpeed);
            this.distanceTillNextTrack -= this.railSpeed;

        }
        
        // Finally, Check for collisions
        this.physics.world.collide(this.player, this.rails, this.collision, null, this);
    }

    // Change tracks direction
    changeTracks(){

        let randomNum =  Phaser.Math.Between(0, 9);

        // Randomly go up or down
        if(randomNum >= 5){
            this.moveCursorDown(2);
        }else{
            this.moveCursorUp(2);
        }
    
        // Change tracks again in the future    
        this.time.delayedCall(2500, () => { 
            this.changeTracks(); 
        });
    }

    // On collision with a flip rail, check if player matches or derails
    collision(player,rail){

        // If match move player to new rail direction
        if(this.currentFlipState == rail.direction){
          
            // Move in direction of rail
            if(rail.direction == 0){ 
                player.y -= 128;
            }else{
                player.y += 128;
            }

        }else{

            // Not matched, fail state
            player.destroy();
            rail.destroy();

        }
    }

    // Move tracks up by x times
    moveCursorUp(times){

        // Add flip rail
        this.rails.add(new RailFlip(this,this.cursorX,this.cursorY,'spr_flip_rail',0,this.rails,0));

        // Add rails up to next track
        while(times > 0){
            this.rails.add(new Rail(this,this.cursorX,this.cursorY-64,'spr_rail',0,this.rails,0));
            times -= 1;
            this.cursorY -= 64;
        }

        // Restart creation
        this.distanceTillNextTrack = 64;
    }

    // Move tracks down by x times
    moveCursorDown(times){

        // Add flip rail
        this.rails.add(new RailFlip(this,this.cursorX,this.cursorY,'spr_flip_rail',0,this.rails,1));

        // Add rails up to next track
        while(times > 0){
            this.rails.add(new Rail(this,this.cursorX,this.cursorY+64,'spr_rail',0,this.rails,0));
            times -= 1;
            this.cursorY += 64;
        }

        // Restart creation
        this.distanceTillNextTrack = 64;
    }
}