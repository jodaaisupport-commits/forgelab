# ForgeLab AI Model Studio

ForgeLab ist eine deutschsprachige, frameworkfreie Frontend-Simulation eines AI-Model-Studios. Modelle, Datensätze, Trainingsläufe und Connectoren werden lokal im Browser demonstriert.

## Entwicklung

Node.js 20+ und ein lokaler Dev-Server werden benötigt:

```bash
npm install
npm run dev
```

Weitere Befehle:

```bash
npm test
npm run build
npm run preview
```

Die Anwendung sollte nicht per `file://` geöffnet werden, weil ES-Module und Service Worker einen HTTP-Server benötigen.

## Einschränkungen

Die Authentifizierung ist ausschließlich eine Demo: Benutzer, Hashes und Sessions werden lokal gespeichert und sind nicht als echte Sicherheitsgrenze geeignet. Für Produktion sind ein Backend, Argon2id/bcrypt, sichere Sessions und serverseitige Autorisierung erforderlich.

## Architektur

- `main.js`: Browser-Einstiegspunkt und UI-Ereignisse
- `state.js` / `storage.js`: lokaler Demo-Zustand
- `auth.js`: Demo-Registrierung und Login
- `export.js`: ZIP-Export
- `sw.js` / `manifest.json`: PWA-Grundlage
- `locales/de.js`: Übersetzungen und Toasts

## Lizenz

Siehe `LICENSE`.
