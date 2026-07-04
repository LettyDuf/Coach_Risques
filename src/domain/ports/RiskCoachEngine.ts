/**
 * Port d'entrée (driving) — façade unique du domaine.
 *
 * C'est ce que l'UI (et le canari Node) appellent. Tout
 * l'orchestration intérieure (sélection d'items, application des
 * règles, mise à jour de la maîtrise) reste invisible au monde
 * extérieur. La signature est stable : on ajoute, on ne casse pas.
 */

import type { ItemId, ZoneId, MechanicId } from "../valueObjects/ids";
import type { PartialRiskFormulation } from "../valueObjects/RiskFormulation";
import type { TriageVerdict } from "../valueObjects/TriageVerdict";
import type { Criticality, ContextLever } from "../valueObjects/Criticality";
import type { TreatmentChoice } from "../valueObjects/TreatmentChoice";
import type { ReviewFormulation, ArtifactKind } from "../valueObjects/ReviewFormulation";
import type { EvaluationResult } from "../valueObjects/ComponentFeedback";
import type { MasteryState } from "../valueObjects/Mastery";

export type NextItemRequest = {
  readonly mechanic: MechanicId;
};

export type RiskCoachEngine = {
  /** « Le Tri » — discrimination enjeu/objectif/risque/issue. */
  evaluateTriage(itemId: ItemId, verdict: TriageVerdict): EvaluationResult;

  /** « Le Détective » — reconstitution cause/événement/conséquence. */
  diagnoseChain(itemId: ItemId, produced: PartialRiskFormulation): EvaluationResult;

  /** « Les Briques » — reconnaissance quaternaire d'un composant du risque. */
  evaluateBrick(itemId: ItemId, chosenNature: string): EvaluationResult;

  /** « Le Pari » — évaluation criticité × contexte. */
  arbitrateCriticality(
    itemId: ItemId,
    placed: Criticality,
    context: ContextLever,
  ): EvaluationResult;

  /** « Le Pari » — choix de stratégie de traitement argumenté. */
  reasonTreatment(itemId: ItemId, choice: TreatmentChoice): EvaluationResult;

  /** « Le Brouillard se lève » — formulation de revue à partir d'un artefact. */
  frameReviewValue(
    itemId: ItemId,
    artifact: ArtifactKind,
    formulation: ReviewFormulation,
  ): EvaluationResult;

  /** Sélection du prochain item pour une mécanique donnée. */
  nextItem(request: NextItemRequest): ItemId | null;

  /**
   * Enregistre l'issue d'un exercice et renvoie l'état de maîtrise mis à jour.
   * La mise à jour suit la règle « consolidée par variation » (D11).
   *
   * `itemId` est requis : l'engine s'en sert pour récupérer la signature
   * pédagogique de l'item joué (via le ContentRepository), qui alimente
   * la règle de consolidation par signatures distinctes.
   */
  registerOutcome(
    zone: ZoneId,
    itemId: ItemId,
    outcome: EvaluationResult,
  ): MasteryState;

  /** Projection courante de la Carte de maîtrise (lecture seule). */
  getMasteryByZone(): MasteryState;
};
