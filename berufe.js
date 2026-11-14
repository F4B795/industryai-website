
/*
 * INDUSTRYAI – Berufedatenbank
 * Version 2.0
 *
 * Profile: Orientierungswerte von 0 bis 4.
 * Sie beschreiben typische Tätigkeitsanforderungen,
 * nicht die persönliche Eignung eines Menschen.
 */

window.IndustryAICareers = {
  version: "2.0.0",

  careers: [

    // ================================================
    // TECHNIK, INDUSTRIE UND HANDWERK
    // ================================================

    {
      id: "zerspanungsmechaniker",
      name: "Zerspanungsmechaniker/in",
      category: "Technik, Industrie & Handwerk",
      training: { type: "dual", durationMonths: 42 },
      profile: { T:4, A:4, S:1, K:2, C:2, O:3, N:0, B:3, L:3 },
      workingConditions: {
        locations: ["Werkstatt", "Produktion"],
        physicalActivity: "medium",
        peopleContact: "low",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "CNC-Dreh-, Fräs- oder Schleifmaschinen einrichten und bedienen",
        "Werkstücke nach technischen Zeichnungen fertigen",
        "Maße und Oberflächenqualität prüfen",
        "Fertigungsprozesse optimieren"
      ],
      dayToDay: "Einrichten, Fertigen, Messen und Optimieren wechseln sich ab.",
      interestTags: ["maschinen", "technik", "fertigung", "praezision", "metall"],
      valuesTags: ["technik", "qualitaet", "entwicklung"]
    },

    {
      id: "industriemechaniker",
      name: "Industriemechaniker/in",
      category: "Technik, Industrie & Handwerk",
      training: { type: "dual", durationMonths: 42 },
      profile: { T:4, A:3, S:2, K:2, C:2, O:3, N:0, B:3, L:3 },
      workingConditions: {
        locations: ["Werkstatt", "Produktion", "beim Kunden"],
        physicalActivity: "medium",
        peopleContact: "medium",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Maschinen und Produktionsanlagen montieren",
        "Bauteile herstellen und Baugruppen zusammenbauen",
        "Anlagen warten und Störungen beheben",
        "Funktionen prüfen und dokumentieren"
      ],
      dayToDay: "Du montierst, wartest und reparierst Maschinen oder Anlagen.",
      interestTags: ["maschinen", "technik", "reparieren", "metall", "probleme_loesen"],
      valuesTags: ["technik", "abwechslung", "verantwortung"]
    },

    {
      id: "mechatroniker",
      name: "Mechatroniker/in",
      category: "Technik, Industrie & Handwerk",
      training: { type: "dual", durationMonths: 42 },
      profile: { T:4, A:4, S:2, K:2, C:2, O:3, N:0, B:3, L:4 },
      workingConditions: {
        locations: ["Werkstatt", "Produktion", "beim Kunden"],
        physicalActivity: "medium",
        peopleContact: "medium",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Mechanische, elektrische und elektronische Komponenten verbinden",
        "Steuerungen und Anlagen installieren",
        "Systeme programmieren und testen",
        "Fehler suchen und Anlagen instand halten"
      ],
      dayToDay: "Du arbeitest an Systemen, in denen Mechanik und Elektronik zusammenspielen.",
      interestTags: ["maschinen", "elektronik", "technik", "programmieren", "probleme_loesen"],
      valuesTags: ["technik", "entwicklung", "abwechslung"]
    },

    {
      id: "elektroniker-automatisierung",
      name: "Elektroniker/in für Automatisierungstechnik",
      category: "Technik, Industrie & Handwerk",
      training: { type: "dual", durationMonths: 42 },
      profile: { T:4, A:4, S:2, K:2, C:2, O:3, N:0, B:3, L:4 },
      workingConditions: {
        locations: ["Produktion", "Werkstatt", "beim Kunden"],
        physicalActivity: "medium",
        peopleContact: "medium",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Automatisierte Anlagen installieren und konfigurieren",
        "Steuerungsprogramme erstellen und anpassen",
        "Sensoren und Aktoren prüfen",
        "Störungen analysieren und beheben"
      ],
      dayToDay: "Du bringst Maschinen und Anlagen dazu, automatisierte Abläufe auszuführen.",
      interestTags: ["elektronik", "automatisierung", "programmieren", "maschinen", "technik"],
      valuesTags: ["technik", "entwicklung", "verantwortung"]
    },

    {
      id: "kfz-mechatroniker",
      name: "Kfz-Mechatroniker/in",
      category: "Technik, Industrie & Handwerk",
      training: { type: "dual", durationMonths: 42 },
      profile: { T:4, A:3, S:2, K:2, C:2, O:2, N:0, B:3, L:3 },
      workingConditions: {
        locations: ["Werkstatt", "Kundenbereich"],
        physicalActivity: "medium",
        peopleContact: "medium",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "rare",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Fahrzeuge warten und reparieren",
        "Elektronische Fahrzeugsysteme diagnostizieren",
        "Bauteile austauschen und einstellen",
        "Fahrzeuge prüfen und Kunden informieren"
      ],
      dayToDay: "Du untersuchst Fahrzeuge, findest Fehler und führst Reparaturen aus.",
      interestTags: ["fahrzeuge", "technik", "elektronik", "reparieren", "probleme_loesen"],
      valuesTags: ["technik", "abwechslung", "handwerk"]
    },

    {
      id: "anlagenmechaniker-shk",
      name: "Anlagenmechaniker/in für Sanitär-, Heizungs- und Klimatechnik",
      category: "Technik, Industrie & Handwerk",
      training: { type: "dual", durationMonths: 42 },
      profile: { T:4, A:3, S:3, K:3, C:2, O:3, N:1, B:4, L:3 },
      workingConditions: {
        locations: ["beim Kunden", "Baustelle", "Werkstatt"],
        physicalActivity: "high",
        peopleContact: "high",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "rare",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Heizungs-, Sanitär- und Klimaanlagen installieren",
        "Rohrleitungen und Bauteile montieren",
        "Anlagen warten und reparieren",
        "Kunden beraten"
      ],
      dayToDay: "Du installierst, wartest oder reparierst technische Gebäudesysteme.",
      interestTags: ["technik", "handwerk", "energie", "klima", "reparieren"],
      valuesTags: ["nachhaltigkeit", "abwechslung", "selbststaendigkeit"]
    },

    {
      id: "tischler",
      name: "Tischler/in",
      category: "Technik, Industrie & Handwerk",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:4, A:2, S:2, K:2, C:4, O:2, N:1, B:3, L:3 },
      workingConditions: {
        locations: ["Werkstatt", "beim Kunden", "Baustelle"],
        physicalActivity: "medium",
        peopleContact: "medium",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "rare",
        timePressure: "variable",
        precision: "high",
        responsibility: "medium"
      },
      activities: [
        "Möbel und Innenausbauten planen und herstellen",
        "Holz und Werkstoffe bearbeiten",
        "Maschinen und Handwerkzeuge einsetzen",
        "Montagearbeiten durchführen"
      ],
      dayToDay: "Du verbindest handwerkliche Arbeit mit Gestaltung und Montage.",
      interestTags: ["holz", "gestaltung", "handwerk", "maschinen", "kreativ"],
      valuesTags: ["kreativitaet", "handwerk", "selbststaendigkeit"]
    },

    {
      id: "fachkraft-metalltechnik-zerspanung",
      name: "Fachkraft für Metalltechnik – Fachrichtung Zerspanungstechnik",
      category: "Technik, Industrie & Handwerk",
      training: { type: "dual", durationMonths: 24 },
      profile: { T:4, A:3, S:1, K:1, C:1, O:2, N:0, B:3, L:2 },
      workingConditions: {
        locations: ["Produktion", "Werkstatt"],
        physicalActivity: "medium",
        peopleContact: "low",
        teamwork: "mixed",
        routine: "high",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "medium"
      },
      activities: [
        "Metallteile spanend bearbeiten",
        "Maschinen und Werkzeuge vorbereiten",
        "Werkstücke nach Vorgaben fertigen",
        "Maße und Qualität kontrollieren"
      ],
      dayToDay: "Du bearbeitest Metall an Maschinen und stellst Werkstücke her.",
      interestTags: ["metall", "maschinen", "fertigung", "praezision", "handwerk"],
      valuesTags: ["handwerk", "technik", "sicherheit"]
    },

    {
      id: "elektroniker-betriebstechnik",
      name: "Elektroniker/in für Betriebstechnik",
      category: "Technik, Industrie & Handwerk",
      training: { type: "dual", durationMonths: 42 },
      profile: { T:4, A:4, S:2, K:2, C:2, O:3, N:0, B:3, L:4 },
      workingConditions: {
        locations: ["Produktion", "Werkstatt", "beim Kunden"],
        physicalActivity: "medium",
        peopleContact: "medium",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Elektrische Anlagen installieren und warten",
        "Schaltanlagen und Steuerungen prüfen",
        "Fehler in elektrischen Systemen suchen",
        "Anlagen in Betrieb nehmen"
      ],
      dayToDay: "Du sorgst dafür, dass elektrische Anlagen und Systeme zuverlässig funktionieren.",
      interestTags: ["elektronik", "technik", "strom", "reparieren", "maschinen"],
      valuesTags: ["technik", "verantwortung", "sicherheit"]
    },

    // ================================================
    // IT UND DIGITALISIERUNG
    // ================================================

    {
      id: "fachinformatiker-anwendungsentwicklung",
      name: "Fachinformatiker/in – Anwendungsentwicklung",
      category: "IT, Technik & Digitalisierung",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:2, A:4, S:2, K:3, C:4, O:3, N:0, B:2, L:4 },
      workingConditions: {
        locations: ["Büro", "Homeoffice", "beim Kunden"],
        physicalActivity: "low",
        peopleContact: "medium",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "rare",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Software und Anwendungen entwickeln",
        "Code testen und Fehler beheben",
        "Anforderungen mit Nutzern klären",
        "Programme weiterentwickeln"
      ],
      dayToDay: "Du planst, programmierst und testest Software am Computer.",
      interestTags: ["software", "programmieren", "digital", "logik", "kreativ"],
      valuesTags: ["entwicklung", "flexibilitaet", "kreativitaet"]
    },

    {
      id: "fachinformatiker-systemintegration",
      name: "Fachinformatiker/in – Systemintegration",
      category: "IT, Technik & Digitalisierung",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:3, A:4, S:3, K:4, C:2, O:4, N:0, B:3, L:4 },
      workingConditions: {
        locations: ["Büro", "Rechenzentrum", "beim Kunden"],
        physicalActivity: "low",
        peopleContact: "high",
        teamwork: "high",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "IT-Systeme und Netzwerke einrichten",
        "Hardware und Software betreuen",
        "Störungen analysieren und beheben",
        "Nutzer beraten"
      ],
      dayToDay: "Du sorgst dafür, dass Computer, Netzwerke und IT-Dienste funktionieren.",
      interestTags: ["computer", "netzwerke", "digital", "technik", "probleme_loesen"],
      valuesTags: ["technik", "verantwortung", "teamwork"]
    },

    // ================================================
    // MEDIEN, GESTALTUNG UND KREATIVITÄT
    // ================================================

    {
      id: "mediengestalter",
      name: "Mediengestalter/in Digital und Print",
      category: "Medien, Gestaltung & Kreativität",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:1, A:2, S:2, K:3, C:4, O:3, N:0, B:2, L:4 },
      workingConditions: {
        locations: ["Büro", "Studio", "Homeoffice"],
        physicalActivity: "low",
        peopleContact: "medium",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "rare",
        timePressure: "variable",
        precision: "high",
        responsibility: "medium"
      },
      activities: [
        "Layouts und visuelle Medien gestalten",
        "Bilder und Grafiken bearbeiten",
        "Druck- und Digitaldaten vorbereiten",
        "Gestaltung mit Kunden und Teams abstimmen"
      ],
      dayToDay: "Du entwickelst visuelle Inhalte für Print und digitale Medien.",
      interestTags: ["design", "grafik", "medien", "kreativ", "computer"],
      valuesTags: ["kreativitaet", "entwicklung", "abwechslung"]
    },

    {
      id: "fotograf",
      name: "Fotograf/in",
      category: "Medien, Gestaltung & Kreativität",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:2, A:2, S:3, K:3, C:4, O:2, N:1, B:2, L:3 },
      workingConditions: {
        locations: ["Studio", "im Freien", "beim Kunden"],
        physicalActivity: "medium",
        peopleContact: "high",
        teamwork: "mixed",
        routine: "low",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "medium"
      },
      activities: [
        "Fotoshootings planen und durchführen",
        "Licht, Perspektive und Bildgestaltung einsetzen",
        "Bilder auswählen und bearbeiten",
        "Kundenwünsche abstimmen"
      ],
      dayToDay: "Du planst Aufnahmen, fotografierst und bearbeitest Bilder digital.",
      interestTags: ["fotografie", "design", "kreativ", "medien", "menschen"],
      valuesTags: ["kreativitaet", "selbststaendigkeit", "abwechslung"]
    },

    {
      id: "gestalter-visuelles-marketing",
      name: "Gestalter/in für visuelles Marketing",
      category: "Medien, Gestaltung & Kreativität",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:3, A:1, S:3, K:3, C:4, O:4, N:1, B:3, L:3 },
      workingConditions: {
        locations: ["Verkaufsfläche", "Werkstatt", "Büro"],
        physicalActivity: "medium",
        peopleContact: "high",
        teamwork: "high",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "medium"
      },
      activities: [
        "Schaufenster und Verkaufsräume gestalten",
        "Dekorationen und Präsentationsflächen planen",
        "Materialien und Gestaltungselemente einsetzen",
        "Werbeaktionen visuell umsetzen"
      ],
      dayToDay: "Du gestaltest Verkaufsflächen und machst Produkte visuell erlebbar.",
      interestTags: ["design", "dekoration", "marketing", "kreativ", "handel"],
      valuesTags: ["kreativitaet", "abwechslung", "teamwork"]
    },

    // ================================================
    // NATUR, UMWELT UND TIERE
    // ================================================

    {
      id: "landwirt",
      name: "Landwirt/in",
      category: "Natur, Umwelt & Tiere",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:4, A:3, S:1, K:1, C:1, O:3, N:4, B:3, L:3 },
      workingConditions: {
        locations: ["im Freien", "Stall", "Betriebshof"],
        physicalActivity: "high",
        peopleContact: "low",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "medium",
        responsibility: "high"
      },
      activities: [
        "Feldarbeiten und Pflanzenbau durchführen",
        "Tiere versorgen und Bestände betreuen",
        "Landwirtschaftliche Maschinen bedienen",
        "Betriebliche Abläufe dokumentieren"
      ],
      dayToDay: "Du arbeitest mit Natur, Tieren und Technik. Die Aufgaben richten sich nach Jahreszeit und Betrieb.",
      interestTags: ["landwirtschaft", "natur", "tiere", "maschinen", "umwelt"],
      valuesTags: ["natur", "nachhaltigkeit", "selbststaendigkeit"]
    },

    {
      id: "gaertner",
      name: "Gärtner/in",
      category: "Natur, Umwelt & Tiere",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:4, A:2, S:2, K:2, C:3, O:2, N:4, B:3, L:3 },
      workingConditions: {
        locations: ["im Freien", "Gewächshaus", "Gartenbaubetrieb"],
        physicalActivity: "high",
        peopleContact: "medium",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "rare",
        timePressure: "variable",
        precision: "medium",
        responsibility: "medium"
      },
      activities: [
        "Pflanzen kultivieren und pflegen",
        "Grünflächen und Gärten gestalten",
        "Böden und Pflanzen beurteilen",
        "Maschinen und Werkzeuge einsetzen"
      ],
      dayToDay: "Du arbeitest mit Pflanzen und gestaltest oder pflegst Grünanlagen und Gärten.",
      interestTags: ["pflanzen", "natur", "umwelt", "gestaltung", "handwerk"],
      valuesTags: ["natur", "nachhaltigkeit", "abwechslung"]
    },

    {
      id: "tiermedizinische-fachangestellte",
      name: "Tiermedizinische/r Fachangestellte/r",
      category: "Natur, Umwelt & Tiere",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:2, A:3, S:4, K:4, C:1, O:4, N:3, B:3, L:3 },
      workingConditions: {
        locations: ["Tierarztpraxis", "Tierklinik"],
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
        "Tierärzte bei Untersuchungen unterstützen",
        "Tiere betreuen und vorbereiten",
        "Tierhalter informieren und Termine koordinieren",
        "Hygiene und Dokumentation übernehmen"
      ],
      dayToDay: "Du kümmerst dich um Tiere und ihre Halter und assistierst bei Behandlungen.",
      interestTags: ["tiere", "gesundheit", "helfen", "medizin", "organisation"],
      valuesTags: ["tiere", "helfen", "verantwortung"]
    },

    // ================================================
    // GASTRONOMIE, LOGISTIK UND VERKEHR
    // ================================================

    {
      id: "koch",
      name: "Koch/Köchin",
      category: "Gastronomie, Logistik & Verkehr",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:3, A:2, S:3, K:2, C:4, O:4, N:1, B:4, L:3 },
      workingConditions: {
        locations: ["Küche", "Gastronomie", "Gemeinschaftsverpflegung"],
        physicalActivity: "high",
        peopleContact: "medium",
        teamwork: "high",
        routine: "mixed",
        shiftWork: "common",
        timePressure: "high",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Speisen vorbereiten und zubereiten",
        "Menüs und Arbeitsabläufe planen",
        "Lebensmittel fachgerecht lagern",
        "Hygiene und Qualität sicherstellen"
      ],
      dayToDay: "Du arbeitest im Küchenteam und bereitest Speisen unter Zeitvorgaben zu.",
      interestTags: ["kochen", "lebensmittel", "kreativ", "gastronomie", "team"],
      valuesTags: ["kreativitaet", "teamwork", "abwechslung"]
    },

    {
      id: "fachkraft-lagerlogistik",
      name: "Fachkraft für Lagerlogistik",
      category: "Gastronomie, Logistik & Verkehr",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:3, A:3, S:2, K:2, C:1, O:4, N:1, B:3, L:3 },
      workingConditions: {
        locations: ["Lager", "Logistikzentrum", "Versand"],
        physicalActivity: "high",
        peopleContact: "medium",
        teamwork: "high",
        routine: "high",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Waren annehmen und kontrollieren",
        "Lagerbestände verwalten",
        "Waren kommissionieren und verpacken",
        "Versand organisieren"
      ],
      dayToDay: "Du sorgst dafür, dass Waren zur richtigen Zeit am richtigen Ort sind.",
      interestTags: ["logistik", "organisation", "waren", "planung", "technik"],
      valuesTags: ["struktur", "teamwork", "verantwortung"]
    },

    {
      id: "berufskraftfahrer",
      name: "Berufskraftfahrer/in",
      category: "Gastronomie, Logistik & Verkehr",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:3, A:2, S:2, K:2, C:0, O:3, N:1, B:4, L:2 },
      workingConditions: {
        locations: ["Fahrzeug", "unterwegs", "Kundenstandorte"],
        physicalActivity: "medium",
        peopleContact: "medium",
        teamwork: "low",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Fahrzeuge sicher führen",
        "Routen und Lieferungen planen",
        "Fahrzeuge kontrollieren und pflegen",
        "Ladung sichern und Lieferungen dokumentieren"
      ],
      dayToDay: "Du transportierst Güter oder Personen und bist viel unterwegs.",
      interestTags: ["fahren", "fahrzeuge", "logistik", "unterwegs", "technik"],
      valuesTags: ["selbststaendigkeit", "verantwortung", "abwechslung"]
    },

    {
      id: "fachkraft-veranstaltungstechnik",
      name: "Fachkraft für Veranstaltungstechnik",
      category: "Gastronomie, Logistik & Verkehr",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:4, A:4, S:3, K:3, C:3, O:3, N:0, B:4, L:4 },
      workingConditions: {
        locations: ["Veranstaltungsort", "Bühne", "Lager"],
        physicalActivity: "high",
        peopleContact: "high",
        teamwork: "high",
        routine: "low",
        shiftWork: "common",
        timePressure: "high",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Bühnen-, Licht-, Ton- und Videotechnik aufbauen",
        "Technische Abläufe planen und prüfen",
        "Veranstaltungen betreuen",
        "Sicherheitsvorgaben beachten"
      ],
      dayToDay: "Du sorgst dafür, dass technische Abläufe bei Veranstaltungen funktionieren.",
      interestTags: ["veranstaltungen", "technik", "musik", "licht", "ton", "team"],
      valuesTags: ["abwechslung", "teamwork", "technik"]
    },

    // ================================================
    // GESUNDHEIT UND SOZIALES
    // ================================================

    {
      id: "pflegefachfrau",
      name: "Pflegefachfrau/-mann",
      category: "Gesundheit & Soziales",
      training: { type: "school_based", durationMonths: 36 },
      profile: { T:2, A:3, S:4, K:4, C:1, O:4, N:1, B:4, L:4 },
      workingConditions: {
        locations: ["Krankenhaus", "Pflegeeinrichtung", "beim Kunden"],
        physicalActivity: "high",
        peopleContact: "very_high",
        teamwork: "high",
        routine: "mixed",
        shiftWork: "common",
        timePressure: "high",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Menschen pflegerisch versorgen und begleiten",
        "Gesundheitszustände beobachten und dokumentieren",
        "Bei medizinischen Maßnahmen unterstützen",
        "Mit Angehörigen und anderen Fachkräften zusammenarbeiten"
      ],
      dayToDay: "Du begleitest Menschen in unterschiedlichen Lebens- und Gesundheitssituationen.",
      interestTags: ["menschen", "helfen", "gesundheit", "medizin", "pflege"],
      valuesTags: ["helfen", "verantwortung", "teamwork"]
    },

    {
      id: "medizinische-fachangestellte",
      name: "Medizinische/r Fachangestellte/r",
      category: "Gesundheit & Soziales",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:2, A:3, S:4, K:4, C:1, O:4, N:1, B:3, L:3 },
      workingConditions: {
        locations: ["Arztpraxis", "Labor", "Klinik"],
        physicalActivity: "medium",
        peopleContact: "very_high",
        teamwork: "high",
        routine: "high",
        shiftWork: "rare",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Patienten empfangen und betreuen",
        "Termine und Praxisabläufe organisieren",
        "Bei Untersuchungen und Behandlungen assistieren",
        "Proben und medizinische Daten bearbeiten"
      ],
      dayToDay: "Du verbindest medizinische Assistenz mit Organisation und Patientenkontakt.",
      interestTags: ["menschen", "gesundheit", "medizin", "organisation", "helfen"],
      valuesTags: ["helfen", "sicherheit", "verantwortung"]
    },

    {
      id: "erzieher",
      name: "Erzieher/in",
      category: "Gesundheit & Soziales",
      training: { type: "school_based", durationMonths: 36 },
      profile: { T:1, A:2, S:4, K:4, C:4, O:3, N:2, B:4, L:4 },
      workingConditions: {
        locations: ["Kindergarten", "Schule", "Jugendeinrichtung"],
        physicalActivity: "medium",
        peopleContact: "very_high",
        teamwork: "high",
        routine: "mixed",
        shiftWork: "rare",
        timePressure: "variable",
        precision: "medium",
        responsibility: "high"
      },
      activities: [
        "Kinder und Jugendliche betreuen und fördern",
        "Spiel- und Lernangebote planen",
        "Entwicklung beobachten und dokumentieren",
        "Mit Eltern und Teams zusammenarbeiten"
      ],
      dayToDay: "Du begleitest junge Menschen in ihrer Entwicklung und gestaltest ihren Alltag.",
      interestTags: ["menschen", "helfen", "kinder", "kommunikation", "kreativ"],
      valuesTags: ["helfen", "verantwortung", "teamwork"]
    },

    // ================================================
    // WIRTSCHAFT, VERWALTUNG UND KAUFMÄNNISCHE BERUFE
    // ================================================

    {
      id: "industriekaufmann",
      name: "Industriekaufmann/-frau",
      category: "Wirtschaft & Verwaltung",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:1, A:4, S:3, K:4, C:2, O:4, N:0, B:2, L:3 },
      workingConditions: {
        locations: ["Büro", "Produktion"],
        physicalActivity: "low",
        peopleContact: "high",
        teamwork: "high",
        routine: "mixed",
        shiftWork: "rare",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Einkauf und Materialwirtschaft organisieren",
        "Angebote und Aufträge bearbeiten",
        "Produktions- und Vertriebsprozesse unterstützen",
        "Mit Kunden, Lieferanten und Abteilungen kommunizieren"
      ],
      dayToDay: "Du koordinierst kaufmännische Abläufe in einem Industrieunternehmen.",
      interestTags: ["wirtschaft", "organisation", "planung", "zahlen", "kommunikation"],
      valuesTags: ["struktur", "entwicklung", "teamwork"]
    },

    {
      id: "kaufmann-einzelhandel",
      name: "Kaufmann/-frau im Einzelhandel",
      category: "Wirtschaft & Verwaltung",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:1, A:2, S:4, K:4, C:2, O:3, N:0, B:3, L:3 },
      workingConditions: {
        locations: ["Verkaufsfläche", "Lager", "Büro"],
        physicalActivity: "medium",
        peopleContact: "very_high",
        teamwork: "high",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "medium",
        responsibility: "medium"
      },
      activities: [
        "Kunden beraten und Waren verkaufen",
        "Waren präsentieren und bestellen",
        "Kassenvorgänge durchführen",
        "Lagerbestände und Verkaufsflächen organisieren"
      ],
      dayToDay: "Du arbeitest im Verkauf und verbindest Beratung mit Warenwirtschaft.",
      interestTags: ["handel", "menschen", "beratung", "kommunikation", "organisation"],
      valuesTags: ["teamwork", "entwicklung", "abwechslung"]
    },

    {
      id: "steuerfachangestellter",
      name: "Steuerfachangestellte/r",
      category: "Wirtschaft & Verwaltung",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:0, A:4, S:2, K:3, C:1, O:4, N:0, B:2, L:4 },
      workingConditions: {
        locations: ["Büro", "Homeoffice"],
        physicalActivity: "low",
        peopleContact: "medium",
        teamwork: "mixed",
        routine: "high",
        shiftWork: "rare",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Buchführungen und Steuererklärungen bearbeiten",
        "Belege und Geschäftsvorgänge prüfen",
        "Lohn- und Gehaltsabrechnungen vorbereiten",
        "Mandanten und Behörden kontaktieren"
      ],
      dayToDay: "Du arbeitest mit Zahlen, Dokumenten und steuerlichen Vorgängen.",
      interestTags: ["zahlen", "wirtschaft", "organisation", "logik", "buero"],
      valuesTags: ["struktur", "sicherheit", "verantwortung"]
    },

    // ================================================
    // BAU, PLANUNG UND TECHNISCHE ZEICHNUNG
    // ================================================

    {
      id: "bauzeichner",
      name: "Bauzeichner/in",
      category: "Bau, Planung & Technik",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:2, A:4, S:2, K:2, C:3, O:4, N:1, B:2, L:3 },
      workingConditions: {
        locations: ["Büro", "Baustelle"],
        physicalActivity: "low",
        peopleContact: "medium",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "rare",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Technische Bauzeichnungen erstellen",
        "CAD-Programme verwenden",
        "Maße und technische Vorgaben berücksichtigen",
        "Planungsunterlagen überarbeiten"
      ],
      dayToDay: "Du setzt Bau- und Planungsideen in technische Zeichnungen um.",
      interestTags: ["planung", "technik", "gestaltung", "computer", "praezision"],
      valuesTags: ["struktur", "technik", "entwicklung"]
    },

    // ================================================
    // NATURWISSENSCHAFT UND LABOR
    // ================================================

    {
      id: "chemielaborant",
      name: "Chemielaborant/in",
      category: "Naturwissenschaft & Labor",
      training: { type: "dual", durationMonths: 42 },
      profile: { T:3, A:4, S:2, K:2, C:2, O:4, N:2, B:2, L:4 },
      workingConditions: {
        locations: ["Labor", "Produktion"],
        physicalActivity: "low",
        peopleContact: "medium",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "possible",
        timePressure: "variable",
        precision: "high",
        responsibility: "high"
      },
      activities: [
        "Chemische Versuche und Analysen durchführen",
        "Proben vorbereiten und untersuchen",
        "Messwerte dokumentieren und auswerten",
        "Laborgeräte bedienen und pflegen"
      ],
      dayToDay: "Du untersuchst Stoffe und Materialien und arbeitest mit Messgeräten und Laborverfahren.",
      interestTags: ["forschung", "chemie", "logik", "analyse", "technik"],
      valuesTags: ["qualitaet", "entwicklung", "verantwortung"]
    },

    // ================================================
    // KÖRPERNAHE DIENSTLEISTUNGEN
    // ================================================

    {
      id: "friseur",
      name: "Friseur/in",
      category: "Dienstleistung & Gestaltung",
      training: { type: "dual", durationMonths: 36 },
      profile: { T:2, A:1, S:4, K:4, C:4, O:2, N:0, B:3, L:3 },
      workingConditions: {
        locations: ["Salon", "Kundenbereich"],
        physicalActivity: "medium",
        peopleContact: "very_high",
        teamwork: "mixed",
        routine: "mixed",
        shiftWork: "rare",
        timePressure: "variable",
        precision: "high",
        responsibility: "medium"
      },
      activities: [
        "Haare schneiden, färben und stylen",
        "Kunden beraten",
        "Frisuren und Looks gestalten",
        "Arbeitsmaterialien und Salonabläufe organisieren"
      ],
      dayToDay: "Du verbindest handwerkliche Präzision, Gestaltung und persönlichen Kundenkontakt.",
      interestTags: ["gestaltung", "kreativ", "menschen", "beratung", "handwerk"],
      valuesTags: ["kreativitaet", "teamwork", "selbststaendigkeit"]
    }

  ]
};
