
/*
 * INDUSTRYAI – Berufscheck
 * Auswertungslogik Version 3.0
 *
 * Bewertungsgewichtung:
 * Profil:             40 %
 * Interessen:         30 %
 * Arbeitsbedingungen: 20 %
 * Werte:              10 %
 *
 * Die Ergebnisse dienen der Berufsorientierung.
 * Sie sind keine wissenschaftliche Eignungsdiagnostik.
 */

(function (global) {
  "use strict";

  const DIMENSIONS = ["T", "A", "S", "K", "C", "O", "N", "B", "L"];

  const WEIGHTS = {
    profile: 0.40,
    interests: 0.30,
    conditions: 0.20,
    values: 0.10
  };

  const DIMENSION_NAMES = {
    T: "Technik und praktisches Arbeiten",
    A: "Analytisches Denken",
    S: "Soziale Fähigkeiten",
    K: "Kommunikation",
    C: "Kreativität",
    O: "Organisation",
    N: "Natur und Umwelt",
    B: "Handeln und Situationen bewältigen",
    L: "Lernen und Entwicklung"
  };

  const TAG_NAMES = {
    maschinen: "Maschinen",
    technik: "Technik",
    fahrzeuge: "Fahrzeuge",
    fahren: "Fahren",
    software: "Software",
    computer: "Computer",
    digital: "Digitalisierung",
    programmieren: "Programmieren",
    design: "Design",
    grafik: "Grafik",
    gestaltung: "Gestaltung",
    kreativ: "Kreativität",
    fotografie: "Fotografie",
    tiere: "Tiere",
    natur: "Natur",
    umwelt: "Umwelt",
    pflanzen: "Pflanzen",
    helfen: "Menschen helfen",
    menschen: "Menschen",
    gesundheit: "Gesundheit",
    medizin: "Medizin",
    organisation: "Organisation",
    planung: "Planung",
    logistik: "Logistik",
    probleme_loesen: "Problemlösung",
    logik: "Logik",
    handwerk: "Handwerk",
    fertigung: "Fertigung",
    lernen: "Lernen",
    entwicklung: "Entwicklung",
    kommunikation: "Kommunikation",
    veranstaltungen: "Veranstaltungen",
    bewegung: "Bewegung",
    forschung: "Forschung",
    metall: "Metallbearbeitung",
    praezision: "Präzision",
    elektronik: "Elektronik",
    automatisierung: "Automatisierung",
    energie: "Energie",
    klima: "Klimatechnik",
    holz: "Holzbearbeitung",
    netzwerke: "Netzwerke",
    grafik: "Grafik",
    medien: "Medien",
    team: "Teamarbeit",
    wirtschaft: "Wirtschaft",
    zahlen: "Zahlen",
    handel: "Handel",
    beratung: "Beratung",
    kinder: "Kinder",
    pflege: "Pflege",
    chemie: "Chemie",
    analyse: "Analyse",
    kochen: "Kochen",
    lebensmittel: "Lebensmittel",
    gastronomie: "Gastronomie",
    musik: "Musik",
    licht: "Lichttechnik",
    ton: "Tontechnik",
    waren: "Waren",
    unterwegs: "Unterwegs sein",
    dekoration: "Dekoration"
  };

  const TAG_ALIASES = {
    maschinen: ["maschinen", "technik"],
    technik: ["technik", "maschinen"],
    fahrzeuge: ["fahrzeuge", "fahren"],
    software: ["software", "computer", "digital"],
    computer: ["computer", "software", "digital"],
    digital: ["digital", "computer", "software"],
    programmieren: ["programmieren", "software", "digital"],
    design: ["design", "grafik", "gestaltung", "kreativ"],
    kreativ: ["kreativ", "design", "gestaltung"],
    fotografie: ["fotografie", "design", "medien"],
    natur: ["natur", "umwelt", "landwirtschaft"],
    pflanzen: ["pflanzen", "natur", "umwelt"],
    helfen: ["helfen", "gesundheit", "menschen"],
    menschen: ["menschen", "helfen"],
    gesundheit: ["gesundheit", "medizin"],
    medizin: ["medizin", "gesundheit"],
    organisation: ["organisation", "planung", "logistik"],
    planung: ["planung", "organisation"],
    probleme_loesen: ["probleme_loesen", "logik"],
    logik: ["logik", "probleme_loesen"],
    handwerk: ["handwerk", "fertigung"],
    lernen: ["lernen", "entwicklung"],
    entwicklung: ["entwicklung", "lernen"],
    kommunikation: ["kommunikation", "menschen"],
    veranstaltungen: ["veranstaltungen", "team"]
  };

  const VALUE_NAMES = {
    sicherheit: "Sicherheit",
    einkommen: "Einkommen",
    helfen: "Anderen helfen",
    kreativitaet: "Kreativität",
    selbststaendigkeit: "Selbstständigkeit",
    teamwork: "Teamarbeit",
    technik: "Technik",
    nachhaltigkeit: "Nachhaltigkeit",
    entwicklung: "Weiterentwicklung",
    abwechslung: "Abwechslung",
    qualitaet: "Qualität",
    verantwortung: "Verantwortung",
    struktur: "Struktur",
    natur: "Natur",
    tiere: "Tiere",
    handwerk: "Handwerk"
  };

  const ACTIVITY_LEVEL = {
    low: 1,
    medium: 2,
    high: 3,
    very_high: 4
  };

  const TEAM_LEVEL = {
    low: 1,
    mixed: 2,
    high: 3,
    very_high: 4
  };

  const ROUTINE_LEVEL = {
    low: 1,
    mixed: 2,
    high: 3
  };

  const RESPONSIBILITY_LEVEL = {
    low: 1,
    medium: 2,
    high: 3
  };

  const PRECISION_LEVEL = {
    low: 1,
    medium: 2,
    high: 3
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function unique(values) {
    return [...new Set(
      (Array.isArray(values) ? values : []).filter(
        value => value !== null &&
          value !== undefined &&
          value !== ""
      )
    )];
  }

  function normalizedProfile(profile) {
    const result = {};

    DIMENSIONS.forEach(key => {
      const value = profile ? profile[key] : null;
      const numeric = Number(value);

      result[key] =
        value === null || value === undefined || value === "" ||
        !Number.isFinite(numeric)
          ? null
          : clamp(numeric, 0, 100);
    });

    return result;
  }

  function profileSimilarity(userProfile, careerProfile) {
    let difference = 0;
    let used = 0;

    DIMENSIONS.forEach(key => {
      const userValue = userProfile[key];
      const careerValue = careerProfile
        ? Number(careerProfile[key])
        : NaN;

      if (
        userValue === null ||
        !Number.isFinite(careerValue)
      ) {
        return;
      }

      const normalizedCareer = clamp(careerValue, 0, 4) * 25;

      difference += Math.abs(userValue - normalizedCareer);
      used++;
    });

    return used
      ? clamp(100 - difference / used, 0, 100)
      : null;
  }

  function expandTags(tags) {
    const expanded = new Set();

    unique(tags).forEach(tag => {
      expanded.add(tag);

      (TAG_ALIASES[tag] || []).forEach(alias => {
        expanded.add(alias);
      });
    });

    return expanded;
  }

  function interestSimilarity(selectedTags, career) {
    const userTags = expandTags(selectedTags);
    const careerTags = new Set(unique(career.interestTags));

    if (!userTags.size || !careerTags.size) {
      return { score: null, matches: [] };
    }

    const matches = [...userTags].filter(
      tag => careerTags.has(tag)
    );

    return {
      score: clamp(
        (matches.length / userTags.size) * 100,
        0,
        100
      ),
      matches
    };
  }

  function levelSimilarity(userValue, careerValue, scale) {
    if (!userValue || !careerValue) return null;

    const userLevel = scale[userValue];
    const careerLevel = scale[careerValue];

    if (!userLevel || !careerLevel) return null;

    const maxLevel = Math.max(...Object.values(scale));

    return 100 -
      (Math.abs(userLevel - careerLevel) / (maxLevel - 1)) * 100;
  }

  function locationSimilarity(userLocations, careerLocations) {
    const user = unique(userLocations).map(value =>
      String(value).toLowerCase()
    );

    const career = unique(careerLocations).map(value =>
      String(value).toLowerCase()
    );

    if (!user.length || !career.length) return null;

    const aliases = {
      "werkstatt": ["werkstatt", "produktion", "baustelle"],
      "büro": ["büro", "rechenzentrum", "homeoffice"],
      "im freien": ["im freien", "stall", "betriebshof", "gewächshaus"],
      "labor": ["labor", "tierarztpraxis", "tierklinik"],
      "kundenbereich": ["kundenbereich", "verkaufsfläche"],
      "beim kunden": ["beim kunden", "kundenstandorte"],
      "küche": ["küche", "gastronomie", "gemeinschaftsverpflegung"]
    };

    let matches = 0;

    user.forEach(value => {
      const possibilities = aliases[value] || [value];

      if (possibilities.some(item => career.includes(item))) {
        matches++;
      }
    });

    return matches / user.length * 100;
  }

  function shiftSimilarity(userValue, careerValue) {
    if (!userValue || !careerValue) return null;

    const compatibility = {
      regular: {
        rare: 100,
        possible: 65,
        common: 25
      },
      early: {
        rare: null,
        possible: null,
        common: null
      },
      okay: {
        rare: 80,
        possible: 100,
        common: 100
      },
      prefer: {
        rare: 65,
        possible: 85,
        common: 100
      }
    };

    return compatibility[userValue]?.[careerValue] ?? null;
  }

  function conditionDetails(preferences, working) {
    const details = [];

    function add(label, score) {
      if (score !== null && Number.isFinite(score)) {
        details.push({
          label,
          score: Math.round(clamp(score, 0, 100))
        });
      }
    }

    add(
      "Arbeitsort",
      locationSimilarity(preferences.locations, working.locations)
    );

    add(
      "Körperliche Aktivität",
      levelSimilarity(
        preferences.physicalActivity,
        working.physicalActivity,
        ACTIVITY_LEVEL
      )
    );

    add(
      "Kontakt mit Menschen",
      levelSimilarity(
        preferences.peopleContact,
        working.peopleContact,
        ACTIVITY_LEVEL
      )
    );

    add(
      "Teamarbeit",
      levelSimilarity(
        preferences.teamwork,
        working.teamwork,
        TEAM_LEVEL
      )
    );

    add(
      "Routine und Abwechslung",
      levelSimilarity(
        preferences.routine,
        working.routine,
        ROUTINE_LEVEL
      )
    );

    add(
      "Genauigkeit und Präzision",
      levelSimilarity(
        preferences.precision,
        working.precision,
        PRECISION_LEVEL
      )
    );

    add(
      "Verantwortung",
      levelSimilarity(
        preferences.responsibility,
        working.responsibility,
        RESPONSIBILITY_LEVEL
      )
    );

    add(
      "Arbeitszeiten",
      shiftSimilarity(
        preferences.shiftWork,
        working.shiftWork
      )
    );

    return details;
  }

  function average(values) {
    return values.length
      ? values.reduce((sum, value) => sum + value, 0) / values.length
      : null;
  }

  function valueSimilarity(selectedValues, career) {
    const selected = unique(selectedValues);
    const careerValues = new Set(unique(career.valuesTags));

    if (!selected.length || !careerValues.size) {
      return { score: null, matches: [] };
    }

    const matches = selected.filter(value =>
      careerValues.has(value)
    );

    return {
      score: matches.length / selected.length * 100,
      matches
    };
  }

  function weightedTotal(parts) {
    let numerator = 0;
    let denominator = 0;

    Object.entries(WEIGHTS).forEach(([key, weight]) => {
      const value = parts[key];

      if (value !== null && Number.isFinite(value)) {
        numerator += value * weight;
        denominator += weight;
      }
    });

    return denominator
      ? Math.round(numerator / denominator)
      : null;
  }

  function makeConflictNotes(career, avoidances) {
    const notes = [];
    const work = career.workingConditions || {};
    const avoid = new Set(unique(avoidances));

    if (avoid.has("schichtarbeit")) {
      if (work.shiftWork === "common") {
        notes.push(
          "Schicht- oder unregelmäßige Arbeitszeiten sind in diesem Beruf häufig."
        );
      } else if (work.shiftWork === "possible") {
        notes.push(
          "Je nach Betrieb kann Schichtarbeit vorkommen."
        );
      }
    }

    if (
      avoid.has("viel_kundenkontakt") &&
      ["high", "very_high"].includes(work.peopleContact)
    ) {
      notes.push(
        "Der Beruf beinhaltet typischerweise viel Kontakt mit Menschen oder Kunden."
      );
    }

    if (
      avoid.has("koerperliche_arbeit") &&
      work.physicalActivity === "high"
    ) {
      notes.push(
        "Die Tätigkeit ist häufig körperlich aktiv oder anstrengend."
      );
    }

    if (
      avoid.has("zeitdruck") &&
      work.timePressure === "high"
    ) {
      notes.push(
        "In diesem Beruf können Phasen mit hohem Zeitdruck auftreten."
      );
    }

    if (
      avoid.has("viel_bildschirm") &&
      (work.locations || []).some(location =>
        ["büro", "rechenzentrum", "studio", "homeoffice"].includes(
          String(location).toLowerCase()
        )
      )
    ) {
      notes.push(
        "Ein Teil der Arbeit kann am Bildschirm stattfinden."
      );
    }

    if (avoid.has("routine") && work.routine === "high") {
      notes.push(
        "In diesem Beruf gibt es regelmäßig wiederkehrende Arbeitsabläufe."
      );
    }

    if (avoid.has("wechsel") && work.routine === "low") {
      notes.push(
        "Der Arbeitsalltag kann häufig wechselnde Aufgaben enthalten."
      );
    }

    if (
      avoid.has("wetter") &&
      (work.locations || []).some(location =>
        ["im freien", "baustelle", "stall", "betriebshof"].includes(
          String(location).toLowerCase()
        )
      )
    ) {
      notes.push(
        "Je nach Einsatzort kann die Arbeit von Wetter und Außeneinsätzen abhängig sein."
      );
    }

    if (
      avoid.has("verantwortung") &&
      work.responsibility === "high"
    ) {
      notes.push(
        "Der Beruf kann ein hohes Maß an Verantwortung beinhalten."
      );
    }

    if (avoid.has("krankheit") && career.category === "Gesundheit & Soziales") {
      notes.push(
        "Der Beruf kann Kontakt mit Krankheit, Verletzungen oder Pflegebedürftigkeit beinhalten."
      );
    }

    return notes;
  }

  function buildReasons(career, profile, interestResult, valueResult, conditionResult) {
    const reasons = [];

    const profileMatches = DIMENSIONS
      .map(key => ({
        key,
        user: profile[key],
        career: Number(career.profile?.[key] ?? 0) * 25
      }))
      .filter(item =>
        item.user !== null &&
        item.user >= 60 &&
        item.career >= 60
      )
      .sort((a, b) =>
        (b.user + b.career) - (a.user + a.career)
      );

    profileMatches.slice(0, 3).forEach(item => {
      reasons.push(
        "Deine Antworten zeigen eine Stärke bei " +
        DIMENSION_NAMES[item.key].toLowerCase() +
        ", die in diesem Beruf ebenfalls gefragt ist."
      );
    });

    interestResult.matches.slice(0, 4).forEach(tag => {
      reasons.push(
        "Dein Interesse an " +
        (TAG_NAMES[tag] || tag.replaceAll("_", " ")) +
        " passt zu diesem Beruf."
      );
    });

    valueResult.matches.slice(0, 2).forEach(value => {
      reasons.push(
        "Ein von dir genannter Berufswert ist hier wiederzufinden: " +
        (VALUE_NAMES[value] || value) + "."
      );
    });

    conditionResult
      .filter(item => item.score >= 75)
      .slice(0, 2)
      .forEach(item => {
        reasons.push(
          "Deine Vorstellung von " +
          item.label.toLowerCase() +
          " passt gut zu den typischen Arbeitsbedingungen."
        );
      });

    return [...new Set(reasons)].slice(0, 6);
  }

  function evaluate(input, database, options) {
    input = input || {};

    const careers = database && Array.isArray(database.careers)
      ? database.careers
      : [];

    const profile = normalizedProfile(input.profile || {});
    const preferences = input.preferences || {};
    const selectedInterests = unique(input.interests);
    const selectedValues = unique(
      preferences.values || input.values
    );
    const desired = new Set(unique(input.desiredCareers));
    const avoidances = unique(input.avoidances);

    const results = careers.map(career => {
      const working = career.workingConditions || {};

      const interestResult = interestSimilarity(
        selectedInterests,
        career
      );

      const valueResult = valueSimilarity(
        selectedValues,
        career
      );

      const conditionResult = conditionDetails(
        preferences,
        working
      );

      const parts = {
        profile: profileSimilarity(
          profile,
          career.profile || {}
        ),

        interests: interestResult.score,

        conditions: average(
          conditionResult.map(item => item.score)
        ),

        values: valueResult.score
      };

      const conflictNotes = makeConflictNotes(
        career,
        avoidances
      );

      return {
        id: career.id,
        name: career.name,
        category: career.category,
        match: weightedTotal(parts),

        components: Object.fromEntries(
          Object.entries(parts).map(([key, value]) => [
            key,
            value === null ? null : Math.round(value)
          ])
        ),

        componentDetails: conditionResult,

        reasons: buildReasons(
          career,
          profile,
          interestResult,
          valueResult,
          conditionResult
        ),

        matchedInterests: interestResult.matches,
        matchedValues: valueResult.matches,

        requestedByUser: desired.has(career.id),
        conflictNotes,

        training: career.training,
        activities: career.activities || [],
        dayToDay: career.dayToDay || ""
      };
    });

    results.sort((a, b) => {
      if (a.requestedByUser !== b.requestedByUser) {
        return a.requestedByUser ? -1 : 1;
      }

      return (b.match ?? -1) - (a.match ?? -1);
    });

    const limit =
      options && Number.isInteger(options.limit)
        ? Math.max(1, options.limit)
        : 5;

    const output = {
      version: "3.0.0",

      disclaimer:
        "Die Vorschläge dienen der Berufsorientierung. " +
        "Sie sind keine Eignungsdiagnose und sagen nicht voraus, " +
        "ob jemand einen Beruf erfolgreich ausüben wird.",

      weights: Object.assign({}, WEIGHTS),

      selfAssessment: input.selfAssessment || null,

      results: results.slice(0, limit),

      requestedCareers: results.filter(
        item => item.requestedByUser
      )
    };

    lastEvaluation = output;

    return output;
  }

  // ----------------------------------------------------
  // ERGEBNISDETAILS AUTOMATISCH IN DIE ERGEBNISKARTEN
  // EINFÜGEN – career-quiz.js MUSS NICHT GEÄNDERT WERDEN.
  // ----------------------------------------------------

  let lastEvaluation = null;

  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;

    return element;
  }

  function addScoreBar(parent, label, score) {
    if (score === null || score === undefined) return;

    const item = createElement("div", "career-score-detail");

    const line = createElement("div", "career-score-line");
    const name = createElement("span", "", label);
    const value = createElement("strong", "", score + " %");

    line.appendChild(name);
    line.appendChild(value);

    const track = createElement("div", "career-score-track");
    const fill = createElement("div", "career-score-fill");

    fill.style.width = clamp(score, 0, 100) + "%";

    track.appendChild(fill);
    item.appendChild(line);
    item.appendChild(track);
    parent.appendChild(item);
  }

  function enrichResultCards() {
    if (!lastEvaluation || !lastEvaluation.results) return;

    const container = document.getElementById("career-results");
    if (!container) return;

    const cards = container.querySelectorAll(
      ".career-result-card"
    );

    cards.forEach((card, index) => {
      if (card.dataset.detailsAdded === "true") return;

      const career = lastEvaluation.results[index];
      if (!career) return;

      card.dataset.detailsAdded = "true";

      const details = createElement(
        "section",
        "career-match-details"
      );

      const heading = createElement(
        "h4",
        "",
        "Warum passt dieser Beruf zu deinen Antworten?"
      );

      details.appendChild(heading);

      if (career.reasons.length) {
        const reasonList = createElement("ul", "career-match-reasons");

        career.reasons.forEach(reason => {
          reasonList.appendChild(
            createElement("li", "", reason)
          );
        });

        details.appendChild(reasonList);
      } else {
        details.appendChild(
          createElement(
            "p",
            "",
            "Für diesen Beruf liegen noch nicht genügend übereinstimmende Angaben für eine konkrete Begründung vor."
          )
        );
      }

      const scoreHeading = createElement(
        "h4",
        "",
        "Zusammensetzung deiner Übereinstimmung"
      );

      details.appendChild(scoreHeading);

      const labels = {
        profile: "Persönliches Profil (40 %)",
        interests: "Interessen (30 %)",
        conditions: "Arbeitsbedingungen (20 %)",
        values: "Berufliche Werte (10 %)"
      };

      Object.entries(labels).forEach(([key, label]) => {
        addScoreBar(
          details,
          label,
          career.components[key]
        );
      });

      if (career.componentDetails.length) {
        const conditionHeading = createElement(
          "h4",
          "",
          "Einzelne Arbeitsbedingungen"
        );

        details.appendChild(conditionHeading);

        career.componentDetails.forEach(item => {
          addScoreBar(details, item.label, item.score);
        });
      }

      if (career.conflictNotes.length) {
        const conflictHeading = createElement(
          "h4",
          "",
          "Das solltest du bei diesem Beruf beachten"
        );

        details.appendChild(conflictHeading);

        const conflictList = createElement("ul");

        career.conflictNotes.forEach(note => {
          conflictList.appendChild(
            createElement("li", "", note)
          );
        });

        details.appendChild(conflictList);
      }

      card.appendChild(details);
    });
  }

  function installResultObserver() {
    const container = document.getElementById("career-results");

    if (!container || typeof MutationObserver === "undefined") {
      return;
    }

    const observer = new MutationObserver(() => {
      enrichResultCards();
    });

    observer.observe(container, {
      childList: true,
      subtree: true
    });
  }

  global.IndustryAICareerCheck = {
    evaluate,
    dimensions: DIMENSIONS.slice(),
    weights: Object.assign({}, WEIGHTS)
  };

  installResultObserver();

})(window);
