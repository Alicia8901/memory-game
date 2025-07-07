const gameBoard = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");

let symbols = ["🍎", "🍌", "🍇", "🍓", "🍎", "🍌", "🍇", "🍓"];
let flippedCards = [];
let matchedPairs = 0;
let startTime;
let timerInterval;

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  gameBoard.innerHTML = "";
  shuffled = shuffle([...symbols]);

  shuffled.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.textContent = "";
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (this.classList.contains("flipped") || flippedCards.length === 2) return;

  this.textContent = this.dataset.symbol;
  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
      matchedPairs++;
      flippedCards = [];
      if (matchedPairs === symbols.length / 2) {
        clearInterval(timerInterval);
        alert(`You won in ${Math.floor((Date.now() - startTime) / 1000)} seconds!`);
      }
    } else {
      setTimeout(() => {
        card1.textContent = "";
        card2.textContent = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Time: ${elapsed}s`;
  }, 1000);
}

function restartGame() {
  matchedPairs = 0;
  flippedCards = [];
  clearInterval(timerInterval);
  timerDisplay.textContent = "Time: 0s";
  createBoard();
  startTimer();
}

restartBtn.addEventListener("click", restartGame);

// Start game on load
createBoard();
startTimer();