/**
 * Tests unitaires du diagnostiqueur de chaîne (Le Détective).
 *
 * Vérifie la détection des défauts de forme. La sémantique (« cette
 * cause est-elle pertinente ? ») relève de l'auto-évaluation
 * comparée côté UI, pas du moteur.
 */

import { describe, it, expect } from "vitest";
import { diagnoseChain } from "@domain/services/ChainDiagnoser";

describe("diagnoseChain — forme par composant", () => {
  it("ignore le composant révélé (cause)", () => {
    const d = diagnoseChain(
      { revealedComponent: "cause" },
      { event: "Le serveur pourrait tomber au pic de charge", consequence: "Deux jours de sprint perdus" },
    );
    expect(d.missing).not.toContain("cause");
    expect(d.result.feedbacks.find((f) => f.target === "cause")).toBeUndefined();
  });

  it("signale les composants manquants", () => {
    const d = diagnoseChain(
      { revealedComponent: "cause" },
      { event: "", consequence: "" },
    );
    expect(d.missing).toContain("event");
    expect(d.missing).toContain("consequence");
    expect(d.result.outcome).toBe("partial");
  });

  it("signale les composants trop courts", () => {
    const d = diagnoseChain(
      { revealedComponent: "cause" },
      { event: "court", consequence: "bref" },
    );
    expect(d.tooShort).toContain("event");
    expect(d.tooShort).toContain("consequence");
  });

  it("détecte la tautologie « risque de ne pas »", () => {
    const d = diagnoseChain(
      { revealedComponent: "cause" },
      {
        event: "On pourrait avoir un blocage technique",
        consequence: "Risque de ne pas livrer la V2 le 30 septembre",
      },
    );
    expect(d.tautology).toContain("consequence");
  });

  it("alerte si l'événement n'est pas au conditionnel", () => {
    const d = diagnoseChain(
      { revealedComponent: "cause" },
      {
        event: "Le serveur tombe pendant la démo.",
        consequence: "Deux jours de sprint perdus à recoller les morceaux.",
      },
    );
    expect(d.nonConditionalEvent).toBe(true);
  });

  it("renvoie success quand tout est OK sur la forme", () => {
    const d = diagnoseChain(
      { revealedComponent: "cause" },
      {
        event: "Le serveur pourrait tomber au pic de charge de la démo",
        consequence:
          "On perdrait la moitié du sprint à recoller les morceaux côté équipe",
      },
    );
    expect(d.result.outcome).toBe("success");
    expect(d.result.feedbacks.every((f) => f.verdict === "ok")).toBe(true);
  });
});
