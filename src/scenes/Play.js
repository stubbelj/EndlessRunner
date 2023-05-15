class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    preload() {
        this.load.atlas('player', 'assets/spriteAtlas.png', 'assets/spriteAtlas.json');
        this.load.image('hole','assets/hole.png');
        this.load.image('gradient','assets/gradient.png');
    }

    create() {
        this.gradient = this.add.tileSprite(750, 240, 1500, 480, 'gradient');

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.anims.create({
            key: "run",
            frameRate: 20,
            frames: this.anims.generateFrameNames('player', {
                prefix: "run",
                start: 1,
                end: 12
            }),
            repeat: -1
        });
        this.anims.create({
            key: "jump",
            frameRate: 20,
            frames: this.anims.generateFrameNames('player', {
                prefix: "jump",
                start: 1,
                end: 6
            }),
            repeat: -1
        });

        this.holeGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        //let player = this.add.sprite(50, 250, "player");
        this.player = this.physics.add.sprite(150, this.game.config.height / 2, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setImmovable();
        this.player.setDepth(1);
        this.player.setBlendMode('SCREEN');
        this.player.play("run");

        this.gameSpeed = 1;
        this.gamePaused = true;
        this.spawning = false;
        this.playerJumpDt = 0;

        this.time.delayedCall(1, () => { 
            this.gamePaused = false; 
        });
    }

    update() {
        this.gradient.tilePositionX += (this.gameSpeed * 5);

        if (!this.spawning && !this.gamePaused) {
            this.spawning = true;
            this.time.delayedCall((Math.floor(Math.random() * 3) * 1000) + 1000, () => {
                let newHole = new Hole(this);
                this.holeGroup.add(newHole);
                this.spawning = false;
            });
        }

        if(Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.player.play("jump");
            this.playerJumping = true;
        }
        if (this.playerJumping) {
            this.playerJumpDt++;
            this.player.setPosition(150, -(-0.1 * (Math.pow(this.playerJumpDt - 22, 2)) + 50) + this.game.config.height / 2);
            if (this.playerJumpDt >= 44) {
                this.playerJumping = false;
                this.playerJumpDt = 0;
                this.player.play("run");
            }
        } else {
            this.player.setPosition(150, this.game.config.height / 2);
        }

        this.physics.world.collide(this.player, this.holeGroup, this.holeCollision, null, this);
    }

    holeCollision() {
        console.log("hole collision");
    }
    
}
