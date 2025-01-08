const quizData = [
  {
    question: "日本の首都はどこですか？",
    choices: ["大阪", "東京", "京都", "札幌"],
    correct: 1
  },
  {
    question: "富士山の高さは？",
    choices: ["3776m", "4000m", "2500m", "3000m"],
    correct: 0
  },
  {
    question: "日本の国旗の色は？",
    choices: ["赤と白", "青と白", "緑と白", "黒と白"],
    correct: 0
  }
];

let currentQuestionIndex = 0;
let score = 0;

const quizElement = document.getElementById("quiz");
const questionElement = document.querySelector(".question");
const choicesElement = document.querySelector(".choices");
const nextButton = document.getElementById("next-button");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";

  currentQuestion.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.classList.add("choice");
    li.addEventListener("click", () => selectAnswer(index));
    choicesElement.appendChild(li);
  });

  nextButton.disabled = true;
}

function selectAnswer(index) {
  const currentQuestion = quizData[currentQuestionIndex];
  const choices = document.querySelectorAll(".choice");

  choices.forEach((choice, i) => {
    choice.classList.remove("correct", "wrong");
    if (i === currentQuestion.correct) {
      choice.classList.add("correct");
    } else if (i === index) {
      choice.classList.add("wrong");
    }
  });

  if (index === currentQuestion.correct) {
    score++;
  }

  nextButton.disabled = false;
}

function showResult() {
  quizElement.classList.add("hidden");
  resultElement.classList.remove("hidden");
  scoreElement.textContent = `スコア: ${score}/${quizData.length}`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizElement.classList.remove("hidden");
  resultElement.classList.add("hidden");
  loadQuestion();
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

restartButton.addEventListener("click", restartQuiz);

loadQuestion();
