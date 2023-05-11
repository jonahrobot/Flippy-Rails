// Rail Prefab
class RailFlip extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, group, direction){
        super(scene, x, y, texture, frame, group);

        // Direction 0 = goes up, 1 = goes down
        this.direction = direction;

        if(direction == 1){
            this.setFlipY(true);
        }

        // add object to existing scene
        scene.add.existing(this);
        this.group = group;
    }

    update(){
        if(this.x < 0 - 64){
            this.group.killAndHide(this);
            this.destroy();
        }
    }

}