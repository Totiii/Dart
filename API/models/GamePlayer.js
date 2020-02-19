const db = require("sqlite")


module.exports = {
    getPlayers: (playerId) => {
        return db.all('SELECT gameId FROM GamePlayer WHERE playerId = ?', playerId)
    },
    getAllGamePlayer: (gameId) => {
        return db.all('SELECT * FROM GamePlayer WHERE gameId = ?', gameId)
    },
    getCurrentPlayer: (playerId) => {
        return db.get('SELECT * FROM GamePlayer WHERE playerId = ?', playerId)
    },



}