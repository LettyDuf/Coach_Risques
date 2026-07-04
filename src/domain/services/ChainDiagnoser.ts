/**
 * Service de domaine — diagnostic d'une chaîne risque produite
 * (DOMAINE §2, mécanique Le Détective).
 *
 * Stateless. Évalue la FORME de chaque composant produit :
 *  - longueur min
 *  - événement formulé au conditionnel (heuristique légère)
 *  - absence de tautologie évidente
 *
 * Le service ne JUGE PAS sémantiquement le contenu. La pédagogie
 * vient de la `defensibleVariant` présentée par l'UI en regard.
 * Auto-évaluation comparée (D9).
 */

import type {
  ComponentFeedback,
  EvaluationResult,
  PartialRiskFormulation,
  RiskComponent,
} from "../index";
import { RISK_COMPONENTS } from "../valueObjects/RiskFormulation";

const MIN_LENGTH = 10;
const TAUTOLOGY_PATTERNS: ReadonlyArray<RegExp> = [
  /\brisque\s+de\s+ne\s+pas\b/i,
  /\bne\s+pas\s+atteindre\b/i,
  /\bne\s+pas\s+livrer\b/i,
];

/** Heuristique : un événement bien formulé est typiquement au conditionnel ou exprime l'incertitude. */
const CONDITIONAL_HINTS: ReadonlyArray<RegExp> = [
  /\bpourrait\b/i,
  /\bpourraient\b/i,
  /\brisque\s+de\b/i,
  /\bsi\b/i,
  /\beventuel/i,
  /\bpossib/i,
  /\bpeut\s+(survenir|arriver|tomber|se\s+produire)\b/i,
];

/**
 * Interface minimale attendue côté domaine. Le contenu (`ChainItem`)
 * étend cette forme en y ajoutant ses propres champs.
 */
export type ChainQuestion = {
  readonly revealedComponent: RiskComponent;
};

export type ChainDiagnosis = {
  readonly missing: ReadonlyArray<RiskComponent>;
  readonly tooShort: ReadonlyArray<RiskComponent>;
  readonly tautology: ReadonlyArray<RiskComponent>;
  readonly nonConditionalEvent: boolean;
  readonly result: EvaluationResult;
};

const MESSAGES = {
  missing:
    "Champ vide. Cette case est à compléter pour reconstituer la chaîne.",
  tooShort:
    "Formulation trop courte pour porter du sens. Détaille un peu.",
  tautologyCause:
    "Cette formulation reprend l'objectif raté plutôt qu'un mécanisme. Une cause répond à : pourquoi cet événement est-il possible ?",
  tautologyEvent:
    "Cette formulation reprend l'objectif raté plutôt qu'un événement. Un événement décrit ce qui pourrait survenir, pas l'objectif inversé.",
  tautologyConsequence:
    "Cette formulation reprend l'objectif raté plutôt qu'une conséquence mesurable. Une conséquence dit ce qui changerait si l'événement se produisait.",
  nonConditional:
    "L'événement gagne à être formulé au conditionnel (pourrait, risque de, si). Sinon il se confond avec une issue déjà constatée.",
} as const;

function isMissing(value: string | undefined): boolean {
  return !value || value.trim().length === 0;
}

function isTooShort(value: string): boolean {
  return value.trim().length > 0 && value.trim().length < MIN_LENGTH;
}

function hasTautology(value: string): boolean {
  return TAUTOLOGY_PATTERNS.some((re) => re.test(value));
}

function looksConditional(value: string): boolean {
  return CONDITIONAL_HINTS.some((re) => re.test(value));
}

function tautologyMessageFor(component: RiskComponent): string {
  switch (component) {
    case "cause":
      return MESSAGES.tautologyCause;
    case "event":
      return MESSAGES.tautologyEvent;
    case "consequence":
      return MESSAGES.tautologyConsequence;
  }
}

export function diagnoseChain(
  question: ChainQuestion,
  produced: PartialRiskFormulation,
): ChainDiagnosis {
  const feedbacks: ComponentFeedback[] = [];
  const missing: RiskComponent[] = [];
  const tooShort: RiskComponent[] = [];
  const tautology: RiskComponent[] = [];
  let nonConditionalEvent = false;

  for (const c of RISK_COMPONENTS) {
    // On n'évalue jamais le composant révélé (lecture seule pour l'apprenant).
    if (c === question.revealedComponent) continue;

    const value = produced[c];

    if (isMissing(value)) {
      missing.push(c);
      feedbacks.push({
        target: c,
        verdict: "missing",
        message: MESSAGES.missing,
      });
      continue;
    }

    if (isTooShort(value as string)) {
      tooShort.push(c);
      feedbacks.push({
        target: c,
        verdict: "imprecise",
        message: MESSAGES.tooShort,
      });
      continue;
    }

    if (hasTautology(value as string)) {
      tautology.push(c);
      feedbacks.push({
        target: c,
        verdict: "wrong",
        message: tautologyMessageFor(c),
      });
      continue;
    }

    if (c === "event" && !looksConditional(value as string)) {
      nonConditionalEvent = true;
      feedbacks.push({
        target: "event",
        verdict: "imprecise",
        message: MESSAGES.nonConditional,
      });
      continue;
    }

    feedbacks.push({
      target: c,
      verdict: "ok",
      message: "Forme cohérente.",
    });
  }

  // Outcome global : si tout est OK sur la forme, on signale success ;
  // sinon partial. Le moteur d'auto-évaluation décidera si la passe
  // compte vers la maîtrise (l'apprenant note lui-même côté UI).
  const allOk = feedbacks.every((f) => f.verdict === "ok");
  const result: EvaluationResult = {
    feedbacks,
    outcome: allOk ? "success" : "partial",
  };

  return {
    missing,
    tooShort,
    tautology,
    nonConditionalEvent,
    result,
  };
}
