// Picture Prefab
class Picture extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);

        this.heldDown = false;
        this.placed = false;

        this.setInteractive();
    }

    setHeldDown(bool){
        this.heldDown = bool;
    }

    update(){
        if(this.heldDown){
            this.x = game.input.mousePointer.x;
            this.y = game.input.mousePointer.y;
        }else{
            if(game.config.height > this.y+222/2){
                this.y += 15
            }
        }
    }

}