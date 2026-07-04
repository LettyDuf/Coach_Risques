/**
 * Brique élémentaire de tout feedback du domaine (D15, UX-UI §5).
 *
 * Principe : « le moteur ne formule pas, il sélectionne ». Tout
 * `message` est écrit en français par Lætitia dans le corpus ; le
 * moteur choisit lequel renvoyer selon la production de l'apprenant.
 *
 * Les tests d'intégrité du corpus (D16) vérifient que tous les
 * messages sont non vides, en français, et ne contiennent pas TODO/XXX.
 */

import type { RiskComponent } from "./RiskFormulation";

/** Verdict porté sur un composant d'une production apprenant. */
export type ComponentVerdict = "ok" | "imprecise" | "wrong" | "missing";

/** Cible du feedback : un composant nommé, ou la production dans son ensemble. */
export type FeedbackTarget = RiskComponent | "overall";

/**
 * Un commentaire structuré attaché à une cible.
 * `defensibleAlternative` : une formulation défendable à présenter en regard
 * (jamais générée, toujours sélectionnée dans un set fini écrit par Lætitia).
 */
export type ComponentFeedback = {
  readonly target: FeedbackTarget;
  readonly verdict: ComponentVerdict;
  readonly message: string;
  readonly defensibleAlternative?: string;
  /** Lien optionnel vers une explication pédagogique plus longue (« voir le pourquoi »). */
  readonly explanationId?: string;
};

/** Résultat d'une évaluation complète (une mécanique, un item, une production). */
export type EvaluationResult = {
  readonly feedbacks: ReadonlyArray<ComponentFeedback>;
  readonly outcome: "success" | "partial" | "miss";
};
