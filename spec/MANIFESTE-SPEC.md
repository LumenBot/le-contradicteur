# Manifeste de spécification — Le Contradicteur

**Généré le 2026-08-21T09:54:21Z** (UTC, horloge du poste de génération).

*Les documents datent leur contenu du « 20 août », qui désigne la séance de travail du run à blanc. Les dates de modification des fichiers s'en écartent : c'est normal, et c'est pour ça que ce manifeste porte un horodatage exact plutôt qu'une date de séance.*

---

## Pourquoi ce fichier

Un désaccord factuel est survenu au dixième tour de revue : deux phrases signalées dans deux fichiers, avec leurs empreintes SHA-256 ; les mêmes empreintes, calculées de notre côté, sur des fichiers où `grep` ne trouvait pas ces phrases.

**Ce qu'on peut en dire, et rien de plus** : deux observations incompatibles ont été rapportées. Le contenu et son empreinte n'ayant pas été capturés dans une même opération, il n'est pas établi qu'elles portaient sur le même état du fichier. La cause n'a pas été instruite et ne le sera pas.

*Formulation corrigée en revue. La première version de ce paragraphe écrivait « les octets sont identiques, les lectures divergent » — c'est-à-dire qu'elle affirmait comme un fait ce que l'incident n'avait justement pas permis d'établir, dans le document créé pour régler ce problème précis.*

Ce qui compte est la conclusion : **il n'y avait pas de source de vérité désignée.** Sans elle, une erreur de lecture, une modification concurrente et une correction non promue se ressemblent — et se corrigent différemment.

---

## Où est la source de vérité

Les spécifications ont été promues dans `/spec` au commit Git
`8dfdc876cdd0f5ee82bdb21d6ccf91751e1476ed` de la branche
`feat/landing-demo-deck`. Ce commit est la source de vérité jusqu'à son intégration
dans `main`. Les fichiers locaux d'origine sont redevenus des brouillons.

Toute remarque de revue cite ce commit — ou le commit ultérieur de `main` qui
intègre ces fichiers à l'identique — et, si elle vise un fichier précis, son
empreinte indiquée ci-dessous.

---

## 1. Spécifications exécutables — font foi pour construire

| `01-arbitrage-et-personas.md` | `d0d36b64f8bc66b94720d1bf3789eea1b189b051e3b1ad2ec7ea560cb6cf6510` | 29400 |
| `02-format-de-sortie.md` | `b1cbe5bb50315705ad69cf9c6be6213494a2e2857bdc3bc8cca0a2cd22d4f2fa` | 11355 |
| `03-brief-demonstrateur-sol46.md` | `9a6ad76c7cb1b46695923c276433a0291cd4307d2782d8ea1bcdd42772480b3c` | 27369 |
| `04-seuil-de-divergence.md` | `071b8c0071990d8e5f6e61bf43e99806684e3aa3e5c362b633a6f2d09340d822` | 22928 |
| `05-plan-revise-et-roles.md` | `8a0092c516f2d69a984e9cf9b661a1bec621e9a631b41b97bf894c104a60e942` | 9202 |
| `08-fiche-de-faits.md` | `e103e9cc85a31f3c5b2ef831212fe21f071a21001d03113818772a5fa43b3d8d` | 7243 |
| `11-frontiere-demo-production.md` | `2dd9da2c2567bbcc4ef050abd1f4dd102b5470decf19b4db92fa09b1d24e5c08` | 16098 |

## 2. Traces d'arbitrage — canoniques pour les décisions, **non exécutables**

| `07-arbitrage-retour-sol46.md` | `25c289907be0e9df6aa3f8770d23735057d6abe9a72ab49189526221734faeeb` | 28990 |
| `09-pivot-pitch-deck.md` | `3a23b2669c259e36ed78ccfc6842cfba832dc95b6e0f572c19c4268b0e8392c6` | 10109 |

Ces deux fichiers sont **chronologiques par construction** : ils conservent les formulations successives et leurs corrections. `07` révise la chute du pitch trois fois de suite ; `09` énonce une règle puis l'amende dix lignes plus bas.

**Conséquence à respecter** : on n'y prélève jamais une règle. Une phrase y lue peut être une version corrigée quelques lignes plus loin. Ils servent à savoir *pourquoi* une décision a été prise, jamais *ce qu'il faut faire*.

**Règle générale qui en découle** : dans un fichier exécutable, une formulation périmée se supprime ou se barre — elle ne reste jamais lisible comme une consigne. Seuls les fichiers de trace gardent la chronologie.

## 3. Traces historiques — ne font foi de rien

| `06-prompt-demarrage-sol46.md` | `c8cc59322228046d9dbf79f6a922427c3f2ee3efeb7b65b4747c31a777cd35e8` | 12954 |
| `10-reponse-sol46-pivot.md` | `7aba06062dd7243b233d61359e8a8b66ea61c11ada8c72868b50b3f99426544c` | 9252 |

`06` est le prompt de démarrage envoyé le 20/08 ; plusieurs de ses formulations sont périmées et il ne doit pas être renvoyé. `10` est une réponse de conversation, conservée pour la traçabilité du raisonnement.

---

## Vérifier

```
cd 30-projets/qamp-le-contradicteur/10-travail/TACHE-20260820-01-claude
shasum -a 256 *.md
```

Une empreinte qui diffère signifie que le fichier a changé depuis la génération. **Le manifeste est alors périmé, pas le fichier** — il se régénère, il ne se corrige pas à la main.

Une lecture et une empreinte doivent être **capturées dans la même opération**. C'est l'enseignement direct de l'incident : deux mesures prises à deux instants ne décrivent pas nécessairement le même objet.

---

## Promotion dans le dépôt

À faire par Blaise ; nous n'avons pas les accès en écriture.

```
git clone https://github.com/LumenBot/le-contradicteur
cd le-contradicteur && mkdir -p spec
SRC="<...>/TACHE-20260820-01-claude"
cp "$SRC"/{01,02,03,04,05,08,11}-*.md spec/          # exécutables
cp "$SRC"/{07,09}-*.md spec/traces/                   # à créer, non exécutables
cp "$SRC"/MANIFESTE-SPEC.md spec/
shasum -a 256 spec/*.md spec/traces/*.md > spec/SHA256SUMS
git add spec && git commit -m "spec: version arbitrée, 10 tours de revue croisée"
git push
```

Une fois poussé, mettre à jour la section « Où est la source de vérité » de ce manifeste et le repousser dans le même mouvement.
