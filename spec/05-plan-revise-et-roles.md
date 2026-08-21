# Plan révisé des dix heures, et qui fait quoi

*20 août 2026 · sortie du run à blanc · remplace le plan de la note de soumission*

Le plan d'origine ouvrait le mercredi par deux heures d'écriture des personas. Ce travail est fait. Ce fichier dit ce que ça change.

---

## Les rôles — à attribuer avant le 9 septembre, pas le matin même

Cinq personnes, quatre rôles. La règle qui les tient : **celui qui construit ne contrôle pas, celui qui contrôle ne construit pas.**

| Rôle | Ce qu'il fait | Combien |
|---|---|---|
| **Le pilote** | Seul aux commandes de SOL 4.6 et du démonstrateur. Un seul, sinon on se marche dessus et on perd une heure à résoudre des conflits. | 1 |
| **Le relecteur** | Fait le contrôle des quatre critères mercredi 16h30, seul, sans discussion préalable. **Pitche jeudi.** | 1 |
| **Le gardien des dossiers** | Normalise les trois dossiers et la fiche de faits, tient la matrice de découpe, vérifie les marqueurs. **Seul à voir `D02`, le holdout — il ne le partage pas et n'écrit ni ne corrige aucun prompt.** | 1 |
| **Les contradicteurs** | Écrivent et corrigent les prompts des cinq personas. Vont faire lire la sortie à une autre équipe mercredi soir. | 2 |

**Pourquoi le relecteur pitche.** Il passera quarante-cinq minutes dans les avis bruts, c'est-à-dire exactement dans la matière qu'il devra défendre pendant cinq minutes de questions-réponses. C'est le meilleur temps de préparation au pitch du sprint, et il est déjà budgété. Personne d'autre n'aura lu le dispositif d'aussi près.

**Deux contraintes de séparation, et la seconde est ce qui fait tenir le holdout.**

Le relecteur n'est pas un des deux contradicteurs : on ne relit pas sa propre copie.

Le **gardien est le seul à connaître `D02`**, et il est exclu de l'écriture comme de la correction des prompts. Sans cette règle, le gel du jeudi empêche la correction *après* résultat mais pas l'adaptation *préalable* à un dossier que tout le monde a déjà lu — et le holdout n'est plus un holdout, juste un troisième cas dont on a anticipé le contenu.

---

## Ce qui est déjà fait, et ce qui reste à faire avant le 9

**Fait** — les cinq personas, l'Action d'arbitrage, le format de sortie, le seuil de divergence daté, le brief de construction, le schéma d'entrée et la matrice de découpe.

**À faire avant, dans cet ordre — et l'ordre compte :**

1. Ouvrir un dossier de la sandbox et regarder sa structure réelle.
2. **Figer le schéma normalisé et la fiche de faits** (`08`). Avant le choix des dossiers : sinon on taille le schéma sur les trois qu'on a sous la main, et il ne mesure plus rien.
3. Choisir les trois dossiers, sous identifiants opaques **D01, D02, D03**. `D01` et `D03` sont les cas de calibration, `D02` est le holdout. Les étiquettes — solide, moyen, liquidation — vivent dans un fichier d'évaluation jamais transmis au modèle. **Le dossier solide est le plus important des trois** et le premier qu'on aura envie de sacrifier.
4. Attribuer les quatre rôles, et acter que le gardien sera seul à connaître le holdout.
5. **Question écrite aux organisateurs** : la normalisation d'un jeu de test peut-elle se faire avant le 9 septembre ? Environ quatre heures de préparation sont en jeu — 40 % du budget de construction si la réponse est non.
6. Passer les specs à SOL 4.6 et faire un premier essai à froid.

---

## La question à trancher, et elle n'est pas technique

La normalisation des trois dossiers — deux heures trente — **peut se faire avant le 9 septembre.** C'est de la préparation de jeu de test, pas de la construction. La faire en amont rend un quart du budget de construction.

Ce n'est pas à moi de dire si c'est dans l'esprit du hackathon. Deux remarques :

- Le run à blanc en cours est déjà du travail préparatoire d'ampleur, et il a été validé comme tel. La frontière entre « préparer son idée » et « commencer à construire » n'est écrite nulle part dans le règlement à ma connaissance.
- Si on le fait, **on le dit** — dans le pitch, en une phrase : voilà ce qui était prêt en arrivant, voilà ce qu'on a construit sur place. La transparence transforme une zone grise en argument de crédibilité, et l'inverse est vrai. Un jury qui découvre l'avance après coup ne retient plus que ça.

Un mot aux organisateurs lève l'ambiguïté en deux minutes. À faire avant le 31 août, pas le 9 septembre.

---

## Le mercredi

