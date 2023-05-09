'use strict';

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const btnStart = document.querySelector('.startGame');
const hard = document.querySelector('.hard');
const background = document.querySelector('html');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return (Math.round(Math.random() * (max - min) + min))
};

function randomHole(holes) {
    const rdm = Math.floor(Math.random() * holes.length);
    const hole = holes[rdm];
    if (hole === lastHole) {
        console.log('Sorry, taken')
        return randomHole(holes)
    }
    lastHole = hole;
    return hole;
}


function peep() {
    const time = randomTime(300, 1000);
    console.log(moles)
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up')
        if (!timeUp) peep();
    }, time)
};
function startGame() {
    background.classList.remove('change1')
    moles.forEach(mole => mole.classList.remove('fastmole'));
    moles.forEach(mole => mole.classList.add('mole'));
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
}


function peepMdm() {

    console.log(moles)
    const time = randomTime(200, 100);
    console.log(time)
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up')
        if (!timeUp) peep();
    }, time)
};

function hardLvl() {
    moles.forEach(mole => mole.classList.remove('mole'));
    moles.forEach(mole => mole.classList.add('fastmole'));
    background.classList.add('change1')
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peepMdm();
    setTimeout(() => timeUp = true, 10000)
}

function bonk(e) {
    if (!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
btnStart.addEventListener('click', startGame);
hard.addEventListener('click', hardLvl);