/**
 * Port de sortie (driven) — accès au corpus pédagogique.
 *
 * Le domaine ignore où vit le corpus (JSON bundlé, fichier, futur
 * back-end). Il demande des items par mécanique et reçoit des objets
 * typés. Le contenu lui-même est externalisé (D14, D15).
 */

import type { ItemId, MechanicId } from "../valueObjects/ids";

/**
 * Item neutre côté domaine — chaque mécanique étend cette base
 * avec ses propres règles dans `src/content/<mecanique>/types.ts`.
 */
export type ContentItem = {
  readonly id: ItemId;
  readonly mechanic: MechanicId;
  readonly signature: { readonly trapPattern: string; readonly theme: string };
};

export type ContentRepository = {
  /** Récupère un item par identifiant. `null` si inconnu (jamais d'exception au domaine). */
  findById<T extends ContentItem>(id: ItemId): T | null;

  /** Liste tous les items d'une mécanique. Ordre stable (utile aux tests). */
  listByMechanic<T extends ContentItem>(mechanic: MechanicId): ReadonlyArray<T>;
};
