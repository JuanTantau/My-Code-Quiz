// Elements
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var highscoreDiv = document.getElementById("high-scorePage");
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var quizTimer = document.getElementById("timer");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");

var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz questions
var quizQuestions = [{
    question: "Who invented JavaScript?",
    choiceA: "Douglas Crockford",
    choiceB: "Sheryl Sandberg",
    choiceC: "Brendan Eich",
    choiceD: "Ron Conway",
    correctAnswer: "c"},
  {
    question: "Which one of these is a JavaScript package manager?",
    choiceA: "Node.js",
    choiceB: "TypeScript",
    choiceC: "Npm",
    choiceD: "HTML",
    correctAnswer: "c"},
   {
    question: "Which tool can you use to ensure code quality?",
    choiceA: "Angular",
    choiceB: "jQuery",
    choiceC: "RequireJS",
    choiceD: "ESLint",
    correctAnswer: "d"},
    {
    question: "Which character entity would you use to display extra spaces on a webpage?",
    choiceA: "& nbsp;",
    choiceB: "& reg;",
    choiceC: "& gt;",
    choiceD: "& it;",
    correctAnswer: "a"},
    {
    question: "What two things do you need to create webpages & view them?",
    choiceA: "A text editor and a web browser",
    choiceB: "A compiler and a web browser",
    choiceC: "A text editor and a compiler",
    choiceD: "None of the above",
    correctAnswer: "a"},  
    {
    question: "What are the different levels of headings in HTML?",
    choiceA: "Big, Bigger, Biggest",
    choiceB: "Bold, Italic, Underline, Typewriter text",
    choiceC: "h1, h2, h3, h4, h5, h6",
    choiceD: "None of the above",
    correctAnswer: "c"},
    {
    question: "Where is the text of the title tag displayed?",
    choiceA: "At the top of your webpage",
    choiceB: "On the browser page, but not the web page",
    choiceC: "Both on the browser and on the web page itself.",
    choiceD: "Only in the code, it doesn't display in the browser at all",
    correctAnswer: "b"},
        
    
    ];
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 75;
var timerInterval;
var score = 0;
var correct;

// This function generates quiz questions
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// This function starts the quiz and timer
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// This function displays your quiz score once finished or time runs out
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function shows the high score
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage and the high scores
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function replays the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function check if answer is correct or incorrect
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

startQuizButton.addEventListener("click",startQuiz);
