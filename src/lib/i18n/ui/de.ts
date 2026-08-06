import { p } from '../format';
import type { UIStrings } from './en';

export const de: UIStrings = {
  chrome: {
    skipToContent: 'Zum Inhalt springen',
    homeAria: 'UtilDock Startseite',
    navTools: 'Werkzeuge',
    navSite: 'Seite',
    breadcrumb: 'Navigationspfad',
    home: 'Start',
    soon: 'bald',
    comingSoon: 'in Kürze',
    categoryTools: '{category}-Werkzeuge',
    allCategoryTools: 'Alle {category}-Werkzeuge',
    openToolsMenu: 'Werkzeugmenü öffnen',
    closeToolsMenu: 'Werkzeugmenü schließen',
    toolsButton: 'Werkzeuge',
    privacyPill: 'Nichts verlässt diesen Tab',
    privacyPillMobile: 'Dein JSON bleibt in diesem Tab',
    open: 'Öffnen',
  },

  theme: {
    toLight: 'Zum hellen Design wechseln',
    toDark: 'Zum dunklen Design wechseln',
    title: 'Design wechseln',
    light: 'Hell',
    dark: 'Dunkel',
  },

  footer: {
    tagline: 'Dein Dock für Entwicklerwerkzeuge.',
    blurb: 'Kostenlos, werbefrei, und alles läuft in deinem eigenen Browser.',
    about: 'Über uns',
    privacy: 'Datenschutz',
    analytics: 'Analyse',
    copyright: '© {year} UtilDock',
    language: 'Sprache',
    languageAria: 'Sprache wählen',
  },

  consent: {
    region: 'Analyse',
    heading: 'Analyse',
    undecided:
      'Wir würden gerne Google Analytics einsetzen, um Seitenaufrufe zu zählen und so zu erfahren, welche Werkzeuge wir verbessern sollten. Dabei wird ein Cookie gesetzt. Was du einfügst, ist nie enthalten — dein JSON verlässt diesen Tab so oder so nicht.',
    privacyPolicy: 'Datenschutzerklärung',
    whatItCollects: 'Was erfasst wird',
    currentlyOn: 'Derzeit aktiv',
    granted:
      'Google Analytics zählt in diesem Browser Seitenaufrufe. Was du einfügst, ist nie enthalten.',
    currentlyOff: 'Derzeit aus',
    denied:
      'In diesem Browser wird nichts von Google angefordert, und ein bereits gesetztes Analyse-Cookie wurde gelöscht. Jedes Werkzeug funktioniert in beiden Fällen genau gleich.',
    allow: 'Analyse erlauben',
    decline: 'Nein danke',
    turnOff: 'Ausschalten',
    turnOn: 'Einschalten',
    close: 'Schließen',
  },

  tool: {
    taglineSuffix: 'läuft in diesem Tab, wird nie irgendwohin gesendet',
    howItWorks: 'So funktioniert der {name}',
    otherTools: 'Weitere Werkzeuge',
    commonQuestions: 'Häufige Fragen',
  },

  home: {
    title: 'Kostenlose JSON-Werkzeuge im Browser',
    headlineLead: 'Werkzeuge, die nie',
    headlineAccent: 'einen Server berühren.',
    lede: 'Kleine, scharfe Werkzeuge, die vollständig in diesem Tab laufen — kostenlos, werbefrei und ohne Anmeldung. JSON zuerst: ein Formatter, ein Viewer, ein Validator und ein Vergleich, JWT folgt.',
    assurances: ['Nichts hochgeladen', 'Nichts protokolliert', 'Kein Konto, keine Grenzen'],
    closeLine: 'Zieh das Netzwerk ab. Es funktioniert weiter.',
    closeCta: 'Warum das stimmt',
    keywords: [
      'entwicklerwerkzeuge',
      'json tools',
      'json formatter online',
      'kostenlose entwickler tools',
    ],
  },

  jsonHub: {
    title: 'JSON-Werkzeuge — kostenlos und werbefrei',
    description:
      'Kostenlose JSON-Werkzeuge: Viewer, Validator, Vergleich und Formatter. Keine Werbung, keine Anmeldung, nichts verlässt deinen Browser.',
    keywords: ['json tools', 'json werkzeuge', 'json tools online', 'kostenlose json tools'],
    headlineLead: 'Jedes JSON-Werkzeug,',
    headlineAccent: 'in einem Tab.',
    lede: 'Vier scharfe Werkzeuge für die Arbeit mit JSON — ein Baum-[Viewer](/json/viewer), ein Syntax- und Schema-[Validator](/json/validator), ein visueller [Vergleich](/json/diff) und ein [Formatter und Minifier](/json/formatter). Alle kostenlos, alle werbefrei, und jedes davon verarbeitet dein Dokument in diesem Tab statt auf einem Server.',
    chooseHeading: 'Werkzeug wählen',
    toolCount: p({ one: '{count} Werkzeug · mehr folgen', other: '{count} Werkzeuge · mehr folgen' }),
    notes: [
      {
        head: 'Nichts, was du einfügst, wird hochgeladen',
        body: 'Jedes Werkzeug hier ist JavaScript, das in deinem eigenen Tab läuft. Füge einen Produktions-Payload bei getrennter Netzwerkverbindung ein, und es funktioniert weiterhin — es gibt keinen Server von uns, der ihn empfangen könnte.',
      },
      {
        head: 'Keine Werbung, kein Konto, kein Limit',
        body: 'Keine Interstitials, keine Anmeldung und keine Obergrenze dafür, wie viel du einfügen kannst. Die Seite, auf der du landest, ist das Werkzeug.',
      },
      {
        head: 'Für große Dokumente gebaut',
        body: 'Parsen, Validieren und Vergleichen laufen in einem Worker-Thread, sodass ein Dokument von mehreren Megabyte verarbeitet wird, ohne dass die Seite beim Tippen einfriert.',
      },
    ],
    closeLine: 'Prüf die Behauptung in deinem Netzwerk-Tab.',
    closeCta: 'Warum das stimmt',
  },

  notFound: {
    title: 'Seite nicht gefunden',
    description: 'Diese Seite existiert auf UtilDock nicht.',
    headline: 'Diese Seite existiert nicht.',
    body: 'Der Link ist vielleicht veraltet oder die Adresse vertippt. Unten sind alle Werkzeuge von UtilDock aufgelistet.',
    cta: 'Zurück zur Startseite',
    allTools: 'Alle Werkzeuge',
  },

  about: {
    title: 'Über uns — wer UtilDock baut und warum',
    description:
      'Warum es UtilDock gibt: kleine, schnelle, werbefreie Entwicklerwerkzeuge, die vollständig in deinem Browser laufen, gebaut von einem einzelnen Entwickler, ohne Werbung und ohne dass jemals etwas hochgeladen wird.',
    heading: 'Über UtilDock',
    whyHeading: 'Warum es das gibt',
    why: [
      'Jeder Entwickler muss irgendwann JSON formatieren oder herausfinden, warum zwei Payloads nicht zusammenpassen. Die Werkzeuge, die bei solchen Suchen zuerst erscheinen, sind meist in Werbung begraben, von Cookie-Bannern unterbrochen und — am unangenehmsten — schicken das Eingefügte oft an einen Server, über den du nichts weißt. Das ist ein schlechter Handel, wenn das, was du debuggst, ein Produktions-Payload ist.',
      'UtilDock ist das Gegenteil davon: eine kleine Sammlung scharfer Werkzeuge, keine Werbung, keine Anmeldung, und nichts, was du einfügst, verlässt jemals deinen Rechner.',
    ],
    builtHeading: 'Wie es gebaut ist',
    built: [
      'Die Seite ist statisch — HTML, CSS und ein wenig JavaScript, ausgeliefert über Cloudflares Edge. Jedes Werkzeug ist eine eigenständige Komponente, die nur auf ihrer eigenen Seite hydriert, sodass die Seiten, die du nicht benutzt, dich nichts kosten. Die schwere Arbeit (Parsen, Validieren, Vergleichen) passiert in einem Web Worker, und genau deshalb friert ein Dokument von mehreren Megabyte die Seite beim Tippen nicht ein.',
      'Es gibt kein Backend. Das ist eine bewusste Einschränkung: ein Werkzeug, das deine Daten nirgendwohin senden kann, kann sie auch nicht preisgeben. Die Details stehen auf der [Datenschutzseite](/privacy).',
    ],
    todayHeading: 'Was es heute gibt',
    today:
      'JSON kam zuerst, weil die meisten von uns am häufigsten danach greifen. JWT-Decodierung ist als Nächstes dran, und die Liste wird weiter wachsen — immer nach denselben Regeln: schnell, kostenlos, werbefrei und vollständig clientseitig.',
  },

  privacy: {
    title: 'Datenschutz — nichts, was du einfügst, verlässt deinen Browser',
    description:
      'UtilDock läuft vollständig in deinem Browser. Kein Dokument, das du einfügst, verlässt jemals dein Gerät — es gibt keinen Server, der es empfangen könnte.',
    heading: 'Datenschutzerklärung',
    updated: 'Zuletzt aktualisiert: {date}',
    updatedDate: 'August 2026',
    translationNote:
      'Dies ist eine Übersetzung, die der Bequemlichkeit dient. Weicht sie von der englischen Fassung ab, gilt die englische Fassung.',
    lead: '**Nichts, was du in UtilDock einfügst, verlässt jemals deinen Browser.** Jedes Werkzeug ist JavaScript, das in deinem eigenen Tab läuft. Dein JSON wird nie an ein Backend gesendet, nie in ein Protokoll geschrieben und nie von uns gesehen — es gibt keinen Server von uns, der es empfangen könnte.',
    howHeading: 'Wie die Werkzeuge arbeiten',
    how: [
      'UtilDock ist eine statische Website. Wenn du ein Werkzeug öffnest, lädt dein Browser etwas HTML, CSS und JavaScript, und alles danach passiert lokal. Parsen, Formatieren, Validieren und Vergleichen laufen in deinem Tab. Eine Datei über die Schaltfläche **Laden** zu öffnen — oder sie auf die Seite zu ziehen — liest sie von deiner Festplatte in den Arbeitsspeicher; das ist kein Upload.',
      'Weil es kein Backend gibt, werden die Inhalte, mit denen du arbeitest, nirgendwo übertragen, protokolliert oder gespeichert. Du kannst die Internetverbindung trennen, und die Werkzeuge arbeiten weiter.',
    ],
    storedHeading: 'Auf deinem Gerät gespeicherte Informationen',
    stored:
      'Damit ein Neuladen deine Arbeit nicht verliert, speichert jedes Werkzeug seine aktuelle Eingabe im `localStorage` deines Browsers, zusammen mit deiner Designwahl und einigen Einstellungen wie der Einrückungsgröße. Diese Daten bleiben auf deinem Gerät, sind nur von UtilDock in deinem Browser lesbar und werden nie an uns übertragen. Das Löschen der Websitedaten dieser Domain in deinem Browser entfernt sie vollständig.',
    storedConsent:
      'Deine Antwort auf die Analyse-Frage wird auf demselben Weg gespeichert, damit du nur einmal gefragt wirst. Sie hält nichts weiter fest als die Entscheidung selbst.',
    analyticsHeading: 'Analyse und Cookies',
    analyticsOn: [
      'Mit deiner Einwilligung nutzen wir Google Analytics, um zu verstehen, wie die Seite genutzt wird — welche Seiten wie oft besucht werden — damit wir wissen, welche Werkzeuge sich zu verbessern lohnen. Es wird über einen Google-Tag-Manager-Container geladen und läuft erst, wenn du es erlaubst. Lehnst du ab, werden keine Analyse-Cookies gesetzt und keine Daten erhoben.',
      'Wenn aktiviert, erfasst Google Analytics übliche Webanalysedaten: aufgerufene Seiten, ungefährer Standort abgeleitet aus deiner IP-Adresse, verweisende Website sowie allgemeine Geräte- und Browserinformationen. Es setzt Cookies namens `_ga` und `_ga_*`, um wiederkehrende Besucher zu erkennen. Diese Verarbeitung ist in [Googles Datenschutzerklärung](https://policies.google.com/privacy) beschrieben.',
      '**Die Analyse erhält nie die Inhalte, mit denen du arbeitest.** Dein JSON ist in keinem Analyse-Ereignis enthalten. Wir haben außerdem Googles Werbefunktionen deaktiviert, sodass dein Besuch nicht für Remarketing, Anzeigenpersonalisierung oder Zielgruppenbildung verwendet wird.',
    ],
    analyticsOff:
      'Diese Seite lädt derzeit keine Analyse. Es werden keine Analyse-Cookies gesetzt, es läuft kein Skript Dritter, und es gibt nichts einzuwilligen.',
    analyticsNever:
      'Wir verkaufen deine Daten nicht, und wir verwenden keine Werbenetzwerke, Social-Media-Widgets, Sitzungsaufzeichnung oder Fingerprinting.',
    choicesHeading: 'Deine Wahlmöglichkeiten',
    choicesLead: 'Du kannst',
    choicesButton: 'diese Einstellung jederzeit prüfen oder ändern',
    choicesRest:
      '. Das Panel zeigt, welche Einstellung gerade gilt, und lässt dich umschalten; der Analyse-Link in der Fußzeile jeder Seite öffnet dasselbe Panel.',
    choicesImmediate:
      'Das Ausschalten wirkt sofort und nicht erst beim nächsten Seitenaufruf, und die `_ga`-Cookies werden in diesem Moment gelöscht — du musst die Websitedaten deines Browsers nicht leeren, um sie loszuwerden, auch wenn das ebenfalls funktioniert. Google wird auf keiner weiteren Seite erneut kontaktiert, es sei denn, du schaltest es wieder ein.',
    choicesUngated:
      'Jedes Werkzeug auf dieser Seite funktioniert gleich, ob du die Analyse akzeptierst oder nicht. Nichts hängt von dieser Entscheidung ab. Das Löschen der Websitedaten dieser Domain entfernt alles, was UtilDock gespeichert hat, einschließlich deines Designs und deiner gespeicherten Eingaben.',
    hostingHeading: 'Hosting',
    hosting:
      'UtilDock wird über Cloudflare Pages ausgeliefert. Wie jeder Webhoster verarbeitet Cloudflare die Netzwerkanfragen, die zur Auslieferung einer Seite nötig sind, und kann begrenzte technische Daten — IP-Adresse, User-Agent, Zeitstempel — zur Sicherheit und Missbrauchsprävention aufbewahren, geregelt durch [Cloudflares Datenschutzerklärung](https://www.cloudflare.com/privacypolicy/). Das betrifft Anfragen nach den Dateien der Seite selbst. Was du in ein Werkzeug einfügst, ist nie Teil einer Anfrage und steht deshalb in keinem Protokoll.',
    securityHeading: 'Sicherheit',
    security: [
      'Die Seite wird über HTTPS mit einer strikten Content-Security-Policy ausgeliefert, die einschränkt, welche Ursprünge Code laden oder Daten empfangen dürfen. Das ist es, was die obige Datenschutzzusage zu einer Eigenschaft der Bauweise macht statt zu einem Versprechen, das du einfach glauben musst. Du darfst es gerne überprüfen: öffne die Entwicklerwerkzeuge deines Browsers, benutze ein beliebiges Werkzeug auf der Seite und sieh dir die Anfragen an.',
      'Sicherheitsprobleme können an [security@utildock.dev](mailto:security@utildock.dev) gemeldet werden, oder siehe unsere [security.txt](/.well-known/security.txt).',
    ],
    childrenHeading: 'Datenschutz für Kinder',
    children:
      'UtilDock ist ein Entwicklerwerkzeug und richtet sich nicht an Kinder. Wir erheben wissentlich von niemandem personenbezogene Daten, auch nicht von Kindern unter 13 Jahren.',
    changesHeading: 'Änderungen dieser Erklärung',
    changes:
      'Ändert sich diese Erklärung, ändert sich das Datum oben auf dieser Seite mit. Die Zusage, dass die von dir eingefügten Daten in deinem Browser bleiben, gehört nicht zu dem, was wir zu überdenken gedenken.',
    contactHeading: 'Kontakt',
    contact:
      'Fragen zu dieser Erklärung gehen an [security@utildock.dev](mailto:security@utildock.dev).',
  },

  toolAbout: {
    'json-formatter': [
      'Füge ein Dokument in das Eingabefeld ein oder zieh es hinein, und das formatierte Ergebnis erscheint während des Tippens. Wähle zwei, drei oder vier Leerzeichen oder Tabs — je nachdem, was dein Projekt verwendet. Wechsle zu **Minifizieren**, um jedes Byte Leerraum zu entfernen, was du willst, bevor du JSON in eine Umgebungsvariable oder eine URL einbettest.',
      '**Schlüssel sortieren** schreibt jedes Objekt mit alphabetisch geordneten Schlüsseln neu. Zwei Dokumente, die sich nur in der Schlüsselreihenfolge unterscheiden, werden Byte für Byte identisch, wodurch sie sich in der Versionsverwaltung sauber vergleichen lassen.',
      'Das Parsen läuft in einem Web Worker, sodass selbst Dokumente von mehreren Megabyte formatiert werden, ohne dass die Seite beim Tippen hängt.',
    ],
    'json-viewer': [
      'Füge ein Dokument in das Quellfeld ein, und es wird zu einem navigierbaren Baum, in dem Objekte und Arrays auf jeder Ebene einklappbar sind und Werte nach Typ eingefärbt werden.',
      'Das Filterfeld durchsucht sowohl Schlüssel als auch Werte und öffnet, was immer nötig ist, um einen Treffer zu zeigen. Fahr über eine beliebige Zeile, um den vollständigen Pfad zu diesem Wert zu kopieren.',
      'Nur die gerade sichtbaren Zeilen werden gerendert, sodass ein Dokument mit Hunderttausenden Knoten flüssig scrollbar bleibt.',
    ],
    'json-validator': [
      'Jeder Syntaxfehler wird mit exakter Zeile und Spalte gemeldet und im Editor an der Stelle unterstrichen, an der er auftritt. Der Parser hält beim ersten Problem an — behebe dieses, und alles Weitere weiter unten erscheint.',
      'Aktiviere **Gegen ein Schema prüfen**, und ein zweites Feld öffnet sich für ein JSON Schema. Jeder Verstoß wird mit seinem Pfad aufgelistet, und ein Klick darauf springt im Editor dorthin.',
      'Sowohl das Dokument als auch das Schema bleiben in diesem Tab. Keines wird hochgeladen, und genau darauf kommt es an, wenn das Schema intern und das Dokument echt ist.',
    ],
    'json-diff': [
      'Füge auf jeder Seite ein Dokument ein. Der Vergleich ist strukturell statt textuell: beide Dokumente werden zuerst geparst, sodass umsortierte Schlüssel, andere Einrückung und Leerraum am Zeilenende nie als Änderung zählen.',
      'Array-Elemente werden über ihre Identität zugeordnet, wo es eine gibt — ein Feld **id**, **key**, **uuid** oder **name** — sodass das Einfügen eines Elements am Anfang eine einzige Hinzufügung meldet, statt alles Nachfolgende neu zu schreiben.',
      'Lange Folgen identischer Zeilen werden eingeklappt und lassen die Änderungen mit gerade genug Struktur zurück, um jede einzelne zu verorten. Alt + ↑ und Alt + ↓ springen durch die Unterschiede.',
    ],
  },

  islands: {
    common: {
      load: 'Laden',
      loadTitle: 'Eine lokale Datei lesen — sie wird auf diesem Rechner gelesen, nie hochgeladen',
      sample: 'Beispiel',
      sampleTitle: 'Ein Beispieldokument laden',
      clear: 'Leeren',
      copy: 'Kopieren',
      copied: 'Kopiert',
      copyTitle: 'In die Zwischenablage kopieren',
      download: 'Herunterladen',
      dropHere: 'Material hier ablegen',
      path: 'Pfad',
      pathCopied: 'kopiert',
      copyPathTitle: 'Pfad kopieren — {path}',
      validJson: 'Gültiges JSON',
      errorAt: 'Zeile {line}, Spalte {column} — {message}',
      stats: '{objects} Objekte · {arrays} Arrays · {keys} Schlüssel · Tiefe {depth}',
    },

    formatter: {
      inputTitle: 'Eingabe',
      formattedTitle: 'Formatiert',
      minifiedTitle: 'Minifiziert',
      inputLabel: 'JSON-Eingabe',
      outputLabel: 'Formatierte JSON-Ausgabe',
      placeholder: '{\n  "hier": "dein JSON einfügen"\n}',
      idle: 'JSON einfügen oder ablegen, um zu beginnen',
      indent: 'Einrückung',
      spaces: '{count} Leerzeichen',
      tab: 'Tab',
      sortKeys: 'Schlüssel sortieren',
      sortKeysTitle: 'Objektschlüssel alphabetisch sortieren',
      pretty: 'Formatieren',
      minify: 'Minifizieren',
      sameSize: 'gleiche Größe',
      sizeDelta: '{delta} % Zunder abgeplatzt',
      prettyFile: 'formatiert.json',
      minifiedFile: 'minifiziert.json',
    },

    viewer: {
      sourceTitle: 'Quelle',
      treeTitle: 'Baum',
      sourceLabel: 'JSON-Quelle',
      placeholder: '{\n  "hier": "das JSON einfügen, das du erkunden willst"\n}',
      idle: 'JSON einfügen oder ablegen, um es zu erkunden',
      filter: 'Schlüssel und Werte filtern',
      filterAria: 'Den Baum filtern',
      expandAll: 'Alles ausklappen',
      expandAllTitle: 'Jeden Knoten ausklappen',
      collapse: 'Einklappen',
      collapseTitle: 'Bis zur Wurzel einklappen',
      expand: 'Ausklappen',
      treeAria: 'JSON-Baum',
      nothingYet: 'Noch nichts zu zeigen',
      matching: p({ one: '{count} passender Knoten', other: '{count} passende Knoten' }),
      rowsShown: '{count} Zeilen angezeigt',
      noFilterMatch: 'Keine Schlüssel oder Werte passen zu diesem Filter.',
      emptyValid: 'Der Baum erscheint hier, sobald das Quellfeld gültiges JSON enthält.',
      emptyError: 'Behebe den Syntaxfehler im Quellfeld, und der Baum erscheint hier.',
    },

    validator: {
      documentTitle: 'Dokument',
      schemaTitle: 'JSON Schema',
      resultTitle: 'Ergebnis',
      documentLabel: 'Zu validierendes JSON-Dokument',
      placeholder: '{\n  "hier": "das JSON einfügen, das du prüfen willst"\n}',
      schemaPlaceholder: '{\n  "type": "object",\n  "required": ["id"]\n}',
      broken: 'Fehlerhaft',
      brokenTitle: 'Ein Dokument mit absichtlichen Syntaxfehlern laden',
      sampleValidTitle: 'Ein gültiges Beispiel laden',
      useSchema: 'Gegen ein Schema prüfen',
      useSchemaTitle: 'Das Dokument zusätzlich gegen ein JSON Schema prüfen',
      idle: 'JSON einfügen oder ablegen, um es zu validieren',
      checking: 'Wird geprüft…',
      invalidAt: 'Ungültiges JSON — Zeile {line}, Spalte {column}: {message}',
      schemaViolations: p({
        one: 'Gültiges JSON, aber {count} Schemaverstoß',
        other: 'Gültiges JSON, aber {count} Schemaverstöße',
      }),
      validAndMatches: 'Gültiges JSON und passend zum Schema',
      emptyBody:
        'Füge ein Dokument in das Dokumentfeld ein. Es wird beim Tippen geprüft, vollständig in diesem Tab.',
      firstProblem:
        'Der Parser hält beim ersten Problem an, auf das er trifft. Behebe dieses, und weitere Fehler weiter unten im Dokument erscheinen.',
      okSchema: 'Das Dokument ist gültiges JSON und erfüllt jede Regel des Schemas.',
      okPlain: 'Das Dokument ist gültiges JSON.',
      atLine: 'Z{line}',
    },

    diff: {
      originalTitle: 'Original',
      changedTitle: 'Geändert',
      comparisonTitle: 'Vergleich',
      originalLabel: 'Original-JSON',
      changedLabel: 'Geändertes JSON',
      originalPlaceholder: '{\n  "das": "Originaldokument"\n}',
      changedPlaceholder: '{\n  "das": "Dokument zum Vergleichen"\n}',
      swap: 'Tauschen',
      swapTitle: 'Die beiden Seiten tauschen',
      hideInput: 'Eingabe ausblenden',
      editInput: 'Eingabe bearbeiten',
      hideTitle: 'Die Editoren ausblenden und dem Vergleich die Seite geben',
      showTitle: 'Die Editoren wieder einblenden',
      foldSame: 'Gleiche einklappen',
      showAll: 'Alle zeigen',
      showAllTitle: 'Jede unveränderte Zeile zeigen, statt sie einzuklappen',
      split: 'Geteilt',
      stack: 'Gestapelt',
      splitTitle: 'Die beiden Dokumente nebeneinander zeigen',
      stackTitle: 'Die beiden Dokumente in einer Spalte stapeln',
      prev: 'Vorheriger Unterschied',
      next: 'Nächster Unterschied',
      prevTitle: 'Vorheriger Unterschied (Alt + ↑)',
      nextTitle: 'Nächster Unterschied (Alt + ↓)',
      keyboardHint: 'Alt + ↑ / ↓ springt durch die Unterschiede',
      truncated: 'Vergleich gekürzt — die Dokumente sind sehr groß',
      onlyOriginal: 'nur im Original',
      onlyChanged: 'nur im geänderten',
      replaced: 'ersetzt',
      headerOriginal: 'Original',
      headerChanged: 'Geändert',
      unifiedOriginal: '− Original',
      unifiedChanged: '+ geändert',
      idle: 'Füge auf jeder Seite ein Dokument ein — oder drück **Beispiel**, um es mit einem Paar zu probieren, das sich auf ein paar interessante Arten unterscheidet.',
      sideError:
        'Das {side} Dokument hat einen Syntaxfehler in Zeile {line}. Behebe ihn, und der Vergleich läuft.',
      sideOriginal: 'ursprüngliche',
      sideChanged: 'geänderte',
      comparing: 'Wird verglichen…',
      identicalTitle: 'Die beiden Dokumente sind gleichwertig',
      identicalBody:
        'Jeder Wert stimmt überein. Unterschiede in Schlüsselreihenfolge, Einrückung und Leerraum werden ignoriert, da keiner davon ändert, was das JSON bedeutet.',
      identicalLines: p({
        one: '{count} identische Zeile',
        other: '{count} identische Zeilen',
      }),
      showIdentical: 'Diese identischen Zeilen zeigen',
      jumpTo: 'Zum nächsten Unterschied vom Typ „{kind}“ springen',
      kinds: {
        added: 'hinzugefügt',
        removed: 'entfernt',
        changed: 'geändert',
        moved: 'verschoben',
      },
    },
  },
};
