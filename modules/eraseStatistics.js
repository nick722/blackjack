var score = require('./score');
var writeToFile = require('./writeToFile');
var askForInput = require('./askForInput');

function eraseStatistics() {
    score.player = 0;
    score.dealer = 0;
    writeToFile();
    console.log('\nStatistics is erased');
    console.log('dealerVictories: ', score.dealer, 'playerVictories: ', score.player);
    askForInput();
}

module.exports = eraseStatistics;