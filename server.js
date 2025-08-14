const mathQuestions = [
  { 
    question: "If 3x + 5 = 20, what is x?", 
    choices: ["5", "15", "20", "10"], 
    answer: "5", 
    explanation: "3x + 5 = 20 → 3x = 15 → x = 5"
  },
  { 
    question: "Simplify: 2(3x - 4) + 5", 
    choices: ["6x + 1", "6x - 3", "5x - 4", "6x - 8"], 
    answer: "6x - 3", 
    explanation: "2(3x - 4) + 5 = 6x - 8 + 5 = 6x - 3"
  },
  { 
    question: "What is the area of a circle with radius 4?", 
    choices: ["16π", "8π", "12π", "4π"], 
    answer: "16π", 
    explanation: "Area = πr² = π*4² = 16π"
  }
];

const readingQuestions = [
  { 
    question: "Choose the correct word: Their/There going to the store.", 
    choices: ["Their", "There"], 
    answer: "They’re", 
    explanation: "Correct usage is: 'They’re going to the store.'"
  },
  { 
    question: "Select the sentence with correct punctuation.", 
    choices: ["I like apples, oranges and bananas.", "I like apples oranges, and bananas."], 
    answer: "I like apples, oranges and bananas.", 
    explanation: "Commas separate items in a list correctly."
  }
];

const flashcards = [
  { word: "Aberration", definition: "A deviation from the norm" },
  { word: "Capitulate", definition: "To surrender or give in" },
  { word: "Ebullient", definition: "Cheerful and full of energy" }
];

let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let currentFlashcard = 0;

// DOM elements
const quizSection = document.getElementById('quiz-section');
const flashcardSection = document.getElementById('flashcard-section');
const questionText = document.getElementById('question-text');
const choicesDiv = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const explanationDiv = document.getElementById('explanation');
const scoreSpan = document.getElementById('score');
const wordElem = document.getElementById('word');
const defElem = document.getElementById('definition');

// Menu buttons
document.getElementById('math-btn').addEventListener('click', () => startQuiz(mathQuestions));
document.getElementById('reading-btn').addEventListener('click', () => startQuiz(readingQuestions));
document.getElementById('flashcards-btn').addEventListener('click', () => startFlashcards());

// Start quiz
function startQuiz(questions) {
  currentQuiz = questions;
  currentIndex = 0;
  score = 0;
  scoreSpan.textContent = score;
  quizSection.classList.remove('hidden');
  flashcardSection.classList.add('hidden');
  showQuestion();
}

// Show question
function showQuestion() {
  explanationDiv.classList.add('hidden');
  nextBtn.classList.add('hidden');
  const q = currentQuiz[currentIndex];
  questionText.textContent = q.question;
  choicesDiv.innerHTML = '';
  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.classList.add('choice-btn');
    btn.addEventListener('click', () => selectAnswer(btn, q));
    choicesDiv.appendChild(btn);
  });
}

// Handle answer selection
function selectAnswer(button, question) {
  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach(b => b.disabled = true);

  if(button.textContent === question.answer){
    button.classList.add('correct');
    score++;
    scoreSpan.textContent = score;
  } else {
    button.classList.add('wrong');
    // highlight correct
    buttons.forEach(b => { if(b.textContent === question.answer) b.classList.add('correct') });
  }

  explanationDiv.textContent = question.explanation;
  explanationDiv.classList.remove('hidden');
  nextBtn.classList.remove('hidden');
}

// Next question
nextBtn.addEventListener('click', () => {
  currentIndex++;
  if(currentIndex < currentQuiz.length){
    showQuestion();
  } else {
    alert(`Quiz Complete! Final Score: ${score}/${currentQuiz.length}`);
    quizSection.classList.add('hidden');
  }
});

// Flashcards
function startFlashcards(){
  quizSection.classList.add('hidden');
  flashcardSection.classList.remove('hidden');
  currentFlashcard = 0;
  showFlashcard();
}

function showFlashcard(){
  const card = flashcards[currentFlashcard];
  wordElem.textContent = card.word;
  defElem.textContent = card.definition;
}

document.getElementById('next-flashcard').addEventListener('click', () => {
  currentFlashcard = (currentFlashcard + 1) % flashcards.length;
  showFlashcard();
});

document.getElementById('mark-known').addEventListener('click', () => {
  flashcards.splice(currentFlashcard, 1);
  if(flashcards.length === 0){
    alert('You completed all flashcards!');
    flashcardSection.classList.add('hidden');
  } else {
    currentFlashcard = currentFlashcard % flashcards.length;
    showFlashcard();
  }
});