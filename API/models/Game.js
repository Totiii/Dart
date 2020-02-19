const db = require("sqlite")


module.exports = {
    get: (gameId) => {
        return db.get('SELECT id, * FROM Game WHERE id = ?', gameId)
    },
    add: (id, name, mode, status, createdAt) => {
        db.run("INSERT INTO Game (id, name, mode, status, createdAt) VALUES(?,?,?,?,?)", [id, name, mode, status, createdAt]);
    },
    count: () => {
        return db.get("SELECT COUNT(*) as count FROM Game")
    },
    getStatus: (gameId) => {
        return db.get('SELECT status FROM Game WHERE id = ?', gameId);
    },
    getAll: (limit, sort, reverse, status) => {
        return db.all('SELECT id, * FROM Game ORDER BY ?, ?, ? LIMIT ?', [sort, reverse, status, limit]);
    },



}

