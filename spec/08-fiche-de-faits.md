# La fiche de faits — schéma normalisé des dossiers

*20 août 2026 · à figer **avant** de choisir D01, D02 et D03 · sinon on taille le schéma sur les dossiers qu'on a sous la main*

---

## Le problème que ça résout

Le correctif précédent traitait l'absence d'une **section entière**. Il ne couvrait pas le cas courant : une section renseignée qui omet la preuve décisive.

- « Preuves terrain » cite trois pilotes, mais ni paiement ni refus documenté.
- « Avancement » décrit le POC, mais pas les dépendances critiques.
- « Modèle économique » contient un prévisionnel, mais aucun coût d'acquisition.

Or **plusieurs conditions `BLOQUANT SI ET SEULEMENT SI` reposent exactement sur ces omissions-là.** Avec la seule règle de section, un agent placé devant ce cas n'a que deux issues : renoncer au blocage qu'il devrait prononcer, ou citer une phrase voisine qui ne prouve rien. Les deux sont des défaillances.

**La correction est dans la donnée, pas dans le prompt.** C'est le même mouvement que les deux précédents : on a instrumenté la sortie plutôt que de durcir la consigne, on instrumente maintenant l'entrée.

---

## La liste fermée — quatorze champs

Un champ n'existe que s'il est utilisé par une condition d'un persona, ou par le contrôle déterministe. **Ce n'est pas une ontologie du dossier de candidature** : tout le reste du dossier est de la prose ordinaire, que les agents citent normalement.

| # | Champ | Sert à | Section d'accueil |
|---|---|---|---|
| 1 | Ancrage du porteur sur le problème | A1 · BLOQUANT SSI | 3. Le porteur et l'équipe |
| 2 | Engagement à temps principal — qui, depuis quand | A1 · BLOQUANT SSI | 3. Le porteur et l'équipe |
| 3 | Euros encaissés auprès d'un client final | A2 · BLOQUANT SSI | 8. Preuves terrain |
| 4 | Refus documentés et leur motif | A2 · BLOQUANT SSI | 8. Preuves terrain |
| 5 | Substitut dominant nommé au dossier | A3 · BLOQUANT SSI | 7. Le marché |
| 6 | Motif de bascule depuis ce substitut | A3 · BLOQUANT SSI | 7. Le marché |
| 7 | Niveau de maturité réel — maquette, POC ou MVP | A4 · BLOQUANT SSI | 5. Avancement et moyens techniques |
| 8 | Dépendances critiques et statut contractuel | A4 · BLOQUANT SSI | 5. Avancement et moyens techniques |
| 9 | Statut de la propriété intellectuelle | A4 · BLOQUANT SSI | 6. Propriété intellectuelle |
| 10 | Date de trésorerie zéro | A5 · BLOQUANT SSI | 10. Prévisionnel et financement |
| 11 | Subventions inscrites en produits d'exploitation | A5 · BLOQUANT SSI | 10. Prévisionnel et financement |
| 12 | Coût d'acquisition d'un client | A5 · BLOQUANT SSI | 9. Modèle économique |
| 13 | Nature du modèle — récurrent, transactionnel, projet | A5 · conditionne le champ 12 | 9. Modèle économique |
| 14 | Implantation en Région Grand Est | contrôle déterministe, hors agents | 1. Identité |

## Les champs sont distribués, jamais regroupés

**Point de conception à ne pas rater : il n'y a pas de bloc « fiche de faits » en tête de dossier.** Chaque champ vit dans la section qui l'accueille, et suit donc la matrice de découpe.

Un bloc unique donnerait les quatorze champs à tous les agents et détruirait l'asymétrie d'entrée — c'est-à-dire le deuxième levier de divergence, et le seul qu'on puisse encore renforcer si le premier contrôle est décevant. La correction aurait coûté l'architecture.

Vérification faite champ par champ : chaque agent reçoit bien les champs dont ses conditions ont besoin, et aucun autre.

