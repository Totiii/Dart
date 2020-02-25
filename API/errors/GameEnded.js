const HttpError = require('./HttpError');

class GameEnded extends HttpError {
    constructor(message = 'Game Ended', type = 'GAME_ENDED') {
        super(message)
        this.status = 422
        this.type = type
    }
}

module.exports = GameEnded;