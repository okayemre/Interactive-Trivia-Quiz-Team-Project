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
let selectedAnswer = null;

// DOM Elements
const startContainer = document.getElementById('start-container');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
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
submitBtn.addEventListener('click', submitAnswer);
skipBtn.addEventListener('click', skipQuestion);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartGame);

// Initialize button states
function initializeButtons() {
  submitBtn.style.display = 'inline-block';
  skipBtn.style.display = 'inline-block';
  nextBtn.style.display = 'none';
}

// Start Game Function
function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  
  // Hide start screen, show quiz screen
  startContainer.style.display = 'none';
  quizScreen.style.display = 'block';
  resultScreen.style.display = 'none';
  
  initializeButtons();
  showQuestion();
}

// Show Question Function
function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Update question number
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  
  // Update question text
  questionText.textContent = currentQuestion.question;
  
  // Clear previous answers
  answerList.innerHTML = '';
  selectedAnswer = null;
  
  // Create answer buttons
  currentQuestion.answers.forEach((answer, index) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-btn');
    button.dataset.correct = answer.correct;
    button.dataset.index = index;
    
    button.addEventListener('click', () => selectAnswer(button));
    
    li.appendChild(button);
    answerList.appendChild(li);
  });
  
  // Reset button states
  initializeButtons();
}

// Select Answer Function
function selectAnswer(button) {
  // Only allow selection if not already submitted
  if (selectedAnswer !== null && button.classList.contains('correct', 'incorrect')) {
    return;
  }
  
  // Remove previous selection
  const allButtons = answerList.querySelectorAll('.answer-btn');
  allButtons.forEach(btn => btn.classList.remove('selected'));
  
  // Mark new selection
  button.classList.add('selected');
  selectedAnswer = button;
}

// Submit Answer Function
function submitAnswer() {
  if (selectedAnswer === null) {
    alert('Please select an answer before submitting!');
    return;
  }
  
  const allButtons = answerList.querySelectorAll('.answer-btn');
  const isCorrect = selectedAnswer.dataset.correct === 'true';
  
  // Apply correct/incorrect styling
  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === 'true') {
      btn.classList.add('correct');
    } else if (btn === selectedAnswer && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });
  
  // Update score
  if (isCorrect) {
    score++;
  }
  
  // Hide submit and skip buttons, show next button
  submitBtn.style.display = 'none';
  skipBtn.style.display = 'none';
  nextBtn.style.display = 'inline-block';
}

// Skip Question Function
function skipQuestion() {
  nextQuestion();
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

// Show Results Function
function showResults() {
  // Hide quiz screen, show result screen
  quizScreen.style.display = 'none';
  resultScreen.style.display = 'block';
  
  // Display score
  resultText.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
  
  // Display motivational message based on score
  const percentage = (score / quizQuestions.length) * 100;
  
  if (percentage === 100) {
    resultMessage.textContent = '🎉 Perfect! You\'re a JavaScript genius!';
  } else if (percentage >= 80) {
    resultMessage.textContent = '🌟 Excellent work! You really know your JavaScript!';
  } else if (percentage >= 60) {
    resultMessage.textContent = '👍 Good job! You have a solid understanding!';
  } else if (percentage >= 40) {
    resultMessage.textContent = '📚 Not bad! Keep learning and you\'ll improve!';
  } else {
    resultMessage.textContent = '💪 Keep practicing! You\'ll get better with time!';
  }
}

// Restart Game Function
function restartGame() {
  // Hide result screen, show start screen
  resultScreen.style.display = 'none';
  startContainer.style.display = 'block';
}