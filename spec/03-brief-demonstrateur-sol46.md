# Spécification du démonstrateur « Le Contradicteur »

*20 août 2026 · run à blanc · **révisé après revue technique SOL 4.6** — voir `07-arbitrage-retour-sol46.md` pour les arbitrages*

Ce document était un brief ; il devient la spécification partagée du démonstrateur.

---

## Décisions d'exécution arrêtées

**Option d — direct en local, GitHub Pages en vitrine, rejeu public.** Pas deux produits : **deux adaptateurs vers le même objet `run`.** Les mêmes fichiers statiques sont servis par Pages et en local ; le serveur local ajoute uniquement le déclenchement des appels et l'écriture des JSON. La clé vit dans une variable d'environnement, jamais dans le dépôt ni dans le navigateur.

Écartés : la clé collée par le spectateur dans le navigateur (UX fragile, et l'éditeur d'API le déconseille explicitement) ; le proxy public (quotas, limitation, CORS, authentification, coupe-circuit — un projet à lui seul).

**Le pitch utilise un rejeu, avec un badge visible `RUN ENREGISTRÉ`.** Le direct local est réservé aux questions. Raison principale : la reproductibilité, pas le wifi. Températures identiques signifie variables contrôlées, pas résultats reproductibles — deux exécutions sur le même dossier peuvent tomber différemment entre la répétition de 11h30 et le pitch de 15h.

**Timebox dur de 90 minutes** pour rendre le direct accessible depuis l'écran. Dépassé, le runner local continue de produire les JSON et le bouton « direct » disparaît.

**Sorties structurées, JSON Schema strict**, rendues ensuite en bloc lisible de façon déterministe. Le panneau des avis bruts affiche toujours `AXE : / HORIZON : / VERDICT : …` — c'est la sortie brute rendue lisible, sans réécriture sémantique. Les sorties structurées garantissent la forme du JSON, pas la véracité des citations : celle-là est vérifiée par le code.

**Le schéma est branché par verdict** — BLOQUANT et NON BLOQUANT n'ont pas les mêmes champs. Un agent qui ne trouve rien ne doit pas avoir à inventer un défaut pour remplir la structure.

**Sept appels par run produit** — B0 la baseline naïve, A1 à A5, l'arbitre — **plus deux runs expérimentaux distincts, B1 et B2**, qui ne font pas partie du produit et tournent une fois, sur un seul dossier. Un seul modèle pour tous, épinglé à un snapshot daté consigné dans le manifeste. Pas de multi-modèle : ce serait un facteur de divergence supplémentaire, et il rendrait l'expérience indéfendable.

**B2 se construit à armes égales** — mêmes instructions mot pour mot, mêmes cinq découpes présentées comme cinq blocs étiquetés, même schéma, même arbitrage, même rendu. Une seule différence : une requête partagée contre cinq requêtes étanches. Spécification complète dans `04-seuil-de-divergence.md`, à figer avant de l'exécuter.

**Latence.** `durée = max(B0, A1…A5) + arbitre`. Plafonner les sorties, lancer B0 avec les cinq agents, poser un délai global, et accepter `NON INSTRUIT` si un avis manque. Moins de soixante secondes est plausible, pas garanti — seule une mesure sur le portable et le réseau réels le dira.

---

## Ce qu'on construit

Une page web unique qui prend un dossier de candidature startup et affiche **deux instructions côte à côte** : à gauche ce qu'une IA générique en dit, à droite ce que produit un comité synthétique de cinq évaluateurs aux objectifs opposés.

L'écart entre les deux colonnes doit être visible en dix secondes, sans lire. C'est le seul critère de réussite de l'écran.

**Temps disponible : environ dix heures de construction, gel jeudi 12h00.** Tout ce qui n'est pas dans la liste ci-dessous est hors périmètre, y compris si c'est facile.

---

## Architecture

```
                  ┌─ appel 1 · A1 L'Interchangeable ─┐
                  ├─ appel 2 · A2 L'Acheteur ────────┤
   dossier ───────┼─ appel 3 · A3 Le Déjà-Vu ────────┼──→ appel 6 · Arbitre ──→ rapport
   (markdown)     ├─ appel 4 · A4 Le Constructeur ───┤
                  └─ appel 5 · A5 Le Liquidateur ────┘

   dossier ───────── appel 0 · prompt neutre ──────────────────────→ colonne gauche
```

Six règles non négociables, ce sont elles qui font le projet :

