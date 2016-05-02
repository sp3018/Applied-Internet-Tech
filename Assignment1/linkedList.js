function arrayToList(a){
    //assume that a is an array
    var arraySize=a.length;
    var list = null;
    for(var i=0; i<arraySize; i++){
        list = {value:a[arraySize-1-i], rest:list};
    }
    return list;
}

function listToArray(a){
    //assume that a is a list
    var array = [];
    for(var node = a; (node != null); node=node.rest){
        array.push(node.value);
    }
    return array;
}

function prepend(val, list){
    var prependedList=list;
    prependedList= {value:val , rest:prependedList};
    return prependedList;
}

function nth(list, number){
    for(var i=0; i<number; i++){
        list=list.rest;
    }
    if(list.value != null){
        return list.value;
    }
    else if(list.value == null){
        return undefined;
    }
}

console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));
