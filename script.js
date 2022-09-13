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
	})
})