import game from '../index';
import GameScene from './GameScene';
import Dinoboy from '../entities/dinoboy';

export default class GamePlay extends GameScene {
    constructor() {
        super({key: 'GamePlay'});
    }

    init() {

    }

    preload() {
        this.load.image('bg', '../assets/background.png');
        Dinoboy.preload(this);
    }

    create() {
        this.cameras.main.setBackgroundColor('#EDEDED');
        
        //background tile
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg');
        this.bg.setOrigin(0, 0).setScrollFactor(0);

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

        //player sprite
        this.dinoboy = new Dinoboy({
            scene: this, 
            x: 50, y: 50
        });

        //collision
        this.physics.world.addCollider(this.platforms, this.dinoboy);
    }

    update(time, delta) {
        this.dinoboy.update(time, delta);
        //scroll background
        this.bg.tilePositionX += 0.5;
    }
}