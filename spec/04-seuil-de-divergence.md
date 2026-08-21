# Seuil de divergence — critère de réussite du dispositif

> **V1 — figée le 20 août 2026, avant toute exécution.**
> Amendée le 20/08 après revue technique, avant que le dispositif n'ait produit la moindre sortie : aucune observation n'existe encore, l'amendement est donc légitime.
> **À partir de la première passe, cette version ne bouge plus.** Une V2 se crée avant une nouvelle série, elle ne remplace pas la V1 : les deux restent lisibles côte à côte.

---

## Pourquoi ce fichier existe séparément

Toute sa valeur tient à sa date. Un critère de réussite écrit après avoir vu les résultats n'est pas un critère, c'est une justification — et c'est exactement le reproche que le Contradicteur adresse aux porteurs qui déplacent leurs hypothèses en cours de route. On s'applique la règle.

## Les trois dossiers n'ont pas le même statut

Le dossier moyen est un **holdout**. Sans holdout, on ajuste jusqu'à ce que les trois passent, et on ne mesure plus rien d'autre que notre capacité à ajuster.

**Identifiants opaques.** Les trois dossiers s'appellent `D01`, `D02`, `D03`. Les étiquettes — solide, moyen, liquidation — vivent dans un fichier d'évaluation **jamais transmis au modèle** et jamais présent dans un prompt. Un dossier dont le nom annonce l'issue n'est plus un test.

| Dossier | Statut | Ce qu'on a le droit d'en faire |
|---|---|---|
| calibration | mercredi | corriger les prompts à partir de ses résultats |
| calibration | mercredi | idem |
| **holdout** | **jeudi, après gel** | **un run unique, aucune correction ensuite, quel que soit le résultat.** Il teste la **stabilité** hors calibration — pas la généralisation : un cas synthétique unique, C3b non évalué, critère principal peu exigeant. Sa valeur est procédurale, et elle se décompose en deux affirmations de force inégale : les **empreintes établissent** que le run a utilisé les artefacts gelés ; l'**absence d'ouverture préalable repose sur la séparation des rôles et l'attestation du gardien** — auditable, pas prouvée mécaniquement. |

### Le protocole de gel — corrigé, parce que le holdout fuyait

Le planning initial exécutait les trois dossiers ensemble mercredi 16h15, révélait le holdout au relecteur, puis laissait l'équipe corriger les prompts quarante minutes plus tard. Écrire « on ne corrige pas cette colonne » ne supprime pas la contamination : une fois qu'on a vu le holdout échouer, toute correction ultérieure est influencée. Ce n'était pas un holdout, c'était un troisième cas observé.

1. **Mercredi** — les deux dossiers de calibration uniquement. Le holdout n'est pas exécuté, pas ouvert, pas regardé.
2. **Mercredi soir et jeudi matin** — corrections, sur ces deux cas seulement.
3. **Jeudi 10h15 — gel et empreinte.** Hash horodaté des prompts, de la matrice de découpe, des schémas, du corpus des substituts, de l'identifiant de modèle **et des trois fixtures**. Poussé sur le dépôt avant l'étape suivante. Une fixture modifiée après la première exécution ouvre une nouvelle série de mesures — même règle que le versionnement du seuil, et pour la même raison : on protège contre l'ajustement des cas pour produire la contradiction attendue, qui est la dernière porte encore ouverte.
4. **Jeudi 10h30 — un run unique du holdout.**
5. **Aucune correction après**, quel que soit le résultat.

**Un commit Git n'est pas un horodatage tiers** — sa date vient du poste de l'auteur, la plateforme ne l'atteste pas. Correction apportée en revue, après que nous ayons commis l'erreur dans la phrase même qui prétendait calibrer une affirmation.

Le protocole qui produit une trace exploitable, en trois gestes et cinq lignes de configuration :

1. pousser le commit de gel ;
2. déclencher une action d'intégration continue qui affiche l'empreinte du manifeste ;
3. conserver le lien vers cette exécution, **dont l'heure est générée côté plateforme**.

