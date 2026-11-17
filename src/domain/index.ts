/**
 * Point d'entrée public du domaine.
 *
 * Tout ce qui est exporté ici est accessible par les adaptateurs
 * et l'app. Le reste reste privé au domaine.
 */

// Value objects
export * from "./valueObjects/ids";
export * from "./valueObjects/RiskFormulation";
export * from "./valueObjects/TriageVerdict";
export * from "./valueObjects/Criticality";
export * from "./valueObjects/TreatmentChoice";
export * from "./valueObjects/ReviewFormulation";
export * from "./valueObjects/ComponentFeedback";
export * from "./valueObjects/Mastery";

// Ports
export type { RiskCoachEngine, NextItemRequest } from "./ports/RiskCoachEngine";
export type { ContentRepository, ContentItem } from "./ports/ContentRepository";
export type { MasteryStore, SuccessfulPass } from "./ports/MasteryStore";
export type { RandomSource } from "./ports/RandomSource";
export type { Clock } from "./ports/Clock";

// Forme des items consommés par le moteur (le contenu les remplit, le domaine les définit).
export type * from "./items/TriageItem";
export type * from "./items/ChainItem";
export type * from "./items/BrickItem";
