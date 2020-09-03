import Phaser from 'phaser';

export default class Dinoboy extends Phaser.GameObjects.Sprite {
    constructor(config) {
        const { scene, x, y } = config;

        super(scene, x, y, 'dinoboy');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.body.setSize(this.width - 10, this.height);
        this.body.setOffset(8, 0); 

        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('dinoboy', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'gameover',
            frames: this.scene.anims.generateFrameNumbers('dinoboy', { start: 4, end: 4 })
        })
        
        this.anims.play('walk');
        this.jumpHeights = [
            -200,
            -230,
            -270
        ]

    }

    static preload(scene) {
        scene.load.spritesheet(
            'dinoboy',
            'assets/dinoboy-walk.png',
            { frameWidth: 32, frameHeight: 32 }
        )

        scene.load.audio('hop', 'assets/hop.wav');
    }

    update(time, delta) {
        if (this.scene.holdStrength > 0
        && this.isOnGround()
        && this.scene.jumpIsCharging) {
            this.scene.sound.play('hop');
            this.body.setVelocityY(
                this.jumpHeights[Math.min(Math.floor(this.scene.holdStrength / 33.3), 2)]
            );
        }
    }

    isOnGround() {
        return this.y >= 176;
    }

    gameOver() {
        this.body.setVelocityY(-250);
        this.anims.play('gameover');
    }
}