import game from '../index';
import Phaser from 'phaser';

export default class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(config) {
        const { scene, level } = config;
        super(
            scene,
            game.config.width,
            game.config.height - scene.floorHeight
        );

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.difficulty = Math.min(Math.floor(Math.random() * Math.floor(level + 1)), 2);        
        this.setTexture('obs' + this.difficulty);
        
        this.body.setSize(this.width - 20, this.height / 1.3);
        this.body.setOffset(10, this.height - this.height / 1.3)
        this.y -= this.height / 2;
        this.x += this.width / 2;

        //instances variables
        this.bumped = false;
    }

    static preload(scene) {
        scene.load.image('obs0', 'assets/obs1.png');
        scene.load.image('obs1', 'assets/obs2.png');
        scene.load.image('obs2', 'assets/obs3.png');

        scene.load.audio('hit', 'assets/hit3.wav');
    }

    update(time, delta) {
        this.x -= this.scene.runSpeed;
        if (this.x <= -this.width) {
            if (!this.bumped) {
                this.scene.score += 100 * (this.difficulty + 1);
            } else {
                this.scene.lives -= 1;
            }
            this.destroy();
        }

        if (this.bumped) {
            this.angle -= 10;
        }
    }

    bump() {
        if (!this.bumped) {
            this.scene.sound.play('hit');
            this.body.setVelocityX(-Math.max(20, Math.random() * 100));
            this.body.setVelocityY(-150);
            this.bumped = true; 
        }
    }

}