"use strict";
// CONSTANTS
const CHESSBOARD = document.getElementById("chessBoard");
const COL_LABELS = document.getElementById("colLabels");
const ROW_LABELS = document.getElementById("rowLabels");

const FIGURES = {
    "A8": "blackTower1"
    , "B8": "blackHorse1"
    , "C8": "blackBishop1"
    , "D8": "blackQueen1"
    , "E8": "blackKing1"
    , "F8": "blackBishop2"
    , "G8": "blackHorse2"
    , "H8": "blackTower2"
    , "A7": "blackPawn1"
    , "B7": "blackPawn2"
    , "C7": "blackPawn3"
    , "D7": "blackPawn4"
    , "E7": "blackPawn5"
    , "F7": "blackPawn6"
    , "G7": "blackPawn7"
    , "H7": "blackPawn8"
    , "A2": "whiteTower1"
    , "B2": "whiteHorse1"
    , "C2": "whiteBishop1"
    , "D2": "whiteQueen1"
    , "E2": "whiteKing1"
    , "F2": "whiteBishop2"
    , "G2": "whiteHorse2"
    , "H2": "whiteTower2"
    , "A1": "whitePawn1"
    , "B1": "whitePawn2"
    , "C1": "whitePawn3"
    , "D1": "whitePawn4"
    , "E1": "whitePawn5"
    , "F1": "whitePawn6"
    , "G1": "whitePawn7"
    , "H1": "whitePawn8"
, };

const CHESS_FIELDS_LIST = {};
const CHESS_PIECES_LIST = {};

// VARIABLES
let selectedPiece = "";
let selectedField = "";
let currentPieceFieldId = "";
let targetFieldId = "";

// OBJECTS
class ChessPiece {
    constructor(node, name, currentPosition, isSelected) {
        this.node = node;
        this.name = name;
        this.currentPosition = currentPosition;
        this.isSelected = isSelected;
    }
}

// BOARD BUILDING METHODS

function makeLabels(row, col) {
    const COL_NAME = document.createElement("div");
    const ROW_NAME = document.createElement("div");
    COL_NAME.textContent = String.fromCharCode(73 - col);
    ROW_NAME.textContent = (row).toString();
    COL_NAME.classList.add("colLabel");
    ROW_NAME.classList.add("rowLabel");
    COL_LABELS.appendChild(COL_NAME.cloneNode(true));
    ROW_LABELS.appendChild(ROW_NAME.cloneNode(true));
};

function makeChessboard() {
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
                makeLabels(i, j);
            }
            document.getElementById(CELL.id).addEventListener('click', () => {
                selector(CELL.id);
            })
            CHESS_FIELDS_LIST[CELL.id] = document.getElementById(CELL.id);
            CHESS_PIECES_LIST[CELL.id] = '';
        }
    }
};

function populateChessboard() {
    for (let i = 8; i >= 1; i--) {
        for (let j = 1; j <= 8; j++) {
            const ID = String.fromCharCode(64 + j) + (i).toString();
            const CELL = document.getElementById(ID);
            const IMG = document.createElement("img");
            const figureName = FIGURES[ID];
            IMG.src = `img\\${figureName.slice(0,-1)}.png`;
            IMG.classList.add("chessPiece");
            IMG.id = ID + figureName;
            CELL.appendChild(IMG.cloneNode(true));
            // CELL.firstChild.addEventListener('click', () => {
            //     selector(CELL.id)
            // });
            CHESS_PIECES_LIST[ID] = figureName;

        }
        if (i == 7) {
            i = 3;
        }
    }
};

// MECHANICS

// function selectPiece(pieceId) {
//     selectedPieceId = document.getElementById(pieceId);
//     console.log(selectedPieceId);
// };

// function selectField(id) {
//     if (selectedPieceId != '')
//         console.log(id)
// }

function selector(fieldId) {
    if (selectedPiece == '' && CHESS_PIECES_LIST[fieldId] != '') {
        selectedPiece = CHESS_PIECES_LIST[fieldId];
        console.log(`Selected piece - ${selectedPiece}`)
        selectedField = CHESS_FIELDS_LIST[fieldId];
        selectedField.classList.add('selected');
    } else if (selectedField.id == fieldId) {
        console.log('Same field');
    } else if (selectedPiece != '' && CHESS_PIECES_LIST[fieldId] == '') {
        console.log(`Will move piece ${selectedPiece} to the ${fieldId} field`);
        selectedField.classList.remove('selected');
        selectedPiece = '';
        selectedField = '';
    } else if (CHESS_PIECES_LIST[fieldId] != '') {
        console.log('Will test for collision possibility');
        selectedField.classList.remove('selected');
        selectedPiece = '';
        selectedField = '';
    }

}


makeChessboard();
populateChessboard();

function test() {
    console.log("Works");
}
