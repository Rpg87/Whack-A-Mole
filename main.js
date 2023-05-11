'use strict';

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const btnStart = document.querySelector('.startGame');
const hard = document.querySelector('.hard');
const background = document.querySelector('body');
const title = document.querySelector('.classic');
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
function changeStyles(element, style1, style2) {
    if (element) {
        element.classList.add(style1);
        element.classList.remove(style2);
    }
}
function onlyRemove(element, styleR) {
    element.classList.remove(styleR)
}


/*This function is used to avoid having to copy and paste:
moles.forEach(mole => mole.classList.remove('anyStyle'));
moles.forEach(mole => mole.classList.add('otherStyle')); */
function applyStylesToMoles(moles, removeClass, addClass) {
    moles.forEach(function (mole) {
        mole.classList.remove(removeClass);
        mole.classList.add(addClass);
    });
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
    // background.classList.remove('change1')
    title.innerHTML = 'Whack - a - mole!';
    changeStyles(title, 'classic', 'harder')
    onlyRemove(background, 'change1')
    applyStylesToMoles(moles, 'fastmole', 'mole')
    // moles.forEach(mole => mole.classList.remove('fastmole'));
    // moles.forEach(mole => mole.classList.add('mole'));
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
}


function peepMdm() {

    console.log(moles)
    const time = randomTime(300, 1000);
    console.log(time)
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up')
        if (!timeUp) peepMdm();
    }, time)
};



function hardLvl() {
    applyStylesToMoles(moles, 'mole', 'fastmole')
    changeStyles(title, 'harder', 'classic')
    changeStyles(background, 'change1', 'classic')
    // title.textContent = 'Whack - a - punk!';
    title.innerHTML = 'Whack - a - punk!';
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