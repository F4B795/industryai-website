const RECIPIENT = "industryaisupport@gmail.com";
const MAX_LENGTH = 3500;
const DATABASE_PROPERTY = "INDUSTRYAI_COMPANY_DATABASE_ID";
const DATABASE_SHEET = "Unternehmen";

const DATABASE_HEADERS = [
  "id", "status", "name", "category", "categoryLabel", "location",
  "description", "image", "imageAlt", "profile", "tag",
  "contactPerson", "contactEmail", "contactPhone", "website",
  "apprenticeships", "jobs", "media", "workplace", "technology",
  "benefits", "culture", "development", "createdAt"
];

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    if (p.websiteConfirm) return resultPage(true);

    const required = ["companyName", "contactPerson", "contactEmail", "privacyConsent"];
    if (required.some(k => !String(p[k] || "").trim())) {
      throw new Error("Pflichtfelder fehlen.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(p.contactEmail).trim())) {
      throw new Error("Ungültige E-Mail-Adresse.");
    }

    const directoryDraft = {
      id: "anfrage-" + Utilities.getUuid(),
      status: "pending",
      name: clean(p.companyName),
      category: categorySlug(p.sector),
      categoryLabel: clean(p.sector),
      location: clean(p.location),
      description: clean(p.description),
      image: "",
      imageAlt: "",
      profile: "",
      tag: "ENTWURF · NOCH NICHT FREIGEGEBEN",
      contactPerson: clean(p.contactPerson),
      contactEmail: clean(p.contactEmail),
      contactPhone: clean(p.contactPhone),
      website: clean(p.website),
      apprenticeships: clean(p.apprenticeships),
      jobs: clean(p.jobs),
      media: clean(p.media),
      workplace: clean(p.workplace),
      technology: clean(p.technology),
      benefits: clean(p.benefits),
      culture: clean(p.culture),
      development: clean(p.development)
    };

    // Speichert die Anfrage privat als pending – niemals automatisch öffentlich.
    appendPendingRecord(directoryDraft);

    const fields = [
      ["Unternehmen", p.companyName], ["Standort", p.location],
      ["Branche", p.sector], ["Website", p.website],
      ["Beschreibung", p.description],
      ["Ausbildungsberufe / Praktika", p.apprenticeships],
      ["Offene Stellen", p.jobs], ["Mögliche Einblicke", p.media],
      ["Arbeitsumgebung", p.workplace],
      ["Maschinen und Technologien", p.technology],
      ["Mitarbeiterangebote", p.benefits],
      ["Unternehmenskultur", p.culture],
      ["Entwicklungsmöglichkeiten", p.development],
      ["Ansprechpartner", p.contactPerson],
      ["E-Mail", p.contactEmail], ["Telefon", p.contactPhone]
    ];
    const body = fields
      .map(([label, value]) => label + ":\n" + clean(value) + "\n")
      .join("\n");

    MailApp.sendEmail({
      to: RECIPIENT,
      replyTo: String(p.contactEmail).trim(),
      subject: "Neue INDUSTRYAI-Unternehmensprofil-Anfrage: " +
        clean(p.companyName).slice(0, 100),
      body: "Neue Profilanfrage über die INDUSTRYAI-Website.\n\n" +
        body +
        "\nQuelle: " + clean(p.formSource) +
        "\nEinwilligung zur Bearbeitung und Kontaktaufnahme wurde bestätigt." +
        "\n\n--- INTERNER DATENBANK-ENTWURF ---\n" +
        "Status: PENDING – NICHT VERÖFFENTLICHEN.\n" +
        "Datensatz-ID: " + directoryDraft.id +
        "\nEine Veröffentlichung erfolgt erst nach Prüfung und gesonderter Freigabe.\n\n" +
        JSON.stringify(directoryDraft, null, 2)
    });

    return resultPage(true);
  } catch (err) {
    console.error(err.stack || err);
    return resultPage(false);
  }
}

