// exercises-ch05.js
function flattening(array){
//flattens input array of arrays    
    flatArr = array.reduce(function(a , b){
        return a.concat(b);
    }, []);
    return flatArr;
}

function every(array, func){
//checks if every element in the array returns true for function
    var everyTrue=true;
    for(var i=0; i<array.length; i++){
        if(func(array[i]) == false){
            everyTrue=false;
        }
    }
    return everyTrue;
}

function some(array, func){
//checks if any element in the array returns true for function
    var someTrue=false;
    for(var i=0; i<array.length; i++){
        if(func(array[i]) == true){
            someTrue = true;
        }
    }
    return someTrue;
}

var tester = [[2,4,6],[8],[10,12]];
tester = flattening(tester);
console.log(tester);

var tester2= [1,3,5,8];
var checker2= every(tester2, function(a){
                   if(a<10){
                       return true;
                   }
                   else{
                       return false;
                   }
                });
var checker3= some(tester2, function(a){
                      if(a%2 == 0){
                        return true;
                      }
                      else{
                        return false;
                      }
});
console.log(checker2);
console.log(checker3);
