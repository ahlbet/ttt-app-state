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
      html += `
        <div class="cell" id="${i}">
          <p>${state.board[i] ? state.board[i] : '&nbsp;' }</p>
        </div>
      `;

      html += '</div>';
      return html;

    }
  };
}

// Event Listeners
