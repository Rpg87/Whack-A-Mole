'use strict';

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;

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
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up')
    }, time)
};