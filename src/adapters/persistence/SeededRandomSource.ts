/**
 * Adaptateur driven — source de hasard.
 *
 * En production : `createBrowserRandomSource()` (utilise crypto si dispo).
 * En tests     : `createSeededRandomSource(seed)` (LCG déterministe).
 *
 * Discipline (D2) : le domaine n'utilise JAMAIS Math.random() directement.
 */

import type { RandomSource } from "@domain/index";

export function createBrowserRandomSource(): RandomSource {
  // Math.random() est suffisant pour la sélection d'items pédagogiques.
  // Pas besoin de crypto pour V1.
  return {
    nextInt: (max) => (max <= 0 ? 0 : Math.floor(Math.random() * max)),
    pick: <T,>(items: ReadonlyArray<T>) =>
      items[Math.floor(Math.random() * items.length)]!,
  };
}

export function createSeededRandomSource(seed: number = 1): RandomSource {
  let state = seed >>> 0;
  const next = (): number => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state;
  };
  return {
    nextInt: (max) => (max <= 0 ? 0 : next() % max),
    pick: <T,>(items: ReadonlyArray<T>) => items[next() % items.length]!,
  };
}
