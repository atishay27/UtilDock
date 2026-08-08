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
    privacyPillMobile: 'Was du einfügst, bleibt in diesem Tab',
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
    title: 'Kostenlose JSON- und JWT-Werkzeuge im Browser',
    headlineLead: 'Werkzeuge, die nie',
    headlineAccent: 'einen Server berühren.',
    lede: 'Kleine, scharfe Werkzeuge, die vollständig in diesem Tab laufen — kostenlos, werbefrei und ohne Anmeldung. Ein JSON-Formatter, -Viewer, -Validator und -Vergleich, dazu ein JWT-Decoder, der Signaturen prüft, ohne deinen Schlüssel je zu sehen.',
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
      'JSON kam zuerst, weil die meisten von uns am häufigsten danach greifen, und dann folgte ein JWT-Decoder — samt Signaturprüfung, die über die WebCrypto des Browsers läuft, sodass auch der Schlüssel dein Gerät nie verlässt. Die Liste wird weiter wachsen — immer nach denselben Regeln: schnell, kostenlos, werbefrei und vollständig clientseitig.',
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
    'jwt-decoder': [
      'Füge ein Token ein — mit oder ohne `Bearer`-Präfix — und es wird in seine drei Teile zerlegt, farblich getrennt, sodass du siehst, wo jeder endet. Header und Payload werden zu JSON decodiert, und die Claims werden noch einmal in verständlichen Worten aufgelistet: `exp`, `nbf` und `iat` als echte Daten und dazu, wie lange es her ist oder wie weit es hin ist.',
      '**Ein JWT zu decodieren heißt nicht, es zu verifizieren.** Die ersten beiden Teile sind base64url, keine Verschlüsselung: wer das Token hat, kann sie lesen — deshalb gehört in ein Token nie ein Geheimnis. Schalte **Signatur prüfen** ein und füge das gemeinsame Secret für ein HS-Verfahren oder einen öffentlichen Schlüssel für RS, PS oder ES ein, dann wird die Signatur wirklich geprüft — HS256/384/512, RS256/384/512, PS256/384/512 und ES256/384/512, über die WebCrypto des Browsers selbst.',
      'Der Schlüssel, den du einfügst, wird anders behandelt als jede andere Eingabe auf dieser Seite: Er wird nie in den `localStorage` geschrieben und beim Neuladen nicht wiederhergestellt. Nichts davon — weder Token noch Schlüssel — wird hochgeladen, und es gibt keinen Server, der beides empfangen könnte.',
    ],
    'jwt-encoder': [
      'Schreibe Header und Payload als JSON, wähle einen Algorithmus, und das Token wird beim Tippen zusammengesetzt und signiert. Die **Ablauf-Presets** stempeln `iat`, `exp` und auf Wunsch `nbf` aus einem einzigen Moment in den Payload, sodass die drei nie um eine Sekunde auseinanderliegen können — genau die Art Fehler, die erst in der Uhrzeit-Toleranz eines anderen Systems auffällt.',
      '`alg` wird immer aus dem gewählten Algorithmus geschrieben, egal was im Header steht. Das ist keine Bequemlichkeit: Ein Header, der einen Algorithmus behauptet, während die Signatur mit einem anderen erzeugt wurde, ist der Ausgangspunkt der bekanntesten JWT-Schwachstelle, und es gibt kein legitimes Token, das dieses Werkzeug deshalb verweigern würde. Jedes andere Header-Feld bleibt genau so, wie du es geschrieben hast.',
      'HS-Secrets, die kürzer sind als der Hash, werden **standardmäßig abgelehnt** — RFC 7518 verlangt 32 Byte für HS256, 48 für HS384 und 64 für HS512, und ein Browser signiert bereitwillig mit vier Zeichen, obwohl sich das Ergebnis offline in Sekunden knacken lässt. Die Prüfung lässt sich abschalten, denn ein schwaches Token nachzubauen ist manchmal genau die Aufgabe.',
      'Der Signaturschlüssel wird behandelt wie der Prüfschlüssel im Decoder, und noch sorgfältiger: nie in `localStorage` geschrieben, nie beim Neuladen wiederhergestellt, nie in einem Analytics-Ereignis, und es gibt kein Backend, das ihn empfangen könnte. Ein Signaturschlüssel ist das gefährlichste Geheimnis in einem System mit JWTs — für einen Produktionsschlüssel bleibt es die bessere Gewohnheit, Tokens in der eigenen Umgebung zu erzeugen.',
    ],
    'text-counter': [
      'Füge Text ein oder tippe ihn, und alle Zählungen aktualisieren sich gleichzeitig: Wörter, Zeichen mit und ohne Leerzeichen, Sätze, Absätze, Zeilen und UTF-8-Bytes. Es muss nichts gedrückt werden.',
      'Gezählt wird mit der **Unicode-Textsegmentierung** des Browsers statt durch Trennen an Leerzeichen, und der Unterschied ist nicht akademisch. Japanisch und Chinesisch setzen keine Leerzeichen zwischen Wörter, sodass eine Trennung an Leerzeichen einen ganzen Absatz als ein einziges Wort meldet; dieselbe Trennung zerschneidet „l’objet“ in zwei. Die Segmentierung weiß, wo Wörter in jeder Schrift wirklich enden, und die Lesezeit für CJK wird in Zeichen pro Minute statt in Wörtern gemessen.',
      'Das **Limit**-Panel verfolgt die Grenzen, gegen die tatsächlich geschrieben wird — ein Beitrag mit 280 Zeichen, eine SMS mit 160, ein Seitentitel mit 60, eine Meta-Beschreibung mit 155 — und die Häufigkeitstabelle zeigt, auf welche Wörter du dich gestützt hast. Schneller merkt man nicht, dass man sich wiederholt.',
    ],
    'text-formatter': [
      'Jede Operation ist ein Schalter, und nichts läuft, bevor du ihn umlegst. Mehrfache Leerzeichen zusammenfassen, Leerzeichen am Zeilenende entfernen, leere oder doppelte Zeilen löschen, Zeilen sortieren, Groß- und Kleinschreibung ändern oder die Zeichensetzung englischer Prosa aufräumen — in beliebiger Kombination. Das Ergebnis erscheint beim Tippen neben der Eingabe, und **Eingabe ersetzen** legt es zurück, damit du einen weiteren Durchgang fahren kannst.',
      'Das Werkzeug meldet, was jeder Schalter verändert hat — „12 doppelte Zeilen entfernt“, „3 wiederholte Wörter“ — statt dir ein umgeschriebenes Dokument zu geben und dich den Unterschied suchen zu lassen. Eine Regel, die zu Unrecht gegriffen hat, ist damit sichtbar statt vergraben.',
      '**Es korrigiert keine Grammatik und behauptet es auch nicht.** Kongruenz, Zeitform und Artikelwahl brauchen entweder einen Server oder ein Sprachmodell in WebAssembly; diese Seite hat kein Backend, und ihre Content-Security-Policy erlaubt kein WebAssembly. Stattdessen gibt es die mechanische Ebene — wiederholte Wörter, Abstände um Satzzeichen, gerade Anführungszeichen, Großschreibung — wo die richtige Antwort eine Regel ist und kein Urteil. Diese vier folgen englischer Typografie und sind standardmäßig aus, denn Französisch setzt seine Satzzeichen anders und CJK gar nicht ab.',
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

    jwt: {
      tokenTitle: 'Token',
      tokenLabel: 'Zu decodierendes JSON Web Token',
      placeholder: 'Ein JSON Web Token einfügen — drei Teile, durch Punkte getrennt',
      idle: 'Ein Token einfügen, um es zu lesen',
      decoded: 'Decodiert',

      segHeader: 'Header',
      segPayload: 'Payload',
      segSignature: 'Signatur',
      segChars: p({ one: '{count} Zeichen', other: '{count} Zeichen' }),

      sampleTitle: 'Ein echtes, korrekt signiertes Beispiel-Token laden',
      expired: 'Abgelaufen',
      expiredTitle: 'Ein Token laden, dessen Ablaufzeit bereits vorbei ist',

      faults: {
        'not-a-token':
          'Das ist kein JSON Web Token. Ein JWT besteht aus drei base64url-Teilen, die durch Punkte verbunden sind.',
        encrypted:
          'Das ist ein verschlüsseltes Token (ein JWE — fünf Teile statt drei). Sein Inhalt lässt sich ohne den Entschlüsselungsschlüssel nicht lesen, weder mit diesem noch mit einem anderen Werkzeug.',
        'too-few-parts':
          'Ein JWT hat drei durch Punkte verbundene Teile. Dieses hat weniger, es fehlt also etwas.',
        'too-many-parts':
          'Das hat mehr durch Punkte getrennte Teile, als ein JWT oder ein JWE haben kann.',
        'bad-base64':
          'Dieser Teil ist kein gültiges base64url und lässt sich nicht decodieren. Meist liegt es an einem abgeschnittenen Token.',
        'bad-json': 'Dieser Teil wurde decodiert, aber was dabei herauskam, ist kein JSON.',
        'not-an-object':
          'Dieser Teil ist JSON, aber Header und Payload eines Tokens müssen jeweils ein Objekt sein.',
      },

      headerTitle: 'Header',
      payloadTitle: 'Payload',
      headerLabel: 'Decodierter Header',
      payloadLabel: 'Decodierter Payload',
      algorithm: 'Algorithmus',
      keyId: 'Schlüssel-ID',
      tokenType: 'Typ',

      claimsTitle: 'Claims',
      registeredHeading: 'Registrierte Claims',
      customHeading: 'Eigene Claims',
      noClaims:
        'Füge ein Token in das Token-Panel ein, dann erscheinen seine Claims hier — in verständlichen Worten.',
      noCustomClaims: 'Dieses Token enthält nichts außer den registrierten Claims.',
      noRegisteredClaims:
        'Dieses Token enthält keinen der registrierten Claims — nicht einmal eine Ablaufzeit.',

      claimNames: {
        iss: 'Aussteller',
        sub: 'Subjekt',
        aud: 'Empfänger',
        exp: 'Läuft ab',
        nbf: 'Nicht vor',
        iat: 'Ausgestellt',
        jti: 'Token-ID',
      },
      claimHints: {
        iss: 'Wer dieses Token ausgestellt hat',
        sub: 'Worum oder um wen es geht',
        aud: 'Wer es akzeptieren soll',
        exp: 'Ab diesem Zeitpunkt muss es abgelehnt werden',
        nbf: 'Vor diesem Zeitpunkt muss es abgelehnt werden',
        iat: 'Wann es ausgestellt wurde',
        jti: 'Seine eindeutige ID, für den Widerruf',
      },

      windowExpired: 'Abgelaufen',
      windowNotYet: 'Noch nicht gültig',
      windowValid: 'Innerhalb seines Gültigkeitszeitraums',
      windowUnbounded: 'Keine Ablaufzeit — dieses Token wird nie ungültig',

      signatureTitle: 'Signatur',
      decodeNotVerify:
        'Ein JWT ist **codiert, nicht verschlüsselt** — wer dieses Token hat, kann alles darüber ohne Schlüssel lesen. Erst eine Signaturprüfung sagt dir, dass es echt und unverändert ist.',
      verify: 'Signatur prüfen',
      verifyTitle: 'Die Signatur gegen einen Schlüssel prüfen, hier in diesem Tab',
      secretLabel: 'Gemeinsames Secret',
      secretPlaceholder: 'Das Secret, mit dem dieses Token signiert wurde',
      keyLabel: 'Öffentlicher Schlüssel',
      keyPlaceholder: 'Ein öffentlicher PEM-Schlüssel, ein einzelner JWK oder ein ganzes JWKS',
      keyAria: 'Prüfschlüssel',
      base64Secret: 'Secret ist base64url',
      base64SecretTitle:
        'Das Secret vor der Verwendung als Schlüsselmaterial aus base64url decodieren',
      keyNeverStored:
        'Der Schlüssel wird benutzt und verworfen — nie in diesem Browser gespeichert, nie irgendwohin gesendet.',
      sampleSecretHint: 'Das Beispiel-Token ist mit `{secret}` signiert.',
      checking: 'Wird geprüft…',
      notChecked: 'Nicht geprüft',

      verdicts: {
        valid: 'Signatur verifiziert',
        invalid: 'Signatur passt nicht zu diesem Schlüssel',
        unsecured:
          'Ungesichertes Token — sein `alg` ist `none`, es trägt also keine Signatur und beweist nichts. Die meisten Bibliotheken lehnen solche Token rundweg ab.',
        unsupported: '{algorithm} ist kein Algorithmus, den dieses Werkzeug prüfen kann.',
        'bad-key':
          'Dieser Schlüssel ließ sich nicht lesen. Verwende einen PEM-Block, der mit `BEGIN PUBLIC KEY` beginnt, einen JWK oder ein JWKS.',
        'no-key': 'Gib einen Schlüssel ein, dann wird die Signatur beim Tippen geprüft.',
        'no-signature': 'Dieses Token hat keinen Signaturteil, es gibt also nichts zu prüfen.',
        'kid-mismatch':
          'Kein Schlüssel in diesem Set passt zur `kid` dieses Tokens, es gibt also nichts, wogegen geprüft werden könnte.',
        error: 'Die Signatur konnte in diesem Browser nicht geprüft werden.',
      },
    },
    jwtEncoder: {
      headerTitle: 'Header',
      payloadTitle: 'Payload',
      tokenTitle: 'Signiertes Token',
      headerLabel: 'JWT-Header als JSON',
      payloadLabel: 'JWT-Payload als JSON',
      tokenLabel: 'Das signierte Token',
      headerPlaceholder: '{\n  "kid": "deine-key-id"\n}',
      payloadPlaceholder: '{\n  "sub": "user_123",\n  "name": "Ada Lovelace"\n}',

      algorithm: 'Algorithmus',
      algorithmTitle: 'Wie dieses Token signiert wird — steht auch im Header',
      unsecured: 'none — unsigniert',
      unsecuredWarning:
        'Dies ist ein **ungesichertes Token**: `alg` ist `none`, es trägt keine Signatur und beweist nichts. Die meisten Bibliotheken lehnen es rundweg ab. Nur nützlich, um zu prüfen, dass deine das auch tut.',

      signingTitle: 'Signaturschlüssel',
      secretLabel: 'Gemeinsames Secret',
      secretPlaceholder: 'Das Secret, mit dem dieses Token signiert wird',
      keyLabel: 'Privater Schlüssel',
      keyPlaceholder: 'Ein privater PKCS#8-Schlüssel oder ein privates JWK',
      keyAria: 'Signaturschlüssel',
      base64Secret: 'Secret ist base64url',
      base64SecretTitle: 'Das Secret vor der Verwendung als Schlüsselmaterial aus base64url dekodieren',
      keyNeverStored:
        'Der Schlüssel wird benutzt und verworfen — nie in diesem Browser gespeichert, nie irgendwohin gesendet.',
      keyIsDangerous:
        'Ein Signaturschlüssel erzeugt Tokens, die deine Systeme akzeptieren. Für Produktionsschlüssel besser die eigene Umgebung.',
      allowWeak: 'Kurzes Secret erlauben',
      allowWeakTitle:
        'Auch signieren, wenn das Secret kürzer ist als RFC 7518 verlangt — zum Nachbauen eines schwachen Tokens',
      sampleSecretHint: 'Das Beispiel signiert mit `{secret}`.',

      claimsTitle: 'Zeit-Claims',
      stamp: 'Stempeln',
      stampTitle: 'iat, exp und nbf aus diesem Moment in den Payload schreiben',
      expiresIn: 'Läuft ab in',
      includeNotBefore: 'Auch nbf setzen',
      includeNotBeforeTitle: 'Einen „nicht vor“-Claim hinzufügen, auf jetzt gesetzt',
      expiryPresets: {
        '15m': '15 Minuten',
        '1h': '1 Stunde',
        '24h': '24 Stunden',
        '7d': '7 Tage',
        '30d': '30 Tage',
      },
      stamped: 'iat und exp in den Payload gestempelt',

      segHeader: 'Header',
      segPayload: 'Payload',
      segSignature: 'Signatur',
      segChars: p({ one: '{count} Zeichen', other: '{count} Zeichen' }),

      idle: 'Schreibe einen Payload und wähle einen Schlüssel, um ein Token zu erzeugen',
      signing: 'Signiere…',
      signed: 'Token signiert',
      signedUnsecured: 'Ungesichertes Token erstellt — es trägt keine Signatur',
      tokenFile: 'token.jwt',
      emptyToken:
        'Hier erscheint das signierte Token. Dafür wird nichts hochgeladen — die Signatur berechnet dieser Browser.',

      faults: {
        'bad-header-json': 'Der Header ist kein gültiges JSON, also gibt es noch nichts zu kodieren.',
        'bad-payload-json': 'Der Payload ist kein gültiges JSON, also gibt es noch nichts zu kodieren.',
        'header-not-object':
          'Ein Token-Header muss ein JSON-Objekt sein, kein Array und kein einzelner Wert.',
        'payload-not-object':
          'Ein Token-Payload muss ein JSON-Objekt sein, kein Array und kein einzelner Wert.',
        unsupported: 'Mit diesem Algorithmus kann dieses Werkzeug nicht signieren.',
        'no-key': 'Gib einen Schlüssel ein, und das Token wird beim Tippen signiert.',
        'bad-key':
          'Dieser Schlüssel ließ sich nicht lesen. Nutze einen PEM-Block, der mit `BEGIN PRIVATE KEY` beginnt, oder ein privates JWK — das mit einem `d`-Wert.',
        'weak-secret':
          '{algorithm} verlangt ein Secret von mindestens {required} Byte; dieses hat {actual}. Ein kürzeres Secret lässt sich offline knacken. Schalte **Kurzes Secret erlauben** ein, um trotzdem zu signieren.',
        error: 'Das Token konnte in diesem Browser nicht signiert werden.',
      },
    },

    counter: {
      inputTitle: 'Text',
      inputLabel: 'Zu zählender Text',
      placeholder: 'Füge den Text ein, den du messen willst, oder tippe ihn…',
      idle: 'Text einfügen oder tippen, um ihn zu zählen',
      counting: 'Zähle…',

      countsTitle: 'Zählungen',
      words: 'Wörter',
      characters: 'Zeichen',
      charactersNoSpaces: 'Ohne Leerzeichen',
      sentences: 'Sätze',
      paragraphs: 'Absätze',
      lines: 'Zeilen',
      bytes: 'UTF-8-Bytes',

      timeTitle: 'Lesedauer',
      readingTime: 'Lesen',
      speakingTime: 'Laut vorlesen',
      underAMinute: 'unter einer Minute',
      minutesAndSeconds: '{minutes} Min. {seconds} Sek.',
      justSeconds: '{seconds} Sek.',

      averagesTitle: 'Durchschnitt',
      averageWordLength: 'Wortlänge',
      averageSentenceLength: 'Wörter pro Satz',
      longestWord: 'Längstes Wort',
      charsUnit: p({ one: '{count} Zeichen', other: '{count} Zeichen' }),
      wordsUnit: p({ one: '{count} Wort', other: '{count} Wörter' }),

      limitsTitle: 'Grenzen',
      limitNames: {
        tweet: 'Beitrag (X)',
        sms: 'SMS',
        'page-title': 'Seitentitel',
        'meta-description': 'Meta-Beschreibung',
      },
      remaining: '{count} übrig',
      over: '{count} zu viel',
      limitsNote:
        'Die beiden SEO-Grenzen sind Näherungen — Suchmaschinen kürzen nach Breite, nicht nach Zeichen.',

      frequencyTitle: 'Häufigste Wörter',
      frequencyEmpty: 'Die Wörter, die du am häufigsten nutzt, erscheinen hier, sobald es Text gibt.',
      frequencyCount: p({ one: '{count}-mal', other: '{count}-mal' }),

      emptyBody:
        'Füge links Text ein. Jede Zählung aktualisiert sich beim Tippen, vollständig in diesem Tab.',
      impreciseNotice:
        'Dieser Browser hat keine Unicode-Textsegmentierung, daher werden Wörter an Leerzeichen getrennt gezählt. Für Chinesisch, Japanisch und Koreanisch ist die Zahl falsch.',
      cjkNotice:
        'Als CJK gezählt: Wörter werden segmentiert statt an Leerzeichen getrennt, und die Lesezeit wird in Zeichen pro Minute gemessen.',
    },

    textFormatter: {
      inputTitle: 'Eingabe',
      outputTitle: 'Formatiert',
      optionsTitle: 'Was gefixt wird',
      inputLabel: 'Zu formatierender Text',
      outputLabel: 'Formatierter Text',
      placeholder: 'Füge den Text ein, den du aufräumen willst…',
      idle: 'Text einfügen und auswählen, was gefixt wird',
      formatting: 'Formatiere…',

      whitespaceHeading: 'Leerraum',
      trimLineEnds: 'Leerzeichen am Zeilenende',
      trimLineEndsTitle: 'Leerzeichen und Tabs am Ende jeder Zeile entfernen',
      collapseSpaces: 'Mehrfache Leerzeichen',
      collapseSpacesTitle:
        'Folgen von Leerzeichen oder Tabs auf eines reduzieren, Einrückung bleibt erhalten',
      collapseBlankLines: 'Überzählige Leerzeilen',
      collapseBlankLinesTitle: 'Zwei oder mehr Leerzeilen auf eine reduzieren',
      removeBlankLines: 'Alle Leerzeilen',
      removeBlankLinesTitle: 'Jede Leerzeile entfernen',
      trimDocument: 'Anfang und Ende',
      trimDocumentTitle: 'Leerraum am Anfang und Ende des gesamten Dokuments entfernen',
      tabsToSpaces: 'Tabs zu Leerzeichen',
      tabsToSpacesTitle: 'Jeden Tab durch zwei Leerzeichen ersetzen',

      linesHeading: 'Zeilen',
      removeDuplicateLines: 'Doppelte Zeilen',
      removeDuplicateLinesTitle:
        'Das erste Vorkommen jeder Zeile behalten; Leerzeilen bleiben erhalten',
      sortLines: 'Sortieren',
      sortModes: {
        none: 'Nicht sortieren',
        asc: 'A bis Z',
        desc: 'Z bis A',
      },

      caseHeading: 'Schreibung',
      caseModes: {
        none: 'So lassen',
        lower: 'kleinbuchstaben',
        upper: 'GROSSBUCHSTABEN',
        title: 'Titel-Schreibung',
        sentence: 'Satz-Schreibung',
      },

      writingHeading: 'Zeichensetzung',
      fixRepeatedWords: 'Wiederholte Wörter',
      fixRepeatedWordsTitle: 'Ein versehentlich verdoppeltes Wort zusammenfassen, etwa „die die“',
      spaceAfterPunctuation: 'Leerzeichen nach Satzzeichen',
      spaceAfterPunctuationTitle:
        'Das fehlende Leerzeichen nach Komma oder Punkt ergänzen — nie in Zahlen, URLs oder z. B.',
      removeSpaceBeforePunctuation: 'Leerzeichen vor Satzzeichen',
      removeSpaceBeforePunctuationTitle:
        'Ein Leerzeichen vor Komma, Punkt oder Doppelpunkt entfernen',
      smartQuotes: 'Typografische Anführungszeichen',
      smartQuotesTitle:
        'Gerade Anführungszeichen in typografische umwandeln; Code in Backticks bleibt unberührt',


      changesTitle: 'Was sich geändert hat',
      noChanges: 'Es musste nichts geändert werden.',
      nothingEnabled: 'Schalte mindestens eine Option ein, dann erscheint hier das Ergebnis.',
      replaceInput: 'Eingabe ersetzen',
      replaceInputTitle: 'Das Ergebnis zurück in die Eingabe legen, für einen weiteren Durchgang',
      reset: 'Zurücksetzen',
      resetTitle: 'Alle Schalter auf ihren Standard zurückstellen',
      outputFile: 'formatierter-text.txt',
      emptyBody:
        'Hier erscheint der aufgeräumte Text. Nichts wird hochgeladen — jede Umformung läuft in diesem Tab.',
    },
  },
};
