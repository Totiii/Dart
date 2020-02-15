const app = require('express').Router();
const Player = require('../models/Player')
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const dartDb = {
    player: [
        { id: 0, name: 'CecileEncieu', email: 'cecileencieu@gmail.com', gameWin: 1, gameLost: 3, createdAt: '01/01/2020' },
        { id: 1, name: 'MehdiCament', email: 'mehdicament@gmail.com', gameWin: 2, gameLost: 1, createdAt: '01/01/2020' },
        { id: 2, name: 'AudeJavel', email: 'audejavel@gmail.com', gameWin: 0, gameLost: 3, createdAt: '01/01/2020' },
        { id: 3, name: 'OussamaFerir', email: 'oussamaferir@gmail.com', gameWin: 5, gameLost: 1, createdAt: '01/01/2020' },
        { id: 4, name: 'PaulIcier', email: 'paulicier@gmail.com', gameWin: 3, gameLost: 3, createdAt: '01/01/2020' },
    ],
    game: [
        { id: 0, mode: 'around-the-world', name: 'Game1', currentPlayerId: null, status: 'ended', createdAt: '10/01/2020'},
        { id: 1, mode: '301', name: 'Game2', currentPlayerId: null, status: 'draft', createdAt: '29/01/2020'},
        { id: 2, mode: 'around-the-world', name: 'Game3', currentPlayerId: null, status: 'started', createdAt: '02/02/2020'},
    ],
    gamePlayer: [
        { id: 0, playerId: 0, gameId: 0, remainingShots: null, score: 20, rank: 1, order: 2, inGame: false, createdAt: '10/01/2020'},
        { id: 1, playerId: 2, gameId: 1, remainingShots: null, score: 0, rank: null, order: 1, inGame: false, createdAt: '10/01/2020'},
        { id: 2, playerId: 0, gameId: 1, remainingShots: null, score: 0, rank: null, order: 2, inGame: false, createdAt: '10/01/2020'},
        { id: 3, playerId: 1, gameId: 0, remainingShots: null, score: 11, rank: 2, order: 1, inGame: false, createdAt: '10/01/2020'},
        { id: 4, playerId: 0, gameId: 2, remainingShots: 2, score: 12, rank: null, order: 2, inGame: true, createdAt: '02/02/2020'},
        { id: 5, playerId: 4, gameId: 2, remainingShots: 0, score: 15, rank: null, order: 3, inGame: true, createdAt: '02/02/2020'},
        { id: 6, playerId: 5, gameId: 2, remainingShots: 0, score: 5, rank: null, order: 1, inGame: true, createdAt: '02/02/2020'}
    ],
    gameShot: [
        { id: 0, gameId: 0, playerId: 0, multiplicator: null, sector: 1, createdAt: '10/01/2020' },
        { id: 1, gameId: 0, playerId: 0, multiplicator: null, sector: 2, createdAt: '10/01/2020' },
        { id: 2, gameId: 0, playerId: 0, multiplicator: null, sector: 3, createdAt: '10/01/2020' },
        { id: 3, gameId: 0, playerId: 1, multiplicator: null, sector: 5, createdAt: '10/01/2020' },
        { id: 4, gameId: 0, playerId: 1, multiplicator: null, sector: 8, createdAt: '10/01/2020' },
        { id: 5, gameId: 0, playerId: 1, multiplicator: null, sector: 1, createdAt: '10/01/2020' },
        { id: 6, gameId: 0, playerId: 0, multiplicator: null, sector: 4, createdAt: '10/01/2020' },
        { id: 7, gameId: 0, playerId: 0, multiplicator: null, sector: 5, createdAt: '10/01/2020' },
        { id: 8, gameId: 0, playerId: 0, multiplicator: null, sector: 6, createdAt: '10/01/2020' },
        { id: 9, gameId: 0, playerId: 1, multiplicator: null, sector: 2, createdAt: '10/01/2020' },
        { id: 10, gameId: 0, playerId: 1, multiplicator: null, sector: 8, createdAt: '10/01/2020' },
        { id: 11, gameId: 0, playerId: 1, multiplicator: null, sector: 3, createdAt: '10/01/2020' },
        { id: 12, gameId: 0, playerId: 0, multiplicator: null, sector: 7, createdAt: '10/01/2020' },
        { id: 13, gameId: 0, playerId: 0, multiplicator: null, sector: 8, createdAt: '10/01/2020' },
        { id: 14, gameId: 0, playerId: 0, multiplicator: null, sector: 9, createdAt: '10/01/2020' },
        { id: 15, gameId: 0, playerId: 1, multiplicator: null, sector: 4, createdAt: '10/01/2020' },
        { id: 16, gameId: 0, playerId: 1, multiplicator: null, sector: 5, createdAt: '10/01/2020' },
        { id: 17, gameId: 0, playerId: 1, multiplicator: null, sector: 17, createdAt: '10/01/2020' },
        { id: 18, gameId: 0, playerId: 0, multiplicator: null, sector: 10, createdAt: '10/01/2020' },
        { id: 19, gameId: 0, playerId: 0, multiplicator: null, sector: 11, createdAt: '10/01/2020' },
        { id: 20, gameId: 0, playerId: 0, multiplicator: null, sector: 12, createdAt: '10/01/2020' },
        { id: 21, gameId: 0, playerId: 1, multiplicator: null, sector: 6, createdAt: '10/01/2020' },
        { id: 22, gameId: 0, playerId: 1, multiplicator: null, sector: 20, createdAt: '10/01/2020' },
        { id: 23, gameId: 0, playerId: 1, multiplicator: null, sector: 15, createdAt: '10/01/2020' },
        { id: 24, gameId: 0, playerId: 0, multiplicator: null, sector: 13, createdAt: '10/01/2020' },
        { id: 25, gameId: 0, playerId: 0, multiplicator: null, sector: 14, createdAt: '10/01/2020' },
        { id: 26, gameId: 0, playerId: 0, multiplicator: null, sector: 15, createdAt: '10/01/2020' },
        { id: 27, gameId: 0, playerId: 1, multiplicator: null, sector: 7, createdAt: '10/01/2020' },
        { id: 28, gameId: 0, playerId: 1, multiplicator: null, sector: 8, createdAt: '10/01/2020' },
        { id: 29, gameId: 0, playerId: 1, multiplicator: null, sector: 9, createdAt: '10/01/2020' },
        { id: 30, gameId: 0, playerId: 0, multiplicator: null, sector: 16, createdAt: '10/01/2020' },
        { id: 31, gameId: 0, playerId: 0, multiplicator: null, sector: 17, createdAt: '10/01/2020' },
        { id: 32, gameId: 0, playerId: 0, multiplicator: null, sector: 18, createdAt: '10/01/2020' },
        { id: 33, gameId: 0, playerId: 1, multiplicator: null, sector: 10, createdAt: '10/01/2020' },
        { id: 34, gameId: 0, playerId: 1, multiplicator: null, sector: 11, createdAt: '10/01/2020' },
        { id: 35, gameId: 0, playerId: 1, multiplicator: null, sector: 2, createdAt: '10/01/2020' },
        { id: 36, gameId: 0, playerId: 0, multiplicator: null, sector: 19, createdAt: '10/01/2020' },
        { id: 37, gameId: 0, playerId: 0, multiplicator: null, sector: 20, createdAt: '10/01/2020' },
    ],
}
/*
app.get('/', (req, res, next) => {
    let limit = +req.query.limit;
    let page = +req.query.page;
    const sort = +req.query.sort;
    const reverse = +req.query.reverse;

    const data = dartDb.player;

    if (limit == "") limit = 10;
    if (reverse != '') data.reverse();

    res.format({
        html: () => {
            let result = '<table>';

            for (let p = 0; p < data.length; p++) {
                if (limit == p){
                    break
                }else{
                    let player = data[p];
                    result += "<tr><td>" + player["id"] + "</td><td>" + player["name"] + "</td><td>" + player["email"] + "</td><td>" + player["gameWin"] + "</td><td>" + player["gameLost"] + "</td><td>" + player["createdAt"] + "</td><td><button>More</button></td><td><button>Delete</button></td></tr>";
                }
            }

            result += '</table>';

            res.send(result);
        },
        json: () => {
            let result = [];
            for (let p = 0; p <=  data.length; p++ ){
                if (limit == p){
                    break
                }else{
                    let player = data[p];
                    result.push(player)
                }
            }
            res.send(JSON.stringify(result))
        }
    })
})*/

