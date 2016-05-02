var request = require('request');

function reportGenerator(error, response, body){
    var responseObj=JSON.parse(body);    
    //print the game's ID
    console.log("Game ID: " + responseObj.id + "\n=====");
    
    function findTeam(a){
        if(a.team_name==this){
            return true;
        }
        else{
            return false;
        }
    }

    function calculateScore(a, b){
        var bftm = parseInt(b.free_throws_made);
        var bfgm = parseInt(b.field_goals_made);
        var btpm = parseInt(b.three_pointers_made);
        return a+bftm+((bfgm - btpm)*2 + (btpm)*3);
    }
    
    //print out the player with the most rebounds
    function maxRebounds(a, b){
        var aoff = parseInt(a.rebounds_offensive);
        var adef = parseInt(a.rebounds_defensive);
        var boff = parseInt(b.rebounds_offensive);
        var bdef = parseInt(b.rebounds_defensive);
        if(boff+bdef>aoff+bdef){
            return b;
        }
        else{
            return a;
        }
    }
    
    //print out the gaurd with the highest three point percentage
    function isGuard(a){
        if(a.position_short.includes('G')){
            if(parseInt(a.three_pointers_attempted)>=1){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    
    function maxTPP(a, b){
        var atpp = parseFloat(a.three_pointers_made) / parseFloat(a.three_pointers_attempted);
        var btpp = parseFloat(b.three_pointers_made) / parseFloat(b.three_pointers_attempted);
        if(btpp>atpp){
            return b;
        }
        else{
            return a;
        }
    }
    
    function atLeastOneAssist(a,b){
        if(parseInt(b.assists)>0){
            return a+1;
        }
        return a;
    }
    
    function sumFreeThrows(a,b){
        return a+parseInt(b.free_throws_attempted);
    }
    
    function moreTurnsThanAssists(a){
        if(parseInt(a.turnovers)>parseInt(a.assists)){
            return true;
        }
        else{
            return false;
        }
    }
    
    var team1Name=responseObj.players[0].team_name;
    var team2Name=responseObj.players[responseObj.players.length-1].team_name;

    var team1 = responseObj.players.filter(findTeam, team1Name);
    var team2 = responseObj.players.filter(findTeam, team2Name);

    var team1Total=team1.reduce(calculateScore, 0);
    var team2Total=team2.reduce(calculateScore, 0);

    console.log(team1Name+ ' '+team1Total);
    console.log(team2Name+ ' '+team2Total);

    var mostReboundPlayer= responseObj.players.reduce(maxRebounds);
    console.log("* Most rebounds: " + mostReboundPlayer.first_name + ' ' + mostReboundPlayer.last_name+ ' with '+ (parseInt(mostReboundPlayer.rebounds_offensive) + parseInt(mostReboundPlayer.rebounds_defensive)));

    var guards = responseObj.players.filter(isGuard);

    var maxTPPGuard = guards.reduce(maxTPP);
    console.log("* Guard (G) with highest 3 point percentage: "+maxTPPGuard.first_name + ' ' +maxTPPGuard.last_name+ ' at %'+((100.00* parseFloat(maxTPPGuard.three_pointers_made)/parseFloat(maxTPPGuard.three_pointers_attempted)).toFixed(2))+ ' ('+parseInt(maxTPPGuard.three_pointers_made)+ '/'+parseInt(maxTPPGuard.three_pointers_attempted)+')' );

    //print the total number of players with at least one assist
    var playersWithAssists = responseObj.players.reduce(atLeastOneAssist, 0);
    console.log("* There were "+playersWithAssists+" players that had at least one assist");

    //print team that attempted the most free throws
    //still have pacers and hawks arrays, use those with a reduce to find the greater number of free throws

    var team1FT = team1.reduce(sumFreeThrows, 0);
    var team2FT = team2.reduce(sumFreeThrows, 0);

    if(team1FT>team2FT){
        console.log("* "+team1Name+' '+'attempted the most free throws... '+team1Name+': ' + team1FT + ' ' + team2Name+': ' + team2FT);
    }
    else if(team1FT<team2FT){
        console.log("* "+team2Name+' '+'attempted the most free throws... '+team1Name+': ' + team1FT + ' ' + team2Name+': ' + team2FT);
    }
    else{
        //assume there was a tie
        console.log("* The teams attempted the same number of free throws..? "+team1Name+": " + team1FT + ' ' + team2Name+": " + team2FT);
    }

    //print players with more turnovers than assists
    var team1MoreTurns = team1.filter(moreTurnsThanAssists);
    var team2MoreTurns = team2.filter(moreTurnsThanAssists);
    function turnOverPrinter(a){
        console.log("   * "+ a.first_name + ' ' +a.last_name + ' has an assist to turnover ratio of ' + a.assists + ':' + a.turnovers);
    }
    console.log("* "+team1Name+" players with more turnovers than assists: ");
    team1MoreTurns.forEach(turnOverPrinter);
    console.log("* "+team2Name+" players with more turnovers than assists: ");
    team2MoreTurns.forEach(turnOverPrinter);
    if(responseObj.next != ''){
        request(responseObj.next, reportGenerator);
    }
}

request('http://foureyes.github.io/csci-ua.0480-spring2016-010/homework/02/0021500750.json', reportGenerator);
