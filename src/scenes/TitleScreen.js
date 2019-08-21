import GameScene from './GameScene';

export default class TitleScreen extends GameScene {
    constructor() {
        super({key: 'TitleScreen'});
    }

    init() {

    }

    preload() {
        
    }

    create() {
        this.cameras.main.setBackgroundColor('#EDEDED');
        let title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - (this.cameras.main.height / 4), 
            'Game Title',
            {
                color: 'black',
                fontFamily: 'VT323, sans-serif',
                fontSize: '30px'
            }
        );
        title.setOrigin(0.5);
    }

    update(time, delta) {
        
    }
}