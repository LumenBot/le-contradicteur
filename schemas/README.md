# Schémas

Cette première tranche ne définit que `ui-preview.schema.json`. Il sépare la
maquette visuelle d'un futur objet `run` : l'aperçu ne porte ni identifiant de
fixture expérimentale, ni trace réseau, ni résultat mesurable.

Les schémas `avis-agent`, `sortie-arbitre`, `rapport-final` et `run` seront figés
avant le runner. Quatre points restent à arbitrer dans les spécifications :

1. la priorité de `silence → INSTRUCTION INSUFFISANTE` sur certaines conditions
   propres aux personas ;
2. la disparition définitive de l'ancienne syntaxe spéciale `ABSENCE` ;
3. l'invariant proposé `BLOQUANT ⇒ INSTRUCTION SUFFISANTE` ;
4. l'exclusion du type `ui_preview` de toute allowlist de fixtures exécutables.
