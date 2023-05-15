class Hole extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, game.config.width + 100, (game.config.height / 2) + 10, 'hole');
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(this.parentScene.gameSpeed * -250);
        this.setImmovable();                 
        //this.tint = Math.random() * 0xFFFFFF;
    }

    update() {
        if (this.gameOver) {
            this.setVelocityX(0);
        } else {
            this.setVelocityX(this.parentScene.gameSpeed * -250);
        }

        if(this.x < 0 - 200) {
            this.destroy();
        }
    }
}