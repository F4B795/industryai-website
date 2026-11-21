
/*
 * INDUSTRYAI – Erweiterte Berufsdetails
 * Campus-Welt 03: IT & Digitalisierung
 *
 * Diese Datei ergänzt die bestehenden Berufsdetails.
 * Sie überschreibt keine vorhandenen Berufseinträge.
 */

(function () {
  "use strict";

  if (!window.IndustryAICareerDetails) {
    console.error(
      "INDUSTRYAI: berufe-details.js muss zuerst geladen werden."
    );
    return;
  }

  const careers = window.IndustryAICareerDetails.careers;

  Object.assign(careers, {
    "fachinformatiker-anwendungsentwicklung": {
      intro: "Fachinformatiker/innen für Anwendungsentwicklung entwickeln Software und digitale Anwendungen. Sie analysieren Anforderungen, planen Programme, schreiben Code, testen Funktionen und verbessern bestehende Softwarelösungen.",
      prerequisites: [
        "Interesse an Computern und Softwareentwicklung",
        "Logisches und analytisches Denken",
        "Geduld bei der Fehlersuche",
        "Sorgfältiges und strukturiertes Arbeiten",
        "Lernbereitschaft und Ausdauer",
        "Grundverständnis für Mathematik und technische Zusammenhänge"
      ],
      learning: [
        "Programmiersprachen und Entwicklungsumgebungen kennenlernen",
        "Softwareanforderungen analysieren",
        "Anwendungen und Benutzeroberflächen entwickeln",
        "Datenbanken planen und nutzen",
        "Software testen und Fehler beheben",
        "Quellcode dokumentieren und warten",
        "Mit Versionsverwaltung und Entwicklungsteams arbeiten",
        "Datenschutz und IT-Sicherheit berücksichtigen"
      ],
      furtherTraining: [
        "Spezialisierung auf Webentwicklung oder App-Entwicklung",
        "Weiterbildung in Softwarearchitektur",
        "Spezialisierung auf Datenbanken und Backend-Systeme",
        "IT-Projektleitung",
        "IT-Weiterbildungen oder ein Studium der Informatik"
      ],
      careerPaths: [
        "Frontend- oder Backend-Entwickler/in",
        "Full-Stack-Entwickler/in",
        "Softwareentwickler/in für Apps und Webanwendungen",
        "Softwarearchitekt/in mit entsprechender Berufserfahrung",
        "Projektleitung oder technische Teamleitung"
      ]
    },

    "fachinformatiker-systemintegration": {
      intro: "Fachinformatiker/innen für Systemintegration planen, installieren und betreuen IT-Systeme und Netzwerke. Sie sorgen dafür, dass Computer, Server, Anwendungen und Verbindungen zuverlässig funktionieren und unterstützen Anwender bei technischen Problemen.",
      prerequisites: [
        "Interesse an Computern, Netzwerken und Technik",
        "Analytisches Denken und systematische Fehlersuche",
        "Technisches Verständnis",
        "Sorgfältiges und verantwortungsbewusstes Arbeiten",
        "Kommunikationsfähigkeit und Serviceorientierung",
        "Bereitschaft, sich ständig mit neuen Technologien zu beschäftigen"
      ],
      learning: [
        "Computer, Server und Betriebssysteme einrichten",
        "Netzwerke planen und konfigurieren",
        "IT-Systeme installieren und administrieren",
        "Benutzerkonten und Zugriffsrechte verwalten",
        "Fehler und Störungen analysieren",
        "Datensicherungen und Wiederherstellung planen",
        "IT-Sicherheitsmaßnahmen umsetzen",
        "Anwender beraten und technische Lösungen dokumentieren"
      ],
      furtherTraining: [
        "Spezialisierung auf Netzwerkadministration",
        "Weiterbildung in IT-Sicherheit",
        "Cloud- und Serveradministration",
        "IT-Projektleitung",
        "Operative Professional oder Studium im IT-Bereich"
      ],
      careerPaths: [
        "Systemadministrator/in",
        "Netzwerkadministrator/in",
        "IT-Support oder IT-Service-Management",
        "Spezialist/in für IT-Sicherheit",
        "Cloud-Administrator/in",
        "IT-Projektleitung oder technische Teamleitung"
      ]
    },

    "mediengestalter": {
      intro: "Mediengestalter/innen Digital und Print planen, gestalten und realisieren Medienprodukte für digitale und gedruckte Kanäle. Je nach Fachrichtung liegt der Schwerpunkt auf Designkonzeption, Digitalmedien, Printmedien oder Projektmanagement. Dazu gehören kreative Entwürfe, die technische Umsetzung, Produktionsplanung und – abhängig von der Fachrichtung – Kundenberatung und Projektorganisation.",
      prerequisites: [
        "Interesse an Gestaltung, Medien und Kommunikation",
        "Kreativität und Sinn für Ästhetik",
        "Grundverständnis für digitale Technik",
        "Sorgfalt und Genauigkeit",
        "Kommunikationsfähigkeit",
        "Bereitschaft, mit Designsoftware zu arbeiten"
      ],
      learning: [
        "In der Fachrichtung Designkonzeption Zielgruppen analysieren und Gestaltungskonzepte entwickeln",
        "In Digitalmedien digitale Medienprodukte gestalten, umsetzen und auf Benutzerfreundlichkeit prüfen",
        "In Printmedien Druckprodukte gestalten und Produktionsdaten für die Herstellung vorbereiten",
        "Im Projektmanagement Kunden beraten, Angebote kalkulieren und Medienprojekte planen und koordinieren",
        "Layouts, Grafiken und Bildmaterial mediengerecht bearbeiten",
        "Typografie, Farbgestaltung und Gestaltungssoftware professionell einsetzen",
        "Medienrechtliche Vorgaben, Barrierefreiheit und Qualitätsstandards berücksichtigen",
        "Dateien und Medienbestandteile für die jeweiligen Ausgabeformate optimieren"
      ],
      furtherTraining: [
        "Spezialisierung auf Designkonzeption, Digitalmedien, Printmedien oder Projektmanagement",
        "Weiterbildung in Webdesign und UX/UI-Design",
        "Art Direction",
        "Fachwirt/in für Medien",
        "Studium in Kommunikationsdesign oder Mediendesign"
      ],
      careerPaths: [
        "Grafikdesigner/in",
        "Webdesigner/in",
        "Mediengestalter/in für digitale Kommunikation",
        "Spezialist/in für Bildbearbeitung und Layout",
        "Art Director/in mit entsprechender Erfahrung",
        "Selbstständigkeit im Design- und Medienbereich"
      ]
    },

    "bauzeichner": {
      intro: "Bautechnische Konstrukteure und Konstrukteurinnen erstellen digitale Planungsunterlagen und technische Konstruktionen. Die Ausbildung hat drei Fachrichtungen: Architektur, Ingenieurbau sowie Tief-, Verkehrswege- und Landschaftsbau. Je nach Fachrichtung planen sie Gebäude und Bauteile, Ingenieurbauwerke oder Infrastrukturanlagen. Dabei arbeiten sie mit CAD-Systemen und BIM-Modellen und stimmen ihre Unterlagen mit den weiteren Projektbeteiligten ab.",
      prerequisites: [
        "Interesse an Architektur, Bauwesen und Technik",
        "Räumliches Vorstellungsvermögen",
        "Genauigkeit und sorgfältiges Arbeiten",
        "Grundverständnis für Mathematik und Geometrie",
        "Konzentrationsfähigkeit",
        "Interesse an CAD-Programmen und digitalem Zeichnen"
      ],
      learning: [
        "Technische Zeichnungen, Modelle und Planungsunterlagen erstellen",
        "CAD- und BIM-Software einsetzen und digitale Bauwerksmodelle bearbeiten",
        "In der Fachrichtung Architektur Grundrisse, Bauteile und Gebäude planen",
        "Im Ingenieurbau Konstruktionen und technische Bauwerke ausarbeiten",
        "Im Tief-, Verkehrswege- und Landschaftsbau unter anderem Straßen, Wege, Kanalisationen und Grünanlagen planen",
        "Konstruktive Details sowie technische Daten und Mengen ausarbeiten",
        "Technische, baurechtliche und nachhaltigkeitsbezogene Vorgaben berücksichtigen",
        "Mit Architekten, Ingenieuren und weiteren Projektbeteiligten zusammenarbeiten"
      ],
      furtherTraining: [
        "Techniker/in Bautechnik",
        "Weiterbildung in CAD und BIM",
        "Spezialisierung auf Architektur- oder Ingenieurbau",
        "Technische/r Fachwirt/in",
        "Studium in Architektur oder Bauingenieurwesen bei entsprechender Qualifikation"
      ],
      careerPaths: [
        "CAD-Konstrukteur/in",
        "Bautechnische/r Konstrukteur/in mit Spezialisierung auf Architektur, Ingenieurbau oder Tief-, Verkehrswege- und Landschaftsbau",
        "BIM-Konstrukteur/in",
        "Mitarbeit in Planungs- und Ingenieurbüros",
        "Weiterentwicklung in technische Planung und Projektkoordination"
      ]
    },

    "gestalter-visuelles-marketing": {
      intro: "Gestalter/innen für visuelles Marketing entwickeln und gestalten Verkaufsräume, Schaufenster, Ausstellungen und Präsentationsflächen. Sie setzen Produkte und Marken gezielt in Szene und verbinden Kreativität mit räumlicher Planung und handwerklicher Umsetzung.",
      prerequisites: [
        "Interesse an Gestaltung und visueller Kommunikation",
        "Kreativität und räumliches Vorstellungsvermögen",
        "Handwerkliches Geschick",
        "Sinn für Farben, Formen und Materialien",
        "Organisationsfähigkeit",
        "Teamfähigkeit und Kundenorientierung"
      ],
      learning: [
        "Gestaltungskonzepte für Verkaufsflächen entwickeln",
        "Schaufenster und Präsentationsflächen gestalten",
        "Produkte und Marken visuell präsentieren",
        "Farben, Materialien und Beleuchtung einsetzen",
        "Dekorationen und Präsentationselemente herstellen",
        "Gestaltungsarbeiten planen und kalkulieren",
        "Mit Kunden und Auftraggebern zusammenarbeiten",
        "Trends und Zielgruppen berücksichtigen"
      ],
      furtherTraining: [
        "Gestalter/in im Handwerk",
        "Fachwirt/in für Marketing",
        "Weiterbildung in Visual Merchandising",
        "Spezialisierung auf Messe- und Ausstellungsgestaltung",
        "Studium in Kommunikationsdesign oder Innenarchitektur"
      ],
      careerPaths: [
        "Visual Merchandiser/in",
        "Gestalter/in für Schaufenster und Verkaufsräume",
        "Spezialist/in für Messe- und Ausstellungsgestaltung",
        "Verantwortung für Warenpräsentation und Filialgestaltung",
        "Weiterentwicklung in Marketing, Konzeption oder Projektleitung"
      ]
    }
,
    "fachinformatiker-daten-prozessanalyse": {
      intro: "Fachinformatiker/innen der Fachrichtung Daten- und Prozessanalyse untersuchen Arbeits- und Geschäftsprozesse aus informationstechnischer Sicht. Sie werten Daten aus, erkennen Optimierungsmöglichkeiten und entwickeln Lösungen, um Abläufe zu digitalisieren und zu automatisieren.",
      prerequisites: [
        "Interesse an Daten, IT und wirtschaftlichen Abläufen",
        "Analytisches und logisches Denken",
        "Sorgfältiger Umgang mit Zahlen und Informationen",
        "Grundverständnis für Mathematik und Informatik",
        "Strukturiertes Arbeiten und Ausdauer bei der Fehlersuche",
        "Verantwortungsbewusstsein für Datenschutz und IT-Sicherheit"
      ],
      learning: [
        "Arbeits- und Geschäftsprozesse analysieren",
        "Daten erfassen, aufbereiten und auswerten",
        "Datenqualität und Datenverfügbarkeit verbessern",
        "Digitale Prozesse konzipieren und optimieren",
        "Automatisierungsmöglichkeiten erkennen und umsetzen",
        "IT-Sicherheits- und Datenschutzmaßnahmen berücksichtigen",
        "Ergebnisse dokumentieren und verständlich präsentieren"
      ],
      furtherTraining: [
        "Spezialisierung auf Datenanalyse und Business Intelligence",
        "Weiterbildung in Prozessmanagement und Prozessautomatisierung",
        "Spezialisierung auf Datenbanken und IT-Sicherheit",
        "IT-Projektleitung mit entsprechender Berufserfahrung",
        "Studium in Wirtschaftsinformatik oder Data Science bei entsprechender Qualifikation"
      ],
      careerPaths: [
        "Mitarbeit in Daten- und Prozessanalyse",
        "Unterstützung bei Digitalisierung und Prozessoptimierung",
        "Tätigkeit im Business Intelligence Umfeld",
        "Spezialisierung auf Datenqualität oder Automatisierung",
        "Weiterentwicklung in IT-Projektkoordination"
      ]
    },
    "fachinformatiker-digitale-vernetzung": {
      intro: "Fachinformatiker/innen der Fachrichtung Digitale Vernetzung verbinden IT-Systeme mit Maschinen, Anlagen und weiteren technischen Komponenten. Sie analysieren bestehende Netzwerke, richten den Datenaustausch ein und sorgen für einen zuverlässigen und sicheren Betrieb vernetzter Systeme.",
      prerequisites: [
        "Interesse an Netzwerken, IT und technischen Anlagen",
        "Technisches Verständnis und logisches Denken",
        "Sorgfalt bei Installation und Konfiguration",
        "Grundverständnis für Mathematik und Informatik",
        "Ausdauer bei systematischer Fehlersuche",
        "Verantwortungsbewusstsein für IT-Sicherheit"
      ],
      learning: [
        "Vernetzte Systeme und technische Schnittstellen analysieren",
        "Netzwerkkomponenten und Betriebssysteme installieren und konfigurieren",
        "Datenaustausch zwischen Maschinen und IT-Systemen einrichten",
        "Vernetzte Systeme testen und in Betrieb nehmen",
        "Systeme überwachen und ihre Verfügbarkeit sicherstellen",
        "Sicherheits- und Datensicherungssysteme berücksichtigen",
        "Störungen analysieren, beheben und dokumentieren"
      ],
      furtherTraining: [
        "Spezialisierung auf industrielle Netzwerke und Industrial Ethernet",
        "Weiterbildung in IT-Sicherheit und Systemadministration",
        "Spezialisierung auf IoT und cyber-physische Systeme",
        "Techniker/in Informatik mit entsprechender Voraussetzung",
        "Studium in Informatik oder Technischer Informatik bei entsprechender Qualifikation"
      ],
      careerPaths: [
        "Tätigkeit in IT- und Netzwerkabteilungen",
        "Betreuung vernetzter Produktions- und Betriebssysteme",
        "Spezialisierung auf industrielle Kommunikation und IoT",
        "Weiterentwicklung in IT-Sicherheit und Systembetrieb",
        "Koordination von Vernetzungs- und Digitalisierungsprojekten"
      ]
    }
  });

  window.IndustryAICareerDetails.version = "1.2.0";
})();
