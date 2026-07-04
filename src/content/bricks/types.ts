/**
 * Types du corpus « Les Briques ».
 *
 * 3 sous-mécaniques discriminées par `component` :
 *  - `cause`       : Le facteur (choisir la vraie cause parmi 4 candidats)
 *  - `event`       : Au conditionnel (choisir l'événement bien formulé)
 *  - `consequence` : Et alors ? (choisir la conséquence mesurable)
 *
 * Chaque item porte 4 candidats. Un seul est le bon (`nature === correctNature`),
 * les 3 autres portent une nature typée (le nom du piège) et un feedback ciblé
 * qui apparaît si l'apprenant clique dessus.
 *
 * Cohérent avec D20 (grammaire quaternaire unifiée) et D15 (les feedbacks sont
 * écrits par Lætitia dans le corpus, le moteur ne formule jamais).
 */

import type { ContentItem } from "@domain/index";

/** Nature possible d'un candidat pour la brique Cause. */
export type CauseNature = "cause" | "constat" | "evenement" | "antecedent";

/** Nature possible d'un candidat pour la brique Événement. */
export type EventNature =
  | "conditionnel"
  | "present-avere"
  | "passe-avere"
  | "futur-certain";

/** Nature possible d'un candidat pour la brique Conséquence. */
export type ConsequenceNature =
  | "mesurable"
  | "tautologie"
  | "affect"
  | "abstrait";

export type BrickTheme =
  | "ops"
  | "securite"
  | "sre"
  | "produit"
  | "data"
  | "cloud"
  | "dev"
  | "ci-cd"
  | "pi-planning"
  | "mep";

export type Candidate<N extends string> = {
  readonly nature: N;
  readonly text: string;
  /** Message affiché si l'apprenant clique sur ce candidat par erreur. Non requis pour la bonne réponse. */
  readonly feedback?: string;
};

/** Brique Le facteur (choisir la cause). */
export type BrickCauseItem = ContentItem & {
  readonly component: "cause";
  readonly theme: BrickTheme;
  readonly candidates: ReadonlyArray<Candidate<CauseNature>>;
  readonly correctNature: "cause";
};

/** Brique Au conditionnel (choisir l'événement bien formulé). */
export type BrickEventItem = ContentItem & {
  readonly component: "event";
  readonly theme: BrickTheme;
  readonly context: string;
  readonly candidates: ReadonlyArray<Candidate<EventNature>>;
  readonly correctNature: "conditionnel";
};

/** Brique Et alors ? (choisir la conséquence mesurable). */
export type BrickConsequenceItem = ContentItem & {
  readonly component: "consequence";
  readonly theme: BrickTheme;
  readonly context: string;
  readonly candidates: ReadonlyArray<Candidate<ConsequenceNature>>;
  readonly correctNature: "mesurable";
};

export type BrickItem = BrickCauseItem | BrickEventItem | BrickConsequenceItem;
