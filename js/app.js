var ticTacToe = (function(){
	
	"use strict";

	/************************ GLOBAL VARIABLES ************************
	********************************************************************/
	
	//The start section where names are inserted and the game is configured
	var start = document.getElementById('start');
	//Player 1 Enter button
	var startButtonPlayer1 = start.querySelector('.player1Insert');
	//Player 2 Enter button and also the button that kicks off the game
	var startButtonReady = start.querySelector('.ready');
	//The selection buttons between 'human' and 'computer'
	var humanChoice = document.getElementById('human');
	var computerChoice = document.getElementById('computer');	
	var gameType;
	var player1;
	var player2;	


	//The game board element
	var board = document.getElementById('board');
	//All the ticTacToe boxes
	var box = document.getElementsByClassName('box');
	//An array of classes thats applied to the box on click depending on which one is active
	var symbol = ['box-filled-1', 'box-filled-2'];
	var activeSymbol = symbol[0];
	//Where an array of objects are kept for each particular box element on the board
	var boxArray = [];
	//Keeps count of how many clicks have occurred throughout the game
	var count = 0;


	//The finishing screen element
	var finish = document.getElementById('finish');
	var startAgainButton = finish.querySelector('a');


	/**************************************** DECLARED FUNCTIONS ******************************************
	*******************************************************************************************************/

	/**************************** GAME VISUALS **************************/

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

	//This changes the "turn" box in the upper right and left parts of the body
	function statusChange(){

		var player1Id = document.getElementById('player1');
		var player2Id = document.getElementById('player2');

		if(player1.turnStatus === true){
			player2Id.classList.remove('active');
			player1Id.classList.add('active');
		} else if(player2.turnStatus === true) {
			player1Id.classList.remove('active');
			player2Id.classList.add('active');
		}
	}


	/**************************** GAME CREATION **************************/


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
					element.nextElementSibling.classList.remove('active');
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
		if(this.turnStatus === false){
			this.turnStatus = true;
		} else if(this.turnStatus === true){
			this.turnStatus = false;
		}
	};

	//Object constructor for the boxes objects. This will be used to determine what boxes have what symbols and if they are simply filled or not.
	function boxes(number, filled, symbol){
		this.number = number;
		this.filled = filled;
		this.symbol = symbol;

	}	

	function checkNameInputs(element){
		for(var i = 0; i < element.length; i++){
			if(element[i].value === ""){
				element[i].classList.add('missing');
				return false;
			} else if(element[i].value !== "" && element[i].classList.contains('missing')){
				element[i].classList.remove('missing');
			}
		}

		return true;
	}

	/**************************** RUNNING THE GAME ****************************/

	//Function that runs on CLICK of each respective box element. 
	function clickBoxes(element){
		element.addEventListener('click', function(event){			
			//Check to see if the element clicked on already has a symbol over it.
			if(!element.classList.contains('filled')){
				element.classList.add('filled');
				
				//Change the players turn
				player1.changeTurn();
				player2.changeTurn();

				if(activeSymbol === symbol[0]){
					activeSymbol = symbol[1];
				} else {
					activeSymbol = symbol[0];
				}
				
				//Get the index of the BOX clicked
				var boxElement = element;
				var boxElementUl = boxElement.parentElement;
				var boxElementsList = boxElementUl.children;
				var boxIndex = 0;

				for(var i = 0; i < boxElementsList.length; i++){
					if(boxElementsList[i] === boxElement){
						break;
					}	
					boxIndex++;
				}

				boxArray[boxIndex].filled = true;
				statusChange();
				count++;
				
				//Check to see if someone has won
				afterClickCheck(boxIndex, element);
			} else {
				return false;
			}
		}, true);
	}

	//Applies classes to boxes based on the users selection and runs the function to check if there has been a winner or not.
	function afterClickCheck(index, element){
		var playerCheck;
		if(count % 2 === 0){
			element.classList.add('box-filled-2');
			boxArray[index].symbol = "X";
			playerCheck = playerGameCheck(count);
			if(playerCheck){
				finish.classList.add('screen-win-two');
				runGameOver(count);
				return false;
			}
		} else if(count % 2 !== 0){
			element.classList.add('box-filled-1');
			boxArray[index].symbol = "O";
			playerCheck = playerGameCheck(count);
			if(playerCheck){
				finish.classList.add('screen-win-one');
				runGameOver(count);
				return false;
			} else if(!playerCheck && count === 9){
				count++;
				finish.classList.add('screen-win-tie');
				runGameOver(count);
				return false;
			}

			if(player2.playerType === "Computer"){
				computerProgram();
			}

		}
	}

	//Check to see if the box symbols contains either an "X" or an "O". The the symbol is dynamically inserted into the
	//if statements based on what turn it is for respective users.
	function playerGameCheck(number){
		var symbol;

		if(number % 2 === 0){
			symbol = "X";
		} else {
			symbol = "O"; 
		}

		//HORIZONTAL
		if(boxArray[0].symbol === symbol && boxArray[1].symbol === symbol && boxArray[2].symbol === symbol){
			return true;
		} else if(boxArray[3].symbol === symbol && boxArray[4].symbol === symbol && boxArray[5].symbol === symbol){
			return true;
		} else if(boxArray[6].symbol === symbol && boxArray[7].symbol === symbol && boxArray[8].symbol === symbol){
			return true;

		//VERTICAL		
		} else if(boxArray[0].symbol === symbol && boxArray[3].symbol === symbol && boxArray[6].symbol === symbol){
			return true;
		} else if(boxArray[1].symbol === symbol && boxArray[4].symbol === symbol && boxArray[7].symbol === symbol){
			return true;
		} else if(boxArray[2].symbol === symbol && boxArray[5].symbol === symbol && boxArray[8].symbol === symbol){
			return true;

		//DIAGNAL	
		} else if(boxArray[0].symbol === symbol && boxArray[4].symbol === symbol && boxArray[8].symbol === symbol){
			return true;
		} else if(boxArray[2].symbol === symbol && boxArray[4].symbol === symbol && boxArray[6].symbol === symbol){
			return true;
		} else {
			return false; 
		}	
	}

	//If called have the "computer" perform a click on an element
	function computerProgram(){
		setTimeout(function(){
			var choice = Math.floor(Math.random() * 8) + 1;
			if(box[choice].classList.contains('filled')){
				computerProgram();
			} else {
				box[choice].click();
			}
		}, 500);
	}

	//Run game over. Winner is decided by whether or not the last click made is odd or even which
	//determines if the winner is player 1 or 2 or just straight up a tie. The number parameter takes in
	//the number of clicks that have been obtained throughout the game.
	function runGameOver(number){
		displayNone(board);
		displayBlock(finish);
		var pFinish = finish.querySelector('p');

		if(number % 2 === 0 && number < 10){
			pFinish.innerHTML = player2.firstName + " " + player2.lastName + " Wins!";
		} else if(number % 2 !== 0 && number < 10){
			pFinish.innerHTML = player1.firstName + " " + player1.lastName + " Wins!";
		} else if(number === 10) {
			finish.querySelector('p').innerHTML = "NO WINNER..IT'S A TIE";
		}
	} 

	//Reset the game back to its original state after the user has reached the end screen
	function gameReset(){
		count = 0;
		//Reset the symbol and filled props within each box object
		for(var i = 0; i < boxArray.length; i++){
			boxArray[i].filled = false;
			boxArray[i].symbol = "none";
		}

		//Reset the player status so that player 1 will start the game
		player1.turnStatus = true;
		player2.turnStatus = false;
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
	}	

	/****************************** FIRST RUN STATEMENTS ********************************
	*************************************************************************************/
	


	start.classList.add('visible');
	startButtonPlayer1.classList.add('visible');
	
	var index = 1;
	//Loop through each box and apply listeners as well as create an object for each box so that it can be indexed via the
	//boxArray arary later.
	for(var i = 0; i < box.length; i++){
		var boxTemp = new boxes(index, false, "none");
		boxArray.push(boxTemp);
		box[i].classList.add(index);
		hoverBoxes(box[i]);
		clickBoxes(box[i]);
		index++;
	}

	//Apply click listenrs to the game type (Human vs Computer) options
	opponentType(humanChoice);
	opponentType(computerChoice);


	//BUTTON TO SUBMIT PLAYER 1 NAME
	startButtonPlayer1.addEventListener('click', function(){
		var player1Div = document.getElementsByClassName('player-1-input')[0];
		var player2Div = document.getElementsByClassName('player-2-input')[0];	
		var inputs = player1Div.querySelectorAll('input');
		
		var nameCheck = checkNameInputs(inputs);
		
		if(!nameCheck){
			return false;
		}

		player1Div.classList.remove('active');
		player2Div.classList.add('active');

		//Create the player 1 object based on the inputs from the user
		player1 = new newPlayer(1, inputs[0].value, inputs[1].value, true, symbol[0], "Human");

	});



	/******************************** EVENT LISTENERS **********************************/

	//Apply a second click lister to the Player 2 input screen. This is what ultimately starts the game as well as creates the player2 object
	startButtonReady.addEventListener('click', function(){
		var player2Div = document.getElementsByClassName('player-2-input')[0];
		var inputs = player2Div.querySelectorAll('input');
		var player1Name = document.getElementById('player1-name');
		var player2Name = document.getElementById('player2-name');
		var opponentCheck = document.getElementsByClassName('opponent-type');
		var opponentActive = false;
		var nameCheck = checkNameInputs(inputs);

		if(!nameCheck){
			return false;
		}

		//Loop through the opponent type selection options to ensure one of the buttons has been clicked on
		for(var i = 0; i < opponentCheck.length; i++){
			if(opponentCheck[i].classList.contains('active')){
				opponentActive = true;
				break;
			} else {
				opponentActive = false;
			}
		}

		//Return false if both of the elements don't return with containing the class 'active' 
		if(!opponentActive){
			return false;
		}

		//Create the player2 object based on the users input and what type of player player2 will actually be.
		player2 = new newPlayer(2, inputs[0].value, inputs[1].value, false, symbol[1], gameType);

		player1Name.innerHTML = player1.firstName + " " + player1.lastName;
		player2Name.innerHTML = player2.firstName + " " + player2.lastName;

		displayNone(start);
		displayBlock(board);
		statusChange();

	});

	//Add an click listner onto the restart game button which appears in the finish section
	startAgainButton.addEventListener('click', function(){

		displayNone(finish);
		displayBlock(board);
		gameReset();
		
	});
});	

ticTacToe();	
