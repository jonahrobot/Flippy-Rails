class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create(){
        let w = game.config.width;
        let h = game.config.height;

        // Create Background
        this.add.image(0,0,'spr_background_1').setOrigin(0).setDepth(-1);
        this.add.image(299/2,h,'box').setOrigin(0.5,0.9).setDepth(1);

        // Create Photos
        this.picture_1 = new Picture(this,299/2,h-40,'photo_1');
        this.picture_2 = new Picture(this,100,h/4,'photo_2');

        // Set up Input
        this.input.on('gameobjectdown', (pointer, gameObject) =>
        {
            gameObject.setHeldDown(true);
        });

        this.input.on('gameobjectup', (pointer, gameObject) =>
        {
            gameObject.setHeldDown(false);
        });

        // Create Target
        this.target_1 = new Target(this,w*0.75,h/2,'photo_spot').setDepth(-1);
    }

    update(){
        
        // Update all Pictures
        this.picture_1.update();
        this.picture_2.update();
    }
}