/**
 * Formulation type pour présenter une réduction de risque en revue
 * (DOMAINE §6 — pilier explicite de l'outil).
 *
 * Forme canonique :
 *   Risque traité      : [résumé une ligne]
 *   Réduction obtenue  : [probabilité ou impact avant → après]
 *   Artefact démontrable: [spike / prototype / test / NFR / métrique]
 *   Coût de la réduction: [charge engagée]
 *   Reste à faire      : [ce qui reste, si applicable]
 *
 * C'est ce que la mécanique « Le Brouillard se lève » apprend à produire.
 */
export type ArtifactKind = "spike" | "prototype" | "test" | "nfr" | "metrique";

export const ARTIFACT_KINDS: ReadonlyArray<ArtifactKind> = [
  "spike",
  "prototype",
  "test",
  "nfr",
  "metrique",
] as const;

export type ReviewFormulation = {
  readonly summary: string;
  readonly reductionAchieved: string;
  readonly artifact: ArtifactKind;
  /** Texte libre obligatoire : conclusion de l'artefact (garde-fou anti cargo-cult). */
  readonly artifactConclusion: string;
  readonly cost: string;
  readonly remaining: string;
};

export type ReviewField =
  | "summary"
  | "reductionAchieved"
  | "artifactConclusion"
  | "cost"
  | "remaining";

export const REVIEW_FIELDS: ReadonlyArray<ReviewField> = [
  "summary",
  "reductionAchieved",
  "artifactConclusion",
  "cost",
  "remaining",
] as const;
