/**
 * Sample text for the text tools, one set per language.
 *
 * These are content, not UI strings, and they are not translations of each
 * other. A sample has one job — to demonstrate what the tool does on text the
 * visitor recognises — and an English paragraph on the Japanese counter fails
 * at that twice over. It teaches nothing about counting Japanese, and it hides
 * the single most valuable thing the counter does: segmenting a language that
 * writes without spaces. Someone pressing **Sample** there should see 20 words
 * come out of a line containing no space at all.
 *
 * The messy samples are more pointed still: **every defect in them maps to a
 * switch that language actually has.** French is missing the space that belongs
 * *before* `;!?`, because in French that switch inserts one. Japanese and
 * Chinese carry no punctuation-spacing defects at all, because those rules are
 * hidden there — a sample demonstrating a switch the visitor cannot see would
 * be worse than no sample.
 *
 * Selected at build time by the page component and handed to the island as a
 * prop. Keeping them out of the island's own imports is what stops eight
 * languages' worth of prose being bundled into every visitor's JavaScript, and
 * out of `islands` strings is what stops them being serialised into the JSON
 * and JWT pages that will never use them.
 */

import type { Locale } from '../i18n/locales';

/** Ordinary prose. The counts it produces should look like real counts. */
export const COUNTER_SAMPLES: Record<Locale, string> = {
  en: `The best way to predict the future is to invent it. Alan Kay said that in 1971, at Xerox PARC, to a room of people who were about to spend a decade proving him right.

What they built there was not one invention but a stack of them: the graphical user interface, the laser printer, object-oriented programming, and the local area network that tied them together. Almost none of it made money for Xerox. Almost all of it made money for somebody.

The lesson usually drawn from PARC is about corporate failure. The more useful lesson is about what a research group looks like when it is working. Small teams. Long horizons. No requirement to justify the work in terms of this quarter's revenue.`,

  es: `La mejor forma de predecir el futuro es inventarlo. Alan Kay lo dijo en 1971, en el Xerox PARC, ante una sala de personas que estaban a punto de pasar una década demostrando que tenía razón.

Lo que construyeron allí no fue un invento sino una pila de ellos: la interfaz gráfica, la impresora láser, la programación orientada a objetos y la red de área local que lo unía todo. Casi nada de aquello dio dinero a Xerox. Casi todo se lo dio a alguien.

La lección que suele sacarse del PARC habla de fracaso corporativo. La lección más útil habla de qué aspecto tiene un grupo de investigación cuando funciona. Equipos pequeños. Horizontes largos. Ninguna obligación de justificar el trabajo con los ingresos de este trimestre.`,

  de: `Der beste Weg, die Zukunft vorherzusagen, ist, sie zu erfinden. Alan Kay sagte das 1971 im Xerox PARC, vor einem Raum voller Leute, die im Begriff waren, ein Jahrzehnt damit zu verbringen, ihm recht zu geben.

Was sie dort bauten, war nicht eine Erfindung, sondern ein ganzer Stapel: die grafische Benutzeroberfläche, der Laserdrucker, die objektorientierte Programmierung und das lokale Netzwerk, das alles verband. Fast nichts davon brachte Xerox Geld ein. Fast alles davon brachte irgendjemandem Geld ein.

Die Lehre, die man aus PARC gewöhnlich zieht, handelt vom Versagen eines Konzerns. Die nützlichere Lehre handelt davon, wie eine Forschungsgruppe aussieht, wenn sie funktioniert. Kleine Teams. Lange Zeiträume. Keine Pflicht, die Arbeit mit dem Umsatz dieses Quartals zu rechtfertigen.`,

  fr: `La meilleure façon de prédire l'avenir est de l'inventer. Alan Kay l'a dit en 1971, au Xerox PARC, devant une salle de gens qui allaient passer une décennie à lui donner raison.

Ce qu'ils ont construit là-bas n'était pas une invention mais toute une pile : l'interface graphique, l'imprimante laser, la programmation orientée objet et le réseau local qui reliait le tout. Presque rien de cela n'a rapporté d'argent à Xerox. Presque tout en a rapporté à quelqu'un d'autre.

La leçon que l'on tire d'ordinaire du PARC parle d'un échec industriel. La leçon plus utile parle de ce à quoi ressemble un groupe de recherche quand il fonctionne. De petites équipes. Des horizons lointains. Aucune obligation de justifier le travail par le chiffre d'affaires du trimestre.`,

  'pt-br': `A melhor maneira de prever o futuro é inventá-lo. Alan Kay disse isso em 1971, no Xerox PARC, para uma sala de pessoas que passariam a década seguinte provando que ele estava certo.

O que construíram ali não foi uma invenção, mas uma pilha delas: a interface gráfica, a impressora a laser, a programação orientada a objetos e a rede local que amarrava tudo. Quase nada daquilo deu dinheiro para a Xerox. Quase tudo deu dinheiro para outra pessoa.

A lição que costumam tirar do PARC fala de fracasso corporativo. A lição mais útil fala de como é um grupo de pesquisa quando ele está funcionando. Equipes pequenas. Horizontes longos. Nenhuma obrigação de justificar o trabalho com a receita deste trimestre.`,

  ja: `未来を予測する最善の方法は、それを発明することだ。アラン・ケイが一九七一年にゼロックスのパロアルト研究所で語った言葉である。聞いていた人々は、その後の十年をかけて彼が正しかったことを証明していった。

そこで生まれたのは一つの発明ではなく、発明の積み重ねだった。グラフィカルユーザインタフェース、レーザープリンタ、オブジェクト指向プログラミング、そしてそれらを結ぶローカルエリアネットワーク。そのほとんどはゼロックスの利益にはならなかった。そしてそのほとんどが、別の誰かの利益になった。

パロアルト研究所から引き出される教訓は、たいてい大企業の失敗の話になる。もっと役に立つ教訓は、研究組織がうまく機能しているときの姿の話だ。小さなチーム。長い時間軸。今期の売上で仕事を正当化する義務がないこと。`,

  ru: `Лучший способ предсказать будущее — изобрести его. Алан Кэй сказал это в 1971 году в исследовательском центре Xerox PARC, перед залом людей, которым предстояло потратить десятилетие на то, чтобы доказать его правоту.

То, что они построили, было не одним изобретением, а целой стопкой: графический интерфейс, лазерный принтер, объектно-ориентированное программирование и локальная сеть, связавшая всё это вместе. Почти ничего из этого не принесло денег самой Xerox. Почти всё принесло их кому-то другому.

Урок, который обычно извлекают из PARC, — это рассказ о провале корпорации. Более полезный урок — о том, как выглядит исследовательская группа, когда она работает. Маленькие команды. Долгие горизонты. Никакой обязанности оправдывать работу выручкой текущего квартала.`,

  zh: `预测未来的最好方法就是把它发明出来。艾伦·凯在一九七一年的施乐帕洛阿尔托研究中心说了这句话，台下坐着的那些人，随后用了整整十年证明他是对的。

他们在那里造出来的不是一项发明，而是一整叠：图形用户界面、激光打印机、面向对象编程，以及把这些串起来的局域网。这些东西几乎没有为施乐赚到钱，却几乎都为别人赚到了钱。

人们从帕洛阿尔托研究中心得出的教训，通常是一个大公司失败的故事。更有用的那个教训，说的是一个研究团队运转良好时是什么样子。小团队。长周期。不必用本季度的营收来为自己的工作辩护。`,
};

