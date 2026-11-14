
/*
 * INDUSTRYAI – Berufscheck
 * Auswertungslogik Version 2.0
 *
 * Die Ergebnisse dienen der Berufsorientierung,
 * nicht der wissenschaftlichen Eignungsdiagnostik.
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

  // Synonyme gleichen unterschiedliche Begriffe
  // zwischen Quiz und Berufedatenbank an.
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
    tiere: ["tiere"],
    natur: ["natur", "umwelt", "landwirtschaft"],
    pflanzen: ["pflanzen", "natur", "umwelt"],
    helfen: ["helfen", "gesundheit", "menschen"],
    menschen: ["menschen", "helfen"],
    gesundheit: ["gesundheit", "medizin"],
    medizin: ["medizin", "gesundheit"],
    organisation: ["organisation", "planung", "logistik"],
    planung: ["planung", "organisation"],
    probleme_loesen: ["probleme_loesen", "logik", "technik"],
    logik: ["logik", "probleme_loesen"],
    handwerk: ["handwerk", "fertigung", "technik"],
    lernen: ["lernen", "entwicklung"],
    entwicklung: ["entwicklung", "lernen"],
    kommunikation: ["kommunikation", "menschen"],
    veranstaltungen: ["veranstaltungen", "team"],
    bewegung: ["bewegung", "sport"],
    forschung: ["forschung", "logik", "technik"]
  };

  const VALUE_ALIASES = {
    technik: ["technik"],
    qualitaet: ["qualitaet"],
    entwicklung: ["entwicklung"],
    teamwork: ["teamwork"],
    team: ["teamwork"],
    kreativitaet: ["kreativitaet"],
    natur: ["natur"],
    nachhaltigkeit: ["nachhaltigkeit"],
    helfen: ["helfen"],
    verantwortung: ["verantwortung"],
    selbststaendigkeit: ["selbststaendigkeit"],
    sicherheit: ["sicherheit"],
    struktur: ["struktur"],
    abwechslung: ["abwechslung"],
    flexibilitaet: ["flexibilitaet"],
    handwerk: ["handwerk"],
    tiere: ["tiere"]
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function unique(values) {
    return [...new Set(
      asArray(values).filter(
        value => value !== null && value !== undefined && value !== ""
      )
    )];
  }

  function normalizedProfile(profile) {
    const result = {};

    DIMENSIONS.forEach(key => {
      const rawValue = profile ? profile[key] : null;

      if (
        rawValue === null ||
        rawValue === undefined ||
        rawValue === ""
      ) {
        result[key] = null;
        return;
      }

      const numericValue = Number(rawValue);

      result[key] = Number.isFinite(numericValue)
        ? clamp(numericValue, 0, 100)
        : null;
    });

    return result;
  }

  // Vergleicht das persönliche Profil mit dem Berufsprofil.
  // Die Berufsdatenbank verwendet Werte von 0 bis 4.
  function profileSimilarity(userProfile, careerProfile) {
    let difference = 0;
    let used = 0;

    DIMENSIONS.forEach(key => {
      const userValue = userProfile[key];
      const careerValue = careerProfile
        ? careerProfile[key]
        : null;

      if (
        userValue === null ||
        careerValue === null ||
        careerValue === undefined ||
        careerValue === ""
      ) {
        return;
      }

      const numericCareerValue = Number(careerValue);

      if (!Number.isFinite(numericCareerValue)) return;

      const normalizedCareerValue =
        clamp(numericCareerValue, 0, 4) * 25;

      difference += Math.abs(userValue - normalizedCareerValue);
      used++;
    });

    return used > 0
      ? clamp(100 - difference / used, 0, 100)
      : null;
  }

  function expandTags(tags, aliases) {
    const expanded = new Set();

    unique(tags).forEach(tag => {
      expanded.add(tag);

      (aliases[tag] || []).forEach(alias => {
        expanded.add(alias);
      });
    });

    return expanded;
  }

  // Vergleicht direkt die ausgewählten Interessen
  // mit den Interessen-Tags eines Berufs.
  function interestSimilarity(selectedTags, career) {
    const userTags = expandTags(selectedTags, TAG_ALIASES);
    const careerTags = new Set(unique(career.interestTags));

    if (!userTags.size) return null;
    if (!careerTags.size) return null;

    let matches = 0;

    userTags.forEach(tag => {
      if (careerTags.has(tag)) matches++;
    });

    return clamp((matches / userTags.size) * 100, 0, 100);
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

  function normalizeLocation(value) {
    const location = String(value).trim().toLowerCase();

    const aliases = {
      "werkstatt": ["werkstatt", "produktion", "baustelle"],
      "büro": ["büro", "rechenzentrum", "homeoffice"],
      "im freien": ["im freien", "stall", "betriebshof", "gewächshaus"],
      "labor": ["labor", "tierarztpraxis", "tierklinik"],
      "kundenbereich": ["kundenbereich", "verkaufsfläche"],
      "beim kunden": ["beim kunden", "kundenstandorte"],
      "küche": ["küche", "gastronomie", "gemeinschaftsverpflegung"]
    };

    return aliases[location] || [location];
  }

  function locationSimilarity(userLocations, careerLocations) {
    const user = unique(userLocations);
    const career = unique(careerLocations).map(value =>
      String(value).trim().toLowerCase()
    );

    if (!user.length) return null;
    if (!career.length) return null;

    let matches = 0;

    user.forEach(value => {
      const possibleMatches = normalizeLocation(value);

      if (possibleMatches.some(item => career.includes(item))) {
        matches++;
      }
    });

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

  function valueSimilarity(selectedValues, career) {
    const values = unique(selectedValues);

    if (!values.length) return null;

    const careerValues = unique(career.valuesTags);

    if (!careerValues.length) return null;

    const expanded = expandTags(values, VALUE_ALIASES);

    let matches = 0;

    expanded.forEach(value => {
      if (careerValues.includes(value)) matches++;
    });

    return clamp(
      (matches / expanded.size) * 100,
      0,
      100
    );
  }

  // Fehlende Angaben werden nicht als null Prozent gewertet.
  // Die übrigen verfügbaren Bereiche behalten ihre Gewichtung
  // und werden auf 100 Prozent hochgerechnet.
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

    return denominator > 0
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

    if (
      avoid.has("viel_bildschirm") &&
      (work.locations || []).some(location =>
        ["büro", "rechenzentrum", "studio", "homeoffice"].includes(
          String(location).toLowerCase()
        )
      )
    ) {
      notes.push(
        "In diesem Beruf kann ein großer Teil der Arbeit am Bildschirm stattfinden."
      );
    }

    if (
      avoid.has("routine") &&
      work.routine === "high"
    ) {
      notes.push(
        "In diesem Beruf gibt es regelmäßig wiederkehrende Arbeitsabläufe."
      );
    }

    if (
      avoid.has("wechsel") &&
      work.routine === "low"
    ) {
      notes.push(
        "Der Arbeitsalltag kann häufig wechselnde Aufgaben und Situationen enthalten."
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

    const results = careers.map(career => {
      const working = career.workingConditions || {};

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
          working
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
        ? Math.max(1, options.limit)
        : 5;

    return {
      version: "2.0.0",

      disclaimer:
        "Die Vorschläge dienen der Berufsorientierung. " +
        "Sie sind keine Eignungsdiagnose und sagen nicht voraus, " +
        "ob jemand einen Beruf erfolgreich ausüben wird.",

      completedProfileDimensions: DIMENSIONS.filter(
        key => profile[key] !== null
      ),

      selfAssessment: input.selfAssessment || null,

      results: results.slice(0, limit),

      requestedCareers: results.filter(
        item => item.requestedByUser
      )
    };
  }

  global.IndustryAICareerCheck = {
    evaluate,
    dimensions: DIMENSIONS.slice(),
    weights: Object.assign({}, WEIGHTS)
  };

})(window);
