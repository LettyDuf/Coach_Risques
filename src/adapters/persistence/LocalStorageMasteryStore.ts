/**
 * Adaptateur driven — store LocalStorage avec schéma versionné (D18).
 *
 * Engagement : un apprenant qui revient trois mois après doit pouvoir
 * reprendre. La compatibilité ascendante n'est pas négociable.
 *
 * Stratégie :
 *  - chaque payload sérialisé porte `schemaVersion: number` ;
 *  - chargement = détection version + chaîne de migrations ;
 *  - migration manquante = chargement neutre + console.warn, JAMAIS crash.
 *
 * Si LocalStorage est indisponible (mode privé, iframe), on fallback
 * sur un InMemory store pour ne pas planter l'app.
 */

import type { MasteryStore, SuccessfulPass } from "@domain/index";
import { createInMemoryMasteryStore } from "./InMemoryMasteryStore";

const STORAGE_KEY = "coach-risques/v1/mastery";
const CURRENT_SCHEMA = 1 as const;

type PayloadV1 = {
  schemaVersion: 1;
  passes: SuccessfulPass[];
  resumePointer: { mechanic: string; itemId: string } | null;
};

type PayloadAny = { schemaVersion: number } & Record<string, unknown>;

function isLocalStorageAvailable(): boolean {
  try {
    const probe = "__coach_risques_probe__";
    localStorage.setItem(probe, probe);
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

function loadPayload(): PayloadV1 {
  const empty: PayloadV1 = {
    schemaVersion: CURRENT_SCHEMA,
    passes: [],
    resumePointer: null,
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as PayloadAny;
    if (!parsed || typeof parsed !== "object" || typeof parsed.schemaVersion !== "number") {
      console.warn("[Coach Risques] LocalStorage corrompu, repart à vide.");
      return empty;
    }
    return migrate(parsed);
  } catch (err) {
    console.warn("[Coach Risques] Lecture LocalStorage impossible :", err);
    return empty;
  }
}

function migrate(payload: PayloadAny): PayloadV1 {
  // V1 → V1 : pas de migration nécessaire.
  if (payload.schemaVersion === 1) {
    return payload as unknown as PayloadV1;
  }
  // Futur : insérer ici la chaîne de migrations (v1→v2→v3, etc.).
  console.warn(
    `[Coach Risques] schemaVersion ${payload.schemaVersion} inconnu, chargement neutre.`,
  );
  return {
    schemaVersion: CURRENT_SCHEMA,
    passes: [],
    resumePointer: null,
  };
}

function writePayload(payload: PayloadV1): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn("[Coach Risques] Écriture LocalStorage impossible :", err);
  }
}

export function createLocalStorageMasteryStore(): MasteryStore {
  if (!isLocalStorageAvailable()) {
    console.warn(
      "[Coach Risques] LocalStorage indisponible, fallback en mémoire (la progression sera perdue à la fermeture).",
    );
    return createInMemoryMasteryStore();
  }

  let cache = loadPayload();

  return {
    readAllPasses: () => [...cache.passes],
    appendPass: (p) => {
      cache = { ...cache, passes: [...cache.passes, p] };
      writePayload(cache);
    },
    readResumePointer: () => cache.resumePointer,
    writeResumePointer: (p) => {
      cache = { ...cache, resumePointer: p };
      writePayload(cache);
    },
  };
}
