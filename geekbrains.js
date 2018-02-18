function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCard() {
    var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    return cards[getRandomInt(0, cards.length - 1)];

}


function getSum(hand) {
    var sum = 0;

    // calculate every card but aces
    for (var i=0; i<hand.length; i++ ) {
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
    for (var i=0; i < hand.length; i++) {
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

function getStatus() {
    return 'Dealer: ' + dealer.join(' ') + ' Player: ' + player.join(' ') + '.'
}

var dealer = [getCard()];
var player = [getCard(), getCard()];

if (getSum(player) === 21) {
    process.stdout.write(getStatus());
    process.stdout.write('\nWow! Black Jack right away!\n');
} else {
    var answer = '';
    cards = 2;
    do {
        process.stdout.write(getStatus());
        process.stdout.write('\nOne more card? y/n \n');
        process.stdin.on('data', function (data) {
             answer = data.toString().trim();

            if (answer === 'y') {
                player.push(getCard());
            }

            // check for too much or win
            sum = getSum(player);
            process.stdout.write(getStatus() + '\n');
            if (cards === 5) {
                process.stdout.write('You\'ve taken 5 cards without surpassing 21. You win!\n' );
                process.exit();
            }
            if (sum > 21) {
                process.stdout.write('That\'s too much, man!\n');
                 process.exit();
            } else if (sum === 21) {
                process.stdout.write('Black Jack!\n' );
                process.exit();
            }
        });
        cards++;
    } while (answer === 'y');
}





