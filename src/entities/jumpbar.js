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
        
        this.holdStrengthBar.fillRect(
            (this.x - this.width / 2) + 1,
            this.y + 7,
            (this.scene.holdStrength / 100) * 190,
            7
        )
        
        let jumpTier = Math.min(Math.floor(this.scene.holdStrength / 33.3) + 1, 3);
        if (this.scene.holdStrength === 0) {
            jumpTier = 0;
        }
        this.setFrame(jumpTier);           
    }

}