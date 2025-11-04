/* =========================================================
   🧠 JavaScript Genius Quiz - Final Working Version
   Team RENN
   ========================================================= */

// ----------------------------------------------------------
// ronak — ELEMENT SELECTIONS (slightly corrected)
// ----------------------------------------------------------
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

// ----------------------------------------------------------
// ronak — VARIABLES
// 🛠️ fixed: 'selectAnswer' variable name and added semicolons
// ----------------------------------------------------------
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null; // 🛠️ renamed for clarity

// ----------------------------------------------------------
// emre — QUESTIONS ARRAY (German version adapted to project structure)
// ----------------------------------------------------------
const questions = [
  {
    text: "Wofür steht 'DOM' in JavaScript?",
    answers: [
      "Document Object Model",
      "Data Object Management",
      "Digital Orientation Module",
      "Dynamic Output Method"
    ],
    correct: 0
  },
  {
    text: "Welches Schlüsselwort wird verwendet, um eine Konstante in JavaScript zu deklarieren?",
    answers: ["var", "let", "const", "constant"],
    correct: 2
  },
  {
    text: "Was gibt 'typeof null' in JavaScript zurück?",
    answers: ["null", "undefined", "object", "number"],
    correct: 2
  },
  {
    text: "Welche Methode wird verwendet, um ein Element am Ende eines Arrays hinzuzufügen?",
    answers: ["push()", "append()", "add()", "insert()"],
    correct: 0
  },
  {
    text: "Was prüft der '===' Operator in JavaScript?",
    answers: [
      "Nur Wertgleichheit",
      "Nur Typgleichheit",
      "Sowohl Wert- als auch Typgleichheit",
      "Nur Referenzgleichheit"
    ],
    correct: 2
  },
  {
    text: "Welcher der folgenden ist KEIN JavaScript-Datentyp?",
    answers: ["String", "Boolean", "Float", "Undefined"],
    correct: 2
  },
  {
    text: "Was ist das Ergebnis von '2' + 2 in JavaScript?",
    answers: ["4", "22", "NaN", "Fehler"],
    correct: 1
  },
  {
    text: "Welche Methode entfernt das letzte Element aus einem Array?",
    answers: ["shift()", "pop()", "remove()", "delete()"],
    correct: 1
  },
  {
    text: "Wofür steht 'NaN'?",
    answers: [
      "Not a Number",
      "Null and Negative",
      "New Array Number",
      "No Assigned Name"
    ],
    correct: 0
  },
  {
    text: "Welche Anweisung wird verwendet, um eine Schleife in JavaScript zu stoppen?",
    answers: ["stop", "exit", "break", "end"],
    correct: 2
  }
];


// ----------------------------------------------------------
// ronak (original showQuestion block)
// 🛠️ fixed: added 'function' keyword, fixed variable names
// ----------------------------------------------------------
function showQuestion() {
  const ques = questions[currentQuestion]; // 🛠️ fixed: 'question' → 'questions'

  questionText.textContent = ques.text;
  questionNumberText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  answerList.innerHTML = "";
  selectedAnswer = null;

  // 🛠️ fixed: correct event and variable naming
  ques.answers.forEach((answer, index) => {
    const li = document.createElement("li");
    li.textContent = answer;
    li.classList.add("answer-option");

    // highlight when clicked
    li.addEventListener("click", () => selectAnswerHandler(li, index));
    answerList.appendChild(li);
  });

  // 🛠️ hide Next button until an answer is chosen
  nextBtn.style.display = "none";
}

// ----------------------------------------------------------
// emre — SELECT ANSWER FUNCTION
// 🛠️ enhanced: added immediate color feedback and next button display
// ----------------------------------------------------------
function selectAnswerHandler(selectedLi, index) {
  const ques = questions[currentQuestion];
  const correctIndex = ques.correct;

  // disable all options after choosing
  const allLis = document.querySelectorAll(".answer-option");
  allLis.forEach((li) => (li.disabled = true));

  // check correctness and give visual feedback
  if (index === correctIndex) {
    selectedLi.classList.add("correct");
    score++;
  } else {
    selectedLi.classList.add("incorrect");
    allLis[correctIndex].classList.add("correct"); // show correct answer
  }

  // show Next button
  nextBtn.style.display = "inline-block";
}

// ----------------------------------------------------------
// ronak — START BUTTON EVENT
// 🛠️ fixed: changed display='black' → 'block', ensured quiz starts
// ----------------------------------------------------------
startBtn.addEventListener("click", () => {
  startContainer.style.display = "none"; // 🛠️ hide start screen
  quizScreen.style.display = "block"; // 🛠️ show quiz screen
  currentQuestion = 0;
  score = 0;
  showQuestion();
});

// ----------------------------------------------------------
// ronak — NEXT QUESTION FUNCTION
// 🛠️ fixed: 'question' → 'questions'
// ----------------------------------------------------------
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
}
nextBtn.addEventListener("click", nextQuestion);

// ----------------------------------------------------------
// emre — SKIP BUTTON FUNCTION (optional)
// ----------------------------------------------------------
skipBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
});

// ----------------------------------------------------------
// ronak — showResult (broken syntax fixed)
// 🛠️ fixed: removed invalid `if else` and console.logs
// ----------------------------------------------------------
function showResult() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";

  resultText.textContent = `You scored ${score} out of ${questions.length}!`;

  if (score < 2) {
    resultMessage.textContent = "Keep practicing! 💪";
  } else if (score < 3) {
    resultMessage.textContent = "Great job! 🎯";
  } else {
    resultMessage.textContent = "You are a JavaScript genius! 🚀";
  }
}

// ----------------------------------------------------------
// emre — RESTART FUNCTION
// ----------------------------------------------------------
restartBtn.addEventListener("click", () => {
  score = 0;
  currentQuestion = 0;
  resultScreen.style.display = "none";
  startContainer.style.display = "block";
});
