
// INDUSTRYAI – Website Funktionen

document.addEventListener("DOMContentLoaded", () => {

  // Automatisches Jahr im Footer
  const footerYear = document.querySelector("footer p:last-of-type");

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
        advice: "Prüfen Sie, ob Ihre Website eine klar erkennbare Karriere- oder Ausbildungsseite enthält. Ergänzen Sie dort aktuelle Ausbildungsangebote, Kontaktmöglichkeiten und authentische Einblicke. Sorgen Sie außerdem dafür, dass Interessierte Ihr Unternehmen über die für Ihre Zielgruppe relevanten Kanäle finden."
      },
      {
        name: "Berufspräsentation",
        advice: "Stellen Sie nicht nur Berufsbezeichnungen und Anforderungen dar. Zeigen Sie typische Aufgaben, Arbeitsplätze und Menschen aus dem Team. Kurze Videos, Bilder aus dem Arbeitsalltag und Erfahrungsberichte von Auszubildenden machen Tätigkeiten greifbarer."
      },
      {
        name: "Frühzeitige Ansprache",
        advice: "Bauen Sie Kontakte zu Schulen und regionalen Bildungspartnern auf. Bieten Sie Betriebsbesichtigungen, Praktika oder konkrete Mitmachangebote an. Planen Sie diese Kontakte über das ganze Jahr und nicht erst kurz vor dem Ausbildungsbeginn."
      },
      {
        name: "Bewerbungsprozess",
        advice: "Gehen Sie den Bewerbungsweg selbst auf einem Smartphone durch. Reduzieren Sie unnötige Pflichtfelder und Dokumente, nennen Sie eine erreichbare Ansprechperson und erklären Sie transparent, wie es nach dem Absenden weitergeht."
      },
      {
        name: "Reaktionsgeschwindigkeit",
        advice: "Legen Sie intern fest, wer neue Bewerbungen prüft und wer antwortet. Bestätigen Sie den Eingang zeitnah, nennen Sie einen realistischen Zeitraum für die Rückmeldung und informieren Sie Bewerber auch dann, wenn die Entscheidung noch aussteht."
      }
    ];

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const answers = new FormData(form);
      let total = 0;
      const weakAreas = [];

      questions.forEach(function (question, index) {
        const rawValue = answers.get("q" + (index + 1));
        const value = rawValue === null ? NaN : Number(rawValue);

        if (!Number.isInteger(value) || value < 0 || value > 3) return;

        total += value;

        if (value <= 1) {
          weakAreas.push({
            name: question.name,
            advice: question.advice,
            score: value
          });
        }
      });

      if (total <= 5) {
        resultTitle.textContent = "Hier steckt noch viel Potenzial!";
        resultText.textContent =
          "Ihre Antworten zeigen, dass mehrere Grundlagen Ihrer Nachwuchsgewinnung weiterentwickelt werden können. Beginnen Sie mit den Bereichen mit den niedrigsten Punktwerten und setzen Sie die Verbesserungen Schritt für Schritt um.";
      } else if (total <= 10) {
        resultTitle.textContent = "Sie sind auf einem guten Weg!";
        resultText.textContent =
          "Einige Grundlagen sind bereits vorhanden. Die Auswertung zeigt zugleich konkrete Ansatzpunkte, mit denen Sie Ihre Ansprache und den Bewerbungsweg gezielt verbessern können.";
      } else {
        resultTitle.textContent = "Ihre Nachwuchsgewinnung ist gut aufgestellt!";
        resultText.textContent =
          "Ihre Antworten zeigen in diesem Kurzcheck eine gute Grundlage. Prüfen Sie regelmäßig, ob Ihre Angebote, Einblicke und Rückmeldeprozesse weiterhin zu den Erwartungen junger Menschen passen.";
      }

      resultScore.textContent = total + " / 15 Punkte";

      resultTips.replaceChildren();

      const tipsHeading = document.createElement("strong");
      const tipsList = document.createElement("ol");

      if (weakAreas.length > 0) {
        weakAreas.sort(function (a, b) {
          return a.score - b.score;
        });

        tipsHeading.textContent = "Ihre wichtigsten Entwicklungsfelder";
        resultTips.appendChild(tipsHeading);

        weakAreas.forEach(function (area) {
          const item = document.createElement("li");
          const title = document.createElement("strong");
          const score = document.createElement("span");
          const advice = document.createElement("p");

          title.textContent = area.name + " ";
          score.textContent = "(" + area.score + " von 3 Punkten)";
          advice.textContent = area.advice;

          item.appendChild(title);
          item.appendChild(score);
          item.appendChild(advice);
          tipsList.appendChild(item);
        });

        resultTips.appendChild(tipsList);
      } else {
        tipsHeading.textContent = "Ihre Empfehlung";
        resultTips.appendChild(tipsHeading);

        const recommendation = document.createElement("p");
        recommendation.textContent =
          "Alle fünf Bereiche wurden von Ihnen mit mindestens 2 von 3 Punkten bewertet. Halten Sie den Austausch mit jungen Menschen aufrecht und überprüfen Sie regelmäßig, ob Ihre Informationen, Angebote und Bewerbungswege aktuell und verständlich sind.";
        resultTips.appendChild(recommendation);
      }

      const contactScore = document.getElementById("ia-contact-score");
      const contactRating = document.getElementById("ia-contact-rating");
      const contactAnalysis = document.getElementById("ia-contact-analysis");

      if (contactScore) {
        contactScore.value = total + " / 15 Punkte";
      }

      if (contactRating) {
        contactRating.value = resultTitle.textContent;
      }

      if (contactAnalysis) {
        contactAnalysis.value =
          resultText.textContent + "\n\n" + resultTips.innerText;
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
      resultTips.replaceChildren();
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
