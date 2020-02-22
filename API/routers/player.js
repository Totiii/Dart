const app = require('express').Router();
const Player = require('../models/Player');
const GamePlayer = require('../models/GamePlayer');
const Game = require('../models/Game');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
    //let page = parseInt(req.query.page) || 1  je comprend pas à quoi ça sert
    let sort = req.query.sort || 'name'
    let reverse = req.query.reverse || 'ASC'
    if (limit > 20) limit = 20

    Promise.all([
        Player.getAll(limit, sort, reverse),
    ]).then((results) => {
        res.format({
            html: () => {
                res.render('players/player', {
                    players: results[0],
                })
            },
            json: () => {
                res.send({
                    Players: results[0],
                })
            }
        })
    }).catch(next)
})

app.post('/', function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    createdAt = getDateTime();
    Player.add(name, email, createdAt);

    res.format({
        html: () => { res.redirect('/'+id) },
        json: () => {
            Promise.all([
                Player.getbyemail(email),
            ]).then((result) => {
                res.status(201).send(result);
            }).catch(next)
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

    res.format({
        html: () => {
            res.redirect('/'+id+'/edit')
        },
        json: () => {
            Promise.all([
                Player.get(id),
            ]).then((result) => {
                res.status(201).send(result);
            }).catch(next)
        }
    })
})

app.get('/:id/edit', (req, res) => {
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

    Promise.all([
        Player.get(id),
    ]).then((result) => {
        if (result[0].length === 0) {
            throw new NotFoundError('User not found');
        }else{
            Player.update(id, name, email);
        }
    }).catch(next);

    res.format({
        html: () => {
            res.redirect('./')
        },
        json: () => {
            Promise.all([
                Player.get(id),
            ]).then((result) => {
                res.status(201).send(result);
            }).catch(next)
        }
    })
})

app.delete('/:id', (req, res, next) => {
    const id = +req.params.id;

    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    Promise.all([
        Player.get(id),
    ]).then((result) => {
        if (result[0].length === 0) {
            throw new NotFoundError('User not found');
        }
    }).catch(next)

    Promise.all([
        GamePlayer.getPlayers(id),
    ]).then((result) => {
        console.log(result[0].length)
        if (result[0].length === 0){
            Player.delete(id);
            res.format({
                html: () => {
                    res.redirect('/')
                },
                json: () => {
                    res.status(201).send('{"code":204}' );
                }
            })
        }else {
            Promise.all([
                Game.getStatus(result[0][0]['gameId']),
            ]).then( async (games) => {
                for(i = 0; i < games.length; i++){
                    if (games[i]['status'] == 'draft'){
                        await Player.delete(id);
                        res.format({
                            html: () => {
                                res.redirect('./')
                            },
                            json: () => {
                                res.status(201).send('{"code":204}' );
                            }
                        })
                    }else{
                        throw new PlayerNotDeletable('Player is already in a game that is ended or started');
                    }
                }
            }).catch(next);
        }
    }).catch(next);

    /*
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
    */
})

module.exports = app;