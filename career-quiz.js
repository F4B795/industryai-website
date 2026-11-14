
/*
 * INDUSTRYAI – Interaktiver Berufscheck
 * Version 1.0
 */

(function () {
  "use strict";

 
  const questions = [
    {
      id: 1,
      category: "alltag",
      title: "Du bekommst ein Möbelstück zum Selbstaufbauen. Wie gehst du vor?",
      type: "single",
      options: [
        { text: "Ich schaue mir den Aufbauplan genau an.", scores: { A: 2, O: 2 } },
        { text: "Ich probiere direkt aus und lerne dabei.", scores: { T: 2, B: 2 } },
        { text: "Ich überlege mir zuerst eine eigene Lösung.", scores: { C: 2, A: 1 } },
        { text: "Ich baue es am liebsten gemeinsam mit jemandem auf.", scores: { S: 2, K: 1 } }
      ]
    },
    {
      id: 2,
      category: "alltag",
      title: "Du organisierst eine Feier mit Freunden. Was übernimmst du am ehesten?",
      type: "single",
      options: [
        { text: "Ich plane Ablauf, Termine und Aufgaben.", scores: { O: 2, A: 1 } },
        { text: "Ich kümmere mich um Musik, Dekoration und Ideen.", scores: { C: 2, K: 1 } },
        { text: "Ich sorge dafür, dass sich alle wohlfühlen.", scores: { S: 2, K: 1 } },
        { text: "Ich kümmere mich spontan um das, was gerade fehlt.", scores: { B: 2, T: 1 } }
      ]
    },
    {
      id: 3,
      category: "alltag",
      title: "Du möchtest ein neues Hobby lernen. Was passt am besten zu dir?",
      type: "single",
      options: [
        { text: "Ich möchte verstehen, wie es genau funktioniert.", scores: { A: 2, L: 2 } },
        { text: "Ich möchte es direkt praktisch ausprobieren.", scores: { T: 2, L: 1 } },
        { text: "Ich lerne gerne gemeinsam mit anderen.", scores: { S: 2, K: 1 } },
        { text: "Ich möchte eigene Ideen und Varianten entwickeln.", scores: { C: 2, L: 1 } }
      ]
    },
    {
      id: 4,
      category: "alltag",
      title: "Ein Freund hat ein Problem. Wie reagierst du?",
      type: "single",
      options: [
        { text: "Ich höre zu und versuche ihn zu verstehen.", scores: { S: 2, K: 2 } },
        { text: "Ich suche nach einer konkreten Lösung.", scores: { A: 2, B: 1 } },
        { text: "Ich helfe direkt bei der Umsetzung.", scores: { T: 1, B: 2 } },
        { text: "Ich versuche, neue Möglichkeiten aufzuzeigen.", scores: { C: 2, A: 1 } }
      ]
    },
    {
      id: 5,
      category: "alltag",
      title: "Du hast einen freien Nachmittag. Was machst du am liebsten?",
      type: "single",
      options: [
        { text: "Ich beschäftige mich mit Technik oder Geräten.", scores: { T: 2, A: 1 } },
        { text: "Ich treffe Freunde oder helfe jemandem.", scores: { S: 2, K: 1 } },
        { text: "Ich gestalte, fotografiere oder erschaffe etwas.", scores: { C: 2, L: 1 } },
        { text: "Ich bin draußen und beschäftige mich mit Natur oder Tieren.", scores: { N: 2, B: 1 } }
      ]
    },
    {
      id: 6,
      category: "alltag",
      title: "Zwei Menschen streiten sich. Was würdest du tun?",
      type: "single",
      options: [
        { text: "Ich versuche, zwischen beiden zu vermitteln.", scores: { S: 2, K: 2 } },
        { text: "Ich suche nach den Ursachen des Konflikts.", scores: { A: 2, O: 1 } },
        { text: "Ich schlage einen konkreten Kompromiss vor.", scores: { K: 2, B: 1 } },
        { text: "Ich halte mich zunächst zurück und beobachte.", scores: { A: 1, O: 1 } }
      ]
    },
    {
      id: 7,
      category: "alltag",
      title: "Du stehst vor einem schwierigen Rätsel oder Problem.",
      type: "single",
      options: [
        { text: "Ich analysiere es Schritt für Schritt.", scores: { A: 2, O: 1 } },
        { text: "Ich probiere verschiedene Lösungen aus.", scores: { T: 1, B: 2 } },
        { text: "Ich suche nach einer ungewöhnlichen Idee.", scores: { C: 2, A: 1 } },
        { text: "Ich bespreche es gerne mit anderen.", scores: { S: 1, K: 2 } }
      ]
    },
    {
      id: 8,
      category: "alltag",
      title: "Ein geplanter Ausflug läuft plötzlich anders als erwartet.",
      type: "single",
      options: [
        { text: "Ich plane schnell eine Alternative.", scores: { O: 2, A: 1 } },
        { text: "Ich reagiere spontan und finde eine Lösung.", scores: { B: 2, T: 1 } },
        { text: "Ich frage die anderen nach ihren Ideen.", scores: { S: 1, K: 2 } },
        { text: "Ich sehe darin eine Gelegenheit für etwas Neues.", scores: { C: 2, L: 1 } }
      ]
    },
    {
      id: 9,
      category: "alltag",
      title: "Eine neue Person kommt in deine Gruppe. Wie verhältst du dich?",
      type: "single",
      options: [
        { text: "Ich spreche sie an und nehme sie mit auf.", scores: { S: 2, K: 2 } },
        { text: "Ich erkläre ihr, wie bei uns alles funktioniert.", scores: { K: 2, O: 1 } },
        { text: "Ich beobachte erst einmal, wie sie sich einfügt.", scores: { A: 1, S: 1 } },
        { text: "Ich schlage eine gemeinsame Aktivität vor.", scores: { S: 1, C: 1, B: 1 } }
      ]
    },
    {
      id: 10,
      category: "alltag",
      title: "Du bemerkst, dass dir ein Fehler passiert ist.",
      type: "single",
      options: [
        { text: "Ich suche die Ursache und korrigiere ihn.", scores: { A: 2, O: 1 } },
        { text: "Ich spreche offen darüber und bitte bei Bedarf um Hilfe.", scores: { K: 2, L: 1 } },
        { text: "Ich kümmere mich sofort um die Folgen.", scores: { B: 2, O: 1 } },
        { text: "Ich überlege, wie ich es beim nächsten Mal besser mache.", scores: { L: 2, A: 1 } }
      ]
    },
    {
      id: 11,
      category: "alltag",
      title: "Jemand lobt dich für etwas. Was freut dich besonders?",
      type: "single",
      options: [
        { text: "Dass ich etwas Schwieriges gelöst habe.", scores: { A: 2, L: 1 } },
        { text: "Dass ich jemandem helfen konnte.", scores: { S: 2, K: 1 } },
        { text: "Dass ich etwas selbst hergestellt oder gestaltet habe.", scores: { T: 1, C: 2 } },
        { text: "Dass ich etwas gut organisiert habe.", scores: { O: 2, B: 1 } }
      ]
    },
    {
      id: 12,
      category: "alltag",
      title: "Du möchtest eine persönliche Herausforderung meistern.",
      type: "single",
      options: [
        { text: "Ich setze mir einen Plan und arbeite ihn ab.", scores: { O: 2, L: 1 } },
        { text: "Ich stürze mich hinein und lerne unterwegs.", scores: { B: 2, L: 1 } },
        { text: "Ich hole mir Tipps und Unterstützung.", scores: { K: 1, S: 1, L: 1 } },
        { text: "Ich suche meinen eigenen Weg.", scores: { C: 2, A: 1 } }
      ]
    },

    {
      id: 13,
      category: "selbstbild",
      title: "Ich bleibe auch an einer schwierigen Aufgabe dran.",
      type: "scale",
      dimension: "L"
    },
    {
      id: 14,
      category: "selbstbild",
      title: "Ich erkenne gerne logische Zusammenhänge und löse knifflige Probleme.",
      type: "scale",
      dimension: "A"
    },
    {
      id: 15,
      category: "selbstbild",
      title: "Ich merke schnell, wenn andere Menschen Unterstützung brauchen.",
      type: "scale",
      dimension: "S"
    },
    {
      id: 16,
      category: "selbstbild",
      title: "Ich kann meine Gedanken und Ideen gut erklären.",
      type: "scale",
      dimension: "K"
    },
    {
      id: 17,
      category: "selbstbild",
      title: "Ich entwickle gerne eigene Ideen und kreative Lösungen.",
      type: "scale",
      dimension: "C"
    },
    {
      id: 18,
      category: "selbstbild",
      title: "Ich plane gerne und behalte Aufgaben und Termine im Blick.",
      type: "scale",
      dimension: "O"
    },
    {
      id: 19,
      category: "selbstbild",
      title: "Ich interessiere mich für Natur, Tiere und Umwelt.",
      type: "scale",
      dimension: "N"
    },
    {
      id: 20,
      category: "selbstbild",
      title: "Wenn etwas Unerwartetes passiert, finde ich meistens einen Weg damit umzugehen.",
      type: "scale",
      dimension: "B"
    },
    {
      id: 21,
      category: "selbstbild",
      title: "Ich probiere gerne neue Dinge aus und lerne neue Fähigkeiten.",
      type: "scale",
      dimension: "L"
    },
    {
      id: 22,
      category: "selbstbild",
      title: "Ich arbeite gerne praktisch mit Werkzeugen, Geräten oder Materialien.",
      type: "scale",
      dimension: "T"
    },

    {
      id: 23,
      category: "arbeitsinteressen",
      title: "Welche dieser Tätigkeiten würdest du gerne ausprobieren?",
      type: "multiple",
      maxSelections: 3,
      options: [
        { text: "Maschinen und technische Geräte bedienen", tags: ["maschinen","technik"] },
        { text: "Computerprogramme entwickeln", tags: ["software","programmieren"] },
        { text: "Menschen beraten oder unterstützen", tags: ["menschen","helfen"] },
        { text: "Dinge gestalten oder kreativ arbeiten", tags: ["design","kreativ"] },
        { text: "Abläufe planen und organisieren", tags: ["organisation","planung"] },
        { text: "Mit Tieren oder Pflanzen arbeiten", tags: ["tiere","natur"] },
        { text: "Probleme untersuchen und Lösungen finden", tags: ["probleme_loesen","logik"] },
        { text: "Veranstaltungen oder Projekte organisieren", tags: ["veranstaltungen","organisation"] }
      ]
    },
    {
      id: 24,
      category: "arbeitsinteressen",
      title: "Wo könntest du dir deinen Arbeitsalltag am ehesten vorstellen?",
      type: "multiple",
      maxSelections: 2,
      options: [
        { text: "In einer Werkstatt oder Produktionshalle", value: "Werkstatt" },
        { text: "Im Büro oder am Computer", value: "Büro" },
        { text: "Draußen in der Natur", value: "im Freien" },
        { text: "In einem Labor oder medizinischen Bereich", value: "Labor" },
        { text: "Im Kontakt mit Kunden oder Besuchern", value: "Kundenbereich" },
        { text: "Unterwegs an wechselnden Einsatzorten", value: "beim Kunden" },
        { text: "In einer Küche oder Gastronomie", value: "Küche" },
        { text: "Ich bin noch offen", value: "offen" }
      ]
    },
    {
      id: 25,
      category: "arbeitsinteressen",
      title: "Wie arbeitest du am liebsten?",
      type: "single",
      options: [
        { text: "Am liebsten selbstständig und allein", value: "low" },
        { text: "Am liebsten im Team", value: "high" },
        { text: "Eine Mischung aus beidem", value: "mixed" },
        { text: "Das hängt von der Aufgabe ab", value: "mixed" }
      ]
    },
    {
      id: 26,
      category: "arbeitsinteressen",
      title: "Wie stehst du zu körperlicher und praktischer Arbeit?",
      type: "single",
      options: [
        { text: "Ich möchte überwiegend praktisch und körperlich arbeiten.", value: "high" },
        { text: "Eine Mischung aus praktisch und am Schreibtisch ist ideal.", value: "medium" },
        { text: "Ich bevorzuge eher leichte körperliche Arbeit.", value: "low" },
        { text: "Ich bin noch unentschlossen.", value: null }
      ]
    },
    {
      id: 27,
      category: "arbeitsinteressen",
      title: "Wie viel Kontakt mit anderen Menschen möchtest du bei der Arbeit?",
      type: "single",
      options: [
        { text: "Sehr viel Kontakt und Austausch", value: "very_high" },
        { text: "Regelmäßigen Kontakt", value: "high" },
        { text: "Gelegentlichen Kontakt", value: "medium" },
        { text: "Lieber überwiegend für mich arbeiten", value: "low" }
      ]
    },
    {
      id: 28,
      category: "arbeitsinteressen",
      title: "Wie gerne arbeitest du mit Details und Genauigkeit?",
      type: "single",
      options: [
        { text: "Sehr gerne, ich achte auf jedes Detail.", value: "high" },
        { text: "Wenn es für die Aufgabe wichtig ist.", value: "medium" },
        { text: "Ich arbeite lieber mit dem großen Ganzen.", value: "low" },
        { text: "Das kann ich noch nicht einschätzen.", value: null }
      ]
    },
    {
      id: 29,
      category: "arbeitsinteressen",
      title: "Was passt besser zu deinem gewünschten Arbeitsalltag?",
      type: "single",
      options: [
        { text: "Klare Abläufe und wiederkehrende Aufgaben", value: "high" },
        { text: "Eine Mischung aus Routine und Abwechslung", value: "mixed" },
        { text: "Jeden Tag neue Aufgaben und Herausforderungen", value: "low" },
        { text: "Ich bin noch offen.", value: null }
      ]
    },
    {
      id: 30,
      category: "arbeitsinteressen",
      title: "Wie viel Verantwortung möchtest du übernehmen?",
      type: "single",
      options: [
        { text: "Ich möchte gerne Verantwortung übernehmen.", value: "high" },
        { text: "Schrittweise mehr Verantwortung übernehmen.", value: "medium" },
        { text: "Ich möchte zunächst klare Aufgaben haben.", value: "low" },
        { text: "Das weiß ich noch nicht.", value: null }
      ]
    },
    {
      id: 31,
      category: "arbeitsinteressen",
      title: "Welche Arbeitszeiten kannst du dir vorstellen?",
      type: "single",
      options: [
        { text: "Regelmäßige Arbeitszeiten am Tag", value: "regular" },
        { text: "Früher Arbeitsbeginn", value: "early" },
        { text: "Schichtarbeit wäre für mich in Ordnung.", value: "okay" },
        { text: "Auch abends oder am Wochenende arbeiten", value: "prefer" },
        { text: "Ich bin noch offen.", value: null }
      ]
    },
    {
      id: 32,
      category: "arbeitsinteressen",
      title: "Wie lernst du neue Dinge am liebsten?",
      type: "single",
      options: [
        { text: "Durch praktisches Ausprobieren", tags: ["handwerk","technik"] },
        { text: "Durch Erklärungen und Lesen", tags: ["logik","lernen"] },
        { text: "Indem ich anderen zuschaue und es nachmache", tags: ["technik","lernen"] },
        { text: "Gemeinsam mit anderen", tags: ["team","kommunikation"] },
        { text: "Durch eigene Projekte", tags: ["kreativ","probleme_loesen"] }
      ]
    },

    {
      id: 33,
      category: "interessen",
      title: "Welche Themen interessieren dich besonders?",
      description: "Wähle bis zu fünf Themen aus.",
      type: "multiple",
      maxSelections: 5,
      options: [
        { text: "Maschinen, Technik und Fahrzeuge", tags: ["maschinen","technik","fahrzeuge"] },
        { text: "Computer, Software und Digitalisierung", tags: ["computer","software","digital"] },
        { text: "Naturwissenschaften und Forschung", tags: ["logik","forschung","technik"] },
        { text: "Menschen, Gesundheit und Medizin", tags: ["menschen","gesundheit","medizin"] },
        { text: "Sprachen und Kommunikation", tags: ["kommunikation","menschen"] },
        { text: "Kunst, Medien und Design", tags: ["kreativ","design","fotografie"] },
        { text: "Wirtschaft und Organisation", tags: ["wirtschaft","organisation"] },
        { text: "Tiere, Pflanzen und Umwelt", tags: ["tiere","pflanzen","natur"] },
        { text: "Sport und Bewegung", tags: ["bewegung","menschen"] },
        { text: "Erfindungen und Zukunftstechnologien", tags: ["technik","digital","entwicklung"] }
      ]
    },
    {
      id: 34,
      category: "interessen",
      title: "Was motiviert dich besonders?",
      description: "Wähle bis zu drei Antworten.",
      type: "multiple",
      maxSelections: 3,
      options: [
        { text: "Etwas mit den eigenen Händen erschaffen", tags: ["handwerk","technik"] },
        { text: "Schwierige Probleme lösen", tags: ["probleme_loesen","logik"] },
        { text: "Anderen Menschen helfen", tags: ["helfen","menschen"] },
        { text: "Menschen beraten oder überzeugen", tags: ["kommunikation","menschen"] },
        { text: "Eigene Ideen verwirklichen", tags: ["kreativ","design"] },
        { text: "Dinge planen und organisieren", tags: ["organisation","planung"] },
        { text: "Mit Tieren oder Natur arbeiten", tags: ["tiere","natur"] },
        { text: "Direkt handeln und Ergebnisse sehen", tags: ["handwerk","probleme_loesen"] },
        { text: "Immer wieder etwas Neues lernen", tags: ["lernen","entwicklung"] }
      ]
    },
    {
      id: 35,
      category: "werte",
      title: "Was ist dir bei einem späteren Beruf besonders wichtig?",
      description: "Wähle bis zu drei Punkte.",
      type: "multiple",
      maxSelections: 3,
      options: [
        { text: "Ein sicherer Arbeitsplatz", value: "sicherheit" },
        { text: "Gutes Einkommen", value: "einkommen" },
        { text: "Anderen Menschen helfen", value: "helfen" },
        { text: "Kreativität und eigene Ideen", value: "kreativitaet" },
        { text: "Selbstständig arbeiten können", value: "selbststaendigkeit" },
        { text: "Ein gutes Team", value: "teamwork" },
        { text: "Mit moderner Technik arbeiten", value: "technik" },
        { text: "Nachhaltigkeit und Umweltschutz", value: "nachhaltigkeit" },
        { text: "Weiterbildung und Entwicklung", value: "entwicklung" },
        { text: "Abwechslungsreiche Aufgaben", value: "abwechslung" }
      ]
    },
    {
      id: 36,
      category: "werte",
      title: "Was würdest du bei einem Beruf möglichst vermeiden wollen?",
      description: "Wähle bis zu drei Punkte. Das schließt keinen Beruf automatisch aus.",
      type: "multiple",
      maxSelections: 3,
      options: [
        { text: "Sehr viel Kundenkontakt", value: "viel_kundenkontakt" },
        { text: "Körperlich anstrengende Arbeit", value: "koerperliche_arbeit" },
        { text: "Den ganzen Tag am Bildschirm sitzen", value: "viel_bildschirm" },
        { text: "Schichtarbeit oder Wochenendarbeit", value: "schichtarbeit" },
        { text: "Starker Zeitdruck", value: "zeitdruck" },
        { text: "Viel Verantwortung", value: "verantwortung" },
        { text: "Immer wieder dieselben Aufgaben", value: "routine" },
        { text: "Ständig wechselnde Aufgaben", value: "wechsel" },
        { text: "Kontakt mit Krankheit oder Verletzungen", value: "krankheit" },
        { text: "Arbeit bei jedem Wetter draußen", value: "wetter" },
        { text: "Nichts davon – ich bin offen.", value: "keine" }
      ]
    },
    {
      id: 37,
      category: "zukunft",
      title: "Welcher Bildungsweg könnte zu dir passen?",
      type: "single",
      options: [
        { text: "Eine duale Ausbildung im Betrieb", value: "dual" },
        { text: "Eine schulische Ausbildung", value: "school_based" },
        { text: "Ein Studium an einer Hochschule", value: "university" },
        { text: "Eine Ausbildung mit späterer Weiterbildung", value: "further_education" },
        { text: "Ein duales Studium", value: "dual_study" },
        { text: "Ich möchte mich noch nicht festlegen.", value: "open" }
      ]
    },
    {
      id: 38,
      category: "zukunft",
      title: "In welchem Bereich möchtest du dich gerne weiterentwickeln?",
      description: "Wähle bis zu drei Bereiche.",
      type: "multiple",
      maxSelections: 3,
      options: [
        { text: "Technik und Handwerk", tags: ["technik","handwerk"] },
        { text: "Analysieren und Probleme lösen", tags: ["logik","probleme_loesen"] },
        { text: "Soziales und Gesundheit", tags: ["menschen","gesundheit"] },
        { text: "Kommunikation und Sprachen", tags: ["kommunikation"] },
        { text: "Kreativität und Gestaltung", tags: ["kreativ","design"] },
        { text: "Organisation und Planung", tags: ["organisation"] },
        { text: "Natur und Umwelt", tags: ["natur","umwelt"] },
        { text: "Selbstständigkeit und Verantwortung", tags: ["verantwortung"] },
        { text: "Digitalisierung und Computer", tags: ["digital","computer"] }
      ]
    },
    {
      id: 39,
      category: "zukunft",
      title: "Hast du bereits Erfahrungen in einem dieser Bereiche gesammelt?",
      description: "Mehrfachauswahl möglich. Keine Erfahrung zu haben ist völlig in Ordnung.",
      type: "multiple",
      options: [
        { text: "Schulpraktikum", value: "praktikum" },
        { text: "Vereinsarbeit oder Ehrenamt", value: "ehrenamt" },
        { text: "Eigene Projekte oder Reparaturen", value: "projekte" },
        { text: "Nebenjob", value: "nebenjob" },
        { text: "Familie oder Bekannte unterstützt", value: "familie" },
        { text: "Noch keine besonderen Erfahrungen", value: "keine" }
      ]
    },
    {
      id: 40,
      category: "zukunft",
      title: "Gibt es einen Beruf, den du unbedingt einmal ausprobieren möchtest?",
      description: "Du kannst bis zu drei Berufe auswählen oder einen eigenen Wunsch eintragen.",
      type: "multiple",
      maxSelections: 3,
      options: [
        { text: "Zerspanungsmechaniker/in", value: "zerspanungsmechaniker" },
        { text: "Mechatroniker/in", value: "mechatroniker" },
        { text: "Fachinformatiker/in", value: "fachinformatiker-anwendungsentwicklung" },
        { text: "Pflegefachfrau/-mann", value: "pflegefachfrau" },
        { text: "Mediengestalter/in", value: "mediengestalter" },
        { text: "Fotograf/in", value: "fotograf" },
        { text: "Landwirt/in", value: "landwirt" },
        { text: "Koch/Köchin", value: "koch" },
        { text: "Einen anderen Beruf", value: "anderer-beruf" },
        { text: "Ich habe noch keine Vorstellung", value: "offen" }
           ]
    }
  ];

  const answers = {};
  let currentQuestion = 0;

  const startButton = document.getElementById(
    "career-check-start"
  );

  const app = document.getElementById(
    "career-check-app"
  );

  const questionContainer = document.getElementById(
    "career-question-container"
  );

  const progressText = document.getElementById(
    "career-progress-text"
  );

  const progressBar = document.getElementById(
    "career-progress-bar"
  );

  const backButton = document.getElementById(
    "career-back"
  );

  const nextButton = document.getElementById(
    "career-next"
  );

  const resultsContainer = document.getElementById(
    "career-results"
  );

  function updateProgress() {
    const progress =
      ((currentQuestion + 1) / questions.length) * 100;

    progressText.textContent =
      "Frage " + (currentQuestion + 1) +
      " von " + questions.length;

    progressBar.style.width = progress + "%";

    backButton.disabled = currentQuestion === 0;

    nextButton.textContent =
      currentQuestion === questions.length - 1
        ? "Auswertung anzeigen"
        : "Weiter";
  }

  function startQuiz() {
    document.querySelector(
      ".ia-career-check .ia-check-heading"
    ).hidden = true;

    app.hidden = false;

    renderQuestion();
  }

 
  function renderQuestion() {
    const question = questions[currentQuestion];

    if (!question) return;

    updateProgress();
    questionContainer.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = question.title;
    questionContainer.appendChild(heading);

    if (question.description) {
      const description = document.createElement("p");
      description.textContent = question.description;
      questionContainer.appendChild(description);
    }

    const answerArea = document.createElement("div");
    answerArea.className = "career-answer-options";

    const saved = answers[question.id];

    function createOption(option, index, inputType) {
      const label = document.createElement("label");
      label.className = "career-answer-option";

      const input = document.createElement("input");
      input.type = inputType;
      input.name = "question-" + question.id;
      input.value = String(index);

      if (inputType === "checkbox") {
        input.checked = Array.isArray(saved) && saved.includes(index);
      } else {
        input.checked = saved === index;
      }

      input.addEventListener("change", () => {
        if (inputType === "checkbox") {
          const selected = Array.isArray(answers[question.id])
            ? [...answers[question.id]]
            : [];

          if (input.checked) {
            if (
              question.maxSelections &&
              selected.length >= question.maxSelections
            ) {
              input.checked = false;
              return;
            }
            selected.push(index);
          } else {
            const position = selected.indexOf(index);
            if (position !== -1) selected.splice(position, 1);
          }

          answers[question.id] = selected;
        } else {
          answers[question.id] = index;
        }
      });

      const text = document.createElement("span");
      text.textContent = option.text;

      label.appendChild(input);
      label.appendChild(text);
      answerArea.appendChild(label);
    }

    if (question.type === "scale") {
      const scaleLabels = [
        "Trifft gar nicht zu",
        "Trifft eher nicht zu",
        "Teils / teils",
        "Trifft eher zu",
        "Trifft völlig zu"
      ];

      scaleLabels.forEach((text, index) => {
        createOption({ text }, index + 1, "radio");
      });
    } else {
      (question.options || []).forEach((option, index) => {
        const inputType =
          question.type === "multiple" ? "checkbox" : "radio";

        createOption(option, index, inputType);
      });
    }

    questionContainer.appendChild(answerArea);
  }



  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  }


  function previousQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  }

  startButton.addEventListener("click", startQuiz);

  nextButton.addEventListener("click", nextQuestion);

  backButton.addEventListener("click", previousQuestion);

  function finishQuiz() {
    const dimensions = ["T", "A", "S", "K", "C", "O", "N", "B", "L"];
    const points = {};
    const maximum = {};

    dimensions.forEach((dimension) => {
      points[dimension] = 0;
      maximum[dimension] = 0;
    });

    const selectedTags = [];
    const locations = [];
    const desiredCareers = [];
    const values = [];
    const avoidances = [];

    // Alltagssituationen ergeben das Interessen- und Verhaltensprofil.
   
    questions.filter(q => q.category === "alltag").forEach(question => {
      const selectedIndex = answers[question.id];
      if (selectedIndex === undefined) return;

      const selected = question.options[selectedIndex];

      dimensions.forEach(dimension => {
        const questionMaximum = Math.max(
          ...question.options.map(option =>
            Number(option.scores?.[dimension] || 0)
          )
        );

        if (questionMaximum > 0) {
          points[dimension] += Number(
            selected.scores?.[dimension] || 0
          );

          maximum[dimension] += questionMaximum;
        }
      });
    });


      dimensions.forEach(dimension => {
        points[dimension] += Number(
          selected.scores?.[dimension] || 0
        );
      });
    });

    const profile = {};

    dimensions.forEach(dimension => {
      profile[dimension] = maximum[dimension] > 0
        ? Math.round(points[dimension] / maximum[dimension] * 100)
        : null;
    });

    // Interessen aus Mehrfach- und Einzelantworten sammeln.
    [23, 32, 33, 34, 38].forEach(id => {
      const question = questions.find(q => q.id === id);
      if (!question || answers[id] === undefined) return;

      const indexes = Array.isArray(answers[id])
        ? answers[id]
        : [answers[id]];

      indexes.forEach(index => {
        const option = question.options[index];
        if (option?.tags) selectedTags.push(...option.tags);
      });
    });

    // Arbeitsbedingungen übernehmen.
    const selectedLocations = answers[24] || [];
    selectedLocations.forEach(index => {
      const value = questions.find(q => q.id === 24).options[index].value;
      if (value !== "offen") locations.push(value);
    });

    function selectedValue(id) {
      const question = questions.find(q => q.id === id);
      const answer = answers[id];

      return question && answer !== undefined
        ? question.options[answer]?.value
        : null;
    }

    const teamwork = selectedValue(25);
    const physicalActivity = selectedValue(26);
    const peopleContact = selectedValue(27);
    const routine = selectedValue(29);
    const responsibility = selectedValue(30);
    const shiftWork = selectedValue(31);

    // Werte und persönliche Wünsche.
    [35].forEach(id => {
      const question = questions.find(q => q.id === id);
      (answers[id] || []).forEach(index => {
        const value = question.options[index].value;
        if (value) values.push(value);
      });
    });

    const avoidQuestion = questions.find(q => q.id === 36);
    (answers[36] || []).forEach(index => {
      const value = avoidQuestion.options[index].value;
      if (value && value !== "keine") avoidances.push(value);
    });

    const desiredQuestion = questions.find(q => q.id === 40);
    (answers[40] || []).forEach(index => {
      const value = desiredQuestion.options[index].value;

      if (
        value &&
        value !== "offen" &&
        value !== "anderer-beruf"
      ) {
        desiredCareers.push(value);
      }
    });

    const evaluationInput = {
      profile,
      interests: selectedTags,
      values,
      desiredCareers,
      avoidances,
     preferences: {
  locations,
  teamwork,
  physicalActivity,
  peopleContact,
  routine,
  responsibility,
  shiftWork,
  values
}
    };

    const database = window.IndustryAICareers;
    const evaluator = window.IndustryAICareerCheck;

    if (!database || !evaluator) {
      resultsContainer.textContent =
        "Die Auswertung konnte nicht geladen werden. Bitte lade die Seite neu.";
      resultsContainer.hidden = false;
      app.hidden = true;
      return;
    }

    const result = evaluator.evaluate(
      evaluationInput,
      database,
      { limit: 5 }
    );

    showResults(result);
  }

  function showResults(result) {
    app.hidden = true;
    resultsContainer.hidden = false;
    resultsContainer.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = "Deine möglichen Berufswege";
    resultsContainer.appendChild(heading);

    const introduction = document.createElement("p");
    introduction.textContent =
      "Diese Berufe passen nach deinen Antworten zu deinen Interessen und Vorstellungen. " +
      "Sie sind Vorschläge zum Entdecken – keine endgültige Entscheidung.";
    resultsContainer.appendChild(introduction);

    result.results.forEach((career, index) => {
      const card = document.createElement("article");
      card.className = "career-result-card";

      const title = document.createElement("h3");
      title.textContent = (index + 1) + ". " + career.name;
      card.appendChild(title);

      const match = document.createElement("p");
      match.textContent = career.match === null
        ? "Noch keine ausreichenden Angaben für einen Vergleich."
        : "Profil-Übereinstimmung: " + career.match + " %";
      card.appendChild(match);

      if (career.requestedByUser) {
        const desired = document.createElement("p");
        desired.textContent = "Diesen Beruf hast du selbst ausgewählt.";
        card.appendChild(desired);
      }

      if (career.dayToDay) {
        const day = document.createElement("p");
        day.textContent = career.dayToDay;
        card.appendChild(day);
      }

      if (career.activities.length) {
        const list = document.createElement("ul");

        career.activities.forEach(activity => {
          const item = document.createElement("li");
          item.textContent = activity;
          list.appendChild(item);
        });

        card.appendChild(list);
      }

      career.conflictNotes.forEach(note => {
        const warning = document.createElement("p");
        warning.textContent = note;
        card.appendChild(warning);
      });

      resultsContainer.appendChild(card);
    });

    const disclaimer = document.createElement("p");
    disclaimer.textContent = result.disclaimer;
    resultsContainer.appendChild(disclaimer);

    const restart = document.createElement("button");
    restart.type = "button";
    restart.textContent = "Berufscheck erneut starten";

    restart.addEventListener("click", () => {
      Object.keys(answers).forEach(key => delete answers[key]);
      currentQuestion = 0;
      resultsContainer.hidden = true;
      app.hidden = false;
      renderQuestion();
    });

    resultsContainer.appendChild(restart);
  }

})();
