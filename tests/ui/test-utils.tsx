/**
 * Helpers de test communs aux écrans React.
 *
 * - `renderWithEngine` monte un composant en injectant un engine
 *   construit à partir d'un store mastery en mémoire (jamais de
 *   localStorage en test) et d'une source de hasard à graine fixe
 *   (déterminisme).
 */

import { render, type RenderResult } from "@testing-library/react";
import type { ReactElement } from "react";
import { EngineProvider } from "@adapters/ui/hooks/useEngine";
import { createRiskCoachEngine } from "@domain/engine/RiskCoachEngineImpl";
import { createJsonContentRepository } from "@adapters/content-loader/JsonContentRepository";
import { createInMemoryMasteryStore } from "@adapters/persistence/InMemoryMasteryStore";
import { createSeededRandomSource } from "@adapters/persistence/SeededRandomSource";
import type { RiskCoachEngine } from "@domain/index";

export type TestEngineBundle = {
  engine: RiskCoachEngine;
};

export function makeTestEngine(seed: number = 1): TestEngineBundle {
  const engine = createRiskCoachEngine({
    content: createJsonContentRepository(),
    mastery: createInMemoryMasteryStore(),
    clock: { now: () => 1_700_000_000_000 },
    random: createSeededRandomSource(seed),
  });
  return { engine };
}

export function renderWithEngine(
  ui: ReactElement,
  seed: number = 1,
): RenderResult & TestEngineBundle {
  const bundle = makeTestEngine(seed);
  const result = render(
    <EngineProvider engine={bundle.engine}>{ui}</EngineProvider>,
  );
  return { ...result, engine: bundle.engine };
}
