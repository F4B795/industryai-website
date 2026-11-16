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
      ["Mögliche Einblicke", p.media], ["Ansprechpartner", p.contactPerson],
      ["E-Mail", p.contactEmail], ["Telefon", p.contactPhone]
    ];
    const body = fields.map(([label, value]) => label + ":\n" + clean(value) + "\n").join("\n");
    MailApp.sendEmail({
      to: RECIPIENT,
      replyTo: String(p.contactEmail).trim(),
      subject: "Neue INDUSTRYAI-Unternehmensprofil-Anfrage: " + clean(p.companyName).slice(0, 100),
      body: "Neue Profilanfrage über die INDUSTRYAI-Website.\n\n" + body +
        "\nQuelle: " + clean(p.formSource) +
        "\nEinwilligung zur Bearbeitung und Kontaktaufnahme wurde im Formular bestätigt."
    });
    return resultPage(true);
  } catch (err) {
    return resultPage(false);
  }
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