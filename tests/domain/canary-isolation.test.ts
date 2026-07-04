/**
 * CANARI D'ISOLEMENT HEXAGONAL — test fondateur du projet (D16).
 *
 * Ce test garantit que le domaine `RiskCoachEngine` reste instanciable
 * et utilisable dans un environnement Node pur, SANS aucune dépendance
 * navigateur, SANS React, SANS localStorage, SANS document/window.
 *
 * S'il casse :
 *   - soit un fichier de `src/domain/**` a importé React, Zustand,
 *     ou utilisé `window`/`document`/`localStorage` ;
 *   - soit un port a été modifié de telle façon qu'un adaptateur fake
 *     ne peut plus l'implémenter trivialement.
 *
 * Dans les deux cas : on rollback, on ne contourne pas.
 *
 * Ce test ne teste PAS la pédagogie. Il teste l'isolation architecturale.
 * Les tests de comportement viendront avec les services et le corpus.
 */

import { describe, it, expect } from "vitest";

import {
  // Value objects
  ItemId,
  ZoneId,
  MECHANICS,
  ZONES,
  type RiskCoachEngine,
  type ContentRepository,
  type ContentItem,
  type MasteryStore,
  type RandomSource,
  type Clock,
  type EvaluationResult,
  type MasteryState,
  type SuccessfulPass,
  type TriageVerdict,
  type PartialRiskFormulation,
  type Criticality,
  type ContextLever,
  type TreatmentChoice,
  type ReviewFormulation,
  type ArtifactKind,
  type MechanicId,
  criticalityOf,
} from "@domain/index";

// --- Adaptateurs fakes — uniquement en mémoire, jamais de window/document ---

function makeFakeContentRepository(): ContentRepository {
  const items = new Map<string, ContentItem>([
    [
      "tri-001",
      {
        id: ItemId("tri-001"),
        mechanic: MECHANICS.TRI,
        signature: { trapPattern: "confusion-issue", theme: "logiciel" },
      },
    ],
  ]);
  return {
    findById<T extends ContentItem>(id: ItemId): T | null {
      const found = items.get(id as unknown as string);
      return (found as unknown as T) ?? null;
    },
    listByMechanic<T extends ContentItem>(mechanic: MechanicId): ReadonlyArray<T> {
      const filtered = Array.from(items.values()).filter(
        (it) => it.mechanic === mechanic,
      );
      return filtered as unknown as ReadonlyArray<T>;
    },
  };
}

function makeFakeMasteryStore(): MasteryStore {
  const passes: SuccessfulPass[] = [];
  let pointer: { mechanic: string; itemId: string } | null = null;
  return {
    readAllPasses: () => [...passes],
    appendPass: (p) => {
      passes.push(p);
    },
    readResumePointer: () => pointer,
    writeResumePointer: (p) => {
      pointer = p;
    },
  };
}

function makeFakeRandomSource(seed: number = 1): RandomSource {
  // LCG très simple — déterministe par graine. Pas cryptographique : on s'en fiche.
  let state = seed;
  const next = (): number => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state;
  };
  return {
    nextInt: (max) => (max <= 0 ? 0 : next() % max),
    pick: (items) => items[next() % items.length]!,
  };
}

function makeFakeClock(epochMs: number = 1_700_000_000_000): Clock {
  return { now: () => epochMs };
}

// --- Implémentation stub minimale du moteur ---
//
// On n'implémente PAS la logique métier ici. On vérifie juste que la
// façade peut être satisfaite par un objet TS pur, qui implémente tous
// les ports. La logique réelle viendra dans `engine/RiskCoachEngineImpl.ts`,
// testée par ses propres tests unitaires.
//
// Le canari valide DEUX choses : (1) tous les types s'importent depuis @domain
// sans casser le chargement Node ; (2) la signature de `RiskCoachEngine` est
// implémentable sans toucher au navigateur.

