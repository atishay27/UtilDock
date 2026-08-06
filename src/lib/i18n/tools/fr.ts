import type { CategoryCopyOverrides, ToolCopyOverrides } from './types';

export const categoriesFr: CategoryCopyOverrides = {
  json: {
    blurb: 'Lisez, vérifiez, comparez et remodelez du JSON sans quitter la page.',
  },
  jwt: {
    blurb: 'Lisez ce qu’un jeton déclare, et vérifiez qu’il a bien été signé.',
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
      'Un comparateur JSON qui montre la différence au lieu de l’énumérer. Les deux documents sont dessinés comme une seule vue alignée : le rouge marque ce que seul l’original possède, le vert ce que seul le modifié possède, et une flèche signale chaque valeur remplacée. Comme la comparaison est structurelle plutôt que textuelle, des clés réordonnées et une indentation différente ne comptent jamais comme des changements.',
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
    ],
  },
};
