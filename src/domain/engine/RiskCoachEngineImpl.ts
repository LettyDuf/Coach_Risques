/**
 * Implémentation du port `RiskCoachEngine` (DOMAINE, D14).
 *
 * Orchestre les services internes, branche les ports de sortie,
 * reste découplé de l'UI.
 *
 * V1 : seule la mécanique « Le Tri » est implémentée. Les autres
 * méthodes (diagnoseChain, arbitrateCriticality, reasonTreatment,
 * frameReviewValue) retournent un résultat neutre clairement étiqueté
 * « non implémenté » — le typage tient, l'UI peut grow sans casser.
 */

import type {
  ContentItem,
  ContentRepository,
  ItemId,
  MasteryState,
  NextItemRequest,
  RiskCoachEngine,
  ZoneId,
  ZoneMastery,
} from "../index";
import {
  MECHANICS,
  ZONES,
  type EvaluationResult,
  type MechanicId,
  type MasteryLevel,
  type TriageVerdict,
} from "../index";
import type { MasteryStore } from "../ports/MasteryStore";
import type { Clock } from "../ports/Clock";
import type { RandomSource } from "../ports/RandomSource";
import { evaluateTriage } from "../services/TriageEvaluator";
import { diagnoseChain } from "../services/ChainDiagnoser";
import { evaluateBrick } from "../services/BrickEvaluator";
import { computeMasteryLevel } from "../services/MasteryProgressor";
import type { TriageItem } from "@content/triage/types";
import type { ChainItem } from "@content/chain/types";
import type { BrickItem } from "@content/bricks/types";

const NOT_IMPLEMENTED: EvaluationResult = {
  feedbacks: [
    {
      target: "overall",
      verdict: "missing",
      message:
        "Cette mécanique n'est pas encore disponible. Elle arrive dans une prochaine vague.",
    },
  ],
  outcome: "miss",
};

/** Quelle(s) mécanique(s) nourrissent quelle zone (UX-UI §2). */
const ZONE_NOURISHED_BY: Record<string, ReadonlyArray<MechanicId>> = {
  [ZONES.TRIPTYQUE]: [MECHANICS.TRI],
  [ZONES.ANATOMIE]: [MECHANICS.DETECTIVE],
  [ZONES.EVALUATION]: [MECHANICS.PARI],
  [ZONES.TRAITEMENT]: [MECHANICS.PARI],
  [ZONES.INDICATEURS]: [MECHANICS.BROUILLARD],
  [ZONES.REDUCTION_VALEUR]: [MECHANICS.BROUILLARD],
};

const ALL_ZONES: ReadonlyArray<ZoneId> = [
  ZONES.TRIPTYQUE,
  ZONES.ANATOMIE,
  ZONES.EVALUATION,
  ZONES.TRAITEMENT,
  ZONES.INDICATEURS,
  ZONES.REDUCTION_VALEUR,
];

export type EngineDependencies = {
  readonly content: ContentRepository;
  readonly mastery: MasteryStore;
  readonly clock: Clock;
  readonly random: RandomSource;
};

export function createRiskCoachEngine(
  deps: EngineDependencies,
): RiskCoachEngine {
  function projectMastery(): MasteryState {
    const passes = deps.mastery.readAllPasses();
    return ALL_ZONES.map<ZoneMastery>((zone) => {
      const level: MasteryLevel = computeMasteryLevel(passes, zone);
      return {
        zone,
        level,
        nourishedBy: ZONE_NOURISHED_BY[zone as unknown as string] ?? [],
      };
    });
  }

  function pickNextTriageItem(): ItemId | null {
    return pickNextByLeastSeenSignature<TriageItem>(MECHANICS.TRI);
  }

  /**
   * Tirage générique pour favoriser la variation (UX-UI §2).
   * Sélectionne uniformément parmi les items dont la signature `trapPattern`
   * a été vue le moins. Évite le farming.
   */
  function pickNextByLeastSeenSignature<T extends ContentItem>(
    mechanic: MechanicId,
  ): ItemId | null {
    const items = deps.content.listByMechanic<T>(mechanic);
    if (items.length === 0) return null;
    const passes = deps.mastery.readAllPasses();
    const seenCounts = new Map<string, number>();
    for (const p of passes) {
      const sig = p.signature.trapPattern;
      seenCounts.set(sig, (seenCounts.get(sig) ?? 0) + 1);
    }
    let minSeen = Infinity;
    const candidatesBySig: T[] = [];
    for (const it of items) {
      const seen = seenCounts.get(it.signature.trapPattern) ?? 0;
      if (seen < minSeen) {
        minSeen = seen;
        candidatesBySig.length = 0;
        candidatesBySig.push(it);
      } else if (seen === minSeen) {
        candidatesBySig.push(it);
      }
    }
    const picked = deps.random.pick(candidatesBySig);
    return picked.id;
  }

  return {
    evaluateTriage(itemId, verdict: TriageVerdict): EvaluationResult {
      const item = deps.content.findById<TriageItem>(itemId);
      if (!item) {
        return {
          feedbacks: [
            {
              target: "overall",
              verdict: "missing",
              message: "Item introuvable.",
            },
          ],
          outcome: "miss",
        };
      }
      return evaluateTriage(item, verdict);
    },

    diagnoseChain(itemId, produced) {
      const item = deps.content.findById<ChainItem>(itemId);
      if (!item) {
        return {
          feedbacks: [
            {
              target: "overall",
              verdict: "missing",
              message: "Item introuvable.",
            },
          ],
          outcome: "miss",
        };
      }
      const diag = diagnoseChain(
        { revealedComponent: item.revealedComponent },
        produced,
      );
      return diag.result;
    },
    evaluateBrick(itemId, chosenNature) {
      const item = deps.content.findById<BrickItem>(itemId);
      if (!item) {
        return {
          feedbacks: [
            {
              target: "overall",
              verdict: "missing",
              message: "Item introuvable.",
            },
          ],
          outcome: "miss",
        };
      }
      return evaluateBrick(
        { correctNature: item.correctNature, candidates: item.candidates },
        chosenNature,
      );
    },
    arbitrateCriticality: () => NOT_IMPLEMENTED,
    reasonTreatment: () => NOT_IMPLEMENTED,
    frameReviewValue: () => NOT_IMPLEMENTED,

    nextItem(request: NextItemRequest): ItemId | null {
      if (request.mechanic === MECHANICS.TRI) {
        return pickNextTriageItem();
      }
      if (request.mechanic === MECHANICS.DETECTIVE) {
        return pickNextByLeastSeenSignature<ChainItem>(MECHANICS.DETECTIVE);
      }
      if (request.mechanic === MECHANICS.BRICKS) {
        return pickNextByLeastSeenSignature<BrickItem>(MECHANICS.BRICKS);
      }
      // Autres mécaniques V1b — pas encore implémentées.
      const items = deps.content.listByMechanic<ContentItem>(request.mechanic);
      return items[0]?.id ?? null;
    },

    registerOutcome(
      zone: ZoneId,
      itemId: ItemId,
      outcome: EvaluationResult,
    ): MasteryState {
      if (outcome.outcome === "success") {
        const item = deps.content.findById<ContentItem>(itemId);
        const signature = item?.signature ?? {
          trapPattern: "unknown",
          theme: "unknown",
        };
        deps.mastery.appendPass({
          zone,
          signature,
          at: deps.clock.now(),
        });
      }
      return projectMastery();
    },

    getMasteryByZone(): MasteryState {
      return projectMastery();
    },
  };
}
