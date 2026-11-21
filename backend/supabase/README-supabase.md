# INDUSTRYAI – Supabase backend

Die Website liegt auf GitHub Pages. Supabase stellt PostgreSQL, Authentifizierung und die serverseitige Formularannahme bereit.

## Aktueller Projektstand – 21.11.2026

Supabase-Projekt: `industryai-backend`  
Region: `eu-west-1` (West EU, Irland)  
Projektstatus: `ACTIVE_HEALTHY`

Drei Tabellen sind vorhanden und RLS ist aktiviert:
- `company_submissions`: private Unternehmensanfragen inkl. Ansprechpartner und interner Prüfanmerkungen.
- `industryai_admins`: Allowlist der Administrator-Benutzer-UUIDs.
- `company_public_profiles`: ausschließlich ausdrücklich freigegebene öffentliche Profilangaben.

Der Administrator `industryaisupport@gmail.com` ist eingetragen. Die Admin-Hilfsfunktion liegt im nicht exponierten Schema `private`. Die interne Review-Seite authentifiziert den Benutzer und prüft zusätzlich dessen UUID in `industryai_admins`.

## Edge Function: öffentliche Profilanfrage

Die Edge Function `company-profile-submit` ist in Supabase deployed und aktiv (Version 2). Sie ist für den öffentlichen Browseraufruf mit `verify_jwt=false` konfiguriert; die Funktion prüft selbst:
- exakten Website-Origin `https://industryai.github.io`;
- den projektbezogenen Publishable Key im `apikey`-Header;
- ein gültiges Cloudflare Turnstile-Token mit erwartetem Hostname und Action;
- Eingabegrößen, Pflichtfelder, E-Mail-Format und HTTP(S)-Website-URLs;
- serverseitige Anfragelimits: 5 Anfragen pro IP-Hash und Stunde, 3 pro E-Mail-Hash und Tag.

Die Einreichung verwendet den Supabase Secret Key ausschließlich innerhalb der Edge Function. Dieser Schlüssel wird nicht in den Browser ausgeliefert. Die Funktion schreibt nur die erlaubten Profildaten in `company_submissions`; Status und interne Notizen werden nicht vom Browser angenommen.

### Rate-Limit-Datenschutz

Die Edge Function bildet HMAC-SHA-256-Hashes aus IP-Adresse bzw. normalisierter E-Mail-Adresse. In `private.company_profile_rate_limits` werden nur diese Schlüssel-Hashes, Zeitfenster und Zähler gespeichert – keine Klartext-IP und keine Klartext-E-Mail. Alte Zeitfenster werden gelegentlich bereinigt (älter als 30 Tage). Die HMAC-Geheimkomponente gehört ausschließlich in Edge Function Secrets.

### Benötigte Edge Function Secrets

Diese drei Variablen müssen im Supabase Dashboard unter **Edge Functions → Secrets** gesetzt werden:
- `CLOUDFLARE_TURNSTILE_SECRET_KEY`: Cloudflare Turnstile Secret Key.
- `INDUSTRYAI_RATE_LIMIT_HMAC_SECRET`: zufälliger Geheimwert mit mindestens 32 Zeichen.
- `INDUSTRYAI_PUBLIC_SUBMISSIONS_ENABLED`: aktuell `false`; nur nach vollständiger Datenschutz- und Sicherheitfreigabe bewusst auf `true) setzen.

Supabase stellt der Edge Function die Standardvariable `SUPABASE_SECRET_KEYS` bereit. Der Secret Key wird daraus serverseitig gelesen und darf niemals in GitHub oder Browser-Code erscheinen.

## Website-Dateien

- `js/supabase-config.js`: öffentliche Projekt-URL, Publishable Key, Turnstile-Sitekey und browserseitiger Einreichungsschalter.
- `betrieb-start.html`: Profilformular, Honeypot, Turnstile-Widget und Aufruf der Edge Function; öffentlicher Versand bleibt derzeit deaktiviert.
- `backend/supabase/functions/company-profile-submit/index.ts`: serverseitige Validierung, Turnstile, HMAC-Rate-Limits und private Datenbankeinfügung.
- `profilpruefung-intern.html`: Supabase-Auth, Admin-Allowlist, Prüfstatus, interne Notizen und manuelle Veröffentlichung.
- `unternehmenswelt.html`: lädt nur Datensätze mit `is_published = true).
- `unternehmen-profil.html`: Detailseite eines freigegebenen Profils.

