const RECIPIENT = "industryaisupport@gmail.com";
const MAX_LENGTH = 3500;

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    if (p.websiteConfirm) return resultPage(true);
    const required = ["companyName", "contactPerson", "contactEmail", "privacyConsent"];
    if (required.some(k => !String(p[k] || "").trim())) return resultPage(false);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(p.contactEmail).trim())) return resultPage(false);

    const fields = [
      ["Unternehmen", p.companyName], ["Standort", p.location], ["Branche", p.sector],
      ["Website", p.website], ["Beschreibung", p.description],
      ["Ausbildungsberufe / Praktika", p.apprenticeships], ["Offene Stellen", p.jobs],
      ["Mögliche Einblicke", p.media], ["Arbeitsumgebung", p.workplace],
      ["Maschinen und Technologien", p.technology], ["Mitarbeiterangebote", p.benefits],
      ["Unternehmenskultur", p.culture], ["Entwicklungsmöglichkeiten", p.development],
      ["Ansprechpartner", p.contactPerson],
      ["E-Mail", p.contactEmail], ["Telefon", p.contactPhone]
    ];
    const body = fields.map(([label, value]) => label + ":\n" + clean(value) + "\n").join("\n");
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
    const draftJson = JSON.stringify(directoryDraft, null, 2);
    MailApp.sendEmail({
      to: RECIPIENT,
      replyTo: String(p.contactEmail).trim(),
      subject: "Neue INDUSTRYAI-Unternehmensprofil-Anfrage: " + clean(p.companyName).slice(0, 100),
      body: "Neue Profilanfrage über die INDUSTRYAI-Website.\n\n" + body +
        "\nQuelle: " + clean(p.formSource) +
        "\nEinwilligung zur Bearbeitung und Kontaktaufnahme wurde im Formular bestätigt." +
        "\n\n--- INTERNER DATENBANK-ENTWURF (NICHT VERÖFFENTLICHEN) ---\n" +
        "Status bleibt pending, bis die Angaben geprüft und eine gesonderte Veröffentlichungsfreigabe eingeholt wurde.\n\n" +
        draftJson
    });
    return resultPage(true);
  } catch (err) {
    return resultPage(false);
  }
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
  return String(value || "").replace(/[\u0000-\u001F\u007F]/g, " ").slice(0, MAX_LENGTH).trim();
}

function resultPage(success) {
  const payload = JSON.stringify({ type: "industryai-form-result", success: !!success });
  return HtmlService.createHtmlOutput(
    "<!doctype html><html><head><meta charset='utf-8'></head><body><script>" +
    "window.top.postMessage(" + payload + ", '*');" +
    "</script></body></html>"
  );
}