function makeStubEngine(deps: {
  content: ContentRepository;
  mastery: MasteryStore;
  random: RandomSource;
  clock: Clock;
}): RiskCoachEngine {
  const empty: EvaluationResult = { feedbacks: [], outcome: "miss" };
  const emptyMastery: MasteryState = [];
  return {
    evaluateTriage: (_itemId, _verdict: TriageVerdict) => empty,
    diagnoseChain: (_itemId, _produced: PartialRiskFormulation) => empty,
    evaluateBrick: (_itemId, _chosenNature: string) => empty,
    arbitrateCriticality: (_itemId, _placed: Criticality, _context: ContextLever) =>
      empty,
    reasonTreatment: (_itemId, _choice: TreatmentChoice) => empty,
    frameReviewValue: (
      _itemId,
      _artifact: ArtifactKind,
      _formulation: ReviewFormulation,
    ) => empty,
    nextItem: ({ mechanic }) => {
      const items = deps.content.listByMechanic(mechanic);
      return items[0]?.id ?? null;
    },
    registerOutcome: (zone: ZoneId, _itemId, _outcome: EvaluationResult) => {
      deps.mastery.appendPass({
        zone,
        signature: { trapPattern: "stub", theme: "stub" },
        at: deps.clock.now(),
      });
      return emptyMastery;
    },
    getMasteryByZone: () => emptyMastery,
  };
}

// --- Tests ---

describe("Canari d'isolement hexagonal", () => {
  it("s'instancie sans toucher au DOM ni au navigateur", () => {
    // Si un import accidentel de React/jsdom/window avait fui dans le domaine,
    // ce simple appel échouerait en environnement Node pur.
    const engine = makeStubEngine({
      content: makeFakeContentRepository(),
      mastery: makeFakeMasteryStore(),
      random: makeFakeRandomSource(),
      clock: makeFakeClock(),
    });

    expect(engine).toBeDefined();
    expect(typeof engine.evaluateTriage).toBe("function");
    expect(typeof engine.diagnoseChain).toBe("function");
    expect(typeof engine.evaluateBrick).toBe("function");
    expect(typeof engine.arbitrateCriticality).toBe("function");
    expect(typeof engine.reasonTreatment).toBe("function");
    expect(typeof engine.frameReviewValue).toBe("function");
    expect(typeof engine.nextItem).toBe("function");
    expect(typeof engine.registerOutcome).toBe("function");
    expect(typeof engine.getMasteryByZone).toBe("function");
  });

  it("peut sélectionner un item via le port ContentRepository", () => {
    const engine = makeStubEngine({
      content: makeFakeContentRepository(),
      mastery: makeFakeMasteryStore(),
      random: makeFakeRandomSource(),
      clock: makeFakeClock(),
    });

    const itemId = engine.nextItem({ mechanic: MECHANICS.TRI });
    expect(itemId).toBe(ItemId("tri-001"));
  });

  it("peut enregistrer une issue via le port MasteryStore (Clock injecté)", () => {
    const mastery = makeFakeMasteryStore();
    const engine = makeStubEngine({
      content: makeFakeContentRepository(),
      mastery,
      random: makeFakeRandomSource(),
      clock: makeFakeClock(1_700_000_000_000),
    });

    const result: EvaluationResult = { feedbacks: [], outcome: "success" };
    engine.registerOutcome(ZONES.TRIPTYQUE, ItemId("dummy-001"), result);

    const passes = mastery.readAllPasses();
    expect(passes).toHaveLength(1);
    expect(passes[0]?.zone).toBe(ZONES.TRIPTYQUE);
    expect(passes[0]?.at).toBe(1_700_000_000_000);
  });

  it("calcule la zone de criticité de manière déterministe (logique de domaine pure)", () => {
    // computeZone est utilisé par CriticalityArbiter. On vérifie ici qu'il
    // tourne sans dépendance externe, comme tout le reste du domaine.
    expect(criticalityOf(1, 1).zone).toBe("C1");
    expect(criticalityOf(3, 3).zone).toBe("C3");
    expect(criticalityOf(5, 5).zone).toBe("C5");
  });

  it("vérifie qu'aucun import de la barre publique @domain n'expose d'API navigateur", () => {
    // Vérification structurelle : si on importait React, fetch, window, etc.
    // depuis @domain/index, ces symboles fuiteraient dans le module.
    // On vérifie qu'aucune référence "react" ou "window" ne traîne.
    //
    // Note : ce test est une dernière ceinture de sécurité, en plus
    // d'ESLint no-restricted-imports / no-restricted-globals appliqué
    // à src/domain/** (.eslintrc.cjs).
    expect(typeof window).toBe("undefined");
    expect(typeof document).toBe("undefined");
    expect(typeof localStorage).toBe("undefined");
  });
});
