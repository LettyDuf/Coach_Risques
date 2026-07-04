# Coach Risques — STATUS

Rituel de continuité de session. À mettre à jour en clôture de chaque session.

## Session — 2026-07-04 — Charte cabinet appliquée au Tri

### Fait
- **Mockups itératifs v1 → v10** validés visuellement par Lætitia. Le v10 fige : plateau sauge, carte-énoncé parchemin 360×490 cadre or, corps Lora 24 px, cibles biseautées avec seaux héraldiques (titres IM Fell English SC 34 px, hints Lora italique 18 px), pile de tirage à gauche, animation d'arrivée de carte.
- **Tokens cabinet ajoutés** dans `src/app/tokens.css` (bloc `--cabinet-*`) : palette sauge (plateau, page), papier vergé, encres (dont accent cuivré « risque »), or antique, cibles catégorielles, duo IM Fell + Lora, grains SVG (plateau/parchemin/target). Sans casser les tokens `--risk-*` existants.
- **Polices Google Fonts** ajoutées à `index.html` : IM Fell DW Pica (titres), IM Fell English SC (Small Caps), Lora (corps). Inter et Source Serif 4 conservées pour Hub et autres écrans studio.
- **`TriBoard.tsx` réécrit** en structure cabinet : header (retour + Théorie) → panneau Théorie escamotable → plateau (titre + sous-titre + « Coach Risques · le cabinet ») → grille (pile / aire-lecture / cibles) → feedback parchemin. Illustrations SVG inline pour chaque cible (coffret Enjeu, arc Objectif, tarot Risque, rocher Issue) et sceaux héraldiques (bouclier / cible / éclair / croix). Thème d'item affiché dans la bande de carte.
- **`TriBoard.css` refondu** : gradient sauge + grain, cadre or double (`inset box-shadow`), animation `card-arrive` (avec bypass `prefers-reduced-motion`), cibles clip-path biseauté avec animation d'apparition en cascade.
- **Test `TriBoard.test.tsx` adapté** : heading « Le Tri » (h1) + sous-titre pédagogique en texte simple. Les 4 autres tests restent inchangés (raccourcis, verdict, théorie, retour).
- **Suite complète verte** : 57/57 tests (11 fichiers, 3 projects domain/corpus/ui). Aucun test cassé par la refonte visuelle.
- **Build single-file** : 325 ko (91 ko gzippé). Léger surcoût (+55 ko vs 270 ko) dû aux grains SVG en base64 et aux SVG inline des illustrations, acceptable. `coach-risques.html` et `docs/index.html` régénérés.
- **`DECISIONS.md`** : ajout de **D24 — Charte cabinet appliquée au Tri en premier ; Hub différé**.

### Prochain pas
- **Faire visualiser `coach-risques.html`** à Lætitia (ouvrir en local ou pousser sur GitHub Pages) : le plateau du Tri doit avoir la même intention que le mockup v10, dans une vraie SPA fonctionnelle avec quatre cibles cliquables et la carte-énoncé alimentée par un vrai item du corpus. Ajustements typo/couleur si nécessaire après ce test réel.
- **Une fois le Tri validé en usage réel** : produire par le panel jeu-plateau un mockup **Hub cabinet** (question à trancher : hexagones sur fond sauge ou plateau distinct ?). Ne pas coder avant validation Lætitia.
- **DetectiveBoard** et **BricksBoard** : rester en charte studio actuelle jusqu'à ce que leurs mockups cabinet respectifs soient validés. Les tokens cabinet sont en place, prêts à être branchés.
- **Push GitHub** : à faire depuis le Terminal de Lætitia (contrainte sandbox).

---

## Session 1 — 2026-06-28 — Cadrage initial

### Fait
- Recherche doctrinale validée : distinction Enjeu/Risque/Issue, thèse « réduction de risque = valeur » fondée (SAFe RR&OE, Cohn, Pichler, Reinertsen, Matts/Maassen), avec garde-fou *artefact inspectable*.
- Cadrage V1 par dialogue structuré (4 questions).
- Création du dossier `coach-risques/`.
- Production des artefacts de cadrage : `ROADMAP.md`, `DOMAINE.md` (v0.1), `DECISIONS.md` (D1 à D6).

### Fait (suite)
- **Panel 1 — Pédagogie + ludification validé en bloc par Lætitia (2026-06-28)**. Grille consolidée : 4 mécaniques de jeu (Le Tri, Le Détective, Le Pari, Le Brouillard se lève) portant 6 objectifs Bloom (O1 à O6). Posture coach interne. Carte de maîtrise par zone. Procès du faux risque en mode défi optionnel. 7 interdits ludiques non négociables.
- `DOMAINE.md §8` réécrit avec la grille validée + §10 mis à jour.
- `DECISIONS.md` augmenté de D9 (découpage pédagogique) et D10 (interdits ludiques).

