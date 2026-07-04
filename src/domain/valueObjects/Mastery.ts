/**
 * État de maîtrise par zone (DOMAINE §2 Carte, UX-UI §2).
 *
 * 4 états qualitatifs validés (D11) — pas de score numérique.
 * La consolidation se mérite par variation (items de signatures
 * distinctes), pas par farming.
 */

import type { ZoneId, MechanicId } from "./ids";

export type MasteryLevel =
  | "non-commencee"
  | "effleuree"
  | "travaillee"
  | "consolidee";

export const MASTERY_LEVELS: ReadonlyArray<MasteryLevel> = [
  "non-commencee",
  "effleuree",
  "travaillee",
  "consolidee",
] as const;

/** Signature pédagogique d'un item — sert à mesurer la variation. */
export type ItemSignature = {
  readonly trapPattern: string;
  readonly theme: string;
};

/** Projection lisible par l'UI pour afficher la Carte. */
export type ZoneMastery = {
  readonly zone: ZoneId;
  readonly level: MasteryLevel;
  readonly nourishedBy: ReadonlyArray<MechanicId>;
};

export type MasteryState = ReadonlyArray<ZoneMastery>;
