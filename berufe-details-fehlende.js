/*
 * INDUSTRYAI – Ergänzende vollständige Berufsprofile
 * Ergänzt Voraussetzungen, Ausbildungsinhalte und Perspektiven
 * für weitere Berufe. Angaben dienen der Orientierung; Details
 * können je nach Fachrichtung, Bundesland und Betrieb variieren.
 */
(function () {
  "use strict";
  if (!window.IndustryAICareerDetails) return;
  const careers = window.IndustryAICareerDetails.careers;

  Object.assign(careers, {
    "fotograf": {
      intro: "Fotografen und Fotografinnen planen und erstellen Bilder für unterschiedliche Zwecke. Sie beraten Auftraggeber, bereiten Aufnahmen vor, setzen Licht und Kamera gezielt ein und bearbeiten die entstandenen Bilder digital.",
      prerequisites: [
        "Interesse an Fotografie, Bildgestaltung und visueller Kommunikation",
        "Blick für Perspektiven, Licht und Bildkomposition",
        "Technisches Verständnis für Kamera- und Beleuchtungstechnik",
        "Sorgfalt bei Bildauswahl, Bearbeitung und Datenverwaltung",
        "Kommunikationsfähigkeit und kundenorientiertes Arbeiten",
        "Bereitschaft, sich mit Bildrechten und Datenschutz auseinanderzusetzen"
      ],
      learning: [
        "Kamera-, Objektiv- und Beleuchtungstechnik einsetzen",
        "Aufnahmen planen und fotografische Gestaltungsmittel anwenden",
        "Licht setzen und unterschiedliche Aufnahmesituationen umsetzen",
        "Bilder auswählen, digital bearbeiten und ausgeben",
        "Kundenaufträge kalkulieren und Arbeitsabläufe organisieren",
        "Bilddaten archivieren sowie Nutzungs- und Persönlichkeitsrechte beachten"
      ],
      furtherTraining: [
        "Spezialisierung auf Porträt-, Produkt-, Industrie- oder Reportagefotografie",
        "Weiterbildung in Bildbearbeitung und digitaler Medienproduktion",
        "Meister/in im Fotografenhandwerk",
        "Studium in Fotografie, Mediendesign oder Kommunikationsdesign bei entsprechender Voraussetzung"
      ],
      careerPaths: [
        "Fotograf/in in einem Studio oder Medienunternehmen",
        "Spezialisierung auf gewerbliche oder redaktionelle Fotografie",
        "Bildbearbeitung und digitale Medienproduktion",
        "Selbstständigkeit mit eigenem Fotostudio oder Auftragsangebot"
      ]
    },
    "landwirt": {
      intro: "Landwirte und Landwirtinnen erzeugen pflanzliche und tierische Produkte. Sie bewirtschaften Flächen, versorgen Tiere, bedienen und warten Maschinen und organisieren betriebliche Abläufe. Die konkreten Tätigkeiten unterscheiden sich je nach Betriebszweig.",
      prerequisites: [
        "Interesse an Landwirtschaft, Natur und technischen Arbeitsmitteln",
        "Verantwortungsbewusstsein im Umgang mit Tieren und Umwelt",
        "Praktisches Geschick und körperliche Belastbarkeit",
        "Beobachtungsgabe und sorgfältiges Arbeiten",
        "Grundverständnis für biologische und wirtschaftliche Zusammenhänge",
        "Bereitschaft zu saisonabhängigen und teilweise frühen Arbeitszeiten"
      ],
      learning: [
        "Böden, Pflanzen und Kulturen beurteilen und bewirtschaften",
        "Tiere artgerecht versorgen und ihre Gesundheit beobachten",
        "Landwirtschaftliche Maschinen und Geräte bedienen und pflegen",
        "Ernte-, Fütterungs- und Produktionsabläufe organisieren",
        "Betriebliche Daten und Arbeitsvorgänge dokumentieren",
        "Umwelt-, Tierwohl- und Arbeitsschutzvorgaben berücksichtigen"
      ],
      furtherTraining: [
        "Landwirtschaftsmeister/in",
        "Staatlich geprüfte/r Techniker/in für Agrartechnik",
        "Spezialisierung auf Pflanzenbau, Tierhaltung oder ökologische Landwirtschaft",
        "Fortbildungen in Betriebsführung und Agrartechnik",
        "Studium der Agrarwissenschaften bei entsprechender Voraussetzung"
      ],
      careerPaths: [
        "Fachkraft in landwirtschaftlichen Betrieben",
        "Verantwortung für einen Betriebszweig",
        "Betriebsleitung oder Übernahme eines Hofes",
        "Tätigkeit in Beratung, Agrarhandel oder vor- und nachgelagerten Bereichen"
      ]
    },
    "gaertner": {
      intro: "Gärtner und Gärtnerinnen kultivieren Pflanzen, gestalten und pflegen Grünflächen oder arbeiten mit Bäumen, Gemüse und Zierpflanzen. Die Ausbildung umfasst verschiedene Fachrichtungen, deren Aufgaben sich deutlich unterscheiden können.",
      prerequisites: [
        "Interesse an Pflanzen, Natur und praktischer Arbeit im Freien",
        "Beobachtungsgabe und Sorgfalt",
        "Handwerkliches Geschick und körperliche Belastbarkeit",
        "Grundverständnis für biologische Zusammenhänge",
        "Teamfähigkeit und zuverlässiges Arbeiten",
        "Bereitschaft zu saisonabhängigen Tätigkeiten"
      ],
      learning: [
        "Pflanzen bestimmen, kultivieren und fachgerecht pflegen",
        "Böden und Standortbedingungen beurteilen",
        "Pflanzungen und Pflegearbeiten planen und ausführen",
        "Maschinen, Geräte und Werkzeuge sicher einsetzen",
        "Pflanzenschutz und ökologische Zusammenhänge berücksichtigen",
        "Kunden beraten oder Arbeitsabläufe im Betrieb organisieren – je nach Fachrichtung"
      ],
      furtherTraining: [
        "Gärtnermeister/in in der jeweiligen Fachrichtung",
        "Staatlich geprüfte/r Techniker/in im Gartenbau",
        "Spezialisierung auf Baumpflege, Pflanzenproduktion oder Garten- und Landschaftsbau",
        "Fortbildungen in Betriebsführung und Pflanzenschutz",
        "Studium im Gartenbau oder in der Landschaftsarchitektur bei entsprechender Voraussetzung"
      ],
      careerPaths: [
        "Fachkraft in einem Gartenbau- oder Landschaftsbaubetrieb",
        "Spezialisierung auf eine gärtnerische Fachrichtung",
        "Vorarbeiter/in oder Teamleitung",
        "Betriebsleitung oder Selbstständigkeit"
      ]
    },
    "berufskraftfahrer": {
      intro: "Berufskraftfahrer und Berufskraftfahrerinnen transportieren Güter oder befördern Fahrgäste. Sie bereiten Fahrten vor, kontrollieren Fahrzeuge, beachten Verkehrs- und Sicherheitsvorschriften und dokumentieren ihre Aufträge. Die Ausbildung unterscheidet zwischen Güterverkehr und Personenverkehr.",
      prerequisites: [
        "Interesse an Fahrzeugen und Verkehr",
        "Verantwortungsbewusstsein und Zuverlässigkeit",
        "Konzentrationsfähigkeit und umsichtiges Verhalten",
        "Technisches Grundverständnis",
        "Service- und Kommunikationsfähigkeit, besonders im Personenverkehr",
        "Bereitschaft zu wechselnden Arbeitszeiten und längeren Abwesenheiten je nach Einsatz"
      ],
      learning: [
        "Fahrzeuge kontrollieren, pflegen und einfache technische Maßnahmen durchführen",
        "Fahrten und Routen unter wirtschaftlichen und rechtlichen Vorgaben planen",
        "Ladung sichern oder Fahrgäste sicher und serviceorientiert befördern",
        "Verkehrs-, Arbeitszeit- und Sicherheitsvorschriften anwenden",
        "Fahrzeug- und Beförderungsdokumente bearbeiten",
        "Mit Kunden, Disposition und weiteren Beteiligten kommunizieren"
      ],
      furtherTraining: [
        "Weiterbildung in Ladungssicherung und Gefahrguttransport, soweit erforderlich",
        "Spezialisierung auf bestimmte Fahrzeug- oder Transportbereiche",
        "Weiterbildung zum/zur Kraftverkehrsmeister/in",
        "Qualifikationen in Disposition und Fuhrparkmanagement"
      ],
      careerPaths: [
        "Berufskraftfahrer/in im Güter- oder Personenverkehr",
        "Spezialisierung auf bestimmte Transportarten",
        "Einsatz in Disposition oder Fuhrparkorganisation mit entsprechender Erfahrung",
        "Weiterentwicklung zur Team- oder Fuhrparkleitung"
      ]
    },
    "industriekaufmann": {
      intro: "Industriekaufleute steuern und bearbeiten kaufmännische Abläufe in Industrieunternehmen. Sie arbeiten beispielsweise im Einkauf, Vertrieb, Personalwesen, Rechnungswesen oder in der Produktionsplanung und stimmen Informationen zwischen verschiedenen Abteilungen ab.",
      prerequisites: [
        "Interesse an wirtschaftlichen und betrieblichen Zusammenhängen",
        "Sorgfalt im Umgang mit Zahlen und Dokumenten",
        "Kommunikationsfähigkeit und Teamorientierung",
        "Organisationsgeschick und strukturiertes Arbeiten",
        "Grundverständnis für digitale Anwendungen und kaufmännische Prozesse",
        "Kunden- und serviceorientiertes Verhalten"
      ],
      learning: [
        "Einkaufsprozesse und Materialbeschaffung bearbeiten",
        "Vertrieb, Kundenaufträge und Marketing unterstützen",
        "Kaufmännische Steuerung und Kontrolle kennenlernen",
        "Rechnungen, Buchungen und Zahlungsabläufe bearbeiten",
        "Personalprozesse und organisatorische Aufgaben unterstützen",
        "Produktions- und Logistikprozesse kaufmännisch begleiten",
        "Mit ERP-Systemen und digitalen Büroanwendungen arbeiten"
      ],
      furtherTraining: [
        "Industriefachwirt/in",
        "Fachwirt/in für Einkauf oder Vertrieb",
        "Bilanzbuchhalter/in bei passender Vorbildung",
        "Betriebswirt/in",
        "Studium in Betriebswirtschaft oder Wirtschaftsingenieurwesen bei entsprechender Voraussetzung"
      ],
      careerPaths: [
        "Sachbearbeitung in Einkauf, Vertrieb oder Personal",
        "Mitarbeit im Rechnungswesen oder Controlling",
        "Disposition und Produktionsplanung",
        "Kaufmännische Projektkoordination",
        "Teamleitung oder kaufmännische Leitung mit Berufserfahrung"
      ]
    },
    "steuerfachangestellter": {
      intro: "Steuerfachangestellte unterstützen Steuerberater und Steuerberaterinnen bei der Betreuung von Mandanten. Sie bearbeiten Buchführungen, bereiten Steuererklärungen und Jahresabschlüsse vor und erledigen organisatorische sowie kommunikative Aufgaben in der Kanzlei.",
      prerequisites: [
        "Interesse an Steuern, Wirtschaft und rechtlichen Fragestellungen",
        "Sorgfalt und Verantwortungsbewusstsein",
        "Gute schriftliche und mündliche Ausdrucksfähigkeit",
        "Zahlenverständnis und analytisches Denken",
        "Diskretion im Umgang mit vertraulichen Daten",
        "Bereitschaft, sich regelmäßig in Gesetzesänderungen einzuarbeiten"
      ],
      learning: [
        "Finanzbuchführungen bearbeiten",
        "Lohn- und Gehaltsabrechnungen vorbereiten",
        "Steuererklärungen und Jahresabschlüsse vorbereiten",
        "Steuerliche Sachverhalte und Fristen nachvollziehen",
        "Mandantenkommunikation und Kanzleiorganisation unterstützen",
        "Mit Fachsoftware und digitalen Belegsystemen arbeiten",
        "Datenschutz und Verschwiegenheit beachten"
      ],
      furtherTraining: [
        "Steuerfachwirt/in",
        "Bilanzbuchhalter/in",
        "Fachassistent/in für Lohn und Gehalt oder andere Fachassistenzen",
        "Vorbereitung auf die Steuerberaterprüfung bei Erfüllung der gesetzlichen Voraussetzungen",
        "Studium in Steuerrecht oder Betriebswirtschaft bei entsprechender Voraussetzung"
      ],
      careerPaths: [
        "Mitarbeit in Steuerberatungs- und Wirtschaftsprüfungskanzleien",
        "Spezialisierung auf Buchführung, Lohn oder Jahresabschlüsse",
        "Verantwortung für Mandanten und Kanzleiprozesse",
        "Weiterentwicklung zum/zur Steuerfachwirt/in oder Steuerberater/in bei erfüllten Voraussetzungen"
      ]
    },
    "chemielaborant": {
      intro: "Chemielaboranten und Chemielaborantinnen führen chemische und physikalische Untersuchungen durch. Sie bereiten Versuche vor, stellen Substanzen und Lösungen her, bedienen Laborgeräte und werten Messergebnisse aus. Sie arbeiten unter festgelegten Sicherheits- und Qualitätsvorgaben.",
      prerequisites: [
        "Interesse an Chemie und Naturwissenschaften",
        "Sorgfalt und genaues Arbeiten",
        "Verständnis für mathematische und naturwissenschaftliche Zusammenhänge",
        "Geduld und Konzentrationsfähigkeit",
        "Verantwortungsbewusstsein im Umgang mit Gefahrstoffen",
        "Bereitschaft, Laborvorschriften konsequent einzuhalten"
      ],
      learning: [
        "Chemische und physikalische Untersuchungen planen und durchführen",
        "Proben vorbereiten und Stoffe fachgerecht handhaben",
        "Lösungen und Präparate nach Vorgabe herstellen",
        "Laborgeräte und Messinstrumente bedienen",
        "Messdaten erfassen, auswerten und dokumentieren",
        "Qualitätssicherung und analytische Verfahren kennenlernen",
        "Arbeitsschutz, Gefahrstoffkennzeichnung und Entsorgung beachten"
      ],
      furtherTraining: [
        "Industriemeister/in Chemie",
        "Staatlich geprüfte/r Techniker/in Chemietechnik",
        "Spezialisierung auf Analytik, Qualitätssicherung oder Produktionslabor",
        "Weiterbildung in Labor- und Qualitätsmanagement",
        "Studium in Chemie oder verwandten Naturwissenschaften bei entsprechender Voraussetzung"
      ],
      careerPaths: [
        "Tätigkeit in Forschungs-, Prüf- oder Produktionslaboren",
        "Spezialisierung auf analytische oder präparative Verfahren",
        "Verantwortung in Qualitätssicherung und Labororganisation",
        "Weiterentwicklung zur Laborleitung mit entsprechender Erfahrung und Qualifikation"
      ]
    },
    "friseur": {
      intro: "Friseure und Friseurinnen beraten Kunden zu Frisuren, Haarpflege und Styling. Sie schneiden, färben und gestalten Haare und sorgen für einen professionellen Kundenservice sowie einen hygienischen Arbeitsplatz.",
      prerequisites: [
        "Freude am Umgang mit Menschen und an Beratung",
        "Kreativität und Sinn für Formen und Farben",
        "Handwerkliches Geschick und Genauigkeit",
        "Kommunikationsfähigkeit und Einfühlungsvermögen",
        "Sorgfalt bei Hygiene und Produktanwendung",
        "Belastbarkeit und serviceorientiertes Arbeiten"
      ],
      learning: [
        "Kunden beraten und Wünsche fachlich einschätzen",
        "Haare und Kopfhaut beurteilen und Pflege empfehlen",
        "Haare schneiden, föhnen und frisieren",
        "Farb- und Umformungstechniken kennenlernen und anwenden",
        "Kosmetische Produkte fachgerecht einsetzen",
        "Arbeitsmittel und Salon hygienisch organisieren",
        "Termine, Waren und kaufmännische Abläufe bearbeiten"
      ],
      furtherTraining: [
        "Friseurmeister/in",
        "Spezialisierung auf Coloration, Schnitt oder Haarverlängerung",
        "Weiterbildung in Salonmanagement und Betriebsführung",
        "Ausbildung zum/zur Ausbilder/in",
        "Selbstständigkeit mit eigenem Salon bei Erfüllung der Voraussetzungen"
      ],
      careerPaths: [
        "Friseur/in in einem Salon",
        "Spezialisierung auf bestimmte Schnitt- oder Farbtechniken",
        "Salonleitung oder Ausbilder/in",
        "Selbstständigkeit nach den geltenden handwerksrechtlichen Voraussetzungen"
      ]
    }
  });

  window.IndustryAICareerDetails.version = "1.7.0";
})();
