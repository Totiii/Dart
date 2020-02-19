const app = require('express').Router();
const Game = require('../models/Game');
const GamePlayer = require('../models/GamePlayer');
const GameShot = require('../models/GameShot');

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

function getDateTime() {

    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

app.get('/', async (req, res, next) => {
    let limit = parseInt(req.query.limit) || 10
    let status = req.query.status
    let sort = req.query.sort || 'name'
    let reverse = req.query.reverse || 'ASC'
    if (limit > 20) limit = 20

    Promise.all([
        Game.getAll(limit, sort, reverse, status),
    ]).then((results) => {
        res.format({
            html: () => {
                res.render('games/game', {
                    players: results[0],
                })
            },
            json: () => {
                res.send({
                    Games: results[0],
                })
            }
        })
    }).catch(next)
})

app.get('/new', (req, res, next) => {
    res.format({
        html: () => {
            res.render('games/new');
        },
        json: () => {
            throw new NotApiAvailable()
        }
    })
})

app.post('/', function(req, res, next) {
    var name = req.body.name;
    var mode = req.body.mode;

    if(mode === '301' || mode === 'around-the-world' || mode === 'cricket'){
        Game.count().then((count) => {
            createdAt = getDateTime();
            id = count['count'] + 1;
            status = 'draft';
            Game.add(id, name, mode, status, createdAt);

            res.format({
                html: () => { res.redirect('/'+id) },
                json: () => {
                    Promise.all([
                        Game.get(id),
                    ]).then((result) => {
                        res.status(201).send(result);
                    }).catch(next)
                }
            })
        }).catch(next)
    }else{
        throw new BadGamemode()
    }

});

app.get('/:id', (req, res, next) => {
    const id = +req.params.id;

    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    res.format({
        html: () => {
            Promise.all([
                Game.get(id),
            ]).then((game) => {
                Promise.all([
                    GamePlayer.getAllGamePlayer(game[0]['id']),
                ]).then((players) => {
                    Promise.all([
                        GamePlayer.getCurrentPlayer(game[0]['currentPlayerId']),
                    ]).then((curentPlayer) => {
                        Promise.all([
                            GameShot.getLastShots(game[0]['id']),
                        ]).then((lastShots) => {
                            res.render('/'+id+'/players', {
                                game: game[0],
                                players: players[0],
                                curentPlayer: curentPlayer[0],
                                lastShots: lastShots[0],
                            })
                        }).catch(next);
                    }).catch(next);
                }).catch(next);
            }).catch(next);
        },
        json: () => {
            Promise.all([
                Game.get(id),
            ]).then((result) => {
                res.status(201).send(result);
            }).catch(next)
        }
    })
})

/*
app.get('/', (req, res, next) => {
    let limit = +req.query.limit;
    let page = +req.query.page;
    const sort = +req.query.sort;
    const reverse = +req.query.reverse;
    const status = req.query.status;

    const data = dartDb.game;

    if (limit == "") limit = 10;
    if (reverse != '') data.reverse();

    res.format({
        html: () => {
            let result = '<table>';

            for (let p = 0; p < data.length; p++) {
                if (limit == p){
                    break
                }else{
                    let game = data[p];
                    result += "<tr><td>" + game["id"] + "</td><td>" + game["mode"] + "</td><td>" + game["name"] + "</td><td>" + game["currentPlayerId"] + "</td><td>" + game["status"] + "</td><td>" + game["createdAt"] + "</td><td><button>Access to the game</button></td><td><button>Delete</button></td></tr>";
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
                    let game = data[p];
                    result.push(game)
                }
            }
            res.send(JSON.stringify(result))
        }
    })
})


app.get('/new', (req, res, next) => {
    res.format({
        html: () => {
            res.render('games/new');
        },
        json: () => {
            throw new NotApiAvailable()
        }
    })
})

app.post('/', function(req, res) {
    var id = req.body.id;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    res.format({
        html: () => {
            res.redirect('/'+id);
        },
        json: () => {
            var name = req.body.name;
            var mode = req.body.mode;
            id = dartDb.player.length + 1;

            Game.add(id, name, mode, 'Draft', today);
            dartDb.game.push({id, name, mode, today});

            res.send(dartDb.game);
        }
    })
});

app.get('/:id', (req, res, next) => {
    const id = +req.params.id;

    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    const data = dartDb.game.find(game => game.id === id);
    if (!data) throw new NotFoundError('Game not found');
    gameplayers = dartDb.gamePlayer.filter(game => game.gameId === data.id);

    let players = [];

    for (i=0; i < gameplayers.length; i++){
        myplayer = gameplayers[i];
        result = dartDb.player.filter(player => player.id === myplayer.id)
        players.push(result);
    }

    console.log( players)

    for (i=0; i < players.length; i++){
        myplayer = players[i];
        console.log(myplayer.id)
    }

    res.format({
        html: () => {
            res.render('games/game', { game : data, players : players });
        },
        json: () => {
            res.json({ data })
        }
    })
})
*/

module.exports = app;