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
        this.difficulty = Math.floor(Math.random() * Math.floor(level + 1));        
        this.setTexture('obs' + this.difficulty);
        console.log('obs' + this.difficulty);
        
        this.y -= this.height / 2;
        this.x += this.width / 2;
    }

    static preload(scene) {
        scene.load.image('obs0', 'assets/obs1.png');
        scene.load.image('obs1', 'assets/obs2.png');
        scene.load.image('obs2', 'assets/obs3.png');
    }

    update() {
        this.x -= this.scene.runSpeed;
        if (this.x <= -this.width) {
            this.destroy();
        }  
    }

}