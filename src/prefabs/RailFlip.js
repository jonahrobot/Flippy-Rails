// Rail Prefab
class RailFlip extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, group, direction){
        super(scene, x, y, texture, frame, group);

        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setImmovable();     

        // Direction 0 = goes up, 1 = goes down
        this.direction = direction;

        if(this.parentScene.currentFlipState == 1){
            this.setFlipY(true);
        }

        // add object to existing scene
        this.group = group;
    }

    update(){
        if(this.x < 0 - 64){
            this.group.killAndHide(this);
            this.destroy();
        }

        if(this.parentScene.currentFlipState == 1){
            this.setFlipY(true);
        }else{
            this.setFlipY(false);
        }
    }

}