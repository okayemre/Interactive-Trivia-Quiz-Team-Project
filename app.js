// Quiz Questions Data Structure
const quizQuestions = [
  {
    question: "What does 'DOM' stand for in JavaScript?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Management", correct: false },
      { text: "Digital Orientation Module", correct: false },
      { text: "Dynamic Output Method", correct: false }
    ]
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "constant", correct: false }
    ]
  },
  {
    question: "What will 'typeof null' return in JavaScript?",
    answers: [
      { text: "null", correct: false },
      { text: "undefined", correct: false },
      { text: "object", correct: true },
      { text: "number", correct: false }
    ]
  },
  {
    question: "Which method is used to add an element to the end of an array?",
    answers: [
      { text: "push()", correct: true },
      { text: "append()", correct: false },
      { text: "add()", correct: false },
      { text: "insert()", correct: false }
    ]
  },
  {
    question: "What does the '===' operator check in JavaScript?",
    answers: [
      { text: "Only value equality", correct: false },
      { text: "Only type equality", correct: false },
      { text: "Both value and type equality", correct: true },
      { text: "Reference equality only", correct: false }
    ]
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    answers: [
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
      { text: "Float", correct: true },
      { text: "Undefined", correct: false }
    ]
  },
  {
    question: "What is the result of '2' + 2 in JavaScript?",
    answers: [
      { text: "4", correct: false },
      { text: "22", correct: true },
      { text: "NaN", correct: false },
      { text: "Error", correct: false }
    ]
  },
  {
    question: "Which method removes the last element from an array?",
    answers: [
      { text: "shift()", correct: false },
      { text: "pop()", correct: true },
      { text: "remove()", correct: false },
      { text: "delete()", correct: false }
    ]
  },
  {
    question: "What does 'NaN' stand for?",
    answers: [
      { text: "Not a Number", correct: true },
      { text: "Null and Negative", correct: false },
      { text: "New Array Number", correct: false },
      { text: "No Assigned Name", correct: false }
    ]
  },
  {
    question: "Which statement is used to stop a loop in JavaScript?",
    answers: [
      { text: "stop", correct: false },
      { text: "exit", correct: false },
      { text: "break", correct: true },
      { text: "end", correct: false }
    ]
  }
];

// Global Variables
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const startContainer = document.getElementById('start-container');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const skipBtn = document.getElementById('skip-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const answerList = document.getElementById('answer-list');
const resultText = document.getElementById('result-text');
const resultMessage = document.getElementById('result-message');

// Event Listeners
startBtn.addEventListener('click', startGame);
skipBtn.addEventListener('click', skipQuestion);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartGame);

// Start Game Function
function startGame() {
  currentQuestionIndex = 0;
  score = 0;

  startContainer.style.display = 'none';
  quizScreen.style.display = 'block';
  resultScreen.style.display = 'none';
  
  showQuestion();
}

// Show Question Function
function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  questionText.textContent = currentQuestion.question;

  answerList.innerHTML = '';

  currentQuestion.answers.forEach(answer => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-btn');
    button.dataset.correct = answer.correct;

    button.addEventListener('click', () => handleAnswer(button));
    li.appendChild(button);
    answerList.appendChild(li);
  });
}

// Handle Answer Selection Automatically
function handleAnswer(button) {
  const allButtons = answerList.querySelectorAll('.answer-btn');
  const isCorrect = button.dataset.correct === 'true';

  // Disable all buttons
  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === 'true') {
      btn.classList.add('correct');
    } else if (btn === button && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  if (isCorrect) score++;

  // Warte 1 Sekunde, dann nächste Frage automatisch
  setTimeout(() => {
    nextQuestion();
  }, 1000);
}

// Next Question Function
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Skip Question Function
function skipQuestion() {
  nextQuestion();
}

// Show Results Function
function showResults() {
  quizScreen.style.display = 'none';
  resultScreen.style.display = 'block';

  const total = quizQuestions.length;
  const correct = score;
  const wrong = total - correct;

  resultText.textContent = `✅ Correct: ${correct} | ❌ Wrong: ${wrong} (Total: ${total})`;

  // Bestehensgrenze: mindestens 7 richtige Antworten
  if (correct >= 7) {
    resultMessage.textContent = "🎉 Glückwunsch! Du hast bestanden!";
    resultMessage.style.color = "green";
  } else {
    resultMessage.textContent = "❌ Leider nicht bestanden. Versuche es nochmal!";
    resultMessage.style.color = "red";
  }
}

// Restart Game Function
function restartGame() {
  resultScreen.style.display = 'none';
  startContainer.style.display = 'block';
}
