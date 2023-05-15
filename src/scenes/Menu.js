class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload() {
        this.load.image('gradient','assets/gradient.png');
        this.load.audio('footsteps', ['assets/footsteps.ogg']);
        this.load.audio('button', ['assets/death.ogg']);
    }

    create() {
        this.textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#ffffff',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
        }

        this.gradient = this.add.tileSprite(750, 240, 1500, 480, 'gradient');
        this.add.text(game.config.width / 2 - 250, game.config.height / 2 - 163, "Minimalist Runner", this.textConfig);
        this.add.text(game.config.width / 2 - 280, game.config.height / 2 - 63, "Press Space to Jump.", this.textConfig);
        this.add.text(game.config.width / 2 - 420, game.config.height / 2 - 3, "Press Space when you are ready to begin.", this.textConfig);

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.scene.start("playScene")
        }
    }

}