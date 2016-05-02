document.addEventListener("DOMContentLoaded", function(event){
	document.getElementById("error-message").classList.add("hidden");
	var startButton = document.getElementsByTagName("button")[0];
	startButton.addEventListener('click', function(event){
		//reveal the game div
		var game=document.getElementById("game")
		game.classList.remove("hidden");
		var cpuResult=generateCPUScore();
		var cpuScore=cpuResult[0];
		var scorePrinter=cpuResult[1];
		game.appendChild(createElementWithValue("p",scorePrinter));
		game.appendChild(createElementWithValue("p","Your Score: 0", "PScore"));
		
		//hide the start button
		startButton.classList.add("hidden");
		//create a container for dice
		var diceContainer = createElementWithValue("div", "");
		diceContainer.setAttribute("id", "diceContainer");
		game.appendChild(diceContainer);
		var diceContainer = document.getElementById("diceContainer");
		var NUMDICE=5;
		for(var i=0; i<NUMDICE; i++){
			var tempDie = createElementWithValue("button", "");
			tempDie.setAttribute("id", i+1);
			tempDie.setAttribute("data-pinned", "false");
			tempDie.classList.add("dice");
			diceContainer.appendChild(tempDie);
		}
		//create other buttons
		game.appendChild(createElementWithValue("p", ""));
		game.appendChild(createElementWithValue("button", "Roll", "Roll"));
		game.appendChild(createElementWithValue("button", "Pin", "Pin"));
		document.getElementById("Pin").setAttribute("disabled", "disabled");
		var rollButton = document.getElementById("Roll");
		
		
		var addedListeners=false;
		var dice=document.getElementsByClassName("dice");
		for(var i=0; i<dice.length; i++){
			dice[i].addEventListener('click', complainListener);
		}
		
		//select or deselect button based on clicks
		rollButton.addEventListener('click', function(event){
			var dice=document.getElementsByClassName("dice");
			for(var i=0; i<dice.length; i++){
				if(dice[i].getAttribute("data-pinned")==="false"){
					dice[i].innerHTML=(Math.floor((Math.random() * 6) + 1));
					dice[i].removeEventListener('click', complainListener);
					if(dice[i].getAttribute("data-pinned")==="false"){
						dice[i].addEventListener('click', selectListener);
					}
				}
		}
			addedListeners=true;
			document.getElementById("Roll").setAttribute("disabled", "disabled");
			document.getElementById("Pin").removeAttribute("disabled");
		});
		
		//pin a button or not based on whether or not it's selected and currently unpinned
		var pinButton = document.getElementById("Pin");
		pinButton.addEventListener('click', function(event){
			var dice=document.getElementsByClassName('dice');
			var somethingPinned = false;
			for(var i=0; i<dice.length; i++){
				if(dice[i].getAttribute("data-pinned")==="false"){
					if(dice[i].classList.contains("selected")){
						dice[i].setAttribute("data-pinned", "true");
						somethingPinned=true;
					}
				}
			}
			if(somethingPinned){
				var playerScore=0;
				var allPinned=true;
				for(var i=0; i<dice.length; i++){
					dice[i].removeEventListener('click', selectListener);
					if(dice[i].classList.contains("selected")===false){
						dice[i].innerHTML="";
						dice[i].addEventListener('click', complainListener);
					}
					if(dice[i].getAttribute("data-pinned")==="true"){
						if(parseInt(dice[i].innerHTML)!==3){
							playerScore+=parseInt(dice[i].innerHTML);
						}
					}
					else{
						allPinned=false;
					}
				}
				document.getElementById("PScore").innerHTML="Your Score: "+playerScore;
				if(allPinned){
					if(cpuScore>playerScore){
						game.appendChild(createElementWithValue("p","You won", "winner"));
					}
					else if(playerScore>cpuScore){
						game.appendChild(createElementWithValue("p","You lost", "loser"));
					}
					else{
						game.appendChild(createElementWithValue("p","You tied", "tire"));
					}
					document.getElementById("Pin").setAttribute("disabled", "disabled");
				}
				else{
					document.getElementById("Pin").setAttribute("disabled", "disabled");
					document.getElementById("Roll").removeAttribute("disabled");
				}
				
			}
			else{
				alert("You must select a die before pinning");
			}
		});
	});
	
});

function generateCPUScore(){
	var dice = [];
	for(var i=0; i<5;i++){
		dice.push(Math.floor((Math.random() * 6) + 1));
	}
	var cpuScore=0;
	var diceVal=0;
	var scorePrinter = "Computer Score: "
	for(var i=0; i<5;i++){
		if(dice[i]===3){
			diceVal=0;
		}
		else{
			diceVal=dice[i];
		}
		cpuScore+=diceVal;
		
		if(i!==4){
			scorePrinter += ""+diceVal+" ("+dice[i]+") + ";
		}
		else{
			scorePrinter += ""+diceVal+" ("+dice[i]+") = ";
		}
	}
	scorePrinter+=cpuScore;
	return [cpuScore, scorePrinter];
};

function createElementWithValue(elementType, contents, id=""){
	var tagType = document.createElement(elementType);
	var content = document.createTextNode(contents);
	tagType.appendChild(content);
	if(id!=""){
		tagType.setAttribute("id", id);
	}
	return tagType;
}

function selectListener(event, dice){
	if(this.classList.contains("selected")){
		this.classList.remove("selected");
	}
	else{
		this.classList.add("selected");
	}
};

function complainListener(event){
	alert("Wait until a value is rolled before selecting");
}