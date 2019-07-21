import './styles.sass';
import Phaser from 'phaser';

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
let cursors = null;
const game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet(
        'walker', 
        'assets/walk.png',
        { frameWidth: 16, frameHeight: 32 }
    );

}

function create() {
    
    this.anims.create({
        key: 'stand',
        frames: this.anims.generateFrameNumbers('walker', { start: 0, end: 1 }),
        frameRate: 0.5,
        repeat: -1
    });

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('walker', { start: 2, end: 7 }),
        frameRate: 7,
        repeat: -1
    });

    this.cameras.main.setBackgroundColor('#EDEDED');
    walker = this.physics.add.sprite(100, 50, 'walker');
    walker.body.collideWorldBounds = true;
    walker.anims.play('stand');

    cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
    
    if (cursors.left.isDown) {
        walker.body.setVelocityX(-50);
        walker.anims.play('walk', true);
        walker.flipX = true;
    } else if (cursors.right.isDown) {
        walker.body.setVelocityX(50);
        walker.anims.play('walk', true);
        walker.flipX = false;
    } else {
        walker.setVelocityX(0)
        walker.anims.play('stand');
    }

}