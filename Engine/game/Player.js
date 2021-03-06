const inquirer = require('inquirer');

class Player {

    constructor(name) {
        this.name = name;
        this.score = 0;
        this.cantPlay = false
    }

    async shot() {
        return await inquirer.prompt(
            {
            type: 'number',
            name: 'theSector',
            message: `${this.name} : Shot Score :`,
            validate: function(value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'The sector has to be a number';
            },
            filter: Number
        }).then((answer) => {
            console.log("You just hit the sector : " + answer['theSector']);
            return answer
        })
    }


    async multiplierShot() {
        return await inquirer.prompt([
            {
                type: 'number',
                name: 'theSector',
                message: `${this.name} : Shot Score :`,
                validate: function(value) {
                    var valid = !isNaN(parseFloat(value));
                    return valid || 'The sector has to be a number';
                },
                filter: Number
            },
            {
                type: 'number',
                name: 'theMultiplier',
                message: `Multiplier :`,
                validate: function(value) {
                    var valid = !isNaN(parseFloat(value));
                    return valid || 'The multiplier has to be a number';
                },
                filter: Number
            }
            ]).then((answer) => {
            console.log("You just hit the sector : " + answer['theSector'] + " and your multiplier was : " + answer['theMultiplier']);
                return answer
            })
    }

}

module.exports = Player;
