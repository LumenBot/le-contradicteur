# Arbitrage du retour SOL 4.6

*20 août 2026 · décisions de l'équipe · ce fichier fait foi sur les points qu'il tranche*

Revue dense et utile. Trois de ses points sont des défauts que ni Goodweek ni nous n'avions vus, et l'un d'eux cassait le dispositif. Un quatrième est juste mais ne tient pas dans dix heures en l'état, et c'est notre travail de dire ce qui rentre.

---

## 1. Ce qu'on accepte sans discussion

### Le dispositif ne savait pas produire NON BLOQUANT — c'était un bug de conception

Le format de sortie imposait `POINT DE RUPTURE`, `ANCRE` et `CE QUI LE LÈVERAIT` **quel que soit le verdict**. Un agent qui ne trouve rien devait donc inventer un défaut pour remplir le schéma. La clause de résistance, censée rendre le dispositif falsifiable, ne corrigeait rien : elle ajoutait une phrase positive à côté d'un point de rupture obligatoire.

C'est le défaut le plus grave de la revue. On corrige à trois endroits :

**Schéma branché par verdict.** BLOQUANT et NON BLOQUANT n'ont plus les mêmes champs.

**Condition d'acquittement explicite par persona.** Chaque agent reçoit un `BLOQUANT SI ET SEULEMENT SI` et un `ACQUITTÉ SI`. Sans ça, « bloquant » est une impression.

**Définition de BLOQUANT, en vocabulaire du réseau** — et on garde notre formulation plutôt que celle de SOL, qui est juste mais extérieure :

> BLOQUANT signifie : en l'état du dossier, sur mon seul axe, je vote NON GO au Comité d'Engagement. Ce n'est pas « un sujet à travailler ». C'est un préalable impératif avant l'entrée en incubation individuelle.

**Conséquence sur le seuil** : le dossier solide passe à **k = 0**, sans exception. SOL a raison — puisqu'un seul BLOQUANT rend le rapport bloquant, tolérer k ≤ 1 sur le dossier solide était incohérent.

Et il faut le dire explicitement : **C1 ne teste pas la même chose sur les trois dossiers.** Sur le dossier solide, ce n'est pas un critère de divergence, c'est un critère de faux positif. On ne demande pas au dispositif de diverger là où il n'y a rien à trouver.

### La clause de résistance devient une contre-preuve

Reformulation de SOL, meilleure que la nôtre : au lieu d'une phrase positive décorative, l'élément qui résiste doit être **cité et rattaché au verdict** — pourquoi il suffit à acquitter, ou pourquoi il n'y suffit pas. La clause participe alors à la décision au lieu de la décorer.

### C0 — la justesse des ancres, contrôlée par le code

Le corridor mesurait la diversité, pas la justesse. Cinq hallucinations différentes le satisfaisaient parfaitement. Le contrôle manquant est mécanique et coûte quinze lignes de code : **chaque ancre doit figurer littéralement dans la découpe que l'agent a reçue.** Une ancre absente invalide l'avis ; deux invalident le run.

C'est le meilleur rapport valeur/coût de toute la revue.

### L'arbitre était condamné à halluciner

Il ne reçoit que les cinq avis, et devait pourtant remplir l'en-tête, contrôler les sections absentes, vérifier la couverture des six critères et la validité des citations. Il n'avait aucune de ces informations.

Séparation acceptée : **le code établit les faits, le sixième appel fait le travail sémantique.** Détail dans le fichier 01. Effet de bord bienvenu : l'appel d'arbitrage devient plus court, donc plus rapide.

### La matrice contredisait les personas — notre erreur

A4 devait compter les compétences techniques manquantes sans recevoir la section équipe, et le gabarit lui faisait valoriser un produit « en conditions réelles » alors que les preuves terrain ne lui étaient pas transmises. La matrice est désormais **la source de vérité unique**, et les personas sont relus contre elle, ligne par ligne.

Deux corrections :

