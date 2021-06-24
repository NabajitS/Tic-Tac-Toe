const boxes = document.querySelectorAll('.box');

let state = true;           //

// let h1i = document.querySelector('h1 i');
let gameOver = false;

let activePlayer = 1;
let activePlayerSymbol = "X";
let noOfmoves = 0;

let playerTurnH1 = document.querySelector('.player-turn');
let restartBtn = document.querySelector('.restart');

let box1 = document.querySelector('.box1');
let box2 = document.querySelector('.box2');
let box3 = document.querySelector('.box3');
let box4 = document.querySelector('.box4');
let box5 = document.querySelector('.box5');
let box6 = document.querySelector('.box6');
let box7 = document.querySelector('.box7');
let box8 = document.querySelector('.box8');
let box9 = document.querySelector('.box9');

const winningCombinations = [
    [box3, box2, box1],
    [box1, box4, box7],
    [box7, box8, box9],
    [box9, box6, box3],
    //Now diagonals
    [box3, box5, box7],
    [box1, box5, box9],
    //Now through the board center
    [box2, box5, box8],
    [box4, box5, box6],
];

const overlay = document.querySelector('.overlay');

// Making the overlay remove on click after page load

document.querySelector('.btn').addEventListener('click', function () {
    if (gameOver == true) {
        return;
    }
    else {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    }
});



let changePlayer = function () {
    if (activePlayer == 1) {
        activePlayer = 2;
        activePlayerSymbol = 'O';
    }
    else {
        activePlayer = 1;
        activePlayerSymbol = 'X';
    }
}


let checkWinner = function (arr) {
    playerTurnH1.textContent = `Player ${activePlayer} : ${activePlayerSymbol}'s Turn`

    arr.forEach(function (set) {
        if (set[0].firstChild.classList.contains('fas') && set[1].firstChild.classList.contains('fas') && set[2].firstChild.classList.contains('fas')) {
            playerTurnH1.textContent = '';
            playerTurnH1.textContent = `Game Over -- player X won`
            gameOver = true;
        }

        if (set[0].firstChild.classList.contains('far') && set[1].firstChild.classList.contains('far') && set[2].firstChild.classList.contains('far')) {
            playerTurnH1.textContent = '';
            playerTurnH1.textContent = `Game Over -- player O won`
            gameOver = true;
        }
    })

    if (noOfmoves == 9) {
        playerTurnH1.textContent = '';
        playerTurnH1.textContent = `It's a Tie`
        gameOver = true;
    }

}


boxes.forEach(function (box) {
    box.addEventListener('click', function handler(e) {

        if (gameOver === true) {
            return;
        }

        if (state === true && e.target === box && !e.target.firstChild.classList.contains('fas') && !e.target.firstChild.classList.contains('far')) {
            e.target.firstChild.classList.add("fas");
            e.target.firstChild.classList.add("fa-times");
            state = false;
            noOfmoves++;
            changePlayer();
        }

        else if (state === false && e.target === box && !e.target.firstChild.classList.contains('far') && !e.target.firstChild.classList.contains('fas')) {
            e.target.firstChild.classList.add('far');
            e.target.firstChild.classList.add('fa-circle');
            state = true;
            noOfmoves++;
            changePlayer();
        }


        checkWinner(winningCombinations);
        console.log(noOfmoves);
    })
})

restartBtn.addEventListener('click', function () {
    state = true;
    gameOver = false;
    activePlayer = 1;
    activePlayerSymbol = "X";
    noOfmoves = 0;

    boxes.forEach(function (box) {
        box.firstChild.classList.remove('fas');
        box.firstChild.classList.remove('fa-times');

        box.firstChild.classList.remove('far');
        box.firstChild.classList.remove('fa-circle');

    })
    playerTurnH1.textContent = `Player ${activePlayer} : ${activePlayerSymbol}'s Turn`
}
)
