const HttpError = require('./HttpError');

class NotApiAvailable extends HttpError {
    constructor(message = 'Not found', type = 'NOT_API_AVAILABLE') {
        super(message)
        this.status = 406
        this.type = type
    }
}

module.exports = NotApiAvailable;