- Les compétences techniques quittent la section « Le porteur et l'équipe » pour la section « Avancement et moyens techniques ». A1 reste seul à juger l'équipe, ce qui était l'intention.
- **A4 reçoit la section « Preuves terrain ».** SOL le présente comme une correction ; c'est mieux que ça — c'est la contradiction qu'on cherche. Le même fait, trois pilotes gratuits qui tournent depuis quatorze mois, donne BLOQUANT chez l'Acheteur (personne ne paie) et NON BLOQUANT chez le Constructeur (ça tourne en conditions réelles). Deux postures, une ancre, deux verdicts. C'est le phénomène central du projet, et il fallait le câbler.

Et la phrase « d'autres couvrent le reste » disparaît du bloc de contraintes : elle brise l'étanchéité qu'elle est censée servir.

### La minute est trop dense

Une page de rapport dans une demi-largeur de vidéoprojecteur est illisible. Pendant la minute : à gauche le début de la réponse naïve, à droite le bandeau et trois éléments, puis la chute. Aucun défilement. Le rapport complet et les avis bruts vivent dans des tiroirs, pour les questions.

### Option d, et le reste des réponses techniques

Direct en local, GitHub Pages en vitrine, rejeu public — **deux adaptateurs vers le même objet `run`**, pas deux produits. C'est cette formulation qui lève notre objection. Clé en variable d'environnement, badge visible, timebox dur de 90 minutes.

Acceptés sans réserve : JSON Schema strict avec rendu déterministe en bloc lisible · neuf champs communs et non huit (notre erreur de comptage) · sept appels et non six, neuf avec les ablations · un seul modèle pour tous les appels · figer les schémas avant de construire le rejeu · les deux portes à 14h et 16h, plus exigeantes que la nôtre · sa structure de dépôt, qui sépare la publication des runs bruts.

**Sur le choix du modèle** : c'est son domaine, on prend. Les identifiants et snapshots qu'il cite, nous ne les avons pas vérifiés — ils vont dans le manifeste du run, et ils ne sont pas cités dans le pitch tant qu'on ne les a pas confirmés. Règle maison, elle vaut aussi ici.

Il a également raison sur un point qu'on avait mal formulé : température identique signifie **variables contrôlées**, pas résultats reproductibles. Ça renforce le rejeu, ça ne le remplace pas.

### La phrase sur la liquidation

Notre chute était méthodologiquement attaquable : le dossier est synthétique, choisi à partir de son issue, puis utilisé pour régler le dispositif. Version de SOL corrigée pour garder la force sans l'angle d'attaque :

> Ce dossier est fictif, et son scénario se termine par une liquidation. Nous l'avons choisi pour ça. Ce que vous venez de voir n'est pas une prédiction : c'est que le dispositif remonte, dès l'entrée, le fait précis autour duquel le scénario s'effondre. La prédiction, ce serait la rétrospective sur des dossiers réels dont l'issue est connue. Nous ne l'avons pas, et c'est la suite.

**Révisée une seconde fois, après la décision d'écrire les fixtures de zéro.** La version ci-dessus supposait encore un cas trouvé dans la sandbox. Si nous l'écrivons nous-mêmes, la liquidation n'est plus une vérité terrain indépendante : c'est une issue attachée à un scénario que nous avons inventé. « Ce dossier a été clos par liquidation » laisserait raisonnablement croire à un cas réel — exactement ce que la provenance exclut.

**Troisième et dernière révision.** « La faiblesse était connue de nous, elle ne l'était pas du dispositif » ne tient pas non plus. La discipline de provenance protège **un seul sens** : le gardien écrit avant de lire les personas, donc la fixture n'est pas taillée sur les prompts. Elle n'empêche pas l'inverse — `D01` est un cas de **calibration**, et l'équipe corrige les prompts sur ses résultats mercredi. Les prompts peuvent donc être taillés sur la fixture.

> Ce cas est fictif et **a servi à calibrer le dispositif**. Nous y avons placé une faiblesse fatale, sans fournir son libellé ni son issue dans les requêtes. Dans ce run enregistré, la **baseline au prompt neutre** ne l'a pas signalée ; Le Contradicteur en a fait son premier point de rupture. Ce n'est ni une prédiction ni une preuve de généralisation : c'est un test contrôlé de construction. **La généralisation est testée séparément, sur le holdout gelé.**

