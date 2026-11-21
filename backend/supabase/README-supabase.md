# INDUSTRYAI – Supabase backend

Die Website liegt auf GitHub Pages. Supabase stellt PostgreSQL, Authentifizierung und die serverseitige Formularannahme bereit.

## Aktueller Projektstand – 21.11.2026

Supabase-Projekt: `industryai-backend`  
Region: `eu-west-1` (West EU, Irland)  
Projektstatus: `ACTIVE_HEALTHY`

Vier Tabellen sind vorhanden und RLS ist aktiviert:
- `company_submissions`: private Unternehmensanfragen einschließlich Ansprechpartner und interner Prüfanmerkungen.
- `industryai_admins`: Allowlist der Administrator-Benutzer-UUIDs.
- `company_public_profiles`: ausschließlich ausdrücklich freigegebene öffentliche Profilangaben.
- `contact_messages`: private Nachrichten aus dem öffentlichen Kontaktformular; nur das freigeschaltete Admin-Konto kann sie lesen, bearbeiten oder löschen.

Ein Administrator ist in `industryai_admins` eingetragen. Die Admin-Hilfsfunktion liegt im nicht exponierten Schema `private`. Die interne Review-Seite authentifiziert den Benutzer und prüft zusätzlich dessen UUID in `industryai_admins`.

## Edge Function: öffentliche Profilanfrage

Das Cloudflare-Turnstile-Widget `INDUSTRYAI Profilanfrage` ist im verbundenen Cloudflare-Konto eingerichtet:
- Modus: `managed`
- erlaubter Hostname: `industryai.github.io`
- Region: `world`
- öffentlicher Sitekey: in `js/supabase-config.js`
- privater Secret Key: ausschließlich als Supabase-Edge-Function-Secret, nicht in GitHub oder Browser-Code

Der Cloudflare-Secret-Fingerprint wurde mit dem in Supabase gespeicherten Secret-Fingerprint abgeglichen. Der Secret-Wert selbst wird nicht ausgegeben oder in Dateien gespeichert.

Die Edge Function `company-profile-submit` ist in Supabase deployed und aktiv (Version 3). Sie ist für den öffentlichen Browseraufruf mit `verify_jwt=false` konfiguriert; die Funktion führt ihre eigene Prüfung durch:
- exakter Website-Origin `https://industryai.github.io`
- projektbezogener Publishable Key im `apikey`-Header
- gültiges Cloudflare-Turnstile-Token mit erwartetem Hostname und erwarteter Action
- Eingabegrößen, Pflichtfelder, E-Mail-Format und HTTP(S)-Website-URLs
- serverseitige Anfragelimits auf Basis von HMAC-geschützten IP- und E-Mail-Kennungen

Die Funktion verwendet den Supabase Secret Key ausschließlich serverseitig. Sie schreibt nur die ausdrücklich erlaubten Profildaten in `company_submissions`; Status und interne Notizen werden nicht vom Browser angenommen.

### Edge Function Secrets

Die folgenden drei benutzerdefinierten Secrets sind im Supabase-Projekt angelegt:
- `CLOUDFLARE_TURNSTILE_SECRET_KEY`
- `INDUSTRYAI_RATE_LIMIT_HMAC_SECRET`
- `INDUSTRYAI_PUBLIC_SUBMISSIONS_ENABLED`

Der aktuelle Server-Schalter ist `false`. Sein SHA-256-Fingerprint wurde mit dem bekannten Fingerprint des Textwerts `false` abgeglichen. Die Edge Function lehnt öffentliche Einreichungen deshalb weiterhin ab.

Der HMAC-Secret-Wert wird von Supabase nicht im Klartext zurückgegeben. Seine Mindestlänge wird durch die Edge Function auf mindestens 32 Zeichen geprüft. Da der Server-Schalter derzeit vor dieser Prüfung abbricht, ist diese Laufzeitprüfung noch offen und muss bei einem kontrollierten Funktionstest nachgeholt werden.

Supabase stellt der Edge Function die Standardvariable `SUPABASE_SECRET_KEYS` bereit. Der zugehörige Secret Key darf niemals in GitHub oder Browser-Code erscheinen.

## Website-Dateien

