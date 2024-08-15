export default class Phase {
    #platforms

    constructor(scene) {
        this.scene = scene
        this.#platforms = scene.physics.add.staticGroup()            // Create a static object

        this.addBackground()
        this.generatePlatforms()
    }

    get platforms() {
        return this.#platforms;
    }

    set platforms(value) {
        this.#platforms = value;
    }

    static loadAssets(scene) {
        scene.load.image('sky', 'assets/sky.png')
        scene.load.image('ground', 'assets/platform.png')        // 400x32
    }

    addBackground() {
        this.scene.add.image(0, 0, 'sky').setOrigin(0, 0)
    }

    generatePlatforms() {
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()      // 800x64

        this.platforms.create(600, 400, 'ground')
        this.platforms.create(50, 250, 'ground')
        this.platforms.create(750, 220, 'ground')
    }
}