1. **Les cinq appels sont isolés.** Contextes séparés, aucun ne reçoit la sortie d'un autre, aucun ne sait que les autres existent. Si l'implémentation fait passer les cinq personas dans un seul appel, le projet n'a plus d'objet.
2. **Les cinq appels sont parallèles.** Pour le temps de réponse, et parce que le séquencement rendrait l'isolation moins évidente à démontrer.
3. **Les cinq entrées sont différentes.** Chaque persona reçoit une découpe du dossier, définie dans le fichier des personas. Le découpage est une donnée de configuration visible, pas une valeur en dur perdue dans le code — on va nous demander de la montrer.
4. **Températures identiques sur les cinq appels.** La divergence vient des prompts. Si elle vient du sampling, elle n'est pas reproductible et la démo peut donner l'inverse le jour J.
5. **L'arbitre ne reçoit que les cinq blocs de sortie**, jamais le dossier. Il consolide, il ne rejuge pas.
6. **Le prompt de la colonne gauche est figé et affichable.** Une seule phrase, celle qu'un porteur écrirait. On ne le truque pas — quelqu'un dans le jury refera l'essai.

---

## Le format d'entrée

Un dossier est un fichier markdown avec **dix sections en titre de niveau 2, aux libellés exacts ci-dessous, toujours dans cet ordre**. Le découpage par agent se fait par extraction de sections — d'où l'exigence de libellés stables.

```
## 1. Identité
## 2. Le problème
## 3. Le porteur et l'équipe
## 4. La solution
## 5. Avancement et moyens techniques
## 6. Propriété intellectuelle
## 7. Le marché
## 8. Preuves terrain
## 9. Modèle économique
## 10. Prévisionnel et financement
```

**Les dossiers de la sandbox n'ont pas cette structure.** On ne l'attend pas d'eux : les trois dossiers de démonstration sont normalisés à la main dans ce schéma. L'extraction automatique depuis la sandbox est la voie de production, pas celle du sprint.

**Chaque section accueille en outre les champs de la fiche de faits** qui la concernent — quatorze champs au total, distribués, jamais regroupés en tête de dossier. Liste fermée, format et règles dans `08-fiche-de-faits.md`. **Ce schéma se fige avant le choix des dossiers**, sinon on le taille sur ceux qu'on a sous la main.

**Budget : environ 3 h 15 pour les trois dossiers, plus 45 min pour arrêter le schéma.** Révisé deux fois à la hausse. Tant qu'on n'a pas ouvert un dossier sandbox réel, ce budget reste le plancher. **Quatre heures prises sur dix heures de construction font échouer le sprint** — d'où la question écrite aux organisateurs sur la préparation en amont, qui est devenue bloquante et non plus confortable.

**Ordre imposé si le temps manque** : le dossier clos par liquidation, puis le dossier solide, puis le moyen. Les deux premiers portent la démonstration ; le troisième est le seul qu'on peut sacrifier.

**Le gabarit de normalisation** se pré-remplit une fois pour toutes : les dix titres, et sous chacun `[SECTION ABSENTE DU DOSSIER]` par défaut. Normaliser consiste alors à coller le contenu et à effacer le marqueur là où il y en a. Le marqueur devient correct par construction au lieu de dépendre de la vigilance de quelqu'un à 11h du matin.

### Matrice de découpe

× = la section est transmise à cet agent. Le reste ne lui parvient pas.

| Section | A1 Interchangeable | A2 Acheteur | A3 Déjà-Vu | A4 Constructeur | A5 Liquidateur |
|---|:--:|:--:|:--:|:--:|:--:|
| 1. Identité | × | × | × | × | × |
| 2. Le problème | × | × | × | | |
| 3. Le porteur et l'équipe | × | | | | |
| 4. La solution | × | × | × | × | |
| 5. Avancement et moyens techniques | | | × | × | |
| 6. Propriété intellectuelle | | | × | × | |
| 7. Le marché | | × | × | | × |
| 8. Preuves terrain | × | × | | **×** | × |
| 9. Modèle économique | | × | × | | × |
| 10. Prévisionnel et financement | | | | × | × |

La section 1 va à tout le monde : la typologie change ce qu'un point de rupture signifie.

**La section 8 est le point de collision possible, et c'est le cœur du dispositif.** A4 la reçoit depuis la revue du 20/08 — la version initiale ne la lui donnait pas, ce qui contredisait son persona et supprimait le seul endroit où une contradiction interprétative pouvait naître. **Ne pas réduire cette ligne.**

