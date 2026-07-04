/**
 * Adaptateur driven — accès au corpus pédagogique bundlé.
 *
 * V1 : tout le corpus est embarqué côté client (TS bundlé par Vite).
 * Plus tard, on pourra charger depuis un endpoint sans changer le port
 * `ContentRepository` ni le domaine.
 *
 * Discipline (D14) : le domaine ignore complètement cette implémentation.
 * Si demain on bascule sur fetch(), le canari ne bouge pas et les tests
 * d'intégrité non plus.
 */

import type {
  ContentItem,
  ContentRepository,
  ItemId,
  MechanicId,
} from "@domain/index";
import { TRIAGE_ITEMS, CHAIN_ITEMS, BRICKS_ITEMS } from "@content/index";
import { validateTriageCorpus } from "@content/triage/schema";
import { validateChainCorpus } from "@content/chain/schema";
import { validateBricksCorpus } from "@content/bricks/schema";

type AnyItem = ContentItem;

function buildIndex(): Map<string, AnyItem> {
  const index = new Map<string, AnyItem>();

  // Validation Zod du corpus à la construction (D14) — échec bruyant si schéma cassé.
  const triageItems = validateTriageCorpus(TRIAGE_ITEMS as unknown as unknown[]);
  const chainItems = validateChainCorpus(CHAIN_ITEMS as unknown as unknown[]);
  const bricksItems = validateBricksCorpus(BRICKS_ITEMS as unknown as unknown[]);

  const allItems: ReadonlyArray<AnyItem> = [
    ...(triageItems as unknown as ReadonlyArray<AnyItem>),
    ...(chainItems as unknown as ReadonlyArray<AnyItem>),
    ...(bricksItems as unknown as ReadonlyArray<AnyItem>),
  ];

  for (const item of allItems) {
    if (index.has(item.id as unknown as string)) {
      throw new Error(`Doublon d'ItemId détecté : ${item.id as unknown as string}`);
    }
    index.set(item.id as unknown as string, item);
  }

  return index;
}

export function createJsonContentRepository(): ContentRepository {
  const index = buildIndex();
  const ordered = Array.from(index.values());

  return {
    findById<T extends ContentItem>(id: ItemId): T | null {
      const found = index.get(id as unknown as string);
      return (found as unknown as T) ?? null;
    },
    listByMechanic<T extends ContentItem>(mechanic: MechanicId): ReadonlyArray<T> {
      const filtered = ordered.filter((it) => it.mechanic === mechanic);
      return filtered as unknown as ReadonlyArray<T>;
    },
  };
}
