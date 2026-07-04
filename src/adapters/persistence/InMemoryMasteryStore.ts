/**
 * Adaptateur driven — store en mémoire (pour tests et fallback).
 *
 * Pas de persistance entre sessions. Utile pour SSR, Node, ou comme
 * fallback quand LocalStorage est inaccessible (mode privé, contexte
 * iframe restrictive).
 */

import type { MasteryStore, SuccessfulPass } from "@domain/index";

export function createInMemoryMasteryStore(): MasteryStore {
  const passes: SuccessfulPass[] = [];
  let pointer: { mechanic: string; itemId: string } | null = null;

  return {
    readAllPasses: () => [...passes],
    appendPass: (p) => {
      passes.push(p);
    },
    readResumePointer: () => pointer,
    writeResumePointer: (p) => {
      pointer = p;
    },
  };
}