Moins théâtral, expérimentalement propre. Deux notes de vocabulaire qui vont avec : on dit **baseline au prompt neutre**, jamais « modèle non contraint » — tout modèle est contraint d'une manière ou d'une autre. Et on ne dit nulle part « le dispositif a vu ce que le comité n'avait pas vu » : aucun comité réel n'a instruit ces cas.

**Ce que le holdout démontre, exactement.** Une correction de plus, et elle porte sur la phrase que nous venions d'écrire : « la généralisation est testée sur le holdout » est faux. `D02` est un cas synthétique unique ; C3b n'y est pas évalué ; son critère principal accepte tout k entre 1 et 4, c'est-à-dire à peu près toute non-unanimité ; et il ne teste ni la supériorité sur la baseline, ni la détection d'une faiblesse fatale inconnue.

> Un premier comportement hors calibration est observé sur un holdout synthétique unique. Il teste la **stabilité** du dispositif, pas sa généralisation.

Ce que `D02` vaut réellement est procédural, et c'est déjà beaucoup : **c'est la preuve que nous n'avons pas corrigé après observation.** S'il tient, c'est notre meilleure réponse en questions-réponses. S'il ne tient pas, le montrer est notre meilleure preuve d'honnêteté. Dans les deux cas il se montre — mais ce ne sont pas la même affirmation, et il faut savoir laquelle on fait.

**Deux observations gratuites à relever sur `D02`**, sans en faire des critères — la baseline B0 tourne de toute façon dans chaque run produit, donc la comparaison ne coûte que le temps de lecture : la présence ou non d'une contradiction interprétative, et la préférence du relecteur entre la sortie de la baseline et celle du Contradicteur. Observé, consigné, non exigé. Ajouter des critères au holdout après coup serait exactement ce qu'on s'interdit.

---

## 2. Ce qu'on accepte en réduisant le format

### Les deux ablations — le point le plus important de la revue

Il a raison sur le fond, et c'est le seul endroit où la thèse du projet était non testée. Comparer un prompt naïf à six appels métier démontre surtout la valeur d'instructions détaillées et d'un budget de calcul supérieur. Ça ne démontre ni la complaisance par construction, ni l'utilité de l'étanchéité.

Trois bras, désormais nommés :

| | Ce que c'est | Ce que ça teste |
|---|---|---|
| **B0** | Un appel, prompt d'une phrase. C'est la colonne de gauche. | Ce qu'un porteur obtient seul aujourd'hui |
| **B1** | Un appel, prompt structuré demandant une instruction critique complète | « Les bonnes instructions suffisent-elles ? » |
| **B2** | Un appel contenant les cinq personas dans un contexte partagé | « L'étanchéité change-t-elle quelque chose ? » |

B2 est la décision d'architecture du premier jour, exécutée. On avait écarté l'orchestrateur unique par raisonnement ; on va le mesurer.

**Réduction du format** : lecture aveugle sur **un seul dossier**, trois sorties, par **un SUM d'une autre équipe**, mercredi soir. Vingt minutes de son temps. Neuf sorties lues par plusieurs personnes ne tiennent pas dans le sprint.

**Et la thèse de repli, écrite maintenant, avant de connaître le résultat** — même discipline que le seuil :

> Si le Contradicteur ne se distingue pas de B1 ou de B2 à la lecture à sources masquées, la thèse cesse d'être « l'isolation change le jugement » et devient : **sur tout run valide, chacun des six critères reçoit un statut de couverture explicite, et chaque reproche est rattaché à une citation vérifiée.** C'est ce que le dispositif peut garantir. Il ne peut pas garantir une instruction suffisante quand le deck est pauvre — c'est précisément ce que la dimension INSTRUCTION rend visible au lieu de le masquer. Moins spectaculaire, vrai, et utile.

Une thèse de repli écrite après le résultat n'est pas une thèse, c'est une excuse.

### Le corpus des substituts

Il a raison : énumérer dix numéros prouve qu'un modèle sait recopier dix nombres. Deux preuves distinctes, acceptées :

- **corpus injecté** — hash du contenu, calculé et enregistré par l'application, côté code ;
- **corpus traité** — une décision d'un mot par substitut, plus celui qui est retenu.

La seconde coûte des jetons dans chaque appel A3. Format resserré à l'essentiel pour que ça reste marginal.

