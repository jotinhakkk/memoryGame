const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [

  'argonio',
  'argonio2',
  'bario',
  'bario2',
  'berilio',
  'berilio2',
  'bromo',
  'bromo2',
  'calcio',
  'calcio2',
  'carbono',
  'carbono2',
  'cesio',
  'cesio2',
  'cloro',
  'cloro2',
  'cobalto',
  'cobalto2',
  'cobre',
  'cobre2',
  'criptonio',
  'criptonio2',
  'cromo',
  'cromo2',
  'enxofre',
  'enxofre2',
  'estroncio',
  'estroncio2',
  'ferro',
  'ferro2',
  'fluor',
  'fluor2',
  'fosforo',
  'fosforo2',
  'helio',
  'helio2',
  'iodo',
  'iodo2',
  'litio',
  'litio2',
  'magnesio',
  'magnesio2',
  'manganes',
  'manganes2',
  'neonio',
  'neonio2',
  'niobio',
  'niobio2',
  'niquel',
  'niquel2',
  'nitrogenio',
  'nitrogenio2',
  'ouro',
  'ouro2',
  'oxigenio',
  'oxigenio2',
  'platina',
  'platina2',
  'plutonio',
  'plutonio2',
  'potassio',
  'potassio2',
  'prata',
  'prata2',
  'radonio',
  'radonio2',
  'rubidio',
  'rubidio2',
  'selenio',
  'selenio2',
  'sodio',
  'sodio2',
  'titanio',
  'titanio2',
  'uranio',
  'uranio2',
  'xenonio',
  'xenonio2',
  'zicornio',
  'zicornio2',
  
  
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 80) {
    clearInterval(this.loop);
    alert(`ParabÃ©ns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

const checkFirstFourLetters = (firstCard, secondCard) => {
  const firstCharacter = firstCard.getAttribute('data-character').substring(0, 4);
  const secondCharacter = secondCard.getAttribute('data-character').substring(0, 4);

  return firstCharacter === secondCharacter;
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character').substring(0, 4);
  const secondCharacter = secondCard.getAttribute('data-character').substring(0, 4);

  if (checkFirstFourLetters(firstCard, secondCard)) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500);
  }
};


const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}