/**
 * Tests d'intégrité du corpus Les Briques (D16).
 */

import { describe, it, expect } from "vitest";
import { BRICKS_ITEMS, validateBricksCorpus } from "@content/bricks/index";

describe("Corpus Briques — intégrité structurelle", () => {
  it("passe la validation Zod sans exception", () => {
    expect(() =>
      validateBricksCorpus(BRICKS_ITEMS as unknown as unknown[]),
    ).not.toThrow();
  });

  it("n'a aucun doublon d'ItemId", () => {
    const ids = BRICKS_ITEMS.map((i) => i.id as unknown as string);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("distribution attendue : 8 cause + 6 event + 6 consequence", () => {
    const causes = BRICKS_ITEMS.filter((i) => i.component === "cause").length;
    const events = BRICKS_ITEMS.filter((i) => i.component === "event").length;
    const cons = BRICKS_ITEMS.filter((i) => i.component === "consequence").length;
    expect(causes).toBe(8);
    expect(events).toBe(6);
    expect(cons).toBe(6);
  });

  it("chaque item a exactement 4 candidats", () => {
    for (const item of BRICKS_ITEMS) {
      expect(item.candidates.length).toBe(4);
    }
  });

  it("chaque item a exactement 1 candidat de la bonne nature", () => {
    for (const item of BRICKS_ITEMS) {
      const correct = item.candidates.filter(
        (c) => c.nature === item.correctNature,
      );
      expect(correct.length).toBe(1);
    }
  });

  it("chaque piège porte un feedback non vide sans TODO", () => {
    for (const item of BRICKS_ITEMS) {
      for (const cand of item.candidates) {
        if (cand.nature !== item.correctNature) {
          expect(cand.feedback).toBeTruthy();
          expect((cand.feedback ?? "").length).toBeGreaterThan(20);
          expect(cand.feedback).not.toMatch(/\b(TODO|XXX|FIXME)\b/);
        }
      }
    }
  });
});