### Le manifeste de provenance

Cinq sorties différentes ne prouvent pas l'étanchéité. Le manifeste — identifiants de requête, horodatages superposés, sections fournies, hashes de prompts — la prouve. Accepté, et **ce n'est pas qu'un contrôle : c'est une pièce de démonstration.** Quand on nous demandera si les cinq agents sont vraiment isolés, on ouvre le manifeste plutôt que de répondre sur parole.

### Le holdout et le versionnement du seuil

Le dossier moyen devient un **holdout** : jamais utilisé pour corriger les prompts. La calibration se fait sur la liquidation et le solide ; le moyen est l'épreuve honnête. Le seuil est **versionné** — V1 figée, une V2 se crée avant une nouvelle série, jamais de modification silencieuse après observation.

Le passage dynamique à quatre agents sort du sprint : il invaliderait tous les calculs à cinq. Bien vu.

---

## 3. Où on ne le suit pas

### Il ajoute plus que ce qui tient dans dix heures

Chaque ajout est justifié isolément. Ensemble, avec un seul pilote, ça déborde. Trier est notre travail, pas le sien. Ordre de sacrifice, décidé maintenant et à froid :

| Rang | Élément | Sort |
|---|---|---|
| 1 | Schéma branché par verdict, conditions d'acquittement | **Indispensable** — sans ça le dispositif ne discrimine pas |
| 2 | C0, vérification des ancres par le code | **Indispensable** — sans ça rien n'est fiable |
| 3 | Arbitre séparé code / sémantique | **Indispensable** |
| 4 | Matrice réconciliée, A4 reçoit les preuves terrain | **Indispensable** — c'est la contradiction interprétative |
| 5 | Densité de la minute | **Indispensable**, et gratuit |
| 6 | B1 et B2, lecture aveugle sur un dossier | **Haute** — c'est ce qui rend la thèse testable |
| 7 | Manifeste de provenance | **Haute**, coût faible : on journalise ce qu'on a déjà |
| 8 | Holdout et versionnement | **Haute**, coût nul, discipline pure |
| 9 | Décisions structurées sur le corpus | Moyenne — dégradable en `CORPUS : retenu n°X` si les jetons coûtent |
| 10 | Contrôle d'éligibilité Grand Est | Basse, cinq minutes de code, on le garde |

Ce qui saute en premier si le mercredi dérape : le rang 9, puis le rang 10. **Jamais les rangs 1 à 5.**

### B2 mérite d'être montrable, pas seulement exécuté hors écran

Il propose de faire tourner les ablations hors interface. Pour B1, d'accord. Pour B2, non : c'est un indice qualitatif montrable sur la seule décision qui porte toute l'architecture. Si un juré demande « pourquoi cinq appels plutôt qu'un prompt qui contient les cinq rôles », on ouvre un tiroir et il voit la différence en trois secondes. C'est le même moteur de rendu et un fichier JSON de plus — le coût est proche de zéro et la valeur en questions-réponses est élevée.

### La validation par un SUM extérieur est un acte social, et il n'est pas chiffré

Il la classe parmi ce qu'il ne coupe pas, à raison. Mais emprunter vingt minutes à quelqu'un d'une autre équipe un mercredi soir de hackathon, ça se **demande au déjeuner**, pas à 21 heures. Non demandé à l'avance, ça ne se produit pas — et c'est exactement le genre d'élément qui disparaît sans que personne ne décide de le supprimer.

Passe au plan avec un titulaire et une heure de sollicitation : **un des deux contradicteurs, mercredi 13h**.

### « Aucune prétention à prédire » va un cran trop loin

D'accord sur la survie et sur la décision du comité — on ne prédit ni l'une ni l'autre, et sa phrase permanente est adoptée. Mais le dispositif **produit bien un verdict d'instruction**. La formulation juste n'est pas « il ne prédit rien », c'est « il n'a pas d'autorité » : il instruit, le SUM décide. On garde notre ligne, on ajoute la sienne.

---

## 4. Ce qui change dans les fichiers

