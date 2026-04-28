var timerEl = document.getElementById("timer");
var timeLeft = 50;
var penalty = 5;
var timerID;
var titleEl = document.getElementById("title");
var quizEl = document.getElementById("quiz");
var viewHighScores = document.getElementById("viewScores");
var submitButton = document.getElementById("submit");
var highscoresEl = document.getElementById("highscores");
var scoreList = document.getElementById("all-scores");
var scoreResults = document.getElementById("results");
var scoreEl = document.getElementById("score");
var startButton = document.getElementById("start");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var initialsEl = document.querySelector("#initials");
var clearButton = document.querySelector("#clear");
var backButton = document.querySelector("#back");
var currentQuestion = 0;
var currQuestion;
var ulCreate = document.createElement("ul");
var score = 0;
var gameover;

startButton.addEventListener("click", startQuiz);

function timeSecond() {
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
    } else {
        timeLeft--;
    }
}

var questions = [
    {
        question: "Which one is most likely to catch you cheating first?",
        choices: ["Your partner", "Your diet", "Your phone's screen time report", "Your professor using Turnitin"],
        answer: "Your professor using Turnitin"
    },
    {
        question: "Why do group projects exist?",
        choices: ["To build teamwork", "To test patience", "To let one person do everything", "To create villains"],
        answer: "To let one person do everything"
    },
    {
        question: "True or False: You used A.I. for this class",
        choices: ["True. I just don't understand sometimes--or at all", "False. I pay attention in class"],
        answer: "False. I pay attention in class"
    },
];

function startQuiz() {
    timerID = setInterval(timeSecond, 1000);
    titleEl.classList.add("hide");
    currentQuestion = 0;
    quizEl.classList.remove("hide");
    
    timeSecond();
    questionCard();
};

function questionCard() {
    var currQuestion = questions[currentQuestion];
    questionEl.innerHTML = "";
    answersEl.innerHTML = "";
    questionEl.textContent = currQuestion.question;


    for (var i = 0; i < currQuestion.choices.length; i++) {
        var choice = currQuestion.choices[i];
        var choiceNode = document.createElement("li");
        choiceNode.textContent = choice;
        answersEl.appendChild(choiceNode);
        answersEl.addEventListener("click", (compare));
    }
};

function compare(event) {
    var selectedAnswer = event.target;
    if (selectedAnswer.matches("li")) {
        if (selectedAnswer.textContent === questions[currentQuestion].answer) {
            score = score + 10;
            currentQuestion++
        } else {
            timeLeft = timeLeft - penalty;
            
            if (timeLeft < 0) {
                timeLeft = 0;
            }
            alert("Wrong answer!");
        }
    }
    if (currentQuestion >= questions.length ) {
        gameover = "true";
        showScore();
        timeLeft = 0
    } else {
        questionCard();
    }
}

function showScore() {
    quizEl.classList.add("hide");
    scoreResults.classList.remove("hide");
    scoreResults.classList.add("show");

    var scoreDisplay = document.createElement("p");
    scoreEl.innerText = ("You scored " + score + "!");
    scoreEl.appendChild(scoreDisplay);
}

submitButton.addEventListener("click", highscoreDisplay);

function highscoreDisplay(event) {
    event.preventDefault();
    scoreResults.classList.add("hide");
    highscoresEl.classList.remove("hide");
    highscoresEl.classList.add("show");

    var initials = initialsEl.value;
    if (!initials) {
        console.log("Initials not entered");
    } else {
        var allScore = {
            initials: initials,
            score: score
        }
        console.log(allScore);

        var everyHighscore = localStorage.getItem("everyHighscore");
        if (!everyHighscore) {
            everyHighscore = [];
        } else {
            everyHighscore = JSON.parse(everyHighscore);
            if (everyHighscore !== null){
                for (var i = 0; i < everyHighscore.length; i++) {
                    var createLi = document.createElement("li");
                    createLi.textContent = everyHighscore[i].initials + " " + everyHighscore[i].score;
                    scoreList.appendChild(createLi);

                }
            }
        }
        everyHighscore.push(allScore);
        var newScore = JSON.stringify(everyHighscore);
        localStorage.setItem("everyHighscore", newScore);
    }
}

clearButton.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

backButton.addEventListener("click", function () {
    window.location.replace("./index.html");
});
