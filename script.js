const TicTacToe = (() => {
	const gameBoardContainer = (function () {
		'use strict';
		let board = ["", "", "", "", "", "", "", "", ""];
		let turn = "";

		function updateBoard() {
			for (let i = 0; i < 9; i++) {
				let gameSquareContainer = document.getElementById(i)
				gameSquareContainer.innerHTML = board[i];
				if (board[i] == "X") {
					gameSquareContainer.classList.add("crosses");
					gameSquareContainer.classList.remove("naughts");
				}
				if (board[i] == "X") {
					gameSquareContainer.classList.add("naughts");
					gameSquareContainer.classList.remove("crosses");
				}
			}
		}
		function resetBoard() {
			board = ["", "", "", "", "", "", "", "", ""];
			updateBoard();
		}

		function addToBoard(i) {
			board[i] = turn;
			updateBoard();
		}

		function getBoard() {
			return board;
		}

		function getPlayerTurn() {
			return turn;
		}

		function setPlayerTurn(theTurn) {
			turn = theTurn;
		}

		return {
			updateBoard: updateBoard,
			addToBoard: addToBoard,
			getPlayerTurn: getPlayerTurn,
			setPlayerTurn: setPlayerTurn,
			getBoard: getBoard,
			resetBoard: resetBoard
		};
	})();

	const playerTicTacToe = (name, XorO) => {
		let score = 0;
		let characterSymbol = XorO;
		let playerName = name;
		let isTurn = false;

		return {
			getname() {
				return playerName;
			},
			setname(name) {
				playerName = name;
			},
			getcharacterSymbol() {
				return characterSymbol;
			},
			setcharacterSymbol(XorO) {
				characterSymbol = XorO;
			},
			getTurn() {
				return isTurn;
			},
			setTurn(theTurn) {
				isTurn = theTurn;
			}
		}
	}

	const gameController = (() => {
		//Creates the two players
		let player1 = playerTicTacToe("Player 1", "X");
		let player2 = playerTicTacToe("Player 2", "O");
		const winningTiles = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [2, 5, 8]];
		let count = 0;

		let model = document.getElementById("myModel");
		let span = document.getElementsByClassName("close")[0];
		let restartButton = document.getElementById("restart");
		let resetButton = document.getElementById("resetButton");
		const formElem = document.querySelector('form');
		window.addEventListener('load', (event) => {
			model.style.display = "block";
		});

		window.onclick = function (event) {
			if (event.target == model) {
				model.style.display = "none";
			}
		}

		span.onclick = function () {
			model.style.display = "none";
		}

		formElem.addEventListener('submit', (e) => {
			e.preventDefault();

			const formData = new FormData(formElem);
			let firstPlayerName = formData.get('player1');
			let secondPlayerName = formData.get('player2');
			if (firstPlayerName != "" && secondPlayerName != null) {
				player1.setname(firstPlayerName)
			}
			if (firstPlayerName != "" && secondPlayerName != null) {
				player2.setname(secondPlayerName)
			}
			model.style.display = "none";
			updateNames();
		});

		// Add event listner for restart button after game won
		restartButton.addEventListener("click", function () {
			resetBoard();
		}); // same for reset button at bottom
		resetButton.addEventListener("click", function () {
			resetBoard();
		});

		player1.setTurn(true);
		gameBoardContainer.setPlayerTurn(player1.getcharacterSymbol());

		// Add names to the board
		function updateNames() {
			let player1Div = document.getElementById("player1Name");
			player1Div.innerHTML = player1.getname();
			let player2Div = document.getElementById("player2Name");
			player2Div.innerHTML = player2.getname();
		}

		for (let i = 0; i < 9; i++) {
			let gameSquareContainer = document.getElementById(i);
			gameSquareContainer.addEventListener("click", function () {
				// check to see if square is empty before adding
				let theBoard = gameBoardContainer.getBoard();
				if (theBoard[i] == "" || theBoard[i] == null) {
					gameBoardContainer.addToBoard(i);
					checkWin();
					count++;
					changeTurn();
				}
			});
		}

		function changeTurn() {
			if (player1.getTurn()) {
				player2.setTurn(true);
				player1.setTurn(false);
				let player2Symbol = player2.getcharacterSymbol();
				gameBoardContainer.setPlayerTurn(player2Symbol);

				// change class
				let player2NameDiv = document.getElementById("player2Name");
				player2NameDiv.classList.add("playerTurn");
				let player1NameDiv = document.getElementById("player1Name");
				player1NameDiv.classList.remove("playerTurn");
			} else {
				player2.setTurn(false);
				player1.setTurn(true);
				let player1Symbol = player1.getcharacterSymbol();
				gameBoardContainer.setPlayerTurn(player1Symbol);

				// change class
				let player1NameDiv = document.getElementById("player1Name");
				player1NameDiv.classList.add("playerTurn");
				let player2NameDiv = document.getElementById("player2Name");
				player2NameDiv.classList.remove("playerTurn");
			}
		}
		function checkWin() {
			// Check if anyone has won
			if (count >= 3 && count < 9) {
				for (let i = 0; i < winningTiles.length; i++) {
					let board = gameBoardContainer.getBoard();
					console.log("board: " + board);
					console.log("count: " + count);
					console.log("i: " + i);
					console.log("checking combination: " + "[" + winningTiles[i][0] + "][" + winningTiles[i][1] + "]["
						+ winningTiles[i][2] + "]")
					if (board[winningTiles[i][0]] == player1.getcharacterSymbol() &&
						board[winningTiles[i][1]] == player1.getcharacterSymbol() &&
						board[winningTiles[i][2]] == player1.getcharacterSymbol()) {
						winnerModel("The winner is: " + player1.getname());
						break;
					}
					if (board[winningTiles[i][0]] == player2.getcharacterSymbol() &&
						board[winningTiles[i][1]] == player2.getcharacterSymbol() &&
						board[winningTiles[i][2]] == player2.getcharacterSymbol()) {
						winnerModel("The winner is: " + player2.getname());
						break;
					}// check for draw (number of goes aka count reaches max and no winner then it's a draw)

					else if (count == 8 && i == (winningTiles.length - 1)) {
						winnerModel("It's a draw!");
					}
				}
			}
		}

		function winnerModel(winner) {
			let winnerModel = document.getElementById("winnerMod");
			winnerModel.style.display = "block";
			let winnerDIV = document.getElementById("winnerDIV");
			winnerDIV.innerHTML = winner;
		}

		function resetBoard() {
			count = 0;
			gameBoardContainer.resetBoard();
			let winnerModel = document.getElementById("winnerMod");
			winnerModel.style.display = "none";
		}



	})();


})();