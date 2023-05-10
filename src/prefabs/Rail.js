// Rail Prefab
class Rail extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, group, isFlip){
        super(scene, x, y, texture, frame, group, isFlip);

        // add object to existing scene
        scene.add.existing(this);
        this.group = group;
    }

    update(){
        if(this.x > 640 + 64){
            this.group.killAndHide(this);
            this.destroy();
        }
    }

}