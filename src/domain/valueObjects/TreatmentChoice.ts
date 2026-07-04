/**
 * Stratégie de traitement d'un risque (DOMAINE §4).
 *
 * Quatre stratégies classiques ISO/PMBOK + variante ROAM (SAFe)
 * réservée au module PI (hors V1 du tronc commun).
 */
export type Strategy = "eviter" | "reduire" | "transferer" | "accepter";

export const STRATEGIES: ReadonlyArray<Strategy> = [
  "eviter",
  "reduire",
  "transferer",
  "accepter",
] as const;

/** Variante SAFe — utilisée plus tard dans le module PI (D7). */
export type RoamStatus = "Resolved" | "Owned" | "Accepted" | "Mitigated";

export type TreatmentChoice = {
  readonly strategy: Strategy;
  /** Argumentation libre de l'apprenant (champ obligatoire dans Le Pari). */
  readonly rationale: string;
};
