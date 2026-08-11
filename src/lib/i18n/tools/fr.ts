import type { CategoryCopyOverrides, ToolCopyOverrides } from './types';

export const categoriesFr: CategoryCopyOverrides = {
  json: {
    blurb: 'Lisez, vérifiez, comparez et remodelez du JSON sans quitter la page.',
  },
  jwt: {
    blurb: 'Lisez ce qu’un jeton déclare, et vérifiez qu’il a bien été signé.',
  },
  text: {
    name: 'Texte',
    blurb: 'Mesurer un écrit, et le remettre au propre.',
  },
};

/**
 * French puts the format after the noun — "Formateur JSON" — which is also the
 * word order people type. `splitName` finds no category prefix and renders the
 * name whole, which is correct here rather than a fallback.
 */
export const toolsFr: ToolCopyOverrides = {
  'json-formatter': {
    name: 'Formateur JSON',
    tagline: 'Mettez en forme une réponse illisible, ou minifiez-la',
    does: ['Mise en forme', 'Minifier sur une ligne', 'Trier les clés', 'Indentation 2 / 4 / tab'],
    title: 'Formateur JSON — mettre en forme et minifier',
    description:
      'Formateur et minifieur JSON gratuit. Indentation au choix, compactage sur une ligne, tri des clés. Tourne dans votre navigateur.',
    overview:
      'Un formateur et un minifieur JSON en un. Mettez en forme avec deux, trois ou quatre espaces ou des tabulations, compactez le document sur une seule ligne, ou triez alphabétiquement les clés de chaque objet pour que deux fichiers se comparent proprement dans le contrôle de version. Le résultat se met à jour pendant que vous tapez, et le document n’est jamais envoyé.',
    faqs: [
      {
        q: 'Quelle différence entre mettre en forme et minifier du JSON ?',
        a: 'La mise en forme ajoute indentation et sauts de ligne pour rendre la structure lisible. La minification retire chaque octet d’espace blanc optionnel, ce que vous voulez avant de mettre du JSON dans une variable d’environnement, une URL ou sur le réseau. Les deux produisent les mêmes données.',
      },
      {
        q: 'Pourquoi voudrais-je trier les clés ?',
        a: 'Deux documents qui décrivent la même chose mais listent leurs clés dans un ordre différent produisent un diff textuel bruyant. Trier les clés alphabétiquement les rend identiques octet pour octet là où ils concordent, si bien que seuls les vrais changements apparaissent dans le contrôle de version.',
      },
      {
        q: 'Gère-t-il de très gros fichiers ?',
        a: 'Oui. L’analyse et la mise en forme tournent dans un Web Worker, si bien que des documents de plusieurs mégaoctets se reformatent sans que la page cesse de répondre pendant que vous tapez.',
      },
      {
        q: 'Mon JSON est-il envoyé à un serveur ?',
        a: 'Jamais. Le formateur est du JavaScript qui tourne dans votre propre onglet et il n’y a aucun backend vers lequel envoyer quoi que ce soit. Il continue de fonctionner réseau débranché.',
      },
    ],
    keywords: [
      'formateur json',
      'formater json en ligne',
      'json formatter français',
      'minifier json',
      'embellir json',
      'formateur json gratuit',
      'formater json sans téléverser',
    ],
  },

  'json-viewer': {
    name: 'Visionneuse JSON',
    tagline: 'Explorez une charge utile trop grosse pour être parcourue',
    does: [
      'Arbre repliable',
      'Rechercher clés et valeurs',
      'Copier n’importe quel chemin',
      'Encaisse 100 000+ nœuds',
    ],
    title: 'Visionneuse JSON — arbre repliable avec recherche',
    description:
      'Visionneuse JSON gratuite. Explorez tout document en arbre repliable et coloré, cherchez clés et valeurs, copiez des chemins. Dans votre navigateur.',
    overview:
      'Une visionneuse JSON qui transforme un mur de texte en une structure lisible. Collez une réponse d’API, un fichier de configuration ou une ligne de log et explorez-la sous forme d’arbre repliable — coloré par type, cherchable par clé ou par valeur, chaque chemin à un clic de votre presse-papiers. Rien n’est envoyé : le document est analysé dans cet onglet.',
    faqs: [
      {
        q: 'Est-il sûr de coller des données de production dans cette visionneuse JSON ?',
        a: 'Oui. Le document ne quitte jamais votre navigateur. Il n’y a pas d’envoi, pas d’analyse côté serveur et aucune requête qui transporterait vos données — vous pouvez vous déconnecter du réseau et la visionneuse fonctionne toujours. Ouvrez le panneau Réseau de votre navigateur pendant que vous l’utilisez et vous verrez que rien de l’éditeur n’est envoyé où que ce soit.',
      },
      {
        q: 'Quelle taille de fichier JSON peut-elle ouvrir ?',
        a: 'Les documents de plusieurs mégaoctets ne posent pas de problème. L’analyse tourne dans un Web Worker si bien que la page ne se fige jamais, et seules les lignes de l’arbre actuellement à l’écran sont rendues, si bien que des documents comptant des centaines de milliers de nœuds restent fluides à parcourir.',
      },
      {
        q: 'Comment copier le chemin vers une valeur ?',
        a: 'Survolez n’importe quelle ligne et cliquez sur le bouton de chemin. Vous obtenez le chemin complet vers cette valeur, prêt à coller dans votre code ou dans une expression jq.',
      },
      {
        q: 'Est-ce payant ou faut-il un compte ?',
        a: 'Non. Chaque outil d’UtilDock est gratuit, sans publicité, sans inscription et sans limite d’usage.',
      },
    ],
    keywords: [
      'visionneuse json',
      'visualiser json en ligne',
      'json viewer français',
      'explorateur json',
      'visionneuse json en ligne gratuite',
      'ouvrir un gros fichier json',
    ],
  },

  'json-validator': {
    name: 'Validateur JSON',
    tagline: 'Trouvez la ligne exacte que quelque chose rejette',
    does: ['Ligne et colonne exactes', 'JSON Schema 2020-12 / 2019-09 / 07', 'Aller à chaque erreur'],
    title: 'Validateur JSON — erreurs de syntaxe et de schéma',
    description:
      'Validateur JSON gratuit. Ligne et colonne exactes de toute erreur de syntaxe, et vérification par JSON Schema. Dans votre navigateur.',
    overview:
      'Un validateur JSON qui vous dit où est le problème, pas seulement qu’il y en a un. Chaque erreur de syntaxe est signalée avec sa ligne et sa colonne exactes et soulignée dans l’éditeur. Activez la vérification de schéma et la forme de vos données est validée aussi, par rapport à JSON Schema draft 2020-12, 2019-09 ou 07. Le document comme le schéma restent dans cet onglet.',
    faqs: [
      {
        q: 'Pourquoi mon JSON est-il invalide alors qu’il a l’air correct ?',
        a: 'Les causes habituelles sont une virgule en trop après le dernier élément, des clés ou des chaînes entre apostrophes plutôt que guillemets doubles, un saut de ligne ou une barre oblique inverse non échappé dans une chaîne, ou un commentaire égaré — JSON n’autorise rien de tout cela. Le validateur pointe la ligne et la colonne exactes pour que vous voyiez laquelle c’est.',
      },
      {
        q: 'Quels drafts de JSON Schema sont pris en charge ?',
        a: 'Les drafts 2020-12, 2019-09 et 07, y compris les mots-clés de format standard comme date-time, email et uri. Chaque violation est listée avec son chemin, et cliquer dessus y amène dans le document.',
      },
      {
        q: 'Mes données ou mon schéma sont-ils envoyés quelque part ?',
        a: 'Non. La validation tourne comme du JavaScript dans votre propre onglet, si bien qu’une charge utile de production ou un schéma interne ne quitte jamais votre machine. Il n’existe aucun serveur qui pourrait les recevoir.',
      },
      {
        q: 'Peut-il valider du JSON Lines ou du JSON avec commentaires ?',
        a: 'Pas encore — le validateur vérifie du JSON strict selon la RFC 8259, ce qu’acceptent la plupart des analyseurs et des API. La prise en charge de JSONC et NDJSON est sur la liste.',
      },
    ],
    keywords: [
      'validateur json',
      'valider json en ligne',
      'json schema validator',
      'vérifier syntaxe json',
      'validateur json en ligne gratuit',
      'validateur json schema en ligne',
    ],
  },

  'json-diff': {
    name: 'Comparateur JSON',
    tagline: 'Voyez ce qui a vraiment changé entre deux documents',
    does: [
      'Comparaison structurelle',
      'Ignore l’ordre des clés',
      'Apparie les éléments par id',
      'Côte à côte',
    ],
    title: 'Comparer JSON — différences entre deux documents',
    description:
      'Comparateur JSON gratuit. Deux documents côte à côte : ajouts, suppressions et valeurs modifiées en couleur. Dans votre navigateur.',
    overview:
      'Un comparateur JSON dans lequel vous pouvez éditer. Les deux documents sont côte à côte, en éditeurs vivants, avec la différence dessinée entre eux : le rouge marque ce que seul JSON 1 possède, le vert ce que seul JSON 2 possède, et les flèches de la couture copient un bloc dans les deux sens, de sorte que vous réconciliez la paire en la lisant. Aucun côté n’est la référence. Et comme le verdict est structurel plutôt que textuel, des clés réordonnées et une indentation différente ne comptent jamais comme des changements.',
    faqs: [
      {
        q: 'Quelle différence entre un diff JSON et un diff textuel ?',
        a: 'Un diff textuel compare des caractères, si bien que reformater un fichier ou réordonner ses clés apparaît comme des centaines de changements. Cet outil analyse d’abord les deux documents et compare les valeurs, si bien que seules les différences qui changent ce que le JSON signifie sont signalées.',
      },
      {
        q: 'Comment les tableaux sont-ils comparés ?',
        a: 'Les éléments sont appariés par identité lorsqu’il en existe une — un champ id, key, uuid ou name. Insérer un élément au début signale donc un seul ajout au lieu de réécrire tous les éléments suivants, et les éléments qui n’ont fait que se déplacer sont signalés comme des déplacements.',
      },
      {
        q: 'L’ordre des clés ou la mise en forme affectent-ils le résultat ?',
        a: 'Non. L’ordre des clés, l’indentation et les espaces en fin de ligne sont ignorés. Deux documents qui ne diffèrent que par la mise en forme sont comparés comme identiques.',
      },
      {
        q: 'Les deux documents sont-ils envoyés quelque part ?',
        a: 'Non. Les deux sont analysés et comparés dans un Web Worker à l’intérieur de cet onglet. Rien n’est envoyé à un serveur, ce qui compte quand vous comparez deux charges utiles de production.',
      },
    ],
    keywords: [
      'comparer json',
      'comparateur json',
      'json diff en ligne',
      'différence entre deux json',
      'comparer deux fichiers json',
      'json diff en ligne gratuit',
    ],
  },

  'jwt-decoder': {
    name: 'Décodeur JWT',
    tagline: 'Lisez les claims d’un jeton, et prouvez sa signature',
    does: [
      'En-tête et charge utile',
      'Expiration en clair',
      'Vérification de signature',
      'Secret ou clé publique',
    ],
    title: 'Décodeur JWT — décoder et vérifier',
    description:
      'Décodeur JWT gratuit. Lisez l’en-tête, la charge utile et l’expiration d’un JSON Web Token, et vérifiez sa signature. Ni le jeton ni la clé ne quittent votre navigateur.',
    overview:
      'Un décodeur JWT qui sépare un jeton en ses trois parties, décode l’en-tête et la charge utile, et liste chaque claim en toutes lettres — expiration, « pas avant » et date d’émission affichées comme de vraies dates plutôt qu’en secondes depuis 1970. Il vérifie aussi la signature : collez le secret partagé pour un algorithme HS ou une clé publique pour RS, PS ou ES, et le contrôle s’exécute via la WebCrypto de votre propre navigateur. Ni le jeton ni la clé ne sont jamais envoyés, et la clé n’est même pas enregistrée dans ce navigateur.',
    faqs: [
      {
        q: 'Peut-on coller un vrai JWT dans ce décodeur sans risque ?',
        a: 'Oui. Le jeton est décodé par du JavaScript dans votre propre onglet et il n’existe aucun backend où l’envoyer — coupez le réseau, le décodeur fonctionne toujours. Cela compte davantage pour les JWT que pour la plupart des données : un jeton est une identification vivante, et le coller sur un site qui l’envoie à un serveur revient à céder tout ce qu’il autorise.',
      },
      {
        q: 'Décoder un JWT signifie-t-il qu’il est valide ?',
        a: 'Non, et la distinction compte. L’en-tête et la charge utile sont encodés en base64url, pas chiffrés : quiconque détient le jeton peut les lire, et c’est pourquoi un JWT n’est jamais un endroit où mettre un secret. Seule la vérification de la signature avec la bonne clé vous dit que le jeton est authentique, intact, et que ses claims sont dignes de confiance.',
      },
      {
        q: 'Quels algorithmes de signature peut-il vérifier ?',
        a: 'HS256, HS384 et HS512 avec un secret partagé, ainsi que RS256/384/512, PS256/384/512 et ES256/384/512 avec une clé publique fournie sous forme de bloc PEM, de JWK isolé ou de JWKS entier — auquel cas le kid du jeton choisit la clé. La vérification s’appuie sur la WebCrypto intégrée au navigateur : aucun matériel de clé n’est transmis.',
      },
      {
        q: 'Ma clé ou mon secret de signature sont-ils enregistrés ?',
        a: 'Non. Tous les autres outils du site enregistrent votre saisie dans le localStorage pour qu’un rechargement ne fasse pas perdre votre travail ; la clé de vérification en est délibérément exclue. Elle reste en mémoire, sert au contrôle, et disparaît dès que vous quittez la page.',
      },
      {
        q: 'Pourquoi mon jeton apparaît-il comme expiré ?',
        a: 'Le claim exp est un NumericDate — des secondes depuis 1970 — et le décodeur l’affiche comme une vraie date, accompagnée du temps écoulé depuis. Un jeton expiré est la cause la plus fréquente d’un 401 soudain sur une API qui fonctionnait l’instant d’avant. Un claim nbf situé dans le futur produit le même effet à l’autre extrémité.',
      },
    ],
    keywords: [
      'décodeur jwt',
      'décoder jwt',
      'vérifier signature jwt',
      'jwt decoder français',
      'json web token décoder',
      'jwt decoder en ligne gratuit',
      'décoder jwt sans téléverser',
    ],
  },

  'jwt-encoder': {
    name: 'Encodeur JWT',
    tagline: 'Construire un jeton à partir de claims, et le signer vraiment',
    does: [
      'En-tête et charge utile',
      'HS / RS / PS / ES',
      'Préréglages d’expiration',
      'Signé par WebCrypto',
    ],
    title: 'Encodeur JWT — construire et signer un jeton',
    description:
      'Encodeur JWT gratuit. Construisez un JSON Web Token à partir de vos claims et signez-le en HS, RS, PS ou ES. La clé ne quitte jamais votre navigateur.',
    overview:
      'Un encodeur JWT qui produit un jeton réellement signé plutôt qu’un sosie en base64. Écrivez l’en-tête et la charge utile en JSON, choisissez un algorithme, puis collez le secret partagé pour un algorithme HS ou une clé privée PKCS#8 pour RS, PS ou ES : la signature est calculée par la WebCrypto de votre propre navigateur. L’expiration, la date d’émission et le « pas avant » s’inscrivent depuis des préréglages, si bien que vous ne convertirez plus jamais un horodatage à la main.',
    faqs: [
      {
        q: 'Est-il sûr de coller une clé de signature dans cet encodeur ?',
        a: 'La clé est utilisée dans votre propre onglet puis abandonnée : jamais enregistrée, jamais incluse dans un événement d’analytique, et aucun serveur ne pourrait la recevoir. Cela dit, une clé de signature est le secret le plus dangereux de tout système utilisant des JWT, car quiconque la détient peut produire des jetons que vos services accepteront. Pour une clé de production, générer les jetons dans votre propre environnement reste la meilleure habitude ; cet outil est conçu pour le développement, les tests et l’apprentissage.',
      },
      {
        q: 'Avec quels algorithmes peut-il signer ?',
        a: 'HS256, HS384 et HS512 avec un secret partagé, et RS256/384/512, PS256/384/512 et ES256/384/512 avec une clé privée fournie en bloc PEM PKCS#8 ou en JWK privé. Il produit aussi le jeton non sécurisé `alg: none`, clairement signalé comme ne prouvant rien, car en reproduire un est la façon de vérifier que votre vérificateur le rejette.',
      },
      {
        q: 'Pourquoi mon secret court est-il refusé ?',
        a: 'La RFC 7518 exige une clé HMAC au moins aussi longue que le condensat : 32 octets pour HS256, 48 pour HS384, 64 pour HS512. Les navigateurs signent volontiers avec un secret de quatre caractères, et le jeton obtenu se casse hors ligne en quelques secondes. L’encodeur bloque cela par défaut et vous laisse passer outre, puisque reproduire un jeton faible est parfois exactement la tâche.',
      },
      {
        q: 'Peut-il écraser l’algorithme de mon en-tête ?',
        a: 'Il écrit toujours `alg` à partir de l’algorithme choisi, et c’est délibéré. Un en-tête annonçant un algorithme alors que la signature a été produite avec un autre n’est pas un jeton : c’est le point de départ de la vulnérabilité JWT la plus connue. Tout autre champ d’en-tête que vous écrivez — `kid`, `cty`, personnalisé — est conservé exactement tel quel.',
      },
    ],
    keywords: [
      'encodeur jwt',
      'générateur jwt',
      'créer un jwt',
      'signer jwt en ligne',
      'générateur json web token',
      'générer un jeton jwt en ligne',
      'signer jwt hs256 en ligne',
    ],
  },

  'text-counter': {
    name: 'Compteur de texte',
    tagline: 'Mots, caractères, phrases et paragraphes d’un coup',
    does: [
      'Mots et caractères',
      'Phrases et paragraphes',
      'Temps de lecture',
      'Fréquence des mots',
    ],
    title: 'Compteur de mots — mots, caractères, phrases',
    description:
      'Compteur de mots et de caractères gratuit. Compte mots, caractères, phrases et paragraphes au fil de la frappe, avec le temps de lecture. Dans votre navigateur.',
    overview:
      'Un compteur de mots qui compte tout à la fois — mots, caractères avec et sans espaces, phrases, paragraphes, lignes et octets UTF-8 — et se met à jour au fil de la frappe. Il estime aussi le temps de lecture et de lecture à voix haute, suit les limites contre lesquelles on écrit vraiment, et liste les mots les plus employés. Le comptage s’appuie sur la segmentation de texte Unicode du navigateur : le japonais et le chinois sont donc comptés par mots au lieu d’apparaître comme un seul mot immense.',
    faqs: [
      {
        q: 'Comment compte-t-il les mots en japonais ou en chinois ?',
        a: 'Correctement, ce que la plupart des compteurs ne font pas. Le japonais et le chinois ne séparent pas les mots par des espaces : compter en découpant sur les espaces transforme donc un paragraphe entier en un seul mot. Cet outil utilise la segmentation de texte Unicode intégrée au navigateur, qui sait où les mots se coupent réellement dans chaque écriture, et mesure le temps de lecture du CJK en caractères par minute plutôt qu’en mots.',
      },
      {
        q: 'Qu’est-ce qui compte comme phrase ou comme paragraphe ?',
        a: 'Une phrase est déterminée par les règles Unicode de coupure de phrase, si bien que « Dr. Smith est allé à Washington D.C. hier » compte pour une phrase et non trois, et que le point idéographique est reconnu. Un paragraphe est un bloc séparé par une ligne vide ; si le texte n’en contient aucune, chaque ligne non vide compte pour un.',
      },
      {
        q: 'Comment le temps de lecture est-il calculé ?',
        a: 'À 238 mots par minute pour un texte alphabétique, la médiane de la lecture silencieuse adulte de prose générale, et à 400 caractères par minute pour le CJK. Le temps de parole utilise les débits plus lents qu’un intervenant tient réellement, environ 140 mots par minute. Ce sont des estimations, pas des mesures : un texte technique dense se lit plus lentement qu’un roman.',
      },
      {
        q: 'Mon texte est-il envoyé quelque part ?',
        a: 'Non. Le comptage est du JavaScript exécuté dans votre propre onglet, dans un Web Worker pour qu’un long document ne fige pas la page. Coupez le réseau et il continue de fonctionner. Cela compte plus qu’il n’y paraît pour un compteur de texte, car ce que les gens comptent, ce sont souvent des brouillons, des lettres de motivation et des écrits non publiés.',
      },
    ],
    keywords: [
      'compteur de mots',
      'compteur de caractères',
      'compter les mots en ligne',
      'compteur de phrases',
      'compter les paragraphes',
      'compter mots et caractères gratuit',
      'calcul du temps de lecture',
    ],
  },

  'text-formatter': {
    name: 'Formateur de texte',
    tagline: 'Retirer le désordre d’un texte écrit par quelqu’un d’autre',
    does: [
      'Supprimer les espaces en trop',
      'Effacer les lignes en double',
      'Changer la casse',
      'Ranger la ponctuation',
    ],
    title: 'Formateur de texte — nettoyer un texte en désordre',
    description:
      'Formateur et nettoyeur de texte gratuit. Supprimez espaces en trop et lignes en double, changez la casse et rangez la ponctuation. Dans votre navigateur.',
    overview:
      'Un formateur de texte que vous pilotez plutôt qu’un outil qui décide à votre place. Chaque opération est un interrupteur — réduire les espaces répétés, supprimer les espaces en fin de ligne, retirer les lignes vides ou en double, trier les lignes, convertir en majuscules, minuscules, casse de titre ou de phrase, et ranger la ponctuation de la prose anglaise. Rien ne s’exécute tant que vous ne l’activez pas, et l’outil indique exactement ce que chaque interrupteur a changé : le résultat est donc à accepter plutôt qu’à relire.',
    faqs: [
      {
        q: 'Peut-il corriger la grammaire ?',
        a: 'Non, et il le dit au lieu de faire semblant. Une vraie correction grammaticale — accord, temps, choix de l’article — exige soit un serveur, soit un modèle de langue en WebAssembly, et ce site n’a pas de serveur et sa Content-Security-Policy n’autorise pas WebAssembly. Ce qu’il fait à la place, c’est la couche mécanique que l’on vise généralement : mots répétés, espaces manquants après la ponctuation, espaces avant la ponctuation, guillemets droits et majuscules. C’est de la typographie, où la bonne réponse est une règle et non un jugement.',
      },
      {
        q: 'Que conserve « supprimer les lignes en double » ?',
        a: 'La première occurrence de chaque ligne, à sa position d’origine, la ligne entière étant comparée à l’identique. Les lignes vides ne sont jamais dédupliquées, puisque ce sont elles qui séparent les paragraphes et que les réduire ferait silencieusement couler le document en un seul bloc.',
      },
      {
        q: 'Comment la casse de titre traite-t-elle les sigles ?',
        a: 'Elle les laisse tranquilles. Tout mot comportant une majuscule après sa première lettre — JSON, iPhone, McCarthy — passe intact, car le mettre en minuscules pour remajusculer l’initiale transformerait JSON en Json. Les mots courts comme « of » et « the » restent en minuscules sauf s’ils ouvrent ou ferment la ligne.',
      },
      {
        q: 'Va-t-il casser mon code, mes URL ou mes nombres décimaux ?',
        a: 'Les règles de ponctuation sont écrites précisément pour éviter cela. Aucun espace n’est jamais inséré après une virgule ou un deux-points suivi d’un chiffre, si bien que 1,000 et 12:30 survivent. Un point ne gagne un espace qu’entre une suite de minuscules et une majuscule, ce qui laisse e.g., Node.js, 3.14 et utildock.dev intacts. La règle des guillemets courbes ignore tout ce qui se trouve entre accents graves.',
      },
    ],
    keywords: [
      'formateur de texte',
      'supprimer les espaces en trop',
      'supprimer les lignes en double',
      'nettoyer du texte en ligne',
      'changer la casse en ligne',
      'supprimer les lignes vides en ligne',
      'trier les lignes par ordre alphabétique',
    ],
  },
};
