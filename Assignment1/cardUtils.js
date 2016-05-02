exports.generateCards = function (){
    var cardList = [];
    var suits = ['♠', '♥', '♦', '♣'];
    var faces = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    for(var i=0; i<4; i++){
        for(var j=0; j<13; j++){
            cardList.push({suit: suits[i], face: faces[j]});
        }
    }
    return cardList;
}

exports.shuffle = function(array){
    var temp= 0;
    for(var i=0; i<52; i++){
        var startIndex=Math.floor(Math.random()*(53-i));
        var endIndex=52-i-1;
        temp=array[endIndex];
        array[endIndex]=array[startIndex];
        array[startIndex]=temp;
    }
    return array;
}

exports.calculateHand = function(array){
    function translateValue(letter){
        var value=0;
        switch(letter){
            case '2':
                value=2;
                break;
            case '3':
                value=3;
                break;
            case '4':
                value=4;
                break;
            case '5':
                value=5;
                break;
            case '6':
                value=6;
                break;
            case '7':
                value=7;
                break;
            case '8':
                value=8;
                break;
            case '9':
                value=9;
                break;
            case '10':
                value=10;
                break;
            case 'J':
                value=10;
                break;
            case 'Q':
                value=10;
                break;
            case 'K':
                value=10;
                break;
            case 'A':
                value=11;
                break;
        }
        return value;
    }
    var total=0;
    var aCount=0;
    for(var i=0; i<array.length; i++){
        total=total+translateValue(array[i].face);
        if(array[i].face=='A'){
            aCount=aCount+1;
        }
    }
    while(((total>21) && (aCount>0))){
        total=total-10;
        aCount-=1;
    }
    return total;
}

exports.determineWinner=function (player, computer){
    if((player>21 && computer>21)){
        return 'Tie';
    }
    if(player>21 && computer<21){
        return 'Computer';
    }
    if(player<21 && computer>21){
        return 'Player';
    }
    if(player<21 && computer<21){
        if(player>computer){
            return 'Player';
        }
        else if(player<computer){
            return 'Computer';
        }
        else if(player==computer){
            return 'Tie';
        }
    }
}