### Fait (suite)
- **Panel 2 validé en bloc par Lætitia (2026-06-28)**. Hub-and-spoke + Carte hexagonale 2×3 + 4 états qualitatifs ; duo typographique Inter + Source Serif 4 (test borné, fallback Inter Semibold) ; palette risque doctrinale triple-encodée ; cyan réservé au Brouillard se lève ; découpage Lot 1a / 1b ; Procès du faux risque en onglet secondaire.
- `UX-UI.md` créé (spécification complète et source de vérité).
- `DECISIONS.md` augmenté de D11 (architecture UX), D12 (système visuel), D13 (découpage Lot 1a/1b).

### Fait (suite)
- **Panel 3 validé en bloc par Lætitia (2026-06-28)**.
- `DECISIONS.md` augmenté de D14 (architecture+stack), D15 (évaluation 3 étages), D16 (canari+intégrité corpus), D17 (état UI), D18 (persistance versionnée).
- **Bases techniques posées** : package.json (React 18 + Vite + vite-plugin-singlefile + Vitest + Zustand + Zod + Lucide), tsconfig + tsconfig.node, vite.config (alias `@domain` `@content` `@adapters` `@app`), vitest.config (3 projects : domain / corpus / ui), ESLint avec **boundaries hexagonales** (`src/domain/**` interdit d'importer React, navigateur, Zustand, adaptateurs), .gitignore, README.md, index.html minimal.
- **Arborescence `src/`** créée selon spec architecte (domain/{entities,valueObjects,services,detectors,ports,engine} + content/{triage,chain,pari,brouillard,theory} + adapters/{ui/{hub,mechanics,shared,hooks},persistence,content-loader} + app + tests/{domain,corpus,ui,e2e,a11y}).
- **Value objects + ports implémentés** (types seuls, pas d'impl moteur) : ids (brand types), RiskFormulation, TriageVerdict, Criticality (avec computeZone), TreatmentChoice, ReviewFormulation, ComponentFeedback, Mastery + ports RiskCoachEngine, ContentRepository, MasteryStore, RandomSource, Clock. Barrel `@domain/index`.
- **Canari Node d'isolement implémenté** (`tests/domain/canary-isolation.test.ts`) : 5 tests, instancie un stub engine avec fakes, vérifie typeof window/document/localStorage === "undefined". Garde-fou D16.
- **Vérification** : `npx tsc --noEmit` vert ; `npx vitest run --project domain` : 5/5 tests passent.

### Fait (suite — Lot 1a, partie 1)
- **Placeholder visualisable** créé (`coach-risques.html`, 148 ko, single-file). Tokens UX/UI appliqués.
- **Structures techniques Triage posées** : `semanticTags.ts` (14 tags fermés), `triage/types.ts` (TriageItem étend ContentItem), `triage/schema.ts` (Zod + échec bruyant), `triage/items.ts` (fixture technique en attente du corpus validé), `TriageEvaluator.ts` (service pur — sélectionne les messages, ne formule jamais), `JsonContentRepository.ts` (validation Zod + refus doublons).
- **Tests verts** : canari (5), TriageEvaluator (4), intégrité corpus (7) = 16/16. Les 2 derniers tests d'intégrité (équilibrage verdicts, diversité signatures) sont en bypass tant qu'on est sur fixture seule ; ils s'activent à l'intégration du corpus validé.
- **Proposition de corpus Triage Vague 1** rédigée (`proposition-corpus-triage.md`, 18 items équilibrés sur 4 verdicts × 9 signatures × 6 thèmes, par sous-agent pédagogue + Lean-Agile + linguiste) — **en attente de validation Lætitia**.

### Fait (suite — Lot 1a, partie 2 : Le Tri jouable)
- **Corpus Triage Vague 1 (18 items) validé en bloc par Lætitia et intégré**. Les 7 tests d'intégrité passent (équilibrage 4 verdicts, 9 signatures distinctes, 6 thèmes).
- **Engine** : `MasteryProgressor` (règle 4 états par variation), `RiskCoachEngineImpl` (Le Tri implémenté, autres mécaniques retournent "non implémenté" propre, projection MasteryState par zone, nextItem favorise les signatures peu vues).
- **Adaptateurs persistance** : `SystemClock`, `BrowserRandomSource` + `SeededRandomSource`, `InMemoryMasteryStore`, `LocalStorageMasteryStore` versionné (`schemaVersion: 1`, migrations en chaîne, fallback InMemory si LocalStorage indisponible).
- **Composition root** (`src/app/composition.ts`) — branche tout.
- **EngineProvider** + hook `useEngine` (React Context).
- **Hub.tsx + Hub.css** : Carte de maîtrise hexagonale 2×3, SVG `polygon` avec anneau de progression `stroke-dasharray` (pathLength=100). Triptyque actif, 5 autres désactivés "Bientôt".
- **TriBoard.tsx + TriBoard.css** : 4 zones quadrant 2×2 colorées par sémantique, raccourcis clavier 1/2/3/4, feedback immédiat structuré (filet teal pour ok, trait alerte gauche pour miss), "Voir le pourquoi" pour révéler rationale.
- **App.tsx** : routing manuel ultra-simple entre Hub et TriBoard.
- **Build** : `npm run build` ajusté (`rimraf dist && vite build --outDir dist`) pour contourner EPERM connu. **HTML produit : 230 ko (69 ko gzippé)**.
- **Tests** : 16/16 verts (canari, TriageEvaluator, intégrité corpus).

### Fait (suite — Lot 1a, partie 3 : polissage)
- **Feedback rendu évident** : verdict tag « JUSTE / À REVOIR » coloré, mise en évidence des zones (correct = halo teal, choix faux = halo rouge, autres grisées), badges « Bonne réponse » / « Votre choix ».
- **Panneau Théorie escamotable** ajouté, ouvert au premier passage (LocalStorage UI `tri-intro-seen`), fermé par défaut ensuite.
- **Refonte pédagogique de la théorie** : passage d'un mini-cours verbeux à une table compacte 4 cartes avec triple ancre (question + essence + repère temporel). Itérations sur la formulation Enjeu jusqu'à « une valeur à préserver » (lever tautologie « valeur en jeu » et ambiguïté « bien »/produit). Phrase d'amorce qui commence directement par *« L'enjeu est une valeur à préserver, le risque est ce qui pourrait l'affecter, l'issue est ce qui l'a déjà affectée. »*
- **Purge tirets longs et anglicismes** dans tous les textes utilisateur visibles UI (textes + aria-labels).
- **Tests UI** ajoutés : `tests/ui/Hub.test.tsx` (4 tests), `tests/ui/TriBoard.test.tsx` (5 tests), `tests/ui/test-utils.tsx` (helper `renderWithEngine`).
- **Tests d'accessibilité** ajoutés : `tests/ui/a11y.test.tsx` (vitest-axe sur Hub et TriBoard, 0 violation). Garde-fou D16 désormais en place sur le Lot 1a.
- **27 tests verts au total** : 5 canari + 4 TriageEvaluator + 7 intégrité corpus + 4 Hub + 5 TriBoard + 2 a11y.

### Lot 1a — État : complet techniquement, validation pédagogique en cours
Reste : tester en réel sur plusieurs sessions (observer évolution maîtrise), ajustements éventuels du corpus.

### Fait (suite — Lot 1b, partie 1 : Le Détective jouable)
- **Corpus Détective Vague 1 (8 items) validé en bloc par Lætitia et intégré** : distribution 3 cause / 3 event / 2 consequence révélés, 6 signatures distinctes, 6 thèmes. 9 tests d'intégrité corpus passent.
- **ChainDiagnoser** (service de domaine) : évaluation de FORME par composant (longueur min, conditionnel obligatoire pour l'événement, anti-patterns de tautologie). 6 tests unitaires.
- **Engine étendu** : port `registerOutcome` enrichi de l'`itemId` pour récupérer la signature pédagogique (règle « consolidée par variation » fonctionne désormais correctement). `diagnoseChain` implémenté. `nextItem` étend `pickNextByLeastSeenSignature` (générique) au DETECTIVE.
- **DetectiveBoard.tsx + CSS** : scénario en encart, 3 cases (1 donnée en lecture seule + 2 textareas), bouton « Évaluer la chaîne » désactivé tant que les 2 cases ne sont pas remplies (min 10 caractères). Panneau de comparaison côte à côte (votre chaîne ↔ formulation défendable) + points de forme + détails (« voir le pourquoi ») + auto-évaluation « j'ai compris / à revoir ».
- **JsonContentRepository** : charge désormais TRIAGE_ITEMS et CHAIN_ITEMS avec validation Zod par mécanique.
- **App.tsx** : route DETECTIVE ajoutée. **Hub** : zone Anatomie activée.
- **47 tests verts** : 5 canari + 4 TriageEvaluator + 6 ChainDiagnoser + 7 intégrité Triage + 9 intégrité Chain + 4 Hub + 5 TriBoard + 4 DetectiveBoard + 3 a11y.
- **Build single-file** : 270 ko (79 ko gzippé).

### Prochain pas — suite du Lot 1b
- Tester en réel sur plusieurs items du Détective (observer la maîtrise Anatomie évoluer dans le Hub).
- **Le Pari** (O4 + O5) : matrice 5×5 vivante + auto-évaluation comparée.
- **Le Brouillard se lève** (O6) : moment-signature avec animation sobre.
- **Procès du faux risque** : mode défi transverse, onglet secondaire du Hub.
- Théorie §3-§6 à enrichir.
- Possibilité d'écran « Théorie complète » accessible depuis le Hub.

### Décisions structurantes prises
Voir `DECISIONS.md` (D1 à D18).
