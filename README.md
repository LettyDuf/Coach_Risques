# Coach Risques

**Outil pédagogique pour apprendre à rédiger et formuler des Risques.**
Pour les équipes Lean-Agile francophones (Scrum, SAFe, OKR) qui veulent
distinguer proprement enjeu, objectif, risque et issue, puis reconstituer
des chaînes de risque qui tiennent debout.

[![Licence : CC BY-SA 4.0](https://img.shields.io/badge/Licence-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/deed.fr)

## Essayer l'outil en ligne

👉 **[Lancer Coach Risques](https://lettyduf.github.io/Coach_Risques/)**

L'outil est une application web statique (aucune installation, aucune
donnée envoyée à un serveur, tout tourne dans votre navigateur).

## Ce que fait l'outil (V1a + début V1b)

Deux mécaniques déjà jouables sur le tronc commun :

- **Le Tri** — discrimination enjeu / objectif / risque / issue.
  18 items validés, quatre pièges pédagogiques distincts (faux-ami
  enjeu/issue, tautologie « risque de ne pas... », confusions
  enjeu/objectif, etc.). Feedback ciblé et panneau Théorie compact.
- **Le Détective** — reconstitution d'une chaîne
  cause → événement → conséquence. 8 items, saisie libre, comparaison
  côte à côte avec une formulation défendable écrite par un expert,
  auto-évaluation comparée.

Prévu ensuite : Le Pari (matrice 5×5 vivante), Le Brouillard se lève
(réduction de risque comme valeur en revue), Procès du faux risque
(mode défi transverse).

## Doctrine

L'outil s'appuie sur :

- **ISO 31000** et **PMBOK** pour les définitions opérationnelles du
  risque.
- La tradition francophone (**AFITEP**, Maders) pour le triptyque
  pédagogique Enjeu / Objectif / Risque.
- **Panel d'experts** mobilisé à chaque étape de conception (pédagogue,
  game designer, UX-UI, direction artistique, architecte logiciel).
  Voir dossier `audits/`.

Le corpus pédagogique est écrit et validé par une coach Lean-Agile
expérimentée, pas généré. La sélection des feedbacks se fait par
règles déclaratives portées par les items (aucun NLP embarqué).

## Architecture

Hexagonale stricte : le domaine (`src/domain/`) est un module TypeScript
pur, sans dépendance à React ni au navigateur. L'UI (`src/adapters/ui/`),
la persistance (`src/adapters/persistence/`) et le corpus
(`src/content/`) sont des adaptateurs branchés à un composition root
(`src/app/composition.ts`).

Un test « canari » en Node garantit à chaque commit que le domaine reste
instanciable sans navigateur.

```
src/
  domain/       # cœur métier (TS pur)
  content/      # corpus pédagogique externalisé, validé Zod
  adapters/     # UI React, persistance LocalStorage, content-loader
  app/          # composition root
tests/
  domain/       # unitaires + canari d'isolation hexagonale
  corpus/       # intégrité du corpus (bloquants en CI)
  ui/           # jsdom + accessibilité axe
```

## Développement local

Pré-requis : Node 18+ et npm.

```bash
npm install       # dépendances
npm run dev       # serveur Vite sur http://localhost:5173
npm test          # tous les tests (canari, unitaires, intégrité, UI, a11y)
npm run build     # build single-file HTML dans dist/ et docs/
```

Le build produit un **HTML autoporté** (`docs/index.html`, environ 270 ko
avec CSS et JS inlinés). C'est ce fichier qui est servi par GitHub Pages.

## Documentation du projet

- `DOMAINE.md` — source de vérité pédagogique (validée)
- `UX-UI.md` — spécification UX/UI (validée)
- `ROADMAP.md` — périmètre V1 et lots de livraison
- `DECISIONS.md` — décisions structurantes argumentées (D1 à D19)
- `STATUS.md` — état d'avancement, mis à jour à chaque session
- `audits/` — notes des panels d'experts
- `proposition-corpus-*.md` — corpus soumis à validation

## Licence

Ce projet est distribué sous licence [Creative Commons
Attribution-ShareAlike 4.0 International (CC BY-SA
4.0)](https://creativecommons.org/licenses/by-sa/4.0/deed.fr).

Vous pouvez le partager, l'adapter, l'utiliser y compris commercialement,
à deux conditions : (1) créditer l'auteure originale, (2) diffuser vos
adaptations sous la même licence.
