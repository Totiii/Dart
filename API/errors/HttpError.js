class HttpError extends Error
{
    toJSON()
    {
        return {
            type: this.type || 'SERVER_ERROR',
            message: this.message || 'Server Error',
        }
    }
}

module.exports = HttpError;