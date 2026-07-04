/**
 * Identifiants typés du domaine.
 *
 * Brand types : on évite de confondre une `ZoneId` avec une `ItemId` ou
 * une `MechanicId` au niveau du compilateur, sans coût à l'exécution.
 */

declare const __brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [__brand]: B };

export type ItemId = Brand<string, "ItemId">;
export type ZoneId = Brand<string, "ZoneId">;
export type MechanicId = Brand<string, "MechanicId">;
export type SessionId = Brand<string, "SessionId">;

export const ItemId = (raw: string): ItemId => raw as ItemId;
export const ZoneId = (raw: string): ZoneId => raw as ZoneId;
export const MechanicId = (raw: string): MechanicId => raw as MechanicId;
export const SessionId = (raw: string): SessionId => raw as SessionId;

/** Les 6 zones de la Carte de maîtrise (UX-UI §2, DOMAINE §1-§6). */
export const ZONES = {
  TRIPTYQUE: ZoneId("triptyque"),
  ANATOMIE: ZoneId("anatomie"),
  EVALUATION: ZoneId("evaluation"),
  TRAITEMENT: ZoneId("traitement"),
  INDICATEURS: ZoneId("indicateurs"),
  REDUCTION_VALEUR: ZoneId("reduction-valeur"),
} as const;

/** Les 4 mécaniques du tronc commun (DOMAINE §8). */
export const MECHANICS = {
  TRI: MechanicId("tri"),
  DETECTIVE: MechanicId("detective"),
  BRICKS: MechanicId("bricks"),
  PARI: MechanicId("pari"),
  BROUILLARD: MechanicId("brouillard"),
} as const;
