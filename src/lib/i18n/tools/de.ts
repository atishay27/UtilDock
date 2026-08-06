import type { CategoryCopyOverrides, ToolCopyOverrides } from './types';

export const categoriesDe: CategoryCopyOverrides = {
  json: {
    blurb: 'JSON lesen, prüfen, vergleichen und umformen, ohne die Seite zu verlassen.',
  },
  jwt: {
    blurb: 'Lies, was ein Token behauptet — und prüfe, dass es wirklich signiert wurde.',
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
    keywords: ['json viewer', 'json anzeigen', 'json baum viewer', 'json online ansehen'],
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
      'Ein JSON-Vergleich, der den Unterschied zeigt, statt ihn aufzuzählen. Die beiden Dokumente werden als eine ausgerichtete Ansicht gezeichnet: Rot markiert, was nur das Original hat, Grün, was nur das geänderte hat, und ein Pfeil markiert jeden ersetzten Wert. Weil der Vergleich strukturell statt textuell ist, zählen umsortierte Schlüssel und andere Einrückung nie als Änderung.',
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
    keywords: ['json diff', 'json vergleichen', 'json vergleich online', 'json unterschiede'],
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
    ],
  },
};
