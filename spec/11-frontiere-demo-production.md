# Frontière démo / production — confidentialité et parcours des données

*20 août 2026 · document susceptible de circuler vers la direction et le RSSI/DPO · rédigé avec cette destination en tête*

---

## La règle, en une phrase

> **Aucun pitch deck réel ne peut être traité dans l'environnement actuel.** Une configuration — éditeur SaaS, API propriétaire en tenant d'entreprise, ou modèle auto-hébergé — ne devient autorisée qu'après qualification explicite de l'ensemble de sa chaîne technique et contractuelle.

Formulation reprise de la revue SOL 5.6, et on la prend telle quelle : **ce n'est pas le nom du modèle qui décide de la sécurité, c'est la chaîne qualifiée.** Un chat grand public est exclu ; une API propriétaire dans un tenant contractuellement encadré peut le devenir. Les deux affirmations sont vraies en même temps.

---

## 1. Goodweek n'est pas encore un environnement qualifié — et c'est écrit dans nos propres documents

La correction est juste, et nous n'avons pas besoin d'une source externe pour l'établir. Trois pièces internes disent la même chose.

**Le cadre d'usage de l'IA du réseau**, diffusé avec le starterpack QAMP :

> « Pour la suite : `PRODUCTION-RESTREINTE` tant que la direction n'a pas obtenu par écrit la durée de rétention, la localisation des traitements, la portée réelle de la suppression, et le régime propre à un contenu tapé en conversation. »

**Le contexte d'ouverture du chantier starterpack**, 18 août :

> « L'annonce commerciale "your data never leaves" est jugée insuffisamment précise : le modèle sous-jacent est exploité par un tiers. » · « Aucun modèle open source hébergé en Europe n'est proposé. C'est ce qui débloquerait l'usage sur les données sensibles. »

**Le suivi de ce même chantier** porte la ligne ouverte depuis le 13 août : *conformité de la plateforme, quatre clauses écrites, en attente de l'éditeur via la direction.*

**Conclusion** : Goodweek est un **candidat à qualifier**, pas une solution validée. L'hypothèse de conformité accordée pour l'exercice du starterpack est datée, explicite, et en tension déclarée avec l'Engagement 2 du manifeste IA du réseau. Elle ne se transporte pas ici.

Et le cadre d'usage ajoute la phrase qui tranche le débat pratique :

> « Une IA peut refuser impeccablement de traiter un nom qu'on lui a soumis — ça démontre qu'elle n'en fera rien, pas que la donnée n'a jamais transité. Au moment où c'est tapé et envoyé, c'est parti. »

---

## 2. Ce que « exécution locale » ne veut pas dire

C'est l'illusion la plus coûteuse à laisser vivre, et elle nous guettait.

L'option retenue pour la démonstration — runner local, clé en variable d'environnement, GitHub Pages en vitrine — protège la **clé**. Elle ne protège pas la **donnée**. Si le modèle est distant, le contenu part chez le fournisseur.

Formulation exacte, corrigée en revue : **sept appels transportent tout ou partie du deck, ou des productions confidentielles qui en dérivent.** Un seul emporte le deck entier — la baseline. Les cinq agents reçoivent chacun une découpe. L'arbitre ne reçoit pas le deck du tout : il reçoit les cinq avis, c'est-à-dire de la matière dérivée que nous avons nous-mêmes classée aussi sensible que la source.

La correction ne réduit pas le risque, elle le décrit mieux. « Local » qualifie l'endroit où tourne l'orchestrateur, jamais le régime de confidentialité de ce qu'il envoie.

---

## 3. Les trois environnements, articulés aux régimes de données proposés par le starterpack

Trois environnements, articulés aux trois **régimes de données proposés par le starterpack QAMP** — déclarés dans la configuration d'un Espace, non modifiables par une phrase en conversation.

