export default class Bombs {
    #bombs

    constructor(scene) {
        this.#bombs = scene.physics.add.group()
    }
    
    get bombs() {
        return this.#bombs;
    }

    set bombs(value) {
        this.#bombs = value;
    }

    static loadAsset(scene) {
        scene.load.image('bomb', 'assets/bomb.png')
    }

    generateRandomBomb(player) {
        let x = (player.sprite.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
        let bomb = this.bombs.create(x, 16, 'bomb')
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(true)
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
    }
}