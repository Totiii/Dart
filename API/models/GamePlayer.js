const db = require("sqlite")


module.exports = {
    getPlayers: (playerId) => {
        return db.all('SELECT gameId FROM GamePlayer WHERE playerId = ?', playerId)
    },
    getAllGamePlayer: (gameId) => {
        return db.all('SELECT playerId FROM GamePlayer WHERE gameId = ?', gameId)
    },
    getCurrentPlayer: (playerId) => {
        return db.get('SELECT * FROM GamePlayer WHERE playerId = ?', playerId)
    },
    addPlayer: (PlayerId, gameId, createdAt) => {
        db.run("INSERT INTO GamePlayer (playerId, gameId, createdAt) VALUES(?,?,?)", [PlayerId, gameId, createdAt]);
    },
    count: () => {
        return db.get("SELECT COUNT(*) as count FROM Game")
    },
    removePlayer: (gameId, playerId) => {
        db.run('DELETE FROM GamePlayer WHERE gameId = ? AND playerId = ?', [gameId, playerId]);
    },



}