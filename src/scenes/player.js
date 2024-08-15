import Score from "./score.js";

export default class Player {
    #sprite
    #score
    #cursor
    #left
    #right
    #up
    #down

    constructor(scene, x, y) {
        this.scene = scene
        this.#sprite = scene.physics.add.sprite(x, y, 'dude')
        this.#cursor = scene.input.keyboard.createCursorKeys()
        this.#left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.#right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.#up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.#down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

        this.#sprite.setBounce(0.2)
        this.#sprite.setCollideWorldBounds(true)

        this.#score = new Score(0, this.scene.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' }))

        this.createAnimations()
    }

    get sprite() {
        return this.#sprite
    }

    set sprite(value) {
        this.#sprite = value
    }


    get score() {
        return this.#score;
    }

    set score(value) {
        this.#score = value;
    }


    get cursor() {
        return this.#cursor;
    }

    set cursor(value) {
        this.#cursor = value;
    }

    get left() {
        return this.#left;
    }

    set left(value) {
        this.#left = value;
    }

    get right() {
        return this.#right;
    }

    set right(value) {
        this.#right = value;
    }

    get up() {
        return this.#up;
    }

    set up(value) {
        this.#up = value;
    }

    get down() {
        return this.#down;
    }

    set down(value) {
        this.#down = value;
    }

    static loadSprite(scene) {
        scene.load.spritesheet('dude', 'assets/dude.png',
            { frameWidth: 32, frameHeight: 48})
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1                  // loop animation
        });

        this.scene.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    move() {
        if (this.left.isDown) {
            this.#sprite.setVelocityX(-160);
            this.#sprite.anims.play('left', true);
        } else if (this.right.isDown) {
            this.#sprite.setVelocityX(160);
            this.#sprite.anims.play('right', true);
        } else {
            this.#sprite.setVelocityX(0);
            this.#sprite.anims.play('turn');
        }

        if (this.up.isDown && this.#sprite.body.touching.down) {
            this.#sprite.setVelocityY(-330);
        }
    }
}
