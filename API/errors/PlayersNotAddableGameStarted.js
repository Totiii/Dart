const HttpError = require('./HttpError');

class PlayersNotAddableGameStarted extends HttpError {
    constructor(message = 'Game has allready started', type = 'PLAYERS_NOT_ADDABLE_GAME_STARTED') {
        super(message)
        this.status = 422
        this.type = type
    }
}

module.exports = PlayersNotAddableGameStarted;