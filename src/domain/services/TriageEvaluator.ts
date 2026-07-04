/**
 * Service de domaine — évaluation d'un verdict de tri (DOMAINE §1).
 *
 * Stateless. Reçoit un item et un verdict, retourne un EvaluationResult.
 * Toute formulation de feedback vient de l'item (D15). Le service ne
 * formule jamais.
 *
 * Note hexagonale : ce service ne connaît PAS la source des items
 * (ContentRepository est utilisé en amont, par l'engine). Il opère
 * sur des structures déjà chargées et validées.
 */

import type { TriageVerdict } from "../valueObjects/TriageVerdict";
import type {
  ComponentFeedback,
  EvaluationResult,
} from "../valueObjects/ComponentFeedback";

/**
 * Interface minimale du dépendant d'item attendu par le service.
 * On la duplique ici (au lieu d'importer le TriageItem du corpus) pour
 * garder le domaine *indépendant* de la couche contenu. Le contenu
 * étend cette interface en y ajoutant ses propres champs (cf. `content/triage/types.ts`).
 *
 * C'est l'inverse hexagonal classique : le domaine définit la forme dont
 * il a besoin, le contenu fournit ce qui la respecte.
 */
export type TriageQuestion = {
  readonly expected: TriageVerdict;
  readonly rationale: string;
  readonly confusionMessages: Partial<Record<TriageVerdict, string>>;
};

/** Fallback générique quand l'item ne fournit pas de message pour la confusion donnée. */
const GENERIC_WRONG_FEEDBACK: Record<TriageVerdict, string> = {
  enjeu:
    "Ce n'est pas un enjeu — un enjeu est qualitatif et antérieur, il dit ce qui est en jeu.",
  objectif:
    "Ce n'est pas un objectif — un objectif est mesurable et a une cible définie.",
  risque:
    "Ce n'est pas un risque — un risque est un événement incertain, conditionnel, qui pourrait survenir.",
  issue:
    "Ce n'est pas une issue — une issue est un problème avéré, déjà constaté.",
};

export function evaluateTriage(
  question: TriageQuestion,
  given: TriageVerdict,
): EvaluationResult {
  if (given === question.expected) {
    const feedback: ComponentFeedback = {
      target: "overall",
      verdict: "ok",
      message: question.rationale,
    };
    return { feedbacks: [feedback], outcome: "success" };
  }

  // Réponse erronée — on cherche le message le plus précis disponible.
  const tailored = question.confusionMessages[given];
  const message = tailored ?? GENERIC_WRONG_FEEDBACK[given];

  const feedback: ComponentFeedback = {
    target: "overall",
    verdict: "wrong",
    message,
  };
  return { feedbacks: [feedback], outcome: "miss" };
}
