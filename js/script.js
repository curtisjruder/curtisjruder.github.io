// Cards
const cardsArray = [
    {
        name: 'airplane',
        img: 'img/airplane.png'
    },
    {
        name: 'boat',
        img: 'img/boat.png'
    },
    {
        name: 'car',
        img: 'img/car.png'
    },
    {
        name: 'coins',
        img: 'img/coins.png'
    },
    {
        name: 'dog',
        img: 'img/dog.png'
    },
    {
        name: 'elephant',
        img: 'img/elephant.png'
    },
    {
        name: 'emaw',
        img: 'img/emaw.png'
    },
    {
        name: 'fish',
        img: 'img/fish.png'
    },
    {
        name: 'flower',
        img: 'img/flower.png'
    },
    {
        name: 'house',
        img: 'img/house.png'
    },
    {
        name: 'rainbow',
        img: 'img/rainbow.png'
    },
    {
        name: 'tree',
        img: 'img/tree.png'
    }
]

const game = document.getElementById('game')
const grid = document.createElement('section')
grid.setAttribute('class', 'grid')
game.appendChild(grid)

let count = 0;
let firstGuess = '';
let secondGuess = '';
let previousTarget = null;

let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(() => 0.5 - Math.random());

gameGrid.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${item.img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
})

grid.addEventListener('click', function (event) {
    let clicked = event.target;
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget)
        return;

    previousTarget = clicked;

    switch (count) { 
        case 0:
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
            count++;
            break;
        case 1:
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
            count++;
            setTimeout(match, 1200);
            setTimeout(resetGuesses, 1200);
            break;
        default:
            break;
    }
})

const match = () => {
    if (firstGuess !== secondGuess) 
       return;
    
    var selected = document.querySelectorAll('.selected')
    selected.forEach((card) => {
        card.classList.add('match')
    })
}
const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;

    var selected = document.querySelectorAll('.selected')
    selected.forEach((card) => {
        card.classList.remove('selected')
    })
}
