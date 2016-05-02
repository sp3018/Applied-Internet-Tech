cards = [{'suit':'♦', 'face':'4'},
             {'suit':'♠', 'face':'J'},
             {'suit':'♠', 'face':'Q'},
             {'suit':'♣', 'face':'Q'},
             {'suit':'♠', 'face':'2'},
             {'suit':'♦', 'face':'7'},
             {'suit':'♥', 'face':'K'}];

//forEach
var count=0;
cards.forEach(function(card){
    if(isNaN(card.face)) {
        count+= 1;
    }
});
console.log(count);

//filter
var filtered = cards.filter(function(card){
    if(isNaN(card.face)) {
        return true;
    }
    else{
        return false;
    }
});
console.log(filtered.length);

//reduce
var count2=0;
var reduced = cards.reduce(function(accum, ele){
    if(isNan(card.face)){
        count2+=1;
    }
},0);

console.log(reduced.length);
