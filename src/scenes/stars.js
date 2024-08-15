export default class Stars {
    #stars

    constructor(scene) {
        this.scene = scene
        this.#stars = this.generateStars()

        this.setBounce()
    }

    get stars() {
        return this.#stars
    }

    set stars(value) {
        this.#stars = value
    }

    static loadAsset(scene) {
        scene.load.image('star', 'assets/star.png')
    }

    generateStars() {
        return this.scene.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        })
    }

    setBounce() {
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })
    }
}