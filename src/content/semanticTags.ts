/**
 * Vocabulaire fermé des étiquettes sémantiques utilisées par le moteur
 * d'évaluation (D15 — pas de NLP au sens fort, juste du symbolique).
 *
 * Toute règle déclarative qui réfère à un tag doit le piocher ici.
 * Les tests d'intégrité du corpus (D16) vérifient que toute référence
 * existe.
 */

export const SEMANTIC_TAGS = [
  // Anatomie d'un risque
  "CAUSE_TECHNIQUE",
  "CAUSE_HUMAINE",
  "CAUSE_ORGANISATIONNELLE",
  "CAUSE_EXTERNE",
  "EVENT_INCERTAIN",
  "EVENT_AVERE",
  "CONSEQUENCE_MESURABLE",
  "CONSEQUENCE_FLOUE",
  // Tonalité temporelle
  "PASSE_CONSTATE",
  "PRESENT_CONSTATE",
  "FUTUR_CONDITIONNEL",
  // Qualité de la formulation
  "QUALITATIF",
  "MESURABLE",
  "TAUTOLOGIE",
] as const;

export type SemanticTag = (typeof SEMANTIC_TAGS)[number];

const TAG_SET = new Set<string>(SEMANTIC_TAGS);

/** Vérification utilisée par les tests d'intégrité du corpus. */
export function isValidSemanticTag(tag: string): tag is SemanticTag {
  return TAG_SET.has(tag);
}
