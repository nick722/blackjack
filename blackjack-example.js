function Card(s, n) {
    var suit = s;
    var number = n;
    this.getNumber = function() {
        return number;
    };
    this.getSuit = function() {
        return suit;
    };
    this.getValue = function() {
        if (number > 10)
            return 10;
        else if (number === 1)
            return 11;
        else
            return number;
    };
}

var deal = function() {
    var suit = Math.floor(Math.random() * 4) + 1;
    var number = Math.floor(Math.random() * 13) + 1;
    var myCard = new Card(suit, number);
    return myCard;
};

function Hand() {
    var cards = [deal(), deal()];
    this.getHand = function() {
        return cards;
    };
    this.score = function() {
        var myScore = 0;
        for (var i = 0; i < cards.length; i++)
            myScore += cards[i].getValue();
        for (var a = 0; a < cards.length && myScore > 21; a++) {
            if (cards[a].getValue() === 11)
                myScore -= 10;
        }
        return myScore;
    };
    this.printHand = function() {
        var myHand = "";
        var numberArray = [];
        var suitArray = [];
        for (var i = 0; i < cards.length; i++) {
            switch(cards[i].getNumber()) {
                case 1:
                    numberArray.push("ace");
                    break;
                case 11:
                    numberArray.push("jack");
                    break;
                case 12:
                    numberArray.push("queen");
                    break;
                case 13:
                    numberArray.push("king");
                    break;
                default:
                    numberArray.push(cards[i].getNumber());
            }
            switch(cards[i].getSuit()) {
                case 1:
                    suitArray.push("spades");
                    break;
                case 2:
                    suitArray.push("hearts");
                    break;
                case 3:
                    suitArray.push("diamonds");
                    break;
                case 4:
                    suitArray.push("clubs");
                    break;
            }
            myHand += numberArray[i] +" of " +suitArray[i];
            if (i < cards.length - 1)
                myHand += ", ";
        }
        /*
        for (var i = 0; i < cards.length; i++) {
            myHand += cards[i].getNumber() +" of suit " +cards[i].getSuit();
            if (i < cards.length - 1)
                myHand += ", ";
        }*/
        return myHand;
    };
    this.hitMe = function() {
        cards.push(deal());
    };
}

var playAsDealer = function() {
    var dealerHand = new Hand();
    while (dealerHand.score() < 17) {
        dealerHand.hitMe();
    }
    return dealerHand;
};

var playAsUser = function() {
    var userHand = new Hand();
    var decision = confirm("Welcome to the Blackjack Palace.\nYour hand is: "+ userHand.printHand() + ". Hit?");
    while(decision) {
        userHand.hitMe();
        decision = confirm("Your hand is: "+ userHand.printHand() +". Hit?");
    }
    return userHand;
};

var declareWinner = function(userHand, dealerHand) {
    if (userHand.score() > 21) {
        if (dealerHand.score() > 21)
            return "You tied!";
        else
            return "You lose!";
    }
    else if (dealerHand.score() > 21)
        return "You win!";
    else {
        if (userHand.score() > dealerHand.score())
            return "You win!";
        else if (userHand.score() === dealerHand.score())
            return "You tied!";
        else if (userHand.score() < dealerHand.score())
            return "You lose!";

    }
};

var playGame = function() {
    var userHand = playAsUser();
    var dealerHand = playAsDealer();
    console.log(declareWinner(userHand, dealerHand));
    console.log("\nScores:");
    if (userHand.score() > 21)
        console.log("User: " +userHand.score() +" (went over)");
    else
        console.log("User: " +userHand.score());
    if (dealerHand.score() > 21)
        console.log("Dealer: " +dealerHand.score() +" (went over)");
    else
        console.log("Dealer: " +dealerHand.score());
    console.log("\nYour hand:\n" +userHand.printHand());
    console.log("Dealer's hand:\n" +dealerHand.printHand());
};

playGame();