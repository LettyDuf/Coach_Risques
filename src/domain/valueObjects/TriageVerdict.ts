/**
 * Verdict de tri pour la mécanique « Le Tri » (DOMAINE §1, UX-UI §3).
 *
 * L'apprenant classe une formulation dans l'une des 4 catégories
 * du triptyque pédagogique. Le faux-ami « issue » (anglais) est
 * volontairement présent — c'est la confusion à neutraliser.
 */
export type TriageVerdict = "enjeu" | "objectif" | "risque" | "issue";

export const TRIAGE_VERDICTS: ReadonlyArray<TriageVerdict> = [
  "enjeu",
  "objectif",
  "risque",
  "issue",
] as const;