| Fichier | Ce qui bouge |
|---|---|
| `01` | Schéma branché par verdict · contre-preuve à la place de la clause de résistance · `BLOQUANT SSI` / `ACQUITTÉ SI` pour les cinq personas · définition de BLOQUANT · arbitre scindé code / sémantique · suppression de « d'autres couvrent le reste » · corpus A3 en décisions courtes |
| `03` | Option d et les deux adaptateurs · structure de dépôt de SOL · JSON Schema strict · sept à neuf appels · ordre de construction et portes 14h / 16h · matrice corrigée, A4 reçoit les preuves terrain · densité de la minute · contrôles mécaniques côté code · manifeste |
| `04` | V1 figée le 20/08 · C0 justesse des ancres · dossier solide à k = 0 · C3 scindé en convergence de fait et **contradiction interprétative** · holdout · règle de versionnement |
| `05` | Portes 14h / 16h · demande du relecteur extérieur mercredi 13h · les trois bras d'ablation · timebox de 90 minutes sur le direct |

Le fichier `04` est amendé **avant toute exécution** : aucune observation n'a encore eu lieu, l'amendement est donc légitime. À partir de la première passe, la règle de versionnement s'applique.

---

# Second tour — 20 août, même journée

Quatre défauts de protocole relevés, tous réels, tous acceptés. Plus une faille qu'aucun des deux n'avait vue et que la correction du premier point a fait apparaître.

## Acceptés sans réserve

**C0 autorisait un comité amputé.** La règle écartait un avis à la première ancre invalide et n'invalidait le run qu'à la deuxième — le tableau acceptait explicitement quatre ancres sur cinq. Elle contredisait la règle de complétude de l'arbitre, et surtout elle ouvrait un biais : **l'avis écarté est plus souvent celui qui est allé le plus loin.** Un dispositif qui perd silencieusement l'avis gênant est pire qu'un dispositif complaisant. Désormais : une reprise maximum, puis `NON INSTRUIT` ; les critères ne se calculent qu'à 5/5.

Ajouté de notre côté : la reprise est déclenchée **par le contrôle mécanique et jamais par quelqu'un qui a lu le verdict**, et le nombre de reprises va au manifeste. Sinon on a déplacé l'amputation d'un cran.

**C0 ne mesure pas la justesse.** Renommé « ancrage littéral ». Une citation exacte peut soutenir une inférence fausse, et aucune ligne de code ne le verra. La justesse sémantique reste au relecteur humain, et c'est une limite à dire au jury.

**Le holdout fuyait avant le gel.** Le planning révélait le troisième dossier mercredi 16h15 puis laissait corriger à 17h20. Écrire « on ne corrige pas cette colonne » ne supprime pas la contamination cognitive : ce n'était pas un holdout, c'était un troisième cas observé. Protocole corrigé — deux dossiers mercredi, **gel et hash horodaté jeudi 10h15**, run unique du holdout à 10h30, plus aucune correction ensuite.

Ajouté : **la phrase à dire si le holdout échoue est écrite maintenant.** À 10h45 sous pression, quelqu'un improvisera une rationalisation ; autant l'écrire à froid. Même discipline que la thèse de repli.

**C3b était écrit dans la réponse attendue.** Notre faute, et la plus gênante des quatre : le prompt de A4 lui indiquait quel verdict rendre sur les preuves terrain, et quel verdict l'Acheteur rendrait sur les mêmes. C3b ne mesurait plus l'émergence d'une contradiction mais l'obéissance à un corrigé livré avec la consigne. L'exemple sort des prompts exécutables et devient une note de conception non injectée.

Cette faute se généralise en règle permanente, ajoutée au `AGENTS.md` du canal : **rien dans un prompt exécutable ne décrit le résultat attendu d'une mesure.** On câble l'occasion de se contredire, jamais la contradiction.

**B2 doit être à armes égales.** « Un appel contenant cinq personas » est sous-spécifié et devient un homme de paille. Une seule différence autorisée : une requête partagée contre cinq requêtes étanches. Mêmes instructions mot pour mot, mêmes découpes présentées en blocs étiquetés, même schéma, même budget, même arbitrage, même rendu. Figé avant exécution. Et la portée se dit : un dossier, un relecteur, c'est un indice qualitatif montrable, pas une preuve générale.

