# Note d'architecture — Coach Risques

**À l'attention de :** Lætitia, conseillère Lean-Agile décideuse
**De :** Panel 3 — Architecte logiciel
**Objet :** Structure logicielle au service de la grille pédagogique §8 et de l'UX hub-and-spoke validée
**Date :** 2026-06-28

---

## 1. Cartographie hexagonale

Le cœur métier de Coach Risques n'est pas l'évaluation d'une réponse — c'est la **représentation typée d'un risque et de ses composants**, et la **production d'un feedback structuré par composant** à partir d'un item du corpus et d'une production apprenant. Tout le reste (drag-and-drop, hexagones, animation du brouillard, persistance) est péri-domaine.

**Entités** (identité stable, cycle de vie) :
- `LearningSession` — agrège l'état de progression de l'apprenant à travers les zones de maîtrise. Identité = id de session locale.
- `MasteryRecord` (par zone DOMAINE) — accumule les passes réussies sur items variés, calcule l'état qualitatif (4 niveaux).

**Value objects** (immuables, égalité structurelle) :
- `RiskFormulation { cause, event, consequence }` — la production canonique §2.
- `TriageVerdict` — l'un de `Enjeu | Objectif | Risque | Issue`.
- `Criticality { probability: 1..5, impact: 1..5, zone: C1..C5 }`.
- `TreatmentChoice { strategy: Eviter|Reduire|Transferer|Accepter, rationale: string }` (ROAM en sous-type pour le module PI).
- `ReviewFormulation` — les 5 champs canon §6 (résumé, réduction obtenue, artefact, coût, reste à faire).
- `ComponentFeedback { component, verdict, message, defensibleAlternative? }` — la brique élémentaire de tout retour.
- `EvaluationResult { feedbacks: ComponentFeedback[], outcome: 'success' | 'partial' | 'miss' }`.

**Services de domaine** (logique stateless) :
- `TriageEvaluator`, `ChainDiagnoser`, `CriticalityArbiter`, `TreatmentReasoner`, `RiskReductionFramer`, `MasteryProgressor`.

**Ports d'entrée (driving)** — ce que l'UI demande au domaine :

```ts
interface RiskCoachEngine {
  evaluateTriage(itemId: ItemId, verdict: TriageVerdict): EvaluationResult;
  diagnoseChain(itemId: ItemId, produced: Partial<RiskFormulation>): EvaluationResult;
  arbitrateCriticality(itemId: ItemId, placed: Criticality, context: ContextLever): EvaluationResult;
  reasonTreatment(itemId: ItemId, choice: TreatmentChoice): EvaluationResult;
  frameReviewValue(itemId: ItemId, artifact: ArtifactKind, formulation: ReviewFormulation): EvaluationResult;
  nextItem(mechanic: MechanicId, mastery: MasteryState): ContentItem;
  registerOutcome(zoneId: ZoneId, outcome: EvaluationResult): MasteryState;
  getMasteryByZone(): ReadonlyArray<{ zone: ZoneId; level: MasteryLevel; nourishedBy: MechanicId[] }>;
}
```

Une seule façade, des opérations explicites et typées. L'UI ne devine rien.

**Ports de sortie (driven)** :
- `ContentRepository` — accès au corpus (items annotés, théorie, alternatives défendables).
- `MasteryStore` — lecture/écriture de l'état de progression.
- `RandomSource` — injecté pour rendre le tirage testable (jamais `Math.random()` dans le domaine).
- `Clock` — pour horodater les passes (utile aux tests de consolidation par variation).

**Adaptateurs** :
- *Driving* : adaptateur UI React qui consomme `RiskCoachEngine`.
- *Driven* : `JsonContentRepository` (corpus en TS/JSON bundlé), `LocalStorageMasteryStore` (V1), `SeededRandomSource` en tests.

Le point d'entrée hexagonal n'autorise aucun raccourci : l'UI ne lit jamais directement un JSON de corpus, le domaine ne touche jamais `window.localStorage`.

---

## 2. Modèle de domaine par mécanique

**Le Tri (O1)** : objet central `TriageItem { id, statement, expected: TriageVerdict, rationale, distractors }`. La production apprenant est un `TriageVerdict`. L'évaluation est binaire mais le message est qualitatif et **vient de l'item**, pas du moteur.

**Le Détective (O2+O3)** : objet central `ChainItem { id, scenario, revealed: Partial<RiskFormulation>, expected: RiskFormulation, defensibleVariants: RiskFormulation[], traps: TrapPattern[] }`. La chaîne est un value object `RiskFormulation` à trois champs ; le moteur évalue **composant par composant**.

