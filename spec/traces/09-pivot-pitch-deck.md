# Pivot vers le pitch deck — ce que ça change, et le prompt à passer à Goodweek

*20 août 2026 · avant de figer le schéma normalisé*

---

## 1. La structure, on l'a déjà

Inutile de la demander : elle est dans le Guide Métier du réseau, section 12.3.

> **Pitch Deck en 10 slides** : problème, solution, marché, produit, business model, traction, équipe, roadmap, demande. Règle : 1 idée = 1 slide, privilégier les visuels.

Neuf items nommés pour dix slides — la dixième est vraisemblablement la couverture, mais le guide ne le dit pas et **on ne le suppose pas dans le schéma**. À confirmer par Blaise.

Le même guide donne les pièces attendues face à un financeur : *pitch deck 10-15 slides, roadmap produit et commerciale, plan de trésorerie, lettre d'intention du porteur, lettre de prescription de l'incubateur.* Ce qui pose une question qu'il ne tranche pas : **le Comité d'Engagement reçoit-il le deck seul, ou le deck accompagné ?** Si le prévisionnel circule, le persona A5 a de quoi travailler ; sinon, il n'a presque rien.

### La correspondance avec nos dix sections

Elle est presque bijective, ce qui est une bonne nouvelle : le schéma ne s'effondre pas.

| Slide du deck | Section du schéma |
|---|---|
| Problème | 2. Le problème |
| Solution · Produit | 4. La solution · 5. Avancement et moyens techniques |
| Marché | 7. Le marché |
| Business model | 9. Modèle économique |
| Traction | 8. Preuves terrain |
| Équipe | 3. Le porteur et l'équipe |
| Roadmap | 5. Avancement et moyens techniques |
| Demande | 10. Prévisionnel et financement |
| *(rien)* | **6. Propriété intellectuelle** |
| Couverture | 1. Identité |

**Deux frictions à trancher.** La PI n'a pas de slide dédiée dans un deck standard alors qu'une condition de A4 en dépend. Et « la demande » n'est pas « le prévisionnel » : un deck annonce un montant, il ne montre pas une trésorerie.

---

## 2. Ce que le pivot change vraiment — et ce n'est pas la structure

**Un deck n'est pas un dossier.** Un dossier cherche à être complet ; **un deck cherche à convaincre.** Dix slides, une idée par slide, des visuels. La densité textuelle est faible et le silence y est souvent stratégique, pas révélateur.

Conséquence directe et sérieuse : **la plupart des quatorze champs de la fiche de faits reviendront `[NON RENSEIGNÉ DANS LE DOSSIER]`.** Aucun deck ne porte une slide « coût d'acquisition client » ni « date de trésorerie zéro ».

Or les cinq conditions `BLOQUANT SI ET SEULEMENT SI` sont écrites pour un dossier. Celle de A2 dit : *aucun euro payé et aucun refus documenté.* Sur un deck, c'est vrai presque à tous les coups. **Les cinq agents bloqueraient sur tous les decks** — et on redeviendrait un générateur de négatif, le défaut qu'on a passé trois tours de revue à écarter, atteint par une porte qu'on n'avait pas fermée.

### La règle à poser avant de figer le schéma

> **Un champ `[NON RENSEIGNÉ]` ne bloque jamais à lui seul. Il produit une question.**
> Le blocage exige soit un fait positif affirmé au deck, soit une contradiction interne, soit un négatif confirmé. On n'instruit pas le silence d'un support de persuasion comme s'il était un aveu.

> **Amendement du même jour, après retour SOL 4.6 — la règle ci-dessus est incomplète et son défaut est pire que celui qu'elle corrige.**
> `NON RENSEIGNÉ` ne bloque pas, mais **il n'acquitte pas non plus.** Un agent qui ne peut pas bloquer sortira NON BLOQUANT, et un deck pauvre paraîtra solide *parce qu'il ne dit rien*. Deux dimensions orthogonales, adoptées : **SIGNAL** (BLOQUANT / AUCUN BLOQUANT ÉTABLI) et **INSTRUCTION** (SUFFISANTE / INSUFFISANTE). Ni fait défavorable ni preuve suffisante → questions, sans acquittement. Détail dans `01` et `04`, réponse complète dans `10-reponse-sol46-pivot.md`.

La divergence se calcule sur le SIGNAL, donc l'arithmétique en k(5−k) est intacte. Le poids de la sortie se déplace : sur un deck, **la section « questions du comité » devient le produit principal du rapport**, et le blocage devient rare et significatif.

Ce n'est pas un repli. C'est ce que la note de soumission annonçait dès le premier jour : *il ne rédige rien à la place de personne, il produit des questions.*

### Ce que ça impose comme réécriture

Les cinq conditions passent de « ce qui manque » à **« où l'affirmation dépasse ce qu'elle prouve »**. Un deck revendique toujours de la traction ; le travail de l'Acheteur devient d'établir ce que la revendication prouve et ce qu'elle ne prouve pas. C'est plus proche de ce que fait réellement un jury de vingt experts devant un deck, et c'est plus difficile à obtenir d'un modèle — donc plus démontrable.

Environ une heure de travail métier. À faire avant de figer le schéma, pas après.

---

## 3. Trois bonnes nouvelles, et un piège

