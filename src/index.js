import './styles.sass';
import Phaser from 'phaser';

import GamePlay from './scenes/GamePlay';
import TitleScreen from './scenes/TitleScreen';
import GameOver from './scenes/GameOver';
import Credits from './scenes/Credits';

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    parent: 'game',
    width: 256,
    height: 240,
    scale: {
        mode: Phaser.Scale.FIT,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    }
};

const game = new Phaser.Game(config);
game.scene.add('TitleScreen', TitleScreen, true);
game.scene.add('GamePlay', GamePlay);
game.scene.add('GameOver', GameOver);
game.scene.add('Credits', Credits);
// game.events.once(Phaser.Scenes.Events.CREATE, scene => {
//     scene.cursors = scene.input.keyboard.createCursorKeys();
// });

export default game;