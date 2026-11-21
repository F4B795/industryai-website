# INDUSTRYAI – Supabase backend

Die Website liegt auf GitHub Pages. Supabase stellt die PostgreSQL-Datenbank und Authentifizierung bereit. Die öffentlichen Seiten verwenden ausschließlich den Publishable Key; privilegierte Datenbankzugriffe werden durch Grants und Row Level Security (RLS) begrenzt.

## Datenmodell

- `company_submissions`: private Profilanfragen einschließlich Ansprechpartner, geschäftlicher E-Mail-Adresse und interner Prüfanmerkungen.
- `industryai_admins`: explizite Freigabeliste der Administrator-Benutzer-UUIDs.
- `company_public_profiles`: ausschließlich die Angaben, die nach manueller Prüfung zur Veröffentlichung freigegeben wurden. Die Tabelle enthält keine Kontaktperson und keine Kontakt-E-Mail-Adresse.

## Aktueller Projektstand – 21.11.2026

Supabase-Projekt: `industryai-backend`  
Region: `eu-west-1` (West EU, Irland)  
Status beim letzten Check: `ACTIVE_HEALTHY`

Die drei Tabellen sind vorhanden und RLS ist auf allen drei Tabellen aktiviert. Der Administrator `industryaisupport@gmail.com` ist in `industryai_admins` eingetragen. Die Admin-Prüffunktion liegt im nicht öffentlich exponierten Schema `private`. Die Security Advisor-Warnungen für die zuvor öffentlich ausführbare Admin-Funktion und die automatische RLS-Funktion wurden behoben.

Die Datenbankmigrationen 002, 003 und 004 wurden am 21.11.2026 im Projekt angewendet:
- `002_public_company_profile_fields_and_function_security`
- `003_move_admin_helper_to_private_and_harden_function_access`
- `004_disable_public_submissions_until_privacy_and_anti_spam_ready`

## Sicherheitsmodell

- Nicht angemeldete Besucher dürfen private Einreichungen weder lesen noch einsehen.
- Nur angemeldete Benutzer, deren UUID in `industryai_admins` steht, dürfen Anfragen lesen, prüfen und bearbeiten.
- Nur Administratoren dürfen Datensätze in `company_public_profiles` erstellen oder ändern.
- Die öffentliche Unternehmenswelt kann nur Datensätze lesen, bei denen `is_published = true` ist.
- Bei Veröffentlichung werden nur freigegebene Unternehmensangaben kopiert. Ansprechpartner und interne Notizen bleiben privat.
- Der Publishable Key ist für Browser-Code vorgesehen. **Ein `sb_secret_`- oder Service-Role-Key darf niemals in HTML, JavaScript, GitHub oder andere öffentliche Dateien aufgenommen werden.**

## Öffentliche Einreichung derzeit bewusst deaktiviert

Die Supabase-Anbindung im Unternehmensformular ist vorbereitet, aber die Einreichung ist vorerst geschlossen:
- `window.INDUSTRYAI_SUBMISSIONS_ENABLED = false` in `js/supabase-config.js`.
- Die Einfüge-Berechtigung und die öffentliche Einreichungs-RLS-Policy wurden zusätzlich direkt in der Datenbank entzogen.
- Der lokale Entwurfsdownload bleibt möglich und überträgt keine Daten.

Das ist beabsichtigt. Vor dem Sammeln echter Ansprechpartnerdaten müssen die Datenschutzhinweise vervollständigt, Rechtsgrundlage und Löschfristen festgelegt und ein serverseitiger Spam-Schutz eingerichtet werden. Eine bloße Deaktivierung des Formularbuttons wäre nicht ausreichend; deshalb wurde auch der Datenbankzugriff geschlossen.

## Website-Dateien

- `js/supabase-config.js`: öffentliche Projekt-URL, Publishable Key und Einreichungs-Schalter.
- `betrieb-start.html`: Unternehmensprofil-Formular und lokaler Entwurfsdownload; Datenbankübermittlung erst nach bewusster Aktivierung.
- `profilpruefung-intern.html`: Supabase-Auth-Login, Admin-Allowlist-Prüfung, Anfragenliste, Status, Notizen und explizite Veröffentlichung.
- `unternehmenswelt.html`: öffentliche Liste freigegebener Unternehmensprofile.
- `unternehmen-profil.html`: öffentliche Detailseite eines freigegebenen Profils.

## Neue Umgebung einrichten

1. Supabase-Projekt erstellen.
2. `backend/supabase/schema.sql` im SQL Editor ausführen.
3. Administrator in Authentication → Users anlegen bzw. einladen.
4. Dessen UUID als ersten Eintrag in `industryai_admins` eintragen.
5. Projekt-URL und Publishable Key in `js/supabase-config.js` eintragen. Niemals einen Secret Key verwenden.
6. Für bereits bestehende Projekte nur die noch nicht ausgeführten Migrationen aus `backend/supabase/migrations/` anwenden. Bereits ausgeführte Migrationen nicht erneut manuell verändern.

## Vor dem produktiven Start noch erforderlich

- Vollständige, rechtlich geprüfte Datenschutzerklärung mit verantwortlicher Stelle, Anschrift, Rechtsgrundlage, Empfängern/Auftragsverarbeitern, Speicherdauer und Betroffenenrechten.
- Serverseitiger Spam-Schutz mit Rate Limiting und CAPTCHA/Challenge; keine öffentliche direkte Tabellen-Einfügung als endgültiger Produktivweg.
- Festgelegte Lösch- und Aufbewahrungsregeln für nicht freigegebene Anfragen.
- Browser-End-to-End-Test: Admin-Anmeldung, Allowlist-Sperre für normale Benutzer, private Anfrage, Statusänderung, Veröffentlichung, öffentliche Sichtbarkeit und Ausschluss von Kontaktdaten.
- Auth-Sicherheitseinstellungen regelmäßig prüfen. Der Supabase Security Advisor meldet derzeit noch deaktivierten Schutz gegen bekannte kompromittierte Passwörter; laut Supabase-Dokumentation ist diese Funktion Pro-Tarifen und höher vorbehalten.

## Testhinweis

Es wurden Datenbankrechte, RLS-Tabellen, Admin-Funktion und die Einreichungsberechtigungen direkt über die Supabase-Verbindung geprüft. Ein anonymer Test-INSERT wurde innerhalb einer Transaktion ausgeführt und zurückgerollt. Die Website wurde noch nicht vollständig in einem echten Browser-End-to-End-Test durchgeklickt. Bis dahin keine echten Unternehmens- oder Ansprechpartnerdaten eingeben.
