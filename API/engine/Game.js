const shuffle = require('shuffle-array');

class Game {

    constructor(players) {
        this.players = players;
        this.sector = 20;
        this.win = false;
        this.lose = false
    }

    pickRandomPlayer() {
        shuffle(this.players);
        console.log('Players order :');
        console.table(this.players)
    }

    isPlayable() {
        if (this.players.length <= 1) {
            console.log('You need to be at least 2 players to play');
            return false
        }
        return true
    }

    gameWin(player) {
        console.log(`The winner of the game is : ${player.name} !`);
    }

}

module.exports = Game;
