
/*
 * INDUSTRYAI – Erweiterte Berufsprofile
 * Campus-Welt 04: Gastronomie & Lebensmittel
 *
 * Ergänzt bestehende Berufsprofile.
 * Die zentrale Berufedatenbank und Bewertungslogik
 * werden nicht verändert.
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
        "Köche und Köchinnen bereiten Speisen und Menüs zu, organisieren Arbeitsabläufe in der Küche und sorgen für gleichbleibende Qualität. Sie arbeiten mit unterschiedlichen Lebensmitteln, Rezepturen und professionellen Küchengeräten.",

      prerequisites: [
        "Interesse an Lebensmitteln, Kochen und Ernährung",
        "Kreativität und Freude am praktischen Arbeiten",
        "Teamfähigkeit und Kommunikationsfähigkeit",
        "Belastbarkeit und konzentriertes Arbeiten unter Zeitdruck",
        "Sorgfalt und Verantwortungsbewusstsein",
        "Bereitschaft zu Arbeitszeiten am Abend, an Wochenenden und Feiertagen"
      ],

      learning: [
        "Lebensmittel und Zutaten auswählen und fachgerecht lagern",
        "Grundlegende Schneide- und Zubereitungstechniken anwenden",
        "Suppen, Soßen, Fleisch-, Fisch- und Gemüsegerichte zubereiten",
        "Menüs und Speisekarten planen",
        "Portionsgrößen und Lebensmittelkosten kalkulieren",
        "Hygienevorschriften und Lebensmittelsicherheit beachten",
        "Küchengeräte und professionelle Maschinen bedienen",
        "Arbeitsabläufe in einer Küche organisieren"
      ],

      furtherTraining: [
        "Küchenmeister/in",
        "Diätkoch/Diätköchin",
        "Weiterbildung in Gemeinschaftsverpflegung",
        "Spezialisierung auf Patisserie oder bestimmte Küchenrichtungen",
        "Ausbildung zum/zur Ausbilder/in",
        "Weiterbildung im Lebensmittelmanagement"
      ],

      careerPaths: [
        "Einsatz als Koch/Köchin in Restaurants, Hotels oder Großküchen",
        "Spezialisierung auf bestimmte Küchenrichtungen oder Ernährungsformen",
        "Übernahme von Verantwortung als Chef de Partie",
        "Weiterentwicklung zum/zur Sous-Chef/in",
        "Leitung einer Küche als Küchenchef/in",
        "Mit entsprechender Erfahrung auch Selbstständigkeit mit einem eigenen Gastronomiebetrieb"
      ]
    }
  });

  details.version = "1.3.0";
})();
