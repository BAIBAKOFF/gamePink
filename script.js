'use strict';
//Выборка элементов
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const PlayerName = document.querySelector('.name');

//Условия игры
score0Element.textContent = 0; //в score0Element Меняем текст контента на 0
score1Element.textContent = 0; //в score1Element Меняем текст контента на 0

let totalScores, currentScore, activePlayer, isPlaing;

const initGame = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.remove('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');

  diceElement.classList.add('hidden'); //добавили класс hidden(закрывает изоброжение), при удаление класса hidden, картинка появится.
};
initGame();

const switchActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active'); //Добавляет класс, если в списке нет его, удаляет, если он есть
  player1Element.classList.toggle('player--active');
};
//Бросает кубик

btnRoll.addEventListener('click', function () {
  if (isPlaing) {
    //1.Сгенирировать случайное число
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    //2.Отоброзить число на кубике
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;
    console.log(diceNumber);

    //3. Если число 1, переключится на другого игрока. добавляем очки, если число не равно 1
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0Element.classList.toggle('player--active'); //Добавляет класс, если в списке нет его, удаляет, если он есть
      player1Element.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaing) {
    //1.Добавит текущие очки игрока, к постоянным очкам
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    //2. Если общие очки равны 100, то заканчиваем игру. если нет, переход хода
    if (totalScores[activePlayer] >= 20) {
      isPlaing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);
