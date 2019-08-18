import GameScene from './GameScene';
import Walker from '../entities/walker';

export default class GamePlay extends GameScene {
    constructor() {
        super({key: 'GamePlay', active: true});
    }

    init() {

    }

    preload() {
        Walker.preload(this);
    }

    create() {
        this.cameras.main.setBackgroundColor('#EDEDED');
        this.walker = new Walker({
            scene: this, 
            x: 100, y: 50
        });
    }

    update(time, delta) {
        this.walker.update(time, delta);
    }
}