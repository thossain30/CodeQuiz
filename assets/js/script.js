// Start Page
let startPage = document.querySelector(".start-page")
// Page with questions and answers on it
let questionPage = document.querySelector(".question-container");
// Page that displays allows you to add high scores
let scoresPage = document.querySelector(".score-page");
// Page that allows you to see high scores
let displayPage = document.querySelector(".display-page");

// Button to begin the quiz
let startButton = document.querySelector(".start-button");
// Button to add score and return to start page
let addButton = document.querySelector(".add-button");
// Button to go from display page to start page
let returnButton = document.querySelector(".return-button");
// Amount of time left
let timeRemaining = document.querySelector(".start-timer");
// Player Score
let score = document.querySelector(".score");
let finalscore = document.querySelector(".finalscore");
let scoreNum = parseInt(score.textContent);

// List of high scores
let scoresList = document.querySelectorAll(".scores-list");
// Name textbox
let name = document.querySelector(".name");

let shuffledQuestions, currentQuestionIndex;
let questionElement = document.querySelector(".question");
let answersElement = document.querySelector(".answers");

let highscores = document.querySelector(".highscores")

let timeLeft;
function startQuiz() {
    timeRemaining.textContent = 75;
    scoreNum = 0;
    score.textContent = 0;
    score.setAttribute("style", "color: black");
    timeRemaining.setAttribute("style", "color: black")
    timeLeft = parseInt(timeRemaining.textContent);
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    startPage.classList.add("hide");
    questionPage.classList.remove("hide");
    setNextQuestion();
    time = setInterval(() => {
        if (timeLeft <= 1) {
            displayScorePage();
        }

        timeLeft--;

        // Turns time red when you have less than 10 seconds left
        if (timeLeft < 10) {
            timeRemaining.setAttribute("style", "color: red; font-size: 32px");
        }
        // Sets time remaining text to new decremented number
        timeRemaining.textContent = timeLeft + " ";
    }, 1000)
}

// function to take value from text input and add to ol
function addHighScore() {
    let newScore = document.createElement("li");
    newScore.textContent = scoreNum + " " + name.value;
    scoresList.forEach(element => {
        element.appendChild(newScore); 
    });
    console.log(scoresList.entries);
    localStorage.setItem("score-list", scoresList);
    console.log(localStorage.getItem("score-list"));
}

// returns to start page from score page
function addScoreandRestart() {
    addHighScore();
    clearInterval(time);
    questionPage.classList.add("hide");
    scoresPage.classList.add("hide");
    startPage.classList.remove("hide");
    displayPage.classList.add("hide");
}

function restart() {
    questionPage.classList.add("hide");
    scoresPage.classList.add("hide");
    startPage.classList.remove("hide");
    displayPage.classList.add("hide");
}

// Stops Timer and runs code to transition to Score Add Page
function displayScorePage() {
    finalscore.textContent = scoreNum;
    clearInterval(time);
    localStorage.getItem("score-list");
    questionPage.classList.add("hide");
    startPage.classList.add("hide");
    scoresPage.classList.remove("hide");
    displayPage.classList.add("hide");
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
    if (correct) { 
        scoreNum += 100;
        score.textContent = scoreNum + "           // correct";
        score.setAttribute("style", "color: green");
    } else {
        scoreNum -= 25;
        score.textContent = scoreNum + "           // incorrect";
        score.setAttribute("style", "color: red");
    }
    if (currentQuestionIndex >= questions.length - 1) {
        displayScorePage();
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

function displayHighScores() {
    clearInterval(time);
    questionPage.classList.add("hide");
    scoresPage.classList.add("hide");
    startPage.classList.add("hide");
    displayPage.classList.remove("hide");
}

let questions = [
    {
        question: "Which of these is NOT a primitive data type?", 
        answers: [
            {text: "null", correct: false},
            {text: "string", correct: false},
            {text: "boolean", correct: false},
            {text: "object", correct: true},
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
    },
    {
        question: "Inside which HTML element do we put our JavaScript file?", 
        answers: [
            {text: "<javascript>", correct: false},
            {text: "<script>", correct: true},
            {text: "<js>", correct: false},
            {text: "<scripting>", correct: false},
        ]
    },
    {
        question: "What is the correct syntax for referring to an external script called \"xxx.js\"?", 
        answers: [
            {text: "<script href=\"xxx.js\">", correct: false},
            {text: "<script src=\"xxx.js\">", correct: true},
            {text: "<script code=\"xxx.js\">", correct: false},
            {text: "<script name='xxx.js'>", correct: false},
        ]
    },
    {
        question: "How do you write \"Hello World\" in an alert box?", 
        answers: [
            {text: "alertBox(\"Hello World\");", correct: false},
            {text: "msgBox(\"Hello World\");", correct: false},
            {text: "msg(\"Hello World\");", correct: false},
            {text: "alert(\"Hello World\");", correct: true},
        ]
    },
    {
        question: "How do you write an IF statement in Javascript?", 
        answers: [
            {text: "if i == 5 then", correct: false},
            {text: "if (i == 5)", correct: true},
            {text: "if i = 5 then", correct: false},
            {text: "if i = 5", correct: false},
        ]
    },
    {
        question: "How does a FOR loop start?", 
        answers: [
            {text: "for (let i = 0; i <= 5; i++)", correct: true},
            {text: "for i = 1 to 5", correct: false},
            {text: "for (i = 0; i <= 5)", correct: false},
            {text: "for (i <= 5; i++)", correct: false},
        ]
    }, 
    {
        question: "What is the correct way to write a JavaScript array?", 
        answers: [
            {text: "var colors = [\"red\", \"green\", \"blue\"]", correct: true},
            {text: "var colors = \"red\", \"green\", \"blue\"", correct: false},
            {text: "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")", correct: false},
            {text: "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")", correct: false},
        ]
    },
    {
        question: "How do you find the number with the highest value of x and y?", 
        answers: [
            {text: "top(x,y)", correct: false},
            {text: "ceil(x,y)", correct: false},
            {text: "Math.ceil(x,y)", correct: false},
            {text: "Math.max(x,y)", correct: true},
        ]
    },
    {
        question: "Which operator is used to assign a value to a variable?", 
        answers: [
            {text: "*", correct: false},
            {text: "X", correct: false},
            {text: "=", correct: true},
            {text: "-", correct: false},
        ]
    }
]

startButton.addEventListener("click", startQuiz);
highscores.addEventListener("click", displayHighScores);
addButton.addEventListener("click", addScoreandRestart);
returnButton.addEventListener("click", restart);
