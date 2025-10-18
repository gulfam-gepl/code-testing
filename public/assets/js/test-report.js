// Test Report JavaScript Functionality

document.addEventListener('DOMContentLoaded', () => {
  initializeTestReport();
});

function initializeTestReport() {
  // Set current date
  setCurrentDate();
  
  // Initialize questions data
  initializeQuestions();
  
  // Set up event listeners
  setupEventListeners();
  
  // Show first question
  showQuestion(0);
}

function setCurrentDate() {
  const dateElement = document.getElementById('current-date');
  if (dateElement) {
    const now = new Date();
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
  }
}

// Sample questions data - in a real application, this would come from an API
const questionsData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: [
      { letter: "A", text: "London", isCorrect: false },
      { letter: "B", text: "Berlin", isCorrect: false },
      { letter: "C", text: "Paris", isCorrect: true },
      { letter: "D", text: "Madrid", isCorrect: false }
    ],
    userAnswer: null,
    isAnswered: false
  },
  {
    id: 2,
    question: "Which programming language is known as the 'language of the web'?",
    options: [
      { letter: "A", text: "Python", isCorrect: false },
      { letter: "B", text: "Java", isCorrect: false },
      { letter: "C", text: "JavaScript", isCorrect: true },
      { letter: "D", text: "C++", isCorrect: false }
    ],
    userAnswer: null,
    isAnswered: false
  },
  {
    id: 3,
    question: "What does HTML stand for?",
    options: [
      { letter: "A", text: "HyperText Markup Language", isCorrect: true },
      { letter: "B", text: "High Tech Modern Language", isCorrect: false },
      { letter: "C", text: "Home Tool Markup Language", isCorrect: false },
      { letter: "D", text: "Hyperlink and Text Markup Language", isCorrect: false }
    ],
    userAnswer: null,
    isAnswered: false
  },
  {
    id: 4,
    question: "Which of the following is NOT a CSS property?",
    options: [
      { letter: "A", text: "color", isCorrect: false },
      { letter: "B", text: "font-size", isCorrect: false },
      { letter: "C", text: "margin", isCorrect: false },
      { letter: "D", text: "database", isCorrect: true }
    ],
    userAnswer: null,
    isAnswered: false
  },
  {
    id: 5,
    question: "What is the result of 2 + 2 * 3?",
    options: [
      { letter: "A", text: "8", isCorrect: true },
      { letter: "B", text: "10", isCorrect: false },
      { letter: "C", text: "12", isCorrect: false },
      { letter: "D", text: "6", isCorrect: false }
    ],
    userAnswer: null,
    isAnswered: false
  }
];

let currentQuestionIndex = 0;

function initializeQuestions() {
  const questionCirclesContainer = document.getElementById('question-circles');
  if (!questionCirclesContainer) return;

  // Clear existing circles
  questionCirclesContainer.innerHTML = '';

  // Create question circles
  questionsData.forEach((question, index) => {
    const circle = document.createElement('div');
    circle.className = 'question-circle';
    circle.textContent = index + 1;
    circle.setAttribute('data-question-index', index);
    circle.setAttribute('role', 'button');
    circle.setAttribute('tabindex', '0');
    circle.setAttribute('aria-label', `Go to question ${index + 1}`);
    
    // Add click event listener
    circle.addEventListener('click', () => showQuestion(index));
    circle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showQuestion(index);
      }
    });
    
    questionCirclesContainer.appendChild(circle);
  });
}

function setupEventListeners() {
  // Add any additional event listeners here
  // The question circles already have their listeners set up in initializeQuestions()
}

function showQuestion(questionIndex) {
  if (questionIndex < 0 || questionIndex >= questionsData.length) return;
  
  currentQuestionIndex = questionIndex;
  const question = questionsData[questionIndex];
  
  // Update question circles
  updateQuestionCircles();
  
  // Update question display
  updateQuestionDisplay(question);
}

