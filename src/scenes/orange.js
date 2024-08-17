export default class Orange {
    constructor(scene) {
        this.orange = scene.physics.add.group()
    }

    static loadAsset(scene) {
        scene.load.image('orange', 'assets/orange.png')
    }

    createOrange(jailson) {
        let orange = this.orange.create(jailson.sprite.x, jailson.sprite.y, 'orange')
        orange.setBounce(1)
        orange.setCollideWorldBounds(true)
        orange.setVelocityY(-50)
        orange.setVelocityX(Phaser.Math.Between(-50, 50), 5)
    }


}