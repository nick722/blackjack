var fs = require('fs');

let playerVictories = 0;
let dealerVictories = 0;

function askForInput() {
    process.stdout.write('\nPress "p" to play the game' +
        '\nPress "s" to show statistics' +
        '\nPress "e" to erase statistics\n');
}

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

function writeToFile () {
    var message = `\nVictory statistics:\nDealer: ${dealerVictories}\nPlayer: ${playerVictories}`;
    fs.writeFile('statistics.txt', message, (err) => {
        if (err) throw err;
    });
}

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

function eraseStatistics() {
    playerVictories = 0;
    dealerVictories = 0;
    writeToFile();
    console.log('\nStatistics is erased');
    console.log('dealerVictories: ', dealerVictories, 'playerVictories: ', playerVictories);
    askForInput();
}

function playerWins() {
    playerVictories++;
    console.log('\nScore\nDealer: ', dealerVictories, '\nPlayer:', playerVictories);
    writeToFile();
    askForInput();
}

function dealerWins() {
    dealerVictories++;
    console.log('\nScore\nDealer: ', dealerVictories, '\nPlayer:', playerVictories);
    writeToFile();
    askForInput();
}

function playTheGame() {
    var dealer = [getCard()];
    var player = [getCard(), getCard()];

    if (getSum(player) === 21) {
        process.stdout.write(getStatus(dealer, player));
        process.stdout.write('\nWow! Black Jack right away!\n');
        playerWins();
    } else {
        var answer = '';
        cards = 2;
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
                    // welcome();
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
        console.log('cards: ', cards);

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
    return '\nDealer: ' + d.join(' ') + ' Player: ' + p.join(' ') + '.\n';
}

askForInput();
getInput();





