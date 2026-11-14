
/*
 * INDUSTRYAI – Auswertungslogik
 * Version 3.0
 *
 * Gewichtung:
 * Persönliches Profil: 40 %
 * Interessen:          30 %
 * Arbeitsbedingungen:  20 %
 * Werte:               10 %
 *
 * Abneigungen führen zu Hinweisen, nicht zum Ausschluss.
 */

(function () {
  "use strict";

  const WEIGHTS = {
    profile: 0.40,
    interests: 0.30,
    conditions: 0.20,
    values: 0.10
  };

  const DIMENSION_NAMES = {
    T: "Technik und praktisches Arbeiten",
    A: "Analytisches Denken",
    S: "Soziales Verständnis",
    K: "Kommunikation",
    C: "Kreativität",
    O: "Organisation",
    N: "Natur und Umwelt",
    B: "Handeln und Situationen bewältigen",
    L: "Lernen und Entwicklung"
  };

  const INTEREST_ALIASES = {
    maschinen: ["maschinen", "technik", "fertigung"],
    technik: ["technik", "maschinen", "elektronik"],
    handwerk: ["handwerk", "fertigung", "holz", "metall"],
    reparieren: ["reparieren", "probleme_loesen", "technik"],
    software: ["software", "programmieren", "computer", "digital"],
    programmieren: ["programmieren", "software", "digital"],
    computer: ["computer", "software", "digital"],
    digital: ["digital", "computer", "software"],
    menschen: ["menschen", "helfen", "kommunikation"],
    helfen: ["helfen", "menschen", "gesundheit"],
    gesundheit: ["gesundheit", "medizin", "helfen"],
    medizin: ["medizin", "gesundheit", "menschen"],
    design: ["design", "kreativ", "gestaltung", "grafik"],
    kreativ: ["kreativ", "design", "gestaltung"],
    fotografie: ["fotografie", "design", "medien"],
    natur: ["natur", "umwelt", "pflanzen", "tiere"],
    tiere: ["tiere", "natur"],
    pflanzen: ["pflanzen", "natur", "umwelt"],
    organisation: ["organisation", "planung", "struktur"],
    planung: ["planung", "organisation", "logik"],
    logik: ["logik", "probleme_loesen", "forschung"],
    forschung: ["forschung", "logik", "technik"],
    kommunikation: ["kommunikation", "menschen", "beratung"],
    entwicklung: ["entwicklung", "lernen", "digital", "technik"],
    fahrzeuge: ["fahrzeuge", "technik", "reparieren"]
  };

  const VALUE_ALIASES = {
    sicherheit: ["sicherheit", "struktur"],
    einkommen: ["sicherheit", "wirtschaft"],
    helfen: ["helfen", "menschen", "gesundheit"],
    kreativitaet: ["kreativitaet", "kreativ", "design"],
    selbststaendigkeit: ["selbststaendigkeit", "verantwortung"],
    teamwork: ["teamwork", "team"],
    technik: ["technik", "entwicklung"],
    nachhaltigkeit: ["nachhaltigkeit", "natur", "umwelt"],
    entwicklung: ["entwicklung", "lernen"],
    abwechslung: ["abwechslung", "vielfalt"]
  };

  function unique(values) {
    return [...new Set((values || []).filter(Boolean))];
  }

  function expandTags(tags, aliases) {
    const expanded = [];

    (tags || []).forEach(function (tag) {
      expanded.push(tag);
      (aliases[tag] || []).forEach(function (alias) {
        expanded.push(alias);
      });
    });

    return unique(expanded);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function average(values) {
    if (!values.length) return null;
    return values.reduce(function (sum, value) {
      return sum + value;
    }, 0) / values.length;
  }

  function profileScore(userProfile, careerProfile) {
    const comparisons = [];

    Object.keys(DIMENSION_NAMES).forEach(function (dimension) {
      const userValue = userProfile && userProfile[dimension];
      const careerValue = careerProfile && careerProfile[dimension];

      if (userValue === null || userValue === undefined ||
          careerValue === null || careerValue === undefined) {
        return;
      }

      const normalizedCareer = Number(careerValue) * 25;
      const normalizedUser = Number(userValue);
      const similarity = 100 - Math.abs(normalizedUser - normalizedCareer);

      comparisons.push({
        dimension: dimension,
        name: DIMENSION_NAMES[dimension],
        score: clamp(similarity, 0, 100)
      });
    });

    return {
      score: average(comparisons.map(function (item) {
        return item.score;
      })),
      details: comparisons
    };
  }

  function interestScore(userTags, careerTags) {
    const user = expandTags(userTags, INTEREST_ALIASES);
    const career = expandTags(careerTags, INTEREST_ALIASES);

    if (!user.length || !career.length) {
      return { score: null, matched: [], missing: [] };
    }

    const matched = user.filter(function (tag) {
      return career.includes(tag);
    });

    const score = clamp(
      Math.round((matched.length / user.length) * 100),
      0,
      100
    );

    return {
      score: score,
      matched: unique(matched),
      missing: user.filter(function (tag) {
        return !career.includes(tag);
      })
    };
  }

  function conditionComparison(preference, careerValue, type) {
    if (!preference || !careerValue || preference === "open") return null;

    const levels = {
      low: 1,
      rare: 1,
      medium: 2,
      mixed: 2,
      possible: 3,
      high: 3,
      common: 3,
      very_high: 3
    };

    const userLevel = levels[preference];
    const careerLevel = levels[careerValue];

    if (userLevel === undefined || careerLevel === undefined) return null;

    if (type === "shiftWork") {
      if (preference === "rare") {
        return careerValue === "rare" ? 100 : 20;
      }
      if (preference === "possible") {
        return careerValue === "rare" ? 75 : 100;
      }
    }

    const difference = Math.abs(userLevel - careerLevel);
    return difference === 0 ? 100 : difference === 1 ? 65 : 25;
  }

  function locationScore(userLocations, careerLocations) {
    const user = userLocations || [];
    const career = careerLocations || [];

    if (!user.length || user.includes("offen")) return null;

    const matches = user.filter(function (location) {
      return career.some(function (careerLocation) {
        return careerLocation.toLowerCase().includes(location.toLowerCase()) ||
          location.toLowerCase().includes(careerLocation.toLowerCase());
      });
    });

    return matches.length ? 100 : 30;
  }

  function conditionScore(preferences, conditions) {
    const comparisons = [];

    const location = locationScore(
      preferences.locations,
      conditions.locations
    );

    if (location !== null) comparisons.push(location);

    [
      "teamwork",
      "physicalActivity",
      "peopleContact",
      "routine",
      "responsibility",
      "shiftWork"
    ].forEach(function (key) {
      const score = conditionComparison(
        preferences[key],
        conditions[key],
        key
      );

      if (score !== null) comparisons.push(score);
    });

    return {
      score: average(comparisons),
      comparisonCount: comparisons.length
    };
  }

  function valueScore(userValues, careerValues) {
    const user = expandTags(userValues, VALUE_ALIASES);
    const career = expandTags(careerValues, VALUE_ALIASES);

    if (!user.length || !career.length) return null;

    const matched = user.filter(function (value) {
      return career.includes(value);
    });

    return clamp(Math.round(matched.length / user.length * 100), 0, 100);
  }

  function makeConflictNotes(avoidances, conditions, career) {
    const notes = [];
    const selected = avoidances || [];

    if (
      selected.includes("schichtarbeit") &&
      conditions.shiftWork &&
      conditions.shiftWork !== "rare"
    ) {
      notes.push("In diesem Beruf können Schicht- oder Wochenendarbeiten vorkommen.");
    }

    if (
      selected.includes("koerperliche_arbeit") &&
      conditions.physicalActivity === "high"
    ) {
      notes.push("Der Beruf kann körperlich anstrengend sein.");
    }

    if (
      selected.includes("viel_kundenkontakt") &&
      conditions.peopleContact === "very_high"
    ) {
      notes.push("Der Beruf beinhaltet häufig Kontakt mit Kunden, Patienten oder anderen Menschen.");
    }

    if (
      selected.includes("viel_bildschirm") &&
      career.workingConditions &&
      career.workingConditions.locations &&
      career.workingConditions.locations.includes("Büro")
    ) {
      notes.push("Ein Teil der Arbeit kann überwiegend am Bildschirm stattfinden.");
    }

    if (
      selected.includes("zeitdruck") &&
      conditions.timePressure === "high"
    ) {
      notes.push("In diesem Beruf kann deutlicher Zeitdruck entstehen.");
    }

    if (
      selected.includes("routine") &&
      conditions.routine === "high"
    ) {
      notes.push("Einige Tätigkeiten können sich regelmäßig wiederholen.");
    }

    if (
      selected.includes("wechsel") &&
      conditions.routine === "low"
    ) {
      notes.push("Der Arbeitsalltag kann stark wechselnde Aufgaben und Situationen enthalten.");
    }

    if (
      selected.includes("verantwortung") &&
      ["high", "very_high"].includes(conditions.responsibility)
    ) {
      notes.push("Der Beruf bringt Verantwortung für Abläufe, Menschen oder Ergebnisse mit sich.");
    }

    if (
      selected.includes("wetter") &&
      conditions.locations &&
      conditions.locations.includes("im Freien")
    ) {
      notes.push("Arbeiten im Freien können bei unterschiedlichen Wetterbedingungen stattfinden.");
    }

    if (
      selected.includes("krankheit") &&
      career.category === "Gesundheit, Soziales & Menschen"
    ) {
      notes.push("Je nach Einsatzbereich kann Kontakt mit Krankheit, Verletzungen oder Pflege erforderlich sein.");
    }

    return unique(notes);
  }

  function buildReasons(components, interest, profile) {
    const reasons = [];

    if (components.profile !== null && components.profile >= 70) {
      reasons.push("Dein Verhaltensprofil passt in mehreren Bereichen zu diesem Beruf.");
    }

    if (interest.matched && interest.matched.length) {
      reasons.push("Deine Interessen passen zu: " + interest.matched.slice(0, 4).join(", ") + ".");
    }

    if (components.conditions !== null && components.conditions >= 70) {
      reasons.push("Die beschriebenen Arbeitsbedingungen passen gut zu deinen Angaben.");
    }

    if (components.values !== null && components.values >= 70) {
      reasons.push("Wichtige Werte, die du genannt hast, finden sich in diesem Beruf wieder.");
    }

    if (!reasons.length) {
      reasons.push("Dieser Beruf kann eine Möglichkeit sein, die du näher kennenlernen kannst.");
    }

    return reasons;
  }

  function evaluate(input, database, options) {
    input = input || {};
    options = options || {};

    const careers = Array.isArray(database)
      ? database
      : database && Array.isArray(database.careers)
        ? database.careers
        : [];

    const limit = Number(options.limit) || 5;
    const results = [];

    careers.forEach(function (career) {
      const profile = profileScore(input.profile, career.profile || {});
      const interests = interestScore(input.interests, career.interestTags || []);
      const conditions = conditionScore(
        input.preferences || {},
        career.workingConditions || {}
      );
      const values = valueScore(input.values, career.valuesTags || []);

      const rawComponents = {
        profile: profile.score,
        interests: interests.score,
        conditions: conditions.score,
        values: values
      };

      let weightedTotal = 0;
      let availableWeight = 0;

      Object.keys(WEIGHTS).forEach(function (key) {
        const score = rawComponents[key];

        if (score !== null && score !== undefined) {
          weightedTotal += score * WEIGHTS[key];
          availableWeight += WEIGHTS[key];
        }
      });

      const match = availableWeight > 0
        ? Math.round(weightedTotal / availableWeight)
        : null;

      const requestedByUser = (input.desiredCareers || []).includes(career.id);

      const components = {
        profile: rawComponents.profile === null ? null : Math.round(rawComponents.profile),
        interests: rawComponents.interests === null ? null : Math.round(rawComponents.interests),
        conditions: rawComponents.conditions === null ? null : Math.round(rawComponents.conditions),
        values: rawComponents.values === null ? null : Math.round(rawComponents.values)
      };

      const conflictNotes = makeConflictNotes(
        input.avoidances || [],
        career.workingConditions || {},
        career
      );

      results.push({
        id: career.id,
        name: career.name,
        category: career.category,
        match: match,
        requestedByUser: requestedByUser,
        profileDetails: profile.details,
        components: components,
        componentDetails: {
          profile: profile.details,
          interests: interests,
          conditions: {
            score: components.conditions,
            comparedPreferences: conditions.comparisonCount
          },
          values: {
            score: components.values
          }
        },
        reasons: buildReasons(components, interests, profile),
        conflictNotes: conflictNotes,
        activities: career.activities || [],
        dayToDay: career.dayToDay || "",
        training: career.training || null
      });
    });

    results.sort(function (a, b) {
      if (a.requestedByUser !== b.requestedByUser) {
        return a.requestedByUser ? -1 : 1;
      }

      return (b.match || 0) - (a.match || 0);
    });

    return {
      results: results.slice(0, limit),
      weights: WEIGHTS,
      disclaimer:
        "Die Ergebnisse sind Orientierungsvorschläge auf Basis deiner Antworten. " +
        "Sie stellen keine Eignungsdiagnose dar und ersetzen keine persönliche Berufsberatung."
    };
  }

  window.IndustryAICareerCheck = {
    version: "3.0.0",
    evaluate: evaluate,
    weights: WEIGHTS
  };
})();
