/**
 * Service de domaine — évaluation d'une brique (D20).
 *
 * Stateless. Reçoit un item et la nature choisie par l'apprenant,
 * retourne un EvaluationResult. Le message vient toujours du candidat
 * (D15) — le moteur sélectionne, ne formule jamais.
 */

import type {
  ComponentFeedback,
  EvaluationResult,
} from "../valueObjects/ComponentFeedback";

export type BrickQuestion = {
  readonly correctNature: string;
  readonly candidates: ReadonlyArray<{
    readonly nature: string;
    readonly feedback?: string;
  }>;
};

/**
 * Feedback de secours si un item n'a pas de message précis pour ce piège
 * (le schema Zod le rend rare mais on sécurise).
 */
const GENERIC_WRONG_FEEDBACK =
  "Ce n'est pas la bonne catégorie. Regardez la nature du piège et comparez avec la définition attendue.";

export function evaluateBrick(
  question: BrickQuestion,
  chosenNature: string,
): EvaluationResult {
  if (chosenNature === question.correctNature) {
    const feedback: ComponentFeedback = {
      target: "overall",
      verdict: "ok",
      message: "Correct.",
    };
    return { feedbacks: [feedback], outcome: "success" };
  }

  const chosenCandidate = question.candidates.find(
    (c) => c.nature === chosenNature,
  );
  const message = chosenCandidate?.feedback ?? GENERIC_WRONG_FEEDBACK;

  const feedback: ComponentFeedback = {
    target: "overall",
    verdict: "wrong",
    message,
  };
  return { feedbacks: [feedback], outcome: "miss" };
}
