/**
 * Re-export du Context React de l'engine.
 *
 * Le vrai code (avec JSX) vit dans `EngineContext.tsx`.
 * Ce fichier .ts garantit la résolution sans extension dans les imports.
 */

export { EngineProvider, useEngine } from "./EngineContext";