> Le gel est rendu extérieurement observable par un événement horodaté côté plateforme. Ce n'est ni un horodatage qualifié ni une preuve infaillible — c'est une trace d'audit suffisante pour cette expérimentation.

Bonne minute de pitch au passage : *nous avons gelé le dispositif une heure et demie avant le gel officiel, puis nous avons regardé le troisième dossier.*

**La phrase à dire si le holdout échoue — écrite maintenant, avant de le savoir**, pour que personne n'improvise une rationalisation à 10h45 sous pression :

> Le troisième dossier n'a pas été utilisé pour régler le dispositif. Il a été passé après gel, une seule fois, et il n'a pas atteint le seuil. Nous ne savons pas encore si c'est le dossier, les personas ou le seuil qui est en cause — et c'est justement ce qu'on ne peut pas savoir en réglant sur ce qu'on observe.

## C0 — l'ancrage littéral, avant la divergence

Le corridor ci-dessous mesure la diversité. **Cinq hallucinations différentes le satisfont parfaitement.** Ce contrôle passe donc avant tous les autres, et il est mécanique.

**Le nom compte.** Ce contrôle ne mesure pas la justesse — il vérifie qu'une citation existe. Une citation exacte peut soutenir une inférence fausse, et aucune ligne de code ne le verra. La justesse sémantique est du ressort du relecteur humain, et c'est une limite à dire au jury plutôt qu'à laisser deviner.

**Chaque ancre doit figurer littéralement dans la découpe reçue par l'agent qui la cite**, en quinze mots au plus.

### La règle, corrigée — un comité amputé n'est pas un comité

La version initiale écartait un avis à la première ancre invalide et n'invalidait le run qu'à la deuxième. Elle contredisait la règle de complétude de l'arbitre — `NON INSTRUIT si un avis manque` — et elle ouvrait un biais : **l'avis écarté est plus souvent celui qui est allé le plus loin.** Un dispositif qui perd silencieusement l'avis gênant est pire qu'un dispositif complaisant.

- Ancre invalide → **une seule nouvelle tentative**, déclenchée par le contrôle mécanique et jamais par quelqu'un qui a lu le verdict.
- Encore invalide → **run `NON INSTRUIT`**. C1 à C4 ne sont pas calculés.
- **C1 à C4 ne se calculent qu'à 5 ancres valides sur 5.** Pas quatre.

Le nombre de tentatives va au manifeste. Un run qui a eu besoin d'une reprise n'est pas équivalent à un run propre, et une reprise systématique sur le même agent est un diagnostic sur ce persona — découpe trop maigre, ou échappatoire mal comprise.

### La faille de l'échappatoire ABSENCE

Le champ ANCRE autorise `ABSENCE : <ce qui manque>` quand l'agent s'appuie sur ce qui n'est pas au dossier. **Sans contrôle, c'est un contournement complet de C0** : il n'y a rien à retrouver dans le texte, donc l'ancre passe toujours. Un agent peut router autour du contrôle en invoquant systématiquement une absence.

Correctif : une ancre `ABSENCE` doit nommer **une des dix sections**, et le code vérifie que cette section portait bien le marqueur `[SECTION ABSENTE DU DOSSIER]` dans la découpe reçue par cet agent. Si la section était présente et non vide, l'absence est fausse et C0 échoue.

Le nombre d'ancres `ABSENCE` par run va aussi au manifeste : cinq absences sur cinq agents veut dire que le dossier est vide, pas que le dispositif a bien travaillé.

C0 n'est pas négociable et ne se dégrade pas. Un dispositif qui cite des phrases qui n'existent pas n'a aucune valeur, quelle que soit sa divergence.

---

## Correction préalable — la proposition de Goodweek ne tient pas

Goodweek propose : *« au moins 2 paires d'agents avec verdicts opposés sur les trois dossiers de test »*. Avec cinq verdicts binaires, ce n'est pas atteignable comme énoncé.

