var playTheGame = require('./playTheGame');
var showStatistics = require('./showStatistics');
var eraseStatistics = require('./eraseStatistics');

function getInput() {
    process.stdin.on('data', function (data) {
        answer = data.toString().trim();

        if (answer === 'p') {
            console.log('\nstarting the game...');
            playTheGame();
        } else if (answer === 's') {
            console.log('\nshowing statistics...');
            showStatistics();
        } else if (answer === 'e') {
            console.log('\nerasing statistics...');
            eraseStatistics();
        }
    });
}

module.exports = getInput;