> *Note de conception — ne descend pas dans les prompts.* Le cas qu'on espère voir apparaître : des pilotes gratuits qui tournent depuis longtemps, BLOQUANT côté Acheteur parce que personne ne paie, NON BLOQUANT côté Constructeur parce que ça tourne en conditions réelles. **Cette phrase ne doit figurer dans aucun prompt exécutable** — un persona à qui on annonce le verdict attendu ne mesure plus rien. On câble l'occasion de se contredire ; si la contradiction n'apparaît pas, c'est un résultat, pas un bug à corriger par la consigne.

Les compétences techniques vivent en section 5, pas en section 3 : A1 reste seul à instruire l'équipe, A4 instruit les moyens.

**La matrice est la source de vérité.** En cas de désaccord entre elle et un texte de persona, c'est elle qui gagne, et le persona se corrige.

**La matrice est un fichier de configuration lisible, pas des valeurs en dur dans le code.** On va nous demander de la montrer, et il faudra pouvoir la modifier mercredi soir sans rouvrir la logique.

### Règle de section absente — à ne pas rater

Si une section manque dans le dossier, l'agent reçoit le titre suivi de `[SECTION ABSENTE DU DOSSIER]`, jamais rien du tout.

Sans ce marqueur, l'agent ne peut pas distinguer « on ne me l'a pas donné » de « ce n'est pas dans le dossier » — or `ABSENT DU DOSSIER` est un champ obligatoire de sa sortie, et il alimente la section 4 du rapport. Sans le marqueur, cette section est du bruit.

---

## L'écran

Une page. Pas de navigation, pas d'onglets.

```
┌──────────────────────────────────────────────────────────────────────┐
│  [ Sandbox-17 ▾ ]                                  [ INSTRUIRE ]     │
├───────────────────────────────┬──────────────────────────────────────┤
│  IA GÉNÉRIQUE                 │  LE CONTRADICTEUR                    │
│  1 appel · prompt neutre      │  5 avis isolés + arbitrage           │
│  (prompt affiché, dépliable)  │                                      │
│                               │  ⚠ BLOQUANT — axe Désirabilité       │
│  Belle idée, bien structurée. │                                      │
│  Trois pistes d'amélioration… │  1 · Points de rupture               │
│                               │  2 · Ce sur quoi les axes se rejoignent│
│                               │  3 · Les questions du comité         │
│                               │  4 · Ce qui manque                   │
│                               │  5 · Ce qui résiste                  │
│                               │  6 · Non instruit                    │
│                               │                                      │
│                               │  [ voir les 5 avis bruts ▾ ]         │
├───────────────────────────────┴──────────────────────────────────────┤
│  Divergence : 3 verdicts BLOQUANT / 2 NON BLOQUANT · 4 axes distincts│
└──────────────────────────────────────────────────────────────────────┘
```

**Le bandeau de divergence en bas compte autant que le rapport.** Il montre que le dispositif est instrumenté et pas seulement bavard, et il donne au pitch sa phrase la plus solide : les cinq agents ne sont pas d'accord entre eux, et c'est voulu.

**Le panneau des cinq avis bruts** se déplie et affiche les cinq blocs tels que reçus, non réécrits. Il montre que les sorties diffèrent — **il n'établit pas l'étanchéité.** Seul le manifeste enrichi s'en approche, et pas complètement. Ne pas les confondre à l'écran ni dans le pitch : cinq sorties différentes sont compatibles avec un seul appel bien écrit, et c'est exactement l'objection qu'on nous fera.

**Deux champs de sortie servent au contrôle, pas à l'affichage :**

- `ANCRE` — chez les cinq agents. Les cinq ancres s'affichent **alignées l'une sous l'autre** en tête du panneau, avant les blocs complets : c'est sur ces cinq lignes que se fait le comptage des faits distincts.
- `CORPUS` — chez A3 uniquement. Dix décisions d'un mot, une par substitut, puis celui qui est retenu.

### Ce que le code établit, et qu'aucun modèle ne calcule

Correction issue de la revue : l'arbitre ne recevait que les cinq avis et devait pourtant produire l'en-tête, la couverture des critères et la validité des citations. Il aurait halluciné tout ce qu'il ne pouvait pas savoir.

