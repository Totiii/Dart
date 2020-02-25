const HttpError = require('./HttpError');

class GameNotStarted extends HttpError {
    constructor(message = 'Game not started', type = 'GAME_NOT_STARTED') {
        super(message)
        this.status = 422
        this.type = type
    }
}

module.exports = GameNotStarted;