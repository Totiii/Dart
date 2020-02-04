const Game = require('../../engine/Game');

class The301Game extends Game {

    constructor(players, win) {
        super(players, win);
    }

    async play() {
        this.pickRandomPlayer();

        for (let p = 0; p < this.players.length; p++) {
            this.players[p].score = 301;
        }

        while(!this.win) {
            if (!this.isPlayable()) {
                break
            }
            for (let p = 0; p < this.players.length; p++) {
                let player = this.players[p];

                if (player.cantPlay == true){
                    continue
                }
                console.log('It\'s your turn :' + player.name);
                console.log('Your actual Score :' + player.score);

                for (let s = 0; s < 3; s++) {
                    let rip = false; // used when we need to keep the score before the shoot
                    let scoreBeforeShot = 0;
                    
                    var shot = await player.multiplierShot();

                    if (player.score - (shot.theSector * shot.theMultiplier) == 0 && shot.theMultiplier !== 2) {
                        rip = true;
                        console.log('Your last shot has to be a double ! Unlucky...')
                    }else if (player.score - (shot.theSector * shot.theMultiplier) == 1) {
                        player.score -= (shot.theSector * shot.theMultiplier);
                        player.cantPlay = true;
                        console.log(`${player.name} is now out of the game !`);
                        break
                    }else if (player.score - (shot.theSector * shot.theMultiplier) < 0) {
                        rip = true;
                        scoreBeforeShot = player.score;
                        console.log('Better luck next time ! ')
                    }else if (!rip && player.score > 0) {
                        player.score -= (shot.theSector * shot.theMultiplier);
                    } else {
                        player.score = scoreBeforeShot;
                        break
                    }

                    console.log('Score :' + player.score);

                    if(player.score == 0) {
                        this.win = true;
                        var winner = player;
                        player.cantPlay = true;
                        break
                    }
                }

                if(this.win) {
                    this.gameWin(winner);
                    break
                }
            }
        }
    }

}

module.exports = The301Game;