**Statut de ces régimes, à ne pas surévaluer** : le starterpack est une v1 destinée à être discutée au GT IA. Ce sont des régimes **proposés**, pas une doctrine réseau ratifiée. Un document qui les présenterait comme adoptés dirait faux, et c'est le genre d'imprécision qui se paie devant une direction.

| Environnement | Régime | Ce qui y circule | Statut |
|---|---|---|---|
| **Démo QAMP** | `SANDBOX` | exclusivement fictif, fixtures embarquées | ouvert |
| **Qualification / pré-production restreinte** | `PRODUCTION-RESTREINTE` | rien tant que le gate n'est pas passé | **fermé par défaut** |
| **Production interne** | `PRODUCTION-INTERNE` | decks réels | n'existe qu'après qualification complète |

Le deuxième environnement s'appelait « pilote réel » dans la première version, ce qui était contradictoire avec la mention « rien n'y circule ». Ce n'est pas encore un pilote : c'est l'étape où l'on qualifie. `PRODUCTION-RESTREINTE` étant le régime par défaut, il est fermé tant que personne ne l'a explicitement ouvert.

### Deux chemins de données, un seul socle méthodologique

Ce qui se réutilise du prototype vers le produit : les prompts, les schémas JSON, la matrice de découpe, les conditions de blocage, une partie de l'interface.

Ce qui ne se réutilise pas : le runner, le stockage, le déploiement public.

C'est une bonne nouvelle et elle mérite d'être dite au jury — à condition de ne pas la surpromettre : **la valeur du projet est dans la logique métier, et c'est elle qui est portable.** Le socle technique de démonstration est jetable par construction.

Ce qui n'est **pas** portable sans travail : un adaptateur remplaçable ne rend pas les résultats équivalents. Prompts, seuils, latences et comportements devront être requalifiés pour chaque modèle cible — c'est-à-dire repasser C0, C3b, le holdout, la latence et les coûts. Dire « sans réécrire la logique métier », jamais « sans réécriture ».

---

## 4. Les règles applicables au prototype, dès la première ligne de code

1. GitHub Pages reste une **vitrine de rejeu**. Aucun champ de dépôt de deck, aucune clé apportée par le visiteur.
2. **Le runner de démonstration n'accepte que les trois fixtures synthétiques embarquées, identifiées par empreinte.** Ni import, ni collage, ni chemin de fichier libre. C'est la règle la plus importante des huit : elle remplace une consigne humaine par un **contrôle fail-closed contre l'ingestion accidentelle**. Une déclaration `data_regime: "SANDBOX"` n'est qu'une déclaration, et un vrai deck peut être étiqueté par erreur à 23 h un mercredi.

   **Ce que ce contrôle n'est pas.** Il n'empêche pas quelqu'un ayant accès au dépôt de remplacer une fixture et son empreinte. C'est une barrière contre l'erreur, pas contre un contributeur. Modifier les fixtures reste possible — mais exige une **modification explicite et traçable du manifeste**.

   **Condition sans laquelle la règle est vide** : les empreintes attendues sont **figées dans un manifeste versionné**. Elles ne sont jamais recalculées depuis les fichiers présents, ni au démarrage, ni pendant le build. Un contrôle qui hache ce qu'il trouve valide tout ce qu'on lui donne.
3. Le runner **refuse tout autre régime**, sans option de contournement. Le régime est une propriété de la configuration, jamais une assertion en conversation.
4. **Seuls les runs issus de ces fixtures peuvent entrer dans le build public.** Une liste blanche de champs contrôle la forme, pas le contenu : elle ne déconfidentialise rien. Les deux contrôles se cumulent, aucun ne remplace l'autre.
5. Les sorties brutes ne sont pas conservées dans le dépôt au prétexte qu'un dossier est ignoré par Git. **`.gitignore` n'est pas une frontière de sécurité.**
6. B0, B1 et B2 sont des instruments expérimentaux sur données fictives. Ils **disparaissent du chemin de production**.
7. L'adaptateur de modèle est **remplaçable**, décidé maintenant et pas plus tard.
8. **Aucun deck réel dans aucune des trois IA du run à blanc.** Ni Goodweek, ni ChatGPT/SOL, ni Claude — y compris pour « juste tester », y compris débarrassé des noms.