**Le Pari (O4+O5)** : objet central `RiskCase { id, statement, baselineCriticality, contextLevers: ContextLever[], defensiblePlacements: Map<ContextLever, Criticality[]>, defensibleTreatments: TreatmentChoice[] }`. La criticité est contextuelle — l'item porte plusieurs placements défendables selon le levier. Le moteur consigne la **cohérence argument↔choix**, pas l'alignement à une vérité unique (cf. UX §3 Pari).

**Le Brouillard se lève (O6)** : objet central `RiskReductionCase { id, initialRisk, initialCriticality, validArtifacts: ArtifactKind[], reviewTemplate: ReviewFormulation, defensibleReviews: ReviewFormulation[] }`. La conclusion saisie est obligatoirement non triviale (garde-fou anti cargo-cult validé en règle déclarative).

**Carte de maîtrise** : `MasteryRecord` calcule l'état (`Non commencée → Effleurée → Travaillée → Consolidée`) par une règle déterministe « consolidée = N réussites stables sur items *de signature différente* », la signature étant un champ porté par l'item (`{ trapPattern, theme }`). Le test d'intégrité du corpus garantit que la signature couvre l'espace.

---

## 3. Stratégie d'évaluation qualitative — le cœur de la note

Le piège est binaire : NLP ad-hoc (fragile, non explicable, non testable) ou hard-coding cas-par-cas (n'évolue pas avec le corpus). **Aucune des deux**.

Je tranche pour un **hybride à trois étages**, par ordre de priorité :

**Étage 1 — Règles déclaratives portées par l'item** (~70 % du feedback)

Chaque item du corpus porte ses propres règles de reconnaissance. Le moteur exécute, ne juge pas. Exemple :

```ts
type ChainItem = {
  id: ItemId;
  expected: RiskFormulation;
  componentRules: {
    cause: Rule[];
    event: Rule[];
    consequence: Rule[];
  };
  defensibleVariants: RiskFormulation[];
};

type Rule =
  | { kind: 'mustMatchAny'; patterns: string[]; onMatch: ComponentFeedback }
  | { kind: 'mustNotMatchAny'; patterns: string[]; onMatch: ComponentFeedback }
  | { kind: 'mustContainSemanticTag'; tag: SemanticTag; onMiss: ComponentFeedback };
```

Le `ChainDiagnoser` reste 30 lignes : il applique les règles, agrège les `ComponentFeedback`. Toute l'intelligence vit dans le corpus, écrit et relu par Lætitia. L'évolution pédagogique = ajout de corpus, pas changement de code.

**Étage 2 — Détecteurs transverses de patterns fautifs** (~20 %)

Une bibliothèque typée de détecteurs réutilisables, indépendants des items :

```ts
const detectors = {
  isTautology: (f: RiskFormulation) => /* « risque de ne pas X » où X = objectif */,
  confusesIssueWithRisk: (f: RiskFormulation) => /* verbe au passé / au présent constaté */,
  hasOnlyConsequence: (f: RiskFormulation) => !f.cause && !f.event && !!f.consequence,
  causeAndEventCollapsed: (f: RiskFormulation) => similarity(f.cause, f.event) > 0.85,
};
```

Ces détecteurs sont des fonctions pures testables unitairement avec une table d'exemples. Ils émettent des `ComponentFeedback` standardisés (« Ce que vous décrivez est l'événement, pas la cause »).

**Étage 3 — Comparaison structurée à l'alternative défendable** (~10 %)

Pour produire la « formulation alternative défendable » exigée par l'UX, le moteur sélectionne celle des `defensibleVariants` qui partage le maximum de composants avec la production apprenant, et l'affiche en regard. Pas de génération, pas de paraphrase : choix dans un set fini, écrit par Lætitia.

**Ce qu'on n'écrit pas** : pas de LLM embarqué, pas de tokenizer maison, pas d'analyse sémantique au sens fort. La « sémantique » est portée par des tags humains posés sur le corpus (`SemanticTag = 'CAUSE_TECHNIQUE' | 'CAUSE_HUMAINE' | 'EVENT_INCERTAIN' | …`). C'est du *symbolique étiqueté*, robuste, explicable et testable.

**Garantie de qualité du feedback** : tout `ComponentFeedback` est *écrit en français par Lætitia dans le corpus*. Le moteur ne formule pas, il sélectionne. C'est ce qui rend la promesse UX tractable.

---

## 4. Stratégie de tests

Quatre étages, en pyramide décroissante :

**Tests unitaires du domaine** (Vitest, base de la pyramide). Chaque service de domaine testé sur fixtures minimales (un item par cas). Les value objects testés pour égalité structurelle. Les détecteurs (étage 2) testés sur des tables d'exemples positifs/négatifs.

