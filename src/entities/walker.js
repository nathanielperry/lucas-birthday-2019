import Phaser from 'phaser';

export default class Walker extends Phaser.GameObjects.Sprite {
    constructor(config) {
        const { scene, x, y } = config;

        super(scene, x, y, 'walker');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        
        this.scene.anims.create({
            key: 'stand',
            frames: this.scene.anims.generateFrameNumbers('walker', { start: 0, end: 1 }),
            frameRate: 0.5,
            repeat: -1
        });
        
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('walker', { start: 2, end: 7 }),
            frameRate: 7,
            repeat: -1
        });
        
        this.anims.play('stand');
    }

    update(time, delta) {
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-50);
            this.anims.play('walk', true);
            this.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(50);
            this.anims.play('walk', true);
            this.flipX = false;
        } else {
            this.body.setVelocityX(0)
            this.anims.play('stand');
        }
    }
}