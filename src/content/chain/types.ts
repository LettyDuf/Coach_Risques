/**
 * Types du corpus « Le Détective » (mécanique chain).
 *
 * Chaque item présente un scénario et UN composant déjà rempli (la « preuve »).
 * L'apprenant produit les DEUX autres en saisie libre.
 *
 * L'évaluation V1 est volontairement minimaliste côté algorithmique :
 *  - vérifications de FORME par le moteur (longueur, conditionnel, anti-patterns
 *    de tautologie évidente),
 *  - présentation systématique d'une `defensibleVariant` en regard,
 *  - auto-évaluation comparée par l'apprenant.
 *
 * Discipline (D15) : aucun message pédagogique n'est généré par le moteur.
 * Toute formulation visible est écrite par Lætitia dans ce fichier.
 */

import type { ContentItem, RiskFormulation, RiskComponent } from "@domain/index";

export type ChainTheme =
  | "logiciel"
  | "evenementiel"
  | "industriel"
  | "conseil"
  | "rh"
  | "operations";

/** Conseil pédagogique par composant produit, affiché à la demande. */
export type ChainAdvice = Partial<Record<RiskComponent, string>>;

export type ChainItem = ContentItem & {
  /** Micro-contexte (2 lignes max), planté avant les cases à remplir. */
  readonly scenario: string;
  /** Lequel des trois composants est pré-rempli. */
  readonly revealedComponent: RiskComponent;
  /** Le texte de la case révélée (lecture seule à l'écran). */
  readonly revealedText: string;
  /** La chaîne canonique (Lætitia). Sert de référence interne, pas affichée brute. */
  readonly expected: RiskFormulation;
  /** Formulation alternative défendable, présentée en regard de la production apprenant. */
  readonly defensibleVariant: RiskFormulation;
  /** Conseils pédagogiques par composant produit (« voir le pourquoi »). */
  readonly advice: ChainAdvice;
  /** Thème du scénario (diversité de pool). */
  readonly theme: ChainTheme;
};
