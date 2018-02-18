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
            if (card === 'j' || card === 'Q' || card === 'K') {
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

var answer = '';
do {
    process.stdout.write('One more card? y/n \n');
    process.stdin.on('data', function (data) {
        // process.stdout.write('You entered: '+ data.toString().trim() + '\n');
        answer = data.toString().trim();
        console.log('Your answer is ', answer);

        if (answer === 'y') {
            player.push(getCard());
        }

        // chedck for too much or win
        sum = getSum(player);
        if (sum > 21) {
            process.stdout.write('Too much \n' + getStatus());
        } else if (sum === 21) {
            process.stdout.write('\n Black Jack! \n' + getStatus());
        }

        console.log(getStatus());
    });

    // if (answer === 'y') {
    //     player.push(getCard());
    // }
    //
    // // chedck for too much or win
    // sum = getSum(player);
    // if (sum > 21) {
    //     process.stdout.write('\n Too much \n' + getStatus());
    //     break;
    // } else if (sum === 21) {
    //     process.stdout.write('\n Black Jack! \n' + getStatus());
    //     break;
    // }
    //
    // console.log(getStatus());
} while (answer === 'y');

