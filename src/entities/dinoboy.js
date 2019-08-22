import Phaser from 'phaser';

export default class Dinoboy extends Phaser.GameObjects.Sprite {
    constructor(config) {
        const { scene, x, y } = config;

        super(scene, x, y, 'dinoboy');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('dinoboy', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });
        
        this.anims.play('walk');
    }

    static preload(scene) {
        scene.load.spritesheet(
            'dinoboy',
            'assets/dinoboy-walk.png',
            { frameWidth: 32, frameHeight: 32 }
        )
    }

    update(time, delta) {
        if (Phaser.Input.Keyboard.JustUp(this.spacebar)) {
            this.body.setVelocityY(-200);
        }
    }
}