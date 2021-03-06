const app = require('express').Router();
const Game = require('../models/Game');
const GamePlayer = require('../models/GamePlayer');
const GameShot = require('../models/GameShot');
const Player = require('../models/Player');
const NotApiAvailable = require('../errors/NotApiAvailable');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const BadGamemode = require('../errors/BadGamemode');
const GameNotStartable = require('../errors/GameNotStartable');
const GameEnded = require('../errors/GameEnded');
const GameNotStarted = require('../errors/GameNotStarted');
const PlayersNotAddableGameStarted = require('../errors/PlayersNotAddableGameStarted');
const WorldTour = require('../engine/gamemodes/WorldTour');
const The301Game = require('../engine/gamemodes/The301Game');

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
    let limit = parseInt(req.query.limit) || 10;
    let status = req.query.status;
    let sort = req.query.sort || 'name';
    let reverse = req.query.reverse || 'ASC';
    if (limit > 20) limit = 20;

    Promise.all([
        Game.getAll(limit, sort, reverse, status),
    ]).then((results) => {
        res.format({
            html: () => {
                res.render('games/games', {
                    Games: results[0],
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

app.post('/', (req, res, next) => {
    var name = req.body.name;
    var mode = req.body.mode;

    if(mode === '301' || mode === 'around-the-world' || mode === 'cricket'){
        createdAt = getDateTime();
        status = 'draft';
        Game.add(name, mode, status, createdAt);

        Promise.all([
            Game.getbyname(name, createdAt),
        ]).then((result) => {
            res.format({
                html: () => {
                    res.redirect('./games/'+result[0].id)
                },
                json: () => {
                    res.status(201).send(result);
                }
            })
        }).catch(next);
    }else if (mode === ''){
        throw new BadGamemode('The mode can not be empty')
    }else{
        throw new BadGamemode("This game mode don't exist")
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
                    ]).then((currentPlayer) => {
                        Promise.all([
                            GameShot.getLastShots(game[0]['id']),
                        ]).then((lastShots) => {
                            Promise.all([
                               Player.get(game[0]['currentPlayerId']),
                            ]).then( async (currentPlayerProfile) => {
                                allPlayersProfile = [];
                                if (players[0].length === 0){
                                    res.render('games/game', {
                                        game: game[0],
                                        players: players[0],
                                        currentPlayer: currentPlayer[0],
                                        currentPlayerProfile: currentPlayerProfile[0],
                                        allPlayersProfile: allPlayersProfile,
                                        lastShots: lastShots[0],
                                    })
                                }else{
                                    for (i=0; i < players[0].length; i++){
                                        await Promise.all([
                                            Player.get(players[0][i]['playerId']),
                                        ]).then((result) => {
                                            allPlayersProfile.push(result[0]);
                                            if(i === players[0].length - 1){
                                                res.render('games/game', {
                                                    game: game[0],
                                                    players: players[0],
                                                    currentPlayer: currentPlayer[0],
                                                    currentPlayerProfile: currentPlayerProfile[0],
                                                    allPlayersProfile: allPlayersProfile,
                                                    lastShots: lastShots[0],
                                                })
                                            }
                                        }).catch(next)
                                    }
                                }
                            }).catch(next)
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
});


app.get('/:id/edit', (req, res, next) => {
    const id = +req.params.id;
    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    res.format({
        html: () => {
            Promise.all([
                Game.get(id),
            ]).then((game) => {
                res.render('games/edit', {
                    game: game[0],
                })
            }).catch(next)
        },
        json: () => {
            throw new NotApiAvailable()
        }
    })
});

app.patch('/:id', (req, res, next) => {
    const id = +req.params.id;
    var name = req.body.name;
    var mode = req.body.mode;
    var status = req.body.status;

    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    if (mode === "301" || mode === "cricket" || mode === "around-the-world") {
        Promise.all([
            Game.get(id),
        ]).then((game) => {
            if (game[0].status === 'started' && status === 'started' || game[0].status === 'ended' && status === 'ended'){
                throw new GameNotStartable('Game is already started or ended');
            }else if (game[0].length === 0) {
                throw new NotFoundError('Game not found');
            }else{
                if (status === 'started'){
                    Game.updateStatus(id, name, mode, status);
                }else{
                    Game.update(id, name, mode);
                }
            }
        }).catch(next);

        res.format({
            html: () => {
                res.redirect('./'+id)
            },
            json: () => {
                Promise.all([
                    Game.get(id),
                ]).then((game) => {
                    res.status(201).send(game);
                }).catch(next)
            }
        })
    }else {
        throw new BadRequestError('Bad Gamemode');
    }
})


app.delete('/:id', (req, res, next) => {
    const id = +req.params.id;

    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    Promise.all([
        Game.get(id),
    ]).then((game) => {
        if (game[0].length === 0) {
            throw new NotFoundError('Game not found');
        }else{
            Game.delete(id);
            res.format({
                html: () => {
                    res.redirect('/')
                },
                json: () => {
                    res.status(201).send('{"code":204}' );
                }
            })
        }
    }).catch(next);
})

app.get('/:id/players', (req, res, next) => {
    const id = +req.params.id;

    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    allPlayersNotInGame = [];

    Promise.all([
        Game.get(id),
    ]).then(async (game) => {
        await Promise.all([
            GamePlayer.getAllGamePlayer(game[0]['id']),
        ]).then(async (players) => {
            inGamePlayers = [];
            if (players[0].length === 0){
                await Promise.all([
                    GamePlayer.getAvailablePlayers(),
                ]).then(async (allplayers) => {
                    if (allplayers[0].length > 0){
                        console.log(allplayers[0])
                        for (a=0; a < allplayers[0].length; a++){
                            await allPlayersNotInGame.push(allplayers[0][a]);
                        }
                    }
                    res.format({
                        html: () => {
                            res.render('games/player', {
                                game: game[0],
                                inGamePlayers: inGamePlayers,
                                allPlayers: allPlayersNotInGame,
                            })
                        },
                        json: () => {
                            res.status(201).send(inGamePlayers);
                        }
                    })
                }).catch(next);
            }else {
                for (i=0; i < players[0].length; i++) {
                    Promise.all([
                        Player.get(players[0][i]['playerId']),
                    ]).then(async (result) => {
                        await inGamePlayers.push(result[0]);
                        Promise.all([
                            GamePlayer.getAvailablePlayers(),
                        ]).then(async (AvailablePlayers) => {
                            console.log(AvailablePlayers)
                            if (i === players[0].length){
                                res.format({
                                    html: () => {
                                        res.render('games/player', {
                                            game: game[0],
                                            inGamePlayers: inGamePlayers,
                                            allPlayers: AvailablePlayers[0],
                                        })
                                    },
                                    json: () => {
                                        res.status(201).send(inGamePlayers);
                                    }
                                })
                            }
                        }).catch(next);
                    }).catch(next);
                }
            }
        }).catch(next)
    }).catch(next);
});

app.post('/:id/players', function(req, res, next) {
    const id = +req.params.id;
    const playerString = req.body.playerId;

    playersArray = [];

    if (Array.isArray(playerString) === false){
        playersArray.push(playerString);
    }else{
        playersArray = playerString;
    }

    createdAt = getDateTime();

    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    Promise.all([
        Game.get(id),
    ]).then((result) => {
        if (result[0].status === 'draft'){
            for (i = 0; i < playersArray.length; i++){
                GamePlayer.addPlayer(playersArray[i], id, createdAt)
            }
        }else {
            throw new PlayersNotAddableGameStarted('Game has already started or is ended');
        }
    }).catch(next);

    res.format({
        html: () => {
            res.redirect('./players')
        },
        json: () => {
            res.status(201).send('{"code":204}' );
        }
    })

});

app.delete('/:id/players', (req, res, next) => {
    const id = +req.params.id;
    const players = req.query.id;

    playersArray = [];

    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    if (Array.isArray(players) === false){
        playersArray.push(players);
    }else{
        playersArray = players;
    }

    Promise.all([
        Game.get(id),
    ]).then((game) => {
        if (game[0].status === 'draft' || game[0].status === 'ended'){
            for (i = 0; i < playersArray.length; i++){
                GamePlayer.removePlayer(id, playersArray[i]);
            }
        }else {
            throw new PlayersNotAddableGameStarted('Game has already started !');
        }
    }).catch(next);

    res.format({
        html: () => {
            res.redirect('./'+id+'/players')
        },
        json: () => {
            res.status(201).send('{"code":204}' );
        }
    })
})

app.post('/:id/shots', async function(req, res, next) {
    const id = +req.params.id;
    const sector = req.body.sector;
    const multiplicator = req.body.multiplicator;
    createdAt = getDateTime();

    if (id != req.params.id) throw new BadRequestError('Id should be a number');

    await Promise.all([
        Game.get(id),
    ]).then(async (myGame) => {
        if (myGame[0]['status'] === 'ended') throw new GameEnded();
        if (myGame[0]['status'] === 'draft') throw new GameNotStarted('You need to start the game before play');

        await GameShot.addShot(myGame[0]['id'], myGame[0]['currentPlayerId'], multiplicator, sector, createdAt);
        await Promise.all([
            await GamePlayer.getRemainingShots(myGame[0]['id'], myGame[0]['currentPlayerId'])
        ]).then(async (remainingShots) => {
            if (remainingShots[0]['remainingShots'] < 4 && remainingShots[0]['remainingShots'] > 0){
                GamePlayer.updateRemainingShots(myGame[0]['id'], myGame[0]['currentPlayerId'], remainingShots[0]['remainingShots'] - 1)
            }
            res.format({
                html: () => {
                    res.redirect('../')
                },
                json: () => {
                    res.status(201).send('{"code":204}' );
                }
            })
        }).catch(next);
    }).catch(next);
});

module.exports = app;