**Les trois corrections éditoriales** sont faites : le passage à quatre agents ne subsiste plus comme remède · le remède C3a nomme l'Acheteur et le Constructeur · le panneau des avis bruts montre que les sorties diffèrent, il **ne prouve pas l'isolation** — seul le manifeste la prouve, et confondre les deux serait offrir l'objection. Le décompte est désormais « sept appels par run produit, plus deux runs expérimentaux B1 et B2 ».

**Identifiants opaques** : `D01`, `D02`, `D03`. Les étiquettes vivent dans un fichier d'évaluation jamais transmis au modèle. Un dossier dont le nom annonce l'issue n'est plus un test.

## La faille qu'aucun des deux n'avait vue

En resserrant C0, l'échappatoire saute aux yeux : le champ ANCRE autorise `ABSENCE : <ce qui manque>` quand l'agent s'appuie sur ce qui n'est pas au dossier. **Il n'y a alors rien à retrouver dans le texte, donc l'ancre passe toujours.** Un agent peut contourner C0 intégralement en invoquant systématiquement une absence — et c'est même le chemin de moindre résistance quand sa découpe est maigre.

Correctif : une ancre `ABSENCE` doit nommer une des dix sections, et le code vérifie que cette section portait bien le marqueur `[SECTION ABSENTE DU DOSSIER]` dans la découpe reçue **par cet agent**. Section présente et non vide → absence fausse → C0 échoue. Le nombre d'ancres `ABSENCE` par run va au manifeste : cinq absences sur cinq agents veut dire que le dossier est vide, pas que le dispositif a bien travaillé.

## État

Revue d'architecture fermée. Les fichiers `01` à `05` sont à jour et peuvent partir dans `/spec`. Ordre des prochaines actions confirmé : structure sandbox, choix des trois dossiers sous identifiants opaques, attribution des quatre rôles, puis question écrite aux organisateurs sur la normalisation préalable.

---

# Troisième tour — 20 août

Un seul point de fond, et il est juste : le correctif du deuxième tour ne couvrait que l'absence d'une **section entière**.

## Les absences internes — accepté

Une section peut être renseignée et omettre la preuve décisive. « Preuves terrain » cite trois pilotes sans dire s'ils paient ; « Avancement » décrit le POC sans nommer les dépendances ; « Modèle économique » contient un prévisionnel sans coût d'acquisition. **Or plusieurs conditions `BLOQUANT SSI` reposent exactement sur ces omissions-là.** L'agent placé devant ce cas n'avait que deux issues : renoncer au blocage qu'il devait prononcer, ou citer une phrase voisine qui ne prouve rien.

Solution retenue, la sienne : **la correction est dans la donnée, pas dans le prompt.** Une liste fermée de quatorze champs, dérivés des cinq conditions et du contrôle déterministe, chacun portant soit une valeur, soit littéralement `[NON RENSEIGNÉ DANS LE DOSSIER]`. Détail complet dans `08-fiche-de-faits.md`.

C'est le troisième mouvement du même type : on a instrumenté la sortie plutôt que de durcir la consigne, puis le contrôle plutôt que le prompt, maintenant l'entrée plutôt que l'agent. À chaque fois, la version qui tient est celle qui déplace le problème hors du texte de l'instruction.

**Effet de bord bienvenu** : l'exception sémantique `ABSENCE` disparaît. Toute ancre redevient une chaîne littéralement présente dans l'entrée, marqueurs compris. C0 redevient une recherche de sous-chaîne sans cas particulier. Le contrôle se simplifie en devenant plus strict — c'est rare, on le prend.

**`ABSENT DU DOSSIER` devient vérifiable**, et la section 4 du rapport se scinde : *manquant, vérifié* d'un côté, *supposé manquant* reversé en questions de l'autre. C'est la seule partie transmissible à un porteur ; envoyer « il vous manque X » quand X est au dossier détruit la crédibilité d'un accompagnement.

## Ce qu'on ajoute et qu'il ne dit pas

**Les champs sont distribués dans les sections, jamais regroupés en tête.** Un bloc « fiche de faits » unique donnerait les quatorze champs à tous les agents et supprimerait l'asymétrie d'entrée — le deuxième levier de divergence, et le seul qu'on puisse encore renforcer si le premier contrôle déçoit. La correction aurait coûté l'architecture. Chaque champ va dans la section qui l'accueille et suit la matrice ; vérification faite champ par champ.

