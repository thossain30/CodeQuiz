// Start Page
let startPage = document.querySelector(".start-page")
// Page with questions and answers on it
let questionPage = document.querySelector(".question");
// Button to begin the quiz
let startButton = document.querySelector(".start-button");
// Tool to debug timer related events
let stopButton = document.querySelector(".stop");
// Amount of time left
let timeRemaining = document.querySelector(".start-timer");

let timeLeft;
function startQuiz() {
    timeRemaining.textContent = 19;
    timeRemaining.setAttribute("style", "color: black")
    timeLeft = parseInt(timeRemaining.textContent);
    startPage.classList.add("hide");
    questionPage.classList.remove("hide");
    time = setInterval(() => {
        if (timeLeft <= 1) {
            stopQuiz();
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
function stopQuiz() {
    clearInterval(time);
    questionPage.classList.add("hide");
    startPage.classList.remove("hide");
}

function setNextQuestion() {

}

startButton.addEventListener("click", startQuiz);
// Tool to debug timer related events
stopButton.addEventListener("click", stopQuiz)