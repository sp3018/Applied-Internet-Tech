var readlineSync = require('readline-sync');
var cardUtils = require('./cardUtils.js');

var cards;
if(process.argv[2]){
    cards=JSON.parse(process.argv[2]);
}
else{
    cards = cardUtils.shuffle(cardUtils.generateCards());
}

//deal two cards to each player
while(cards.length>26){
    var playerHand=[];
    var computerHand=[];

    playerHand.push(cards.shift());
    playerHand.push(cards.shift());

    computerHand.push(cards.shift());
    computerHand.push(cards.shift());

    var playerPrint=[];
    var computerPrint=[];

    for(var i=0; i<playerHand.length; i++){
        playerPrint.push(playerHand[i].face + '' + playerHand[i].suit);
    }

    for(var j=0; j<computerHand.length; j++){
        computerPrint.push(computerHand[j].face + '' + computerHand[j].suit);
    }

    var cont=' ';
    while(cont != 's'){
        console.log("Your hand is " + playerPrint + " for a total of " + cardUtils.calculateHand(playerHand));
        cont= readlineSync.question('type h to (h)it or s to (s)tay: ');
        if(cont == 'h'){
            var nextCard = cards.shift();
            playerHand.push(nextCard);
            playerPrint.push(nextCard.face + '' + nextCard.suit);
            if((cardUtils.calculateHand(playerHand))>21){
                cont = 's';
            }
        }
        if((cont != 'h') && (cont != 's')){
            console.log("Invalid input, try again");
        }
    }

    var computerValue=cardUtils.calculateHand(computerHand);
    while(computerValue<17){
        var drawnCard=cards.shift();
        computerHand.push(drawnCard);
        computerPrint.push(drawnCard.face + '' + drawnCard.suit);
        computerValue=cardUtils.calculateHand(computerHand);
    }

    console.log("Your hand: " + playerPrint + "(" + cardUtils.calculateHand(playerHand) + ")" + ", Computer hand: " + computerPrint + "(" + computerValue + ")");
    var winner = cardUtils.determineWinner(cardUtils.calculateHand(playerHand), cardUtils.calculateHand(computerHand));
    console.log(winner + " wins");

    console.log("There are "+cards.length+" cards left in the deck");
    console.log("____________________");
    console.log();
}

console.log("Less than 26 cards left. Game over!");
