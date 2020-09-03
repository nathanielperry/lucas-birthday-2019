import game from '../index'
import GameScene from './GameScene';

export default class GameOver extends GameScene {
    constructor() {
        super({key: 'GameOver'});
    }

    init(data) {
        this.score = data.score;
    }

    create() {
        this.cameras.main.setBackgroundColor('#16161D');
        this.textConfig = {
            fontFamily: 'sans-serif',
            fontSize: '16px',
            stroke: '#000',
            strokeThickness: 3
        }
        
        this.spacebar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.add.text(
            game.config.width / 2,
            game.config.height / 4,
            'Score: ' + this.score,
            this.textConfig
        ).setOrigin(0.5);

        this.add.text(
            game.config.width / 2,
            game.config.height / 2,
            'Good Try!',
            this.textConfig
        ).setOrigin(0.5);

        this.add.text(
            game.config.width / 2,
            game.config.height - game.config.height / 4,
            'Press Space to Try Again',
            this.textConfig
        ).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start('TitleScreen');
        };
    }
}