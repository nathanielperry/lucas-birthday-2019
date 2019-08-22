import game from '../index';
import GameScene from './GameScene';
import Dinoboy from '../entities/dinoboy';
import Jumpbar from '../entities/jumpbar';
import Obstacle from '../entities/Obstacle';

export default class GamePlay extends GameScene {
    constructor() {
        super({key: 'GamePlay'});
    }

    init() {

    }

    preload() {
        //background
        this.load.image('bg1', '../assets/jungle1.png');
        this.load.image('bg2', '../assets/jungle2.png');
        this.load.image('bg3', '../assets/jungle3.png');
        
        //dinoboy
        Dinoboy.preload(this);
        Jumpbar.preload(this);
        Obstacle.preload(this);
    }

    create() {        
        //Controls
        this.spacebar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        //Scene variables
        this.floorHeight = 48;
        this.runSpeed = 1.5;
        this.holdStrength = 0;
        this.jumpIsCharging = false;
        this.level = 1;
        this.obstacleCollider = null;
        this.obstacle = null;

        //background tile
        this.bg3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg3')
            .setOrigin(0, 0);
        this.bg2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2')
            .setOrigin(0, 0);
        this.bg1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1')
            .setOrigin(0, 0);

        //floor
        this.platforms = this.physics.add.staticGroup();
        this.floor = this.platforms.add(
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
        this.physics.world.addCollider(this.platforms, this.dinoboy);

    }

    update(time, delta) {
        //Hold space to add to jump bar
        //Removed from jump bar if charging
        if (this.spacebar.isDown && !this.jumpIsCharging) {
            this.holdStrength = Math.min(this.holdStrength + 1, 100);
        } else if (this.jumpIsCharging) {
            this.holdStrength = Math.max(this.holdStrength - 3, 0);
        }

        //Set variable which indicates if jump is recharging or not
        if (this.holdStrength > 0 
            && this.spacebar.isUp 
            && this.dinoboy.isOnGround()) {
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

        //Add obstacles and colliders
        if (this.obstacles.getLength() === 0) {
            this.obstacle = new Obstacle({
                scene: this,
                level: this.level
            });
            this.obstacleCollider = this.physics.world.addCollider(this.platforms, this.obstacle);
            this.obstacles.add(this.obstacle);
        }

        this.physics.world.overlap(this.dinoboy, this.obstacle, () => {
            this.physics.world.removeCollider(this.obstacleCollider);
            this.obstacle.body.setVelocityX(-100);
            this.obstacle.body.setVelocityY(-100);
        });
    }
}