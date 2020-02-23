const HttpError = require('./HttpError');

class ServerError extends HttpError {
    constructor(message = 'Server Error', type = 'SERVER_ERROR') {
        super(message)
        this.status = 500
        this.type = type
    }
}

module.exports = ServerError;