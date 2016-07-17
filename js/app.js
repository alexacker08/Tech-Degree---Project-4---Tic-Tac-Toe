var ticTacToe = (function(){
	var board = document.getElementById('board');
	var finish = document.getElementById('finish');
	var start = document.getElementById('start');
	var startButtonPlayer1 = start.querySelector('.player1Insert');
	var humanChoice = document.getElementById('human');
	var computerChoice = document.getElementById('computer');	
	var startButtonReady = start.querySelector('.ready');
	var startAgainButton = finish.querySelector('a');
	var box = document.getElementsByClassName('box');
	var gameType;
	var player1;
	var player2;
	var turn = ['No','Yes'];
	var symbol = ['box-filled-1', 'box-filled-2'];
	var activeSymbol = symbol[0];
	var boxArray = [];
	var count = 0;


	/* Elements to Run on first load of the file */
	start.classList.add('visible');
	startButtonPlayer1.classList.add('visible');
	
	var index = 1;
	//Add an index to each box on the board
	for(var i = 0; i < box.length; i++){
		box[i].classList.add(index);
		index++;
	}

	//Apply click and hover listeners to the box functions
	for(var x = 0; x < box.length; x++){
		hoverBoxes(box[x]);
		clickBoxes(box[x]);
	}

	//Apply click listenrs to the game type (Human vs Computer) options
	opponentType(humanChoice);
	opponentType(computerChoice);

	//HIDE ELEMENTS WITH OPACITY EFFECT
	function displayNone(element){
		element.classList.remove('visible');

		setTimeout(function(){
			element.style.display = "none";

		}, 500);
	}

	//DISPLAY ELEMENTS WITH OPACITY EFFECT
	function displayBlock(element){
		element.style.display = "block";

		setTimeout(function(){
			element.classList.add('visible');

		}, 30);
	}

	//Applies click listeners to the game type (Human vs Computer) options during the name creation phases
	function opponentType(element){
		element.addEventListener('click', function(){
			gameType = element.innerHTML; 
			if(element.classList.contains('active')){
				element.classList.remove('active');
			} else {
				element.classList.add('active');
			}

			if(element.nextElementSibling){
				if(element.nextElementSibling.classList.contains('active')){
					element.nextElementSibling.classList.remove('active')
				}
			}

			if(element.previousElementSibling){
				if(element.previousElementSibling.classList.contains('active')){
					element.previousElementSibling.classList.remove('active');
				}
			}
		});
	}


	/* New Player Objects*/ 
	function newPlayer(playerNumber, firstName, lastName, turnStatus, symbol, playerType){
		this.playerNumber = playerNumber;
		this.firstName = firstName;
		this.lastName = lastName;
		this.turnStatus = turnStatus;
		this.symbol = symbol;
		this.playerType = playerType;

	}

	/* newPlayer prototype for changing turns*/ 
	newPlayer.prototype.changeTurn = function(){
		if(this.turnStatus === "No"){
			this.turnStatus = "Yes";
		} else if(this.turnStatus === "Yes"){
			this.turnStatus = "No";
		}
	}

	//Object constructor for the boxes objects. This will be used to determine what boxes have what symbols and if they are simply filled or not.
	function boxes(number, filled, symbol){
		this.number = number;
		this.filled = filled;
		this.symbol = symbol;

	}

	//Creates an Object for each box and stores it in the BoxArray "array" so that it can be accessed later
	//via indexing
	for(var i = 1; i <= box.length; i++){
		var boxTemp = new boxes(i, false, "none");
		boxArray.push(boxTemp);
	}


	//This changes the "turn" box in the upper right and left parts of the body
	function statusChange(){

		var player1Id = document.getElementById('player1');
		var player2Id = document.getElementById('player2');

		if(player1.turnStatus === "Yes"){
			player2Id.classList.remove('active');
			player1Id.classList.add('active');
		} else if(player2.turnStatus === "Yes") {
			player1Id.classList.remove('active');
			player2Id.classList.add('active');
		}
	}

	//This applies the symbol hover effect when a user is deciding on which box to click on
	function hoverBoxes(element){
		element.addEventListener('mouseenter', function(){
			if(!element.classList.contains('filled')){
				element.classList.add(activeSymbol);
			} else {
				return false;
			}

		});

		element.addEventListener('mouseleave', function(){
			if(!element.classList.contains('filled')){
				element.classList.remove(activeSymbol);
			} else {
				return false;
			}
		});
	}

	//Check to see if the box symbols contain the "X" character in the appropriate order
	function player2GameCheck(){
		//HORIZONTAL
		if(boxArray[0].symbol === "X" && boxArray[1].symbol === "X" && boxArray[2].symbol === "X"){
			return true;
		} else if(boxArray[3].symbol === "X" && boxArray[4].symbol === "X" && boxArray[5].symbol === "X"){
			return true;
		} else if(boxArray[6].symbol === "X" && boxArray[7].symbol === "X" && boxArray[8].symbol === "X"){
			return true;

		//VERTICAL		
		} else if(boxArray[0].symbol === "X" && boxArray[3].symbol === "X" && boxArray[6].symbol === "X"){
			return true;
		} else if(boxArray[1].symbol === "X" && boxArray[4].symbol === "X" && boxArray[7].symbol === "X"){
			return true;
		} else if(boxArray[2].symbol === "X" && boxArray[5].symbol === "X" && boxArray[8].symbol === "X"){
			return true;

		//DIAGNAL	
		} else if(boxArray[0].symbol === "X" && boxArray[4].symbol === "X" && boxArray[8].symbol === "X"){
			return true;
		} else if(boxArray[2].symbol === "X" && boxArray[4].symbol === "X" && boxArray[6].symbol === "X"){
			return true;
		} else {
			return false; 
		}	
	}

	//Check to see if the box symbols contain the "O" character in the appropriate order
	function player1GameCheck(){
		//HORIZONTAL
		if(boxArray[0].symbol === "O" && boxArray[1].symbol === "O" && boxArray[2].symbol === "O"){
			return true;
		} else if(boxArray[3].symbol === "O" && boxArray[4].symbol === "O" && boxArray[5].symbol === "O"){
			return true;
		} else if(boxArray[6].symbol === "O" && boxArray[7].symbol === "O" && boxArray[8].symbol === "O"){
			return true;

		//VERTICAL		
		} else if(boxArray[0].symbol === "O" && boxArray[3].symbol === "O" && boxArray[6].symbol === "O"){
			return true;
		} else if(boxArray[1].symbol === "O" && boxArray[4].symbol === "O" && boxArray[7].symbol === "O"){
			return true;
		} else if(boxArray[2].symbol === "O" && boxArray[5].symbol === "O" && boxArray[8].symbol === "O"){
			return true;

		//DIAGNAL	
		} else if(boxArray[0].symbol === "O" && boxArray[4].symbol === "O" && boxArray[8].symbol === "O"){
			return true;
		} else if(boxArray[2].symbol === "O" && boxArray[4].symbol === "O" && boxArray[6].symbol === "O"){
			return true;
		} else {
			return false;
		}	
	}

	//Run game over. Winner is decided by whether or not the last click made is odd or even which
	//determines if the winner is player 1 or 2 or just straight up a tie. The number parameter takes in
	//the number of clicks that have been obtained throughout the game.
	function runGameOver(number){
		displayNone(board);
		displayBlock(finish);
		var pFinish = finish.querySelector('p');
		var boxes = document.getElementsByClassName('box');

		if(number % 2 === 0 && number < 10){
			pFinish.innerHTML = player2.firstName + " " + player2.lastName + " Wins!";
		} else if(number % 2 !== 0 && number < 10){
			pFinish.innerHTML = player1.firstName + " " + player1.lastName + " Wins!";
		} else if(number === 10) {
			finish.querySelector('p').innerHTML = "NO WINNER..IT'S A TIE";
		}
	} 

	function computerProgram(){
		setTimeout(function(){
			var choice = Math.floor(Math.random() * 8) + 1;
			console.log(choice);
			if(box[choice].classList.contains('filled')){
				computerProgram();
			} else {
				box[choice].click();
			}
		}, 500)
	}

	/*The Click boxes function is what runs the majority of the game as it's purpose to apply styles
	Increase the counter of clicks in the game, change turns between players, and check to see if someone has 
	won or not. The function also is what makes the call for the computer to run it's function and make decision*/
	function clickBoxes(element){
		element.addEventListener('click', function(event){			
			if(!element.classList.contains('filled')){
				element.classList.add('filled');
				player1.changeTurn();
				player2.changeTurn();

				if(activeSymbol === symbol[0]){
					activeSymbol = symbol[1];
				} else {
					activeSymbol = symbol[0];
				}
				
				var boxElement = element;
				var boxElementUl = boxElement.parentElement;
				var boxElementsList = boxElementUl.children;
				var boxIndex = 0;

				for(var i = 0; i < boxElementsList.length; i++){
					if(boxElementsList[i] === boxElement){
						break;
					}	
					//Get the index of the BOX clicked
					boxIndex++;
				}

				boxArray[boxIndex].filled = true;
				statusChange();
				count++;
				if(count % 2 === 0){
					element.classList.add('box-filled-2');
					boxArray[boxIndex].symbol = "X";
					var player2Check = player2GameCheck()
					if(player2Check){
						finish.classList.add('screen-win-two')
						runGameOver(count);
						return false;
					}
				} else if(count % 2 !== 0){
					element.classList.add('box-filled-1');
					boxArray[boxIndex].symbol = "O";
					var player1Check = player1GameCheck();
					if(player1Check){
						finish.classList.add('screen-win-one');
						runGameOver(count);
						return false;
					} else if(!player1Check && count === 9) {
						count++;
						finish.classList.add('screen-win-tie');
						runGameOver(count);
						return false;
					}

					//If a computer option was chosen this will essentially act as the next click in the cycle after
					//a human makes their selection
					if(player2.playerType === "Computer"){
						computerProgram();	
					}
				}
			} else {
				return false;
			}
		}, true);
	}


	//BUTTON TO SUBMIT PLAYER 1 NAME
	startButtonPlayer1.addEventListener('click', function(){
		var player1Div = document.getElementsByClassName('player-1-input')[0];
		var player2Div = document.getElementsByClassName('player-2-input')[0];
		
		var inputs = player1Div.querySelectorAll('input');
		for(var i = 0; i < inputs.length; i++){
			if(inputs[i].value === ""){
				inputs[i].classList.add('missing');
				return false;
			} else if(inputs[i].value !== "" && inputs[i].classList.contains('missing')){
				inputs[i].classList.remove('missing');
			}
		}

		player1Div.classList.remove('active');
		player2Div.classList.add('active');

		player1 = new newPlayer(1, inputs[0].value, inputs[1].value, turn[1], symbol[0], "Human");

	});

	//BUTTON TO SUBMIT PLAYER 2 NAME & START THE GAME
	startButtonReady.addEventListener('click', function(){
		var player2Div = document.getElementsByClassName('player-2-input')[0];
		var inputs = player2Div.querySelectorAll('input');
		var player1Name = document.getElementById('player1-name');
		var player2Name = document.getElementById('player2-name');
		var checkBox = true;

		for(var i = 0; i < inputs.length; i++){
			if(inputs[i].value === ""){
				inputs[i].classList.add('missing');
				return false;
			} else if(inputs[i].value !== "" && inputs[i].classList.contains('missing')){
				inputs[i].classList.remove('missing');
			}
		}

		player2 = new newPlayer(2, inputs[0].value, inputs[1].value, turn[0], symbol[1], gameType);

		player1Name.innerHTML = player1.firstName + " " + player1.lastName;
		player2Name.innerHTML = player2.firstName + " " + player2.lastName;

		displayNone(start);
		displayBlock(board);
		statusChange();

	});


	startAgainButton.addEventListener('click', function(){

		displayNone(finish);
		displayBlock(board);
		count = 0;

		//Reset the symbol and filled props within each box object
		for(var i = 0; i < boxArray.length; i++){
			boxArray[i].filled = false;
			boxArray[i].symbol = "none";
		}

		//Reset the player status so that player 1 will start the game
		player1.turnStatus = "Yes";
		player2.turnStatus = "No";
		statusChange();

		//Make the first Symbol towards player 1
		activeSymbol = symbol[0];

		//Clear the classes from the board
		for(var x = 0; x < box.length; x++){
			if(box[x].classList.contains('box-filled-1')){
				box[x].classList.remove('box-filled-1');
				box[x].classList.remove('filled');
			}

			if(box[x].classList.contains('box-filled-2')){
				box[x].classList.remove('box-filled-2');
				box[x].classList.remove('filled');
			}
		}

		//Remove the classes from the Finish section
		if(finish.classList.contains('screen-win-tie')){
			finish.classList.remove('screen-win-tie');
		} else if(finish.classList.contains('screen-win-one')){
			finish.classList.remove('screen-win-one');
		} else if(finish.classList.contains('screen-win-two')){
			finish.classList.remove('screen-win-two');
		}

	});
});	

ticTacToe();	
