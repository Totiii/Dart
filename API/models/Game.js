const db = require("sqlite")


module.exports = {
    add: (id, name, mode, status, createdAt) => {
        db.run("INSERT INTO Game (id, name, mode, status, createdAt) VALUES(?,?,?,?,?)", [id, name, mode, status, createdAt]);
    },



}

