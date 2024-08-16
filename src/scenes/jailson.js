export default class Jailson {
    #sprite

    constructor(scene, x, y) {
        this.#sprite = scene.physics.add.sprite(x, y, 'jailson')

        this.#sprite.setCollideWorldBounds(true)
        this.scene = scene;

        this.#sprite.setScale(0.6)

        this.messageBox = null
        this.messageCounter = 0
        this.playerClose = false
        this.createMessage()

        this.createAnimations()
    }

    get sprite() {
        return this.#sprite;
    }

    set sprite(value) {
        this.#sprite = value;
    }

    static loadSprite(scene) {
        scene.load.spritesheet('jailson', 'assets/jailson.png',
            { frameWidth: 55, frameHeight: 67 })
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'jailson-idle',
            frames: this.scene.anims.generateFrameNumbers('jailson', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        })
    }

    move(player) {
        this.#sprite.anims.play('jailson-idle', true)
        this.#sprite.flipX = player.sprite.x < this.sprite.x;

        this.showMessage(player)
    }

    createMessage() {
        this.messageBox = this.scene.add.text(this.#sprite.x, this.#sprite.y - 50,
            'Agora eu to afim de relaxar.', {
                font: '16px Arial',
                fill: '#000000',
                //backgroundColor: '#ffffff'
            }).setOrigin(0.5).setVisible(false)
    }

    showMessage(player) {
        const distance = Phaser.Math.Distance.Between(
            player.sprite.x, player.sprite.y,
            this.#sprite.x, this.#sprite.y
        )

        const messages = [
            'Agora eu to afim de relaxar.',
            'Não cara.',
            'Trabalhando e relaxando.',
            'Como assim? Não entendi.',
            'Era essa peça que você queria?',
        ]

        if (this.messageCounter > messages.length - 1) {
            this.messageCounter = 0
        }

        const triggerDistance = 50
        if (distance < triggerDistance) {
            this.messageBox.setVisible(true)
            this.messageBox.setPosition(this.#sprite.x, this.#sprite.y - 50)

            if (!this.playerClose) {
                this.messageBox.setText(messages[this.messageCounter])
                this.playerClose = true
                this.messageCounter += 1
            }
        } else {
            this.messageBox.setVisible(false)
            this.playerClose = false
        }
    }
}