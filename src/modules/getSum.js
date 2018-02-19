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

module.exports = getSum;