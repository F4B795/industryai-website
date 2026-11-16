# Google Apps Script – INDUSTRYAI Profilanfragen

## Einrichtung

1. Mit dem Google-Konto anmelden, über das die Anfragen versendet werden sollen.
2. https://script.google.com öffnen und ein **Neues Projekt** erstellen.
3. Den Inhalt von `Code.gs` aus diesem Ordner vollständig in den Editor kopieren und speichern.
4. Unter **Bereitstellen → Neue Bereitstellung** den Typ **Web-App** auswählen.
5. **Ausführen als:** Ich (dein Google-Konto).
6. **Zugriff:** Jeder. Das ist nötig, damit das öffentliche Website-Formular den Endpunkt ohne Google-Anmeldung aufrufen kann.
7. Bereitstellen, die angeforderten Berechtigungen prüfen und dem Script den Versand von E-Mails erlauben.
8. Die angezeigte Web-App-URL kopieren. Sie endet normalerweise auf `/exec`.
9. In `betrieb-start.html` beim Formular `action="PASTE_WEB_APP_URL_HERE"` durch diese vollständige URL ersetzen und die Datei auf GitHub speichern.

## Funktionstest

- Die veröffentlichte Seite `betrieb-start.html` öffnen.
- Eine Testanfrage mit einer eigenen geschäftlichen Testadresse absenden.
- Prüfen, ob die E-Mail bei `industryaisupport@gmail.com` ankommt (auch Spam-Ordner prüfen).
- Auf die Antwortfunktion der E-Mail achten: Antworten sollen an die angegebene Kontaktadresse gehen.
- Erst nach erfolgreichem Test die Funktion öffentlich bewerben.

## Betrieb und Sicherheit

- Das Script versendet nur Profilanfragen an die fest eingetragene Empfängeradresse.
- Das Formular enthält Pflichtfelder, Längenbegrenzungen und ein einfaches Honeypot-Feld.
- Der öffentliche Endpunkt ist kein geschütztes Kundenportal. Keine sensiblen oder vertraulichen Daten abfragen.
- Prüfe regelmäßig die Apps-Script-Ausführungen und das E-Mail-Aufkommen. Bei Spam den Endpunkt vorübergehend deaktivieren und Schutzmaßnahmen ergänzen.
- Änderungen am Script müssen als neue Web-App-Version bereitgestellt werden, damit sie im bestehenden `/exec`-Endpunkt aktiv werden.

## Datenschutz vor Live-Schaltung

Vor dem öffentlichen Einsatz müssen die Datenschutzhinweise vollständig und auf den tatsächlichen Betrieb angepasst werden. Insbesondere sind Verantwortlicher, Kontakt, Zweck und Rechtsgrundlage, Google als eingesetzter Dienstleister, mögliche Drittlandübermittlungen, Speicherdauer, Betroffenenrechte und die konkrete Einwilligung rechtlich zu prüfen. Die Checkbox im Formular ist eine technische Einwilligungserfassung und ersetzt keine vollständige Datenschutzerklärung oder rechtliche Prüfung.
