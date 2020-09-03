import game from '../index';
import GameScene from './GameScene';
import Dinoboy from '../entities/dinoboy';
import Jumpbar from '../entities/jumpbar';
import Obstacle from '../entities/Obstacle';
import NewLife from '../entities/NewLife';

export default class GamePlay extends GameScene {
    constructor() {
        super({key: 'GamePlay'});
    }

    init() {

    }

    preload() {
        //audio
        this.load.audio('theme2alt', './assets/Theme2Alt.wav');
        this.load.audio('hit', './assets/hit3.wav');
        this.load.audio('gameover', './assets/gameover.wav');
        this.load.audio('collect', './assets/collect2.wav');

        //background
        this.load.image('bg1', './assets/jungle1.png');
        this.load.image('bg2', './assets/jungle2.png');
        this.load.image('bg3', './assets/jungle3.png');
        
        this.load.image('1up-count', './assets/1up-count.png');

        //preload Sprites
        Dinoboy.preload(this);
        Jumpbar.preload(this);
        Obstacle.preload(this);
        NewLife.preload(this);
    }

    create() {        
        //Start the jams
        this.music = this.sound.add('theme2alt');
        this.music.play({
            mute: false,
            volume: 0.5,
            rate: 1.2,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        //Controls
        this.spacebar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        //Scene variables
        this.floorHeight = 48;
        this.runSpeed = 1.5;
        this.holdStrength = 0;
        this.jumpIsCharging = false;
        this.level = 0;
        this.score = 0;
        this.lives = 2;
        this.gameover = false;

        this.obstacleCollider = null;
        this.obstacle = null;

        //background tile
        this.bg3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg3')
            .setOrigin(0, 0);
        this.bg2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2')
            .setOrigin(0, 0);
        this.bg1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1')
            .setOrigin(0, 0);

        //display score
        this.scoreText = this.add.text(
            0, 0,
            'Score: ' + this.score,
        );
        
        //display level
        // this.levelText = this.add.text(
        //     0, 15,
        //     'Level: ' + (this.level + 1)
        // );
        
        //display lives remaining
        this.oneUpCounter = this.add.image(0, 0, '1up-count');
        this.oneUpCounter.setOrigin(0, 0);
        this.oneUpCounter.x = game.config.width - this.oneUpCounter.width - 2;
        this.oneUpCounter.y = 2;
        
        this.livesText = this.add.text(
            game.config.width - this.oneUpCounter.width - 15, 2,
            this.lives,
            {
                fontSize: '15px'
            }
        );
        
        //floor
        this.platforms = this.physics.add.staticGroup();
        this.platforms.add(
            this.add.zone(
                0,
                game.config.height - this.floorHeight,
                game.config.width,
                (this.floorHeight - game.config.height) * -1
            ).setOrigin(0, 0)
        );
        this.physics.world.enable(this.platforms);

        //Sprites
        this.dinoboy = new Dinoboy({
            scene: this, 
            x: 50, y: 176
        });
        this.jumpbar = new Jumpbar({
            scene: this
        });

        //Obstacles
        this.obstacles = this.physics.add.group({
            runChildUpdate: true
        });

        //floor collision
        this.floorCollider = this.physics.world.addCollider(this.platforms, this.dinoboy);

        //Spawn 1-Ups
        // this.oneUps = this.physics.add.staticGroup({
        //     runChildUpdate: true
        // });
        // setInterval(() => {
        //     this.oneUps.add(
        //         new NewLife({
        //             scene: this
        //         })
        //     );
        // }, 1000 * 2);

    }

    update(time, delta) {
        //Hold space to add to jump bar
        //Removed from jump bar if charging
        if (this.spacebar.isDown && !this.jumpIsCharging && !this.gameover) {
            this.holdStrength = Math.min(this.holdStrength + 1, 100);
        } else if (this.jumpIsCharging) {
            this.holdStrength = Math.max(this.holdStrength - 3, 0);
        }

        //Set variable which indicates if jump is recharging or not
        if (this.holdStrength > 0 
            && this.spacebar.isUp 
            && this.dinoboy.isOnGround()
            && !this.gameover) {
            this.jumpIsCharging = true;
        } else if (this.holdStrength === 0) {
            this.jumpIsCharging = false;
        }

        this.dinoboy.update(time, delta);
        this.jumpbar.update(time, delta);

        //scroll background
        this.bg1.tilePositionX += this.runSpeed;
        this.bg2.tilePositionX += this.runSpeed * 0.6;
        this.bg3.tilePositionX += this.runSpeed * 0.4;

        //Add obstacles and obstacle colliders
        if (this.obstacles.getLength() === 0) {
            this.obstacle = new Obstacle({
                scene: this,
                level: this.level
            });
            this.physics.world.addCollider(this.platforms, this.obstacle);
            this.obstacles.add(this.obstacle);
        }

        //Obstacle Collision Event
        this.physics.world.overlap(this.dinoboy, this.obstacle, () => {
            this.obstacle.bump();
        });

        //1up Collision Event
        // this.physics.world.overlap(this.oneUps, this.dinoboy, () => {
        //     //1up event here
        //     console.log('1up');
        //     this.newLife.destroy();
        //     this.lives += 1;
        //     this.sound.play('collect');
        // });

        //Score/Level updates
        if (this.score >= 300 && this.level === 0) {
            this.level = 1;
        }
        if (this.score >= 1000 && this.level === 1) {
            this.level = 2;
            this.music.setRate(1.4);
            this.runSpeed += 0.1;
        }
        if (this.score >= 1800 && this.level === 2) {
            this.level = 3;
            this.music.setRate(1.5);
            this.runSpeed += 0.3;
        }
        if (this.score >= 2300 && this.level === 3) {
            this.level = 4;
            this.music.setRate(1.7);
            this.runSpeed += 0.4;
        }

        this.scoreText.setText('Score: ' + this.score);
        // this.levelText.setText('Level: ' + (this.level + 1));
        this.livesText.setText(Math.max(0, this.lives));

        if (this.lives < 0 && !this.gameover) {
            //Game Over
            this.runSpeed = 0;
            this.dinoboy.gameOver();
            this.floorCollider.active = false;
            this.music.stop();
            this.sound.play('gameover');
            this.gameover = true;
            setTimeout(() => {
                this.scene.start('GameOver', {
                    score: this.score
                });
            }, 4000);
        }
    }
}