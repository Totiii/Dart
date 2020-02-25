const shuffle = require('shuffle-array');

class Game {

    constructor(players) {
        this.players = players;
        this.sector = 1;
        this.win = false;
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
        console.table(this.players)
    }

}

module.exports = Game;