function updateQuestionCircles() {
  const circles = document.querySelectorAll('.question-circle');
  circles.forEach((circle, index) => {
    circle.classList.remove('active');
    
    if (index === currentQuestionIndex) {
      circle.classList.add('active');
    }
    
    // Update answered status
    if (questionsData[index].isAnswered) {
      circle.classList.add('answered');
    } else {
      circle.classList.remove('answered');
    }
  });
}

function updateQuestionDisplay(question) {
  // Update question number
  const questionNumberElement = document.getElementById('current-question-num');
  if (questionNumberElement) {
    questionNumberElement.textContent = question.id;
  }
  
  // Update question text
  const questionTextElement = document.getElementById('question-text');
  if (questionTextElement) {
    questionTextElement.textContent = question.question;
  }
  
  // Update question status
  const statusElement = document.getElementById('question-status');
  if (statusElement) {
    statusElement.textContent = question.isAnswered ? 'Answered' : 'Not Answered';
    statusElement.className = `status-badge ${question.isAnswered ? 'answered' : 'not-answered'}`;
  }
  
  // Update options
  updateQuestionOptions(question);
}

function updateQuestionOptions(question) {
  const optionsContainer = document.getElementById('question-options');
  if (!optionsContainer) return;
  
  // Clear existing options
  optionsContainer.innerHTML = '';
  
  // Create option elements
  question.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.setAttribute('data-option-index', index);
    optionElement.setAttribute('role', 'button');
    optionElement.setAttribute('tabindex', '0');
    optionElement.setAttribute('aria-label', `Option ${option.letter}: ${option.text}`);
    
    // Create option letter
    const letterElement = document.createElement('div');
    letterElement.className = 'option-letter';
    letterElement.textContent = option.letter;
    
    // Create option text
    const textElement = document.createElement('span');
    textElement.textContent = option.text;
    
    // Assemble option
    optionElement.appendChild(letterElement);
    optionElement.appendChild(textElement);
    
    // Add selection state if this option was selected
    if (question.userAnswer === index) {
      optionElement.classList.add('selected');
    }
    
    // Add click event listener
    optionElement.addEventListener('click', () => selectOption(index));
    optionElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOption(index);
      }
    });
    
    optionsContainer.appendChild(optionElement);
  });
}

function selectOption(optionIndex) {
  const question = questionsData[currentQuestionIndex];
  
  // Update question data
  question.userAnswer = optionIndex;
  question.isAnswered = true;
  
  // Update question circles to show answered status
  updateQuestionCircles();
  
  // Update question status
  const statusElement = document.getElementById('question-status');
  if (statusElement) {
    statusElement.textContent = 'Answered';
    statusElement.className = 'status-badge answered';
  }
  
  // Update options display
  updateQuestionOptions(question);
  
  // Add visual feedback
  const options = document.querySelectorAll('.option');
  options.forEach((option, index) => {
    option.classList.remove('selected');
    if (index === optionIndex) {
      option.classList.add('selected');
    }
  });
  
  // Auto-advance to next question after a short delay (optional)
  setTimeout(() => {
    if (currentQuestionIndex < questionsData.length - 1) {
      // Uncomment the line below to enable auto-advance
      // showQuestion(currentQuestionIndex + 1);
    }
  }, 500);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.target.closest('.question-circle') || e.target.closest('.option')) {
    return; // Let individual elements handle their own keyboard events
  }
  
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
      }
      break;
    case 'ArrowRight':
      e.preventDefault();
      if (currentQuestionIndex < questionsData.length - 1) {
        showQuestion(currentQuestionIndex + 1);
      }
      break;
  }
});

// Utility function to get question statistics (for future use)
function getQuestionStats() {
  const total = questionsData.length;
  const answered = questionsData.filter(q => q.isAnswered).length;
  const correct = questionsData.filter(q => {
    if (!q.isAnswered) return false;
    return q.options[q.userAnswer]?.isCorrect;
  }).length;
  
  return {
    total,
    answered,
    correct,
    percentage: total > 0 ? Math.round((correct / total) * 100) : 0
  };
}