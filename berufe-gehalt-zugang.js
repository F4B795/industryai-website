/*
 * INDUSTRYAI – Zugang und Gehaltsorientierung
 * Datenstand: November 2026; Gehaltswerte: Entgeltatlas-Datenstand 2025.
 * Alle Beträge brutto/Monat bei Vollzeit. Keine individuellen Gehaltszusagen.
 */
(function () {
  "use strict";
  window.IndustryAICompensation = {
    accessNote: "Bei dualen betrieblichen Ausbildungen ist rechtlich grundsätzlich kein bestimmter Schulabschluss vorgeschrieben. Ausbildungsbetriebe legen ihre Auswahlkriterien fest. Bei schulischen Ausbildungen können formale Zugangsvoraussetzungen gelten. Prüfe deshalb immer die konkrete Ausbildungsstelle und die Angaben im BERUFENET.",
    salaryNote: "Der Einstieg nach der Ausbildung liegt häufig unter dem Median aller beschäftigten Fachkräfte. Die Bundesagentur für Arbeit veröffentlicht im Entgeltatlas vor allem Medianwerte für sozialversicherungspflichtige Vollzeitbeschäftigte, keine einheitlichen Einstiegsgehälter. Die Spanne zwischen unterem und oberem Quartil zeigt die Verteilung, nicht eine garantierte Gehaltsspanne.",
    trainingSource: "https://www.bibb.de/de/12209.php",
    trainingSourceLabel: "BIBB – Tarifliche Ausbildungsvergütungen 2025",
    salarySource: "https://web.arbeitsagentur.de/entgeltatlas/",
    salarySourceLabel: "Bundesagentur für Arbeit – Entgeltatlas",
    careers: {
      "zerspanungsmechaniker": { median: 4195, q1: 3509, q3: 4952, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/29054", note: "Berufsgattung spanende Metallbearbeitung; umfasst u. a. CNC-Drehen und CNC-Fräsen." },
      "industriemechaniker": { training: 1318, median: 4573, q1: 3880, q3: 5384, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/2311" },
      "mechatroniker": { median: 4105, q1: 3407, q3: 4922, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/2862" },
      "elektroniker-automatisierung": { median: 4548, q1: 3702, q3: 5533, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/15630" },
      "kfz-mechatroniker": { training: 1174, region: "Deutschland", trainingSource: "https://www.bibb.de/dienst/publikationen/download/20846" },
      "anlagenmechaniker-shk": { training: 1021, region: "Deutschland", trainingSource: "https://www.bibb.de/dienst/publikationen/download/20846" },
      "tischler": { training: 981, median: 3355, q1: 2892, q3: 3857, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/4483", trainingSource: "https://www.bibb.de/dienst/publikationen/download/20846" },
      "fachkraft-metalltechnik-zerspanung": {},
      "elektroniker-betriebstechnik": { training: 1335, median: 4767, q1: 4026, q3: 5528, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/15624", trainingSource: "https://www.bibb.de/dienst/publikationen/download/20846" },
      "pflegefachfrau": { median: 4587, q1: 4111, q3: 5116, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/132173" },
      "medizinische-fachangestellte": { training: 1217, median: 3329, q1: 2824, q3: 3868, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/33213", trainingSource: "https://www.bibb.de/dienst/publikationen/download/20846", trainingNote: "Der BIBB-Bericht nennt rund 1.217 € als Durchschnitt; die Zahl ist aus der dort beschriebenen Erhöhung abgeleitet und daher nur als Näherungswert zu verstehen." },
      "tiermedizinische-fachangestellte": { training: 1014, region: "Deutschland", trainingSource: "https://www.bibb.de/dienst/publikationen/download/20846" },
      "erzieher": { median: 4314, q1: null, q3: null, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/9162" },
      "fachinformatiker-anwendungsentwicklung": { training: 1281, region: "Deutschland", trainingSource: "https://www.bibb.de/dienst/publikationen/download/20846" },
      "fachinformatiker-systemintegration": { training: 1281, median: 5189, q1: 4101, q3: 6741, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/7847", trainingSource: "https://www.bibb.de/dienst/publikationen/download/20846" },
      "mediengestalter": {},
      "bauzeichner": {},
      "gestalter-visuelles-marketing": { median: 3327, q1: 2772, q3: 3898, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/27541" },
      "koch": { training: 1223, median: 3018, q1: 2563, q3: 3581, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/3722", trainingSource: "https://www.bibb.de/dienst/publikationen/download/20846" },
      "baecker": { training: 1106, region: "Deutschland", trainingSource: "https://www.bibb.de/dienst/publikationen/download/20846" },
      "konditor": {},
      "fachverkaeufer-lebensmittelhandwerk": { training: 1107, median: 2956, q1: 2528, q3: 3531, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/14468", trainingSource: "https://www.bibb.de/dienst/publikationen/download/20846" },
      "fachmann-restaurants-veranstaltungsgastronomie": { median: 2652, q1: 2275, q3: 3128, region: "Deutschland", source: "https://web.arbeitsagentur.de/entgeltatlas/beruf/10051" }
    }
  };
})();