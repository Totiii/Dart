const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('bdd.db', err => {
    if (err) {
        return console.error(err.message);
    }
});


module.exports = {
    get: (userId) => {
        return db.get('SELECT id, * FROM Player WHERE id = ?', userId) // Get userId
    },
    getAll: (limit, offset) => {
        return db.all('SELECT id, * FROM Player LIMIT ? OFFSET ?', limit, offset)
    },
    count: () => {
        db.get("SELECT COUNT(*) as count FROM Player", (err, row)=>{
            return row;
        });
    },
    add: (id, name, email, gameWin, gameLost, createdAt) => {
        db.run("INSERT INTO Player VALUES(?,?,?,?,?,?)", [id, name, email, gameWin, gameLost, createdAt]);
    },



}

