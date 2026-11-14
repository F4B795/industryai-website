/*
 * INDUSTRYAI – Praxis- und Entwicklungsperspektiven
 * Ergänzt konkrete Einsatzbereiche und Spezialisierungen.
 * Angaben sind Beispiele; Anforderungen und Karrierewege unterscheiden sich je nach Betrieb.
 */
(function () {
  "use strict";
  if (!window.IndustryAICareerDetails) return;
  const profiles = {
    "zerspanungsmechaniker": {
      fields: ["CNC-Dreherei und Langdrehautomaten", "CNC-Fräserei und Bearbeitungszentren", "Einzelteil- und Serienfertigung", "Werkzeug- und Formenbau", "Qualitätssicherung und Messtechnik"],
      specializations: ["CNC-Programmierung und CAM", "Einrichten komplexer Mehrkanalmaschinen", "Werkzeug- und Prozessoptimierung", "Präzisions- und Mikrobearbeitung"],
      development: ["Einrichter/in oder CNC-Programmierer/in", "Fertigungs- oder Schichtverantwortung", "Industriemeister/in Metall", "Techniker/in Maschinentechnik", "Arbeitsvorbereitung oder Fertigungsplanung"]
    },
    "industriemechaniker": {
      fields: ["Maschinen- und Anlagenbau", "Instandhaltung in Produktionsbetrieben", "Montage und Endprüfung", "Vorrichtungs- und Betriebsmittelbau", "Service und Anlagenmontage beim Kunden"],
      specializations: ["Pneumatik und Hydraulik", "Wartung und vorbeugende Instandhaltung", "Montage komplexer Baugruppen", "Fehlerdiagnose und Anlagenoptimierung"],
      development: ["Spezialist/in Instandhaltung", "Vorarbeiter/in oder Teamleitung", "Industriemeister/in Metall", "Techniker/in Maschinentechnik", "Technischer Service oder Arbeitsvorbereitung"]
    },
    "mechatroniker": {
      fields: ["Automatisierte Produktionsanlagen", "Maschinen- und Sondermaschinenbau", "Montage und Inbetriebnahme", "Instandhaltung", "Prüf- und Servicetechnik"],
      specializations: ["Steuerungs- und Regelungstechnik", "SPS-Programmierung", "Robotik und industrielle Automatisierung", "Diagnose mechatronischer Systeme"],
      development: ["Spezialist/in Automatisierung", "Inbetriebnehmer/in", "Industriemeister/in Mechatronik oder Elektrotechnik", "Techniker/in Mechatronik", "Technische Projektkoordination"]
    },
    "elektroniker-automatisierung": {
      fields: ["Automobil- und Zulieferindustrie", "Anlagen- und Maschinenbau", "Prozessindustrie", "Gebäude- und Versorgungstechnik", "Service und Inbetriebnahme"],
      specializations: ["SPS- und Steuerungsprogrammierung", "Sensorik und Aktorik", "Robotik und Prozessleittechnik", "Fehlersuche an automatisierten Anlagen"],
      development: ["SPS-Programmierer/in", "Inbetriebnehmer/in", "Industriemeister/in Elektrotechnik", "Techniker/in Automatisierungstechnik", "Projektierung und technische Planung"]
    },
    "kfz-mechatroniker": {
      fields: ["Markenwerkstätten und freie Werkstätten", "Nutzfahrzeugtechnik", "Fahrzeugdiagnose", "Karosserie- und Fahrzeugtechnik", "Service und technische Kundenbetreuung"],
      specializations: ["System- und Hochvolttechnik", "Diagnose elektronischer Fahrzeugsysteme", "Nutzfahrzeug- oder Motorradtechnik", "Fahrerassistenz- und Komfortsysteme"],
      development: ["Diagnosetechniker/in", "Werkstattverantwortung", "Kfz-Meister/in", "Serviceberatung", "Techniker/in Fahrzeugtechnik"]
    },
    "anlagenmechaniker-shk": {
      fields: ["Sanitär- und Heizungsinstallation", "Wärmepumpen und erneuerbare Energien", "Klima- und Lüftungstechnik", "Gebäudemanagement", "Kundendienst und Wartung"],
      specializations: ["Wärmepumpen und moderne Heizsysteme", "Regelungs- und Steuerungstechnik", "Trinkwasserhygiene", "Energieeffizienz und hydraulischer Abgleich"],
      development: ["Obermonteur/in", "Kundendienstleitung", "Installateur- und Heizungsbauermeister/in", "Techniker/in Heizungs-, Lüftungs- und Klimatechnik", "Betriebsführung oder Selbstständigkeit"]
    },
    "tischler": {
      fields: ["Möbel- und Innenausbau", "Fenster- und Türenbau", "Laden- und Messebau", "Montage beim Kunden", "Restaurierung und Reparatur"],
      specializations: ["Möbelbau und Einzelanfertigung", "CNC-Holzbearbeitung", "CAD- und Produktionsplanung", "Innenausbau und Oberflächentechnik"],
      development: ["Spezialist/in CNC oder Möbelbau", "Tischlermeister/in", "Techniker/in Holztechnik", "Arbeitsvorbereitung und Produktionsleitung", "Eigener Tischlerbetrieb"]
    },
    "fachkraft-metalltechnik-zerspanung": {
      fields: ["Serienfertigung", "CNC-Dreh- und Fräsbereiche", "Maschinenbedienung", "Qualitätskontrolle", "Werkzeugvorbereitung"],
      specializations: ["CNC-Maschinenbedienung", "Messen und Prüfen", "Werkzeugwechsel und Rüsten", "Aufbaukenntnisse in Zerspanungsverfahren"],
      development: ["Erfahrung in Rüst- und Einrichtaufgaben", "Anschlussqualifikation zum/zur Zerspanungsmechaniker/in prüfen", "Spezialisierung auf CNC-Verfahren", "Weiterbildung zur geprüften Fachkraft oder Industriemeister/in bei passenden Voraussetzungen"]
    },
    "elektroniker-betriebstechnik": {
      fields: ["Industrielle Energieversorgung", "Produktions- und Fertigungsanlagen", "Schaltanlagenbau", "Gebäudetechnische Anlagen", "Instandhaltung und Service"],
      specializations: ["Antriebs- und Motorentechnik", "Schaltanlagen und Schutztechnik", "SPS und industrielle Steuerungen", "Prüfung elektrischer Anlagen"],
      development: ["Spezialist/in Instandhaltung", "Industriemeister/in Elektrotechnik", "Techniker/in Elektrotechnik", "Arbeitsplanung oder Anlagenverantwortung", "Technische Projektleitung"]
    },
    "pflegefachfrau": {
      fields: ["Krankenhäuser und Fachkliniken", "Stationäre Langzeitpflege", "Ambulante Pflege", "Rehabilitation", "Psychiatrische und pädiatrische Versorgung"],
      specializations: ["Intensiv- und Anästhesiepflege", "Onkologische oder pädiatrische Pflege", "Wundmanagement", "Palliativpflege", "Praxisanleitung"],
      development: ["Fachweiterbildung in einem Pflegebereich", "Praxisanleiter/in", "Pflegeberater/in", "Stations- oder Wohnbereichsleitung", "Pflegemanagement oder Pflegepädagogik mit entsprechender Qualifikation"]
    },
    "medizinische-fachangestellte": {
      fields: ["Hausarzt- und Facharztpraxen", "Medizinische Versorgungszentren", "Ambulanzen und Kliniken", "Diagnostik und Labor", "Patientenverwaltung"],
      specializations: ["Praxisorganisation und Abrechnung", "Assistenz in Facharztbereichen", "Qualitätsmanagement", "Impf- und Vorsorgeorganisation"],
      development: ["VERAH oder NäPa je nach Voraussetzungen", "Fachwirt/in für ambulante medizinische Versorgung", "Praxismanagement", "Team- oder Praxisleitung"]
    },
    "tiermedizinische-fachangestellte": {
      fields: ["Kleintierpraxen", "Tierkliniken", "Großtier- und Fahrpraxen", "Labor und Diagnostik", "Empfang und Praxisorganisation"],
      specializations: ["Assistenz bei Operationen", "Labor und Diagnostik", "Anästhesie- und Stationsbetreuung", "Praxismanagement"],
      development: ["Spezialisierte Assistenzbereiche", "Weiterbildung Praxismanagement", "Teamleitung", "Fortbildungen in Labor, Hygiene oder Tierverhalten"]
    },
    "erzieher": {
      fields: ["Kindertagesstätten", "Horte und Ganztagsschulen", "Kinder- und Jugendhilfe", "Wohngruppen", "Offene Kinder- und Jugendarbeit"],
      specializations: ["Frühkindliche Bildung", "Inklusion und Integrationspädagogik", "Sprachförderung", "Erlebnispädagogik", "Kinderschutz"],
      development: ["Gruppen- oder Bereichsleitung", "Fachberatung", "Einrichtungsleitung mit passender Qualifikation", "Fachwirt/in Erziehungswesen", "Studium Kindheitspädagogik oder Sozialpädagogik"]
    },
    "fachinformatiker-anwendungsentwicklung": {
      fields: ["Web- und Softwareagenturen", "Interne IT- und Entwicklungsabteilungen", "Industrie- und Unternehmenssoftware", "App- und Plattformentwicklung", "Softwaretesting und Qualitätssicherung"],
      specializations: ["Frontend- oder Backend-Entwicklung", "Mobile Apps", "Datenbanken und Schnittstellen", "Cloud-Anwendungen", "Softwaretests und DevOps-Grundlagen"],
      development: ["Senior Software Developer", "Full-Stack- oder Cloud-Spezialisierung", "Softwarearchitektur mit Erfahrung", "Technische Projektleitung", "Teamleitung oder Studium"]
    },
    "fachinformatiker-systemintegration": {
      fields: ["IT-Abteilungen von Unternehmen", "Systemhäuser und IT-Dienstleister", "Rechenzentren", "Netzwerk- und Serverbetrieb", "IT-Support und Managed Services"],
      specializations: ["Netzwerkadministration", "Windows- oder Linux-Server", "Cloud und Virtualisierung", "IT-Sicherheit", "IT-Service- und Systemmanagement"],
      development: ["Systemadministrator/in", "Netzwerk- oder Cloud-Engineer", "IT-Security-Spezialisierung", "IT-Projektkoordination", "Teamleitung oder IT-Management"]
    },
    "mediengestalter": {
      fields: ["Werbe- und Medienagenturen", "Marketingabteilungen", "Druck- und Medienproduktion", "Digitale Kommunikation", "Verlage und Inhouse-Studios"],
      specializations: ["Digitalmedien und Webcontent", "Printproduktion und Reinzeichnung", "Motion Design", "Bildbearbeitung und Compositing", "Corporate Design"],
      development: ["Art Direction mit Berufserfahrung", "Spezialist/in Motion oder Digital Design", "Projektmanagement", "Teamleitung Kreation", "Weiterbildung oder Studium im Kommunikationsdesign"]
    },
    "bauzeichner": {
      fields: ["Architektur- und Ingenieurbüros", "Bauunternehmen", "Tief- und Straßenbau", "Gebäudeplanung", "Technische Planungsabteilungen"],
      specializations: ["CAD-Konstruktion", "BIM-Modellierung", "Hochbau oder Tiefbau", "Ausführungs- und Detailplanung", "Bestandsaufnahme"],
      development: ["CAD- oder BIM-Koordination", "Techniker/in Bautechnik", "Projektassistenz und Planungskoordination", "Weiterbildung in Bauprojektmanagement", "Studium bei passenden Voraussetzungen"]
    },
    "gestalter-visuelles-marketing": {
      fields: ["Einzelhandel und Warenhäuser", "Marken- und Ladenbauunternehmen", "Messen und Events", "Schaufenster- und Flächengestaltung", "Visual-Merchandising-Abteilungen"],
      specializations: ["Schaufensterkonzeption", "Visual Merchandising", "Event- und Messegestaltung", "Licht- und Farbkonzepte", "Markeninszenierung"],
      development: ["Visual Merchandiser/in", "Team- oder Flächenleitung", "Spezialisierung Messe und Event", "Handelsfachwirt/in", "Weiterbildung in Marketing oder Gestaltung"]
    },
    "koch": {
      fields: ["Restaurants und Hotels", "Betriebs- und Gemeinschaftsverpflegung", "Catering und Eventgastronomie", "Klinik- und Senioreneinrichtungen", "Kreuzfahrt und Systemgastronomie"],
      specializations: ["Patisserie und Dessert", "Vegetarische und vegane Küche", "Diätetik und Sonderkost", "Bankett und Catering", "Küchenorganisation"],
      development: ["Chef de Partie und Sous-Chef/in", "Küchenmeister/in", "Küchenleitung", "Weiterbildung Gemeinschaftsverpflegung", "Selbstständigkeit"]
    },
    "baecker": {
      fields: ["Handwerksbäckereien", "Industrie- und Großbäckereien", "Spezial- und Bio-Bäckereien", "Teiglings- und Backwarenproduktion", "Qualitätskontrolle"],
      specializations: ["Sauerteig und handwerkliche Brote", "Feingebäck und Snacks", "Produktions- und Ofentechnik", "Rezeptur und Produktentwicklung", "Qualität und Hygiene"],
      development: ["Bäckermeister/in", "Schicht- oder Produktionsleitung", "Produktentwicklung", "Betriebsführung", "Selbstständigkeit"]
    },
    "konditor": {
      fields: ["Konditoreien und Confiserien", "Hotels und Patisserien", "Cafés und Gastronomie", "Event- und Hochzeitstorten", "Spezialisierte Lebensmittelproduktion"],
      specializations: ["Patisserie", "Pralinen und Confiserie", "Zucker- und Schokoladenkunst", "Dekor und Schaustücke", "Dessertentwicklung"],
      development: ["Konditormeister/in", "Leitung einer Patisserie", "Produktentwicklung", "Betriebsführung", "Eigene Konditorei"]
    },
    "fachverkaeufer-lebensmittelhandwerk": {
      fields: ["Bäckereien und Konditoreien", "Fleischereien", "Lebensmittel-Fachgeschäfte", "Feinkost und Spezialitäten", "Filial- und Verkaufsorganisation"],
      specializations: ["Kundenberatung und Produktwissen", "Warenpräsentation", "Bestellung und Warenwirtschaft", "Hygiene und Qualität", "Verkaufsorganisation"],
      development: ["Schicht- oder Filialverantwortung", "Verkaufsleitung", "Fachwirt/in im Lebensmittelhandwerk", "Handelsfachwirt/in", "Ausbildung zum/zur Ausbilder/in"]
    },
    "fachmann-restaurants-veranstaltungsgastronomie": {
      fields: ["Restaurants und Hotels", "Bankett und Eventgastronomie", "Catering", "Systemgastronomie", "Gästebetreuung und Veranstaltungsservice"],
      specializations: ["Wein- und Getränkeservice", "Bankettorganisation", "Eventplanung", "Restaurantservice", "Beschwerde- und Qualitätsmanagement"],
      development: ["Schicht- oder Restaurantleitung", "Restaurantmeister/in", "Fachwirt/in im Gastgewerbe", "Hotelbetriebswirt/in", "Betriebsleitung oder Selbstständigkeit"]
    }
  };
  Object.keys(profiles).forEach(function (id) {
    if (window.IndustryAICareerDetails.careers[id]) {
      Object.assign(window.IndustryAICareerDetails.careers[id], profiles[id]);
    }
  });
  window.IndustryAICareerDetails.version = "1.5.0";
})();
