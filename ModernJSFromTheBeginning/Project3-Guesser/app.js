//Game values
let min = 1,
    max = 10,
    winningNum = getWinningNumber(min, max),
    guessesLeft = 3;

//Ui elements
const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.getElementById('guess-btn'),
    guessInput = document.getElementById('guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    //Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } else {
        // Check if won 
        if (guess === winningNum) {

            // game Over win
            gameOver(true, `${winningNum} is correct, YOU WIN!`);
        } else {
            guessesLeft -= 1;
            if (guessesLeft === 0) {
                // Game over - no chances left

                // Game over lose
                gameOver(false, `No chances left, the winning number was ${winningNum}, Game Over!`);
            } else {
                // wrong answer - chances Left
                //Change border color
                guessInput.style.borderColor = 'red';
                //Clear input value
                guessInput.value = '';
                // Set wrong answer message
                setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'Red');
            }
        }
    }

})

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    //disable input validation
    guessInput.disabled = true;
    //Change border color
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg, color);

    //play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Set message function
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// Get random winning number
function getWinningNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
