var getCard = require('./getCard');
var getStatus = require('./getStatus');
var getSum = require('./getSum');
var playerWins = require('./playerWins');
var dealerWins = require('./dealerWins');

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

module.exports = playTheGame;