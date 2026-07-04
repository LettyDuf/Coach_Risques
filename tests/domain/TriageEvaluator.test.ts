/**
 * Tests unitaires du service TriageEvaluator.
 *
 * Discipline (D15) : on teste le COMPORTEMENT du service avec des
 * fixtures inventées. Les tests d'intégrité du *vrai corpus* sont
 * dans `tests/corpus/`.
 */

import { describe, it, expect } from "vitest";
import { evaluateTriage } from "@domain/services/TriageEvaluator";
import type { TriageQuestion } from "@domain/services/TriageEvaluator";

const sampleQuestion: TriageQuestion = {
  expected: "enjeu",
  rationale:
    "Qualitatif, antérieur au projet — c'est ce qui est en jeu avant toute mesure.",
  confusionMessages: {
    objectif:
      "Ce n'est pas un objectif parce qu'il n'y a rien à mesurer. Ici on est sur un enjeu.",
    issue:
      "Ce n'est pas une issue parce que rien n'est constaté. Ici on est sur un enjeu.",
  },
};

describe("evaluateTriage", () => {
  it("renvoie success + rationale quand la réponse est juste", () => {
    const result = evaluateTriage(sampleQuestion, "enjeu");

    expect(result.outcome).toBe("success");
    expect(result.feedbacks).toHaveLength(1);
    expect(result.feedbacks[0]?.verdict).toBe("ok");
    expect(result.feedbacks[0]?.message).toContain("Qualitatif");
  });

  it("renvoie miss + message ciblé quand l'item fournit la confusion", () => {
    const result = evaluateTriage(sampleQuestion, "objectif");

    expect(result.outcome).toBe("miss");
    expect(result.feedbacks[0]?.verdict).toBe("wrong");
    expect(result.feedbacks[0]?.message).toContain("pas un objectif");
  });

  it("renvoie miss + fallback générique si la confusion n'est pas couverte", () => {
    // La fixture ne couvre pas la confusion avec "risque".
    const result = evaluateTriage(sampleQuestion, "risque");

    expect(result.outcome).toBe("miss");
    expect(result.feedbacks[0]?.verdict).toBe("wrong");
    expect(result.feedbacks[0]?.message).toMatch(/risque/i);
  });

  it("est une fonction pure — appels successifs produisent le même résultat", () => {
    const a = evaluateTriage(sampleQuestion, "enjeu");
    const b = evaluateTriage(sampleQuestion, "enjeu");

    expect(a).toEqual(b);
  });
});
