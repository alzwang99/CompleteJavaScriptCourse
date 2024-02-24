'use strict';

let randomNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;

let highscore = 0;

const textSet = function (className, message) {
    document.querySelector(className).textContent = message;
}

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);
    //No Input
    if (!guess) {
        textSet(".message", "No number was inputted.");
    }
    //just right
    else if (guess === randomNumber) {
        textSet(".message", "You Win!");
        textSet(".number", randomNumber);
        document.querySelector('body').style.backgroundColor = "#60b347";
        document.querySelector('.number').style.width = "30rem";
        alert("You Win");
        if (score > highscore) {
            highscore = score;
            textSet(".highscore", highscore);
        }
    }
    //If Wrong
    else if (guess !== randomNumber && score > 1) {
        textSet(".message", guess > randomNumber ? "Too High" : "Too Low");
        score--
        textSet(".score", score);
    }
    //Lose
    else if (guess !== randomNumber && score <= 1) {
        alert("You Lose");
        score = 20;
        textSet(".score", score);
        document.querySelector('.guess').value = "";
    }
})

document.querySelector(".again").addEventListener("click", function () {
    score = 20;
    randomNumber = Math.trunc(Math.random() * 20) + 1;
    textSet(".score", score);
    textSet(".message", "Start Guessing...");
    textSet(".number", "?");
    document.querySelector('.guess').value = "";
    document.querySelector('body').style.backgroundColor = "#222";
    document.querySelector('.number').style.width = "15rem";
}) 