**Tests d'intégrité du corpus** (clé de voûte — leçon Coach Objectifs sur régression silencieuse) :
- Aucun doublon de `ItemId`.
- Tout `expected` est non vide et bien formé.
- Toute règle référence un `SemanticTag` qui existe.
- Chaque zone DOMAINE a au moins N items, et au moins M items par signature distincte (sinon `consolidée` est inatteignable).
- Tout `ComponentFeedback` a un message en français non vide, sans `TODO`, sans `XXX`.
- Toute `defensibleVariant` est syntaxiquement valide.

Ces tests tournent en CI, échec rouge si le corpus dérive. Ils protègent l'évolution.

**Tests de bout en bout d'une mécanique** (Playwright, peu nombreux) : un parcours Le Tri complet, un Le Détective complet, dans un navigateur réel, avec mocks de `MasteryStore`. Trois ou quatre scénarios par mécanique, pas vingt.

**Tests d'accessibilité** : `vitest-axe` (équivalent jest-axe pour Vitest) sur chaque composant React clé, plus un smoke test Playwright + axe-core sur les écrans principaux. Bloquant en CI.

**Test architectural non négociable** : un test Node pur qui importe `RiskCoachEngine`, l'instancie avec adaptateurs fake, joue un scénario complet. **S'il importe accidentellement React, le test casse à l'install d'une dépendance fake.** C'est le canari de l'isolement hexagonal.

---

## 5. Arborescence `src/`

```
src/
  domain/                    # TS pur — aucun import React, aucun import navigateur
    entities/
      LearningSession.ts
      MasteryRecord.ts
    valueObjects/
      RiskFormulation.ts
      Criticality.ts
      TreatmentChoice.ts
      ReviewFormulation.ts
      ComponentFeedback.ts
    services/
      TriageEvaluator.ts
      ChainDiagnoser.ts
      CriticalityArbiter.ts
      TreatmentReasoner.ts
      RiskReductionFramer.ts
      MasteryProgressor.ts
    detectors/               # étage 2 — patterns fautifs transverses
      tautology.ts
      issueConfusion.ts
      ...
    ports/
      RiskCoachEngine.ts     # driving (interface façade)
      ContentRepository.ts   # driven
      MasteryStore.ts        # driven
      RandomSource.ts        # driven
      Clock.ts               # driven
    engine/
      RiskCoachEngineImpl.ts # implémentation de la façade, orchestre les services
  content/                   # corpus pédagogique externalisé, validé par Lætitia
    triage/
    chain/
    pari/
    brouillard/
    theory/
    semanticTags.ts          # vocabulaire fermé
    schema.ts                # types Zod, garantit la forme au chargement
  adapters/
    ui/                      # React, le seul endroit qui importe React
      hub/
      mechanics/
        TriBoard.tsx
        DetectiveBoard.tsx
        PariBoard.tsx
        BrouillardBoard.tsx
      shared/
      hooks/
        useEngine.ts         # accès à l'engine via Context
    persistence/
      LocalStorageMasteryStore.ts
      schemaMigrations.ts
    content-loader/
      JsonContentRepository.ts
  app/
    composition.ts           # composition root : branche ports/adaptateurs
    main.tsx                 # bootstrap React
  tests/
    domain/                  # unitaires
    corpus/                  # intégrité
    e2e/                     # Playwright
    a11y/
```

La règle physique : `src/domain/**` n'importe jamais depuis `src/adapters/**` ni `src/app/**`. Vérifié par `eslint-plugin-boundaries` (ou `dependency-cruiser`).

---

## 6. Stratégie d'état UI

Le domaine reste pur. L'UI a besoin d'état pour : tuile active, panneau Théorie ouvert/fermé, position du curseur sur la matrice, brouillon non soumis du Détective, etc.

