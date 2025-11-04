

/* =========================================================
   🧠 JavaScript Genius Quiz - Script Structure
   This file contains all logical sections needed for the quiz.
   Each part includes comments describing what should be implemented.
   ========================================================= */

/* -----------------------------
   📁 1. Data Section
----------------------------- */
// Create an array of question objects.
// Each question should contain:
// - question text
// - array of answer options with text and a "correct" boolean
// Example structure:
/*
const questions = [
  {
    question: "What is JavaScript primarily used for?",
    answers: [
      { text: "Styling web pages", correct: false },
      { text: "Adding interactivity", correct: true },
      { text: "Database management", correct: false }
    ]
  },
  ...
];
*/


/* -----------------------------
   🧩 2. Global Variables  *A*
----------------------------- */
// Define variables to track:
// - current question index
// - user score
// - total questions
// - references to HTML elements (DOM elements for screens, buttons, etc.)


/* -----------------------------
   🚀 3. Initialization *B*
----------------------------- */
// Write a function that initializes the quiz logic after the page loads.
// Example:
// - Hide or show specific screens
// - Attach event listeners to buttons
// - Prepare the first question


/* -----------------------------
   ▶️ 4. Start Game Function *B*
----------------------------- */
// Function name: startGame()
// Purpose:
// - Hide the start screen
// - Show the quiz screen
// - Reset score and question index
// - Call the function to show the first question


/* -----------------------------
   ❓ 5. Show Question Function *A*
----------------------------- */
// Function name: showQuestion()
// Purpose:
// - Get the current question object from the array
// - Update the DOM with question text and answer buttons
// - Make sure old answers are cleared before showing new ones


/* -----------------------------
   🖱️ 6. Select Answer Function *A-B* Logic (A) checks correctness, UI (B) handles colors & button states
----------------------------- */
// Function name: selectAnswer(event)
// Purpose:
// - Determine if the clicked answer is correct
// - Give visual feedback (e.g., green/red highlight)
// - Update the score if correct
// - Enable the "Next" button or show feedback


/* -----------------------------
   ⏭️ 7. Next Question Function *A*
----------------------------- */
// Function name: nextQuestion()
// Purpose:
// - Move to the next question
// - Check if there are remaining questions
// - If yes → show the next question
// - If no → call showResults()


/* -----------------------------
   🔁 8. Skip Question Function *B*
----------------------------- */
// Function name: skipQuestion()
// Purpose:
// - Skip the current question without changing the score
// - Move directly to the next question
// - Should not penalize the user


/* -----------------------------
   🧾 9. Show Results Function *A*
----------------------------- */
// Function name: showResults()
// Purpose:
// - Hide quiz screen
// - Show result screen
// - Display final score and a feedback message


/* -----------------------------
   🔄 10. Restart Function *B*
----------------------------- */
// Function name: restartQuiz()
// Purpose:
// - Reset all values (score, index, etc.)
// - Hide result screen
// - Return to start screen


/* -----------------------------
   ⚙️ 11. Event Listeners *A-B* A defines function references, B connects them to DOM
----------------------------- */
// Add listeners for:
// - "Start" button → startGame()
// - "Submit" or answer buttons → selectAnswer()
// - "Next" button → nextQuestion()
// - "Skip" button → skipQuestion()
// - "Restart" button → restartQuiz()


//Element
const startContainer = document.getElementById("start-container");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const questionNumberText = document.getElementById("question-number");

const resultText = document.getElementById("result-text");
const resultMessage = document.getElementById("result-message");

// Buttons
const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const skipBtn = document.getElementById("skip-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

//Quiz
//const question = [{text:""},antwoert[]]

let currentQuestion = 0;
let score = 0;
let selectAnswer = null;

showQuestion(){
 const ques = question [currentQuestion] ;

  questionText.textContent = ques.text;
  questionNumberText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  answerList.innerHTML = "";
  selectedAnswer = null;

  ques.answers.forEach((answer, index) => {
    const li = document.createElement("li");
    li.textContent = answer;
    li.classList.add("answer-option");
    li.addEventListener("click", () => selectAnswer(li, index));
    answerList.appendChild(li);
  });
};

startBtn.addEventListener("click",() =>{
 startContainer.style.display= "none";
  quizScreen.style.display = "black";
  showQuestion();
});

function nextQuestion(){
  currentQuestion++;
  if (currentQuestion >= question.length){
    showResult();
  }else 
    showQuestion();
};

function showResult(){
  resultText.textContent = `You scored ${score} out of ${questions.length}!`;
  resultMessage.textContent =
   if(score < 5){
    console.log("Keep practicing!")
  } if else( score < 8){
    console.log("Great job!")
  } else {
    console.log( "You are a JavaScript genius! 🚀")
  }
  
}

