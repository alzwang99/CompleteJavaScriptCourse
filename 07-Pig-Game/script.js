'use strict';

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let currentScore = 0;
const scores = [0, 0];
let activePlayer = 0;
let activePlayerEl = document.getElementById(`current--${activePlayer}`);
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const switchPlayer = function () {
    currentScore = 0;
    activePlayerEl.textContent = currentScore;
    activePlayer === 0 ? activePlayer++ : activePlayer--;
    activePlayerEl = document.getElementById(`current--${activePlayer}`);
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

const resetGame = function () {
    scores[0] = 0;
    scores[1] = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore = 0;
    activePlayerEl.textContent = 0;
    activePlayerEl = document.getElementById(`current--0`);
    diceEl.classList.add("hidden");
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    activePlayer = 0;
}

btnRoll.addEventListener("click", function () {

    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
        currentScore += dice;
        activePlayerEl.textContent = currentScore;
    }
    else {
        switchPlayer();
    }
})

btnHold.addEventListener('click', function () {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
        alert(`Player ${activePlayer + 1} Wins!`);
        resetGame();
    }
    else {
        switchPlayer();
    }
});

btnNew.addEventListener('click', resetGame);