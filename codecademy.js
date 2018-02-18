/*
https://www.codecademy.com/courses/blackjack-part-1/1/6
*/

// Our deal function will return a random card
var deal = function() {
    card = Math.floor(Math.random()*52+1);
    // if (1 <= card && card <= 13) {
    //     card = `${card} of Hearts`;
    // } else if (14 <= card && card <= 26 ) {
    //     card = `${card / 2 } of Diamonds`;
    // } else if (27 <= card && card <= 39 ) {
    //     card = `${card / 3 } of Spades`;
    // } else if (40 <= card && card <= 53 ) {
    //     card = `${card / 4 } of Clubs`;
    // }
    return card;
};

// Deal out our first hand
var card1 = deal();
var card2 = deal();

// This function takes a card as a parameter and returns the value
// of that card
var getValue = function(card) {
    // if its a face card, number should be set to 10
    if( card % 13 === 0 ||
        card % 13 === 11 ||
        card % 13 === 12) {
        return 10;
    }
    // What if it's an ace?
    else if (card % 13 === 1) {
        return 11;
    }

    // Otherwise, we just want its number value
    else {
        return card % 13;
    }
}

// Score the hand
function score() {
    return getValue(card1) + getValue(card2);
}

console.log("You have cards " + card1 + " and " + card2 +
    " for a score of " + score(card1, card2));