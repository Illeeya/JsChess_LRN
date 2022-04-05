'use strict'

const CHESSBOARD = document.getElementById('chessBoard');

const MAKE_CHESSBOARD = function() {
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            const CELL = document.createElement('div');
            CELL.classList.add('cell')

            CELL.textContent = String.fromCharCode(64 + j) + (9 - i);
            if ((i + j) % 2 != 0) {
                CELL.classList.add('cellA');
            }
            CHESSBOARD.appendChild(CELL.cloneNode(true));
        }

    }
};

MAKE_CHESSBOARD();