app.get('/', function(req, res, next) {
    let limit = parseInt(req.query.limit) || 20
    let offset = parseInt(req.query.offset) || 0
    if (limit > 100) limit = 100
    test = Player.count()
    console.log(test)
    console.log(Player.count())
})

app.post('/', function(req, res) {
    var id = req.body.id;
    res.format({
        html: () => {
            res.render('/'+id);
        },
        json: () => {
            var name = req.body.name;
            var email = req.body.email;
            var gameWin = req.body.gameWin;
            var gameLost = req.body.gameLost;
            var createdAt = req.body.createdAt;

            Player.add(id, name, email, gameWin, gameLost, createdAt);

            dartDb.player.push({id, name, email, gameWin, gameLost, createdAt});

            res.send(dartDb.player);
        }
    })
});

app.get('/new', (req, res, next) => {
    res.format({
        html: () => {
            res.render('players/new');
        },
        json: () => {
            throw new NotApiAvailable()
        }
    })
})

app.get('/:id', (req, res, next) => {
    const id = +req.params.id;

    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    const data = dartDb.player.find(player => player.id === id);
    if (!data) throw new NotFoundError('User not found');

    res.format({
        html: () => {
            res.redirect('/'+id+'/edit')
        },
        json: () => {
            res.json({ data })
        }
    })
})

