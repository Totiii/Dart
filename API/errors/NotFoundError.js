const HttpError = require('./HttpError');

class NotFoundError extends HttpError {
    constructor(message = 'Not found', type = 'NOT_FOUND') {
        super(message)
        this.status = 404
        this.type = type
    }
}

module.exports = NotFoundError;