/**
 * Schéma Zod pour valider la forme d'un TriageItem au chargement.
 *
 * C'est le garde-fou « contenu pédagogique externalisé » de D14 :
 *  - si un item est mal formé, on échoue bruyamment (chargement),
 *  - jamais silencieusement (pas de fallback).
 *
 * Les tests d'intégrité du corpus (`tests/corpus/`) appellent ce
 * schéma pour garantir la non-régression.
 */

import { z } from "zod";
import { TRIAGE_VERDICTS } from "@domain/index";
import { MECHANICS } from "@domain/index";

const verdictSchema = z.enum(
  TRIAGE_VERDICTS as readonly [string, ...string[]],
);

const themeSchema = z.enum([
  "logiciel",
  "evenementiel",
  "industriel",
  "conseil",
  "rh",
  "operations",
]);

const signatureSchema = z.object({
  trapPattern: z.string().min(1),
  theme: z.string().min(1),
});

/**
 * Le mécanisme attendu pour un TriageItem est strictement `MECHANICS.TRI`.
 * Toute autre valeur est rejetée — sécurise le rangement du corpus par mécanique.
 */
const mechanicSchema = z.literal(MECHANICS.TRI as unknown as string);

export const triageItemSchema = z.object({
  id: z.string().min(1),
  mechanic: mechanicSchema,
  signature: signatureSchema,
  statement: z.string().min(10, "L'énoncé doit faire au moins 10 caractères."),
  expected: verdictSchema,
  rationale: z.string().min(10, "La justification pédagogique est trop courte."),
  confusionMessages: z
    .record(verdictSchema, z.string().min(10))
    .refine((m) => Object.keys(m).length >= 1, {
      message:
        "Au moins un message de feedback (pour la confusion la plus probable) est requis.",
    }),
  theme: themeSchema,
});

export type TriageItemRaw = z.infer<typeof triageItemSchema>;

export function validateTriageCorpus(items: unknown[]): TriageItemRaw[] {
  return items.map((item, idx) => {
    const result = triageItemSchema.safeParse(item);
    if (!result.success) {
      const issues = result.error.issues
        .map((i) => `${i.path.join(".") || "(root)"} : ${i.message}`)
        .join("\n  ");
      throw new Error(
        `Item de corpus Triage #${idx} invalide :\n  ${issues}`,
      );
    }
    return result.data;
  });
}
