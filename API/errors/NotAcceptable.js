const HttpError = require('./HttpError');

class NotAcceptable extends HttpError {
    constructor(message = 'Bad format', type = 'NOT_ACCEPTABLE') {
        super(message)
        this.status = 406
        this.type = type
    }
}

module.exports = NotAcceptable;