| Sortie | Comment |
|---|---|
| Complétude, `NON INSTRUIT` si un avis manque | comptage |
| Verdict global et axes bloquants | un seul BLOQUANT suffit |
| En-tête : dossier, stade, typologie, date, régime | métadonnées |
| **C0 — ancrage littéral** | recherche de sous-chaîne pure : l'ancre figure-t-elle littéralement dans la découpe reçue, en 15 mots au plus ? Plus d'exception sémantique — les manques se citent depuis les marqueurs, qui sont du texte. **Une reprise au maximum, déclenchée par le contrôle et jamais par quelqu'un qui a lu le verdict ; encore invalide → run `NON INSTRUIT`.** Les critères ne se calculent qu'à 5/5. |
| **Validité de `ABSENT DU DOSSIER`** | chaque item est-il adossé à un marqueur présent chez cet agent ? Les autres sont reversés en questions. C'est la partie transmissible du rapport : un manque faux détruit la crédibilité de l'accompagnement. |
| Éligibilité Grand Est | booléen déterministe sur la section Identité |
| Corpus A3 | **hash du contenu injecté** + présence des dix décisions |
| Sections transmises par agent | depuis la matrice |
| Comptages, latences, erreurs | journalisation |

Le sixième appel ne garde que le sémantique : convergences, contradiction interprétative, dédoublonnage, hiérarchisation, rédaction. Effet de bord bienvenu — l'appel raccourcit, donc il accélère.

### Le manifeste du run

Cinq sorties différentes n'établissent pas l'étanchéité. **Cinq identifiants de requête non plus** : cinq appels peuvent partager une conversation, ou se transmettre des messages. Le manifeste doit donc consigner six choses :

```
les cinq identifiants de requête
les horodatages, superposés
l'absence de conversation, de parent, de contexte partagé
les sections fournies à chaque agent
le hash de chacune des cinq charges utiles
le hash des prompts et du modèle épinglé
```

**Deux précisions d'implémentation sans lesquelles le manifeste ne vaut rien.**

*Les champs « pas de conversation, pas de parent, pas de contexte partagé » sont dérivés des requêtes réellement émises*, jamais renseignés comme des booléens à la main. Un booléen déclaratif est une assertion, et on retombe exactement sur ce qu'on essaie de sortir.

*Les empreintes sont recalculables depuis les sept entrées exactes conservées dans le run.* Sinon le lecteur voit une chaîne opaque sans pouvoir vérifier ce qu'elle représente, et l'empreinte devient un ornement.

**Ce qu'il établit alors, exactement** : cinq charges utiles distinctes, émises indépendamment, dont aucune ne contient la sortie d'une autre. C'est la définition opérationnelle de l'étanchéité que nous avons retenue — pas une preuve au sens fort, mais un fait qu'un lecteur recalcule en ouvrant le fichier.

**Et une conséquence à ne pas perdre de vue** : cette propriété tient parce qu'on est en `SANDBOX`. Conserver les sept entrées exactes dans le run, c'est conserver les découpes du dossier — acceptable sur des fixtures synthétiques publiables, exclu d'un artefact public en production.

Ce que ça réduit exactement, c'est la **vérifiabilité publique**, pas l'auditabilité. Une auditabilité interne reste possible avec des charges utiles chiffrées, un accès restreint et une durée de conservation définie. Ne conserver que les empreintes est un choix fort de minimisation — le plus simple à défendre, pas le seul admissible. À trancher au moment du gate, pas maintenant.

**Sur le corpus des substituts, deux contrôles à ne pas confondre.** Le hash du corpus injecté établit qu'il a été **transmis**. Les dix décisions établissent une **couverture déclarée** : qu'une décision a été émise pour chacun des dix identifiants. Elles n'établissent pas que le contenu a été exploité — un modèle peut produire dix valeurs d'énumération sans lire les lignes. Chaque décision porte donc un motif de trois à cinq mots ancré dans la ligne du substitut : ça n'en fait pas une preuve, mais un motif générique devient visible à l'œil nu pour le relecteur.

Le rapport de droite suit exactement la structure spécifiée dans `02-format-de-sortie.md`. Le rendu compte : une colonne qui ressemble à un document d'instruction, pas à une réponse de chat.

### Ce qui s'affiche pendant la minute chronométrée

Une page de rapport dans une demi-largeur de vidéoprojecteur est illisible. Pendant la minute, à l'écran :

- **à gauche** — le début de la réponse naïve, rien de plus ;
- **à droite** — le bandeau de verdict et **trois éléments**, pas six sections ;
- puis la chute.

**Aucun défilement pendant la minute.** Le rapport complet, les cinq avis bruts, le manifeste et l'ablation B2 vivent dans des tiroirs qui ne s'ouvrent qu'en questions-réponses.

