# Le Contradicteur — spécification du rapport de sortie

*Créneau « mercredi 11h30-13h30 », volet sortie · 20 août 2026 · Claude, pour l'équipe*

C'est ce document qui donne le cap aux six Actions. Tant qu'il n'est pas figé, les personas écrivent dans le vide.

---

## 1. Ce que ce rapport est, et pour qui

Un SUM le lit **debout, avant un rendez-vous de préparation au Comité d'Engagement**. Il en tire trois ou quatre questions à poser, et il conduit l'entretien lui-même. Il ne le lit pas à l'écran avec le porteur, il ne le transfère pas, il ne le commente pas.

Trois conséquences de conception :

**Une page.** Ce qui déborde va en annexe. Un rapport de quatre pages ne se lit pas entre deux rendez-vous, et un rapport qu'on ne lit pas ne change aucune décision.

**Aucun conditionnel.** « Il semblerait que », « on peut s'interroger sur » : ces formules sont des fautes de format, pas des nuances. Un fait ou rien.

**Le rapport ne se transmet pas au porteur.** C'est écrit en pied de page et ce n'est pas une précaution de style : la sortie brute est violente par construction, et la valeur du SUM est précisément de choisir ce qui se dit, dans quel ordre et à quel moment. Le dispositif produit des questions ; le SUM décide lesquelles poser. C'est la ligne du manifeste — faire faire, pas faire pour — appliquée à l'outil lui-même.

---

## 2. Structure imposée

### En-tête — 5 champs, une ligne chacun

```
Dossier · Stade (émergence / incubation / développement) · Typologie (non-DeepTech /
DeepTech / Biotech-Medtech) · Date d'instruction · Régime de données
```

La typologie n'est pas décorative : elle change ce qu'un point de rupture veut dire. Une DeepTech sans chiffre d'affaires à dix-huit mois est normale ; une non-DeepTech dans le même état ne l'est pas.

### Bandeau de verdict — une ligne, trois valeurs possibles

```
BLOQUANT — axe <nom>                     (au moins un SIGNAL bloquant)
AUCUN BLOQUANT ÉTABLI — n/5 axes instruits   (aucun signal bloquant)
NON INSTRUIT                             (un avis manquant, ou une ancre invalide
                                          après reprise)
```

Le second bandeau porte **toujours** le compte des axes en INSTRUCTION SUFFISANTE. « Aucun blocage établi » sur cinq axes instruits et « aucun blocage établi » sur un seul axe instruit sont deux situations opposées, et sans ce compte elles s'écrivent pareil — c'est précisément par là qu'un deck pauvre passerait pour solide.

Pas de quatrième valeur. Pas de « sous réserve », pas de « favorable avec réserves » : c'est exactement la formulation qui permet à un comité de laisser passer un dossier que trois personnes trouvaient mauvais.

### 1. Les points de rupture — trois au maximum

Ordonnés du plus au moins bloquant. Chacun tient en **trois lignes** :

```
▸ <Le fait, en une phrase. Citation du dossier entre guillemets.>
  Levé par : <axe>          Ce qui le lèverait : <preuve précise, obtenable, avec un délai>
```

Trois au maximum, et c'est une contrainte de fond : un rapport qui liste sept problèmes ne hiérarchise pas, et un SUM qui arrive avec sept problèmes n'en traitera aucun.

### 2. Ce sur quoi les axes se rejoignent

Le fait unique que deux postures opposées ont tous deux heurté. C'est l'information la plus chère du rapport et souvent la seule chose que le SUM retiendra.

S'il n'y en a pas, écrire : *« Aucune convergence — le dossier échoue sur des axes indépendants. »* Ce n'est pas une absence de résultat, c'est un diagnostic différent : un dossier qui casse partout et un dossier qui casse en un point ne se préparent pas de la même façon.

### 3. Les questions du comité — quatre à six

Rédigées **telles qu'elles seront posées à voix haute**. Pas « interroger la robustesse des hypothèses de prix », mais « vous facturez 4 000 € par an, sur quoi vous vous appuyez ? ». Classées par dangerosité : celle qui fait tomber le pitch arrive en premier.

### 4. Ce qui manque au dossier — en deux blocs

C'est la seule partie du rapport qu'un SUM peut reformuler en demande de complément vers un porteur. Envoyer « il vous manque X » quand X figure au dossier est exactement l'erreur qui détruit la crédibilité d'un accompagnement. D'où la scission, contrôlée par le code :

**Manquant, vérifié** — chaque item est adossé à un marqueur `[NON RENSEIGNÉ DANS LE DOSSIER]` ou `[SECTION ABSENTE DU DOSSIER]` présent dans ce que l'agent a reçu. C'est transmissible.

**Supposé manquant** — ce qu'un agent croit absent sans marqueur pour l'attester. Reversé en questions, jamais présenté comme un fait. Ne se transmet pas tel quel.

### 5. Ce qui résiste — trois au maximum

Assemblé depuis les `CONTRE-PREUVE` des avis bloquants et les `POURQUOI ÇA TIENT` des avis favorables. Ce n'est pas la section « points forts » : c'est ce qui a survécu à une attaque délibérée, et chaque élément est cité et rattaché à un verdict — sinon c'est de la décoration.

### 6. Ce que le dispositif n'a pas instruit

Critères QFC non couverts, avis manquants, sections du dossier absentes en entrée. **Cette section ne se supprime jamais**, même vide — auquel cas elle porte la mention « couverture complète ». Un rapport sans aveu de lacune se lit comme un rapport exhaustif, et il ne l'est pas.

### Annexe — les cinq avis bruts

