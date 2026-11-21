
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
    const progressText = document.getElementById("ia-progress-text");
    const progressBar = document.getElementById("ia-progress-bar");
    const progressFill = document.getElementById("ia-progress-fill");

    if (!form || !result || !restartButton) return;

    const questions = [
      {
        name: "Digitale Sichtbarkeit",
        advice: "Prüfen Sie, ob Ihre Website eine klar erkennbare Karriere- oder Ausbildungsseite enthält. Ergänzen Sie dort aktuelle Ausbildungsangebote, Kontaktmöglichkeiten und authentische Einblicke. Sorgen Sie außerdem dafür, dass Interessierte Ihr Unternehmen über die für Ihre Zielgruppe relevanten Kanäle finden.",
        action: "Rufen Sie Ihre Website auf einem Smartphone auf. Eine interessierte Person sollte offene Stellen, Ausbildungsangebote und eine Kontaktmöglichkeit ohne langes Suchen finden."
      },
      {
        name: "Präsentation der Berufe",
        advice: "Stellen Sie nicht nur Berufsbezeichnungen und Anforderungen dar. Zeigen Sie typische Aufgaben, Arbeitsplätze und Menschen aus dem Team. Kurze Videos, Bilder aus dem Arbeitsalltag und Erfahrungsberichte von Auszubildenden machen Tätigkeiten greifbarer.",
        action: "Wählen Sie einen Beruf aus und ergänzen Sie ein konkretes Beispiel für einen typischen Arbeitstag – mit Aufgaben, Arbeitsumgebung und einem echten Einblick aus dem Team."
      },
      {
        name: "Frühzeitige Nachwuchsansprache",
        advice: "Bauen Sie Kontakte zu Schulen und regionalen Bildungspartnern auf. Bieten Sie Betriebsbesichtigungen, Praktika oder konkrete Mitmachangebote an. Planen Sie diese Kontakte über das ganze Jahr und nicht erst kurz vor dem Ausbildungsbeginn.",
        action: "Planen Sie einen konkreten Kontaktpunkt für die nächsten acht Wochen, zum Beispiel einen Schulbesuch, einen Praktikumstag oder eine Betriebsbesichtigung."
      },
      {
        name: "Bewerbungsprozess",
        advice: "Gehen Sie den Bewerbungsweg selbst auf einem Smartphone durch. Reduzieren Sie unnötige Pflichtfelder und Dokumente, nennen Sie eine erreichbare Ansprechperson und erklären Sie transparent, wie es nach dem Absenden weitergeht.",
        action: "Testen Sie den vollständigen Bewerbungsweg auf dem Smartphone und notieren Sie jeden Schritt, der unnötig kompliziert oder unklar ist."
      },
      {
        name: "Reaktionsgeschwindigkeit",
        advice: "Legen Sie intern fest, wer neue Bewerbungen prüft und wer antwortet. Bestätigen Sie den Eingang zeitnah, nennen Sie einen realistischen Zeitraum für die Rückmeldung und informieren Sie Bewerber auch dann, wenn die Entscheidung noch aussteht.",
        action: "Bestimmen Sie eine verantwortliche Person und vereinbaren Sie eine interne Frist für die erste Rückmeldung auf neue Bewerbungen."
      }
    ];

    function updateProgress() {
      const answered = questions.reduce(function (count, question, index) {
        return count + (form.querySelector('input[name="q' + (index + 1) + '"]:checked') ? 1 : 0);
      }, 0);
      if (progressText) progressText.textContent = answered + " von " + questions.length + " beantwortet";
      if (progressBar) progressBar.setAttribute("aria-valuenow", String(answered));
      if (progressFill) progressFill.style.width = (answered / questions.length * 100) + "%";
    }

    form.addEventListener("change", updateProgress);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const answers = new FormData(form);
      let total = 0;
      const scoredAreas = [];

      questions.forEach(function (question, index) {
        const value = Number(answers.get("q" + (index + 1)));
        if (!Number.isInteger(value) || value < 0 || value > 3) return;
        total += value;
        scoredAreas.push({
          name: question.name,
          score: value,
          advice: question.advice,
          action: question.action
        });
      });

      if (scoredAreas.length !== questions.length) return;

      let rating;
      let summary;
      if (total <= 5) {
        rating = "Deutlicher Entwicklungsbedarf";
        summary = "Ihre Antworten zeigen, dass mehrere Grundlagen Ihrer Nachwuchsgewinnung noch nicht ausreichend aufgestellt sind. Beginnen Sie mit wenigen, klar priorisierten Verbesserungen und prüfen Sie deren Wirkung.";
      } else if (total <= 10) {
        rating = "Gute Ansätze mit Ausbaupotenzial";
        summary = "Einige Grundlagen sind bereits vorhanden. In mehreren Bereichen gibt es jedoch konkrete Ansatzpunkte, mit denen Sie Ihre Sichtbarkeit, Ansprache und Bewerbererfahrung verbessern können.";
      } else {
        rating = "Solide bis starke Grundlage";
        summary = "Ihre Antworten zeigen eine gute Grundlage in der Nachwuchsgewinnung. Prüfen Sie regelmäßig, ob Ihre Inhalte aktuell bleiben und Interessierte den Weg von der ersten Information bis zur Bewerbung einfach bewältigen können.";
      }

      resultTitle.textContent = rating;
      resultScore.textContent = total + " / 15 Punkte";

      let meter = document.getElementById("ia-result-meter");
      if (!meter) {
        meter = document.createElement("div");
        meter.id = "ia-result-meter";
        meter.className = "ia-result-meter";
        meter.setAttribute("role", "img");
        meter.setAttribute("aria-label", "Erreichte Punkte von 15");
        const fill = document.createElement("span");
        fill.id = "ia-result-meter-fill";
        fill.className = "ia-result-meter-fill";
        meter.appendChild(fill);
        resultScore.insertAdjacentElement("afterend", meter);
      }
      meter.setAttribute("aria-label", total + " von 15 Punkten erreicht");
      document.getElementById("ia-result-meter-fill").style.width = (total / 15 * 100) + "%";

      resultText.textContent = summary;
      resultTips.replaceChildren();

      const priorityAreas = scoredAreas.slice().sort(function (a, b) {
        return a.score - b.score;
      });
      const weakAreas = priorityAreas.filter(function (area) { return area.score <= 1; });
      const tipsHeading = document.createElement("strong");
      const tipsList = document.createElement("ol");

      if (weakAreas.length) {
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
          item.append(title, score, advice);
          tipsList.appendChild(item);
        });
        resultTips.appendChild(tipsList);
      } else {
        tipsHeading.textContent = "Ihre Empfehlung";
        resultTips.appendChild(tipsHeading);
        const recommendation = document.createElement("p");
        recommendation.textContent = "Keiner der fünf Bereiche liegt bei 0 oder 1 Punkt. Halten Sie Ihre bestehenden Maßnahmen aktuell und nutzen Sie die niedrigste Einzelbewertung als nächsten Optimierungsschwerpunkt.";
        resultTips.appendChild(recommendation);
      }

      const nextStep = document.createElement("div");
      nextStep.className = "ia-result-next-step";
      const nextHeading = document.createElement("strong");
      const nextText = document.createElement("p");
      const firstPriority = priorityAreas[0];
      nextHeading.textContent = "Ihr konkreter nächster Schritt: " + firstPriority.name;
      nextText.textContent = firstPriority.action;
      nextStep.append(nextHeading, nextText);
      resultTips.appendChild(nextStep);

      const contactScore = document.getElementById("ia-contact-score");
      const contactRating = document.getElementById("ia-contact-rating");
      const contactAnalysis = document.getElementById("ia-contact-analysis");
      if (contactScore) contactScore.value = total + " / 15 Punkte";
      if (contactRating) contactRating.value = rating;
      if (contactAnalysis) {
        contactAnalysis.value = summary + "\n\n" +
          priorityAreas.map(function (area) {
            return area.name + ": " + area.score + "/3 – " + area.advice;
          }).join("\n\n");
      }

      form.hidden = true;
      result.hidden = false;
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    restartButton.addEventListener("click", function () {
      form.reset();
      updateProgress();
      resultTips.replaceChildren();
      const meter = document.getElementById("ia-result-meter");
      if (meter) meter.remove();
      result.hidden = true;
      form.hidden = false;
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    updateProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRecruitingCheck);
  } else {
    initRecruitingCheck();
  }
})();
