
// INDUSTRYAI – Website Funktionen

document.addEventListener("DOMContentLoaded", () => {

  // Automatisches Jahr im Footer
  const footerYear = document.querySelector("footer p:last-child");

  if (footerYear) {
    footerYear.textContent = "© " +
      new Date().getFullYear() + " INDUSTRYAI";
  }

  // Sanftes Scrollen zu den Website-Bereichen
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const target = document.querySelector(
        link.getAttribute("href")
      );

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });

  console.log("INDUSTRYAI Website erfolgreich geladen.");

});

/* =====================================
   INDUSTRYAI – RECRUITING CHECK ENGINE
===================================== */

(function () {
  function initRecruitingCheck() {
    const form = document.getElementById("recruitingForm");
    const result = document.getElementById("ia-check-result");
    const resultTitle = document.getElementById("ia-result-title");
    const resultScore = document.getElementById("ia-result-score");
    const resultText = document.getElementById("ia-result-text");
    const resultTips = document.getElementById("ia-result-tips");
    const restartButton = document.getElementById("ia-check-restart");

    if (!form || !result || !restartButton) return;

    const questions = [
      {
        name: "Sichtbarkeit",
        advice: "Bauen Sie Ihre digitale Sichtbarkeit aus. Eine aktuelle Karriereseite und regelmäßige Einblicke auf passenden Social-Media-Kanälen können helfen."
      },
      {
        name: "Berufspräsentation",
        advice: "Zeigen Sie Ihre Ausbildungsberufe mit authentischen Bildern, Videos und echten Einblicken von Mitarbeitern."
      },
      {
        name: "Frühzeitige Ansprache",
        advice: "Knüpfen Sie frühzeitig Kontakte zu Schulen, bieten Sie Praktika an und machen Sie Ihre Berufswelt schon vor der Bewerbungsphase sichtbar."
      },
      {
        name: "Bewerbungsprozess",
        advice: "Vereinfachen Sie den Bewerbungsweg. Mobile Formulare, wenige Schritte und klare Ansprechpartner senken mögliche Hürden."
      },
      {
        name: "Reaktionsgeschwindigkeit",
        advice: "Definieren Sie einen festen Ablauf für Bewerbungen und geben Sie jungen Menschen möglichst zeitnah eine Rückmeldung."
      }
    ];

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const answers = new FormData(form);
      let total = 0;
      const weakAreas = [];

      questions.forEach(function (question, index) {
        const value = Number(answers.get("q" + (index + 1)));

        if (!Number.isFinite(value) || value < 0 || value > 3) {
          return;
        }

        total += value;

        if (value <= 1) {
          weakAreas.push(question);
        }
      });

      if (total <= 5) {
        resultTitle.textContent = "Hier steckt noch viel Potenzial!";
        resultText.textContent =
          "Ihre Nachwuchsgewinnung hat mehrere Bereiche, in denen Verbesserungen sinnvoll sein können. Schon gezielte erste Schritte können Ihre Sichtbarkeit und Ansprache stärken.";
      } else if (total <= 10) {
        resultTitle.textContent = "Sie sind auf einem guten Weg!";
        resultText.textContent =
          "Ihr Unternehmen hat bereits wichtige Grundlagen geschaffen. Mit einer gezielten Weiterentwicklung können Sie junge Talente noch besser erreichen und überzeugen.";
      } else {
        resultTitle.textContent = "Ihr Unternehmen ist gut aufgestellt!";
        resultText.textContent =
          "Ihre Antworten zeigen eine starke Grundlage für die Nachwuchsgewinnung. Bleiben Sie sichtbar, authentisch und entwickeln Sie Ihre Ansprache kontinuierlich weiter.";
      }

      resultScore.textContent = total + " / 15 Punkte";

      if (weakAreas.length > 0) {
        resultTips.innerHTML =
          "<strong>Ihre persönlichen Entwicklungsmöglichkeiten:</strong><ul>" +
          weakAreas.map(function (area) {
            return "<li><strong>" + area.name + ":</strong> " +
              area.advice + "</li>";
          }).join("") +
          "</ul>";
      } else {
        resultTips.innerHTML =
          "<strong>Ihre Empfehlung:</strong><p>" +
          "Bleiben Sie mit jungen Menschen im Austausch und überprüfen " +
          "Sie regelmäßig, ob Ihre Angebote und Einblicke noch zu deren " +
          "Erwartungen passen." +
          "</p>";
      }

      form.hidden = true;
      result.hidden = false;

      result.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    restartButton.addEventListener("click", function () {
      form.reset();
      result.hidden = true;
      form.hidden = false;

      form.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRecruitingCheck);
  } else {
    initRecruitingCheck();
  }
})();
