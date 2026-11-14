
/*
 * INDUSTRYAI – Erweiterte Berufsprofile
 * Campus-Welt 04: Gastronomie & Lebensmittel
 *
 * Enthält fünf ausführliche Berufsprofile.
 */

(function () {
  window.IndustryAICareerDetails =
    window.IndustryAICareerDetails || {
      version: "1.0.0",
      careers: {}
    };

  const details = window.IndustryAICareerDetails;
  details.careers = details.careers || {};

  Object.assign(details.careers, {

    "koch": {
      intro:
        "Köche und Köchinnen bereiten Speisen und Menüs zu, organisieren Arbeitsabläufe in der Küche und sorgen für gleichbleibende Qualität.",

      prerequisites: [
        "Interesse an Lebensmitteln, Kochen und Ernährung",
        "Kreativität und Freude am praktischen Arbeiten",
        "Teamfähigkeit und Kommunikationsfähigkeit",
        "Belastbarkeit und konzentriertes Arbeiten unter Zeitdruck",
        "Sorgfalt und Verantwortungsbewusstsein",
        "Bereitschaft zu Schicht-, Wochenend- und Feiertagsarbeit"
      ],

      learning: [
        "Lebensmittel auswählen und fachgerecht lagern",
        "Schneide- und Zubereitungstechniken anwenden",
        "Suppen, Soßen, Fleisch-, Fisch- und Gemüsegerichte zubereiten",
        "Menüs und Speisekarten planen",
        "Portionsgrößen und Lebensmittelkosten kalkulieren",
        "Hygienevorschriften und Lebensmittelsicherheit beachten",
        "Professionelle Küchengeräte bedienen",
        "Arbeitsabläufe in einer Küche organisieren"
      ],

      furtherTraining: [
        "Küchenmeister/in",
        "Diätkoch/Diätköchin",
        "Spezialisierung auf Patisserie",
        "Weiterbildung in Gemeinschaftsverpflegung",
        "Ausbildung zum/zur Ausbilder/in",
        "Weiterbildung im Lebensmittelmanagement"
      ],

      careerPaths: [
        "Einsatz in Restaurants, Hotels oder Großküchen",
        "Spezialisierung auf bestimmte Küchenrichtungen",
        "Übernahme von Verantwortung als Chef de Partie",
        "Weiterentwicklung zum/zur Sous-Chef/in",
        "Leitung einer Küche als Küchenchef/in",
        "Selbstständigkeit mit einem eigenen Gastronomiebetrieb"
      ]
    },

    "baecker": {
      intro:
        "Bäcker und Bäckerinnen stellen Brot, Brötchen, Kleingebäck und weitere Backwaren her. Sie arbeiten mit unterschiedlichen Zutaten, Rezepturen und professionellen Backmaschinen.",

      prerequisites: [
        "Interesse an Lebensmitteln und handwerklicher Herstellung",
        "Freude am praktischen Arbeiten",
        "Sorgfalt und Genauigkeit",
        "Gutes Verständnis für Mengen und Rezepturen",
        "Teamfähigkeit",
        "Bereitschaft zu frühen Arbeitszeiten"
      ],

      learning: [
        "Zutaten und Rohstoffe auswählen",
        "Teige herstellen und verarbeiten",
        "Brot und Brötchen formen",
        "Gär- und Backprozesse überwachen",
        "Backöfen und Produktionsmaschinen bedienen",
        "Qualität und Frische kontrollieren",
        "Lebensmittel hygienisch lagern",
        "Produktionsabläufe organisieren"
      ],

      furtherTraining: [
        "Bäckermeister/in",
        "Betriebswirt/in des Handwerks",
        "Weiterbildung in Lebensmitteltechnik",
        "Spezialisierung auf Sauerteig und Spezialgebäck",
        "Ausbildung zum/zur Ausbilder/in"
      ],

      careerPaths: [
        "Arbeit in Bäckereien und Backbetrieben",
        "Tätigkeit in industriellen Backwarenproduktionen",
        "Übernahme von Verantwortung in der Backstube",
        "Leitung einer Produktionsabteilung",
        "Selbstständigkeit mit einer eigenen Bäckerei"
      ]
    },

    "konditor": {
      intro:
        "Konditoren und Konditorinnen stellen Torten, Kuchen, Pralinen, Desserts und feine Backwaren her. Der Beruf verbindet handwerkliche Präzision mit Kreativität und Gestaltung.",

      prerequisites: [
        "Interesse an Backwaren und Süßspeisen",
        "Kreativität und gestalterisches Geschick",
        "Geduld und Genauigkeit",
        "Sorgfältiger Umgang mit Lebensmitteln",
        "Gutes Verständnis für Rezepturen",
        "Freude an handwerklicher Arbeit"
      ],

      learning: [
        "Teige und Massen herstellen",
        "Cremes und Füllungen zubereiten",
        "Torten und Desserts gestalten",
        "Schokolade und Zucker verarbeiten",
        "Backwaren dekorieren",
        "Zutaten fachgerecht lagern",
        "Produktqualität kontrollieren",
        "Hygienevorschriften beachten"
      ],

      furtherTraining: [
        "Konditormeister/in",
        "Betriebswirt/in des Handwerks",
        "Spezialisierung auf Patisserie",
        "Weiterbildung in Lebensmitteltechnologie",
        "Ausbildung zum/zur Ausbilder/in"
      ],

      careerPaths: [
        "Arbeit in Konditoreien und Cafés",
        "Tätigkeit in Hotel- und Restaurantküchen",
        "Spezialisierung auf Patisserie und Pralinenherstellung",
        "Leitung einer Konditorei",
        "Selbstständigkeit mit einer eigenen Konditorei"
      ]
    },

    "fachverkaeufer-lebensmittelhandwerk": {
      intro:
        "Fachverkäufer und Fachverkäuferinnen im Lebensmittelhandwerk beraten Kunden, präsentieren Lebensmittel und verkaufen Backwaren, Fleisch- oder Konditoreiprodukte. Je nach Fachrichtung unterscheiden sich die Waren und Arbeitsabläufe.",

      prerequisites: [
        "Freude am Umgang mit Menschen",
        "Freundliches und sicheres Auftreten",
        "Kommunikationsfähigkeit",
        "Interesse an Lebensmitteln",
        "Sorgfältige und hygienische Arbeitsweise",
        "Teamfähigkeit und Zuverlässigkeit"
      ],

      learning: [
        "Kunden beraten und Verkaufsgespräche führen",
        "Lebensmittel präsentieren und verkaufen",
        "Warenbestände kontrollieren",
        "Produkte fachgerecht lagern",
        "Bestellungen und Abrechnungen bearbeiten",
        "Lebensmittelhygiene beachten",
        "Produktinformationen und Allergene kennen",
        "Verkaufsflächen ansprechend gestalten"
      ],

      furtherTraining: [
        "Verkaufsleiter/in",
        "Handelsfachwirt/in",
        "Fachwirt/in im Lebensmittelhandwerk",
        "Weiterbildung im Bereich Betriebsführung",
        "Ausbildung zum/zur Ausbilder/in"
      ],

      careerPaths: [
        "Tätigkeit in Bäckereien oder Konditoreien",
        "Arbeit in Fleischereien und Lebensmittelgeschäften",
        "Übernahme von Verantwortung im Verkauf",
        "Leitung einer Filiale",
        "Selbstständigkeit im Lebensmittelhandwerk"
      ]
    },

    "fachmann-restaurants-veranstaltungsgastronomie": {
      intro:
        "Fachleute für Restaurants und Veranstaltungsgastronomie betreuen Gäste, organisieren Serviceabläufe und planen Veranstaltungen. Sie verbinden Gastronomie, Kommunikation und Organisation.",

      prerequisites: [
        "Freude am Umgang mit Gästen",
        "Gute Kommunikationsfähigkeit",
        "Organisationstalent",
        "Teamfähigkeit und Belastbarkeit",
        "Freundliches und professionelles Auftreten",
        "Bereitschaft zu Wochenend- und Abenddiensten"
      ],

      learning: [
        "Gäste empfangen und beraten",
        "Speisen und Getränke servieren",
        "Bestellungen aufnehmen",
        "Serviceabläufe organisieren",
        "Veranstaltungen planen und begleiten",
        "Tische und Veranstaltungsräume vorbereiten",
        "Abrechnungen durchführen",
        "Beschwerden professionell bearbeiten"
      ],

      furtherTraining: [
        "Restaurantmeister/in",
        "Fachwirt/in im Gastgewerbe",
        "Hotelbetriebswirt/in",
        "Weiterbildung im Veranstaltungsmanagement",
        "Ausbildung zum/zur Ausbilder/in"
      ],

      careerPaths: [
        "Tätigkeit in Restaurants und Hotels",
        "Arbeit im Veranstaltungs- und Cateringbereich",
        "Übernahme der Serviceleitung",
        "Leitung eines Restaurants",
        "Management im Gastgewerbe",
        "Selbstständigkeit mit einem Gastronomiebetrieb"
      ]
    }

  });

  details.version = "1.4.0";
})();
