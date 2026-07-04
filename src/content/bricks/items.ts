/**
 * Corpus « Les Briques » — Vague 1 (20 items).
 *
 * Validé en bloc par Lætitia le 2026-07-01, source :
 * `proposition-corpus-briques.md` (sous-agent pédagogue + Lean-Agile + linguiste).
 *
 * Découpage en 3 fichiers pour la lisibilité, agrégés ici.
 */

import type { BrickItem } from "./types";
import { BRICKS_CAUSE_ITEMS } from "./items-cause";
import { BRICKS_EVENT_ITEMS } from "./items-event";
import { BRICKS_CONSEQUENCE_ITEMS } from "./items-consequence";

export const BRICKS_ITEMS: ReadonlyArray<BrickItem> = [
  ...BRICKS_CAUSE_ITEMS,
  ...BRICKS_EVENT_ITEMS,
  ...BRICKS_CONSEQUENCE_ITEMS,
];

export { BRICKS_CAUSE_ITEMS, BRICKS_EVENT_ITEMS, BRICKS_CONSEQUENCE_ITEMS };