/**
 * Deliberately damaged text. Every fault matches one switch in the panel, and
 * only switches that language has — see the note at the top of this file.
 */
export const FORMATTER_SAMPLES: Record<Locale, string> = {
  en: `the  best way to  predict the future is to invent it .
Alan Kay said that in 1971,at Xerox PARC.


the  best way to  predict the future is to invent it .
what they built there was not one invention but a a stack of them .


"the graphical user interface" ,the laser printer,and the local area network .
almost none of it made money for Xerox .Almost all of it made money for somebody.
`,

  es: `la  mejor forma de  predecir el futuro es inventarlo .
Alan Kay lo dijo en 1971,en el Xerox PARC.


la  mejor forma de  predecir el futuro es inventarlo .
lo que construyeron allí no fue un un invento sino una pila .


"la interfaz gráfica" ,la impresora láser,y la red de área local .
casi nada de aquello dio dinero a Xerox .Casi todo se lo dio a alguien.
`,

  de: `der  beste Weg die  Zukunft vorherzusagen ist sie zu erfinden .
Alan Kay sagte das 1971,im Xerox PARC.


der  beste Weg die  Zukunft vorherzusagen ist sie zu erfinden .
was sie dort bauten war nicht eine eine Erfindung sondern ein Stapel .


"die grafische Benutzeroberfläche" ,der Laserdrucker,und das lokale Netzwerk .
fast nichts davon brachte Xerox Geld .Fast alles brachte jemandem Geld ein.
`,

  /* French is missing the space that belongs *before* `;!?` and `:` — here the
     switch inserts it rather than removing one. The quotes become guillemets. */
  fr: `la  meilleure façon de  prédire l'avenir est de l'inventer.
Vraiment? Alan Kay l'a dit en 1971,au Xerox PARC.


la  meilleure façon de  prédire l'avenir est de l'inventer.
ce qu'ils ont construit n'était pas une une invention mais une pile!


"l'interface graphique" ,l'imprimante laser,et le réseau local.
presque rien n'a rapporté à Xerox: presque tout a rapporté à quelqu'un!
`,

  'pt-br': `a  melhor maneira de  prever o futuro é inventá-lo .
Alan Kay disse isso em 1971,no Xerox PARC.


a  melhor maneira de  prever o futuro é inventá-lo .
o que construíram ali não foi uma uma invenção mas uma pilha .


"a interface gráfica" ,a impressora a laser,e a rede local .
quase nada daquilo deu dinheiro à Xerox .Quase tudo deu a outra pessoa.
`,

  /* No punctuation-spacing faults: those switches do not exist in Japanese.
     What is here instead is what CJK text really arrives carrying — stray
     ASCII spaces from a PDF or a spreadsheet, and a duplicated line. */
  ja: `未来を予測する  最善の方法は、それを  発明することだ。
アラン・ケイが一九七一年に語った言葉である。



未来を予測する  最善の方法は、それを  発明することだ。
そこで生まれたのは  一つの発明ではなく、積み重ねだった。



グラフィカルユーザインタフェース、レーザープリンタ、  そして  ローカルエリアネットワーク。
そのほとんどはゼロックスの利益にはならなかった。
`,

  ru: `лучший  способ предсказать  будущее — изобрести его .
Алан Кэй сказал это в 1971,в Xerox PARC.


лучший  способ предсказать  будущее — изобрести его .
то что они построили было не одним одним изобретением а стопкой .


"графический интерфейс" ,лазерный принтер,и локальная сеть .
почти ничего не принесло денег Xerox .Почти всё принесло их другому.
`,

  /* As with Japanese: stray ASCII spaces and a duplicated line, which is how
     Chinese text actually arrives damaged. */
  zh: `预测未来的  最好方法  就是把它发明出来。
艾伦·凯在一九七一年的施乐帕洛阿尔托研究中心说了这句话。



预测未来的  最好方法  就是把它发明出来。
他们造出来的不是一项发明，而是  一整叠。



图形用户界面、激光打印机，  以及  把这些串起来的局域网。
这些东西几乎没有为施乐赚到钱。
`,
};
