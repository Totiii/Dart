const inquirer = require('inquirer');
const Player = require('./game/Player');
const WorldTour = require('./gamemodes/WorldTour');
const The301Game = require('./gamemodes/The301Game');

async function startGame() {

    let nbPlayers = await numberOfPlayer();
    let namePlayers = await nameOfPlayers(nbPlayers);

    let players = [];
    for (let p = 0; p < namePlayers.length; p++) {
        const name = namePlayers[p];
        players.push(new Player(name))
    }

    let mode = await gameMode();

    let game = null;

    switch (mode) {
        case 'World Tour':
            game = new WorldTour(players);
            game.play();
            break;
        case '301':
            game = new The301Game(players);
            game.play();
            break;
        case 'Cricket Game':
            game = new Cricket(players);
            game.play();
            break;
        default:
            break
    }
}

async function numberOfPlayer() {
    return await inquirer.prompt(
        {
            'type': 'number',
            'name': 'nbPlayers',
            'message': 'Please set the number of players ?',
            'default': 2
        },
    ).then((answer) => {
        let { nbPlayers } = answer;
        return nbPlayers
    })
}

async function gameMode() {
    return await inquirer.prompt(
        {
            'type': 'list',
            'name': 'gameMode',
            'choices': ['World Tour', '301', 'Cricket Game'],
            'message': 'Please select your game mode :'
        }
    ).then((answer) => {
        let { gameMode } = answer;
        return gameMode
    })
}

async function nameOfPlayers(nbPlayers) {
    let nameTab = [];
    for (let p = 0; p < nbPlayers; p++) {
        await inquirer.prompt(
            {
                'type': 'input',
                'name': 'playerName',
                'message': `Please set the Player name of player n°${p} : `
            }
        ).then((answer) => {
            nameTab.push(answer.playerName)
        })
    }
    return nameTab
}

startGame();
