'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let activePlayer, playing, currentScore, scores;

// starting the game and making the initail value funtion
const initailCondtion = function () {
  // removing the winner class from active player
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');

  // removing all applied classes
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // set all scores to zero
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //   seting all the variables to initial values 
  scores = [0, 0];
  playing = true;
  activePlayer = 0;
  currentScore = 0;
};

// calling initialCondition function
initailCondtion();

// function for switching the players
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// dice roll button funtions
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating the dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // displaying the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for roll 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// hold button function
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active players score
    scores[activePlayer] += currentScore; 
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if a player gets 50 points or not and declare a winner
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// code for reseting the game
btnNew.addEventListener('click', initailCondtion);
