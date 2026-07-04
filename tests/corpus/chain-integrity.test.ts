/**
 * Tests d'intégrité du corpus « Le Détective » (D16).
 *
 * Bloquants en CI. Protègent contre la régression silencieuse sur le
 * contenu pédagogique (doublons, messages vides, signatures non variées).
 */

import { describe, it, expect } from "vitest";
import { CHAIN_ITEMS, validateChainCorpus } from "@content/chain/index";
import { RISK_COMPONENTS } from "@domain/index";

describe("Corpus Chain — intégrité structurelle", () => {
  it("passe la validation Zod sans exception", () => {
    expect(() => validateChainCorpus(CHAIN_ITEMS as unknown as unknown[])).not.toThrow();
  });

  it("n'a aucun doublon d'ItemId", () => {
    const ids = CHAIN_ITEMS.map((i) => i.id as unknown as string);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("tous les scénarios sont raisonnables et sans TODO", () => {
    for (const item of CHAIN_ITEMS) {
      expect(item.scenario.trim().length).toBeGreaterThan(30);
      expect(item.scenario).not.toMatch(/\b(TODO|XXX|FIXME)\b/);
    }
  });

  it("tous les textes révélés sont non vides", () => {
    for (const item of CHAIN_ITEMS) {
      expect(item.revealedText.trim().length).toBeGreaterThan(10);
      expect(item.revealedText).not.toMatch(/\b(TODO|XXX|FIXME)\b/);
    }
  });

  it("le composant révélé existe et correspond à un composant valide", () => {
    for (const item of CHAIN_ITEMS) {
      expect(RISK_COMPONENTS).toContain(item.revealedComponent);
    }
  });

  it("expected et defensibleVariant ont leurs 3 composants non vides", () => {
    for (const item of CHAIN_ITEMS) {
      for (const c of RISK_COMPONENTS) {
        expect(item.expected[c].trim().length).toBeGreaterThan(5);
        expect(item.defensibleVariant[c].trim().length).toBeGreaterThan(5);
      }
    }
  });

  it("chaque item fournit au moins un conseil pédagogique pour les composants à produire", () => {
    for (const item of CHAIN_ITEMS) {
      const producedComponents = RISK_COMPONENTS.filter(
        (c) => c !== item.revealedComponent,
      );
      const advicedKeys = Object.keys(item.advice);
      const intersection = advicedKeys.filter((k) =>
        producedComponents.includes(k as (typeof RISK_COMPONENTS)[number]),
      );
      expect(intersection.length).toBeGreaterThanOrEqual(1);
      for (const c of advicedKeys) {
        expect((item.advice[c as (typeof RISK_COMPONENTS)[number]] ?? "").trim().length).toBeGreaterThan(20);
      }
    }
  });

  it("la distribution des composants révélés est équilibrée (au moins 1 de chaque)", () => {
    const counts = new Map<string, number>();
    for (const item of CHAIN_ITEMS) {
      const c = item.revealedComponent;
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    for (const c of RISK_COMPONENTS) {
      expect(counts.get(c) ?? 0).toBeGreaterThanOrEqual(1);
    }
  });

  it("au moins 4 signatures distinctes (règle « consolidée par variation »)", () => {
    const patterns = new Set(CHAIN_ITEMS.map((i) => i.signature.trapPattern));
    expect(patterns.size).toBeGreaterThanOrEqual(4);
  });
});
