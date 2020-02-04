const app = require('express').Router();
const gameRouter = require('./routers/game.js');
const playerRouter = require('./routers/player.js');

app.get('/', (req, res, next) => {
    res.format({
        html: () => {
            res.redirect('/games')
        },
        json: () => {
            throw new NotApiAvailable()
        }
    })
})

app.use('/games', gameRouter);
app.use('/players', playerRouter);

module.exports = app;