Si **k** agents sur cinq votent BLOQUANT, le nombre de paires en désaccord vaut k × (5 − k) :

| k (avis bloquants) | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| **paires opposées** | 0 | 4 | 6 | 6 | 4 | 0 |

Le compteur ne passe jamais par 2 : il saute de 0 à 4. « Au moins deux paires » signifie donc exactement « pas d'unanimité » — un seuil bien plus faible qu'il n'en a l'air, et qu'un seul avis dissident suffit à franchir.

Le seuil se pose donc sur **k**, et pas sur le nombre de paires.

---

## Le seuil est un corridor, pas un plancher

Point de fond, et il ferme la boucle avec la décision de conception du matin. On a écarté la partition par critère QFC parce qu'elle produit cinq agents qui se juxtaposent au lieu de se contredire. Une divergence maximale reproduit exactement ce défaut par un autre chemin : cinq agents qui ne parlent jamais du même fait ne se contredisent pas non plus.

**Trop peu de divergence : lissage.** **Trop de divergence : juxtaposition.** Les deux sont des échecs, et le second est le plus difficile à voir parce qu'il ressemble à une réussite.

---

## Les quatre critères

Mesurés sur les trois cas, **qui n'ont pas le même statut** : `D01` et `D03` sont des cas de **calibration**, passés mercredi ; `D02` est le **holdout**, passé une seule fois jeudi après gel. Les critères sont les mêmes, ce qu'on a le droit d'en faire ne l'est pas.

### C1 — Divergence de verdict, orientée

Diverger ne suffit pas, il faut diverger dans le bon sens. C'est la différence entre un dispositif qui bruite et un dispositif qui discrimine.

**C1 ne teste pas la même chose sur les trois dossiers**, et c'est délibéré. Sur le dossier solide, ce n'est pas un critère de divergence : c'est un critère de faux positif. On ne demande pas au dispositif de diverger là où il n'y a rien à trouver.

**k se calcule sur le SIGNAL** — le nombre d'avis BLOQUANT sur cinq. L'`INSTRUCTION` est une seconde dimension, et le critère porte désormais sur le couple.

| Dossier | Attendu | Si échec |
|---|---|---|
| Solide | **k = 0 ET ≥ 4 axes en INSTRUCTION SUFFISANTE** | k ≥ 1 : faux positif, un rapport bloquant sur un bon deck. Moins de 4 axes suffisants : le deck n'est pas solide, il est illisible — et on ne le distingue plus d'un deck vide. |
| Liquidation | **k ≥ 2** | Le dispositif n'a pas vu ce autour de quoi le scénario s'effondre. Toute la chute du pitch tombe. |
| Moyen *(holdout)* | **1 ≤ k ≤ 4** | Unanimité dans un sens ou dans l'autre : lissage. Résultat constaté, jamais corrigé. |

**Pourquoi le couple et pas k seul.** Avec le seul SIGNAL, un deck solide et un deck vide donnent tous deux k = 0 : le critère ne discrimine plus rien. C'est l'erreur symétrique de celle qu'on avait corrigée — la première règle empêchait un deck pauvre de bloquer, elle le faisait donc acquitter, ce qui est pire parce que ça flatte.

La seconde dimension nous rend un pouvoir discriminant qu'on n'avait pas, **et un troisième cas de démonstration gratuit** : un deck qui ne bloque nulle part et qu'on ne peut pourtant pas instruire.

```
deck solide : k = 0  ·  4 ou 5 axes SUFFISANTE
deck pauvre : k = 0  ·  0 ou 1 axe SUFFISANTE
```

*Historique : k ≤ 1 au premier tour, k = 0 au deuxième, le couple au troisième.*

### C2 — Divergence de contenu

Le verdict binaire est bon marché : on peut l'obtenir par hasard. Le vrai test est de savoir si les cinq agents regardent des faits différents.

**Attendu : au moins 3 faits distincts parmi les 5 POINT DE RUPTURE, sur chaque dossier.** En dessous, les agents lisent la même chose.

