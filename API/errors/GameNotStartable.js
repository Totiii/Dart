const HttpError = require('./HttpError');

class GameNotStartable extends HttpError {
    constructor(message = 'Game is already started or ended', type = 'GAME_NOT_STARTABLE') {
        super(message)
        this.status = 422
        this.type = type
    }
}

module.exports = GameNotStartable;