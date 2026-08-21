# Le Contradicteur

Prototype pour **The Qamp 2026** : cinq postures antagonistes instruisent
séparément un pitch deck, puis une passe d'arbitrage consolide leurs ruptures et
leurs questions sans les moyenner.

Le dispositif prépare le travail du Startup Manager. Il ne rend pas d'avis
d'admission et ne rédige rien à la place du porteur.

## État de cette branche

Cette première tranche est une **maquette simulée** :

- `/` — landing page du projet ;
- `/demo/` — vue projecteur de la comparaison ;
- `/deck/` — deck web de neuf écrans et notes orateur ;
- `assets/downloads/le-contradicteur-deck.pptx` — version PowerPoint dérivée du
  même contenu ;
- `spec/` — spécifications arbitrées et empreintes.

Le contenu d'aperçu est de type `ui_preview`, non évaluable. La colonne de
baseline reste volontairement vide tant qu'une sortie réelle n'a pas été
capturée sur le même support. Aucun résultat expérimental n'est affirmé.

## Lancer localement

```bash
npm run serve
```

Puis ouvrir `http://127.0.0.1:4173/`.

Le site n'utilise aucune ressource distante au runtime. Il ne contient ni
champ d'import, ni appel modèle, ni clé API, ni analytics.

## Contrôler la tranche statique

```bash
npm test
```

Le test vérifie notamment le type `ui_preview`, l'absence d'identifiants des
fixtures expérimentales, l'absence de surface d'ingestion et l'absence de
ressource distante.

## Frontière de données

Régime `SANDBOX` exclusivement. Aucun deck réel, pseudonymisé ou anonymisé ne
doit entrer dans ce prototype. Les futures données de calibration seront des
fixtures écrites de zéro par le gardien du jeu de test.

Le passage à une donnée réelle suppose un environnement et une chaîne de
traitement qualifiés. Une exécution sur un ordinateur local protège une clé ;
elle ne protège pas un document envoyé à un modèle distant.

## Prochaine tranche

1. fermer les ambiguïtés de schéma consignées dans `schemas/README.md` ;
2. figer les schémas `avis-agent`, `arbitrage`, `rapport` et `run` ;
3. recevoir les trois fixtures synthétiques du gardien et leur manifeste
   d'empreintes ;
4. construire le rejeu sur un vrai objet `run` ;
5. seulement ensuite, ajouter le runner local et capturer la baseline B0.

La source de vérité des règles de construction est indiquée dans
[`spec/MANIFESTE-SPEC.md`](spec/MANIFESTE-SPEC.md).
