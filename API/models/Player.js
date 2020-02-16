const db = require("sqlite")


module.exports = {
    get: (userId) => {
        return db.get('SELECT id, * FROM Player WHERE id = ?', userId) // Get userId
    },
    getAll: (limit, sort, reverse) => {
        return db.all('SELECT id, * FROM Player ORDER BY ?, ? LIMIT ?', sort, reverse, limit)
    },
    count: () => {
        return db.get("SELECT COUNT(*) as count FROM Player")
    },
    add: (id, name, email, createdAt) => {
        db.run("INSERT INTO Player (id, name, email, createdAt) VALUES(?,?,?,?)", [id, name, email, createdAt]);
    },



}