**Le comptage se fait sur les ANCRE, pas sur les points de rupture.** C'est la raison d'être de ce champ : chaque agent produit une citation exacte de quinze mots maximum, et l'arbitre les recopie l'une sous l'autre en section 6 du rapport. Deux agents partagent un fait si leur ancre désigne la même phrase ou la même donnée. La comparaison porte sur cinq lignes courtes alignées, pas sur cinq paragraphes à relire.

Sans cette instrumentation, C2 était un travail de lecture fine de trente à quarante-cinq minutes par dossier — soit deux heures sur les trois, en plein milieu du créneau le plus tendu du mercredi. Avec, c'est de l'ordre de dix minutes par dossier. **Le contrôle reste humain ; c'est la sortie qu'on a rendue mesurable, pas le relecteur qu'on a accéléré.**

### Le protocole de contrôle, mercredi après-midi

Un contrôle qui n'a ni horaire ni titulaire glisse. Celui-ci en a.

| Heure | Quoi | Qui |
|---|---|---|
| 16h15 | Lancer **les deux runs de calibration `D01` et `D03` uniquement**, enregistrer les JSON. Le holdout `D02` n'est ni exécuté, ni ouvert. | celui qui tient le démonstrateur |
| 16h30 → 17h00 | Remplir le tableau des quatre critères, ancre par ancre | **le relecteur**, seul, sans discussion |
| 17h00 → 17h20 | Lecture du tableau à l'équipe. Décision : on corrige quoi, dans l'ordre du tableau des remèdes | l'équipe |
| 17h20 | Correction | tous |

**Le relecteur est un rôle, à attribuer avant mercredi.** Deux critères : ce n'est pas quelqu'un qui construit à ce moment-là, et ce n'est pas quelqu'un qui a écrit les personas — on ne relit pas sa propre copie.

Choisir de préférence **la personne qui pitchera jeudi**. Elle passera quarante-cinq minutes dans les avis bruts, c'est-à-dire exactement dans la matière qu'elle devra défendre en cinq minutes de questions-réponses. C'est le meilleur temps de préparation au pitch disponible dans le sprint, et il est déjà budgété.

### C3a — Convergence de fait

Le plafond du corridor. **Au moins un des trois dossiers doit produire une convergence de fait entre deux agents d'axes différents** — deux ancres qui désignent la même phrase ou la même donnée.

Zéro convergence sur trois dossiers ne signifie pas que la divergence est excellente : ça signifie que les découpes d'entrée sont trop disjointes et que les agents ne peuvent structurellement jamais se rencontrer. La section 2 du rapport — celle qui porte l'information la plus chère — serait alors vide à chaque exécution.

### C3b — Contradiction interprétative

**Le critère qui manquait, et c'est le phénomène central du projet.**

C1 demande des verdicts différents. C2 demande des faits différents. C3a demande un fait partagé. Aucun des trois n'exigeait ce pour quoi le dispositif existe : **la même ancre, deux verdicts opposés.**

**Attendu : au moins une contradiction interprétative sur les deux dossiers de calibration.**

**L'occasion est câblée, la contradiction ne l'est pas.** A2 l'Acheteur et A4 le Constructeur reçoivent tous deux la section « Preuves terrain », avec des conditions d'acquittement indépendantes. C'est tout ce qu'on organise. Aucun prompt ne dit à un persona quel verdict rendre sur quel fait — une version de A4 le faisait, et C3b ne mesurait alors que l'obéissance à un corrigé livré avec la consigne.

Si C3b n'est jamais atteint, le dispositif produit de la juxtaposition et pas de la contradiction. C'est le même défaut que la partition par critère qu'on a écartée le premier jour, atteint par un autre chemin — et il faut le dire au jury plutôt que de le maquiller en divergence réussie.

### C4 — Redondance

Le test que Goodweek suggère sur le couple Constructeur / Liquidateur, rendu opérationnel et appliqué aux dix paires.

