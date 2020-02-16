const express = require('express');
const app = express();
const db = require('sqlite');
const routers = require('./router.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('assets'));

app.set('view engine', 'ejs');

app.use(routers);

db.open('bdd.db').then( () => {
    Promise.all([
        db.run('CREATE TABLE if not EXISTS Player (id INT PRIMARY KEY NOT NULL, name VARCHAR(100), email VARCHAR(200), gameWin INT, gameLost INT, createdAt DATETIME)'),
        db.run('CREATE TABLE if not EXISTS Game (id INT PRIMARY KEY NOT NULL, mode VARCHAR(100), name VARCHAR(200), currentPlayerId INT, status VARCHAR(40), createdAt DATETIME)'),
        db.run('CREATE TABLE if not EXISTS GamePlayer (id INT PRIMARY KEY NOT NULL, playerId INT NOT NULL, gameId INT NOT NULL, remainingShots INT, score INT, rank INT, "order" INT, inGame BOOL, createdAt DATETIME, FOREIGN KEY (playerId) REFERENCES Player(id), FOREIGN KEY (gameId) REFERENCES Game(id))'),
        db.run('CREATE TABLE if not EXISTS GameShot (id INT PRIMARY KEY NOT NULL, gameId INT NOT NULL, playerId INT NOT NULL, multiplicator INT, sector  INT, createdAt DATETIME)'),
    ]).then(() => {
        console.log('Databases are ready')
    }).catch((err) => {
        console.log('Une erreur est survenue :', err)
    })
});

app.listen(8080);

