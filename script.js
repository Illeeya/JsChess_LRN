'use strict';
// CONSTANTS
const CHESSBOARD = document.getElementById('chessBoard');
const COL_LABELS = document.getElementById('colLabels');
const ROW_LABELS = document.getElementById('rowLabels');

const VARIABLES = {};

const FIGURES = {
    A8: 'blackTower1'
    , B8: 'blackHorse1'
    , C8: 'blackBishop1'
    , D8: 'blackQueen1'
    , E8: 'blackKing1'
    , F8: 'blackBishop2'
    , G8: 'blackHorse2'
    , H8: 'blackTower2'
    , A7: 'blackPawn1'
    , B7: 'blackPawn2'
    , C7: 'blackPawn3'
    , D7: 'blackPawn4'
    , E7: 'blackPawn5'
    , F7: 'blackPawn6'
    , G7: 'blackPawn7'
    , H7: 'blackPawn8'
    , A1: 'whiteTower1'
    , B1: 'whiteHorse1'
    , C1: 'whiteBishop1'
    , D1: 'whiteQueen1'
    , E1: 'whiteKing1'
    , F1: 'whiteBishop2'
    , G1: 'whiteHorse2'
    , H1: 'whiteTower2'
    , A2: 'whitePawn1'
    , B2: 'whitePawn2'
    , C2: 'whitePawn3'
    , D2: 'whitePawn4'
    , E2: 'whitePawn5'
    , F2: 'whitePawn6'
    , G2: 'whitePawn7'
    , H2: 'whitePawn8'
, };

const CHESS_FIELDS_LIST = {};
//let possibleFieldsList = [];
//const CHESS_PIECES_LIST = {};
const CHESS_PIECES_ARRAY = [];

// // CHESS OBJECT

class ChessPiece {
    constructor(color, figure, row, column) {
        this.id = color + figure + column + row;
        this.placement = column + row;
        this.parent = CHESS_FIELDS_LIST[this.placement];
        this.color = color;
        this.figure = figure;
        this.col = column;
        this.row = row;
        this.possibleMoves = [];
    }

    changeField(fieldId) {
        console.log(`Before: ${this.placement}`);
        this.placement = fieldId;
        console.log(`After: ${this.placement}`);
        this.parent = CHESS_FIELDS_LIST[this.placement];
        this.col = fieldId.slice(0, 1);
        this.row = fieldId.slice(1, 2);
        console.log(`Col: ${this.col}  Row: ${this.row}`);
    }

    addImgNode(node) {
        this.imgNode = node;
    }
}

// VARIABLES
let selectedPiece = '';
let selectedField = '';
let targetFieldId = '';

// BOARD BUILDING METHODS

function makeLabels(row, col) {
    const COL_NAME = document.createElement('div');
    const ROW_NAME = document.createElement('div');
    COL_NAME.textContent = String.fromCharCode(73 - col);
    ROW_NAME.textContent = row.toString();
    COL_NAME.classList.add('colLabel');
    ROW_NAME.classList.add('rowLabel');
    COL_LABELS.appendChild(COL_NAME.cloneNode(true));
    ROW_LABELS.appendChild(ROW_NAME.cloneNode(true));
}

