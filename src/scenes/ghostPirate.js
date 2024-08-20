export default class GhostPirate {
    #sprite

    constructor(scene, x, y) {
        this.scene = scene
        this.#sprite = scene.physics.add.sprite(x, y, 'ghostPirate')
        //this.#sprite.setCollideWorldBounds(true)
        this.#sprite.setScale(2)
        this.#sprite.body.allowGravity = false

        this.#sprite.setSize(14, 16)
        this.#sprite.setOffset(- 1, - 3)

        this.createAnimations()
    }

    get sprite() {
        return this.#sprite
    }

    set sprite(value) {
        this.#sprite = value
    }

    static loadSprite(scene) {
        scene.load.spritesheet('ghostPirate', 'assets/ghostPirate.png',
            { frameWidth: 22.875, frameHeight: 16 })
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'ghostPirate-sleeping',
            frames: this.scene.anims.generateFrameNumbers('ghostPirate', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'ghostPirate-rage',
            frames: this.scene.anims.generateFrameNumbers('ghostPirate', { start: 2, end: 7 }),
            frameRate: 5,
            repeat: -1
        })
    }

    move(player) {
        const distance = Phaser.Math.Distance.Between(
            player.sprite.x, player.sprite.y,
            this.#sprite.x, this.#sprite.y
        )

        if (distance <= 150) {
            this.#sprite.anims.play('ghostPirate-rage', true)

            const directionX = player.sprite.x - this.#sprite.x
            const directionY = player.sprite.y - this.#sprite.y

            const magnitude = Math.sqrt(directionX * directionX + directionY * directionY)
            const velocityX = (directionX / magnitude) * 100
            const velocityY = (directionY / magnitude) * 100

            this.#sprite.setVelocity(velocityX, velocityY)
        } else {
            this.#sprite.setVelocityX(0)
            this.#sprite.setVelocityY(0)

            this.#sprite.anims.play('ghostPirate-sleeping', true)
        }
    }


}