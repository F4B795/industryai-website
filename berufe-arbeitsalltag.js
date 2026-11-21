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
  };

  Object.keys(workdays).forEach(function (id) {
    if (window.IndustryAICareerDetails.careers[id]) {
      window.IndustryAICareerDetails.careers[id].workday = workdays[id];
    }
  });
  window.IndustryAICareerDetails.version = "1.6.0";
})();
