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
            'Three-rannosaurus \nRex',
            {
                color: 'black',
                fontFamily: 'sans-serif',
                fontSize: '25px',
            }
        );
        title.setOrigin(0.5);
    }

    update(time, delta) {
        
    }
}