- `js/supabase-config.js`: öffentliche Projekt-URL, Publishable Key, Turnstile-Sitekey und browserseitiger Einreichungsschalter.
- `betrieb-start.html`: Profilformular, Honeypot, Turnstile-Widget und Aufruf der Edge Function; öffentlicher Versand bleibt deaktiviert.
- `backend/supabase/functions/company-profile-submit/index.ts`: serverseitige Validierung, Turnstile, HMAC-Rate-Limits und private Datenbankeinfügung.
- `profilpruefung-intern.html`: Supabase-Auth, Admin-Allowlist, Prüfstatus, interne Notizen und manuelle Veröffentlichung.
- `unternehmenswelt.html`: lädt nur Datensätze mit `is_published = true`.
- `unternehmen-profil.html`: Detailseite eines freigegebenen Profils.

## Datenbankmigrationen und Änderungen

Die Datenbankbasis und die Migrationen 002–004 wurden im Supabase-Projekt angewendet. Die HMAC-Rate-Limit-Tabelle, die service-role-only RPC-Funktion und die INSERT/SELECT-Rechte der Edge Function wurden danach direkt über den Supabase SQL-Zugang angelegt. Der vollständige Wiederaufbau-SQL-Stand ist in `schema.sql` und der entsprechende Delta-Stand in `migrations/005_company_profile_rate_limits.sql` dokumentiert.

## Öffentliche Einreichung derzeit bewusst deaktiviert

Die öffentliche Einreichung ist zweifach geschlossen:
- Browser-Schalter: `window.INDUSTRYAI_SUBMISSIONS_ENABLED = false`.
- Server-Schalter: `INDUSTRYAI_PUBLIC_SUBMISSIONS_ENABLED = false`.
- Auf Datenbankebene haben weder `anon` noch `authenticated` INSERT-Rechte auf `company_submissions`. Nur `service_role` besitzt INSERT/SELECT.

Bis zur vollständigen Datenschutz- und Sicherheitsfreigabe dürfen über das Formular keine echten Unternehmens- oder Ansprechpartnerdaten gesammelt werden. Der lokale Entwurfsdownload bleibt möglich und überträgt keine Daten.

## Pilotphase und echte Unternehmensinteressen

INDUSTRYAI soll in der aktuellen Entwicklungsphase echte, unverbindliche Unternehmensinteressen für die Pilotphase erfassen können. Die Interessensbekundung ist kostenlos und stellt weder eine Bestellung noch einen kostenpflichtigen Auftrag dar. Eine Veröffentlichung eines Unternehmensprofils erfolgt ausschließlich nach gesonderter ausdrücklicher Freigabe des Unternehmens. Der Text auf `betrieb-start.html` wurde entsprechend angepasst.

Wichtig: Das inhaltliche Angebot einer kostenlosen Pilotphase hebt Impressums- oder Datenschutzpflichten nicht automatisch auf. Die Website ist dauerhaft auf Unternehmenspräsentation und Gewinnung von Interessenten ausgerichtet. Vor der tatsächlichen Online-Annahme von personenbezogenen Ansprechpartnerdaten müssen Anbieterkennzeichnung und vollständige Datenschutzinformationen vorliegen. Der öffentliche Formularversand bleibt bis dahin auf Browser- und Serverseite deaktiviert.

## Verifizierte Tests

Am 21.11.2026 wurden folgende Prüfungen ausgeführt:
- Edge Function `company-profile-submit` ist deployed und `ACTIVE`, Version 3.
- Cloudflare-Widget ist vorhanden und auf `industryai.github.io` beschränkt.
- Der Live-Browser-Test auf `betrieb-start.html` hat am 21.11.2026 das Laden des Widgets und den erfolgreichen Client-Callback bestätigt. Dies belegt noch nicht die serverseitige Token-Verifikation.
- Im Formular wurde ein CSS-Fehler behoben, durch den das Honeypot-Feld sichtbar war. Das Feld wird nun per korrigierter CSS-Regel außerhalb des sichtbaren Bereichs gehalten.
- Der Cloudflare-Secret-Fingerprint stimmt mit dem in Supabase gespeicherten Fingerprint überein.
- Der Server-Schalter entspricht dem Wert `false`; die öffentliche Einreichung bleibt geschlossen.
- Die HMAC-Rate-Limit-RPC ist nur für `service_role` ausführbar. In einer zurückgerollten Testtransaktion wurde eine erste Anfrage erlaubt und die zweite bei Limit 1 abgelehnt.
- In zurückgerollten RLS-Testtransaktionen konnte das Allowlist-Admin-Konto einen künstlichen internen Testdatensatz sehen; ein nicht freigeschaltetes Konto erhielt null sichtbare Datensätze.
- In einer zurückgerollten öffentlichen Profil-Testtransaktion war ein Profil mit `is_published=true` sichtbar; ein Profil mit `is_published=false` blieb verborgen.
- Die Testtransaktionen wurden zurückgerollt. Es verblieben keine Testdatensätze.