Non fusionnés, non réécrits, dans l'ordre A1 à A5. C'est la pièce qui rend le rapport contestable, donc utilisable. Un SUM qui n'est pas d'accord avec l'arbitre doit pouvoir remonter à la source.

### Pied de page — invariant

> Ce document ne se transmet pas au porteur. Il prépare un entretien, il ne le remplace pas.

---

## 3. Gabarit rempli

**Dossier fictif de démonstration.** Aucune ressemblance avec un dossier réel ; construit pour tester le format, pas pour illustrer un cas.

```
────────────────────────────────────────────────────────────────────────
LE CONTRADICTEUR — instruction de dossier
Dossier : « Sandbox-17 » · Stade : incubation · Typologie : non-DeepTech
Instruit le 20/08/2026 · Régime : SANDBOX

  ⚠  BLOQUANT — axe Désirabilité
────────────────────────────────────────────────────────────────────────

1 · POINTS DE RUPTURE

▸ Aucun euro n'a changé de main en quatorze mois. Le dossier parle de
  « trois pilotes engagés » ; les trois sont gratuits.
  Levé par : A2 Acheteur    Ce qui le lèverait : un pilote payant, même
  200 €, signé sous 6 semaines.

▸ La croissance du prévisionnel repose sur un taux de conversion de 12 %
  qui n'est sourcé nulle part et qui n'apparaît dans aucun des trois pilotes.
  Levé par : A5 Liquidateur   Ce qui le lèverait : le taux observé sur les
  pilotes, quel qu'il soit, y compris s'il est mauvais.

▸ Ce que fait l'outil est fait aujourd'hui dans un tableur partagé, et le
  dossier ne cite pas ce concurrent-là.
  Levé par : A3 Déjà-Vu    Ce qui le lèverait : le coût réel de la méthode
  actuelle, chiffré chez deux des trois pilotes.

2 · CE SUR QUOI LES AXES SE REJOIGNENT

L'Acheteur et le Liquidateur butent sur le même fait par deux chemins
opposés : les trois pilotes ne produisent aucune donnée. Ni preuve d'achat,
ni taux observé. Quatorze mois de terrain n'ont rien laissé de mesurable.

3 · LES QUESTIONS DU COMITÉ

1. Vos trois pilotes tournent depuis quatorze mois. Qu'est-ce qu'ils vous
   ont appris que vous ne saviez pas en démarrant ?
2. Le taux de 12 %, il vient d'où ?
3. Qui, parmi les trois, a refusé de payer, et qu'a-t-il dit exactement ?
4. Vos utilisateurs le font au tableur aujourd'hui. Combien ça leur coûte ?
5. Si aucun des trois ne signe d'ici décembre, vous faites quoi ?

4 · CE QUI MANQUE AU DOSSIER

□ Comptes rendus des entretiens utilisateurs (aucun joint)
□ Grille tarifaire
□ Plan de trésorerie mois par mois
□ Statut de la marque (revendiquée « en cours de dépôt », sans référence)

5 · CE QUI RÉSISTE

▸ Le porteur a exercé le métier de ses utilisateurs pendant onze ans. (A1)
▸ Le produit tourne en conditions réelles chez trois structures. (A4)

6 · CE QUE LE DISPOSITIF N'A PAS INSTRUIT

Critère QFC « équipe » : couvert partiellement — le dossier ne décrit
aucun co-fondateur et A1 n'a pas eu de quoi trancher.

────────────────────────────────────────────────────────────────────────
Ce document ne se transmet pas au porteur. Il prépare un entretien,
il ne le remplace pas.
────────────────────────────────────────────────────────────────────────
```

---

## 4. La colonne de gauche de la démo

La démonstration compare deux sorties. La colonne de gauche — l'IA générique — **ne se fabrique pas**. Elle s'obtient en soumettant le même dossier, sans aucune instruction de posture, avec la seule phrase qu'un porteur écrirait :

> « Voici mon dossier de candidature pour un comité de sélection. Qu'est-ce que tu en penses ? »

Prompt figé, capturé une fois, montré tel quel. Si on l'écrit à la main pour qu'elle soit plus plate qu'elle ne l'est, quelqu'un dans le jury refera l'essai le soir même et le projet est mort. C'est le seul endroit de la démo où on n'a pas le droit d'aider notre propre thèse.

---

## 4 bis. La phrase de chute, révisée

Notre version initiale — *« ce dossier, dans la sandbox, a été clos par liquidation »* — est spectaculaire et méthodologiquement attaquable : le dossier est synthétique, choisi à partir de son issue, puis utilisé pour régler le dispositif. Version tenable :

> Ce dossier est fictif, et son scénario se termine par une liquidation. Nous l'avons choisi pour ça. Ce que vous venez de voir n'est pas une prédiction : c'est que le dispositif remonte, dès l'entrée, le fait précis autour duquel le scénario s'effondre. La prédiction, ce serait la rétrospective sur des dossiers réels dont l'issue est connue. Nous ne l'avons pas, et c'est la suite.

Elle perd un peu d'effet et gagne de ne pas s'effondrer à la première question.

---

## 5. Le contrôle à faire avant de figer

Trois vérifications, à passer mercredi 17h sur les trois premiers dossiers :

- **Le format tient-il en une page ?** Si non, ce sont les points de rupture qui sont trop bavards, pas la page qui est trop petite.
- **Un SUM d'une autre équipe pose-t-il ces questions ?** Le test est de faire lire les cinq questions à quelqu'un qui n'a pas travaillé sur le projet et qui connaît le métier. S'il dit « oui, mais il en manque une évidente », c'est un trou de couverture, pas un détail.
- **Les cinq avis bruts se ressemblent-ils ?** Les lire en annexe, à la suite. Le lissage se voit à l'œil nu bien avant de se mesurer.
