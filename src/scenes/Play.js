class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    preload() {
        this.load.atlas('player', 'assets/spriteAtlas.png', 'assets/spriteAtlas.json');
        this.load.image('hole','assets/hole.png');
        this.load.image('gradient','assets/gradient.png');
        this.load.audio('footsteps', ['assets/footsteps.ogg']);
        this.load.audio('button', ['assets/death.ogg']);
        this.load.audio('death', ['assets/death.ogg']);
    }

    create() {
        this.bgm = this.sound.add('footsteps', { 
            mute: false,
            volume: 0.125,
            rate: 1,
            loop: true 
        });
        this.bgm.play();
        this.deathSound = this.sound.add('death', { 
            mute: false,
            volume: 0.25,
            rate: 1,
            loop: false 
        });
        this.buttonSoundEffect = this.sound.add('button', { 
            mute: false,
            volume: 0.25,
            rate: 1,
            loop: false 
        });

        this.gradient = this.add.tileSprite(750, 240, 1500, 480, 'gradient');

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.runAnim = this.anims.create({
            key: "run",
            frameRate: 5,
            frames: this.anims.generateFrameNames('player', {
                prefix: "run",
                start: 1,
                end: 12
            }),
            repeat: -1
        });
        this.jumpAnim = this.anims.create({
            key: "jump",
            frameRate: 5,
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
        this.spawning = false;
        this.playerJumpDt = 0;
        this.holeColliding = false;
        this.levellingUp = false;
        this.gameOver = false;
        this.distance = 0;

        this.scoreTextConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#ffffff',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.scoreText = this.add.text(game.config.width - 100, 50, Math.floor(this.distance), this.scoreTextConfig);
        this.player.play("run");
        this.time.delayedCall(30, () => {
            this.player.play("run");
        });
    }

    update() {
        console.log(this.gameOver);
        this.bgm.rate = this.gameSpeed;
        this.runAnim.frameRate = this.gameSpeed * 5;

        if (!this.gameOver) {
            this.gradient.tilePositionX += (this.gameSpeed * 4.2);
            this.distance += 0.1 * this.gameSpeed;
        }

        this.scoreText.text = Math.floor(this.distance);
    

        if (!this.spawning && !this.gameOver) {
            this.spawning = true;
            this.time.delayedCall(Math.abs((Math.floor(Math.random() * 3) * 1000) + 1000 - (100 * this.gameSpeed)), () => {
                let newHole = new Hole(this);
                this.holeGroup.add(newHole);
                this.spawning = false;
            });
        }

        if(Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            if (this.gameOver) {
                this.buttonSoundEffect.play();
                this.time.delayedCall(400, () => {
                    this.scene.restart();
                });
            } else {
                this.player.play("jump");
                this.playerJumping = true;
                this.playingJumpEffect = true;
                this.bgm.stop();
            }
        }
        if (this.playerJumping) {
            this.playerJumpDt++;
            this.player.setPosition(150, -(-0.1 * (Math.pow(this.playerJumpDt - 22, 2)) + 50) + this.game.config.height / 2);
            if (this.playerJumpDt >= 44) {
                this.playerJumping = false;
                this.playerJumpDt = 0;
                this.player.play("run");
                if (!this.bgm.isPlaying) {
                    this.bgm.play();
                }
            }
        } else {
            this.player.setPosition(150, this.game.config.height / 2);
        }

        this.physics.world.collide(this.player, this.holeGroup, this.holeCollision, null, this);

        if (!this.levellingUp) {
            this.levellingUp = true;
            this.time.delayedCall(1000, () => {
                if (!this.gameOver) {
                    this.gameSpeed += 0.1;
                    this.levellingUp = false;
                }
            });
        }
    }

    holeCollision() {
        if (!this.holeColliding) {
            this.gameOver = true;
            this.holeColliding = true;
            console.log("hole collision");
            this.deathSound.play();
            this.player.destroy();
            this.bgm.stop();
            this.gameSpeed = 0;
            this.time.delayedCall(300, () => {
                this.holeColliding = false;
            });

            this.add.text(game.config.width / 2 - 280, game.config.height / 2 - 163, "Congratulations. You travelled:", this.scoreTextConfig);
            this.add.text(game.config.width / 2 - 70, game.config.height / 2 - 133, Math.floor(this.distance), this.scoreTextConfig);
            this.add.text(game.config.width / 2 - 100, game.config.height / 2 - 100, "meters", this.scoreTextConfig);
            this.add.text(game.config.width / 2 - 250, game.config.height / 2 - 70, "Press Space to try again.", this.scoreTextConfig);

            this.add.text(game.config.width / 2 - 500, game.config.height / 2 + 70, "All sound effects sourced from GameBurp's free sample pack at:", this.scoreTextConfig);
            this.add.text(game.config.width / 2 - 325, game.config.height / 2 + 100, "http://www.gameburp.com/free-game-sound-fx/", this.scoreTextConfig);
            this.add.text(game.config.width / 2 - 400, game.config.height / 2 + 130, "All other assets created for this project", this.scoreTextConfig);
        }
    }
    
}
