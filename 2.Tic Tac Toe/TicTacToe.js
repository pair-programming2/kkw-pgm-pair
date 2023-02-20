const WINNER_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let state = {
  board: new Array(9).fill(''),
  player: 'X',
  isFinish: false,
};

const createGameStatusText = () => {
  const { board, player, isFinish } = state;

  if (isFinish) return `Winner is ${player === 'X' ? 'O' : 'X'}`;

  if (board.every(element => element !== '')) return `Draw`;

  return `Next Player: ${player}`;
};

const TicTacToe = $root => {
  const render = () => {
    // console.log('[state]', state);

    const { board } = state;

    // prettier-ignore
    $root.innerHTML = `
      <h1 class="title">Tic Tac Toe</h1>
      <div class="game">
        <div class="game-status">${createGameStatusText()}</div>
        <div class="game-grid">
          ${board.map((element, idx) => `
            <div class="game-grid-item" data-id="${idx}">${element}</div>
          `).join("")}
        </div>
        <button class="game-reset">Try again?</button>
      </div>
    `;
  };

  const setState = newState => {
    state = { ...state, ...newState };

    render();
  };

  $root.addEventListener('click', e => {
    if (!e.target.matches('.game-grid-item') || e.target.textContent !== '' || state.isFinish) return;

    const board = state.board.map((_, idx) => (idx === +e.target.dataset.id ? state.player : _));

    const isFinish = WINNER_CONDITIONS.some(
      ([a, b, c]) => board[a] !== '' && board[a] === board[b] && board[b] === board[c]
    );

    setState({
      board,
      isFinish,
      player: state.player === 'X' ? 'O' : 'X',
    });
  });

  $root.addEventListener('click', e => {
    if (!e.target.matches('.game-reset')) return;

    setState({
      board: new Array(9).fill(''),
      player: 'X',
      isFinish: false,
    });
  });

  render();
};

export default TicTacToe;