### Ce que le régime de la source contamine

La règle ne couvre pas que les decks. **Héritent tous du régime de la source** : la transcription normalisée, les cinq avis, le rapport, le corpus d'exemples, les annotations du SUM, l'issue historique du projet, les captures d'écran, les journaux, **les traces de prompts, les artefacts d'intégration continue et les fichiers temporaires.** Les trois derniers sont ceux par lesquels ça fuit en pratique, parce que personne ne les regarde.

### Le contrôle technique ne protège pas contre une fixture empoisonnée

L'allowlist par empreinte sécurise l'exécution. Elle ne dit rien de la façon dont les fixtures ont été écrites — et sous pression, la tentation sera de « partir d'un deck réel en changeant les noms ». C'est exactement le scénario de réidentification.

**Les trois fixtures sont écrites de zéro, jamais dérivées d'un deck réel, même lourdement modifié.** Chacune porte dans le dépôt une déclaration de provenance datée et signée par le gardien.

Ce que cette signature fait, exactement : elle rend l'affirmation « exclusivement fictif » **documentée, attribuable et auditable**. Pas vérifiable. Une signature prouve qu'une personne a attesté quelque chose, jamais que cette chose est matériellement vraie. La distinction compte devant un DPO, et elle compte devant un jury.

**Manifeste minimal, une entrée par fixture :**

```
identifiant · SHA-256
auteur
gardien attestant la provenance
date
déclaration : « créée sans deck réel ni extrait de deck réel »
pour le holdout uniquement : « son auteur n'a consulté ni les prompts,
  ni les conditions de blocage, ni les résultats des autres cas »
```

La dernière ligne protège contre une seconde forme d'empoisonnement, plus subtile que la première : **une fixture entièrement fictive, mais écrite pour satisfaire les critères connus.** Elle ne contient aucune donnée réelle et fausse pourtant toute la mesure.

**Les empreintes des fixtures sont figées en même temps que celles des prompts**, dans le manifeste de gel du jeudi 10h15. Une fixture modifiée après la première exécution ouvre une nouvelle série — même règle que le versionnement du seuil, pour la même raison.

Et la raison de fond : **un deck reste réidentifiable par recoupement** — équipe, marché, traction, chiffres, PI. Pseudonymiser n'est pas anonymiser.

---

## 5. Le gate avant toute donnée réelle

Liste reprise de la revue, à obtenir **par écrit et daté** avant tout pilote :

- le modèle et l'opérateur réellement appelés par la plateforme, et la chaîne de sous-traitance en cascade ;
- le contrat de sous-traitance / DPA ;
- l'usage ou non des données pour l'entraînement ;
- la rétention des entrées, sorties, journaux et sauvegardes ;
- la localisation des traitements et les transferts éventuels ;
- la portée et le délai réels de suppression ;
- les accès humains possibles chez l'éditeur et chez son support ;
- chiffrement, MFA, cloisonnement des tenants, contrôle d'accès par portefeuille ;
- journalisation sans contenu confidentiel ;
- gestion des incidents ;
- désactivation des connecteurs, du web et des outils non nécessaires.

**Ce que nous ne recopions pas dans cette spec** : les durées de rétention et les conditions de « zero data retention » des fournisseurs, citées dans la revue. Elles changent, elles dépendent du contrat et des fonctions activées, et nous ne les avons pas vérifiées. Un document destiné à un DPO qui affirmerait « tel fournisseur conserve trente jours » nous ferait porter une affirmation qui n'est pas la nôtre. **C'est précisément l'objet du gate que de l'obtenir par écrit.** Les références réglementaires citées par la revue partent au DPO telles quelles, sans reprise à notre compte.