**B2 est montrable.** L'ablation « les cinq personas dans un contexte partagé » n'est pas qu'un contrôle hors écran : c'est un **indice qualitatif montrable** sur la seule décision qui porte toute l'architecture. Un juré demande pourquoi cinq appels plutôt qu'un prompt qui contient les cinq rôles, on ouvre le tiroir, il voit un écart en trois secondes — sur un cas, avec un relecteur. Même moteur de rendu, un JSON de plus.

---

## Ce qu'on ne construit pas

À dire à voix haute si on nous le demande, parce que c'est un arbitrage assumé, pas un oubli :

- Pas de connecteur, pas d'Asana, pas d'API externe autre que le modèle. **Le Déjà-Vu n'a pas d'accès web** : il reçoit un corpus de substituts figé, dix lignes, versé avec son prompt. Décision du 20/08 — l'accès web casserait le mode rejeu.
- Pas d'ingestion de PDF ni de Word. Les dossiers entrent en markdown structuré, écrits à la main.
- Pas de formulaire de saisie. **Trois fixtures synthétiques embarquées, et rien d'autre.**

**Contrainte de sécurité, à lire avant d'écrire la première ligne.** Le runner n'accepte que ces trois fixtures, **identifiées par empreinte SHA-256**. Ni import, ni collage, ni chemin de fichier libre, ni glisser-déposer. Le réflexe naturel serait un sélecteur de fichier : c'est précisément ce qu'il ne faut pas construire. C'est un contrôle *fail-closed* contre l'ingestion accidentelle — pas une barrière contre un contributeur, qui peut toujours modifier une fixture et son empreinte, mais alors de façon explicite et tracée.

**Le détail sans lequel le contrôle est vide** : les empreintes attendues sont **écrites en dur dans un manifeste versionné et commité**. Le code ne les recalcule jamais depuis les fichiers présents — ni au démarrage, ni pendant le build, ni dans un script de génération. Un contrôle qui hache ce qu'il trouve valide tout ce qu'on lui donne.

Et seuls les runs issus de ces fixtures entrent dans le build public : la liste blanche de champs contrôle la forme, pas le contenu. Les deux contrôles se cumulent. Voir `11-frontiere-demo-production.md`.
- Pas d'authentification, pas de base de données, pas de responsive généraliste.
- Pas d'historique, pas de comparaison entre runs.
- Pas de multi-modèle. Un seul modèle pour tous les appels, baseline comprise.
- Pas de proxy public, pas de clé fournie par le spectateur.
- Pas de passage dynamique à quatre agents : il invaliderait tous les calculs faits à cinq.
- **Démonstrateur limité au non-DeepTech, à l'entrée en incubation.** Le champ typologie reste dans l'en-tête — il change ce qu'un point de rupture signifie — mais on ne prétend pas couvrir DeepTech et Biotech/Medtech, dont les cycles n'ont rien à voir.
- Pas d'impression, pas de PDF, pas d'animation, pas de streaming.
- **Aucune prétention à prédire la survie d'une startup ni la décision d'un comité.** Formulation à afficher en permanence : *outil de préparation des questions, pas avis d'admission.* Le dispositif produit une instruction ; il n'a pas d'autorité, le SUM décide.

---

## Ce qui doit exister avant tout le reste

**Le mode rejeu.** Chaque exécution s'écrit dans un fichier JSON — les **sept** entrées, les sept sorties, les horodatages, le manifeste de provenance. L'application doit pouvoir rejouer un run enregistré **sans réseau et sans appel modèle**, à l'identique.

Ce n'est pas du confort. Une démonstration d'une minute qui dépend du wifi d'une salle de hackathon et de la latence d'une API est une démonstration qui échoue une fois sur trois. On enregistre le run de démonstration jeudi matin, et c'est celui-là qu'on montre. Le mode direct reste disponible si quelqu'un demande à voir tourner en vrai — et c'est même une bonne réponse à donner en questions-réponses.

Cette pièce se construit **mercredi**, pas jeudi matin.

---

## Les trois dossiers en dur

| # | Statut | Ce qu'il sert à montrer |
|---|---|---|
| `D01` | **calibration** — cas de démonstration, faiblesse fatale injectée | La chute du pitch : la baseline au prompt neutre n'a pas signalé le point de rupture injecté ; Le Contradicteur en fait son premier |
| `D03` | **calibration** — dossier solide | Que le dispositif sait dire « aucun blocage établi » sur cinq axes instruits. **Sans celui-là, on est un générateur de négatif**, et le jury le trouvera en une question |
| `D02` | **holdout** — jamais ouvert avant le gel de jeudi 10h15 | **Unique test de fumée hors calibration ; aucune prétention de généralisation.** Un run unique, aucune correction après |

