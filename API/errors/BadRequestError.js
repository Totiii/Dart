const HttpError = require('./HttpError');

class BadRequestError extends HttpError {
    constructor(message = 'Bad request', type = 'BAD_REQUEST') {
        super(message)
        this.status = 400
        this.type = type
    }
}

module.exports = BadRequestError;