**Le RGPD n'est qu'une partie du sujet.** Même sans donnée personnelle, restent la confidentialité contractuelle, le secret des affaires et la propriété intellectuelle du porteur. La validation associe donc la direction, le DPO/RSSI et, si nécessaire, le conseil juridique du réseau.

**L'auto-hébergement est une option de souveraineté, pas une preuve de sécurité.** Il reste à gérer les accès, le chiffrement, les correctifs, les sauvegardes, la télémétrie sortante — et la qualité du modèle, qui n'est pas acquise.

---

## 6. Ce que la contrainte fait au projet — et ce n'est pas seulement une limite

La revue conclut que la limite, bien annoncée, renforce la crédibilité. C'est vrai, et on peut aller plus loin.

**La production exige un environnement maîtrisé et qualifié.** Au regard du cap que le réseau s'est donné dans son manifeste IA — où la souveraineté est posée comme la forme numérique de la déontologie de confidentialité — la cible privilégiée est une infrastructure souveraine, opérée par QFC ou par un prestataire qualifié. **L'auto-hébergement open source est une option forte, mais ni une garantie suffisante, ni l'unique architecture admissible.**

Ce cas illustre le besoin d'un socle souverain. Il n'établit pas que ce socle doive être auto-hébergé.

*Correction d'une faute de raisonnement de la première version, qui écrivait « nécessairement souverain ou auto-hébergé ». C'était transformer une préférence stratégique en nécessité logique — et c'est faux à trois titres : souverain n'implique pas auto-hébergé, auto-hébergé n'implique ni souverain ni sécurisé, et nos propres sources parlent d'une « plateforme reconnue conforme » et d'un cap, pas d'une doctrine déjà arbitrée. Le retournement positif pour le pitch tient entièrement sans cette surenchère.*

Le projet ne se contente donc pas de respecter la ligne du réseau : **il en illustre le besoin sur un cas d'usage à forte valeur**, et il est conçu dès le départ pour être porté sur un socle qualifié quand il existera.

### Le message au jury

> Le prototype démontre la méthode sur des données exclusivement fictives. Le passage à des decks réels suppose un environnement contractuellement et techniquement qualifié — cette démonstration ne prétend pas l'établir. C'est aussi ce qui la rend utile : elle montre sur un cas concret pourquoi le réseau a besoin d'un socle souverain, et sa logique métier est construite pour être portée sur un socle qualifié — au prix d'une requalification technique, pas d'une réécriture.

---

## 7. Ce qui reste ouvert

| Sujet | Propriétaire | Échéance |
|---|---|---|
| Les quatre clauses écrites attendues de l'éditeur Goodweek | direction | en attente depuis le 13/08/2026 |
| Gouvernance des connecteurs au niveau réseau | direction QFC | ouverte depuis le 18/08/2026 |
| **Désigner le porteur du gate de qualification** | direction + DPO/RSSI | **maintenant** — son travail ne bloque pas le prototype, mais la signature est obligatoire avant toute décision de pilote |
| Provenance signée des trois fixtures | gardien des dossiers | avant le 9 septembre |
| Test SANDBOX sur un second endpoint | pilote technique | **hors des dix heures**, chantier production |

Deux précisions sur la dernière ligne. Elle est sortie du sprint : un run contre une seconde API prouve qu'une API répond, pas l'équivalence métier, pas la confidentialité, pas la portabilité. La vraie validation suppose de repasser C0, C3b, le holdout, la latence et les coûts sur le modèle cible. Et elle avait été placée jeudi 9h, ce qui était une erreur de planification de notre part — c'est désormais le créneau le plus tendu des deux jours, entre corrections, gel à 10h15, holdout à 10h30 et enregistrement du run de démonstration.

Rien de tout cela n'exige un changement de code aujourd'hui, puisqu'il n'y en a pas encore. Mais **la règle 2 — fixtures embarquées seules, par empreinte — est une contrainte sur du code non encore écrit.** Si elle n'est pas dans le brief avant que SOL ne commence, ce qui sera construit naturellement est un sélecteur de fichier.
