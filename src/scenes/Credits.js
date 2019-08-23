import game from '../index'
import GameScene from './GameScene';

export default class Credits extends GameScene {
    constructor() {
        super({key: 'Credits'});
    }

    init(data) {
        this.score = data.score;
    }

    create() {
        this.cameras.main.setBackgroundColor('#16161D');
        this.textConfig = {
            fontFamily: 'sans-serif',
            fontSize: '12px',
            stroke: '#000',
            strokeThickness: 3
        }
        
        this.spacebar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.add.text(
            2,
            0,
`A Game for Lucas for his 3rd birthday.

Game, Art, and Programming
Nathaniel Perry

Title and Main Themes
Magic_Spark

Game Over Jingle
'Not So Super After All, It Seems', 
by Solomon Allen

Game Sound FX by OwlishMedia
Press [Space] to go back.`,
            this.textConfig
        ).setOrigin(0, 0);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start('TitleScreen');
        };
    }
}