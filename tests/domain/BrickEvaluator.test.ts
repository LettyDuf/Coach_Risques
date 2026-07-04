/**
 * Tests unitaires du service BrickEvaluator.
 */

import { describe, it, expect } from "vitest";
import { evaluateBrick } from "@domain/services/BrickEvaluator";

const causeQuestion = {
  correctNature: "cause",
  candidates: [
    { nature: "cause" },
    { nature: "constat", feedback: "C'est un constat, pas un facteur." },
    { nature: "evenement", feedback: "C'est l'événement redouté." },
    { nature: "antecedent", feedback: "C'est un précédent." },
  ],
};

describe("evaluateBrick", () => {
  it("retourne success quand la bonne nature est choisie", () => {
    const r = evaluateBrick(causeQuestion, "cause");
    expect(r.outcome).toBe("success");
    expect(r.feedbacks[0]?.verdict).toBe("ok");
  });

  it("retourne miss + feedback ciblé quand une mauvaise nature est choisie", () => {
    const r = evaluateBrick(causeQuestion, "constat");
    expect(r.outcome).toBe("miss");
    expect(r.feedbacks[0]?.verdict).toBe("wrong");
    expect(r.feedbacks[0]?.message).toContain("constat");
  });

  it("retourne miss avec message générique si le feedback n'est pas fourni", () => {
    const q = {
      correctNature: "cause",
      candidates: [{ nature: "cause" }, { nature: "constat" }],
    };
    const r = evaluateBrick(q, "constat");
    expect(r.outcome).toBe("miss");
    expect(r.feedbacks[0]?.message).toBeTruthy();
  });

  it("est pur (appels successifs donnent le même résultat)", () => {
    const a = evaluateBrick(causeQuestion, "cause");
    const b = evaluateBrick(causeQuestion, "cause");
    expect(a).toEqual(b);
  });
});
