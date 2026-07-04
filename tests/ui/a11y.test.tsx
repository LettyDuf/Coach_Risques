/**
 * Tests d'accessibilité WCAG 2.1 AA — garde-fou D16.
 *
 * Bloquants en CI. axe-core scanne les violations courantes :
 *  - contrastes
 *  - sémantique ARIA
 *  - structure des landmarks
 *  - labels, alt texts
 *  - rôles
 *
 * Note : axe en jsdom ne teste pas les contrastes (pas de rendering
 * pixel). Les contrastes restent à valider à l'œil + outil de design
 * (Stark, axe DevTools navigateur).
 */

import { describe, it, expect, beforeEach } from "vitest";
import { axe } from "vitest-axe";
import * as matchers from "vitest-axe/matchers";
import Hub from "@adapters/ui/hub/Hub";
import TriBoard from "@adapters/ui/mechanics/TriBoard";
import DetectiveBoard from "@adapters/ui/mechanics/DetectiveBoard";
import { renderWithEngine } from "./test-utils";

expect.extend(matchers);

beforeEach(() => {
  try {
    localStorage.clear();
  } catch {
    /* ignore */
  }
});

describe("Accessibilité — Hub", () => {
  it("ne déclenche aucune violation axe-core", async () => {
    const { container } = renderWithEngine(<Hub onOpenMechanic={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Accessibilité — TriBoard", () => {
  it("ne déclenche aucune violation axe-core au rendu initial", async () => {
    const { container } = renderWithEngine(<TriBoard onExit={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Accessibilité — DetectiveBoard", () => {
  it("ne déclenche aucune violation axe-core au rendu initial", async () => {
    const { container } = renderWithEngine(<DetectiveBoard onExit={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