## Datenbankmigrationen und Änderungen

Die Datenbankbasis und die Migrationen 002–004 wurden im Supabase-Projekt angewendet. Die HMAC-Rate-Limit-Tabelle, die service-role-only RPC-Funktion und die INSERT/SELECT-Rechte der Edge Function wurden danach direkt über den Supabase SQL-Zugang angelegt. Der vollständige Wiederaufbau-SQL-Stand ist in `schema.sql` und der entsprechende Delta-Stand in `migrations/005_company_profile_rate_limits.sql` dokumentiert.

## Öffentliche Einreichung derzeit bewusst deaktiviert

Die öffentliche Einreichung ist zweifach geschlossen:
- Browser-Schalter: `window.INDUSTRYAI_SUBMISSIONS_ENABLED = false).
- Server-Schalter: `INDUSTRYAI_PUBLIC_SUBMISSIONS_ENABLED` muss als Edge Function Secret explizit `true) sein; aktuell ist es nicht aktiviert.
- Auf Datenbankebene haben weder `anon` noch `authenticated` INSERT-Rechte auf `company_submissions`. Nur `service_role` besitzt INSERT/SELECT.
- Die Funktion lehnt Einreichungen ab, wenn Cloudflare Turnstile und HMAC-Secret nicht konfiguriert sind.

Daher dürfen bis zur vollständigen Einrichtung keine echten Unternehmens- oder Ansprechpartnerdaten eingegeben werden. Der lokale Entwurfsdownload bleibt möglich und überträgt keine Daten.

## Noch erforderlich vor dem produktiven Start

1. Cloudflare Turnstile-Widget für Hostname `industryai.github.io` erstellen (Widget-Modus „Managed“). Den Sitekey in `js/supabase-config.js` eintragen; den Secret Key ausschließlich in Supabase Edge Function Secrets speichern.
2. `INDUSTRYAI_RATE_LIMIT_HMAC_SECRET` als zufälligen Geheimwert (mindestens 32 Zeichen) in Supabase Edge Function Secrets hinterlegen.
3. `INDUSTRYAI_PUBLIC_SUBMISSIONS_ENABLED` zunächst auf `false` lassen.
4. Datenschutzerklärung rechtlich vervollständigen: Verantwortlicher und Anschrift, Rechtsgrundlage, Empfänger/Auftragsverarbeitung, Cloudflare-Turnstile-Verarbeitung einschließlich IP-Übermittlung, Speicherfristen, Löschverfahren und Betroffenenrechte.
5. Serverseitige Edge Function mit gültigem Turnstile-Token und anschließend mit ungültigem/abgelaufenem Token im Browser testen.
6. Admin-Flow erneut testen: Anfrage empfangen, Status ändern, freigeben, öffentliche Anzeige kontrollieren, Kontakt- und interne Notizfelder auf Nichtveröffentlichung prüfen.
7. Erst nach diesen Schritten Server-Schalter und anschließend Browser-Schalter bewusst auf `true` setzen.

## Verifizierte Tests

- Edge Function `company-profile-submit` ist deployed und `ACTIVE`.
- HMAC-Rate-Limit-RPC ist nur für `service_role` ausführbar; eine Testausführung im Rollback wurde erfolgreich durchgeführt.
- `service_role` besitzt INSERT/SELECT auf `company_submissions`; `anon` und `authenticated` besitzen kein INSERT-Recht.
- `private.company_profile_rate_limits` ist RLS-geschützt und nicht für normale Rollen lesbar.
- Ein vollständiger echter Browser-Test der Turnstile-Verifikation und des Formularversands steht noch aus, da Sitekey und Secrets noch nicht eingerichtet sind.

## Sicherheitsregeln

- Niemals einen `sb_secret_`- oder Service-Role-Key in HTML, JavaScript, GitHub oder andere öffentliche Dateien eintragen.
- Publishable Keys sind für Browser-Code gedacht, aber nur zusammen mit RLS und minimalen Grants.
- Admin-Berechtigung basiert ausschließlich auf der serverseitig verwalteten Tabelle `industryai_admins`, nicht auf editierbaren User-Metadaten.
