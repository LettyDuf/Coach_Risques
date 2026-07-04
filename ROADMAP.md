# Coach Risques — ROADMAP V1

État : brouillon de cadrage, à valider par Lætitia.

## Promesse de l'outil

Apprendre à une équipe Lean-Agile francophone à **distinguer Enjeu / Risque / Issue**, à **rédiger un risque qui tient debout** (cause → événement → conséquence, probabilité × impact, traitement), et à **présenter une réduction de risque comme une valeur livrée** en Sprint Review ou PI System Demo (avec garde-fou : artefact inspectable).

## Périmètre V1 (in)

**Découpage en modes et exercices à concevoir par panel d'experts** (pédagogue, créateur de jeux, UX-UI, graphiste). Pas de parité a priori avec Coach Objectifs : la pédagogie du risque est différente de celle de l'objectif. Le panel produit, Lætitia valide, j'intègre.

**Lot 1 — Tronc commun** *(socle universel, livrable seul)*
Matière à enseigner (cf. `DOMAINE.md` §1 à §6) :
- Triptyque Enjeu / Risque / Issue (faux-ami).
- Anatomie d'un risque (cause / événement / conséquence).
- Évaluation probabilité × impact.
- Stratégies de traitement (éviter / réduire / transférer / accepter).
- Indicateurs leading vs lagging.
- Pilier : réduction de risque comme valeur livrée, avec garde-fou artefact inspectable.

Découpage en modes (Théorie / S'entraîner / Composer / Analyser / Défi etc.) et nombre d'exercices : **à arrêter par le panel pédagogique**.

**Lot 2 — Module Sprint** *(équipe, granularité courte)*
- Risques techniques, dépendances, capacité, livrable Sprint.
- Spécificité : artefact inspectable Sprint Review (spike, prototype, test).
- Même architecture que Lot 1, corpus spécialisé.

**Lot 3 — Module PI (SAFe)** *(programme, granularité moyenne)*
- Risques inter-équipes, hypothèses d'architecture, ROAM (Resolved/Owned/Accepted/Mitigated).
- Spécificité : présentation en PI System Demo, suivi entre PI.
- Même architecture que Lot 1, corpus spécialisé.

**Lot 4 — Module OKR / produit** *(stratégique, long terme)*
- Risques marché, hypothèses business, *Real Options* (Matts & Maassen).
- Spécificité : risque comme apprentissage produit.
- Même architecture que Lot 1, corpus spécialisé.

## Hors-scope V1

- Cartographie de risques d'entreprise (ERM, COSO).
- Quantification financière (VaR, simulations Monte-Carlo).
- Intégration outils tiers (Jira, Azure DevOps, registres de risques d'entreprise).
- Module multi-utilisateur, partage, persistance distante.
- Exports formatés (PDF du registre, etc.).

## Séquençage

Tronc commun complet d'abord, utilisable en autonomie. Puis Sprint, PI, OKR par incréments testés. Chaque lot inclut son corpus validé par Lætitia avant intégration.

## Critères de fin V1

- Les 4 lots livrés, chacun avec ses 5 mini-exercices + Défi + Composer + Analyser.
- Corpus validés en bloc par Lætitia (comme pour Coach Objectifs).
- Architecture hexagonale respectée : domaine TS pur, pas d'import React.
- Tests d'intégrité corpus en place (équilibrage, doublons, libellés).
- Build stable, déployable en single-file HTML (parité Coach Objectifs).
