import type { CategoryCopyOverrides, ToolCopyOverrides } from './types';

export const categoriesDe: CategoryCopyOverrides = {
  json: {
    blurb: 'JSON lesen, prüfen, vergleichen und umformen, ohne die Seite zu verlassen.',
  },
  jwt: {
    blurb: 'Lies, was ein Token behauptet — und prüfe, dass es wirklich signiert wurde.',
  },
  text: {
    name: 'Text',
    blurb: 'Einen Text vermessen und ihn sauber abrichten.',
  },
};

/**
 * German developers search for these tools in English — "json formatter", not
 * "JSON-Formatierer" — so the names keep the English noun. The keyword lists
 * carry the German phrasings that do get typed, mostly verb forms like "json
 * formatieren" and "json vergleichen".
 */
export const toolsDe: ToolCopyOverrides = {
  'json-formatter': {
    name: 'JSON Formatter',
    tagline: 'Eine unlesbare Antwort formatieren — oder minifizieren',
    does: ['Formatieren', 'Auf eine Zeile minifizieren', 'Schlüssel sortieren', 'Einrückung 2 / 4 / Tab'],
    title: 'JSON Formatter — formatieren und minifizieren',
    description:
      'Kostenloser JSON Formatter und Minifier. Mit beliebiger Einrückung formatieren, auf eine Zeile komprimieren, Schlüssel sortieren. Läuft im Browser.',
    overview:
      'Ein JSON Formatter und Minifier in einem. Formatiere mit zwei, drei oder vier Leerzeichen oder mit Tabs, komprimiere das Dokument zurück auf eine einzige Zeile, oder sortiere die Schlüssel jedes Objekts alphabetisch, damit sich zwei Dateien in der Versionsverwaltung sauber vergleichen lassen. Das Ergebnis aktualisiert sich beim Tippen, und das Dokument wird nie hochgeladen.',
    faqs: [
      {
        q: 'Was ist der Unterschied zwischen JSON formatieren und minifizieren?',
        a: 'Formatieren fügt Einrückung und Zeilenumbrüche hinzu, damit die Struktur lesbar wird. Minifizieren entfernt jedes Byte optionalen Leerraums, und das willst du, bevor du JSON in eine Umgebungsvariable, eine URL oder über die Leitung packst. Beide erzeugen dieselben Daten.',
      },
      {
        q: 'Wozu sollte ich die Schlüssel sortieren?',
        a: 'Zwei Dokumente, die dasselbe beschreiben, ihre Schlüssel aber in unterschiedlicher Reihenfolge auflisten, erzeugen einen verrauschten Text-Diff. Schlüssel alphabetisch zu sortieren macht sie dort byte-identisch, wo sie übereinstimmen, sodass in der Versionsverwaltung nur echte Änderungen erscheinen.',
      },
      {
        q: 'Kommt er mit sehr großen Dateien zurecht?',
        a: 'Ja. Parsen und Formatieren laufen in einem Web Worker, sodass Dokumente von mehreren Megabyte neu formatiert werden, ohne dass die Seite beim Tippen nicht mehr reagiert.',
      },
      {
        q: 'Wird mein JSON auf einen Server hochgeladen?',
        a: 'Niemals. Der Formatter ist JavaScript, das in deinem eigenen Tab läuft, und es gibt kein Backend, an das etwas gesendet werden könnte. Er funktioniert auch bei getrennter Netzwerkverbindung weiter.',
      },
    ],
    keywords: [
      'json formatter',
      'json formatieren',
      'json formatter online',
      'json beautifier',
      'json minifizieren',
      'json formatter kostenlos',
      'json formatieren ohne upload',
    ],
  },

  'json-viewer': {
    name: 'JSON Viewer',
    tagline: 'Ein Payload erkunden, das zu groß zum Durchscrollen ist',
    does: ['Einklappbarer Baum', 'Schlüssel und Werte suchen', 'Jeden Pfad kopieren', 'Schafft 100.000+ Knoten'],
    title: 'JSON Viewer — einklappbarer Baum mit Suche',
    description:
      'Kostenloser JSON Viewer. Jedes Dokument als einklappbaren, farbkodierten Baum erkunden, Schlüssel und Werte suchen, Pfade kopieren. Läuft im Browser.',
    overview:
      'Ein JSON Viewer, der aus einer Textwand eine lesbare Struktur macht. Füge eine API-Antwort, eine Konfigurationsdatei oder eine Logzeile ein und erkunde sie als einklappbaren Baum — nach Typ eingefärbt, durchsuchbar nach Schlüssel oder Wert, mit jedem Pfad einen Klick von deiner Zwischenablage entfernt. Nichts wird hochgeladen: das Dokument wird in diesem Tab geparst.',
    faqs: [
      {
        q: 'Ist es sicher, Produktionsdaten in diesen JSON Viewer einzufügen?',
        a: 'Ja. Das Dokument verlässt deinen Browser nie. Es gibt keinen Upload, kein serverseitiges Parsen und keine Anfrage, die deine Daten mitträgt — du kannst die Netzwerkverbindung trennen, und der Viewer arbeitet weiter. Öffne den Netzwerk-Tab deines Browsers, während du ihn benutzt, und du wirst sehen, dass nichts aus dem Editor irgendwohin gesendet wird.',
      },
      {
        q: 'Wie große JSON-Dateien kann er öffnen?',
        a: 'Dokumente von mehreren Megabyte sind kein Problem. Das Parsen läuft in einem Web Worker, sodass die Seite nie einfriert, und es werden nur die gerade sichtbaren Baumzeilen gerendert, sodass Dokumente mit Hunderttausenden Knoten flüssig scrollbar bleiben.',
      },
      {
        q: 'Wie kopiere ich den Pfad zu einem Wert?',
        a: 'Fahr über eine beliebige Zeile und klick auf die Pfad-Schaltfläche. Du erhältst den vollständigen Pfad zu diesem Wert, bereit zum Einfügen in deinen Code oder in einen jq-Ausdruck.',
      },
      {
        q: 'Kostet es etwas oder braucht es ein Konto?',
        a: 'Nein. Jedes Werkzeug auf UtilDock ist kostenlos, werbefrei, ohne Anmeldung und ohne Nutzungslimit.',
      },
    ],
    keywords: [
      'json viewer',
      'json anzeigen',
      'json baum viewer',
      'json online ansehen',
      'json viewer online kostenlos',
      'große json datei ansehen',
    ],
  },

  'json-validator': {
    name: 'JSON Validator',
    tagline: 'Die exakte Zeile finden, an der etwas ablehnt',
    does: ['Exakte Zeile und Spalte', 'JSON Schema 2020-12 / 2019-09 / 07', 'Zu jedem Fehler springen'],
    title: 'JSON Validator — Syntax- und Schemafehler',
    description:
      'Kostenloser JSON Validator. Exakte Zeile und Spalte jedes Syntaxfehlers, dazu Prüfung gegen ein JSON Schema. Läuft vollständig im Browser.',
    overview:
      'Ein JSON Validator, der dir sagt, wo das Problem liegt, nicht nur dass es eines gibt. Jeder Syntaxfehler wird mit exakter Zeile und Spalte gemeldet und im Editor unterstrichen. Schalte die Schemaprüfung ein, und auch die Form deiner Daten wird validiert — gegen JSON Schema Draft 2020-12, 2019-09 oder 07. Sowohl Dokument als auch Schema bleiben in diesem Tab.',
    faqs: [
      {
        q: 'Warum ist mein JSON ungültig, obwohl es korrekt aussieht?',
        a: 'Die üblichen Ursachen sind ein überzähliges Komma nach dem letzten Eintrag, Schlüssel oder Zeichenketten in einfachen statt doppelten Anführungszeichen, ein nicht escapter Zeilenumbruch oder Backslash in einer Zeichenkette, oder ein verirrter Kommentar — JSON erlaubt nichts davon. Der Validator zeigt auf die exakte Zeile und Spalte, damit du siehst, welches es ist.',
      },
      {
        q: 'Welche JSON-Schema-Drafts werden unterstützt?',
        a: 'Die Drafts 2020-12, 2019-09 und 07, einschließlich der Standard-Formatschlüsselwörter wie date-time, email und uri. Jeder Verstoß wird mit seinem Pfad aufgelistet, und ein Klick darauf springt im Dokument dorthin.',
      },
      {
        q: 'Werden meine Daten oder mein Schema irgendwohin gesendet?',
        a: 'Nein. Die Validierung läuft als JavaScript in deinem eigenen Tab, sodass ein Produktions-Payload oder ein internes Schema nie deinen Rechner verlässt. Es gibt keinen Server, der sie empfangen könnte.',
      },
      {
        q: 'Kann er JSON Lines oder JSON mit Kommentaren validieren?',
        a: 'Noch nicht — der Validator prüft striktes JSON nach RFC 8259, das ist das, was die meisten Parser und APIs akzeptieren. Unterstützung für JSONC und NDJSON steht auf der Liste.',
      },
    ],
    keywords: [
      'json validator',
      'json validieren',
      'json schema validator',
      'json syntax prüfen',
      'json validator online kostenlos',
      'json schema validator online',
    ],
  },

  'json-diff': {
    name: 'JSON Vergleich',
    tagline: 'Sehen, was sich zwischen zwei Dokumenten wirklich geändert hat',
    does: [
      'Struktureller Vergleich',
      'Ignoriert Schlüsselreihenfolge',
      'Ordnet Array-Elemente per id zu',
      'Nebeneinander',
    ],
    title: 'JSON Diff — zwei Dokumente visuell vergleichen',
    description:
      'Kostenloser JSON-Vergleich. Zwei Dokumente nebeneinander, mit farbkodierten Hinzufügungen, Entfernungen und Änderungen. Läuft im Browser.',
    overview:
      'Ein JSON-Vergleich, in dem du bearbeiten kannst. Die beiden Dokumente stehen als lebende Editoren nebeneinander, mit dem Unterschied dazwischen gezeichnet: Rot markiert, was nur JSON 1 hat, Grün, was nur JSON 2 hat, und die Pfeile in der Naht kopieren einen Block in beide Richtungen — du kannst das Paar also beim Lesen angleichen. Keine Seite ist die Vorlage. Und weil das Urteil strukturell statt textuell ist, zählen umsortierte Schlüssel und andere Einrückung nie als Änderung.',
    faqs: [
      {
        q: 'Was ist der Unterschied zwischen einem JSON-Diff und einem Text-Diff?',
        a: 'Ein Text-Diff vergleicht Zeichen, sodass das Neuformatieren einer Datei oder das Umsortieren ihrer Schlüssel als Hunderte von Änderungen erscheint. Dieses Werkzeug parst zuerst beide Dokumente und vergleicht Werte, sodass nur Unterschiede gemeldet werden, die ändern, was das JSON bedeutet.',
      },
      {
        q: 'Wie werden Arrays verglichen?',
        a: 'Elemente werden über ihre Identität zugeordnet, wo es eine gibt — ein Feld id, key, uuid oder name. Das Einfügen eines Elements am Anfang meldet deshalb eine einzige Hinzufügung, statt jedes nachfolgende Element neu zu schreiben, und Elemente, die sich nur verschoben haben, werden als Verschiebungen gemeldet.',
      },
      {
        q: 'Beeinflussen Schlüsselreihenfolge oder Formatierung das Ergebnis?',
        a: 'Nein. Schlüsselreihenfolge, Einrückung und Leerraum am Zeilenende werden ignoriert. Zwei Dokumente, die sich nur in der Formatierung unterscheiden, gelten als identisch.',
      },
      {
        q: 'Werden die beiden Dokumente irgendwohin hochgeladen?',
        a: 'Nein. Beide werden in einem Web Worker innerhalb dieses Tabs geparst und verglichen. Es wird nichts an einen Server gesendet, und darauf kommt es an, wenn du zwei Produktions-Payloads vergleichst.',
      },
    ],
    keywords: [
      'json diff',
      'json vergleichen',
      'json vergleich online',
      'json unterschiede',
      'zwei json dateien vergleichen',
      'json diff online kostenlos',
    ],
  },

  'jwt-decoder': {
    name: 'JWT Decoder',
    tagline: 'Die Claims eines Tokens lesen — und seine Signatur beweisen',
    does: [
      'Header und Payload',
      'Ablauf in Klartext',
      'Signaturprüfung',
      'Secret oder Public Key',
    ],
    title: 'JWT Decoder — dekodieren und verifizieren',
    description:
      'Kostenloser JWT-Decoder. Header, Payload und Ablaufzeit eines JSON Web Tokens lesen und seine Signatur verifizieren. Token und Schlüssel verlassen den Browser nie.',
    overview:
      'Ein JWT-Decoder, der ein Token in seine drei Teile zerlegt, Header und Payload dekodiert und jeden Claim in Klartext auflistet — Ablauf, „nicht vor“ und Ausstellungszeit als echte Daten statt als Sekunden seit 1970. Er verifiziert auch die Signatur: Füge das gemeinsame Secret für ein HS-Verfahren oder einen öffentlichen Schlüssel für RS, PS oder ES ein, und die Prüfung läuft über die WebCrypto deines eigenen Browsers. Weder Token noch Schlüssel werden je hochgeladen, und der Schlüssel wird nicht einmal in diesem Browser gespeichert.',
    faqs: [
      {
        q: 'Ist es sicher, ein echtes JWT in diesen Decoder einzufügen?',
        a: 'Ja. Das Token wird von JavaScript in deinem eigenen Tab dekodiert, und es gibt kein Backend, an das es gehen könnte — trenne die Netzwerkverbindung, und der Decoder arbeitet weiter. Bei JWTs zählt das mehr als bei fast allen anderen Daten: Ein Token ist eine aktive Zugangsberechtigung, und wer es auf einer Seite einfügt, die es an einen Server schickt, gibt alles preis, was es gewährt.',
      },
      {
        q: 'Heißt dekodiert auch gültig?',
        a: 'Nein, und der Unterschied ist wesentlich. Header und Payload sind base64url-codiert, nicht verschlüsselt — wer das Token hat, kann sie lesen. Deshalb gehört in ein JWT nie ein Geheimnis. Erst die Prüfung der Signatur gegen den richtigen Schlüssel sagt dir, dass das Token echt und unverändert ist und dass man seinen Claims trauen kann.',
      },
      {
        q: 'Welche Signaturverfahren kann er prüfen?',
        a: 'HS256, HS384 und HS512 mit einem gemeinsamen Secret sowie RS256/384/512, PS256/384/512 und ES256/384/512 mit einem öffentlichen Schlüssel als PEM-Block, einzelnem JWK oder ganzem JWKS — dann wählt die kid des Tokens den passenden Schlüssel aus. Die Prüfung nutzt die eingebaute WebCrypto des Browsers, es wird also kein Schlüsselmaterial irgendwohin gesendet.',
      },
      {
        q: 'Wird mein Signaturschlüssel oder Secret gespeichert?',
        a: 'Nein. Alle anderen Werkzeuge hier sichern deine Eingabe im localStorage, damit ein Neuladen die Arbeit nicht verliert; der Prüfschlüssel ist davon bewusst ausgenommen. Er bleibt im Arbeitsspeicher, wird für die Prüfung benutzt und ist fort, sobald du die Seite verlässt.',
      },
      {
        q: 'Warum wird mein Token als abgelaufen angezeigt?',
        a: 'Der exp-Claim ist ein NumericDate — Sekunden seit 1970 — und der Decoder zeigt ihn als echtes Datum samt der Angabe, wie lange er schon vorbei ist. Ein abgelaufenes Token ist die häufigste Ursache für ein plötzliches 401 von einer API, die eben noch funktionierte. Ein nbf-Claim in der Zukunft bewirkt dasselbe am anderen Ende.',
      },
    ],
    keywords: [
      'jwt decoder',
      'jwt dekodieren',
      'jwt signatur prüfen',
      'json web token decoder',
      'jwt token anzeigen',
      'jwt decoder online kostenlos',
      'jwt dekodieren ohne upload',
    ],
  },

  'jwt-encoder': {
    name: 'JWT-Encoder',
    tagline: 'Ein Token aus Claims bauen — und wirklich signieren',
    does: ['Header und Payload', 'HS / RS / PS / ES', 'Ablauf-Presets', 'Signiert mit WebCrypto'],
    title: 'JWT-Encoder — Token bauen und signieren',
    description:
      'Kostenloser JWT-Encoder. Baue ein JSON Web Token aus eigenen Claims und signiere es mit HS, RS, PS oder ES. Der Schlüssel verlässt den Browser nie.',
    overview:
      'Ein JWT-Encoder, der ein echt signiertes Token erzeugt statt einer Base64-Attrappe. Schreibe Header und Payload als JSON, wähle einen Algorithmus und füge das gemeinsame Secret für ein HS-Verfahren oder einen privaten PKCS#8-Schlüssel für RS, PS oder ES ein — die Signatur berechnet die WebCrypto deines eigenen Browsers. Ablauf, Ausstellzeit und „nicht vor“ lassen sich per Preset stempeln, sodass du nie wieder einen Epoch-Wert von Hand umrechnest.',
    faqs: [
      {
        q: 'Ist es sicher, einen Signaturschlüssel hier einzufügen?',
        a: 'Der Schlüssel wird in deinem eigenen Tab benutzt und verworfen — nie gespeichert, nie in einem Analytics-Ereignis, und es gibt kein Backend, das ihn empfangen könnte. Dennoch: Ein Signaturschlüssel ist das gefährlichste Geheimnis in jedem System mit JWTs, denn wer ihn hat, kann Tokens erzeugen, die deine Dienste akzeptieren. Für einen Produktionsschlüssel bleibt es die bessere Gewohnheit, Tokens in der eigenen Umgebung zu erzeugen; dieses Werkzeug ist für Entwicklung, Tests und Lernen gedacht.',
      },
      {
        q: 'Mit welchen Algorithmen kann es signieren?',
        a: 'HS256, HS384 und HS512 mit einem gemeinsamen Secret sowie RS256/384/512, PS256/384/512 und ES256/384/512 mit einem privaten Schlüssel als PKCS#8-PEM-Block oder privatem JWK. Es erzeugt auch das ungesicherte `alg: none`-Token, deutlich als beweislos gekennzeichnet — denn so prüfst du, dass dein Verifizierer es ablehnt.',
      },
      {
        q: 'Warum wird mein kurzes Secret abgelehnt?',
        a: 'RFC 7518 verlangt einen HMAC-Schlüssel, der mindestens so lang ist wie der Hash: 32 Byte für HS256, 48 für HS384, 64 für HS512. Browser signieren bereitwillig mit einem Secret aus vier Zeichen, und das entstehende Token lässt sich offline in Sekunden knacken. Der Encoder blockiert das standardmäßig und lässt dich es übergehen, denn ein schwaches Token nachzubauen ist manchmal genau die Aufgabe.',
      },
      {
        q: 'Kann es den Algorithmus in meinem Header überschreiben?',
        a: 'Es schreibt `alg` immer aus dem gewählten Algorithmus, und das mit Absicht. Ein Header, der einen Algorithmus behauptet, während die Signatur mit einem anderen erzeugt wurde, ist kein Token, sondern der Ausgangspunkt der bekanntesten JWT-Schwachstelle. Jedes andere Header-Feld — `kid`, `cty`, beliebige eigene — bleibt genau so, wie du es geschrieben hast.',
      },
    ],
    keywords: [
      'jwt encoder',
      'jwt generator',
      'jwt erstellen',
      'jwt signieren online',
      'json web token generator',
      'jwt token generator online',
      'jwt hs256 signieren online',
    ],
  },

  'text-counter': {
    name: 'Textzähler',
    tagline: 'Wörter, Zeichen, Sätze und Absätze auf einmal',
    does: ['Wörter und Zeichen', 'Sätze und Absätze', 'Lesedauer', 'Worthäufigkeit'],
    title: 'Wortzähler — Wörter, Zeichen, Sätze',
    description:
      'Kostenloser Wort- und Zeichenzähler. Zählt Wörter, Zeichen, Sätze und Absätze beim Tippen, mit Lesedauer. Läuft in deinem Browser.',
    overview:
      'Ein Wortzähler, der alles gleichzeitig zählt — Wörter, Zeichen mit und ohne Leerzeichen, Sätze, Absätze, Zeilen und UTF-8-Bytes — und sich beim Tippen aktualisiert. Er schätzt außerdem Lese- und Sprechdauer, verfolgt die Grenzen, gegen die tatsächlich geschrieben wird, und listet die am häufigsten genutzten Wörter. Gezählt wird mit der Unicode-Textsegmentierung des Browsers, sodass Japanisch und Chinesisch nach Wörtern gezählt werden statt als ein einziges riesiges Wort zu erscheinen.',
    faqs: [
      {
        q: 'Wie zählt es Wörter auf Japanisch oder Chinesisch?',
        a: 'Richtig — was die meisten Wortzähler nicht tun. Japanisch und Chinesisch setzen keine Leerzeichen zwischen Wörter, also meldet eine Zählung per Leerzeichen-Trennung einen ganzen Absatz als ein Wort. Dieses Werkzeug nutzt die im Browser eingebaute Unicode-Textsegmentierung, die weiß, wo Wörter in jeder Schrift wirklich enden, und misst die Lesedauer für CJK in Zeichen statt in Wörtern pro Minute.',
      },
      {
        q: 'Was zählt als Satz oder als Absatz?',
        a: 'Ein Satz wird nach den Unicode-Regeln zur Satztrennung bestimmt, sodass „Dr. Smith fuhr gestern nach Washington D.C.“ ein Satz ist und nicht drei, und der ideografische Punkt erkannt wird. Ein Absatz ist ein durch eine Leerzeile getrennter Block; enthält der Text gar keine Leerzeilen, zählt jede nicht leere Zeile als einer.',
      },
      {
        q: 'Wie wird die Lesedauer berechnet?',
        a: 'Mit 238 Wörtern pro Minute für alphabetischen Text — dem Median für stilles Lesen allgemeiner Prosa durch Erwachsene — und 400 Zeichen pro Minute für CJK. Die Sprechdauer nutzt die langsameren Werte, die ein Vortragender tatsächlich schafft, rund 140 Wörter pro Minute. Das sind Schätzungen, keine Messungen: dichte Fachtexte laufen langsamer als ein Roman.',
      },
      {
        q: 'Wird mein Text irgendwohin hochgeladen?',
        a: 'Nein. Gezählt wird von JavaScript in deinem eigenen Tab, in einem Web Worker, damit ein langes Dokument die Seite nicht einfriert. Trenne die Netzwerkverbindung, und es läuft weiter. Bei einem Textzähler zählt das mehr, als es klingt, denn was Leute zählen, sind meist Entwürfe, Bewerbungen und unveröffentlichte Texte.',
      },
    ],
    keywords: [
      'wörter zählen',
      'zeichen zählen',
      'wortzähler online',
      'zeichenzähler',
      'sätze zählen',
      'wörter und zeichen zählen kostenlos',
      'lesezeit berechnen',
    ],
  },

  'text-formatter': {
    name: 'Textformatierer',
    tagline: 'Das Chaos aus fremdem Text herausholen',
    does: [
      'Zusatzleerzeichen entfernen',
      'Doppelte Zeilen löschen',
      'Schreibung ändern',
      'Zeichensetzung ordnen',
    ],
    title: 'Textformatierer — unordentlichen Text säubern',
    description:
      'Kostenloser Textformatierer und -reiniger. Entferne Zusatzleerzeichen und doppelte Zeilen, ändere die Schreibung und ordne die Zeichensetzung. Im Browser.',
    overview:
      'Ein Textformatierer, den du steuerst, statt eines, der für dich entscheidet. Jede Operation ist ein Schalter — mehrfache Leerzeichen zusammenfassen, Leerzeichen am Zeilenende entfernen, doppelte oder leere Zeilen löschen, Zeilen sortieren, in Groß-, Klein-, Titel- oder Satzschreibung umwandeln und die Zeichensetzung englischer Prosa aufräumen. Nichts läuft, bevor du es einschaltest, und das Werkzeug meldet genau, was jeder Schalter verändert hat — das Ergebnis ist damit etwas zum Annehmen statt zum Nachlesen.',
    faqs: [
      {
        q: 'Kann es Grammatik korrigieren?',
        a: 'Nein, und es sagt das, statt so zu tun. Echte Grammatikkorrektur — Kongruenz, Zeitform, Artikelwahl — braucht entweder einen Server oder ein WebAssembly-Sprachmodell, und diese Seite hat kein Backend und eine Content-Security-Policy, die WebAssembly nicht erlaubt. Stattdessen erledigt es die mechanische Ebene, die meist gemeint ist: wiederholte Wörter, fehlende Leerzeichen nach Satzzeichen, Leerzeichen davor, gerade Anführungszeichen und Großschreibung. Das ist Typografie, wo die richtige Antwort eine Regel ist und kein Urteil.',
      },
      {
        q: 'Was behält „doppelte Zeilen entfernen“?',
        a: 'Das erste Vorkommen jeder Zeile an ihrer ursprünglichen Position, wobei die ganze Zeile exakt verglichen wird. Leerzeilen werden nie dedupliziert, denn sie trennen die Absätze, und sie zusammenzufassen würde das Dokument unbemerkt zu einem einzigen Block umfließen lassen.',
      },
      {
        q: 'Wie geht die Titelschreibung mit Abkürzungen um?',
        a: 'Sie lässt sie in Ruhe. Jedes Wort mit einem Großbuchstaben nach dem ersten — JSON, iPhone, McCarthy — bleibt unangetastet, denn es kleinzuschreiben, um den Anfangsbuchstaben neu großzuschreiben, würde aus JSON ein Json machen. Kleine Wörter wie „of“ und „the“ bleiben klein, außer sie eröffnen oder beschließen die Zeile.',
      },
      {
        q: 'Zerstört es meinen Code, URLs oder Dezimalzahlen?',
        a: 'Die Regeln zur Zeichensetzung sind genau dafür geschrieben, das zu vermeiden. Nach einem Komma oder Doppelpunkt, dem eine Ziffer folgt, wird nie ein Leerzeichen eingefügt, sodass 1,000 und 12:30 überleben. Ein Punkt erhält nur zwischen einer Kleinbuchstabenfolge und einem Großbuchstaben ein Leerzeichen, was e.g., Node.js, 3.14 und utildock.dev unberührt lässt. Die Regel für typografische Anführungszeichen überspringt alles in Backticks.',
      },
    ],
    keywords: [
      'text formatieren',
      'leerzeichen entfernen',
      'doppelte zeilen entfernen',
      'text bereinigen online',
      'groß und kleinschreibung ändern',
      'leerzeilen entfernen online',
      'zeilen alphabetisch sortieren',
    ],
  },
};
