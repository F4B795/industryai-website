
/*
 * INDUSTRYAI – Dynamic Career Campus
 * Version 3.0
 *
 * Lädt Berufsprofile und optionale erweiterte Details.
 */

(function () {
  "use strict";

  const database = window.IndustryAICareers;
  const detailsDatabase = window.IndustryAICareerDetails;

  const elements = {
    title: document.getElementById("career-title"),
    intro: document.getElementById("career-intro"),
    overview: document.getElementById("career-overview"),
    day: document.getElementById("career-day"),
    activities: document.getElementById("career-activities"),
    conditions: document.getElementById("career-conditions"),
    training: document.getElementById("career-training"),
    error: document.getElementById("career-error"),
    main: document.getElementById("career-campus")
  };

  const params = new URLSearchParams(window.location.search);
  const careerId = params.get("id");

  const locationNames = {
    "Werkstatt": "Werkstatt",
    "Produktion": "Produktion",
    "Büro": "Büro",
    "im Freien": "Arbeit im Freien",
    "Stall": "Stall",
    "Betriebshof": "Betriebshof",
    "beim Kunden": "Beim Kunden",
    "Baustelle": "Baustelle",
    "Krankenhaus": "Krankenhaus",
    "Pflegeeinrichtung": "Pflegeeinrichtung",
    "ambulante Pflege": "Ambulante Pflege",
    "Arztpraxis": "Arztpraxis",
    "Tierarztpraxis": "Tierarztpraxis",
    "Tierklinik": "Tierklinik",
    "Lager": "Lager",
    "Logistikzentrum": "Logistikzentrum",
    "Versand": "Versand",
    "Homeoffice": "Homeoffice",
    "Studio": "Studio",
    "Verkaufsfläche": "Verkaufsfläche",
    "Gewächshaus": "Gewächshaus",
    "Labor": "Labor",
    "Küche": "Küche",
    "Gastronomie": "Gastronomie",
    "Fahrzeug": "Im Fahrzeug",
    "unterwegs": "Unterwegs",
    "Kundenstandorte": "Kundenstandorte",
    "Veranstaltungsort": "Veranstaltungsort",
    "Bühne": "Bühne",
    "Rechenzentrum": "Rechenzentrum",
    "Klinik": "Klinik",
    "Gesundheitszentrum": "Gesundheitszentrum",
    "Kindergarten": "Kindergarten",
    "Schule": "Schule",
    "Jugendeinrichtung": "Jugendeinrichtung",
    "Kundenbereich": "Kundenbereich",
    "Salon": "Salon",
    "Gartenbaubetrieb": "Gartenbaubetrieb"
  };

  const levelNames = {
    low: "Gering",
    rare: "Selten",
    medium: "Mittel",
    mixed: "Abwechslungsreich",
    possible: "Möglich",
    high: "Hoch",
    common: "Häufig",
    very_high: "Sehr hoch"
  };

  function showError() {
    if (elements.main) elements.main.hidden = true;
    if (elements.error) elements.error.hidden = false;
    document.title = "Beruf nicht gefunden | INDUSTRYAI";
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) element.className = className;

    if (text !== undefined && text !== null) {
      element.textContent = text;
    }

    return element;
  }

  function addOverviewCard(label, value, description) {
    const card = createElement("article", "info-card");

    card.appendChild(createElement("small", "", label));
    card.appendChild(createElement("h3", "", value));

    if (description) {
      card.appendChild(createElement("p", "", description));
    }

    elements.overview.appendChild(card);
  }

  function formatTraining(training) {
    if (!training) return "Keine Ausbildungsangaben hinterlegt.";

    const types = {
      dual: "Duale Ausbildung",
      school_based: "Schulische Ausbildung",
      university: "Studium",
      dual_study: "Duales Studium"
    };

    const type =
      types[training.type] ||
      "Ausbildungsweg nicht näher angegeben";

    if (!training.durationMonths) return type;

    const years = training.durationMonths / 12;

    const duration = years.toLocaleString("de-DE", {
      maximumFractionDigits: 1
    });

    return type + " · " + duration + " Jahre Ausbildungsdauer";
  }

  function formatLocations(locations) {
    if (!Array.isArray(locations) || !locations.length) {
      return "Nicht näher angegeben";
    }

    return locations.map(function (location) {
      return locationNames[location] || location;
    }).join(" · ");
  }

  function formatLevel(value) {
    return levelNames[value] ||
      "Je nach Betrieb unterschiedlich";
  }

  function addConditionCard(item) {
    const card = createElement("article", "info-card");

    card.appendChild(createElement("small", "", item.label));
    card.appendChild(createElement("h3", "", item.value));
    card.appendChild(createElement("p", "", item.description));

    elements.conditions.appendChild(card);
  }

  function addDetailSection(title, eyebrow, items) {
    if (!Array.isArray(items) || !items.length) return;

    const section = createElement("section", "section");
    const label = createElement("div", "eyebrow", eyebrow);
    const heading = createElement("h2", "", title);
    const panel = createElement("div", "content-panel");
    const list = document.createElement("ul");

    items.forEach(function (item) {
      list.appendChild(createElement("li", "", item));
    });

    panel.appendChild(list);
    section.appendChild(label);
    section.appendChild(heading);
    section.appendChild(panel);

    const cta = elements.main.querySelector(".campus-cta");

    if (cta) {
      elements.main.insertBefore(section, cta);
    } else {
      elements.main.appendChild(section);
    }
  }

  function renderAdjacentCareers(career) {
    const related = database.careers
      .filter(function (item) {
        return item.id !== career.id && item.category === career.category;
      })
      .slice(0, 4);

    const section = createElement("section", "section");
    section.appendChild(createElement("div", "eyebrow", "BERUFLICHE WECHSELWEGE"));
    section.appendChild(createElement("h2", "", "Welche anderen Wege könnten zu dir passen?"));

    const panel = createElement("div", "content-panel");
    panel.appendChild(createElement(
      "p",
      "muted",
      "Wenn du bereits Erfahrung mitbringst oder dich neu orientieren möchtest, können verwandte Tätigkeitsfelder ein sinnvoller Ausgangspunkt sein. Die folgenden Berufe gehören zum gleichen Berufsfeld und dienen als erste Vergleichsmöglichkeiten."
    ));

    if (related.length) {
      const grid = createElement("div", "info-grid");
      related.forEach(function (item) {
        const card = createElement("article", "info-card");
        card.appendChild(createElement("small", "", "VERWANDTES BERUFSFELD"));
        card.appendChild(createElement("h3", "", item.name));
        card.appendChild(createElement(
          "p",
          "",
          item.dayToDay || (Array.isArray(item.activities) ? item.activities.slice(0, 2).join(" · ") : "Weitere Tätigkeiten in diesem Berufsfeld kennenlernen.")
        ));
        const link = createElement("a", "button", "Berufsprofil ansehen →");
        link.href = "beruf.html?id=" + encodeURIComponent(item.id);
        card.appendChild(link);
        grid.appendChild(card);
      });
      panel.appendChild(grid);
    } else {
      panel.appendChild(createElement("p", "muted", "Weitere verwandte Berufsprofile werden ergänzt."));
    }

    panel.appendChild(createElement(
      "p",
      "muted",
      "Wichtig: Ein Wechsel ist nicht automatisch ohne weitere Qualifikation möglich. Anerkennung von Vorerfahrung, erforderliche Abschlüsse und betriebliche Anforderungen müssen im Einzelfall geprüft werden."
    ));

    section.appendChild(panel);
    const cta = elements.main.querySelector(".campus-cta");
    if (cta) elements.main.insertBefore(section, cta);
    else elements.main.appendChild(section);
  }

  function renderExtendedDetails(details) {
    if (!details) return;

    addDetailSection(
      "Das solltest du mitbringen",
      "DEINE VORAUSSETZUNGEN",
      details.prerequisites
    );

    addDetailSection(
      "Das lernst du in diesem Beruf",
      "AUSBILDUNG UND LERNINHALTE",
      details.learning
    );

    addDetailSection(
      "Deine Weiterbildungsmöglichkeiten",
      "DEINE ENTWICKLUNG",
      details.furtherTraining
    );

    addDetailSection(
      "Mögliche Karrierewege",
      "DEINE BERUFLICHE ZUKUNFT",
      details.careerPaths
    );

    addDetailSection(
      "Wo kannst du später arbeiten?",
      "TYPISCHE EINSATZBEREICHE",
      details.fields
    );

    addDetailSection(
      "Worauf kannst du dich spezialisieren?",
      "FACHLICHE SCHWERPUNKTE",
      details.specializations
    );

    addDetailSection(
      "Wie kann sich dein Berufsweg entwickeln?",
      "PERSPEKTIVEN MIT BERUFSERFAHRUNG",
      details.development
    );
  }

  function formatEuro(value) {
    return Number(value).toLocaleString("de-DE") + " €";
  }

  function renderAccessAndSalary(career, careerDetails) {
    const data = window.IndustryAICompensation;
    if (!data) return;

    const section = createElement("section", "section");
    section.appendChild(createElement("div", "eyebrow", "ZUGANG UND VERDIENST"));
    section.appendChild(createElement("h2", "", "Voraussetzungen und Gehalt"));

    const panel = createElement("div", "content-panel");
    panel.appendChild(createElement("h3", "", "Wie kommst du in diesen Beruf?"));
    panel.appendChild(createElement("p", "muted", data.accessNote));

    if (careerDetails && Array.isArray(careerDetails.prerequisites) && careerDetails.prerequisites.length) {
      panel.appendChild(createElement("p", "muted", "Hilfreiche Fähigkeiten und Interessen für diesen Beruf:"));
      const skills = document.createElement("ul");
      careerDetails.prerequisites.forEach(function (item) {
        skills.appendChild(createElement("li", "", item));
      });
      panel.appendChild(skills);
    }

    panel.appendChild(createElement("h3", "", "Was kannst du verdienen?"));
    const pay = data.careers && data.careers[career.id] ? data.careers[career.id] : {};

    const payGrid = createElement("div", "info-grid");

    const trainingCard = createElement("article", "info-card");
    trainingCard.appendChild(createElement("small", "", "WÄHREND DER AUSBILDUNG"));
    trainingCard.appendChild(createElement("h3", "", pay.training ? formatEuro(pay.training) + " / Monat" : "Kein Einzelwert hinterlegt"));
    trainingCard.appendChild(createElement("p", "", pay.training
      ? "BIBB-Schätzwert der tariflichen Bruttovergütung im Durchschnitt über alle Ausbildungsjahre (2025). Je nach Branche, Region und Betrieb kann die tatsächliche Vergütung abweichen."
      : "Für diesen Beruf liegt hier derzeit kein belastbarer berufsspezifischer Tarifdurchschnitt vor."));
    payGrid.appendChild(trainingCard);

    const entryCard = createElement("article", "info-card");
    entryCard.appendChild(createElement("small", "", "BERUFSEINSTIEG"));
    entryCard.appendChild(createElement("h3", "", "Betriebs- und tarifabhängig"));
    entryCard.appendChild(createElement("p", "", "Ein bundesweit einheitlicher, amtlicher Einstiegswert nach der Ausbildung wird nicht ausgewiesen. Das konkrete Angebot hängt unter anderem von Region, Tarifvertrag, Branche und Aufgaben ab."));
    payGrid.appendChild(entryCard);

    const experiencedCard = createElement("article", "info-card");
    experiencedCard.appendChild(createElement("small", "", "VOLLZEIT-FACHKRÄFTE – MEDIAN"));
    experiencedCard.appendChild(createElement("h3", "", pay.median ? formatEuro(pay.median) + " / Monat" : "Kein belastbarer Wert verfügbar"));
    experiencedCard.appendChild(createElement("p", "", pay.median
      ? "Median des monatlichen Bruttoentgelts bei Vollzeit in Deutschland. Das ist kein reines Gehalt von Berufserfahrenen, sondern der Median aller erfassten Altersgruppen."
      : "Für diesen Beruf wird hier kein bestätigter Medianwert angezeigt. Bitte keine Gehaltszahl daraus ableiten."));
    if (pay.q1 && pay.q3) {
      experiencedCard.appendChild(createElement("p", "muted", "Unteres bis oberes Quartil: " + formatEuro(pay.q1) + " bis " + formatEuro(pay.q3) + "."));
    }
    if (pay.note) experiencedCard.appendChild(createElement("p", "muted", pay.note));
    payGrid.appendChild(experiencedCard);

    panel.appendChild(payGrid);
    panel.appendChild(createElement("p", "muted", data.salaryNote));

    const sources = createElement("p", "muted");
    const sourceLinks = [];

    if (pay.training) {
      const trainingLink = createElement("a", "", "BIBB – Ausbildungsvergütung 2025");
      trainingLink.href = pay.trainingSource || data.trainingSource;
      trainingLink.target = "_blank";
      trainingLink.rel = "noopener noreferrer";
      trainingLink.style.color = "#42d8ed";
      sourceLinks.push(trainingLink);
    }

    if (pay.median) {
      const salaryLink = createElement("a", "", "BA – Entgeltatlas 2025");
      salaryLink.href = pay.source || data.salarySource;
      salaryLink.target = "_blank";
      salaryLink.rel = "noopener noreferrer";
      salaryLink.style.color = "#42d8ed";
      sourceLinks.push(salaryLink);
    }

    if (sourceLinks.length) {
      sources.appendChild(document.createTextNode("Quellen: "));
      sourceLinks.forEach(function (link, index) {
        if (index) sources.appendChild(document.createTextNode(" · "));
        sources.appendChild(link);
      });
      panel.appendChild(sources);
    }

    section.appendChild(panel);
    const cta = elements.main.querySelector(".campus-cta");
    if (cta) elements.main.insertBefore(section, cta);
    else elements.main.appendChild(section);
  }

  function renderCareer(career) {
    const careerDetails =
      detailsDatabase &&
      detailsDatabase.careers &&
      detailsDatabase.careers[career.id];

    document.title = career.name + " entdecken | INDUSTRYAI";

    elements.title.textContent = career.name;

    elements.intro.textContent =
      (careerDetails && careerDetails.intro) ||
      career.intro ||
      "Entdecke den Beruf " + career.name +
      ", seine typischen Tätigkeiten, das Arbeitsumfeld " +
      "und mögliche Ausbildungswege.";

    addOverviewCard(
      "BERUFSFELD",
      career.category || "Berufsausbildung",
      "Das berufliche Umfeld dieses Ausbildungsberufs."
    );

    addOverviewCard(
      "AUSBILDUNGSWEG",
      career.training && career.training.type === "school_based"
        ? "Schulisch"
        : "Ausbildung",
      formatTraining(career.training)
    );

    addOverviewCard(
      "ARBEITSUMGEBUNG",
      "Arbeitsorte",
      formatLocations(
        career.workingConditions &&
        career.workingConditions.locations
      )
    );

    addOverviewCard(
      "KÖRPERLICHE AKTIVITÄT",
      formatLevel(
        career.workingConditions &&
        career.workingConditions.physicalActivity
      ),
      "Die tatsächliche Belastung hängt vom Betrieb und Einsatzbereich ab."
    );

    elements.day.textContent =
      career.dayToDay ||
      "Für diesen Beruf ist noch keine Beschreibung des Arbeitsalltags hinterlegt.";

    elements.activities.innerHTML = "";

    if (Array.isArray(career.activities) && career.activities.length) {
      career.activities.forEach(function (activity) {
        elements.activities.appendChild(
          createElement("li", "", activity)
        );
      });
    } else {
      elements.activities.appendChild(
        createElement("li", "", "Tätigkeiten werden noch ergänzt.")
      );
    }

    const conditions = career.workingConditions || {};

    const conditionCards = [
      {
        label: "TEAMARBEIT",
        value: formatLevel(conditions.teamwork),
        description: "Zusammenarbeit mit Kollegen."
      },
      {
        label: "MENSCHENKONTAKT",
        value: formatLevel(conditions.peopleContact),
        description: "Kontakt mit Kunden, Patienten oder anderen Menschen."
      },
      {
        label: "KÖRPERLICHE AKTIVITÄT",
        value: formatLevel(conditions.physicalActivity),
        description: "Typische körperliche Anforderungen."
      },
      {
        label: "VERANTWORTUNG",
        value: formatLevel(conditions.responsibility),
        description: "Verantwortung für Aufgaben und Ergebnisse."
      },
      {
        label: "ARBEITSZEITEN",
        value: formatLevel(conditions.shiftWork),
        description: "Mögliche Schicht- oder wechselnde Arbeitszeiten."
      },
      {
        label: "ARBEITSABLAUF",
        value: formatLevel(conditions.routine),
        description: "Wie regelmäßig oder abwechslungsreich Aufgaben sein können."
      }
    ];

    elements.conditions.innerHTML = "";

    conditionCards.forEach(addConditionCard);

    elements.training.textContent = formatTraining(career.training);

    renderExtendedDetails(careerDetails);
    renderAdjacentCareers(career);
  }

  if (
    !database ||
    !Array.isArray(database.careers) ||
    !careerId ||
    !elements.main
  ) {
    showError();
    return;
  }

  const career = database.careers.find(function (item) {
    return item.id === careerId;
  });

  if (!career) {
    showError();
    return;
  }

  renderCareer(career);

  console.log(
    "INDUSTRYAI Campus Version 3.0 geladen:",
    career.name,
    "(" + career.id + ")"
  );
})();