Noch nicht abgeschlossen:
- Live-Browser-Test des Kontaktformulars mit gültigem Turnstile-Token und Kontrolle des Nachrichteneingangs im Adminbereich.
- Laufzeitprüfung der Kontakt-Edge-Function mit gültigem und ungültigem bzw. abgelaufenem Turnstile-Token.
- kontrollierter Ende-zu-Ende-Test der Unternehmensprofil-Anfrage und öffentlichen Profilansicht; diese Funktion bleibt bis dahin ausgeschaltet.
- abschließende rechtliche Prüfung der Datenschutzhinweise und der Vertrags-/Auftragsverarbeitungsbedingungen der eingesetzten Anbieter.
- praktische Prüfung, ob das veröffentlichte E-Mail-Postfach erreichbar ist und eingehende Nachrichten beantwortet werden können.

## Noch erforderlich vor dem produktiven Start

1. Die veröffentlichten Datenschutzhinweise und die tatsächlichen Anbieter-/Auftragsverarbeitungsbedingungen (Supabase, Cloudflare, GitHub und Google/Gmail) abschließend prüfen.
2. Die Erreichbarkeit des veröffentlichten E-Mail-Postfachs `industryaisupport@gmail.com` praktisch prüfen.
3. Das Kontaktformular auf der veröffentlichten Seite mit einer gültigen Turnstile-Prüfung testen; die Nachricht im Adminbereich prüfen, als bearbeitet markieren und danach den Testdatensatz löschen.
4. Für die Unternehmensprofil-Anfrage einen kontrollierten Test mit dem Server-Schalter nur vorübergehend aktivieren: gültiger Token, ungültiger/abgelaufener Token und HMAC-Laufzeitprüfung.
5. Eine ausschließlich fiktive Profilanfrage empfangen und den Admin-Review-Ablauf testen. Die Veröffentlichung darf erst nach einer dokumentierten gesonderten Zustimmung des Unternehmens erfolgen.
6. Statusänderungen, interne Notizen, manuelle Veröffentlichung, öffentliche Unternehmensliste und Profil-Detailseite prüfen. Dabei sicherstellen, dass Ansprechpartnerdaten und interne Notizen nie veröffentlicht werden.
7. Nach dem Test alle Testdaten entfernen und beide Unternehmensprofil-Schalter bis zur ausdrücklichen Freigabe wieder auf `false` belassen.

## Sicherheitsregeln

- Niemals einen `sb_secret_`- oder Service-Role-Key in HTML, JavaScript, GitHub oder andere öffentliche Dateien eintragen.
- Publishable Keys sind für Browser-Code gedacht, aber nur zusammen mit RLS und minimalen Grants.
- Admin-Berechtigung basiert ausschließlich auf der serverseitig verwalteten Tabelle `industryai_admins`, nicht auf editierbaren User-Metadaten.
- Keine echten Unternehmens- oder Ansprechpartnerdaten für Tests verwenden, solange die öffentliche Einreichung nicht ausdrücklich freigegeben ist.


## Edge Function: Kontaktformular

Die Edge Function `contact-message-submit` ist deployed und aktiv (Version 1, `verify_jwt=false`). Sie akzeptiert ausschließlich Anfragen von `https://industryai.github.io` mit dem projektbezogenen Publishable Key und prüft serverseitig:
- Pflichtfelder, E-Mail-Format, Längen und JSON-Requestgröße
- Honeypot-Feld gegen einfache automatisierte Einsendungen
- Cloudflare-Turnstile-Token mit Hostname `industryai.github.io` und Action `contact_message_submit`
- Anfragelimits je IP-Adresse (HMAC-Kennung, 5 pro Stunde) und E-Mail-Adresse (HMAC-Kennung, 3 pro Tag)
- Einfügung ausschließlich über den serverseitigen Service-Role-Client in `contact_messages`

