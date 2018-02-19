var writeToFile = require('./writeToFile');
var askForInput = require('./askForInput');
var score = require('./score');

function playerWins() {
    score.player++;
    console.log('\nScore\nDealer: ', score.dealer, '\nPlayer:', score.player);
    writeToFile();
    askForInput();
}

module.exports = playerWins;