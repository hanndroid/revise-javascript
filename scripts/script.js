const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");

let shuffledQuestions, currentQuestionIndex;

let score = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  console.log("startGame. Should be called only once.");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  score = 0;
  scoreElement.innerText = `score: ${score}/${shuffledQuestions.length}`;
  setNextQuestion();
}

function setNextQuestion() {
  console.log(
    `setting NextQuestion: ${currentQuestionIndex}/${shuffledQuestions.length}`
  );
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  updateScore(correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = `Restart?`;
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function updateScore(correct) {
  if (correct) {
    score = score + 1;
    scoreElement.innerText = `score: ${score}/${shuffledQuestions.length}`;
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is 10 % 9?",
    answers: [
      { text: "9", correct: false },
      { text: "9:1", correct: false },
      { text: "2", correct: false },
      { text: "1", correct: true },
    ],
  },
  {
    question: "How can you check if a number x is divisable by 3?",
    answers: [
      {
        text: `if (x % 3 === 0) {
       ... }`,
        correct: true,
      },
      {
        text: `if (x % 3 === 3) {
       ... }`,
        correct: false,
      },
      {
        text: `if (x % 3 !== 0) {
       ... }`,
        correct: false,
      },
      {
        text: `if (x === 3) {
       ... }`,
        correct: false,
      },
    ],
  },
  {
    question: "Inside which HTML tag do we put the JavaScript?",
    answers: [
      { text: "<javascript>", correct: false },
      { text: "<js>", correct: false },
      { text: "<script>", correct: true },
      { text: "<scripting>", correct: false },
    ],
  },
  {
    question: "Which line of code will not compile?",
    answers: [
      { text: `"Hippo's mouth"`, correct: false },
      { text: ".Hippo's mouth", correct: false },
      { text: `'Hippo's mouth'`, correct: true },
      { text: "`Hippo's mouth`", correct: false },
    ],
  },
  {
    question: "How do you add a link in HTML",
    answers: [
      { text: "<a>", correct: true },
      { text: "<link>", correct: false },
      { text: "<url>", correct: false },
      { text: "<website>", correct: false },
      { text: "<html-link>", correct: false },
      { text: "<anchor>", correct: false },
    ],
  },
  {
    question: `In Javascript, how do you print "potato" to the console?`,
    answers: [
      { text: `System.out.println("potato");`, correct: false },
      { text: "console.print('potato');", correct: false },
      { text: `console.log("potato");`, correct: true },
      { text: "console('potato');", correct: false },
    ],
  },
  {
    question: "How do you reference a direct child (descendant) in CSS?",
    answers: [
      { text: ".parent .child", correct: false },
      { text: ".parent > .child", correct: true },
      { text: ".parent < .child", correct: false },
      { text: ".parent -> .child", correct: false },
    ],
  },
];
