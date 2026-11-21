/*
 * INDUSTRYAI – Praxisnahe Einblicke in den Arbeitsalltag
 * Campus-Welt 01 und 02: Industrie, Handwerk, Gesundheit
 *
 * Die Abläufe sind beispielhafte Stationen, keine festen Uhrzeiten
 * oder verbindlichen Dienstpläne. Sie variieren je nach Betrieb,
 * Fachrichtung, Auftrag und Einsatzbereich.
 */
(function () {
  "use strict";
  if (!window.IndustryAICareerDetails) return;

  const workdays = {
    "zerspanungsmechaniker": [
      { stage: "Auftrag vorbereiten", detail: "Fertigungsauftrag und technische Zeichnung prüfen, Material sowie Rohteil kontrollieren und den Ablauf mit dem Team abstimmen." },
      { stage: "Maschine rüsten", detail: "Werkzeuge und Spannmittel passend zum Auftrag auswählen, Maschine vorbereiten und das CNC-Programm prüfen oder anpassen." },
      { stage: "Werkstück fertigen", detail: "Probelauf und Erstteilkontrolle durchführen, anschließend Werkstücke bearbeiten und den Prozess überwachen." },
      { stage: "Messen und dokumentieren", detail: "Maße und Oberflächen prüfen, Ergebnisse dokumentieren und bei Abweichungen die Ursache systematisch untersuchen." }
    ],
    "industriemechaniker": [
      { stage: "Arbeitsauftrag klären", detail: "Wartungsplan, technische Unterlagen und Störungsmeldungen prüfen und benötigte Werkzeuge sowie Ersatzteile vorbereiten." },
      { stage: "Montieren oder warten", detail: "Baugruppen montieren, Maschinenkomponenten prüfen oder geplante Wartungsarbeiten an Anlagen durchführen." },
      { stage: "Fehler suchen", detail: "Bei Störungen Symptome eingrenzen, mechanische Ursachen prüfen und geeignete Maßnahmen mit den zuständigen Fachkräften abstimmen." },
      { stage: "Funktion prüfen", detail: "Anlage nach Arbeiten kontrolliert testen, Ergebnisse dokumentieren und den Arbeitsbereich ordentlich übergeben." }
    ],
    "mechatroniker": [
      { stage: "System und Auftrag prüfen", detail: "Schaltpläne, technische Dokumentation und Arbeitsauftrag lesen und benötigte Messmittel sowie Bauteile bereitstellen." },
      { stage: "Komponenten installieren", detail: "Mechanische Baugruppen, elektrische Komponenten, Sensoren oder Aktoren montieren und fachgerecht verbinden." },
      { stage: "Steuerung testen", detail: "Verdrahtung und Funktionen nach Vorgaben prüfen, Steuerungen konfigurieren und Fehler schrittweise eingrenzen." },
      { stage: "Inbetriebnahme dokumentieren", detail: "Das Zusammenspiel der Komponenten testen, Prüfergebnisse festhalten und offene Punkte an das Team übergeben." }
    ],
    "elektroniker-automatisierung": [
      { stage: "Anlage und Schaltunterlagen prüfen", detail: "Automatisierungsaufgabe, Schaltpläne und Sicherheitsvorgaben prüfen und den Arbeitsbereich vorbereiten." },
      { stage: "Sensorik und Steuerung bearbeiten", detail: "Sensoren, Aktoren und Steuerungskomponenten installieren, anschließen oder nach freigegebenen Vorgaben konfigurieren." },
      { stage: "Abläufe testen", detail: "Signale und Programmabläufe kontrolliert prüfen, Fehler eingrenzen und Änderungen nachvollziehbar dokumentieren." },
      { stage: "Anlage übergeben", detail: "Funktionen und Schutzmaßnahmen im vorgesehenen Prüfrahmen kontrollieren und Ergebnisse mit dem Team oder Kunden abstimmen." }
    ],
    "kfz-mechatroniker": [
      { stage: "Fahrzeug annehmen", detail: "Kundenhinweise und Auftrag aufnehmen, Fahrzeugdaten prüfen und den geplanten Diagnose- oder Wartungsumfang klären." },
      { stage: "Prüfen und diagnostizieren", detail: "Sichtprüfungen und vorgeschriebene Diagnoseschritte durchführen sowie Mess- und Diagnosegeräte einsetzen." },
      { stage: "Wartung oder Reparatur", detail: "Bauteile nach Herstellervorgaben warten, einstellen oder ersetzen; bei Bedarf Rücksprache zur weiteren Vorgehensweise halten." },
      { stage: "Abschlusskontrolle", detail: "Durchgeführte Arbeiten und Prüfergebnisse dokumentieren und das Fahrzeug für die Übergabe vorbereiten." }
    ],
    "anlagenmechaniker-shk": [
      { stage: "Einsatz vorbereiten", detail: "Arbeitsauftrag und Anlagenunterlagen prüfen, Material und Werkzeuge zusammenstellen und Besonderheiten am Einsatzort klären." },
      { stage: "Montage durchführen", detail: "Rohrleitungen, Armaturen oder Anlagenkomponenten montieren und dabei technische Vorgaben sowie Sicherheitsregeln beachten." },
      { stage: "Anlage prüfen", detail: "Dichtheit und Funktion im vorgesehenen Umfang kontrollieren, Einstellungen vornehmen und Auffälligkeiten beheben." },
      { stage: "Kunden informieren", detail: "Arbeiten dokumentieren, Bedienung und Wartung erläutern und den Einsatzort ordentlich hinterlassen." }
    ],
    "tischler": [
      { stage: "Planung und Material", detail: "Zeichnungen und Maße prüfen, Material auswählen und Arbeitsschritte für Möbel, Bauteile oder Innenausbau festlegen." },
      { stage: "Zuschnitt und Bearbeitung", detail: "Holz und Holzwerkstoffe an Maschinen oder mit Handwerkzeugen zuschneiden, fräsen, bohren und vorbereiten." },
      { stage: "Zusammenbau und Oberfläche", detail: "Bauteile verbinden, Beschläge montieren und Oberflächen je nach Auftrag schleifen oder behandeln." },
      { stage: "Qualitätsprüfung und Montage", detail: "Maße und Funktion kontrollieren und das Werkstück in der Werkstatt oder beim Kunden montieren." }
    ],
    "fachkraft-metalltechnik-zerspanung": [
      { stage: "Fertigungsauftrag vorbereiten", detail: "Arbeitsunterlagen lesen, Werkstückrohlinge und Werkzeuge bereitstellen und den Maschinenzustand prüfen." },
      { stage: "Werkstück einrichten", detail: "Werkstück nach Vorgabe einspannen, Werkzeuge vorbereiten und die Maschine für den Bearbeitungsschritt rüsten." },
      { stage: "Metall bearbeiten", detail: "Dreh- oder Fräsbearbeitung ausführen, den Prozess beobachten und bei Auffälligkeiten die zuständige Fachkraft informieren." },
      { stage: "Maße kontrollieren", detail: "Werkstücke mit geeigneten Messmitteln prüfen, Ergebnisse festhalten und Teile entsprechend den betrieblichen Vorgaben kennzeichnen." }
    ],
    "elektroniker-betriebstechnik": [
      { stage: "Arbeitsauftrag und Sicherheit", detail: "Anlagenunterlagen und Auftrag prüfen; Arbeiten nur im Rahmen der eigenen Qualifikation und der festgelegten Sicherheitsorganisation vorbereiten." },
      { stage: "Anlage installieren oder warten", detail: "Elektrische Betriebsmittel, Leitungen oder Komponenten montieren und geplante Wartungsarbeiten ausführen." },
      { stage: "Messen und Fehler eingrenzen", detail: "Vorgesehene Prüfungen und Messungen durchführen und Störungen systematisch analysieren." },
      { stage: "Prüfen und dokumentieren", detail: "Arbeitsergebnisse und Messwerte dokumentieren und die Anlage nach vorgeschriebenen Prüf- und Freigabeschritten übergeben." }
    ],
    "pflegefachfrau": [
      { stage: "Übergabe und Pflegeplanung", detail: "Informationen im Team übernehmen, den aktuellen Pflegebedarf berücksichtigen und die anstehenden Aufgaben priorisieren." },
      { stage: "Menschen im Alltag unterstützen", detail: "Bei Körperpflege, Ernährung und Mobilität unterstützen und dabei Selbstbestimmung sowie vorhandene Fähigkeiten beachten." },
      { stage: "Beobachten und handeln", detail: "Veränderungen wahrnehmen, Vitalzeichen im jeweiligen Aufgabenbereich erfassen und Auffälligkeiten fachgerecht weitergeben." },
      { stage: "Dokumentation und Übergabe", detail: "Durchgeführte Maßnahmen und Beobachtungen dokumentieren und wichtige Informationen an das Team übergeben." }
    ],
    "medizinische-fachangestellte": [
      { stage: "Praxis vorbereiten", detail: "Behandlungsräume und Materialien vorbereiten, Termine und Tagesablauf prüfen und den Empfang organisieren." },
      { stage: "Patienten betreuen", detail: "Patientinnen und Patienten empfangen, Anliegen aufnehmen und Abläufe in der Praxis koordinieren." },
      { stage: "Behandlung unterstützen", detail: "Bei Untersuchungen und Behandlungen assistieren und – nach Qualifikation und Delegation – weitere medizinische Aufgaben übernehmen." },
      { stage: "Dokumentation und Organisation", detail: "Behandlungsdaten und organisatorische Vorgänge dokumentieren, Materialbestände prüfen und Folgetermine koordinieren." }
    ],
    "tiermedizinische-fachangestellte": [
      { stage: "Praxis oder Klinik vorbereiten", detail: "Behandlungsräume, Instrumente und Materialien vorbereiten und anstehende Termine sowie Stationsaufgaben prüfen." },
      { stage: "Tiere und Halter betreuen", detail: "Tierhalter empfangen, Informationen aufnehmen und Tiere entsprechend den Praxisabläufen ruhig und umsichtig begleiten." },
      { stage: "Behandlungen unterstützen", detail: "Tierärztinnen und Tierärzte bei Untersuchungen und Eingriffen assistieren sowie Proben und Geräte nach Anweisung vorbereiten." },
      { stage: "Nachbereitung und Dokumentation", detail: "Räume und Instrumente nach Hygienevorgaben aufbereiten, Daten dokumentieren und weitere Abläufe koordinieren." }
    ],
    "erzieher": [
      { stage: "Tagesplanung und Vorbereitung", detail: "Angebote und Aktivitäten vorbereiten, Absprachen im Team treffen und Besonderheiten einzelner Kinder oder Gruppen berücksichtigen." },
      { stage: "Kinder und Jugendliche begleiten", detail: "Den Alltag gestalten, Spiel- und Lernangebote begleiten und soziale Interaktionen aufmerksam beobachten." },
      { stage: "Individuell fördern", detail: "Entwicklungsprozesse wahrnehmen, passende Impulse geben und bei Konflikten oder Unterstützungsbedarf pädagogisch handeln." },
      { stage: "Austausch und Reflexion", detail: "Beobachtungen dokumentieren, mit Team und Bezugspersonen im passenden Rahmen kommunizieren und Angebote reflektieren." }
    ]
    "fachinformatiker-anwendungsentwicklung": [
      { stage: "Anforderungen verstehen", detail: "Mit Auftraggebern oder dem Team klären, welches Problem die Anwendung lösen soll und welche Funktionen benötigt werden." },
      { stage: "Lösung planen", detail: "Aufgaben in kleinere Schritte aufteilen, Daten und Schnittstellen berücksichtigen und eine geeignete technische Umsetzung abstimmen." },
      { stage: "Programmieren und testen", detail: "Code schreiben, vorhandene Komponenten nutzen und einzelne Funktionen mit geeigneten Tests überprüfen." },
      { stage: "Fehler beheben und dokumentieren", detail: "Fehler reproduzieren, Ursachen eingrenzen, Änderungen über Versionsverwaltung nachvollziehbar festhalten und Ergebnisse im Team besprechen." }
    ],
    "fachinformatiker-systemintegration": [
      { stage: "Anfragen und Systeme prüfen", detail: "Supportmeldungen sichten, Auswirkungen einschätzen und relevante Informationen zu Geräten, Benutzern und Netzwerkumgebung sammeln." },
      { stage: "IT-Komponenten einrichten", detail: "Arbeitsplätze, Benutzerkonten, Serverdienste oder Netzwerkkomponenten nach betrieblichen Vorgaben konfigurieren." },
      { stage: "Störungen analysieren", detail: "Verbindungen, Protokolle und Systemmeldungen prüfen, Fehler systematisch eingrenzen und geeignete Lösungen umsetzen." },
      { stage: "Betrieb dokumentieren", detail: "Änderungen und Lösungen dokumentieren, Anwender informieren und offene Aufgaben an zuständige Stellen übergeben." }
    ],
    "mediengestalter": [
      { stage: "Briefing und Ziel klären", detail: "Auftrag, Zielgruppe, Format, Einsatzkanäle und technische Anforderungen mit dem Team oder Auftraggeber abstimmen." },
      { stage: "Konzept und Entwurf", detail: "Ideen entwickeln, Layouts und Gestaltungselemente erstellen und Typografie, Farben sowie Bildsprache aufeinander abstimmen." },
      { stage: "Medien umsetzen", detail: "Grafiken, Bildmaterial und Inhalte mit geeigneter Software bearbeiten und für Digital- oder Printmedien technisch aufbereiten." },
      { stage: "Korrektur und Ausgabe", detail: "Entwürfe prüfen, Feedback einarbeiten, Ausgabeformate kontrollieren und finale Daten für Veröffentlichung oder Produktion bereitstellen." }
    ],
    "bauzeichner": [
      { stage: "Planungsunterlagen sichten", detail: "Aufgabenstellung, vorhandene Pläne und technische Vorgaben prüfen und offene Fragen mit dem Planungsteam abstimmen." },
      { stage: "Zeichnung oder Modell erstellen", detail: "Bauteile, Grundrisse oder technische Details mit CAD- beziehungsweise BIM-Software nach Vorgaben ausarbeiten." },
      { stage: "Maße und Schnittstellen prüfen", detail: "Planstände, Maßangaben und konstruktive Zusammenhänge kontrollieren und Rückmeldungen der Fachplaner einarbeiten." },
      { stage: "Pläne ausgeben und verwalten", detail: "Zeichnungen und Modellstände strukturiert dokumentieren, Planunterlagen für Abstimmungen oder die weitere Planung bereitstellen." }
    ],
    "gestalter-visuelles-marketing": [
      { stage: "Fläche und Zielgruppe analysieren", detail: "Verkaufsfläche, Produkte, Markenauftritt und Zielgruppe betrachten und den Gestaltungsauftrag konkretisieren." },
      { stage: "Gestaltungskonzept entwickeln", detail: "Farben, Materialien, Beleuchtung und Präsentationsformen auswählen und einen umsetzbaren Aufbau planen." },
      { stage: "Präsentation aufbauen", detail: "Dekorationen und Präsentationselemente vorbereiten, Flächen gestalten und Produkte nach dem Konzept arrangieren." },
      { stage: "Wirkung kontrollieren", detail: "Gestaltung auf Ordnung, Sichtbarkeit und Vorgaben prüfen und bei Bedarf Anpassungen mit dem Team abstimmen." }
    ],
    "fachinformatiker-daten-prozessanalyse": [
      { stage: "Prozess verstehen", detail: "Mit Fachabteilungen klären, wie ein Geschäftsprozess abläuft, welche Daten entstehen und wo Probleme oder Medienbrüche auftreten." },
      { stage: "Daten aufbereiten", detail: "Relevante Datenquellen identifizieren, Datenqualität prüfen und Informationen für die Auswertung strukturiert vorbereiten." },
      { stage: "Muster und Potenziale erkennen", detail: "Daten auswerten, Abläufe vergleichen und Ansatzpunkte für Digitalisierung oder Prozessoptimierung herausarbeiten." },
      { stage: "Ergebnisse vermitteln", detail: "Erkenntnisse visualisieren und dokumentieren sowie mögliche Verbesserungen mit den beteiligten Fachbereichen abstimmen." }
    ],
    "fachinformatiker-digitale-vernetzung": [
      { stage: "Vernetzte Umgebung aufnehmen", detail: "Maschinen, IT-Systeme, Netzwerkkomponenten und vorhandene Schnittstellen erfassen und die Anforderungen an den Datenaustausch klären." },
      { stage: "Verbindung konfigurieren", detail: "Netzwerkkomponenten und Schnittstellen nach freigegebenem Konzept einrichten und die Kommunikation zwischen Systemen vorbereiten." },
      { stage: "Kommunikation testen", detail: "Datenübertragung, Verfügbarkeit und Systemreaktionen kontrollieren und Fehler schrittweise eingrenzen." },
      { stage: "Sicherheit und Betrieb dokumentieren", detail: "Konfigurationen, Testergebnisse und Auffälligkeiten dokumentieren und notwendige Sicherheits- oder Betriebsmaßnahmen mit dem Team abstimmen." }
    ],
    "koch": [
      { stage: "Küche vorbereiten", detail: "Speiseplan und Reservierungen prüfen, Zutaten bereitstellen und den Arbeitsplatz nach dem Mise-en-place-Prinzip organisieren." },
      { stage: "Vorbereiten und produzieren", detail: "Lebensmittel waschen, schneiden und vorbereiten sowie Grundprodukte, Beilagen und Komponenten nach Rezeptur herstellen." },
      { stage: "Service begleiten", detail: "Bestellungen koordinieren, Speisen à la minute fertigstellen und Ausgabe sowie Qualität mit dem Küchenteam abstimmen." },
      { stage: "Nachbereitung", detail: "Lebensmittel fachgerecht lagern, Arbeitsflächen und Geräte reinigen, Bestände prüfen und den nächsten Arbeitseinsatz vorbereiten." }
    ],
    "baecker": [
      { stage: "Teige und Zutaten vorbereiten", detail: "Produktionsplan und Rezepturen prüfen, Rohstoffe abwiegen und Teige mit den vorgesehenen Verfahren herstellen." },
      { stage: "Teig aufarbeiten", detail: "Teige teilen, wirken und formen sowie Teigruhe und Gärzeiten entsprechend dem Produktablauf berücksichtigen." },
      { stage: "Backen und kontrollieren", detail: "Backöfen einstellen, Backprozesse überwachen und Farbe, Kruste sowie Qualität der Backwaren prüfen." },
      { stage: "Produktion nachbereiten", detail: "Backwaren für Verkauf oder Weiterverarbeitung bereitstellen, Geräte und Arbeitsbereiche reinigen und Rohstoffe kontrollieren." }
    ],
    "konditor": [
      { stage: "Auftrag und Rezeptur planen", detail: "Bestellungen und benötigte Mengen prüfen, Rezepturen auswählen und Zutaten sowie Arbeitsgeräte bereitstellen." },
      { stage: "Massen und Füllungen herstellen", detail: "Teige, Cremes, Füllungen oder Schokoladenkomponenten fachgerecht zubereiten und Verarbeitungsschritte kontrollieren." },
      { stage: "Produkte zusammensetzen und gestalten", detail: "Torten, Desserts oder Pralinen herstellen, garnieren und nach gestalterischen sowie handwerklichen Vorgaben ausarbeiten." },
      { stage: "Qualität und Lagerung", detail: "Aussehen und Beschaffenheit prüfen, Produkte sachgerecht lagern und Arbeitsgeräte sowie Flächen hygienisch reinigen." }
    ],
    "fachverkaeufer-lebensmittelhandwerk": [
      { stage: "Verkaufsbereich vorbereiten", detail: "Theke und Verkaufsfläche kontrollieren, Waren ansprechend präsentieren und Kennzeichnungen sowie Hygienevorgaben beachten." },
      { stage: "Kunden beraten", detail: "Kundenwünsche aufnehmen, Produkte und Zutaten erläutern und bei Fragen zu Allergenen verlässlich auf die verfügbaren Informationen zurückgreifen." },
      { stage: "Waren verkaufen und pflegen", detail: "Produkte fachgerecht verpacken, Bestellungen bearbeiten und Warenbestände sowie Frische im Blick behalten." },
      { stage: "Abschluss und Nachbestellung", detail: "Verkaufsbereich reinigen, Bestände dokumentieren und benötigte Waren nach betrieblichen Abläufen nachbestellen." }
    ],
    "fachmann-restaurants-veranstaltungsgastronomie": [
      { stage: "Service vorbereiten", detail: "Tisch- und Raumplanung, Reservierungen sowie Veranstaltungsablauf prüfen und benötigte Materialien bereitstellen." },
      { stage: "Gäste empfangen und beraten", detail: "Gäste begrüßen, über Speisen und Getränke informieren und Wünsche oder besondere Anforderungen an das Team weitergeben." },
      { stage: "Service koordinieren", detail: "Bestellungen aufnehmen, Speisen und Getränke servieren und bei Veranstaltungen mit Küche und weiteren Bereichen zusammenarbeiten." },
      { stage: "Abrechnung und Nachbereitung", detail: "Rechnungen erstellen, Feedback aufnehmen, Räume und Arbeitsmittel nachbereiten und den nächsten Service vorbereiten." }
    ],
  };

  Object.keys(workdays).forEach(function (id) {
    if (window.IndustryAICareerDetails.careers[id]) {
      window.IndustryAICareerDetails.careers[id].workday = workdays[id];
    }
  });
  window.IndustryAICareerDetails.version = "1.6.0";
})();
