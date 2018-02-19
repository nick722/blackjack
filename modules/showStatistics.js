var fs = require('fs');
var askForInput = require('./askForInput');

function readFromFile() {
    fs.readFile('statistics.txt', 'utf8', function (err, content) {
        if (err) throw err;
        console.log(`\n${content}`);
        askForInput();
    });
}

function showStatistics() {
    readFromFile();
}

module.exports = showStatistics;