---

## Le format d'une ligne

```
- Euros encaissés auprès d'un client final : [NON RENSEIGNÉ DANS LE DOSSIER]
- Date de trésorerie zéro : mars 2027, source plan de trésorerie p. 4
- Niveau de maturité réel : POC en fonctionnement chez trois structures
```

Trois règles :

- **Le champ figure toujours**, avec soit une valeur, soit littéralement `[NON RENSEIGNÉ DANS LE DOSSIER]`. Jamais de ligne omise : une ligne absente redevient une ambiguïté.
- **La valeur tient en douze mots**, pour qu'une ligne entière reste citable comme ancre sous la limite de quinze.
- **La normalisation ne juge pas.** Si le dossier dit trois pilotes sans dire s'ils paient, le champ 3 est `[NON RENSEIGNÉ DANS LE DOSSIER]` — pas « zéro euro ». Constater un silence et conclure à un zéro sont deux choses différentes, et c'est aux agents de faire la seconde.

---

## Ce que ça simplifie

**L'exception sémantique `ABSENCE` disparaît.** Toute ancre redevient une chaîne littéralement présente dans l'entrée — y compris les marqueurs, qui sont du texte comme le reste. C0 redevient une simple recherche de sous-chaîne, sans cas particulier à coder ni à surveiller.

Un agent dont toutes les sections seraient absentes cite le marqueur `[SECTION ABSENTE DU DOSSIER]` lui-même. Le contrôle tient toujours.

`[SECTION ABSENTE DU DOSSIER]` reste utile pour la couverture et pour la section « ce que le dispositif n'a pas instruit ».

## Ce que ça verrouille

**Le champ `ABSENT DU DOSSIER` devient vérifiable.** Il alimente la section 4 du rapport, la seule qu'un SUM peut reformuler en demande de complément vers un porteur — envoyer « il vous manque X » quand X est au dossier est exactement l'erreur qui détruit la crédibilité d'un accompagnement.

Chaque item listé doit correspondre à un marqueur présent chez cet agent. Les autres ne sont pas supprimés : ils sont **reversés en questions**. Un manque supposé est une question, jamais un fait établi.

La section 4 du rapport se scinde en conséquence : *manquant, vérifié* d'un côté, *supposé manquant* de l'autre.

---

## Ce que ça coûte, et la conséquence

**Le budget de normalisation passe de 2 h 30 à environ 3 h 15 pour trois dossiers**, plus 45 minutes de travail métier pour arrêter le schéma lui-même. Environ **quatre heures de préparation**.

Conséquence directe, et elle change un arbitrage : **la question aux organisateurs n'est plus un confort, elle est bloquante.** Quatre heures prises sur dix heures de construction, c'est 40 % du budget — le projet ne finit pas. Faites en amont, ce sont quatre heures qui ne coûtent rien au sprint.

À poser par écrit avant le 31 août : la normalisation d'un jeu de données de test peut-elle se faire avant le 9 septembre ?

---

## Ce qu'il faudra dire au jury

Cette correction achète de la rigueur et rétrécit une affirmation. Il faut l'annoncer, comme les précédentes.

**Un dossier réel n'a pas de ligne « Euros encaissés : [NON RENSEIGNÉ] ».** En normalisant, on livre aux agents une structure pré-digérée qu'aucun dossier de candidature ne présente spontanément. La performance démontrée est donc celle du dispositif *sur une entrée propre* — pas celle qu'il aurait sur un PDF de vingt pages.

C'est un choix assumé de périmètre, et c'est le vrai chantier de la version production : l'extraction automatique qui produit cette fiche depuis un dossier brut, et qui devra elle-même distinguer « le dossier n'en parle pas » de « je ne l'ai pas trouvé ». C'est probablement plus difficile que tout ce qu'on a construit ici.

À dire avant qu'on ne le demande, et à enchaîner sur la suite.
