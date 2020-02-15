const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('bdd.db', err => {
    if (err) {
        return console.error(err.message);
    }
});


module.exports = {
    add: (id, name, mode, status, createdAt) => {
        db.run("INSERT INTO Game (id, name, mode, status, createdAt) VALUES(?,?,?,?,?)", [id, name, mode, status, createdAt]);
    },



}

