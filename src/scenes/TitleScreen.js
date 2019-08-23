import GameScene from './GameScene';

export default class TitleScreen extends GameScene {
    constructor() {
        super({key: 'TitleScreen'});
    }

    init() {
        
    }

    preload() {
        //audio
        this.load.audio('theme2', '../assets/Theme2.wav');

        //title splash
        this.load.image('title', '../assets/dinoboy-title.png');
    }

    create() {
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cKey = this.input.keyboard.addKey('C');

        this.music = this.sound.add('theme2');
        this.music.play({
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        this.add.image(0, 0, 'title').setOrigin(0, 0);  
        
        this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + (this.cameras.main.height / 4) + 30, 
            'Press Space to Start',
            {
                color: 'white',
                fontFamily: 'sans-serif',
                fontSize: '20px',
                stroke: '#000',
                strokeThickness: 4
            }
        ).setOrigin(0.5);
        this.add.text(
            5, 
            0,
            'Hold Space to charge. Release to jump!',
            {
                color: 'white',
                fontFamily: 'sans-serif',
                fontSize: '12px',
                stroke: '#000',
                strokeThickness: 3
            }
        ).setOrigin(0, 0);
    }

    update(time, delta) {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.music.stop();
            this.scene.start('GamePlay');
        }

        if (this.cKey.isDown) {
            this.music.stop();  
            this.scene.start('Credits');
        }
    }
}