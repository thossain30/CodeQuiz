// Start Page
let startPage = document.querySelector(".start-page")
// Page with questions and answers on it
let questionPage = document.querySelector(".question-container");
// Button to begin the quiz
let startButton = document.querySelector(".start-button");
// Tool to debug timer related events
let stopButton = document.querySelector(".stop");
// Amount of time left
let timeRemaining = document.querySelector(".start-timer");

let shuffledQuestions, currentQuestionIndex;
let questionElement = document.querySelector(".question");
let answersElement = document.querySelector(".answers");

let timeLeft;
function startQuiz() {
    timeRemaining.textContent = 19;
    timeRemaining.setAttribute("style", "color: black")
    timeLeft = parseInt(timeRemaining.textContent);
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    startPage.classList.add("hide");
    questionPage.classList.remove("hide");
    setNextQuestion();
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
    }, 1000)
}


// Stops Timer and runs code for losing
function stopQuiz() {
    clearInterval(time);
    questionPage.classList.add("hide");
    startPage.classList.remove("hide");
}

// displays the next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Displays a question and its answers
function showQuestion(question) {
    // Sets the question header to the question
    questionElement.textContent = question.question;
    // adds the answers for the question to the question page
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answersElement.appendChild(button);
    });
}

// resets the answers before rendering the next question
function resetState() {
    while(answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    console.log("index: " + currentQuestionIndex);
    if (currentQuestionIndex >= questions.length - 1) {
        stopQuiz();
    } else {
        currentQuestionIndex++;
        setNextQuestion();
    }
    setStatusClass(document.body, correct);
    Array.from(answersElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
}

function setStatusClass(element, correct) {
    clearStatus(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatus(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}
let questions = [
    {
        question: "What is 2 + 2?", 
        answers: [
            {text: "4", correct: true},
            {text: "22", correct: false},
            {text: "38", correct: false},
            {text: "3", correct: false},
        ]
    },
    {
        question: "What is the extension for a JavaScript file?", 
        answers: [
            {text: "java", correct: false},
            {text: "script", correct: false},
            {text: "js", correct: true},
            {text: "jsx", correct: false},
        ]
    }
]

startButton.addEventListener("click", startQuiz);
// Tool to debug timer related events
stopButton.addEventListener("click", stopQuiz)
