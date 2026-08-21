export const deckMeta = {
  title: "Le Contradicteur",
  subtitle: "Préparer le comité. Ne pas le remplacer.",
  duration: "5 min de pitch · 1 min de démonstration",
  status: "MAQUETTE SIMULÉE",
  regime: "SANDBOX · DONNÉES FICTIVES",
  execution: "AUCUN APPEL IA"
};

export const slides = [
  {
    id: "ouverture",
    number: "01",
    layout: "cover",
    eyebrow: "THE QAMP · 9–10 SEPTEMBRE 2026",
    title: "La question que personne n’a posée.",
    statement: "Le Contradicteur prépare un porteur aux points de rupture et aux questions d’un Comité d’Engagement.",
    kicker: "Cinq lectures antagonistes. Une consolidation sans moyenne.",
    notes: "Ouvrir sur l’expérience du porteur : un retour encourageant ne le prépare pas nécessairement à la question qui fera tomber son pitch. Ne revendiquer aucun résultat expérimental à ce stade.",
    sources: ["spec/01-arbitrage-et-personas.md", "spec/02-format-de-sortie.md"]
  },
  {
    id: "probleme",
    number: "02",
    layout: "editorial",
    eyebrow: "LE PROBLÈME",
    title: "Un retour utile n’est pas un retour rassurant.",
    statement: "Un prompt généraliste peut lisser le désaccord : il résume, encourage et améliore la forme. Le comité, lui, cherche ce qui ne tient pas.",
    callout: "Le risque n’est pas seulement la mauvaise réponse. C’est la question absente.",
    items: [
      "La même lecture du dossier se répète sous plusieurs formulations.",
      "Une information manquante est parfois complétée au lieu d’être interrogée.",
      "Des objections indépendantes sont moyennées en une recommandation tiède."
    ],
    notes: "Formuler ces points comme risques de conception, pas comme résultats déjà observés sur la maquette.",
    sources: ["spec/01-arbitrage-et-personas.md", "spec/02-format-de-sortie.md"]
  },
  {
    id: "promesse",
    number: "03",
    layout: "split",
    eyebrow: "LE RÔLE",
    title: "Le dispositif produit des questions. Le SUM garde le jugement.",
    statement: "Le rapport tient sur une page, hiérarchise jusqu’à trois ruptures et formule quatre à six questions à poser à voix haute.",
    left: {
      "title": "Le Contradicteur",
      "items": ["Isole les lectures", "Rattache chaque reproche à une citation", "Déclare ce qui n’a pas été instruit"]
    },
    right: {
      "title": "Le Startup Manager",
      "items": ["Choisit les questions", "Conduit l’entretien", "Décide quoi dire, quand et comment"]
    },
    footer: "Ce document ne se transmet pas au porteur. Il prépare un entretien, il ne le remplace pas.",
    notes: "Insister sur le refus de l’automatisation de la décision. Le produit s’adresse au SUM, pas directement au porteur.",
    sources: ["spec/02-format-de-sortie.md"]
  },
  {
    id: "architecture",
    number: "04",
    layout: "flow",
    eyebrow: "L’ARCHITECTURE",
    title: "La divergence ne se demande pas. Elle se construit.",
    statement: "Cinq contextes séparés reçoivent des découpes différentes du même pitch deck. Une sixième passe consolide les avis sans effacer un bloquant.",
    steps: [
      {"label": "Entrée", "detail": "Pitch deck fictif normalisé"},
      {"label": "5 avis", "detail": "Objectifs, horizons et informations asymétriques"},
      {"label": "Contrôles", "detail": "Complétude, ancres, couverture, manifeste"},
      {"label": "Arbitrage", "detail": "Hiérarchie sémantique, jamais une moyenne"},
      {"label": "Sortie", "detail": "Ruptures, questions, absences, résistance"}
    ],
    notes: "Expliquer que l’étanchéité est une définition opérationnelle à documenter dans le manifeste. Ne pas dire qu’elle est prouvée par la seule existence de cinq appels.",
    sources: ["spec/01-arbitrage-et-personas.md", "spec/03-brief-demonstrateur-sol46.md"]
  },
  {
    id: "demo",
    number: "05",
    layout: "comparison",
    eyebrow: "LA DÉMONSTRATION · 1 MINUTE",
    title: "Une comparaison honnête commence par ne pas écrire le témoin.",
    statement: "À gauche : le prompt B0 figé et sa sortie brute, à capturer. À droite : le format cible du rapport, montré ici sous forme simulée.",
    left: {"label": "PROMPT B0 FIGÉ", "title": "Sortie réelle à capturer", "detail": "Aucun texte de baseline n’est inventé pour la maquette."},
    right: {"label": "FORMAT CIBLE SIMULÉ", "title": "Points de rupture → questions", "detail": "Sandbox-17 est un gabarit visuel, pas un run et pas une mesure."},
    footer: "La maquette publique ne déclenche aucun appel IA.",
    notes: "Basculer vers /demo/ pour la séquence projecteur. Ne pas commenter de résultat puisque la sortie B0 n’est pas encore capturée et que la colonne droite est un format cible.",
    sources: ["spec/02-format-de-sortie.md", "spec/11-frontiere-demo-production.md"]
  },
  {
    id: "postures",
    number: "06",
    layout: "personas",
    eyebrow: "LES CINQ POSTURES",
    title: "Cinq façons incompatibles d’appeler un dossier “solide”.",
    statement: "Les postures ne se partagent pas les critères QFC. Elles se heurtent sur les mêmes faits depuis des objectifs opposés.",
    personas: [
      {"id": "A1", "name": "L’Interchangeable", "question": "Pourquoi cette équipe ?"},
      {"id": "A2", "name": "L’Acheteur", "question": "Qui paie ?"},
      {"id": "A3", "name": "Le Déjà-Vu", "question": "Pourquoi changer ?"},
      {"id": "A4", "name": "Le Constructeur", "question": "Qu’est-ce qui casse ?"},
      {"id": "A5", "name": "Le Liquidateur", "question": "Quand atteint-on zéro ?"}
    ],
    notes: "Donner un exemple de même ancre susceptible de recevoir deux lectures différentes, sans annoncer le verdict attendu d’un test.",
    sources: ["spec/01-arbitrage-et-personas.md"]
  },
  {
    id: "controle",
    number: "07",
    layout: "ledger",
    eyebrow: "L’INSTRUMENTATION",
    title: "Ce que le code devra établir. Ce qu’il ne pourra pas garantir.",
    statement: "Le contrat impose une citation littérale, un statut d’instruction par axe et l’aveu de ce que le dispositif n’a pas instruit.",
    established: [
      "Cinq sorties complètes ou run non instruit",
      "Citation présente dans la découpe reçue",
      "Couverture explicite des six critères",
      "Artefacts du run identifiés dans un manifeste"
    ],
    notEstablished: [
      "Qu’une citation soutient une bonne inférence",
      "Que le verdict prédit une décision du comité",
      "Que trois cas synthétiques généralisent",
      "Qu’un fournisseur est qualifié pour des decks réels"
    ],
    notes: "Cette slide protège contre l’inflation de modalité. Employer établir, documenter, attester et observer avec précision.",
    sources: ["spec/01-arbitrage-et-personas.md", "spec/04-seuil-de-divergence.md", "spec/11-frontiere-demo-production.md"]
  },
  {
    id: "confidentialite",
    number: "08",
    layout: "boundary",
    eyebrow: "LA FRONTIÈRE DE DONNÉES",
    title: "Aujourd’hui : zéro deck réel. Demain : une chaîne qualifiée.",
    statement: "Le prototype public est un rejeu statique sur données fictives. Un deck réel n’entre dans le dispositif qu’après qualification technique et contractuelle de toute la chaîne.",
    path: [
      {"label": "Démo QAMP", "state": "OUVERT", "detail": "SANDBOX · fixtures fictives"},
      {"label": "Qualification", "state": "FERMÉ PAR DÉFAUT", "detail": "Aucune donnée avant le gate"},
      {"label": "Production", "state": "À CONSTRUIRE", "detail": "Environnement maîtrisé et qualifié"}
    ],
    footer: "Local protège une clé. Il ne protège pas une donnée envoyée à un modèle distant.",
    notes: "Goodweek est un candidat à qualifier, pas un environnement déjà qualifié. Ne pas présenter l’auto-hébergement comme l’unique architecture admissible ni comme une preuve de sécurité.",
    sources: ["spec/11-frontiere-demo-production.md"]
  },
  {
    id: "conclusion",
    number: "09",
    layout: "closing",
    eyebrow: "CE QUE NOUS SOUMETTONS",
    title: "Préparer la question qui fait tomber le pitch. Sans décider à la place du comité.",
    statement: "Jugez la méthode sur sa capacité à rendre visibles les ruptures, les désaccords et les zones non instruites — pas comme une prédiction de survie d’une startup.",
    asks: [
      "Un format que le SUM peut lire debout avant un entretien",
      "Une démonstration reproductible en rejeu",
      "Une méthode portable vers un environnement qualifié, après requalification"
    ],
    kicker: "Le Contradicteur · Quest for Change · The Qamp 2026",
    notes: "Finir sobrement. Si les résultats expérimentaux ne sont pas encore disponibles, ne rien ajouter. Une fois les runs gelés, la conclusion pourra être mise à jour sur la base des seules observations documentées.",
    sources: ["spec/02-format-de-sortie.md", "spec/11-frontiere-demo-production.md"]
  }
];
