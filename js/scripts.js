
const playerX = 'X';
const playerO = 'O';
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const squareElements = document.querySelectorAll('[xo-square]');
const boardElements = document.getElementById('board');
const winningMessage = document.getElementById('winning-message');
const restartButton = document.getElementById('restart-button');
const winningMessageString = document.getElementById('winning-message');
let isPlayerOTurn = false;

startGame()
restartButton.addEventListener('click', startGame);

function startGame() {
  isPlayerOTurn = false;
  squareElements.forEach(square => {
  square.classList.remove(playerX);
  square.classList.remove(playerO);
  square.removeEventListener('click', handleSquareClick);
  square.addEventListener('click', handleSquareClick, { once: true});
  });
  setBoardHoverClass()
  winningMessageString.classList.remove('show');
}

function handleSquareClick(event) {
  const square = event.target;
  const currentClass = isPlayerOTurn ? PLAYER-O-CLASS : PLAYER-X-CLASS;
  placeMark(square, currentClass)
  if (checkWin(currentClass)) {
    endGame(false);
  } else {
    swapTurns();
    setBoardHoverClass();
  }

  function endGame(draw) {
    if (draw) {
      winningMessageString.innerText = `It's a draw!`;
    }else {
      winningMessageString.innerText = `Player with ${isPlayerOTurn ? `O's'` : `X's`} wins!`;
    }
    winningMessageString.classList.add('show');
  }
}

