const Game = require('../game/Game');

class WorldTour extends Game {

    constructor(players, sector, win) {
        super(players, sector, win);
        this.sector = []
    }

    async play() {
        this.pickRandomPlayer();

        for (let i = 0; i < this.players.length; i++) {
            this.sector.push(1)
        }

        while(!this.win) {
            if (!this.isPlayable()) {
                break
            }
            for (let p = 0; p < this.players.length; p++) {
                let player = this.players[p];
                console.log('It\'s your turn :' + player.name);

                for (let s = 0; s < 3; s++) {
                    console.log('Your sector ' +  this.sector[p]);
                    var shot = await player.shot();

                    if (this.sector[p] == shot.theSector) {
                        this.sector[p]++;
                        player.score++
                    }

                    if(this.sector[p] == 21) {
                        this.win = true;
                        break
                    }

                }

                if(this.win) {
                    this.gameWin(player);
                    break
                }
            }
        }
    }

}

module.exports = WorldTour;
