const db = require("sqlite")


module.exports = {
    get: (gameId) => {
        return db.get('SELECT id, * FROM Game WHERE id = ?', gameId)
    },
    getbyname: (name, createdAt) => {
        return db.get('SELECT id, * FROM Game WHERE name = ? AND createdAt = ?', [name, createdAt])
    },
    add: (name, mode, status, createdAt) => {
        db.run("INSERT INTO Game (name, mode, status, createdAt) VALUES(?,?,?,?)", [name, mode, status, createdAt]);
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
    updateStatus: (id, name, mode, status) => {
        db.run("UPDATE Game SET name = ?, mode = ?, status = ? where id = ?", [name, mode, status, id]);
    },
    update: (id, name, mode) => {
        db.run("UPDATE Game SET name = ?, mode = ? where id = ?", [name, mode, id]);
    },
    delete: (id) => {
        db.run('DELETE FROM Game WHERE id = ?', id);
    },



}

