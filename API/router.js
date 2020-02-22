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

app.get('/favicon.ico', function(req, res) {
    res.sendFile('/assets/favicon.ico')
});

app.get('/styles/main.css', function(req, res) {
    res.sendFile('/assets/styles/main.css')
});

app.get('/images/logo.png', function(req, res) {
    res.sendFile('/assets/images/logo.png')
});

module.exports = app;