app.get('/:id/edit', (req, res, next) => {
    res.format({
        html: () => {
            res.render('players/new');
        },
        json: () => {
            throw new NotApiAvailable()
        }
    })
})

app.patch('/:id', (req, res, next) => {
    const id = +req.params.id;
    var name = req.body.name;
    var email = req.body.email;

    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    const data = dartDb.player.find(player => player.id === id);
    if (!data) throw new NotFoundError('User not found');

    if(name) data.name = name;
    if(email) data.email = email;

    res.format({
        html: () => {
            res.redirect('/')
        },
        json: () => {
            res.json({ data })
        }
    })
})

// not working - there is a bug in the else
app.delete('/:id', (req, res, next) => {
    const id = +req.params.id;

    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    const data = dartDb.player.find(player => player.id === id);
    if (!data) throw new NotFoundError('User not found');

    playerGames = dartDb.gamePlayer.find(player => player.playerId === id);

    let games = [];

    if (!playerGames){
        dartDb.player.splice(dartDb.player.indexOf(data),1);
    }else {

        for(pg = 0; pg < playerGames.length; pg++){
            playerGame = playerGames[pg];
            my_game = dartDb.game.find(game => game.id === playerGame.gameId);
            games.push(my_game)
        }

        let impossible = 0;

        for(g = 0; g < games.length; g++){
            game = games[g];
            if (game.status != 'draft'){
                impossible += 1
            }
        }

        if (impossible == 0){
            dartDb.player.splice(dartDb.player.indexOf(data),1)
        }else{
            throw new PlayerNotDeletable('Player is already in a game that is ended or started');
        }
    }
    res.format({
        html: () => {
            res.redirect('/')
        },
        json: () => {
            res.send(games);
        }
    })
})



module.exports = app;