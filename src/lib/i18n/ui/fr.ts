import { p } from '../format';
import type { UIStrings } from './en';

export const fr: UIStrings = {
  chrome: {
    skipToContent: 'Aller au contenu',
    homeAria: 'Accueil UtilDock',
    navTools: 'Outils',
    navSite: 'Site',
    breadcrumb: "Fil d'Ariane",
    home: 'Accueil',
    soon: 'bientôt',
    comingSoon: 'bientôt disponible',
    categoryTools: 'Outils {category}',
    allCategoryTools: 'Tous les outils {category}',
    openToolsMenu: 'Ouvrir le menu des outils',
    closeToolsMenu: 'Fermer le menu des outils',
    toolsButton: 'Outils',
    privacyPill: 'Rien ne quitte cet onglet',
    privacyPillMobile: 'Votre JSON reste dans cet onglet',
    open: 'Ouvrir',
  },

  theme: {
    toLight: 'Passer au thème clair',
    toDark: 'Passer au thème sombre',
    title: 'Changer de thème',
    light: 'Clair',
    dark: 'Sombre',
  },

  footer: {
    tagline: 'Votre quai pour les utilitaires de développement.',
    blurb: 'Gratuit, sans publicité, et tout tourne dans votre propre navigateur.',
    about: 'À propos',
    privacy: 'Confidentialité',
    analytics: 'Analytique',
    copyright: '© {year} UtilDock',
    language: 'Langue',
    languageAria: 'Choisir une langue',
  },

  consent: {
    region: 'Analytique',
    heading: 'Analytique',
    undecided:
      'Nous aimerions utiliser Google Analytics pour compter les pages vues, afin de savoir quels outils méritent d’être améliorés. Cela dépose un cookie. Rien de ce que vous collez n’y figure jamais — votre JSON ne quitte pas cet onglet dans un cas comme dans l’autre.',
    privacyPolicy: 'Politique de confidentialité',
    whatItCollects: 'Ce qui est collecté',
    currentlyOn: 'Actuellement activée',
    granted:
      'Google Analytics compte les pages vues dans ce navigateur. Rien de ce que vous collez n’y figure jamais.',
    currentlyOff: 'Actuellement désactivée',
    denied:
      'Rien n’est demandé à Google depuis ce navigateur, et tout cookie d’analytique déjà écrit a été supprimé. Chaque outil fonctionne exactement pareil dans les deux cas.',
    allow: 'Autoriser l’analytique',
    decline: 'Non merci',
    turnOff: 'La désactiver',
    turnOn: 'L’activer',
    close: 'Fermer',
  },

  tool: {
    taglineSuffix: 'tourne dans cet onglet, n’est jamais envoyé nulle part',
    howItWorks: 'Comment fonctionne le {name}',
    otherTools: 'Autres outils',
    commonQuestions: 'Questions fréquentes',
  },

  home: {
    title: 'Outils JSON gratuits dans votre navigateur',
    headlineLead: 'Des outils qui ne touchent',
    headlineAccent: 'jamais un serveur.',
    lede: 'De petits utilitaires bien affûtés qui tournent entièrement dans cet onglet — gratuits, sans publicité et sans inscription. JSON d’abord : un formateur, une visionneuse, un validateur et un comparateur, JWT ensuite.',
    assurances: ['Rien n’est envoyé', 'Rien n’est journalisé', 'Pas de compte, pas de limites'],
    closeLine: 'Débranchez le réseau. Ça marche toujours.',
    closeCta: 'Pourquoi c’est vrai',
    keywords: [
      'outils développeur',
      'outils json',
      'formateur json en ligne',
      'utilitaires gratuits développeur',
    ],
  },

  jsonHub: {
    title: 'Outils JSON gratuits, sans publicité',
    description:
      'Outils JSON gratuits : visionneuse, validateur, comparateur, formateur. Sans publicité ni inscription, rien ne quitte votre navigateur.',
    keywords: ['outils json', 'outils json en ligne', 'outils json gratuits', 'utilitaires json'],
    headlineLead: 'Tous les outils JSON,',
    headlineAccent: 'dans un onglet.',
    lede: 'Quatre outils bien affûtés pour travailler avec du JSON — une [visionneuse](/json/viewer) en arbre, un [validateur](/json/validator) de syntaxe et de schéma, un [comparateur](/json/diff) visuel et un [formateur et minifieur](/json/formatter). Tous gratuits, tous sans publicité, et chacun analyse votre document dans cet onglet plutôt que sur un serveur.',
    chooseHeading: 'Choisissez un outil',
    toolCount: p({
      one: '{count} outil · d’autres à venir',
      other: '{count} outils · d’autres à venir',
    }),
    notes: [
      {
        head: 'Rien de ce que vous collez n’est envoyé',
        body: 'Chaque outil ici est du JavaScript qui tourne dans votre propre onglet. Collez une charge utile de production réseau débranché, et ça marche toujours — il n’existe aucun serveur de notre côté qui pourrait la recevoir.',
      },
      {
        head: 'Sans publicité, sans compte, sans limite',
        body: 'Pas d’interstitiels, pas d’inscription et aucun plafond sur ce que vous pouvez coller. La page sur laquelle vous arrivez est l’outil.',
      },
      {
        head: 'Conçus pour les gros documents',
        body: 'L’analyse, la validation et la comparaison tournent sur un thread de travail, si bien qu’un document de plusieurs mégaoctets est traité sans que la page se fige pendant que vous tapez.',
      },
    ],
    closeLine: 'Vérifiez l’affirmation dans votre panneau Réseau.',
    closeCta: 'Pourquoi c’est vrai',
  },

  notFound: {
    title: 'Page introuvable',
    description: 'Cette page n’existe pas sur UtilDock.',
    headline: 'Cette page n’existe pas.',
    body: 'Le lien est peut-être obsolète, ou l’adresse mal saisie. Tous les outils d’UtilDock sont listés ci-dessous.',
    cta: 'Retour à l’accueil',
    allTools: 'Tous les outils',
  },

  about: {
    title: 'À propos — qui construit UtilDock et pourquoi',
    description:
      'Pourquoi UtilDock existe : de petits utilitaires de développement rapides et sans publicité qui tournent entièrement dans votre navigateur, construits par un seul développeur, sans publicité et sans que rien de ce que vous collez ne soit jamais envoyé.',
    heading: 'À propos d’UtilDock',
    whyHeading: 'Pourquoi ça existe',
    why: [
      'Tout développeur a besoin un jour de formater du JSON ou de comprendre pourquoi deux charges utiles divergent. Les outils qui remontent en premier sur ces recherches sont généralement noyés sous la publicité, interrompus par des murs de cookies et — le plus gênant — envoient souvent ce que vous collez à un serveur dont vous ne savez rien. C’est un mauvais marché quand ce que vous déboguez est une charge utile de production.',
      'UtilDock est l’inverse : un petit ensemble d’outils bien affûtés, sans publicité, sans inscription, et rien de ce que vous collez ne quitte jamais votre machine.',
    ],
    builtHeading: 'Comment c’est construit',
    built: [
      'Le site est statique — du HTML, du CSS et un peu de JavaScript, servis depuis la périphérie du réseau Cloudflare. Chaque outil est un composant autonome qui ne s’hydrate que sur sa propre page, si bien que les pages que vous n’utilisez pas ne vous coûtent rien. Le gros du travail (analyse, validation, comparaison) se fait dans un Web Worker, et c’est pour cela qu’un document de plusieurs mégaoctets ne fige pas la page pendant que vous tapez.',
      'Il n’y a pas de backend. C’est une contrainte délibérée : un outil qui ne peut envoyer vos données nulle part ne peut pas les divulguer. Les détails sont sur la [page de confidentialité](/privacy).',
    ],
    todayHeading: 'Ce qu’il y a aujourd’hui',
    today:
      'JSON est arrivé en premier parce que c’est ce vers quoi la plupart d’entre nous se tournent le plus souvent. Le décodage JWT est la prochaine étape, et la liste continuera de s’allonger — toujours selon les mêmes règles : rapide, gratuit, sans publicité et entièrement côté client.',
  },

  privacy: {
    title: 'Confidentialité — rien de ce que vous collez ne quitte votre navigateur',
    description:
      'UtilDock tourne entièrement dans votre navigateur. Aucun document que vous collez ne quitte jamais votre appareil — il n’existe aucun serveur qui pourrait le recevoir.',
    heading: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : {date}',
    updatedDate: 'août 2026',
    translationNote:
      'Ceci est une traduction fournie par commodité. En cas de divergence avec la version anglaise, c’est la version anglaise qui fait foi.',
    lead: '**Rien de ce que vous collez dans UtilDock ne quitte jamais votre navigateur.** Chaque outil est du JavaScript qui tourne dans votre propre onglet. Votre JSON n’est jamais envoyé à un backend, jamais écrit dans un journal et jamais vu par nous — il n’existe aucun serveur de notre côté qui pourrait le recevoir.',
    howHeading: 'Comment fonctionnent les outils',
    how: [
      'UtilDock est un site statique. Quand vous ouvrez un outil, votre navigateur télécharge un peu de HTML, de CSS et de JavaScript, et tout ce qui suit se passe localement. L’analyse, le formatage, la validation et la comparaison tournent tous dans votre onglet. Ouvrir un fichier avec le bouton **Charger** — ou le déposer sur la page — le lit depuis votre disque vers la mémoire ; ce n’est pas un envoi.',
      'Comme il n’y a pas de backend, le contenu sur lequel vous travaillez n’est jamais transmis, journalisé ni conservé où que ce soit. Vous pouvez vous déconnecter d’internet et les outils continuent de fonctionner.',
    ],
    storedHeading: 'Informations stockées sur votre appareil',
    stored:
      'Pour qu’un rechargement ne vous fasse pas perdre votre travail, chaque outil enregistre sa saisie courante dans le `localStorage` de votre navigateur, avec votre choix de thème et quelques préférences comme la taille d’indentation. Ces données restent sur votre appareil, ne sont lisibles que par UtilDock dans votre navigateur, et ne nous sont jamais transmises. Effacer les données de site de ce domaine dans votre navigateur les supprime toutes.',
    storedConsent:
      'Votre réponse à la question sur l’analytique est stockée de la même façon, pour qu’on ne vous la pose qu’une fois. Elle n’enregistre rien d’autre que le choix lui-même.',
    analyticsHeading: 'Analytique et cookies',
    analyticsOn: [
      'Avec votre consentement, nous utilisons Google Analytics pour comprendre comment le site est utilisé — quelles pages sont visitées et à quelle fréquence — afin de savoir quels outils méritent d’être améliorés. Il est chargé via un conteneur Google Tag Manager, et ne s’exécute pas tant que vous ne l’autorisez pas. Si vous refusez, aucun cookie d’analytique n’est déposé et aucune donnée n’est collectée.',
      'Une fois activé, Google Analytics collecte des données d’analyse web standard : pages vues, localisation approximative dérivée de votre adresse IP, site référent, et informations générales sur l’appareil et le navigateur. Il dépose des cookies nommés `_ga` et `_ga_*` pour reconnaître les visiteurs qui reviennent. Ce traitement est décrit dans la [politique de confidentialité de Google](https://policies.google.com/privacy).',
      '**L’analytique ne reçoit jamais le contenu sur lequel vous travaillez.** Votre JSON n’est inclus dans aucun événement d’analytique. Nous avons également désactivé les fonctionnalités publicitaires de Google, si bien que votre visite n’est pas utilisée pour du remarketing, de la personnalisation d’annonces ou de la constitution d’audiences.',
    ],
    analyticsOff:
      'Ce site ne charge actuellement aucune analytique. Aucun cookie d’analytique n’est déposé, aucun script tiers ne s’exécute, et il n’y a rien à consentir.',
    analyticsNever:
      'Nous ne vendons pas vos données, et nous n’utilisons ni régies publicitaires, ni widgets de réseaux sociaux, ni enregistrement de session, ni empreinte numérique.',
    choicesHeading: 'Vos choix',
    choicesLead: 'Vous pouvez',
    choicesButton: 'consulter ou modifier cette préférence',
    choicesRest:
      'à tout moment. Le panneau indique quel réglage est en vigueur et vous permet d’en changer ; le lien analytique en pied de chaque page ouvre ce même panneau.',
    choicesImmediate:
      'La désactivation prend effet immédiatement plutôt qu’au prochain chargement de page, et les cookies `_ga` sont supprimés à cet instant — vous n’avez pas besoin d’effacer les données de site de votre navigateur pour vous en débarrasser, même si cela fonctionne aussi. Google n’est plus contacté sur aucune page suivante, sauf si vous le réactivez.',
    choicesUngated:
      'Chaque outil de ce site fonctionne à l’identique que vous acceptiez l’analytique ou non. Rien n’est conditionné à ce choix. Effacer les données de site de ce domaine supprime tout ce qu’UtilDock a stocké, y compris votre thème et vos saisies enregistrées.',
    hostingHeading: 'Hébergement',
    hosting:
      'UtilDock est servi par Cloudflare Pages. Comme tout hébergeur web, Cloudflare traite les requêtes réseau nécessaires à la livraison d’une page et peut conserver des données techniques limitées — adresse IP, agent utilisateur, horodatages — pour la sécurité et la prévention des abus, régies par la [politique de confidentialité de Cloudflare](https://www.cloudflare.com/privacypolicy/). Cela couvre les requêtes pour les fichiers du site lui-même. Ce que vous collez dans un outil ne fait jamais partie d’une requête, et ne figure donc dans aucun journal.',
    securityHeading: 'Sécurité',
    security: [
      'Le site est servi en HTTPS avec une Content-Security-Policy stricte qui restreint les origines autorisées à charger du code ou à recevoir des données. C’est ce qui fait de l’engagement de confidentialité ci-dessus une propriété de la façon dont le site est construit, plutôt qu’une promesse qu’il faudrait simplement croire. Vous êtes invité à le vérifier : ouvrez les outils de développement de votre navigateur, utilisez n’importe quel outil du site, et inspectez les requêtes.',
      'Les problèmes de sécurité peuvent être signalés à [security@utildock.dev](mailto:security@utildock.dev), ou consultez notre [security.txt](/.well-known/security.txt).',
    ],
    childrenHeading: 'Vie privée des enfants',
    children:
      'UtilDock est un outil de développement et ne s’adresse pas aux enfants. Nous ne collectons sciemment d’informations personnelles de personne, y compris des enfants de moins de 13 ans.',
    changesHeading: 'Modifications de cette politique',
    changes:
      'Si cette politique change, la date en haut de cette page change avec elle. L’engagement selon lequel les données que vous collez restent dans votre navigateur n’est pas quelque chose que nous comptons revisiter.',
    contactHeading: 'Contact',
    contact:
      'Les questions sur cette politique peuvent être adressées à [security@utildock.dev](mailto:security@utildock.dev).',
  },

  toolAbout: {
    'json-formatter': [
      'Collez ou déposez un document dans le panneau d’entrée et le résultat formaté apparaît pendant que vous tapez. Choisissez deux, trois ou quatre espaces, ou des tabulations — selon ce qu’utilise votre projet. Passez à **Minifier** pour retirer chaque octet d’espace blanc, ce que vous voulez avant d’intégrer du JSON dans une variable d’environnement ou une URL.',
      '**Trier les clés** réécrit chaque objet avec ses clés dans l’ordre alphabétique. Deux documents qui ne diffèrent que par l’ordre des clés deviennent identiques octet pour octet, ce qui les fait se comparer proprement dans le contrôle de version.',
      'L’analyse tourne dans un Web Worker, si bien que même des documents de plusieurs mégaoctets se formatent sans que la page cesse de répondre pendant que vous tapez.',
    ],
    'json-viewer': [
      'Collez un document dans le panneau source et il devient un arbre navigable, avec des objets et des tableaux repliables à chaque niveau et des valeurs colorées par type.',
      'Le champ de filtre cherche aussi bien dans les clés que dans les valeurs, et ouvre ce qu’il faut pour vous montrer une correspondance. Survolez n’importe quelle ligne pour copier le chemin complet vers cette valeur.',
      'Seules les lignes actuellement à l’écran sont rendues, si bien qu’un document comptant des centaines de milliers de nœuds reste fluide à parcourir.',
    ],
    'json-validator': [
      'Chaque erreur de syntaxe est signalée avec sa ligne et sa colonne exactes, et soulignée dans l’éditeur là où elle se produit. L’analyseur s’arrête au premier problème : corrigez celui-là et tout ce qui se trouve plus bas apparaîtra.',
      'Activez **Vérifier avec un schéma** et un second panneau s’ouvre pour un JSON Schema. Chaque violation est listée avec son chemin, et cliquer dessus y amène l’éditeur.',
      'Le document comme le schéma restent dans cet onglet. Ni l’un ni l’autre n’est envoyé, ce qui est bien le sujet quand le schéma est interne et le document réel.',
    ],
    'json-diff': [
      'Collez un document de chaque côté. La comparaison est structurelle plutôt que textuelle : les deux documents sont d’abord analysés, si bien que des clés réordonnées, une indentation différente et des espaces en fin de ligne ne comptent jamais comme des changements.',
      'Les éléments de tableau sont appariés par identité lorsqu’il en existe une — un champ **id**, **key**, **uuid** ou **name** — de sorte qu’insérer un élément au début signale un seul ajout au lieu de réécrire tout ce qui suit.',
      'Les longues suites de lignes identiques se replient, laissant les changements avec juste ce qu’il faut de structure autour pour situer chacun. Alt + ↑ et Alt + ↓ parcourent les différences.',
    ],
  },

  islands: {
    common: {
      load: 'Charger',
      loadTitle: 'Lire un fichier local — il est lu sur cette machine, jamais envoyé',
      sample: 'Exemple',
      sampleTitle: 'Charger un document d’exemple',
      clear: 'Effacer',
      copy: 'Copier',
      copied: 'Copié',
      copyTitle: 'Copier dans le presse-papiers',
      download: 'Télécharger',
      dropHere: 'Déposez la matière ici',
      path: 'chemin',
      pathCopied: 'copié',
      copyPathTitle: 'Copier le chemin — {path}',
      validJson: 'JSON valide',
      errorAt: 'Ligne {line}, colonne {column} — {message}',
      stats: '{objects} objets · {arrays} tableaux · {keys} clés · profondeur {depth}',
    },

    formatter: {
      inputTitle: 'Entrée',
      formattedTitle: 'Formaté',
      minifiedTitle: 'Minifié',
      inputLabel: 'Entrée JSON',
      outputLabel: 'Sortie JSON formatée',
      placeholder: '{\n  "collez": "votre JSON ici"\n}',
      idle: 'Collez ou déposez du JSON pour commencer',
      indent: 'Indentation',
      spaces: '{count} espaces',
      tab: 'Tabulation',
      sortKeys: 'Trier les clés',
      sortKeysTitle: 'Trier les clés des objets par ordre alphabétique',
      pretty: 'Formater',
      minify: 'Minifier',
      sameSize: 'même taille',
      sizeDelta: '{delta} % de calamine retirée',
      prettyFile: 'formate.json',
      minifiedFile: 'minifie.json',
    },

    viewer: {
      sourceTitle: 'Source',
      treeTitle: 'Arbre',
      sourceLabel: 'Source JSON',
      placeholder: '{\n  "collez": "le JSON que vous voulez explorer"\n}',
      idle: 'Collez ou déposez du JSON pour l’explorer',
      filter: 'Filtrer clés et valeurs',
      filterAria: 'Filtrer l’arbre',
      expandAll: 'Tout déplier',
      expandAllTitle: 'Déplier chaque nœud',
      collapse: 'Replier',
      collapseTitle: 'Replier jusqu’à la racine',
      expand: 'Déplier',
      treeAria: 'Arbre JSON',
      nothingYet: 'Rien à montrer pour l’instant',
      matching: p({
        one: '{count} nœud correspondant',
        other: '{count} nœuds correspondants',
      }),
      rowsShown: '{count} lignes affichées',
      noFilterMatch: 'Aucune clé ni valeur ne correspond à ce filtre.',
      emptyValid: 'L’arbre apparaît ici dès que le panneau Source contient du JSON valide.',
      emptyError: 'Corrigez l’erreur de syntaxe dans le panneau Source et l’arbre apparaîtra ici.',
    },

    validator: {
      documentTitle: 'Document',
      schemaTitle: 'JSON Schema',
      resultTitle: 'Résultat',
      documentLabel: 'Document JSON à valider',
      placeholder: '{\n  "collez": "le JSON que vous voulez vérifier"\n}',
      schemaPlaceholder: '{\n  "type": "object",\n  "required": ["id"]\n}',
      broken: 'Erroné',
      brokenTitle: 'Charger un document avec des erreurs de syntaxe délibérées',
      sampleValidTitle: 'Charger un exemple valide',
      useSchema: 'Vérifier avec un schéma',
      useSchemaTitle: 'Vérifier aussi le document par rapport à un JSON Schema',
      idle: 'Collez ou déposez du JSON pour le valider',
      checking: 'Vérification…',
      invalidAt: 'JSON invalide — ligne {line}, colonne {column} : {message}',
      schemaViolations: p({
        one: 'JSON valide, mais {count} violation du schéma',
        other: 'JSON valide, mais {count} violations du schéma',
      }),
      validAndMatches: 'JSON valide et conforme au schéma',
      emptyBody:
        'Collez un document dans le panneau Document. Il est vérifié pendant que vous tapez, entièrement dans cet onglet.',
      firstProblem:
        'L’analyseur s’arrête au premier problème rencontré. Corrigez celui-ci et les erreurs situées plus bas dans le document apparaîtront.',
      okSchema: 'Le document est du JSON valide et satisfait chaque règle du schéma.',
      okPlain: 'Le document est du JSON valide.',
      atLine: 'L{line}',
    },

    diff: {
      originalTitle: 'Original',
      changedTitle: 'Modifié',
      comparisonTitle: 'Comparaison',
      originalLabel: 'JSON original',
      changedLabel: 'JSON modifié',
      originalPlaceholder: '{\n  "le": "document original"\n}',
      changedPlaceholder: '{\n  "le": "document à comparer"\n}',
      swap: 'Inverser',
      swapTitle: 'Inverser les deux côtés',
      hideInput: 'Masquer l’entrée',
      editInput: 'Modifier l’entrée',
      hideTitle: 'Masquer les éditeurs et donner la page à la comparaison',
      showTitle: 'Réafficher les éditeurs',
      foldSame: 'Replier identiques',
      showAll: 'Tout afficher',
      showAllTitle: 'Afficher chaque ligne inchangée au lieu de les replier',
      split: 'Côte à côte',
      stack: 'Empiler',
      splitTitle: 'Afficher les deux documents côte à côte',
      stackTitle: 'Empiler les deux documents en une colonne',
      prev: 'Différence précédente',
      next: 'Différence suivante',
      prevTitle: 'Différence précédente (Alt + ↑)',
      nextTitle: 'Différence suivante (Alt + ↓)',
      keyboardHint: 'Alt + ↑ / ↓ parcourt les différences',
      truncated: 'Comparaison tronquée — les documents sont très volumineux',
      onlyOriginal: 'seulement dans l’original',
      onlyChanged: 'seulement dans le modifié',
      replaced: 'remplacé',
      headerOriginal: 'Original',
      headerChanged: 'Modifié',
      unifiedOriginal: '− original',
      unifiedChanged: '+ modifié',
      idle: 'Collez un document de chaque côté — ou appuyez sur **Exemple** pour l’essayer avec une paire qui diffère de quelques façons intéressantes.',
      sideError:
        'Le document {side} comporte une erreur de syntaxe à la ligne {line}. Corrigez-la et la comparaison s’exécutera.',
      sideOriginal: 'original',
      sideChanged: 'modifié',
      comparing: 'Comparaison…',
      identicalTitle: 'Les deux documents sont équivalents',
      identicalBody:
        'Toutes les valeurs correspondent. Les différences d’ordre des clés, d’indentation et d’espaces sont ignorées, puisque aucune ne change ce que le JSON signifie.',
      identicalLines: p({
        one: '{count} ligne identique',
        other: '{count} lignes identiques',
      }),
      showIdentical: 'Afficher ces lignes identiques',
      jumpTo: 'Aller à la prochaine différence de type « {kind} »',
      kinds: {
        added: 'ajouté',
        removed: 'supprimé',
        changed: 'modifié',
        moved: 'déplacé',
      },
    },
  },
};