**Le deck est un bien meilleur objet de démonstration.** Personne dans la salle n'a jamais vu un « dossier de candidature normalisé » — ça ressemble à un artefact qu'on aurait fabriqué pour l'occasion. Tout le monde a vu un pitch deck. La comparaison côte à côte devient immédiatement lisible : *voilà ce que ChatGPT dit de votre deck, voilà ce que le comité va dire.*

**La normalisation devient plus légère.** Dix slides à faible densité, c'est moins à transcrire qu'un enregistrement Asana. Le budget de 3 h 15 est probablement surestimé — à revoir une fois un deck réel sous les yeux, mais dans le bon sens cette fois.

**On dépend moins de la sandbox.** Un deck ne se cherche pas dans Asana.

**Le piège, et il est sérieux.** Si nous écrivons nous-mêmes les trois decks, nous écrivons aussi les réponses. C'est le problème du corrigé dans le prompt, remonté d'un cran au niveau du jeu de données — et il serait plus grave, parce qu'invisible dans les prompts.

Règle à poser : **les trois decks sont rédigés avant toute lecture des cinq conditions `BLOQUANT SSI`**, à partir des enregistrements de la sandbox, par le gardien seul. S'il les écrit en connaissant les conditions, la démonstration ne vaut plus rien et quelqu'un finira par le demander.

---

## 4. Le prompt à passer à Goodweek — version corrigée

*Structure reprise de la proposition SOL 4.6, meilleure que la nôtre. Deux amendements : on retire l'audit sur les deux points dont on sait déjà qu'ils sont absents du starterpack — lui faire écrire INCONNU deux fois n'a pas de valeur — et on remplace le OUI/NON par une recommandation motivée, parce que ses instructions lui interdisent de décider à notre place.*

```
Tu es le maître de cérémonie du projet Le Contradicteur. Tu tiens le cadre, les
dépendances, le périmètre et les décisions à obtenir. Tu ne reconstitues aucune
information absente de tes sources — mais tu peux arbitrer une décision de
conception au regard du cadre d'usage de l'IA du réseau, qui est dans ta base.

LE CHANGEMENT

L'entrée n'est plus un dossier de candidature complet, mais la transcription
structurée d'un pitch deck présenté en Comité d'Engagement, avec d'éventuelles
annexes explicitement déclarées.

Structure connue par ailleurs, ne la complète pas et ne suppose pas le contenu
d'une dixième slide : problème, solution, marché, produit, business model,
traction, équipe, roadmap, demande.

LE PROBLÈME, ET LA DÉCISION DÉJÀ PRISE

Un deck est sélectif. L'absence d'une information n'établit pas que le fait est
défavorable. Notre première règle — « une information non renseignée produit une
question, jamais un blocage » — corrigeait le faux positif et créait l'inverse :
un deck pauvre sortait avec cinq avis favorables et paraissait solide parce qu'il
ne dit rien.

Version retenue, deux dimensions séparées :
- SIGNAL : BLOQUANT ou AUCUN BLOQUANT ÉTABLI
- INSTRUCTION : SUFFISANTE ou INSUFFISANTE
- un blocage exige un fait défavorable affirmé au deck, une contradiction interne
  entre deux éléments cités, ou un négatif explicitement confirmé
- une information manquante ne bloque pas et n'acquitte pas : elle produit une
  question et met l'axe en INSTRUCTION INSUFFISANTE

Conséquence assumée : sur un deck, la liste de questions devient la sortie
principale du rapport et le blocage devient rare.

CE QU'ON TE DEMANDE

1. ARBITRAGE DE POSTURE
Cette décision est-elle dans l'esprit du cadre d'usage de l'IA du réseau ? Cite
le passage sur lequel tu t'appuies. Si tu es en désaccord, dis-le.

2. ROUTAGE DES INCONNUES
Deux questions restent sans réponse et ne sont pas dans tes sources — inutile de
les y chercher, nous avons lu tes trois documents :
  a. Que reçoit réellement le Comité d'Engagement : le deck seul, ou accompagné du
     prévisionnel, de la roadmap, d'une note du Startup Manager, d'autres annexes ?
  b. La constitution et la normalisation d'un jeu de test sont-elles autorisées
     avant le 9 septembre ?
Pour chacune : qui doit répondre, la formulation exacte de la question, et la date
limite pour l'obtenir.

3. IMPACT SUR LE SPRINT
Deux colonnes. Ce que le pivot laisse inchangé, ce qui doit être réécrit avant le
gel du schéma. Couvre au minimum : les conditions des cinq personas, le statut des
informations non renseignées, le format des ancres, la définition de NON INSTRUIT,
la fiche de couverture, la matrice de découpe, le choix des trois cas.

4. RECOMMANDATION
Peut-on figer le schéma sans attendre les réponses de la question 2 ? Notre
position : oui, parce que les annexes sont déclarées dans l'entrée et qu'un agent
privé d'annexe sort en INSTRUCTION INSUFFISANTE — l'inconnue devient inoffensive
dans la structure au lieu de bloquer. Dis ce que tu ferais et ce que coûte chaque
branche. Tu ne tranches pas à notre place.

FORMAT
A. Arbitrage de posture, avec citation
B. Inconnues, propriétaires, formulations, échéances
C. Inchangé / à réécrire
D. Ta recommandation et son coût
E. Prochaine action, propriétaire, échéance

Pas de reformulation du contexte, pas d'approbation générale.
```
