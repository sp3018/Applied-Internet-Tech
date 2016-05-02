function range(a, b, c){
    var numList=[];
    a || undefined;
    b || undefined;
    c || undefined;
    if(c != undefined){
        //at least three valid args found
        if((b-a)>0){
            //b is greater than a
            if(c>0){
                for(var i=a; i<b; i=i+c){
                    numList.push(i);
                }
            }
            else if(c<0 || c==0){
                //can't go in direction, return empty array
            }
        }
        else if((b-a)<0){
            //b is less than a
            if(c<0){
                for(var i=a; i>b; i=i+c){
                    numList.push(i);
                }
            }
            else if(c>0 || c==0){
                //can't go in direction, return empty array
            }
        }
        else{
            //b is equal to a
            numList.push(b);
        }
    }
    else if(b != undefined){
        //two agrs found
        if((b-a)>0){
            //b is greater than a
            for(var i=a; i<b; i++){
                numList.push(i);
            }
        }
        else if((b-a)<0){
            //b is less than a
            for(var i=a; i>b; i--){
                numList.push(i);
            }
        }
        else{
            //b is equal to a
            numList.push(b);
        }
    }
    else if(a != undefined){
        //one arg found
        if(a>0){
            for(var i=0; i<a; i++){
                numList.push(i);
            }
        }
        else if(a<0){
            for(var i=0; i>a; i--){
                numList.push(i);
            }
        }
        else{
            //must be 0
            0;
        }
    }
    else{
        //no valid args
    }
    return numList;
}


console.log(range(5));
console.log(range(2, 5));
console.log(range(2, 9, 2));
console.log(range(5, 0, -1));
console.log(range(6, -1, -2));
console.log(range(6, -1, 1));
