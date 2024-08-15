import Game from './scenes/game.js'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Game,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);