**Une paire est redondante si, sur les trois dossiers : même verdict à chaque fois, ET même ancre au moins deux fois sur trois.**

**Le passage effectif à quatre agents sort du sprint.** Il invaliderait tous les calculs faits à cinq — k(5−k), les seuils, le tableau. On constate la redondance, on l'écrit, on la présente comme un enseignement du sprint. On ne recâble pas le dispositif à 22h sur la base de deux dossiers.

---

## Ce qu'on fera si le seuil n'est pas atteint — engagé maintenant

Pré-écrit pour ne pas improviser une explication mercredi soir.

| Échec | Remède, dans cet ordre |
|---|---|
| C1 insuffisant (lissage) | Renforcer **l'asymétrie d'entrée** avant de toucher aux prompts. Durcir les prompts est précisément là où on fabriquerait la divergence au lieu de la construire. |
| C2 insuffisant | Même remède, plus vérifier que les cinq horizons de jugement sont bien présents et distincts dans les prompts. C'est le levier qu'on oublie de recopier. |
| C3a à zéro | Les découpes sont trop disjointes. Ré-augmenter les recouvrements, en commençant par la section « Preuves terrain » — le lieu de rencontre de l'Acheteur et du Constructeur. |
| Le dossier solide bloque (k ≥ 1) | Faux positif. Vérifier d'abord la condition `ACQUITTÉ SI` du persona en cause — c'est presque toujours elle qui est trop étroite. Resserrer les lignes rouges, jamais supprimer la contre-preuve. |
| C0 échoue (ancres inventées) | Rien d'autre ne se calcule. Vérifier que l'agent reçoit bien sa découpe, puis raccourcir la limite de mots avant de toucher au prompt. |
| C3b jamais atteint | Les découpes ne se croisent nulle part. Vérifier en premier qu'A2 et A4 reçoivent tous deux la section « Preuves terrain ». |
| Une paire redondante | On le constate et on l'écrit. **On ne passe pas à quatre agents** : ce serait invalider tous les calculs faits à cinq, sur la foi de deux dossiers. C'est un enseignement du sprint, pas une correction du sprint. |

---

## Tableau à remplir à la première passe

Les deux premières colonnes se remplissent mercredi, la troisième jeudi après gel.

| | D0_ calibration | D0_ calibration | D0_ holdout |
|---|---|---|---|
| **C0 — ancres valides / 5** | | | |
| **Run valide ? (= 5, pas 4)** | | | |
| Reprises C0 déclenchées | | | |
| Ancres `ABSENCE` | | | |
| k (avis BLOQUANT / 5) | | | |
| C1 atteint (≥2 · =0 · 1–4) | | | |
| Faits distincts / 5 | | | |
| C2 atteint (≥ 3) | | | |
| C3a — convergence de fait | | | |
| **C3b — contradiction interprétative** | | | — |
| Paires redondantes | | | |
| A3 : 10 décisions de corpus | | | |

À remplir avant d'ouvrir la moindre discussion sur ce qu'on en pense. **La colonne holdout se remplit et ne se corrige pas** : aucune modification de prompt ne peut être justifiée par ce qu'elle contient.

---

## Ce que le seuil ne teste pas, et qui compte autant

Le corridor mesure le comportement du dispositif. Il ne dit rien de la question qui décide du projet : **est-ce que cinq contextes isolés produisent une meilleure instruction qu'un seul appel bien écrit ?**

Trois bras, lecture aveugle par un SUM extérieur, sur un seul dossier, mercredi soir :

| | Ce que c'est | Ce que ça teste |
|---|---|---|
| **B0** | un appel, prompt d'une phrase — la colonne de gauche | ce qu'un porteur obtient seul aujourd'hui |
| **B1** | un appel, prompt structuré d'instruction critique complète | « les bonnes instructions suffisent-elles ? » |
| **B2** | un appel contenant les cinq personas dans un contexte partagé | « l'étanchéité change-t-elle quelque chose ? » |

### B2 se définit à armes égales, et se fige avant observation

