# Panel 3 — Synthèse pour validation Lætitia

*Session 1 — 2026-06-28. Source : `panel-3-architecte.md` (un seul expert, pas de divergences à arbitrer). Ma synthèse argumentée et l'unique point qui mérite ton attention.*

## La décision structurante — à valider en bloc

L'architecte tranche pour **hexagonal strict + intelligence d'évaluation portée par le corpus**. La phrase qui résume tout : *« le moteur ne formule pas, il sélectionne. Toute formulation de feedback est écrite en français par Lætitia dans le corpus. »*

C'est ce qui rend la promesse UX (feedback qualitatif sophistiqué, alternative défendable) **tractable sans NLP, sans LLM embarqué**. La sophistication est dans la richesse du corpus, pas dans la magie du moteur.

**Conséquence directe pour toi** : tu seras autrice de beaucoup de contenu pédagogique annoté. Chaque item du corpus porte ses propres règles d'évaluation et ses messages de feedback. C'est ce qui garantit la qualité, mais ça veut dire que **la charge de validation pédagogique sera continue, pas one-shot**. Conforme à la doctrine projet (« tout contenu validé par Lætitia avant intégration »).

## Architecture en trois étages — pour information

L'évaluation se fait à trois étages, par ordre de priorité :

1. **Règles déclaratives portées par chaque item** (~70 %) — toi qui écris ce que le moteur doit reconnaître et quel message renvoyer.
2. **Détecteurs transverses de patterns fautifs** (~20 %) — moteur générique pour les 5-7 erreurs classiques (tautologie, confusion issue/risque, conséquence seule, etc.).
3. **Comparaison à des alternatives défendables** (~10 %) — sélection dans un set fini que tu écris, pas génération.

Pas d'apprentissage automatique. Pas de tokenizer maison. Du symbolique étiqueté, robuste et explicable.

## Choix techniques structurants — figés sauf objection

Tous justifiés en détail dans la note, et tous cohérents avec la doctrine projet :

- **Stack** : TypeScript + React + Vite + `vite-plugin-singlefile` (parité Coach Objectifs).
- **Tests** : Vitest (unitaires + corpus) + Playwright (bout en bout, peu nombreux) + vitest-axe (accessibilité) + un **test Node d'isolement du domaine** comme « canari » de l'architecture hexagonale.
- **État UI** : React Context + `useReducer` local par mécanique + **Zustand** pour le seul état transverse (projection de la maîtrise). Pas Redux, pas Jotai — justifié.
- **Persistance** : LocalStorage avec **schéma versionné** (`schemaVersion: number`, migrations en chaîne, jamais de crash sur ancien format). Engagement envers l'apprenant qui revient.
- **Arborescence stricte** : `src/domain/` (TS pur, jamais d'import React) + `src/content/` (corpus externalisé Zod-validé) + `src/adapters/` (React + persistance + content-loader) + `src/app/` (composition root). Frontière physique vérifiée par `eslint-plugin-boundaries` ou `dependency-cruiser`.
- **Bibliothèque d'icônes** : Lucide (MIT, SVG inline, déjà retenu par le graphiste).
- **Polices** : inliner Inter + Source Serif 4 (Google Fonts).
- **Garde-fous craftsmanship non négociables** : test Node d'isolement vert à chaque commit ; tests d'intégrité du corpus bloquants en CI (doublons, signatures, messages français non vides).

## Le point qui mérite ton attention — engagement de production

Cette architecture rend l'outil **maintenable et évolutif sur le long terme**, conforme à la doctrine craftsmanship. Mais elle implique une **discipline de production** que tu dois assumer en connaissance de cause :

- **Écriture de corpus annoté = matière pédagogique réelle**, pas du contenu jetable. Chaque item porte ses règles et ses messages, qui sont *l'intelligence pédagogique* de l'outil. Si on rogne sur le corpus pour aller vite, le feedback dégrade et l'outil meurt (cf. alerte UX-UI Panel 2).
- **Tu écriras typiquement 10-20 items par zone DOMAINE pour atteindre la signature variée requise par la règle « consolidée par variation »**. Soit ~60-120 items pour le tronc commun complet. Par lot, c'est tractable : Lot 1a demande Triptyque + Anatomie (~20-40 items).
- **Validation continue** : à chaque vague de corpus, je te présente, tu valides en bloc comme on l'a fait sur Coach Objectifs. C'est cohérent avec ta pratique.

C'est le **vrai coût** de la qualité promise. À toi de confirmer que c'est acceptable. Alternative paresseuse (que je déconseille) : feedback générique au moteur, qualité d'évaluation médiocre, outil qui meurt vite.

## Décisions à consigner dans DECISIONS.md

Une fois ta validation reçue, je consigne :
- **D14** — Architecture hexagonale + intelligence dans le corpus + stack technique.
- **D15** — Stratégie d'évaluation à trois étages (règles déclaratives item + détecteurs transverses + alternatives défendables).
- **D16** — Engagement de tests bloquants (canari d'isolement + intégrité corpus).
- **D17** — Choix d'état UI (Zustand + Context + useReducer).
- **D18** — Persistance LocalStorage versionnée.

## Ce qui se passe ensuite

- Tu valides ce panel (ou amendes).
- Je crée les bases techniques du projet : `package.json`, `tsconfig.json`, `vite.config.ts`, l'arborescence `src/`, les configurations Vitest/Playwright/ESLint avec les boundaries hexagonales en garde-fou.
- Je crée le **test Node d'isolement** comme tout premier test, pour ancrer l'invariant dès le début.
- Je crée les **value objects et ports** du domaine, sans implémentation des services (juste les types).
- Tu valides cette première mise en place.
- Puis on commence le **Lot 1a — Le Tri** : moteur + corpus + UI.

Aucun écran ni aucune ligne de logique métier avant ces étapes. C'est la discipline imposée par la doctrine.
