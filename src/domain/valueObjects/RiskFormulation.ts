/**
 * Formulation canonique d'un risque (DOMAINE §2).
 *
 * Forme : « À cause de [cause], il pourrait arriver que [event],
 *           ce qui aurait pour conséquence [consequence]. »
 *
 * Value object immuable. L'égalité est structurelle (via equals).
 */
export type RiskFormulation = {
  readonly cause: string;
  readonly event: string;
  readonly consequence: string;
};

export type PartialRiskFormulation = Partial<RiskFormulation>;

/** Les 3 composants d'une formulation, utilisés pour cibler le feedback. */
export type RiskComponent = "cause" | "event" | "consequence";

export const RISK_COMPONENTS: ReadonlyArray<RiskComponent> = [
  "cause",
  "event",
  "consequence",
] as const;

export function formulationEquals(a: RiskFormulation, b: RiskFormulation): boolean {
  return (
    a.cause.trim() === b.cause.trim() &&
    a.event.trim() === b.event.trim() &&
    a.consequence.trim() === b.consequence.trim()
  );
}

export function isComplete(f: PartialRiskFormulation): f is RiskFormulation {
  return (
    typeof f.cause === "string" &&
    f.cause.trim().length > 0 &&
    typeof f.event === "string" &&
    f.event.trim().length > 0 &&
    typeof f.consequence === "string" &&
    f.consequence.trim().length > 0
  );
}

export function missingComponents(f: PartialRiskFormulation): ReadonlyArray<RiskComponent> {
  return RISK_COMPONENTS.filter((k) => {
    const v = f[k];
    return typeof v !== "string" || v.trim().length === 0;
  });
}
