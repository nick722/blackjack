var fs = require('fs');
var score = require('./score');

function writeToFile () {
    var message = `\nVictory statistics:\nDealer: ${score.dealer}\nPlayer: ${score.player}`;
    fs.writeFile('statistics.txt', message, (err) => {
        if (err) throw err;
    });
}

module.exports = writeToFile;