// Öffentliche Schnittstelle: gibt ausschließlich freigegebene Profile zurück.
function doGet() {
  try {
    const sheet = getDatabaseSheet();
    const values = sheet.getDataRange().getValues();
    if (values.length < 2) {
      return jsonOutput({ schemaVersion: 1, entries: [] });
    }
    const headers = values[0].map(String);
    const entries = values.slice(1)
      .map(row => {
        const item = {};
        headers.forEach((header, index) => item[header] = row[index]);
        return item;
      })
      .filter(item => String(item.status).toLowerCase() === "published")
      .map(item => ({
        id: String(item.id || ""),
        status: "published",
        name: String(item.name || ""),
        category: String(item.category || ""),
        categoryLabel: String(item.categoryLabel || ""),
        location: String(item.location || ""),
        description: String(item.description || ""),
        image: String(item.image || ""),
        imageAlt: String(item.imageAlt || ""),
        profile: String(item.profile || ""),
        tag: "INDUSTRYAI UNTERNEHMEN",
        website: String(item.website || ""),
        apprenticeships: String(item.apprenticeships || ""),
        jobs: String(item.jobs || "")
      }));
    return jsonOutput({ schemaVersion: 1, entries: entries });
  } catch (err) {
    console.error(err.stack || err);
    return jsonOutput({ schemaVersion: 1, entries: [], error: "directory_unavailable" });
  }
}

// Einmal manuell im Apps-Script-Editor ausführen.
// Erstellt eine private Google-Tabelle für eingehende Anfragen.
function setupDatabase() {
  const properties = PropertiesService.getScriptProperties();
  let id = properties.getProperty(DATABASE_PROPERTY);
  let spreadsheet;
  if (id) {
    spreadsheet = SpreadsheetApp.openById(id);
  } else {
    spreadsheet = SpreadsheetApp.create("INDUSTRYAI – Unternehmensdatenbank");
    properties.setProperty(DATABASE_PROPERTY, spreadsheet.getId());
  }
  let sheet = spreadsheet.getSheetByName(DATABASE_SHEET);
  if (!sheet) sheet = spreadsheet.insertSheet(DATABASE_SHEET);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, DATABASE_HEADERS.length).setValues([DATABASE_HEADERS]);
    sheet.setFrozenRows(1);
  }
  console.log("Datenbank bereit: " + spreadsheet.getUrl());
  return spreadsheet.getUrl();
}

function appendPendingRecord(record) {
  const sheet = getDatabaseSheet();
  const row = DATABASE_HEADERS.map(header =>
    header === "createdAt" ? new Date() : (record[header] || "")
  );
  sheet.appendRow(row);
}

function getDatabaseSheet() {
  const id = PropertiesService.getScriptProperties().getProperty(DATABASE_PROPERTY);
  if (!id) throw new Error("Datenbank fehlt. Bitte setupDatabase ausführen.");
  const spreadsheet = SpreadsheetApp.openById(id);
  const sheet = spreadsheet.getSheetByName(DATABASE_SHEET);
  if (!sheet) throw new Error("Datenbankblatt fehlt.");
  return sheet;
}

function jsonOutput(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function categorySlug(value) {
  const categories = {
    "Industrie und Technik": "industrie und technik",
    "Handwerk und Bau": "handwerk und bau",
    "Gesundheit und Pflege": "gesundheit und pflege",
    "IT und Digitalisierung": "it und digitalisierung",
    "Gastronomie und Hotellerie": "gastronomie und hotellerie",
    "Handel und Dienstleistungen": "handel und dienstleistungen"
  };
  return categories[String(value || "").trim()] || "andere branche";
}

function clean(value) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .slice(0, MAX_LENGTH)
    .trim();
}

function resultPage(success) {
  const payload = JSON.stringify({
    type: "industryai-form-result",
    success: !!success
  });
  return HtmlService.createHtmlOutput(
    "<!doctype html><html><head><meta charset='utf-8'></head><body><script>" +
    "window.top.postMessage(" + payload + ", '*');" +
    "</script></body></html>"
  );
}

// Einmal im Editor ausführen, um die Mail-Berechtigung anzufordern.
function authorizeMail() {
  const quota = MailApp.getRemainingDailyQuota();
  console.log("Verfügbare E-Mail-Empfänger heute: " + quota);
}
