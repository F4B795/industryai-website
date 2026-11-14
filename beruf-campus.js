
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
