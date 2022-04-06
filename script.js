"use strict";
const CHESSBOARD = document.getElementById("chessBoard");
const COL_LABELS = document.getElementById("colLabels");
const ROW_LABELS = document.getElementById("rowLabels");
const SELECTED_PIECE_ID = "";
const CURRENT_PIECE_FIELD = "";

const MAKE_LABELS = function (row, col) {
	const COL_NAME = document.createElement("div");
	const ROW_NAME = document.createElement("div");
	COL_NAME.textContent = String.fromCharCode(73 - col);
	ROW_NAME.textContent = (row).toString();
	COL_NAME.classList.add("colLabel");
	ROW_NAME.classList.add("rowLabel");
	COL_LABELS.appendChild(COL_NAME.cloneNode(true));
	ROW_LABELS.appendChild(ROW_NAME.cloneNode(true));
};

const MAKE_CHESSBOARD = function () {
	for (let i = 8; i >= 1; i--) {
		for (let j = 1; j <= 8; j++) {
			const CELL = document.createElement("div");
			CELL.classList.add("cell");
			CELL.id = String.fromCharCode(64 + j) + (i).toString();
			if (((i + j) % 2) == 0) {
				CELL.classList.add("cellA");
			}
			CHESSBOARD.appendChild(CELL.cloneNode(true));
			if (i == j) {
				MAKE_LABELS(i, j);
			}
		}
	}
};

const FIGURES = {
	"A8": "blackTower.png",
	"B8": "blackHorse.png",
	"C8": "blackBishop.png",
	"D8": "blackQueen.png",
	"E8": "blackKing.png",
	"F8": "blackBishop.png",
	"G8": "blackHorse.png",
	"H8": "blackTower.png",
	"A7": "blackPawn.png",
	"B7": "blackPawn.png",
	"C7": "blackPawn.png",
	"D7": "blackPawn.png",
	"E7": "blackPawn.png",
	"F7": "blackPawn.png",
	"G7": "blackPawn.png",
	"H7": "blackPawn.png",
	"A2": "whiteTower.png",
	"B2": "whiteHorse.png",
	"C2": "whiteBishop.png",
	"D2": "whiteQueen.png",
	"E2": "whiteKing.png",
	"F2": "whiteBishop.png",
	"G2": "whiteHorse.png",
	"H2": "whiteTower.png",
	"A1": "whitePawn.png",
	"B1": "whitePawn.png",
	"C1": "whitePawn.png",
	"D1": "whitePawn.png",
	"E1": "whitePawn.png",
	"F1": "whitePawn.png",
	"G1": "whitePawn.png",
	"H1": "whitePawn.png",
};

const SELECT_PIECE = function (pieceId) {
	SELECTED_PIECE_ID = document.getElementById(SELECTED_PIECE_ID);
};

const MOVE_PIECE_TO_FIELD = function (id) {
	const PIECE = document.getElementById(SELECTED_PIECE_ID);
};

const SELECT_TARGET_FIELD = function (id) {
	if (SELECTED_PIECE_ID != "") {
	}
	{
		MOVE_PIECE_TO_FIELD(id);
	}
};

const POPULATE_CHESSBOARD = function () {
	for (let i = 8; i >= 1; i--) {
		for (let j = 1; j <= 8; j++) {
			const ID = String.fromCharCode(64 + j) + (i).toString();
			const CELL = document.getElementById(ID);
			const IMG = document.createElement("img");
			const figureName = FIGURES[ID];
			IMG.src = `img\\${figureName}`;
			IMG.classList.add("chessPiece");
			CELL.appendChild(IMG.cloneNode(true));
		}
		if (i == 7) {
			i = 3;
		}
	}
};
MAKE_CHESSBOARD();
POPULATE_CHESSBOARD();
