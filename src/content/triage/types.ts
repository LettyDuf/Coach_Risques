/**
 * Types du corpus « Le Tri ».
 *
 * Chaque item porte :
 *  - son énoncé (la formulation libre à classer) ;
 *  - le verdict attendu (réponse juste) ;
 *  - sa justification pédagogique (visible en « voir le pourquoi ») ;
 *  - les messages de feedback pour chaque verdict erroné possible.
 *
 * Discipline (D15) : aucun message n'est généré par le moteur. Tous
 * les messages sont écrits en français par Lætitia dans ce fichier.
 * Le moteur sélectionne, ne formule jamais.
 */

import type { ContentItem } from "@domain/index";
import type { TriageVerdict } from "@domain/index";

export type TriageTheme =
  | "logiciel"
  | "evenementiel"
  | "industriel"
  | "conseil"
  | "rh"
  | "operations";

/**
 * Messages de feedback en cas de réponse erronée.
 * Au moins une entrée (la confusion la plus probable) est requise par item.
 * Les autres entrées sont optionnelles — fallback générique si absent.
 */
export type TriageConfusionMessages = Partial<Record<TriageVerdict, string>>;

export type TriageItem = ContentItem & {
  /** L'énoncé libre que l'apprenant doit classer. */
  readonly statement: string;
  /** La bonne réponse. */
  readonly expected: TriageVerdict;
  /** Argument pédagogique du « pourquoi cette catégorie » (visible à la demande). */
  readonly rationale: string;
  /** Messages structurés par verdict erroné. */
  readonly confusionMessages: TriageConfusionMessages;
  /** Thème du scénario (pour la diversité de pool). */
  readonly theme: TriageTheme;
};
