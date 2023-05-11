class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){

        // Load player assets 
        this.load.image('spr_player','./assets/player.png');

        // Load rails 
        this.railImage = this.load.image('spr_rail','./assets/rail.png');
        this.railUpImage = this.load.image('spr_rail_up','./assets/rail_up.png');
        this.load.image('spr_flip_rail','./assets/flip_rail.png');
        this.load.image('spr_flip_ID','./assets/flip_indicator.png')
        
    }

    create(){

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
        this.flipsGenerated = 0;
        this.currentDifficulty = 1500;

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

        // Create Player
        this.player = new Player(this, 64, this.cursorY, 'spr_player');
        this.player.setDepth(2);

        // Start Track Flip Switch Generation
        this.time.delayedCall(2500, () => { 
            this.changeTracks(); 
        });
    }

    update(){

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
            this.distanceTillNextTrack = 64;//this.railSpeed * 8;

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

        this.flipsGenerated += 1;
        this.checkDifficulty();

        let randomNum =  Phaser.Math.Between(0, 9);
        let bounds = false;

        // Check if going up or down will go out of bounds
        if(this.cursorY + 128 >= 480){
            this.moveCursor(0,2);
            bounds = true;
        }

        if(this.cursorY - 128 <= 0){
            this.moveCursor(1,2);
            bounds = true;
        }

        // Randomly go up or down
        if(bounds == false){
            if(randomNum >= 5){
                this.moveCursor(1,2);
            }else{
                this.moveCursor(0,2);
            }
        }
    
        // Change tracks again in the future    
        this.time.delayedCall(this.currentDifficulty, () => { 
            this.changeTracks(); 
        });
    }

    checkDifficulty(){
        switch(this.flipsGenerated){
            case 3:
                this.currentDifficulty = 1000;
                this.railSpeed = 4;
                break;

            case 80:
                this.currentDifficulty = 400;
                this.railSpeed = 5;
                break;
                
            case 150:
                this.currentDifficulty = 300;
                this.railSpeed = 7;
                break;

            case 150:
                this.currentDifficulty = 200;
                this.railSpeed = 10;
                break;
        }
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

    // Direction: 0 for up, 1 for down
    // Times: how far to move in said direction
    moveCursor(direction, times){

        // Add flip rail
        this.rails.add(new RailFlip(this,this.cursorX,this.cursorY,'spr_flip_rail',0,this.rails,direction));
        this.rails.add(new FlipID(this,this.cursorX,this.cursorY,'spr_flip_ID',0,this.rails));

        // Save cursor position
        let oldCursorY = this.cursorY;
        let oldCursorX = this.cursorX;

        let constant = (direction ? 1 : -1);

        // Add rails up to next track
        while(times > 1){
            this.rails.add(new Rail(this,this.cursorX,this.cursorY+(64*constant),'spr_rail_up',0,this.rails,0));
            times -= 1;
            this.cursorY += (64*constant);
        }

        // Add link at top of true path
        if(constant == -1){
            this.rails.add(new Rail(this,this.cursorX,this.cursorY+(64*constant),'spr_flip_rail',0,this.rails,0).setFlipX(true).setFlipY(true));
        }else{
            this.rails.add(new Rail(this,this.cursorX,this.cursorY+(64*constant),'spr_flip_rail',0,this.rails,0).setFlipX(true));
        }
        this.cursorY += (64*constant);

        /// Add fake path ----

        // Possibly go up one more
        if(Phaser.Math.Between(0, 9) > 4 && (oldCursorY + 128 < 480) && (oldCursorY - 128 > 0)){
            oldCursorY += (-64*constant);
            this.rails.add(new Rail(this,oldCursorX,oldCursorY,'spr_rail_up',0,this.rails,0));
        }

        oldCursorY += (-64*constant);
        
        if(constant == 1){
            this.rails.add(new Rail(this,oldCursorX,oldCursorY,'spr_flip_rail',0,this.rails,0).setFlipX(true).setFlipY(true));
        }else{
            this.rails.add(new Rail(this,oldCursorX,oldCursorY,'spr_flip_rail',0,this.rails,0).setFlipX(true));
        }
        

        let amountFake = Phaser.Math.Between(0, 3)
        while(amountFake > 0){
            oldCursorX += 64;
            this.rails.add(new Rail(this,oldCursorX,oldCursorY,'spr_rail',0,this.rails,0));
            amountFake -= 1;
        }

        // Restart creation
         this.distanceTillNextTrack = 64;

    }
}