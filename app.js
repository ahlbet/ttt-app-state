/* global $  */

const state = {
  board: [ null, null, null, null, null, null, null, null, null],
  xIsNext: true,
  winPattern: null
};

// State modification functions
function setMove(cellNo) {
  const cell = Math.abs(cellNo);
  if (state.winPattern) return;
  if (state.board[cell] !== null) return;
  state.board[cell] = state.xIsNext ? 'X' : 'O';
  state.xIsNext = !state.xIsNext;

  const winPattern = checkWinner(state.board);
  if (winPattern) {
    state.winPattern = winPattern;
  }

}

function newGame() {
  state.xIsNext = true;
  state.board = Array(9).fill(null);
  state.winPattern = null;
}

// Render functions
function renderBoard() {
  const renderRow = (startId, endId) => {
    let html = '<div class="row">';
    for (let i = startId; i <= endId; i++) {

      const winClass = (state.winPattern && state.winPattern.includes(i)) ? 'win' : '';

      html += `
        <div class="cell ${winClass}" id="${i}">
          <p>${state.board[i] ? state.board[i] : '&nbsp;' }</p>
        </div>
      `;
    }

    html += '</div>';
    return html;
  };

  let html = '';
  html += renderRow(0, 2);
  html += renderRow(3, 5);
  html += renderRow(6, 8);

  $('.board').html(html);
}

// Event Listeners

function onCellClick(event) {
  const cellId = $(event.target).closest('.cell').attr('id');
  setMove(cellId);
  renderBoard();
}

$('.board').on('click', '.cell', onCellClick);

function onNewGameClick() {
  newGame();
  renderBoard();
}

$('#new-game').click(onNewGameClick);

function checkWinner(board) {
  const winPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];

  for (let i = 0; i < winPatterns.length; i++) {
    const winPattern = winPatterns[i];

    if (!board[winPattern[0]]) continue;

    if (board[winPattern[0]] === board[winPattern[1]] && board[winPattern[1]] === board[winPattern[2]]) {
      return winPattern;
    }
  }
  return null;
}

function bindEventListeners() {
  renderBoard();
  onNewGameClick();
}

$(bindEventListeners);