Une ablation mal spécifiée est un homme de paille, et un jury de cinq personnes le verra. **Une seule différence est autorisée : une requête partagée contre cinq requêtes étanches.** Tout le reste est identique.

- même modèle, mêmes paramètres, même dossier ;
- **les cinq mêmes instructions de persona, mot pour mot** ;
- **les cinq mêmes découpes**, présentées comme cinq blocs étiquetés, chaque persona sachant quelles sections sont les siennes ;
- même schéma de sortie, budget de sortie total comparable ;
- même arbitrage, même rendu.

B2 voit donc l'union des cinq découpes — c'est exactement ce qui le distingue, puisque aucun agent du Contradicteur ne voit cette union. C'est la différence qu'on mesure, pas un avantage qu'on lui retire.

**Portée honnête** : un dossier, un relecteur. B2 fournit un indice qualitatif montrable, pas une preuve générale. À dire tel quel.

### Le protocole de lecture — figé maintenant, pas le soir même

Une question improvisée à 21 h oriente la réponse. Celui-ci est arrêté le 20/08.

**Ce n'est pas une lecture aveugle, c'est une lecture à sources masquées.** Le terme compte : même sans étiquette, le format et la structure peuvent trahir le Contradicteur. On ne peut pas l'empêcher — on peut le rendre observable.

**Deux comparaisons pairées, pas un classement à trois.** Le classement A/B/C mélange deux questions ; les paires répondent chacune à la sienne :

```
paire 1 — Contradicteur contre B1 : « les bonnes instructions suffisent-elles ? »
paire 2 — Contradicteur contre B2 : « l'étanchéité change-t-elle quelque chose ? »
```

Trois sorties à lire, deux comparaisons. Ordre A/B tiré au sort dans chaque paire, aucune marque de provenance.

**Trois questions par paire, dans cet ordre :**

> 1. Quel résultat prépare le mieux les questions du comité ? A / B / égalité. Justification en une phrase.
> 2. Selon vous, quelle sortie vient du Contradicteur ? A / B / impossible à dire.
> 3. Confiance dans cette identification : faible / moyenne / forte.

La question 1 se pose avant les deux autres, sinon on amorce le jugement. Les questions 2 et 3 mesurent le masquage lui-même : **si le relecteur identifie notre sortie avec une confiance forte, sa préférence en question 1 vaut nettement moins**, et il faut l'écrire à côté du résultat plutôt que de l'oublier.

Ça reste l'avis d'une personne sur un cas. Recueilli ainsi, il se raconte et sa limite se dit ; recueilli n'importe comment, il ne vaut rien et le jury le sentira.

**La thèse de repli, écrite maintenant, avant de connaître le résultat** — même discipline que le seuil :

> Si le Contradicteur ne se distingue pas de B1 ou de B2 à la lecture à sources masquées, la thèse cesse d'être « l'isolation change le jugement » et devient : **sur tout run valide, chacun des six critères reçoit un statut de couverture explicite, et chaque reproche est rattaché à une citation vérifiée.** C'est ce que le dispositif peut garantir. Il ne peut pas garantir une instruction suffisante quand le deck est pauvre — c'est précisément ce que la dimension INSTRUCTION rend visible au lieu de le masquer. Moins spectaculaire, vrai, et utile.

Une thèse de repli écrite après le résultat n'est pas une thèse, c'est une excuse.

---

## Ce qu'il faut dire au jury sans attendre la question

**Trois dossiers ne sont pas une calibration, c'est un test de fumée.** Un seuil posé sur trois cas fictifs dit si le dispositif fonctionne mécaniquement, pas s'il juge juste. La calibration réelle supposerait une rétrospective sur des dossiers réellement passés en Comité d'Engagement, avec leur issue connue — historique confidentiel, qui n'existe pas aujourd'hui sous forme exploitable et dont l'accès suppose un arbitrage de conformité en cours.

Le dire avant qu'on ne le demande, et enchaîner sur la suite plutôt que de le subir.
