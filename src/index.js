import './styles.sass';
import Phaser from 'phaser';
import Walker from './entities/walker';

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    parent: 'game',
    width: 320,
    height: 120,
    scale: {
        mode: Phaser.Scale.FIT,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

let walker = null;
const game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet(
        'walker', 
        'assets/walk.png',
        { frameWidth: 16, frameHeight: 32 }
    );
}

function create() {
    this.cameras.main.setBackgroundColor('#EDEDED');
    walker = new Walker({
        scene: this, 
        x: 100, y: 50
    });
}

function update(time, delta) {
    walker.update();
}