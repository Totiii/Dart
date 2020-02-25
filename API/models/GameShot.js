const db = require("sqlite")


module.exports = {
    getLastShots: (gameId) => {
        return db.all('SELECT * FROM GameShot WHERE gameId = ?', gameId)
    },
    addShot: (gameId, playerId, multiplicator, sector, createdAt) => {
        db.run("INSERT INTO GameShot (gameId, playerId, multiplicator, sector, createdAt) VALUES(?,?,?,?,?)", [gameId, playerId, multiplicator, sector, createdAt]);
    }
}