function createPieceObjects() {
    // PAWNS
    for (let i = 1; i <= 16; i++) {
        let col = String.fromCharCode(64 + i);
        let row = 2;
        let color = 'white';
        if (i > 8) {
            row = 7;
            color = 'black';
            col = String.fromCharCode(56 + i);
        }
        CHESS_PIECES_ARRAY.push(new ChessPiece(color, 'pawn', row, col));
    }

    // REST

    // WHITE
    CHESS_PIECES_ARRAY.push(new ChessPiece('white', 'tower', 1, 'A'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('white', 'horse', 1, 'B'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('white', 'bishop', 1, 'C'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('white', 'queen', 1, 'D'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('white', 'king', 1, 'E'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('white', 'bishop', 1, 'F'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('white', 'horse', 1, 'G'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('white', 'tower', 1, 'H'));

    // BLACK
    CHESS_PIECES_ARRAY.push(new ChessPiece('black', 'tower', 8, 'A'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('black', 'horse', 8, 'B'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('black', 'bishop', 8, 'C'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('black', 'queen', 8, 'D'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('black', 'king', 8, 'E'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('black', 'bishop', 8, 'F'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('black', 'horse', 8, 'G'));
    CHESS_PIECES_ARRAY.push(new ChessPiece('black', 'tower', 8, 'H'));

    function createPiece(cellToPutPieceOn, pieceName) {
        const CELL = CHESS_FIELDS_LIST[cellToPutPieceOn];
        console.log(CELL.id);
        const IMG = document.createElement('img');
        IMG.src = `img\\${pieceName}.png`;
        IMG.classList.add('chessPiece');
        IMG.id = CELL.id + pieceName;
        CELL.appendChild(IMG.cloneNode(true));
        return CELL.childNodes[0];
    }

    CHESS_PIECES_ARRAY.forEach((element) => {
        element.addImgNode(createPiece(element.placement, element.color + element.figure));
    });
}

function makeChessboard() {
    for (let i = 8; i >= 1; i--) {
        for (let j = 1; j <= 8; j++) {
            const CELL = document.createElement('div');
            CELL.classList.add('cell');
            CELL.id = String.fromCharCode(64 + j) + i.toString();
            if ((i + j) % 2 == 0) {
                CELL.classList.add('cellA');
            }
            CHESSBOARD.appendChild(CELL.cloneNode(true));
            if (i == j) {
                makeLabels(i, j);
            }
            document.getElementById(CELL.id).addEventListener('click', () => {
                selector(CELL.id);
            });
            CHESS_FIELDS_LIST[CELL.id] = document.getElementById(CELL.id);
        }
    }
}

function selector(fieldid) {
    const pieceOnField = CHESS_PIECES_ARRAY.find((piece) => piece.placement == fieldid);

    if (selectedField == fieldid) {
        deselector();
    } else if (pieceOnField && isStringEmpty(selectedPiece)) {
        console.log(`Select piece`);
        selectedField = fieldid;
        selectedPiece = CHESS_PIECES_ARRAY.find((piece) => piece.placement == fieldid);
        CHESS_FIELDS_LIST[selectedField].classList.add('selected');
        generatePossibleMoveFields(selectedPiece);
    } else if (!isStringEmpty(selectedPiece)) {
        console.log(`Collision or move`);
        moveChess(fieldid);
    }
}

function deselector() {
    CHESS_FIELDS_LIST[selectedField].classList.remove('selected');
    selectedPiece.possibleMoves.forEach((field) => {
        CHESS_FIELDS_LIST[field].classList.remove('possibleMoveA', 'possibleMoveB');
    });
    selectedPiece.possibleMoves = [];

    selectedField = '';
    selectedPiece = '';
}

function moveChess(toTheField) {
    if (selectedPiece.possibleMoves.includes(toTheField)) {
        let pieceOnTarget = CHESS_PIECES_ARRAY.find((piece) => piece.placement == toTheField);
        if (!(pieceOnTarget && pieceOnTarget.color == selectedPiece.color)) {
            if (pieceOnTarget) {
                //COLLISION

                CHESS_FIELDS_LIST[toTheField].removeChild(pieceOnTarget.imgNode);
                CHESS_PIECES_ARRAY.splice(CHESS_PIECES_ARRAY.indexOf(pieceOnTarget), 1);
            }
            CHESS_FIELDS_LIST[toTheField].appendChild(selectedPiece.imgNode);
            selectedPiece.changeField(toTheField);
            deselector();
        }
    }
}

function generatePossibleMoveFields(chessPiece) {
    function breakMovement(ftp) {
        if (isFieldTaken(ftp)) {
            if (isFieldTaken(ftp).color == chessPiece.color) {
                return true;
            } else {
                chessPiece.possibleMoves.push(ftp);
                return true;
            }
        } else {
            return false;
        }
    }

    let row = Number(chessPiece.row);
    let col = chessPiece.col.charCodeAt(0);
    let _col = '';
    let _row = '';
    let fieldToPush = '';

    switch (chessPiece.figure) {
    case 'pawn':
        if (chessPiece.color == 'black' && chessPiece.row > 1) {
            fieldToPush = String.fromCharCode(col) + (row - 1);
            if (!isFieldTaken(fieldToPush)) {
                chessPiece.possibleMoves.push(fieldToPush);
            }
            if (row == 7) {
                fieldToPush = String.fromCharCode(col) + (row - 2);
                if (!isFieldTaken(fieldToPush)) {
                    chessPiece.possibleMoves.push(fieldToPush);
                }
            }
        }
        if (chessPiece.color == 'white' && chessPiece.row < 8) {
            fieldToPush = String.fromCharCode(col) + (row + 1);
            if (!isFieldTaken(fieldToPush)) {
                chessPiece.possibleMoves.push(fieldToPush);
            }
            if (row == 2) {
                fieldToPush = String.fromCharCode(col) + (row + 2);
                if (!isFieldTaken(fieldToPush)) {
                    chessPiece.possibleMoves.push(fieldToPush);
                }
            }
        }

        if (chessPiece.color == 'black') {
            row--;
        } else {
            row++;
            console.log(row);
        }
        fieldToPush = String.fromCharCode(col - 1) + row;
        console.log(fieldToPush);
        if (isFieldTaken(fieldToPush) && isFieldTaken(fieldToPush).color != chessPiece.color) {
            console.log(`test`);
            chessPiece.possibleMoves.push(fieldToPush);
        }
        fieldToPush = String.fromCharCode(col + 1) + row;
        if (isFieldTaken(fieldToPush) && isFieldTaken(fieldToPush).color != chessPiece.color) {
            chessPiece.possibleMoves.push(fieldToPush);
        }

        break;
    case 'tower':
        if (col > 65) {
            for (let c1 = col - 1; c1 >= 65; c1--) {
                fieldToPush = String.fromCharCode(c1) + row;
                if (breakMovement(fieldToPush)) break;
                else {
                    chessPiece.possibleMoves.push(fieldToPush);
                }
            }
        }
        if (col < 72) {
            for (let c2 = col + 1; c2 <= 72; c2++) {
                fieldToPush = String.fromCharCode(c2) + row;
                if (breakMovement(fieldToPush)) break;
                else {
                    chessPiece.possibleMoves.push(fieldToPush);
                }
            }
        }
        if (row > 1) {
            for (let r1 = row - 1; r1 >= 1; r1--) {
                fieldToPush = String.fromCharCode(col) + r1;
                if (breakMovement(fieldToPush)) break;
                else {
                    chessPiece.possibleMoves.push(fieldToPush);
                }
            }
        }
        if (row < 8) {
            for (let r2 = row + 1; r2 <= 8; r2++) {
                fieldToPush = String.fromCharCode(col) + r2;
                if (breakMovement(fieldToPush)) break;
                else {
                    chessPiece.possibleMoves.push(fieldToPush);
                }
            }
        }
        break;
    case 'bishop':
        _col = col - 1;
        _row = row + 1;
        while (_col >= 65 && _row <= 8) {
            fieldToPush = String.fromCharCode(_col) + _row;
            console.log(fieldToPush);
            if (breakMovement(fieldToPush)) break;
            else {
                chessPiece.possibleMoves.push(fieldToPush);
            }
            _col--;
            _row++;
        }

        _col = col + 1;
        _row = row + 1;
        while (_col <= 72 && _row <= 8) {
            fieldToPush = String.fromCharCode(_col) + _row;
            if (breakMovement(fieldToPush)) break;
            else {
                chessPiece.possibleMoves.push(fieldToPush);
            }
            _col++;
            _row++;
        }

        _col = col - 1;
        _row = row - 1;
        while (_col >= 65 && _row >= 1) {
            fieldToPush = String.fromCharCode(_col) + _row;
            if (breakMovement(fieldToPush)) break;
            else {
                chessPiece.possibleMoves.push(fieldToPush);
            }
            _col--;
            _row--;
        }

        _col = col + 1;
        _row = row - 1;
        while (_col <= 72 && _row >= 1) {
            fieldToPush = String.fromCharCode(_col) + _row;
            if (breakMovement(fieldToPush)) break;
            else {
                chessPiece.possibleMoves.push(fieldToPush);
            }
            _col++;
            _row--;
        }
        break;
    case 'queen':
        _col = col - 1;
        _row = row + 1;
        while (_col >= 65 && _row <= 8) {
            fieldToPush = String.fromCharCode(_col) + _row;
            console.log(fieldToPush);
            if (breakMovement(fieldToPush)) break;
            else {
                chessPiece.possibleMoves.push(fieldToPush);
            }
            _col--;
            _row++;
        }

        _col = col + 1;
        _row = row + 1;
        while (_col <= 72 && _row <= 8) {
            fieldToPush = String.fromCharCode(_col) + _row;
            if (breakMovement(fieldToPush)) break;
            else {
                chessPiece.possibleMoves.push(fieldToPush);
            }
            _col++;
            _row++;
        }

        _col = col - 1;
        _row = row - 1;
        while (_col >= 65 && _row >= 1) {
            fieldToPush = String.fromCharCode(_col) + _row;
            if (breakMovement(fieldToPush)) break;
            else {
                chessPiece.possibleMoves.push(fieldToPush);
            }
            _col--;
            _row--;
        }

        _col = col + 1;
        _row = row - 1;
        while (_col <= 72 && _row >= 1) {
            fieldToPush = String.fromCharCode(_col) + _row;
            if (breakMovement(fieldToPush)) break;
            else {
                chessPiece.possibleMoves.push(fieldToPush);
            }
            _col++;
            _row--;
        }

        if (col > 65) {
            for (let c1 = col - 1; c1 >= 65; c1--) {
                fieldToPush = String.fromCharCode(c1) + row;
                if (breakMovement(fieldToPush)) break;
                else {
                    chessPiece.possibleMoves.push(fieldToPush);
                }
            }
        }
        if (col < 72) {
            for (let c2 = col + 1; c2 <= 72; c2++) {
                fieldToPush = String.fromCharCode(c2) + row;
                if (breakMovement(fieldToPush)) break;
                else {
                    chessPiece.possibleMoves.push(fieldToPush);
                }
            }
        }
        if (row > 1) {
            for (let r1 = row - 1; r1 >= 1; r1--) {
                fieldToPush = String.fromCharCode(col) + r1;
                if (breakMovement(fieldToPush)) break;
                else {
                    chessPiece.possibleMoves.push(fieldToPush);
                }
            }
        }
        if (row < 8) {
            for (let r2 = row + 1; r2 <= 8; r2++) {
                fieldToPush = String.fromCharCode(col) + r2;
                if (breakMovement(fieldToPush)) break;
                else {
                    chessPiece.possibleMoves.push(fieldToPush);
                }
            }
        }

        break;
    case 'king':
        let tst = String.fromCharCode(col) + row;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) continue;
                _row = row + i;
                _col = col + j;
                if (_col < 65 || _col > 72 || _row < 1 || row > 8) continue;
                fieldToPush = String.fromCharCode(_col) + _row;
                if (breakMovement(fieldToPush)) continue;
                else {
                    chessPiece.possibleMoves.push(fieldToPush);
                }
            }
        }

        break;
    case 'horse':
        for (let i = -2; i <= 2; i++) {
            if (i == 0) continue;
            _row = row + i;
            if (_row < 1 || _row > 8) continue;
            if (i % 2 == 0) {
                _col = col - 1;
                if (_col > 72 || _col < 65) {} else {
                    fieldToPush = String.fromCharCode(_col) + _row;
                    if (!breakMovement(fieldToPush)) {
                        chessPiece.possibleMoves.push(fieldToPush);
                    }
                }
                _col = col + 1;
                if (_col > 72 || _col < 65) {} else {
                    fieldToPush = String.fromCharCode(_col) + _row;
                    if (!breakMovement(fieldToPush)) {
                        chessPiece.possibleMoves.push(fieldToPush);
                    }
                }
            } else {
                _col = col - 2;
                if (_col > 72 || _col < 65) {} else {
                    fieldToPush = String.fromCharCode(_col) + _row;
                    if (!breakMovement(fieldToPush)) {
                        chessPiece.possibleMoves.push(fieldToPush);
                    }
                }
                _col = col + 2;
                if (_col > 72 || _col < 65) {} else {
                    fieldToPush = String.fromCharCode(_col) + _row;
                    if (!breakMovement(fieldToPush)) {
                        chessPiece.possibleMoves.push(fieldToPush);
                    }
                }
            }
        }
        break;
    default:
        break;
    }

    chessPiece.possibleMoves.forEach((field) => {
        if (CHESS_FIELDS_LIST[field].classList.contains('cellA')) {
            CHESS_FIELDS_LIST[field].classList.add('possibleMoveA');
        } else {
            CHESS_FIELDS_LIST[field].classList.add('possibleMoveB');
        }
    });
}

function isFieldTaken(fieldId) {
    return CHESS_PIECES_ARRAY.find((piece) => piece.placement == fieldId);
}

//chessPiece.possibleMoves.push(String.fromCharCode(chessPiece.col.charCodeAt(0) - 2));

function isStringEmpty(string) {
    if (string === null || string == '' || string == undefined) return true;
    else return false;
}

makeChessboard();
createPieceObjects();
