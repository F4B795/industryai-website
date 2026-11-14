
/*
 * INDUSTRYAI – Berufedatenbank Erweiterung
 * Campus-Welt 04: Gastronomie & Lebensmittel
 *
 * Wird nach berufe.js geladen.
 * Ergänzt zusätzliche Ausbildungsberufe.
 */

(function () {
  if (
    !window.IndustryAICareers ||
    !Array.isArray(window.IndustryAICareers.careers)
  ) {
    console.error(
      "INDUSTRYAI: Berufedatenbank wurde nicht gefunden."
    );
    return;
  }

  const careers = window.IndustryAICareers.careers;

  const additionalCareers = [
    {
      id: "baecker",
      name: "Bäcker/in",
      category: "Gastronomie, Logistik & Verkehr",
      training: { type: "dual", durationMonths: 36 },
      profile: {
        T: 4, A: 2, S: 1, K: 1, C: 3,
        O: 3, N: 1, B: 3, L: 3
      },
      workingConditions: {
        locations: ["Backstube", "Bäckerei", "Produktion"],
        physicalActivity: "high",
        peopleContact: "low",
        teamwork: "high",
        routine: "mixed",
        shiftWork: "common",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Brot, Brötchen und Backwaren herstellen",
        "Teige vorbereiten und verarbeiten",
        "Backöfen und Maschinen bedienen",
        "Backprozesse überwachen und Qualität prüfen"
      ],
      dayToDay:
        "Du bereitest Teige vor, formst Backwaren und überwachst die Herstellung in der Backstube.",
      interestTags: [
        "backen", "lebensmittel", "handwerk",
        "produktion", "zutaten", "kreativ"
      ],
      valuesTags: [
        "handwerk", "qualitaet", "struktur", "kreativitaet"
      ]
    },
    {
      id: "konditor",
      name: "Konditor/in",
      category: "Gastronomie, Logistik & Verkehr",
      training: { type: "dual", durationMonths: 36 },
      profile: {
        T: 3, A: 2, S: 2, K: 2, C: 4,
        O: 3, N: 1, B: 3, L: 3
      },
      workingConditions: {
        locations: ["Konditorei", "Backstube", "Café"],
        physicalActivity: "medium",
        peopleContact: "medium",
        teamwork: "high",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "very_high",
        responsibility: "high"
      },
      activities: [
        "Torten, Kuchen und Desserts herstellen",
        "Cremes, Füllungen und Teige zubereiten",
        "Backwaren dekorieren und gestalten",
        "Zutaten und Herstellungsprozesse kontrollieren"
      ],
      dayToDay:
        "Du stellst süße Spezialitäten her und gestaltest Torten, Desserts und feine Backwaren.",
      interestTags: [
        "backen", "dessert", "lebensmittel",
        "gestaltung", "kreativ", "handwerk"
      ],
      valuesTags: [
        "kreativitaet", "handwerk", "qualitaet", "entwicklung"
      ]
    },
    {
      id: "fachverkaeufer-lebensmittelhandwerk",
      name: "Fachverkäufer/in im Lebensmittelhandwerk",
      category: "Gastronomie, Logistik & Verkehr",
      training: { type: "dual", durationMonths: 36 },
      profile: {
        T: 2, A: 2, S: 4, K: 4, C: 2,
        O: 3, N: 1, B: 3, L: 3
      },
      workingConditions: {
        locations: ["Verkaufsraum", "Bäckerei", "Metzgerei", "Fachgeschäft"],
        physicalActivity: "medium",
        peopleContact: "very_high",
        teamwork: "high",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Kunden zu Lebensmitteln beraten",
        "Backwaren, Fleisch- oder Konditoreiprodukte präsentieren",
        "Waren verkaufen und Bestellungen bearbeiten",
        "Lebensmittel fachgerecht lagern und Hygiene beachten"
      ],
      dayToDay:
        "Du berätst Kunden, präsentierst Lebensmittel und sorgst für einen ansprechenden Verkaufsbereich.",
      interestTags: [
        "menschen", "verkauf", "lebensmittel",
        "beratung", "kommunikation", "service"
      ],
      valuesTags: [
        "teamwork", "kommunikation", "verantwortung", "abwechslung"
      ]
    },
    {
      id: "fachmann-restaurants-veranstaltungsgastronomie",
      name: "Fachmann/-frau für Restaurants und Veranstaltungsgastronomie",
      category: "Gastronomie, Logistik & Verkehr",
      training: { type: "dual", durationMonths: 36 },
      profile: {
        T: 1, A: 2, S: 4, K: 4, C: 3,
        O: 4, N: 0, B: 4, L: 3
      },
      workingConditions: {
        locations: ["Restaurant", "Hotel", "Veranstaltungsort"],
        physicalActivity: "high",
        peopleContact: "very_high",
        teamwork: "very_high",
        routine: "mixed",
        shiftWork: "common",
        timePressure: "high",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Gäste empfangen und beraten",
        "Speisen und Getränke servieren",
        "Veranstaltungen und Serviceabläufe planen",
        "Bestellungen aufnehmen und Abrechnungen durchführen"
      ],
      dayToDay:
        "Du betreust Gäste, organisierst Serviceabläufe und begleitest Veranstaltungen in der Gastronomie.",
      interestTags: [
        "gastronomie", "menschen", "service",
        "kommunikation", "organisation", "veranstaltungen"
      ],
      valuesTags: [
        "teamwork", "kommunikation", "abwechslung", "verantwortung"
      ]
    }
  ];

  const existingIds = new Set(
    careers.map(function (career) {
      return career.id;
    })
  );

  additionalCareers.forEach(function (career) {
    if (!existingIds.has(career.id)) {
      careers.push(career);
      existingIds.add(career.id);
    }
  });

  window.IndustryAICareers.version = "2.1.0";

  console.log(
    "INDUSTRYAI: Gastronomie-Berufe ergänzt.",
    additionalCareers.length
  );
})();
