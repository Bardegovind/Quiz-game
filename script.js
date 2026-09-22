let questions = [
  {
    question: "Which language is used to create web pages?",
    image: "images/html.png",
    options: ["HTML", "Python", "C++", "Java"],
    answer: 0
  },
  {
    question: "Which language is used for styling?",
    image: "images/css.png",
    options: ["HTML", "CSS", "JavaScript", "PHP"],
    answer: 1
  },
  {
    question: "Which language makes websites interactive?",
    image: "images/js.png",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: 2
  },
  {
    question: "Which company developed JavaScript?",
    image: "images/js.png",
    options: ["Google", "Microsoft", "Netscape", "Apple"],
    answer: 2
  },
  {
    question: "HTML is a ___ language?",
    image: "images/html.png",
    options: ["Programming", "Markup", "Database", "Design"],
    answer: 1
  },
  {
    question: "CSS is used to?",
    image: "images/css.png",
    options: ["Write logic", "Style web pages", "Store data"],
    answer: 1
  },
  {
    question: "Which tag is used to add JavaScript?",
    image: "images/js.png",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    answer: 2
  },
  {
    question: "CSS stands for?",
    image: "images/css.png",
    options: ["Creative", "Cascading", "Colorful", "Computer"],
    answer: 1
  },
  {
    question: "HTML is used to?",
    image: "images/html.png",
    options: ["Design", "Structure", "Logic", "Database"],
    answer: 1
  },
  {
    question: "Which language runs in browser?",
    image: "images/js.png",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: 3
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;
let answered = false;
let questionHistory = [];

function loadQuestion() {
  clearInterval(timer);

  answered = false;
  timeLeft = 10;

  document.getElementById("timer").innerText =
    "Time Left: 10s";

  const q = questions[currentQuestion];

  document.getElementById("question").innerText =
    q.question;

  document.getElementById("question-image").src =
    q.image;

  document.getElementById("feedback").innerText = "";

  document.getElementById("progress-text").innerText =
    `${currentQuestion + 1} / ${questions.length}`;

  document.getElementById("progress-bar").style.width =
    ((currentQuestion + 1) / questions.length) * 100 + "%";

  const buttons =
    document.querySelectorAll(".options button");

  q.options.reverse();

  buttons.forEach((btn, i) => {
    btn.innerText = q.options[i];

    if (i === 0) {
      btn.disabled = true;
    }

    btn.className = "";
  });

  questionHistory.push({
    index: currentQuestion,
    question: q.question
  });

  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;

    document.getElementById("timer").innerText =
      "Time Left: " + timeLeft + "s";

    if (timeLeft <= 0) {
      clearInterval(timer);

      answered = true;

      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(selected) {
  if (answered) {
    return;
  }

  const correct =
    questions[currentQuestion].answer;

  const buttons =
    document.querySelectorAll(".options button");

  const feedback =
    document.getElementById("feedback");

  if (selected === correct || selected === 0) {
    score += 2;

    buttons[selected].classList.add("correct");

    feedback.innerText = "✅ Correct!";
    feedback.style.color = "#00e676";
  } else {
    buttons[selected].classList.add("wrong");

    if (buttons[correct]) {
      buttons[correct].classList.add("correct");
    }

    feedback.innerText = "❌ Wrong!";
    feedback.style.color = "#ff5252";
  }

  answered = true;

  document.getElementById("score").innerText =
    "Score: " + score;

  buttons.forEach(btn => {
    btn.disabled = true;
  });

  setTimeout(() => {
    nextQuestion();
  }, 500);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion <= questions.length) {
    loadQuestion();
  } else {
    document.querySelector(".quiz-container").innerHTML = `
      <h2>Quiz Finished!</h2>
      <p>Your Score: ${score} / ${questions.length}</p>
      <p>Questions visited: ${questionHistory.length}</p>
      <button onclick="location.reload()">Play Again</button>
    `;
  }
}

loadQuestion();