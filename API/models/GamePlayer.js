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
        db.run("INSERT INTO GamePlayer (playerId, gameId, createdAt, inGame) VALUES(?,?,?, TRUE)", [PlayerId, gameId, createdAt]);
    },
    count: () => {
        return db.get("SELECT COUNT(*) as count FROM Game")
    },
    removePlayer: (gameId, playerId) => {
        db.run('DELETE FROM GamePlayer WHERE gameId = ? AND playerId = ?', [gameId, playerId]);
    },
    getAvailablePlayers: () => {
        return db.all('SELECT * FROM  Player P WHERE P.id NOT IN (SELECT Player.id FROM GamePlayer LEFT JOIN Player ON Player.id = GamePlayer.playerId WHERE GamePlayer.inGame IS TRUE )')
    }



}