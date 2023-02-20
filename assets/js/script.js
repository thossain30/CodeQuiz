let startButton = document.querySelector(".start-button");
let stopButton = document.querySelector(".stop");
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
        timeRemaining.textContent = timeLeft + " ";
    }, 1000);
}


// Stops Timer and runs code for losing
function stopTimer() {
    clearInterval(time);
}

startButton.addEventListener("click", startTimer);

// Tool to debug timer related events
stopButton.addEventListener("click", stopTimer)