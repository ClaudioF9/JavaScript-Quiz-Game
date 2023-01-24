//for timer there are two inputs

let buttStart = document.querySelector("#start");
let timeCount = document.querySelector("#time");
let screen = document.querySelector(".wrapper");

//for feedback input
let feedbackRes = document.querySelector("#feedback");

// console.log(screen);
// console.log(screen.children[0]);

//variables for the questions-------------------------
let questionsContainer = document.getElementById("questions");
let questionTitle = document.getElementById("question-title");
let choicesContainer = document.getElementById("choices");

//function to add 1st question----------------------------
// function addQuestions(questions) {
//     for (let i = 0; i < questions.length; i++) {
//         questionTitle.innerText = questions[i].title;

//         choicesContainer.innerHTML = "";
//         for (let q = 0; q < questions[i].choices.length; q++) {
//             let choice = document.createElement("button");
//             choice.innerHTML = questions[i].choices[q].answer;
//             choicesContainer.appendChild(choice);
//         }
//     }

let score = 0; // set score to 0
let currentQuestion = 0;

function addQuestions(questions) {
    questionTitle.innerHTML = questions[currentQuestion].title;
    choicesContainer.innerHTML = "";
    for (let q = 0; q < questions[currentQuestion].choices.length; q++) {
        let choice = document.createElement("button");
        choice.innerHTML = questions[currentQuestion].choices[q].answer;
        choicesContainer.appendChild(choice);
    }
}

addQuestions(questionList);

choicesContainer.addEventListener("click", function(event){
    if (event.target.tagName === "BUTTON") {
        let isCorrect = false;
        for (let i = 0; i < questionList[currentQuestion].choices.length; i++) {
            if (event.target.innerHTML === questionList[currentQuestion].choices[i].answer && questionList[currentQuestion].choices[i].isCorrect) {
                isCorrect = true;
                break;
            }
        }

        if (isCorrect) {
            score++; // Increase the score if the answer is correct
            document.getElementById("feedback").classList.remove("hide");
            feedbackRes.textContent = "Correct!";
        } else {
            document.getElementById("feedback").classList.remove("hide");
            feedbackRes.textContent = "Wrong!";
            console.log("Wrong");
            secondsLeft = secondsLeft - 5;
        }

        if (currentQuestion < questionList.length - 1) {
            currentQuestion++;
            addQuestions(questionList);
        } else {
            clearInterval(timerInterval);
            endMessage();
        }
    }
});



let timerInterval;



//Timer Complete Function--------------------------
let secondsLeft = 60;
timeCount.textContent = secondsLeft;

//creating the function for the timer
function countDownTimer() {

    timerInterval = setInterval(function() {
        secondsLeft--;
        timeCount.textContent = secondsLeft;

        if(secondsLeft === 0) {

            //this will call the endMessage for the highscore
            
            endMessage();
        }
    }, 1000);
}

// countDownTimer();

//--------------------------------------------------------

//This is the addeventlistener that the is linked to the button
buttStart.addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("start-screen").classList.add("hide");
    document.getElementById("questions").classList.remove("hide");
    countDownTimer();

    addQuestions(questionList);
}
);

//---------------------------------------------------

//function once timer ends

let finalScore = document.getElementById("final-score");

function endMessage(){
    document.getElementById("questions").classList.add("hide");
    document.getElementById("end-screen").classList.remove("hide");
    finalScore.textContent = score;
    feedbackRes.textContent = "Thanks you for playing!";
};

// console.log(questionList);

//Storing scores-----------------------------------------
let saveButton = document.querySelector("#submit");
let initials = document.querySelector("#initials");


saveButton.addEventListener("click", function(event) {
    event.preventDefault();

    let initialsInput = document.getElementById("initials").value;
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push({initials: initialsInput, score: score});
    localStorage.setItem("highscores", JSON.stringify(highscores));



    let highscoresList = document.getElementById("highscores");
    
    for (let i = 0; i < highscores.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${highscores[i].initials} - ${highscores[i].score}`;
        highscoresList.appendChild(li);
    }
    // let savedScore = {
    //     initials: initials.value,
    //     score: score
    // };

    // const myJSON = JSON.stringify(savedScore);
    // localStorage.setItem("savedScore", myJSON);


    // initials = document.querySelector("#initials").value;
    // localStorage.setItem("Initials", initials);
    // localStorage.setItem("Score", score);
    feedbackRes.textContent = "Score submitted :))";

    // console.log(savedScore);
})







// initials = document.querySelector("#initials").value;

// localStorage.setItem("Initials", initials);
// localStorage.setItem("Score", score);


//highscores