`D03` est le plus important des trois pour la crédibilité, et c'est celui qu'on aura envie de couper si le temps manque. Ne pas le couper.

**Ne pas écrire ni dire « le dispositif a vu ce que le comité n'avait pas vu ».** Aucun comité réel n'a instruit ces cas : ils sont fictifs. La comparaison qui tient est baseline contre Contradicteur, pas dispositif contre comité.

---

## La référence de rendu

Le gabarit « Sandbox-17 » du fichier `02-format-de-sortie.md` sert de **sortie de référence**. Pas à reproduire mot pour mot — c'est un exemple fabriqué, pas une sortie réelle — mais à caler le niveau de détail, la densité et le formatage. Si le rendu obtenu est visiblement plus bavard ou plus pauvre que ce gabarit, c'est le rendu qui est à corriger.

---

## L'ordre de construction

Révisé en revue. On ne construit pas le rejeu en premier : **on fige son contrat en premier.** C'est plus fort, parce que tout le reste s'y branche.

1. **Les schémas JSON** — run, avis, rapport. Plus une fixture écrite à la main, affichable. À partir de là, l'interface et le moteur avancent séparément.
2. **Un appel direct structuré**, enregistré.
3. **Les cinq appels parallèles**, avec les validations mécaniques et la sauvegarde.
4. **L'arbitrage et un rapport complet.**
5. **Le rejeu du même run**, réseau coupé.
6. **B0 lancée en parallèle des cinq agents.**
7. **Calibration, enregistrement du run définitif**, et seulement ensuite la mise en forme.

### Les deux portes

| Heure | Ce qui doit être vrai |
|---|---|
| **14h00** | cinq avis structurés valides et enregistrables |
| **16h00** | cycle complet, arbitre compris, enregistré **puis rejoué** |

La porte de 16h a été durcie en revue. « Les cinq appels tournent » était trop faible : si tout le rapport reste à construire jeudi matin, il n'y a rien à contrôler mercredi soir et rien à corriger.

---

## La structure du dépôt

Retenue depuis la revue, elle sépare ce qui est publié de ce qui est brut.

```
/
├── README.md · LICENSE · package.json · .gitignore · .env.example
├── docs/                    interface Pages, également servie en local
│   ├── index.html · app.js · styles.css
│   └── data/demo-run.json   le seul run publié, nettoyé
├── runner/                  server.mjs · pipeline.mjs · validate.mjs
├── prompts/                 les personas, l'arbitre, corpus-substituts.md
├── config/                  matrice-decoupe.json · modele.json
├── schemas/                 avis · rapport · run
├── dossiers/                les trois dossiers synthétiques, publiables
├── runs/raw/                ignoré par Git
├── spec/                    les fichiers 01 à 07
└── tests/smoke.mjs
```

Les réponses d'API brutes, en-têtes et identifiants inutiles ne sont pas publiés. Un seul run nettoyé part dans `docs/data`.

Test à ne pas oublier : **la page doit fonctionner sans CDN, sans police distante, sans aucune ressource réseau.** C'est le même test que le rejeu hors ligne, et il tombe toujours sur une police.

---

## Fini pour mercredi soir

Trois critères, pas plus :

0. **Deux tests négatifs, avant les trois autres critères.** Ce sont des tests de sécurité, ils passent avant tout : (a) une fixture non autorisée est **rejetée avant tout appel réseau** — à vérifier avant la première exécution en direct de mercredi ; (b) un run dont l'empreinte source n'appartient pas au manifeste **ne peut pas entrer dans le build public** — à vérifier avant le premier push vers Pages. Tant que ces deux tests ne sont pas passés, le volet confidentialité est fermé *en conception*, pas en implémentation.
1. Un dossier entre, un rapport sort, en moins de soixante secondes.
2. Les cinq avis bruts sont **visiblement** différents à la lecture — pas mesurablement, visiblement.
3. Le rejeu d'un run enregistré fonctionne réseau coupé.

Si les trois sont atteints mercredi soir, jeudi matin sert à corriger la divergence et à répéter. S'ils ne le sont pas, jeudi matin sert à finir de construire, et on n'aura pas répété.
