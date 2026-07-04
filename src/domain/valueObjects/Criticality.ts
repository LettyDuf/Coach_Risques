/**
 * Criticité d'un risque (DOMAINE §3, UX-UI §6).
 *
 * Probabilité et impact sur 5 niveaux. La zone C1..C5 est dérivée
 * du produit, avec une matrice de correspondance définie en domaine
 * (pas en UI — pour rester testable sans React).
 */
export type Level = 1 | 2 | 3 | 4 | 5;
export type CriticalityZone = "C1" | "C2" | "C3" | "C4" | "C5";

export const LEVELS: ReadonlyArray<Level> = [1, 2, 3, 4, 5];

export type Criticality = {
  readonly probability: Level;
  readonly impact: Level;
  readonly zone: CriticalityZone;
};

/** Levier de contexte qui peut décaler la criticité (Le Pari). */
export type ContextLever = {
  readonly id: string;
  readonly label: string;
};

/**
 * Calcul de la zone de criticité à partir d'un produit probabilité × impact.
 * Règle simple, ajustable par DOMAINE/UX si besoin. Pas de magie.
 */
export function computeZone(probability: Level, impact: Level): CriticalityZone {
  const product = probability * impact;
  if (product <= 3) return "C1";
  if (product <= 6) return "C2";
  if (product <= 10) return "C3";
  if (product <= 16) return "C4";
  return "C5";
}

export function criticalityOf(probability: Level, impact: Level): Criticality {
  return { probability, impact, zone: computeZone(probability, impact) };
}
