// Rail Prefab
class FlipID extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, group, type){
        super(scene, x, y, texture, frame, group);

        this.parentScene = scene;               // maintain scene context

        // add object to existing scene
        scene.add.existing(this);
        this.group = group;
        this.type = type;
        
        if(this.parentScene.currentFlipState == 1 && this.type == 1){
            this.setFlipY(true);
        }
    }

    update(){
        if(this.x < 0 - 64){
            this.group.killAndHide(this);
            this.destroy();
        }

        if(this.parentScene.currentFlipState == 1){
            if(this.type == 0){
                this.setFlipX(true);
            }else{
                this.setFlipY(true);   
            }
        }else{
            if(this.type == 0){
                this.setFlipX(false);
            }else{
                this.setFlipY(false);   
            }
        }
    }

}