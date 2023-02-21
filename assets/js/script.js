// Button to begin the quiz
let startButton = document.querySelector(".start-button");
// Tool to debug timer related events
let stopButton = document.querySelector(".stop");
// Amount of time left
let timeRemaining = document.querySelector(".start-timer");

let timeLeft = parseInt(timeRemaining.textContent);
function startTimer() {
    time = setInterval(() => {
        if (timeLeft <= 1) {
            stopTimer();
        }

        timeLeft--;

        // Turns time red when you have less than 10 seconds left
        if (timeLeft < 10) {
            timeRemaining.setAttribute("style", "color: red")
        }
        // Sets time remaining text to new decremented number
        timeRemaining.textContent = timeLeft + " ";
    }, 1000);
}


// Stops Timer and runs code for losing
function stopTimer() {
    clearInterval(time);
    timeRemaining.textContent = 19 + " ";
    timeRemaining.setAttribute("style", "color: black")
}

startButton.addEventListener("click", startTimer);
// Tool to debug timer related events
stopButton.addEventListener("click", stopTimer)