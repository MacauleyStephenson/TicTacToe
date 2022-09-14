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
	})
})