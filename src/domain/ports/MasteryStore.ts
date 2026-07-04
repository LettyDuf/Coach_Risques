/**
 * Port de sortie (driven) — persistance de l'état de progression.
 *
 * Le domaine ignore si on persiste en LocalStorage, IndexedDB ou
 * en mémoire (tests). L'adaptateur `LocalStorageMasteryStore`
 * gère le versioning et les migrations (D18).
 */

import type { ZoneId } from "../valueObjects/ids";
import type { ItemSignature } from "../valueObjects/Mastery";

/**
 * Trace minimale d'un exercice réussi : sur quelle zone, avec quelle
 * signature d'item, et quand. Sert à calculer le passage à
 * « consolidée par variation ».
 */
export type SuccessfulPass = {
  readonly zone: ZoneId;
  readonly signature: ItemSignature;
  readonly at: number; // epoch ms (fourni par Clock pour testabilité)
};

export type MasteryStore = {
  /** Toutes les passes réussies de l'apprenant courant. */
  readAllPasses(): ReadonlyArray<SuccessfulPass>;

  /** Ajoute une passe (idempotent : doublons à la même seconde déduplicés). */
  appendPass(pass: SuccessfulPass): void;

  /** Pointeur « reprise où on s'est arrêté » — null si rien à reprendre. */
  readResumePointer(): { mechanic: string; itemId: string } | null;
  writeResumePointer(pointer: { mechanic: string; itemId: string } | null): void;
};
