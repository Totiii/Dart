const HttpError = require('./HttpError');

class PlayerNotDeletable extends HttpError {
    constructor(message = 'Player Not Deletable', type = 'PLAYER_NOT_DELETABLE') {
        super(message)
        this.status = 410
        this.type = type
    }
}

module.exports = PlayerNotDeletable;