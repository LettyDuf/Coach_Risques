# Les Briques — synthèse du Panel 4 (pédagogue + game designer)

**À valider par Lætitia.** Deux notes croisées sur la conception de la mécanique « Les Briques » (nouvelle mécanique de la zone Anatomie, à côté du Détective).

## Convergences fortes (figées sauf objection)

1. **Trois briques distinctes**, une par composant du risque (Cause, Événement, Conséquence). Pas d'unification en un seul exercice.
2. **Format d'interaction différent par brique** (pas de clone du Tri).
3. **Ton adulte, pas d'infantilisation**. Aucun « Bravo », aucun « Faux ». Feedback structuré §5 UX-UI (filet 3px teal si juste, trait 3px gauche `--risk-alerte` si à revoir).
4. **Pas de compteur explicite** type « 2/3 » (interdit D10).
5. **Nombre d'items** : entre 5 et 8 par brique. Durée totale 2-3 min les trois enchaînées.
6. **Les Briques seules ne suffisent pas à passer Anatomie à « acquise »** — c'est le Détective qui reste le gate. Les Briques valent *travaillée* au maximum.

## Arbitrages consolidés (ma proposition à valider)

| | Format retenu | Rationale |
|---|---|---|
| **Cause — « Le facteur »** | **Discrimination binaire côte à côte** (GD). 2 énoncés, l'apprenant clique celui qui est une cause. 6-8 items. | Format le plus rapide et adapté à un warm-up. La grille multiple du pédagogue est plus riche mais plus lourde. On garde la richesse en variant les *paires* (cause vs constat / cause vs événement / cause vs conséquence antériorisée). |
| **Événement — « Au conditionnel »** | **Correction du verbe fautif via menu** (GD). Une phrase, l'apprenant clique le verbe mal conjugué, un menu de 2-3 conjugaisons candidates s'ouvre, il choisit la bonne. 5-6 items. | Production guidée mais sans saisie libre à évaluer sémantiquement. Répond à l'exigence pédagogique d'*imprimer le geste* du conditionnel sans les coûts techniques de la reformulation libre. |
| **Conséquence — « Et alors ? »** | **Tri à 3 casiers** (GD, catégories réajustées). Une carte-phrase apparaît au centre, l'apprenant la range dans « peur ou tautologie » / « observable non mesurable » / « mesurable ». Casiers verticaux (pas 2×2) pour se distinguer du Tri. 6 items. | Fusion des deux propositions : le format du GD (tri) + les pièges du pédagogue (peur, tautologie, observable, mesurable). Les 3 casiers couvrent les anti-patterns DOMAINE §2 sans dupliquer le Tri. |

## Séquence recommandée

**Cause → Conséquence → Événement.**

Contre-intuitif linguistiquement mais **justifié cognitivement** par le pédagogue : la cause est la porte d'entrée la plus abordable (jugement sémantique frontal, sans conjugaison). La conséquence mobilise un registre analytique (mesurabilité) que l'apprenant Lean-Agile connaît. L'événement, verrou du conditionnel, arrive en dernier — il est le plus coûteux cognitivement et gagne à être abordé quand les deux ancrages voisins sont installés.

## Enchaînement et sortie

- **Enchaînement automatique** des 3 briques par défaut (le GD tient à ce rythme court, 2-3 min sans coupure).
- **Sortie possible** à tout moment via « Revenir à Anatomie » discret en haut à droite. Pas de confirmation.
- **Fil de trois traits horizontaux** sous le titre pour matérialiser la progression sans compteur : trait 1 teal si brique 1 faite, trait 2 marine si brique 2 active, trait 3 gris si brique 3 à venir. Aucun libellé « 2/3 ». La forme suffit.
- **Après la brique 3**, retour automatique à l'écran d'entrée Anatomie avec proposition douce : « Maintenant, essayez Le Détective ».

## Signature visuelle (deux micro-interactions, pas plus)

1. **Le settle 240ms** — quand la case retenue est juste, elle descend 2px puis remonte 1px (ease-out puis ease-in). Métaphore : la brique trouve sa place. Utilisé identique sur les 3 briques.
2. **La respiration latérale 400ms** — sur le passage d'une brique à la suivante, le trait horizontal correspondant à la brique achevée passe de marine à teal, avec glissement horizontal d'un tiers de largeur.

**Interdits explicites Briques** (en plus des interdits D10 déjà globaux) : pas de barre de vies, pas de chrono caché, pas de « il vous reste N essais », pas d'introduction infantilisante type « On y va doucement ! », pas de rejouer-pour-battre-son-score. `--risk-reveal` cyan reste réservé au futur Brouillard se lève.

## Critères de complétion (par brique)

- **Le facteur (Cause)** : 2 séries consécutives à 100 % sur 6-8 items. Complétion → passe *effleurée* sur Anatomie.
- **Au conditionnel (Événement)** : 5/6 corrections justes. Complétion → passe *effleurée*.
- **Et alors ? (Conséquence)** : 5/6 tris justes, avec au moins un item de chaque catégorie rencontré. Complétion → passe *effleurée*.

Le passage à *travaillée* sur Anatomie se déclenche quand les 3 briques ont été complétées au moins une fois. *Consolidée* n'est possible qu'en jouant Le Détective sur signatures variées.

## Corpus à écrire (V1)

- **Le facteur** : 8 paires (Cause vs Constat / Cause vs Événement / Cause vs Antécédent narratif).
- **Au conditionnel** : 6 phrases avec un verbe fautif + 2 candidats plausibles à côté du bon.
- **Et alors ? — Conséquence** : 6 conséquences à trier, couverture des 3 catégories.

Total ≈ 20 items pour V1. Lætitia valide en bloc.

## Ce qui se passe si tu valides

1. Je consigne les décisions (D20 mécanique Les Briques + D21 séquence Cause/Conséquence/Événement + D22 règle consolidation Anatomie).
2. Je mobilise un sous-agent pour proposer un corpus TI cohérent avec la doctrine, tu valides.
3. J'implémente : types Zod, service `BrickEvaluator` (pur domaine), UI `BricksBoard.tsx`, écran d'entrée Anatomie avec choix Briques/Détective.
4. Tests d'intégrité corpus + UI + a11y.
5. Rebuild HTML.
