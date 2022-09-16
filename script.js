const TicTacToe = (() => {
	const gameBoard = (function () {
		'use strict';
		let board = ["", "", "", "", "", "", "", "", ""];
		let turn = "";

		function updateBoard() {
			for (let i = 0; i < 9; i++) {
				let gameSquare = document.getElementById(i)
				gameSquare.innerHTML = board[i];
				if (board[i] == "X") {
					gameSquare.classList.add("crosses");
					gameSquare.classList.remove("naughts");
				}
				if (board[i] == "X") {
					gameSquare.classList.add("naughts");
					gameSquare.classList.remove("crosses");
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

		let model = document.getElementById("myModal");
		let span = document.getElementsByClassName("close")[0];
		let restartButton = document.getElementById("restart");
		let resetButton = document.getElementById("resetButton");
		const formElem = document.querySelector('form');
		window.addEventListener('load', (event) => {
			model.style.display = "block";
		});

		window.onclick = function (event) {
			if (event.target == model) {
				modal.style.display = "none";
			}
		}
	})
})