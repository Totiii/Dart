const HttpError = require('./HttpError');

class InvalidFormat extends HttpError {
    constructor(message = 'Invalid format', type = 'INVALID_FORMAT') {
        super(message)
        this.status = 400
        this.type = type
    }
}

module.exports = InvalidFormat;