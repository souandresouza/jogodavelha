'use strict'

const documentRef = document,
      columns = Array.from(documentRef.querySelectorAll('.board > span')),
      resetButton = documentRef.querySelector('#reset');
let currentPlayer = true;
let boardState = new Array(9).fill(null);
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function setupEventListeners(enable) {
  resetButton.addEventListener('click', resetGame);
  for (let column of columns) {
    if (enable) {
      column.addEventListener('click', handlePlay);
    } else {
      column.removeEventListener('click', handlePlay);
    }
  }
}

setupEventListeners(true);

function handlePlay(event) {
  const target = event.target;
  if (!target.innerHTML) {
    currentPlayer = !currentPlayer;
    target.innerHTML = currentPlayer ? '<h1 name="O">O</h1>' : '<h1 name="X">X</h1>';
    updateBoardState(parseInt(target.id.split(/\D+/g)[1]), target.childNodes[0].getAttribute('name'));
  }
}

function updateBoardState(index, symbol) {
  boardState[index] = symbol;
  console.log(boardState);

  for (let i = 0; i < winningCombinations.length; i++) {
    let [a, b, c] = winningCombinations[i];
    if (checkWin(boardState[a], boardState[b], boardState[c])) {
      console.log(symbol, ' wins');
      setupEventListeners(false);
      columns[a].classList.add('win');
      columns[b].classList.add('win');
      columns[c].classList.add('win');
    }
  }
}

function checkWin(a, b, c) {
  return a && b && c && (a === b) && (a === c);
}

function resetGame() {
  for (let column of columns) {
    column.classList.remove('win');
    column.innerHTML = '';
  }
  boardState = new Array(9).fill(null);
  setupEventListeners(true);
}