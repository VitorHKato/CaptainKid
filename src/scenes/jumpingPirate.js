export default class JumpingPirate {
    #sprite

    constructor(scene, x, y) {
        this.scene = scene
        this.#sprite = scene.physics.add.sprite(x, y, 'jumpingPirate')

        this.#sprite.setScale(0.5)
        this.#sprite.setCollideWorldBounds(true)

        this.createAnimations()
    }

    get sprite() {
        return this.#sprite;
    }

    set sprite(value) {
        this.#sprite = value;
    }

    static loadSprite(scene) {
        scene.load.spritesheet('jumpingPirate', 'assets/jumpingPirate.png',
            { frameWidth: 66.55, frameHeight: 96 })
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'jumpingPirate-standing',
            frames: this.scene.anims.generateFrameNumbers('jumpingPirate', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'jumpingPirate-jumping',
            frames: this.scene.anims.generateFrameNumbers('jumpingPirate', { start: 2, end: 8 }),
            frameRate: 5,
            repeat: -1
        })
    }

    move() {
        let shouldMove = Math.random() < 0.01
        const screenWidth = this.scene.sys.canvas.width;

        let randomSide = Math.floor(Math.random() * 2)

        if (shouldMove) {
            if (this.#sprite.body.touching.down && randomSide === 0) {
                this.#sprite.anims.play('jumpingPirate-jumping', true)
                this.#sprite.setVelocityY(-260)
                this.#sprite.setVelocityX(-160)
                this.#sprite.flipX = true
            } else if (this.#sprite.body.touching.down && randomSide === 1) {
                this.#sprite.anims.play('jumpingPirate-jumping', true)
                this.#sprite.setVelocityY(-260)
                this.#sprite.setVelocityX(160)
                this.#sprite.flipX = false
            }
        } else if (this.#sprite.body.touching.down) {
            this.#sprite.anims.play('jumpingPirate-standing', true)

            this.#sprite.setVelocityY(0)
            this.#sprite.setVelocityX(0)
        }

    }
}