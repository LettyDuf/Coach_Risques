/**
 * Composition root — le SEUL endroit où on branche le domaine
 * aux adaptateurs concrets.
 *
 * Si demain on remplace LocalStorage par IndexedDB, ou on ajoute un
 * adaptateur de télémétrie, c'est ici (et nulle part ailleurs) qu'on
 * touche.
 */

import { createRiskCoachEngine } from "@domain/engine/RiskCoachEngineImpl";
import { createJsonContentRepository } from "@adapters/content-loader/JsonContentRepository";
import { createInMemoryMasteryStore } from "@adapters/persistence/InMemoryMasteryStore";
import { createSystemClock } from "@adapters/persistence/SystemClock";
import { createBrowserRandomSource } from "@adapters/persistence/SeededRandomSource";
import type { RiskCoachEngine } from "@domain/index";

/**
 * Composition root — mode ATELIER (V1).
 *
 * Le store de maîtrise est en mémoire : à chaque rechargement, on repart
 * à vide. Choix assumé pour animer des ateliers collectifs sans polluer
 * la machine qui projette avec l'historique des sessions précédentes.
 *
 * Pour réactiver la persistance individuelle, remplacer
 * `createInMemoryMasteryStore` par `createLocalStorageMasteryStore`.
 */
export function composeEngine(): RiskCoachEngine {
  return createRiskCoachEngine({
    content: createJsonContentRepository(),
    mastery: createInMemoryMasteryStore(),
    clock: createSystemClock(),
    random: createBrowserRandomSource(),
  });
}
