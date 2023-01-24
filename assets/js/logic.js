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
    questionTitle.textContent = questions[currentQuestion].title;
    choicesContainer.textContent = "";
    for (let q = 0; q < questions[currentQuestion].choices.length; q++) {
        let choice = document.createElement("button");
        choice.textContent = questions[currentQuestion].choices[q].answer;
        choicesContainer.appendChild(choice);
    }
}

addQuestions(questionList);


// }
//-----
// choicesContainer.addEventListener("click", function(event){
//     if (event.target.tagName === "BUTTON") {
//         console.log(event.target);
//     }
// });
//---------




// Add a click event listener to the choices container
choicesContainer.addEventListener("click", function(event){
    if (event.target.tagName === "BUTTON") {
        // event.stopPropagation();
        // Check if the clicked button's text matches the correct answer
        for (let i = 0; i < questionList[currentQuestion].choices.length; i++) {
            if (event.target.textContent === questionList[currentQuestion].choices[i].answer && questionList[currentQuestion].choices[i].isCorrect) {
                score++; // Increase the score if the answer is correct
                document.getElementById("feedback").classList.remove("hide");
                feedbackRes.textContent = "Correct!";
                break;
            }
            else {

                document.getElementById("feedback").classList.remove("hide");
                feedbackRes.textContent = "Wrong!";

            console.log("wrong!");
        } 

        }
        // console.log(`Score: ${score}`);
        
        if (currentQuestion < questionList.length - 1) {
            currentQuestion++;
            addQuestions(questionList);
        } else {
            // console.log("Quiz finished!");
            // console.log(`Final score: ${score}`);
            endMessage();
        }
    }
});





// choicesContainer.addEventListener("click", function(event){
// console.log(choice);

// })

// let selection = document.querySelector("choices");
// choicesContainer.addEventListener("click", function(event){
//     event.stopPropagation();
//     console.log(choicesContainer);
    
// })



//Timer Complete Function--------------------------
let secondsLeft = 60;
timeCount.textContent = secondsLeft;

//creating the function for the timer
function countDownTimer() {

    let timerInterval = setInterval(function() {
        secondsLeft--;
        timeCount.textContent = secondsLeft;

        if(secondsLeft === 0) {

            clearInterval(timerInterval);
            //this will call the endMessage for the highsore
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
};

// console.log(questionList);
let saveButton = document.querySelector("#submit");

saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    initials = document.querySelector("#initials").value;

    localStorage.setItem("Initials", initials);
    localStorage.setItem("Score", score);
})

// initials = document.querySelector("#initials").value;

// localStorage.setItem("Initials", initials);
// localStorage.setItem("Score", score);