**Choix : React Context + `useReducer` local par mécanique, plus Zustand pour le seul état véritablement transverse** (la `MasteryState` projetée et le pointeur « reprise où on s'est arrêté »).

- Pas Redux : surdimensionné, cérémonie inutile pour 4 mécaniques.
- Pas Jotai : la granularité atomique tente vers la dispersion d'état.
- Pas Context API seul pour la `MasteryState` : re-renders incontrôlés sur un hub qui regarde 6 zones.
- Zustand est minuscule, sélecteurs typés, compatible single-file build, et permet une frontière nette : **le store Zustand est une projection du domaine, pas une copie**. La source de vérité reste `MasteryStore` (port) ; Zustand sert la réactivité d'affichage.

L'engine est exposé via un Context React (`EngineProvider`), instancié dans `composition.ts`. Aucun composant ne fabrique son engine : un seul, branché en `main.tsx`.

---

## 7. Persistance

LocalStorage suffit pour V1. IndexedDB sera nécessaire si on stocke des historiques de productions textuelles à des fins de bilan (hors scope V1).

**Versioning du schéma** : tout payload sérialisé porte un champ `schemaVersion: number`. `LocalStorageMasteryStore` lit, détecte la version, applique les migrations en chaîne via `schemaMigrations.ts` (`v1 → v2 → v3`). Une migration manquante = chargement neutre et log, **jamais** crash. La compatibilité ascendante est un engagement envers l'apprenant qui revient trois mois après.

**Isolement** : `MasteryStore` est un port — interface de 4 méthodes. Le domaine s'en sert en aveugle. Tests Node = `InMemoryMasteryStore`. Pas un `window` dans le domaine.

---

## 8. Build et déploiement

Oui, single-file HTML, parité Coach Objectifs. Vite + `vite-plugin-singlefile`. Une seule sortie `dist/index.html` autoporté.

Pièges connus :
- **EPERM sur `dist/` (mémoire Lætitia)** : `rimraf dist` avant build, ou pre-script qui release les handles. À ajouter au `package.json` scripts comme à Coach Objectifs.
- **Taille du bundle** : surveiller. Single-file + corpus = tout est inline. Le corpus doit rester texte JSON, pas d'images bundlées en base64 sauf icônes (Lucide est SVG inline, parfait).
- **Polices Google Fonts** : à inliner ou à déclarer en `@font-face` avec fallback robuste (Source Serif 4 a déjà un fallback Inter Semibold prévu §6).

---

## 9. Stratégie d'évolution

L'architecture absorbe les évolutions probables sans casse :

**5e mécanique** : ajout d'un service, ajout d'un port d'entrée sur la façade `RiskCoachEngine`, ajout d'un dossier `content/<mecanique>/`, ajout d'un `<Board>` React. Zéro modification des mécaniques existantes. Le hub découvre la nouvelle mécanique via un registre déclaratif (`mechanics.ts`).

**Changement Lot 1a / 1b** : sans impact, c'est une question de livraison, pas d'architecture.

**Modules Sprint / PI / OKR (Lots 2-4)** : même architecture, corpus spécialisé. Un `ContentRepository` par module, sélectionné selon contexte. Les services de domaine ne bougent pas — c'est exactement la promesse de la séparation moteur/contenu.

**Invariants protégés** : la façade `RiskCoachEngine` (signature stable, ajouts seulement) ; le schéma minimal d'un `ContentItem` (validé Zod) ; les value objects (`RiskFormulation`, `Criticality`, …).

**Parties laissées ouvertes** : le contenu, le rendu UI, la palette des détecteurs (étage 2), la stratégie de tirage (`RandomSource` + algorithme `nextItem`).

---

## 10. Pièges connus et autocritique

**Le risque architectural principal** : la sophistication des règles déclaratives (§3 étage 1) peut dériver vers un mini-DSL maison qui grossit jusqu'à devenir illisible. Garde-fou : tenir la table des `kind` de règles **fermée et petite** (5 à 7 max). Si un cas nouveau ne rentre pas, c'est un détecteur (étage 2), pas une nouvelle règle.

**Ce qu'un architecte rival dirait** : « tu sur-architectures, tu fais des ports pour une SPA pédagogique qui tourne en local, tu mets 4 couches là où 1 suffirait ». Réponse : le testabilité du moteur sans navigateur est non négociable (D2, project_instructions), et l'évolution prévue sur 4 lots × N corpus exige cette séparation. L'over-engineering serait d'ajouter CQRS, event sourcing, ou une couche application séparée des services — je ne le fais pas.

**Le contenu pédagogique peut-il dériver en spaghetti ?** Oui, si on laisse chaque item inventer sa structure. Garde-fou : `content/schema.ts` en Zod, validation au chargement, échec bruyant. Un fichier par mécanique, convention de nommage `items.<theme>.ts`. Test d'intégrité bloquant.

**Le canari d'isolement** : le test Node mentionné en §4 doit rester vert à chaque PR. C'est la preuve continue que `RiskCoachEngine` est instanciable sans React, sans `window`, sans `document`. Le jour où il casse, on a contaminé le domaine — on rollback, pas on contourne.

---

## RECOMMANDATION TRANCHÉE

**Décision structurante** : hexagonal strict, `RiskCoachEngine` en TS pur, et **toute l'intelligence d'évaluation portée par le corpus en règles déclaratives + 5-7 détecteurs transverses**. Pas de NLP, pas de LLM embarqué — le moteur sélectionne des feedbacks écrits par Lætitia.

**Garde-fous craftsmanship non négociables** : (1) test Node d'isolement du domaine, vert à chaque commit ; (2) tests d'intégrité du corpus bloquants en CI, vérifiant équilibrage, doublons, libellés et couverture des signatures pour la règle « consolidée par variation ».

**Piège majeur à éviter** : laisser le DSL des règles déclaratives grossir au-delà de 7 `kind` — au-delà, on a réinventé un moteur d'expert sans le savoir, et plus personne ne le maintient.