**La normalisation ne juge pas.** Si le dossier cite trois pilotes sans dire s'ils paient, le champ est `[NON RENSEIGNÉ DANS LE DOSSIER]`, pas « zéro euro ». Constater un silence et conclure à un zéro sont deux opérations distinctes, et la seconde appartient aux agents. Sans cette règle, le gardien pré-instruit le dossier en le normalisant.

**Le coût change un arbitrage.** Environ quatre heures de préparation — 3 h 15 de normalisation, 45 minutes pour arrêter le schéma. Prises sur dix heures de construction, c'est 40 % du budget et le sprint ne finit pas. **La question aux organisateurs cesse d'être un confort et devient bloquante.** À poser par écrit avant le 31 août.

**Et une affirmation à rétrécir devant le jury.** Un dossier réel ne comporte pas de ligne « Euros encaissés : [NON RENSEIGNÉ] ». En normalisant, on livre aux agents une structure pré-digérée qu'aucune candidature ne présente spontanément : la performance démontrée est celle du dispositif *sur une entrée propre*. L'extraction automatique qui produirait cette fiche depuis un dossier brut — et qui devrait distinguer « le dossier n'en parle pas » de « je ne l'ai pas trouvé » — est probablement plus difficile que tout ce qu'on a construit ici. C'est le chantier de la version production, à dire avant qu'on ne le demande.

## Les deux nettoyages

Faits. La phrase résiduelle « deux ancres invalident le run » est corrigée : une ancre invalide après reprise suffit, et les critères ne se calculent qu'à 5/5.

Le second est plus qu'un nettoyage : **le gardien est seul à voir et normaliser le holdout `D02`, et il est exclu de l'écriture comme de la correction des prompts.** Sans cette séparation, le gel du jeudi empêche la correction après résultat mais pas l'adaptation préalable à un dossier que toute l'équipe a déjà lu. C'est passé dans la définition du rôle, pas seulement dans le planning.

## État

Trois tours de revue, huit corrections de fond, aucune trouvée par une seule des trois IA. Les specs `01` à `05` plus `08` sont à jour. La promotion dans `/spec` est conditionnée à une seule chose qui reste à faire par un humain : ouvrir un dossier sandbox et arrêter le schéma normalisé.


---

# Ce que le run à blanc établit — et ce qu'il n'établit pas

*Ajouté le 20/08 après une sixième inflation de modalité, commise en conversation dans le paragraphe même qui célébrait d'avoir appris à les éviter.*

La formule employée était : « le run à blanc a démontré la prémisse du projet sur le projet lui-même — c'est notre première preuve ». Elle ne tient pas, et la démonstration de pourquoi est instructive.

**Ce run ne reproduit pas l'architecture du Contradicteur.** Pas cinq évaluateurs isolés, mais des échanges séquentiels à contexte partagé. Plusieurs modèles, plusieurs rôles, aucune baseline contrôlée — nous n'avons jamais fait tourner « une seule IA écrit ces specs » comme témoin. Et la correction n'a pas été symétrique : sur l'inflation de modalité précisément, c'est cinq sur cinq relevées par le relecteur extérieur, zéro par leur auteur.

*Nuance qui reste vraie* : sur les erreurs de fait et de raisonnement, les corrections ont circulé dans les deux sens — l'arithmétique en k(5−k) de Goodweek, l'audit du starterpack de SOL sur deux volets qui n'existent pas. C'est l'inflation de modalité, et elle seule, qui est allée dans un seul sens. Observation sur un run, pas loi générale.

**La formulation exacte, et elle reste une bonne anecdote de pitch :**

> Avant même d'avoir écrit une ligne de code, la revue croisée a corrigé cinq suraffirmations que leur auteur n'avait pas détectées. Ce n'est pas une validation du produit. C'est une illustration concrète de la règle qui fonde le projet : aucun producteur ne valide seul sa propre sortie.

Elle est plus forte ainsi, précisément parce qu'elle ne se présente pas comme une preuve.
