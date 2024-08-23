export default class CaptainGuina {
    #sprite
    #currentSpeed

    constructor(scene, x, y) {
        this.scene = scene
        this.#sprite = scene.physics.add.sprite(x, y, 'captainGuina')
        this.#sprite.setBounce(0.2)
        this.#sprite.setCollideWorldBounds(true)
        this.#sprite.setScale(0.6)
        this.#sprite.setGravityY(300) // Enable gravity
        this.#currentSpeed = 0

        this.createAnimations()
    }

    get sprite() {
        return this.#sprite
    }

    set sprite(value) {
        this.#sprite = value
    }

    static loadSprite(scene) {
        scene.load.spritesheet('captainGuina', 'assets/captainGuina.png', { frameWidth: 76.125, frameHeight: 88 })
        scene.load.spritesheet('captainGuinaIdle', 'assets/captainGuina-idle.png', { frameWidth: 72, frameHeight: 84 })
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'walking',
            frames: this.scene.anims.generateFrameNumbers('captainGuina', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('captainGuinaIdle', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: -1
        })
    }

    move(player) {
        const distance = Phaser.Math.Distance.Between(
            player.sprite.x, player.sprite.y,
            this.#sprite.x, this.#sprite.y
        )
        this.#sprite.flipX = player.sprite.x < this.sprite.x;

        const triggerDistance = 150
        const maxSpeed = 140
        const acceleration = 5
        const deceleration = 2

        if (distance < triggerDistance) {
            this.#sprite.anims.play('walking', true)

            const directionX = player.sprite.x - this.#sprite.x
            const directionY = player.sprite.y - this.#sprite.y
            const magnitude = Math.sqrt(directionX * directionX + directionY * directionY)

            this.#currentSpeed = Math.min(this.#currentSpeed + acceleration, maxSpeed)
            this.#sprite.setVelocity((directionX / magnitude) * this.#currentSpeed, this.#sprite.body.velocity.y)

            if (directionY < 0 && this.#sprite.body.touching.down) {
                this.#sprite.setVelocityY(-330) // Jump if the player is above and CaptainGuina is on the ground
            }
        } else {
            this.#sprite.anims.play('idle', true)
            this.#currentSpeed = Math.max(this.#currentSpeed - deceleration, 0)
            this.#sprite.setVelocity(0, this.#sprite.body.velocity.y)
        }
    }
}