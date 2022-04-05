'use strict'
const CHESSBOARD = document.getElementById('chessBoard');
const COL_LABELS = document.getElementById('colLabels');
const ROW_LABELS = document.getElementById('rowLabels');

const MAKE_LABELS = function (row, col) {
    const COL_NAME = document.createElement('div');
    const
        ROW_NAME = document.createElement('div');
    COL_NAME.textContent = String.fromCharCode(64 + col);
    ROW_NAME
        .textContent =
        (9 - row).toString();
    COL_NAME.classList.add('colLabel');
    ROW_NAME.classList.add('rowLabel');
    COL_LABELS.appendChild(COL_NAME.cloneNode(true));
    ROW_LABELS.appendChild(ROW_NAME.cloneNode(true));
}

const MAKE_CHESSBOARD = function () {
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            const CELL = document.createElement('div');
            CELL.classList.add('cell')
            if ((i + j) % 2 != 0) {
                CELL.classList.add('cellA');
            }
            CHESSBOARD.appendChild(CELL.cloneNode(true));
            if (i == j) {
                MAKE_LABELS(i, j);
            }
        }
    }
};
const POPULATE_CHESSBOARD = function () {

}
MAKE_CHESSBOARD();
