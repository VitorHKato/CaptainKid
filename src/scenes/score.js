export default class Score {
    #score
    #scoreText

    constructor(score, scoreText) {
        this.#score = score
        this.#scoreText = scoreText
    }

    get score() {
        return this.#score
    }

    set score(value) {
        this.#score = value
    }

    get scoreText() {
        return this.#scoreText
    }

    set scoreText(value) {
        this.#scoreText = value
    }

    updateScore(point) {
        this.score += point
        this.updateScoreText()
    }

    updateScoreText() {
        this.scoreText.setText(`Score: ${this.score}`)
    }

    resetScore(value) {
        value === null ? this.score = 0 : this.score = value
    }
}