| Créneau | Quoi | Qui |
|---|---|---|
| **11h30 – 12h00** | Ouverture. Attribution confirmée des rôles. Lecture à voix haute du seuil V1 — il ne se rediscute pas après. Le chiffre de dix heures, dit une fois pour toutes. | tous |
| **12h00 – 14h00** | Le pilote fige **les schémas JSON**, monte une fixture affichable, puis un appel direct enregistré. Le gardien normalise les dossiers, ou les vérifie s'ils l'ont été en amont. | pilote / gardien |
| **13h00** | **Aller demander un relecteur extérieur pour ce soir.** Une personne d'une autre équipe, vingt minutes, lecture aveugle de trois sorties. Ça se demande au déjeuner : à 21h, ça ne se produit plus. | un contradicteur |
| **14h00** | **Porte 1 — cinq avis structurés valides et enregistrables.** | |
| **14h00 – 16h00** | Les cinq appels parallèles, les validations mécaniques, l'arbitrage, un rapport complet, puis le rejeu du même run réseau coupé. | pilote + contradicteurs |
| **16h00** | **Porte 2 — cycle complet enregistré puis rejoué.** Si elle n'est pas franchie, on ne contrôle rien ce soir et jeudi matin sert à construire au lieu de stabiliser. | |
| **16h00 – 16h15** | Runs sur **les deux dossiers de calibration seulement**, plus B1 et B2 sur celui de la lecture aveugle. Le holdout n'est ni exécuté, ni ouvert, ni regardé — il passe jeudi après gel. | pilote |
| **16h15 – 17h00** | Contrôle C0 à C4 sur les ancres, deux colonnes. Seul, sans discussion. | **relecteur** |
| **17h00 – 17h20** | Lecture du tableau à l'équipe. Correction dans l'ordre du tableau des remèdes du fichier 04. | tous |
| **17h20 – 18h00** | Correction. Asymétrie d'entrée avant les prompts. | contradicteurs + pilote |
| **Soirée** | **Lecture aveugle** : trois sorties non identifiées — Contradicteur, B1, B2 — soumises au relecteur extérieur. « Laquelle prépare le mieux un entretien avec ce porteur ? » | un contradicteur |

**Le point de non-retour est 16h00**, et c'est désormais une porte plus exigeante qu'avant : pas « les cinq appels tournent », mais « un cycle complet est enregistré et rejoué ».

**Le timebox du direct est de 90 minutes**, pris à l'intérieur du créneau 14h-16h. Dépassé, le runner continue de produire les JSON et le bouton « direct » disparaît de l'écran. Ce n'est pas un échec : le pitch utilise le rejeu de toute façon.

---

## Le jeudi

| Créneau | Quoi |
|---|---|
| **9h00 – 10h00** | Dernières corrections sur les **deux dossiers de calibration**, fiabilisation, rendu. Second contrôle des critères sur ces deux-là. |
| **10h00 – 10h15** | Dernier arbitrage : ce qu'on corrige encore, ce qu'on laisse. Après, plus rien ne bouge. |
| **10h15** | **Gel technique et empreinte.** Hash horodaté des prompts, de la matrice, des schémas, du corpus et de l'identifiant de modèle, poussé sur le dépôt. Une heure quarante-cinq avant le gel officiel, et c'est délibéré. |
| **10h30 – 10h45** | **Un run unique du holdout.** Première fois qu'on l'ouvre. Aucune correction ensuite, quel que soit le résultat — la phrase à dire en cas d'échec est déjà écrite dans le fichier 04. |
| **10h45 – 11h00** | Lecture du holdout, remplissage de la troisième colonne, rédaction du constat. |
| **11h00 – 11h30** | **Enregistrement du run de démonstration**, prompts gelés. Testé réseau coupé, sans CDN ni police distante. |
| **11h30 – 12h00** | Choix du cas, mise au point de l'avant/après, première répétition chronomètre en main. |
| **12h00** | **Gel officiel.** |
| **13h00 – 15h00** | Pitch : construction des cinq minutes, préparation des questions-réponses, répétitions. |

**La règle du jeudi matin** : aucun nouveau chantier. On corrige, on gèle, on regarde le holdout, on enregistre. Une équipe qui code encore à 11h45 n'aura pas répété, et le format 5 + 1 + 5 ne pardonne pas l'improvisation.

**Le gel à 10h15 est un engagement, pas une formalité.** Si le holdout tombe mal à 10h45, on ne corrige pas. C'est le prix de pouvoir dire que le troisième dossier n'a pas servi à se donner raison — et c'est ce qui distingue une calibration d'un ajustement.

---

## Ce qui reste hors périmètre de ce fichier

La construction du pitch lui-même — cinq minutes, une minute de démonstration, cinq minutes de questions. C'est le travail du jeudi après-midi et il mérite son propre passage. Deux éléments sont déjà acquis et à ne pas perdre d'ici là : la chute (*ce dossier, dans la sandbox, a été clos par liquidation*) et l'aveu à faire avant qu'on ne le demande (*les données de calibration sont synthétiques ; trois dossiers sont un test de fumée, pas une calibration*).
