var fs = require('fs');

var playerVictories = 0;
var dealerVictories = 0;

function welcome() {
    process.stdout.write('\nPress "p" to play the game' +
        '\nPress "s" to show statistics' +
        '\nPress "e" to erase statistics\n');
    process.stdin.on('data', function (data) {
        answer = data.toString().trim();

        if (answer === 'p') {
            console.log('starting the game...');
            playTheGame();
        } else if (answer === 's') {
            console.log('showing statistics...');
            showStatistics();
        } else if (answer === 'e') {
            console.log('erasing statistics...');
            eraseStatistics();
        } else {
            // process.stdout.write('Can\'t recognize your answer, try again:');
            // welcome();
        }
    });
}

function writeToFile () {
    var message = `Victory statistics:\nDealer: ${dealerVictories}\nPlayer: ${playerVictories}`;
    fs.writeFile('statistics.txt', message, (err) => {
        if (err) throw err;
        // console.log(`"${message}" is saved to statistics.txt!`);
    });
}

function readFromFile() {
    fs.readFile('statistics.txt', 'utf8', function (err, content) {
        if (err) throw err;
        console.log(content);
    });
}

function showStatistics() {
    readFromFile();
}

function eraseStatistics() {
    var message = 'Victory statistics:\nDealer: 0\nPlayer: 0';
    fs.writeFile('statistics.txt', message, (err) => {
        if (err) throw err;
        console.log('Statistics is erased');
    });
    process.exit();
}

function playerWins() {
    playerVictories++;
    writeToFile();
    process.exit();
}

function dealerWins() {
    dealerVictories++;
    writeToFile();
    process.exit();
}

function playTheGame() {
    var dealer = [getCard()];
    var player = [getCard(), getCard()];

    if (getSum(player) === 21) {
        process.stdout.write(getStatus(dealer, player));
        process.stdout.write('\nWow! Black Jack right away!\n');
    } else {
        var answer = '';
        cards = 2;
        // do {
        process.stdout.write(getStatus(dealer, player));
        process.stdout.write('\nOne more card? y/n \n');
        process.stdin.on('data', function (data) {
            answer = data.toString().trim();

            if (answer === 'y') {
                player.push(getCard());

                // check for too much or win
                sum = getSum(player);
                process.stdout.write(getStatus(dealer, player) + '\n');
                if (cards === 5) {
                    process.stdout.write('You\'ve taken 5 cards without surpassing 21. You win!\n');
                    playerWins();
                }
                if (sum > 21) {
                    process.stdout.write('That\'s too much, man!\n');
                    dealerWins();
                } else if (sum === 21) {
                    process.stdout.write('Black Jack!\n');
                    playerWins();
                }
            } else if (answer === 'n') {
                // Dealer
                while (getSum(dealer) < 17) {
                    dealer.push(getCard());
                }

                var sumDealer = getSum(dealer);
                var sumPlayer = getSum(player);

                if (sumDealer === 21) {
                    process.stdout.write(getStatus(dealer, player) + '\n' + 'Dealer has a Black Jack!\n');
                    dealerWins();
                } else if (sumDealer > 21) {
                    process.stdout.write(getStatus(dealer, player) + '\n' + 'Dealer has too much!\n');
                    playerWins();
                } else if (sumPlayer === sumDealer) {
                    process.stdout.write(getStatus(dealer, player) + '\n' + 'Draw, Dealer wins!\n');
                    dealerWins();
                } else if (sumPlayer > sumDealer) {
                    process.stdout.write(getStatus(dealer, player) + '\n' + 'You won!\n');
                    playerWins();
                } else {
                    process.stdout.write(getStatus(dealer, player) + '\n' + 'You lost!\n');
                    dealerWins();
                }
            }
        });
        cards++;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCard() {
    var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return cards[getRandomInt(0, cards.length - 1)];

}

function getSum(hand) {
    var sum = 0;

    // calculate every card but aces
    for (var i = 0; i < hand.length; i++) {
        var card = hand[i];
        if (card !== 'A') {
            if (card === 'J' || card === 'Q' || card === 'K') {
                sum = sum + 10;
            } else {
                sum = sum + parseInt(card);
            }
        }
    }

    // ace calculates as 1 if sum is more than 10, otherwise ace is 11
    for (var i = 0; i < hand.length; i++) {
        var card = hand[i];
        if (card === 'A') {
            if (sum > 10) {
                sum = sum + 1;
            } else {
                sum = sum + 11;
            }
        }
        return sum;
    }
}

function getStatus(d, p) {
    return 'Dealer: ' + d.join(' ') + ' Player: ' + p.join(' ') + '.';
}



welcome();





