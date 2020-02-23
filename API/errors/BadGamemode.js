const HttpError = require('./HttpError');

class BadGamemode extends HttpError {
    constructor(message = 'Bad Game Mode', type = 'BAD_REQUEST') {
        super(message)
        this.status = 400
        this.type = type
    }
}

module.exports = BadGamemode;