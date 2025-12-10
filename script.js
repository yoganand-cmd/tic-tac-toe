const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameOver = true;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
