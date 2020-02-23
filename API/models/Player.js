const db = require("sqlite")


module.exports = {
    get: (userId) => {
        return db.get('SELECT id, * FROM Player WHERE id = ?', userId)
    },
    getbyemail: (email, createdAt) => {
        return db.get('SELECT id, * FROM Player WHERE email = ? AND createdAt = ?', [email, createdAt])
    },
    getAll: (limit, sort, reverse) => {
        return db.all('SELECT id, * FROM Player ORDER BY ?, ? LIMIT ?', [sort, reverse, limit])
    },
    count: () => {
        return db.get("SELECT COUNT(*) as count FROM Player")
    },
    add: (name, email, createdAt) => {
        db.run("INSERT INTO Player (name, email, createdAt) VALUES(?,?,?)", [name, email, createdAt]);
    },
    update: (id, name, email) => {
        db.run("UPDATE Player SET name = ?, email = ? where id = ?", [name, email, id]);
    },
    delete: (id) => {
        db.run('DELETE FROM Player WHERE id = ?', id);
    },
    getAllPlayers: () => {
        return db.all('SELECT * FROM Player')
    }



}

