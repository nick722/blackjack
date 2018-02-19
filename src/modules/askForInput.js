function askForInput() {
    process.stdout.write('\nPress "p" to play the game' +
        '\nPress "s" to show statistics' +
        '\nPress "e" to erase statistics\n');
}

module.exports = askForInput;