Im Rate-Limit-Speicher werden keine Klartext-IP-Adressen oder Klartext-E-Mail-Adressen abgelegt. Die rohe IP wird für die Turnstile-Überprüfung an Cloudflare weitergegeben. Es wird keine automatische Bestätigungs- oder Benachrichtigungs-E-Mail versendet; Nachrichten werden manuell im Adminbereich bearbeitet.

### Kontakt-Retention

Die Migrationen `006_contact_messages.sql` und `007_contact_message_retention.sql` wurden im Supabase-Projekt angewendet.
- Bearbeitete Kontaktanfragen: automatische Löschung sechs Monate nach `processed_at`.
- Nicht bearbeitete Kontaktanfragen: automatische Löschung spätestens zwölf Monate nach `created_at`.
- HMAC-geschützte Rate-Limit-Kennungen: Löschung nach 30 Tagen.
- `pg_cron` führt die Wartungsfunktion täglich aus.
- Die Wartungsfunktion liegt im nicht exponierten Schema `private`; `anon` und `authenticated` dürfen sie nicht ausführen.

Der Adminbereich `profilpruefung-intern.html` zeigt zusätzlich den Kontakt-Posteingang. Nachrichten können dort gelesen, als bearbeitet markiert, wieder geöffnet und gelöscht werden. Die Absender-E-Mail ist für eine manuelle Antwort anklickbar.

### Öffentliche Kontaktannahme

`kontakt.html` nutzt die Edge Function `contact-message-submit`. Turnstile wird erst nach dem ausdrücklichen Klick auf „Bot-Schutz aktivieren“ geladen. Die Kontaktanfrage wird danach per HTTPS an Supabase übermittelt und nicht öffentlich zugänglich gemacht.

## Impressum und Datenschutzhinweise

Die Seiten `impressum.html`, `kontakt.html` und `datenschutz.html` sind vorhanden und über die Footer der öffentlichen Seiten erreichbar. Das Impressum nennt die natürliche Person als Anbieter, deren ladungsfähige Anschrift, die Projektbezeichnung INDUSTRYAI, die E-Mail-Adresse und das Online-Kontaktformular.

Die Datenschutzhinweise beschreiben den tatsächlich eingerichteten Kontakt-Posteingang, Turnstile, Supabase, GitHub Pages, die optionale Admin-CDN-Abhängigkeit, die Löschfristen und die derzeit deaktivierten Unternehmens- und Recruiting-Kontaktformulare. Die öffentlichen Seiten laden keine Google Fonts, keine Analytics- oder Werbe-Pixel und keine YouTube-Embeds.

## Noch offene Produktivprüfungen

- Den echten Browser-Ablauf des Kontaktformulars auf der veröffentlichten GitHub-Pages-Seite mit einer Testnachricht und gültigem Turnstile-Token testen.
- Die Nachricht im Adminbereich mit dem berechtigten Konto öffnen, den Status ändern und anschließend die Testnachricht löschen.
- Die Erreichbarkeit des veröffentlichten E-Mail-Postfachs `industryaisupport@gmail.com` praktisch prüfen. Eine Kontaktseite ersetzt keine erreichbare E-Mail-Adresse.
- Den öffentlichen Unternehmensprofil-Einreichungstest mit gültigem und ungültigem Turnstile-Token kontrolliert durchführen, wenn Datenschutz- und Sicherheitsfreigabe vorliegen. Bis dahin bleiben Browser- und Server-Schalter `false`.
- Keine automatische E-Mail-Benachrichtigung an den Betreiber ist derzeit eingerichtet. Für zeitnahe Bearbeitung muss der Admin-Posteingang regelmäßig geprüft werden.
- Die Anbieterbedingungen und Auftragsverarbeitungsvereinbarungen der tatsächlich genutzten Dienste (insbesondere Supabase, Cloudflare, GitHub und Google/Gmail) vor produktiver Datenerhebung prüfen.
