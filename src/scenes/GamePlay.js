import game from '../index';
import GameScene from './GameScene';
import Dinoboy from '../entities/dinoboy';
import Jumpbar from '../entities/jumpbar';

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
    }

    create() {        
        //Controls
        this.spacebar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        //Scene variables
        this.holdStrength = 0;

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
                game.config.height - 48,
                game.config.width,
                (48 - game.config.height) * -1
            ).setOrigin(0, 0)
        );
        this.physics.world.enable(this.platforms);

        //Sprites
        this.dinoboy = new Dinoboy({
            scene: this, 
            x: 50, y: 50
        });
        this.jumpbar = new Jumpbar({
            scene: this
        });

        //floor collision
        this.physics.world.addCollider(this.platforms, this.dinoboy);

    }

    update(time, delta) {
        if (this.spacebar.isDown) {
            this.holdStrength = Math.min(this.holdStrength + 1, 100);
        } else {
            this.holdStrength = Math.max(this.holdStrength - 3, 0);
        }

        this.dinoboy.update(time, delta);
        this.jumpbar.update(time, delta);
        //scroll background
        this.bg1.tilePositionX += 0.8;
        this.bg2.tilePositionX += 0.4;
        this.bg3.tilePositionX += 0.2;
    }
}