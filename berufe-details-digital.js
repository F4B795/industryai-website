
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
      intro: "Mediengestalter/innen Digital und Print gestalten visuelle Medien für unterschiedliche Kommunikationskanäle. Sie entwickeln Layouts, bearbeiten Bilder, erstellen digitale Inhalte und setzen Kundenwünsche in gestalterische Konzepte um.",
      prerequisites: [
        "Interesse an Gestaltung, Medien und Kommunikation",
        "Kreativität und Sinn für Ästhetik",
        "Grundverständnis für digitale Technik",
        "Sorgfalt und Genauigkeit",
        "Kommunikationsfähigkeit",
        "Bereitschaft, mit Designsoftware zu arbeiten"
      ],
      learning: [
        "Gestaltungskonzepte entwickeln",
        "Layouts und Grafiken erstellen",
        "Bilder und digitale Inhalte bearbeiten",
        "Typografie und Farbgestaltung einsetzen",
        "Digitale Medien und Druckprodukte vorbereiten",
        "Gestaltungssoftware professionell nutzen",
        "Kundenwünsche analysieren und umsetzen",
        "Dateien für verschiedene Medienformate optimieren"
      ],
      furtherTraining: [
        "Spezialisierung auf Digitalmedien oder Print",
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
      intro: "Bauzeichner/innen erstellen technische Zeichnungen und digitale Baupläne für Gebäude, Straßen und andere Bauwerke. Sie arbeiten mit CAD-Software, setzen Entwürfe von Architekten und Ingenieuren um und berücksichtigen technische sowie baurechtliche Vorgaben.",
      prerequisites: [
        "Interesse an Architektur, Bauwesen und Technik",
        "Räumliches Vorstellungsvermögen",
        "Genauigkeit und sorgfältiges Arbeiten",
        "Grundverständnis für Mathematik und Geometrie",
        "Konzentrationsfähigkeit",
        "Interesse an CAD-Programmen und digitalem Zeichnen"
      ],
      learning: [
        "Technische Zeichnungen und Baupläne erstellen",
        "CAD-Programme bedienen",
        "Grundrisse, Schnitte und Ansichten zeichnen",
        "Bauteile und Materialien kennenlernen",
        "Maße und technische Angaben eintragen",
        "Bauunterlagen und Planungsdaten bearbeiten",
        "Technische und baurechtliche Vorgaben berücksichtigen",
        "Mit Architekten, Ingenieuren und Bauunternehmen zusammenarbeiten"
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
        "Bauzeichner/in mit Spezialisierung auf Architektur oder Ingenieurbau",
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
  });

  window.IndustryAICareerDetails.version = "1.2.0";
})();
