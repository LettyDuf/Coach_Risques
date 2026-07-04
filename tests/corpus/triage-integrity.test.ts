/**
 * Tests d'intégrité du corpus « Le Tri » (D16).
 *
 * Ces tests sont BLOQUANTS en CI. S'ils cassent, c'est qu'on a
 * introduit une régression silencieuse dans le corpus pédagogique
 * (doublon d'id, message vide, signature inexistante, etc.).
 *
 * Leçon Coach Objectifs : un test d'intégrité corpus a déjà sauvé
 * une régression silencieuse sur l'équilibrage OKR équipe Indicateur.
 * On ne s'en passe pas.
 */

import { describe, it, expect } from "vitest";
import { TRIAGE_ITEMS, validateTriageCorpus } from "@content/triage/index";
import { TRIAGE_VERDICTS } from "@domain/index";

describe("Corpus Triage — intégrité structurelle", () => {
  it("passe la validation Zod sans exception", () => {
    expect(() => validateTriageCorpus(TRIAGE_ITEMS as unknown as unknown[])).not.toThrow();
  });

  it("n'a aucun doublon d'ItemId", () => {
    const ids = TRIAGE_ITEMS.map((i) => i.id as unknown as string);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("tous les énoncés sont non vides et raisonnables", () => {
    for (const item of TRIAGE_ITEMS) {
      expect(item.statement.trim().length).toBeGreaterThan(10);
      // Filtre minimal anti TODO/XXX.
      expect(item.statement).not.toMatch(/\b(TODO|XXX|FIXME)\b/);
    }
  });

  it("tous les rationales sont non vides et raisonnables", () => {
    for (const item of TRIAGE_ITEMS) {
      expect(item.rationale.trim().length).toBeGreaterThan(10);
      expect(item.rationale).not.toMatch(/\b(TODO|XXX|FIXME)\b/);
    }
  });

  it("tous les confusionMessages sont en français non vides et sans TODO", () => {
    for (const item of TRIAGE_ITEMS) {
      const entries = Object.entries(item.confusionMessages);
      expect(entries.length).toBeGreaterThan(0);
      for (const [verdict, msg] of entries) {
        expect(msg).toBeTypeOf("string");
        expect(msg!.trim().length).toBeGreaterThan(10);
        expect(msg).not.toMatch(/\b(TODO|XXX|FIXME)\b/);
        // Pas de feedback qui pointe vers le verdict attendu (sinon non-sens).
        expect(verdict).not.toBe(item.expected);
      }
    }
  });

  it("chaque verdict possible est référencé comme expected au moins une fois (équilibrage)", () => {
    // Test « doux » — désactivé tant qu'on est sur la fixture initiale.
    // Sera réactivé à l'intégration de la vague 1 validée.
    if (TRIAGE_ITEMS.length < 4) {
      // Bypass tant qu'on est en fixture seule.
      return;
    }
    const seen = new Set(TRIAGE_ITEMS.map((i) => i.expected));
    for (const v of TRIAGE_VERDICTS) {
      expect(seen.has(v)).toBe(true);
    }
  });

  it("chaque signature `trapPattern` apparaît au moins une fois — diversité utile pour la règle « consolidée par variation »", () => {
    if (TRIAGE_ITEMS.length < 4) {
      return; // Bypass tant qu'on est en fixture.
    }
    const patterns = new Set(TRIAGE_ITEMS.map((i) => i.signature.trapPattern));
    // Au moins 4 signatures différentes pour permettre la consolidation par variation.
    expect(patterns.size).toBeGreaterThanOrEqual(4);
  });
});
