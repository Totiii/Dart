const db = require("sqlite")


module.exports = {
    getLastShots: (gameId) => {
        return db.all('SELECT * FROM GameShot WHERE gameId = ?', gameId)
    }
}
