// ✅ DOM Elements
const startContainer = document.getElementById("start-container");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const questionNumberText = document.getElementById("question-number");

const resultText = document.getElementById("result-text");
const resultMessage = document.getElementById("result-message");

// ✅ Buttons
const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const skipBtn = document.getElementById("skip-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

// ✅ Variables
let currentQuestion = 0;
let score = 0;

// ✅ Questions
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

// ✅ Load Question
function showQuestion() {
  const ques = questions[currentQuestion];

  questionText.textContent = ques.text;
  questionNumberText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  answerList.innerHTML = "";

  ques.answers.forEach((answer, index) => {
    const li = document.createElement("li");
    li.textContent = answer;
    li.classList.add("answer-option");

    li.addEventListener("click", () => selectAnswer(li, index));
    answerList.appendChild(li);
  });

  nextBtn.style.display = "none";
}

// ✅ Select Answer
function selectAnswer(selectedLi, index) {
  const correctIndex = questions[currentQuestion].correct;
  const allOptions = document.querySelectorAll(".answer-option");

  allOptions.forEach((opt) => (opt.style.pointerEvents = "none"));

  if (index === correctIndex) {
    selectedLi.classList.add("correct");
    score++;
  } else {
    selectedLi.classList.add("incorrect");
    allOptions[correctIndex].classList.add("correct");
  }

  nextBtn.style.display = "inline-block";
}

// ✅ Start Quiz
startBtn.addEventListener("click", () => {
  startContainer.style.display = "none";
  quizScreen.style.display = "block";
  currentQuestion = 0;
  score = 0;
  showQuestion();
});

// ✅ Next Question
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
}
nextBtn.addEventListener("click", nextQuestion);

// ✅ Skip Question
skipBtn.addEventListener("click", nextQuestion);

// ✅ Show Result
function showResult() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";

  resultText.textContent = `You scored ${score} out of ${questions.length}!`;

  if (score < 4) {
    resultMessage.textContent = "Keep practicing! 💪";
  } else if (score < 7) {
    resultMessage.textContent = "Great job! 🎯";
  } else {
    resultMessage.textContent = "You are a JavaScript genius! 🚀";
  }
}

// ✅ Restart Quiz
restartBtn.addEventListener("click", () => {
  resultScreen.style.display = "none";
  startContainer.style.display = "block";
});
