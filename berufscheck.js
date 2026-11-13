
/*
 * INDUSTRYAI – Berufscheck
 * Auswertungslogik Version 1.0
 *
 * Die Ergebnisse dienen der Berufsorientierung,
 * nicht der wissenschaftlichen Eignungsdiagnostik.
 */

(function (global) {
  "use strict";

  const DIMENSIONS = [
    "T", "A", "S", "K", "C", "O", "N", "B", "L"
  ];

  const WEIGHTS = {
    profile: 0.40,
    interests: 0.30,
    conditions: 0.20,
    values: 0.10
  };

  const TAG_DIMENSIONS = {
    maschinen: ["T", "A"],
    technik: ["T", "A"],
    fertigung: ["T"],
    praezision: ["A", "T"],
    metall: ["T"],
    reparieren: ["T", "A"],
    elektronik: ["T", "A"],
    programmieren: ["A", "C"],
    fahrzeuge: ["T"],
    handwerk: ["T", "C"],
    software: ["A", "C"],
    digital: ["A", "L"],
    computer: ["A"],
    menschen: ["S", "K"],
    gesundheit: ["S", "A"],
    helfen: ["S"],
    medizin: ["A", "S"],
    kommunikation: ["K", "S"],
    organisation: ["O", "K"],
    wirtschaft: ["A", "O"],
    buero: ["O", "K"],
    finanzen: ["A", "O"],
    design: ["C"],
    kreativ: ["C"],
    fotografie: ["C"],
    natur: ["N"],
    tiere: ["N", "S"],
    pflanzen: ["N"],
    umwelt: ["N"],
    kochen: ["C", "T"],
    logistik: ["O", "T"],
    fahren: ["T", "B"],
    veranstaltungen: ["O", "K"]
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function unique(values) {
    return [...new Set(asArray(values).filter(Boolean))];
  }

  function normalizedProfile(profile) {
    const result = {};

    DIMENSIONS.forEach((key) => {
      const value = Number(profile && profile[key]);

      result[key] = Number.isFinite(value)
        ? clamp(value, 0, 100)
        : null;
    });

    return result;
  }

  function profileSimilarity(userProfile, careerProfile) {
    let difference = 0;
    let used = 0;

    DIMENSIONS.forEach((key) => {
      const userValue = userProfile[key];
      const careerValue = Number(careerProfile && careerProfile[key]);

      if (userValue === null || !Number.isFinite(careerValue)) {
        return;
      }

      difference += Math.abs(
        userValue - clamp(careerValue, 0, 4) * 25
      );

      used++;
    });

    return used
      ? clamp(100 - difference / used, 0, 100)
      : null;
  }

  function interestSimilarity(selectedTags, career) {
    const tags = unique(selectedTags);

    if (!tags.length) return null;

    const userDimensions = {};

    tags.forEach((tag) => {
      (TAG_DIMENSIONS[tag] || []).forEach((dimension) => {
        userDimensions[dimension] =
          (userDimensions[dimension] || 0) + 1;
      });
    });

    const careerProfile = career.profile || {};
    let weightedFit = 0;
    let totalWeight = 0;

    Object.entries(userDimensions).forEach(([dimension, count]) => {
      const weight = Math.min(count, 3);
      const careerLevel =
        clamp(Number(careerProfile[dimension] || 0), 0, 4) / 4;

      weightedFit += careerLevel * weight;
      totalWeight += weight;
    });

    return totalWeight
      ? clamp((weightedFit / totalWeight) * 100, 0, 100)
      : null;
  }

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

  function levelSimilarity(userValue, careerValue, scale) {
    if (!userValue || !careerValue) return null;

    const userLevel = scale[userValue];
    const careerLevel = scale[careerValue];

    if (!userLevel || !careerLevel) return null;

    const max = Math.max(...Object.values(scale));

    return 100 -
      (Math.abs(userLevel - careerLevel) / (max - 1)) * 100;
  }

  function locationSimilarity(userLocations, careerLocations) {
    const user = unique(userLocations).map((item) =>
      String(item).trim().toLowerCase()
    );

    const career = unique(careerLocations).map((item) =>
      String(item).trim().toLowerCase()
    );

    if (!user.length) return null;
    if (!career.length) return 50;

    const matches = user.filter((item) =>
      career.includes(item)
    ).length;

    return (matches / user.length) * 100;
  }

  function conditionSimilarity(preferences, working) {
    const checks = [];

    const location = locationSimilarity(
      preferences.locations,
      working.locations
    );

    if (location !== null) checks.push(location);

    const physical = levelSimilarity(
      preferences.physicalActivity,
      working.physicalActivity,
      ACTIVITY_LEVEL
    );

    if (physical !== null) checks.push(physical);

    const people = levelSimilarity(
      preferences.peopleContact,
      working.peopleContact,
      ACTIVITY_LEVEL
    );

    if (people !== null) checks.push(people);

    const team = levelSimilarity(
      preferences.teamwork,
      working.teamwork,
      TEAM_LEVEL
    );

    if (team !== null) checks.push(team);

    const routine = levelSimilarity(
      preferences.routine,
      working.routine,
      ROUTINE_LEVEL
    );

    if (routine !== null) checks.push(routine);

    return checks.length
      ? checks.reduce((sum, value) => sum + value, 0) / checks.length
      : null;
  }

  const VALUE_SYNONYMS = {
    technik: ["technik", "qualitaet", "entwicklung"],
    qualitaet: ["qualitaet", "sicherheit", "verantwortung"],
    entwicklung: ["entwicklung", "abwechslung"],
    teamwork: ["teamwork", "team"],
    team: ["teamwork", "team"],
    kreativitaet: ["kreativitaet", "kreativ"],
    natur: ["natur", "nachhaltigkeit"],
    nachhaltigkeit: ["nachhaltigkeit", "natur"],
    helfen: ["helfen", "menschen"],
    verantwortung: ["verantwortung", "selbststaendigkeit"],
    selbststaendigkeit: ["selbststaendigkeit", "verantwortung"],
    sicherheit: ["sicherheit", "struktur"],
    struktur: ["struktur", "sicherheit"],
    abwechslung: ["abwechslung", "entwicklung"],
    flexibilitaet: ["flexibilitaet", "entwicklung"],
    handwerk: ["handwerk", "technik"]
  };

  function valueSimilarity(selectedValues, career) {
    const values = unique(selectedValues);

    if (!values.length) return null;

    const careerValues = unique(career.valuesTags);

    if (!careerValues.length) return 50;

    const expanded = new Set();

    values.forEach((value) => {
      expanded.add(value);

      (VALUE_SYNONYMS[value] || []).forEach((synonym) => {
        expanded.add(synonym);
      });
    });

    const matches = careerValues.filter((value) =>
      expanded.has(value)
    ).length;

    return clamp(
      (matches / Math.max(careerValues.length, 1)) * 100,
      0,
      100
    );
  }

  function weightedTotal(parts) {
    let numerator = 0;
    let denominator = 0;

    Object.entries(WEIGHTS).forEach(([key, weight]) => {
      if (Number.isFinite(parts[key])) {
        numerator += parts[key] * weight;
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
          "In diesem Beruf sind Schicht- oder unregelmäßige Arbeitszeiten häufig."
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

    return notes;
  }

  function evaluate(answers, database, options) {
    const input = answers || {};

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

    const results = careers.map((career) => {
      const parts = {
        profile: profileSimilarity(
          profile,
          career.profile || {}
        ),

        interests: interestSimilarity(
          selectedInterests,
          career
        ),

        conditions: conditionSimilarity(
          preferences,
          career.workingConditions || {}
        ),

        values: valueSimilarity(
          selectedValues,
          career
        )
      };

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

        requestedByUser: desired.has(career.id),

        conflictNotes: makeConflictNotes(
          career,
          avoidances
        ),

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
        ? options.limit
        : 5;

    return {
      version: "1.0.0",

      disclaimer:
        "Die Vorschläge dienen der Orientierung. " +
        "Sie sind keine Eignungsdiagnose und sagen nicht voraus, " +
        "ob jemand einen Beruf erfolgreich ausüben wird.",

      completedProfileDimensions: DIMENSIONS.filter(
        (key) => profile[key] !== null
      ),

      results: results.slice(0, Math.max(1, limit)),

      requestedCareers: results.filter(
        (item) => item.requestedByUser
      )
    };
  }

  global.IndustryAICareerCheck = {
    evaluate,
    dimensions: DIMENSIONS.slice(),
    weights: Object.assign({}, WEIGHTS)
  };

})(window);
