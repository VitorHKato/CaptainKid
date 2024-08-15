import Player from './player.js'
import Phase from "./phase.js"
import Stars from "./stars.js"
import Bombs from "./bombs.js"

export default class Game extends Phaser.Scene
{
    preload ()
    {
        Phase.loadAssets(this)
        Player.loadSprite(this)
        Stars.loadAsset(this)
        Bombs.loadAsset(this)
    }

    create ()
    {
        this.phase = new Phase(this)
        this.player = new Player(this, 100, 450)
        this.stars = new Stars(this)
        this.bombs = new Bombs(this)

        function collectStar(player, star) {
            star.disableBody(true, true)

            this.player.score.updateScore(1)

            if (this.stars.stars.countActive(true) === 0) {
                this.stars.stars.children.iterate(function (child) {  // Re-enable all stars and reset the y position
                    child.enableBody(true, child.x, 0, true, true)
                })
            }

            this.bombs.generateRandomBomb(this.player)
        }

        function hitBomb(player, bomb) {
            this.physics.pause()
            player.setTint(0xff000)
            player.anims.play('turn')
            let gameOver = true
        }

        this.physics.add.collider(this.player.sprite, this.phase.platforms)

        this.physics.add.collider(this.stars.stars, this.phase.platforms)
        this.physics.add.overlap(this.player.sprite, this.stars.stars, collectStar, null, this)

        this.physics.add.collider(this.bombs.bombs, this.phase.platforms)
        this.physics.add.collider(this.player.sprite, this.bombs.bombs, hitBomb, null, this)

    }

    update(time, delta) {
        this.player.move()
    }

}
