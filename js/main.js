const colors = {
    'null': 'Grey',
    '-1': 'Red',
    '1': 'Blue'
};
const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],
    [1,4,7],[2,5,8],[0,4,8],[2,4,6]
];
const boxes = document.querySelectorAll(".box");


let messageBoard = document.querySelector('h2');
let resetBtn = document.querySelector('.reset')
let board;
let turn;
let winner;


document.querySelector('.game-board').addEventListener('click', handleBoxClick);
document.querySelector('.reset').addEventListener('click', replayClick)



function init() {
    board = [null, null, null,
            null, null, null,
            null, null, null];
    turn = -1,
    winner = null;
    render();
}

function render() {
    for (let i = 0; i < boxes.length; i++) {
        let curentColor  = colors[board[i]];
        boxes[i].style.backgroundColor = curentColor;
    }
    if (winner === null) {
        messageBoard.innerText = `It is ${colors[turn]}'s turn!`;

    } else if (winner === 'T') {
        messageBoard.innerText = `It is a tie! Everyone wins!`;
        resetBtn.style.visibility = 'visible';
    } else {
        if (turn === 1) {
            messageBoard.innerText = `Red is Winner!`;
            resetBtn.style.visibility = 'visible';
        } else {
            messageBoard.innerText = `Blue is Winner!`;
            resetBtn.style.visibility = 'visible';
        }
    }
}

function handleBoxClick(event) {
    let currentIdx = event.target.id;
    if (board[currentIdx] !== null) {
        return;
    }
    if (winner !== null) {
        return;
    }
    board[currentIdx] = turn;
    turn *= -1;
    winner = isWinner();
    if (winner === null) {
        if (board.indexOf(null) === -1) {
            winner = 'T';
        }
    }
    render();
}

function    isWinner() {
    let result = null;
    winCombos.forEach(function(element) {
        let scoreCount = 0;
        element.forEach(function(element) {
            scoreCount += board[element];
        });
        scoreCount = Math.abs(scoreCount);
        if (scoreCount === 3) {
            result = board[element[0]];
        }
    });
    return result;
}

function replayClick() {
    init();
}

init();