var writeToFile = require('./writeToFile');
var askForInput = require('./askForInput');
var score = require('./score');

function dealerWins() {
    score.dealer++;
    console.log('\nScore\nDealer: ', score.dealer, '\nPlayer:', score.player);
    writeToFile();
    askForInput();
}

module.exports = dealerWins;