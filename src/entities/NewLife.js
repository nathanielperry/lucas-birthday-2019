import game from '../index';
import Phaser from 'phaser';

export default class NewLife extends Phaser.GameObjects.Sprite {
    constructor(config) {
        const { scene } = config;
        super(
            scene,
            game.config.width,
            64,
            '1up'
        );

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
    }

    static preload(scene) {
        scene.load.image('1up', 'assets/1up.png');
    }

    update(time, delta) {
        if (this.x <= 0 - this.width) {
            this.destroy();
        } else {
            this.x -= this.scene.runSpeed -0.5;
        }
    }

}