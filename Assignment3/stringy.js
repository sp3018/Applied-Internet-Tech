//stringy.js



function MutableString(s){
    this.string = s;
}

MutableString.prototype.concat = function(s){
    this.string += s;
}

MutableString.prototype.validIndex = function(i){
    if(i<0){
        if(this.string.length >= Math.abs(i)){
            return true;
        }
        else{
            return false;
        }
    }
    //the index was >=0
    if(this.string.length >= Math.abs(i)+1){
        return true;
    }
    else{
        return false;
    }
}

MutableString.prototype.charAt = function(i){
    if(this.validIndex(i) == true){
         if(i>=0){
            return this.string[i];
         } 
         else{
            return this.string[this.string.length - Math.abs(i)];
         }
    }
    //invalid index
    else{
        return undefined;
    }
}

MutableString.prototype.set = function(){
    var index=0;
    var new_ch="";
    var new_String="";
    for(var i=0; (i<=arguments.length-2); i=i+2){
        index = arguments[i];   
        new_ch = arguments[i+1];
        if(this.validIndex(index) == true){
            if(index<0){
                index = this.string.length - Math.abs(index);
            }
            for(var j = 0; j<this.string.length;j++){
                if(j!=index){
                    new_String += this.string[j];
                }
                else{
                    new_String += new_ch;
                }
            }
            this.string = new_String;
            new_String = "";    
        }
    }
}

MutableString.prototype.toString = function(){
    return this.string;
}

MutableString.prototype.toCharArray = function(){
    return (this.string.split(''));
}

function palinException(s){
    this.message = s;
    this.name = "palinException";
}

function Palindrome(s){
    this.string = '';
    if(isPalin(s) ==  true){
        this.string = s;
    }
    else{
        throw new palinException("Not a palindrome");
    }
}

var isPalin = function(s){
    var mid = Math.floor(s.length/2);
    if((s.length%2)==0){
        for(var i=0; i<mid; i++){
            if(s.charAt(i) != s.charAt(s.length-i-1)){
                return false;
            }
        }
    }
    else{
        for(var i=0; i<=mid-1; i++){
            if(s.charAt(i) != s.charAt(s.length-i-1)){
                return false;
            }
        }
    }
    return true;
}
Palindrome.prototype = Object.create(MutableString.prototype);
Palindrome.constructor.prototype = Palindrome;

Palindrome.prototype.set = function(){
    var index=0;
    var new_ch="";
    var new_String="";
    var origin_String = this.string;
    for(var i=0; (i<=arguments.length-2); i=i+2){
        index = arguments[i];   
        new_ch = arguments[i+1];
        if(this.validIndex(index) == true){
            if(index<0){
                index = this.string.length - Math.abs(index);
            }
            for(var j = 0; j<this.string.length;j++){
                if(j!=index){
                    new_String += this.string[j];
                }
                else{
                    new_String += new_ch;
                }
            }
            this.string = new_String;
            new_String = "";    
        }
    }
    if(isPalin(this.string) == false){
        this.string = origin_String;
        throw new palinException("Result from set not a palindrome");
    }
}

Palindrome.prototype.concat = function(s){
    var origin_String = this.string;
    this.string += s;
    if(isPalin(this.string) == false){
        this.string = origin_String;
        throw new palinException("Result from concat not a palindrome");
    }
}


module.exports.Palindrome = Palindrome;
module.exports.MutableString = MutableString;
