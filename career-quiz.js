
/*
 * INDUSTRYAI – Interaktiver Berufscheck
 * Version 1.0
 */

(function () {
  "use strict";

  const questions = [];

  const answers = {};

  let currentQuestion = 0;

  const startButton = document.getElementById(
    "career-check-start"
  );

  const app = document.getElementById(
    "career-check-app"
  );

  const questionContainer = document.getElementById(
    "career-question-container"
  );

  const progressText = document.getElementById(
    "career-progress-text"
  );

  const progressBar = document.getElementById(
    "career-progress-bar"
  );

  const backButton = document.getElementById(
    "career-back"
  );

  const nextButton = document.getElementById(
    "career-next"
  );

  const resultsContainer = document.getElementById(
    "career-results"
  );

  function updateProgress() {
    const progress =
      ((currentQuestion + 1) / questions.length) * 100;

    progressText.textContent =
      "Frage " + (currentQuestion + 1) +
      " von " + questions.length;

    progressBar.style.width = progress + "%";

    backButton.disabled = currentQuestion === 0;

    nextButton.textContent =
      currentQuestion === questions.length - 1
        ? "Auswertung anzeigen"
        : "Weiter";
  }

  function startQuiz() {
    document.querySelector(
      ".ia-career-check .ia-check-heading"
    ).hidden = true;

    app.hidden = false;

    renderQuestion();
  }

  function renderQuestion() {
    const question = questions[currentQuestion];

    if (!question) return;

    updateProgress();

    questionContainer.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = question.title;

    const description = document.createElement("p");
    description.textContent = question.description || "";

    questionContainer.appendChild(heading);
    questionContainer.appendChild(description);
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  }

  startButton.addEventListener("click", startQuiz);

  nextButton.addEventListener("click", nextQuestion);

  backButton.addEventListener("click", previousQuestion);

})();
