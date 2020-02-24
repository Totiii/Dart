class HttpError extends Error
{
    toJSON()
    {
        const stack = process.env.NODE_ENV === 'development' ? this.stack : undefined
        return {
            type: this.type || 'SERVER_ERROR',
            message: this.message || 'Server Error',
            stack
        }
    }
}

module.exports = HttpError;