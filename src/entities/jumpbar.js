import game from '../index';
import Phaser from 'phaser';

export default class Jumpbar extends Phaser.GameObjects.Sprite {
    constructor(config) {
        const { scene } = config;
        super(
            scene, 
            game.config.width / 2, 
            game.config.height - 32,
            'jumpbar',
            0
        );
        this.scene.add.existing(this);
        this.spacebar = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.holdStrength = 0;
        this.holdStrengthBar = this.scene.add.graphics();
    }
    
    static preload(scene) {
        scene.load.spritesheet(
            'jumpbar', 
            'assets/jumpbar.png',
            {frameWidth: 192, frameHeight: 30}
            );
        }
        
        update(time, delta) {
        this.holdStrengthBar.clear();
        this.holdStrengthBar.fillStyle(0xD95763);
        if (this.spacebar.isDown) {
            this.holdStrength = Math.min(this.holdStrength + 1, 100);
        } else {
            this.holdStrength = Math.max(this.holdStrength - 2, 0);
        }
        
        this.holdStrengthBar.fillRect(
            (this.x - this.width / 2) + 1,
            this.y + 7,
            (this.holdStrength / 100) * 190,
            7
        )
        
        let jumpTier = Math.floor(this.holdStrength / 33.3) + 1;
        if (this.holdStrength === 0) {
            jumpTier = 0;
        }
        this.setFrame(jumpTier);           
    }

}