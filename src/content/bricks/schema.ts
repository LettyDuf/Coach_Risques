/**
 * Schéma Zod pour valider la forme des BrickItem au chargement.
 *
 * Garde-fou D14 : échec bruyant à la construction si un item est mal formé.
 */

import { z } from "zod";
import { MECHANICS } from "@domain/index";

const themeSchema = z.enum([
  "ops",
  "securite",
  "sre",
  "produit",
  "data",
  "cloud",
  "dev",
  "ci-cd",
  "pi-planning",
  "mep",
]);

const signatureSchema = z.object({
  trapPattern: z.string().min(1),
  theme: z.string().min(1),
});

const mechanicSchema = z.literal(MECHANICS.BRICKS as unknown as string);

// Cause candidates
const causeCandidateSchema = z.object({
  nature: z.enum(["cause", "constat", "evenement", "antecedent"]),
  text: z.string().min(10),
  feedback: z.string().min(10).optional(),
});

const causeItemSchema = z.object({
  id: z.string().min(1),
  mechanic: mechanicSchema,
  signature: signatureSchema,
  component: z.literal("cause"),
  theme: themeSchema,
  candidates: z.array(causeCandidateSchema).length(4),
  correctNature: z.literal("cause"),
});

// Event candidates
const eventCandidateSchema = z.object({
  nature: z.enum(["conditionnel", "present-avere", "passe-avere", "futur-certain"]),
  text: z.string().min(10),
  feedback: z.string().min(10).optional(),
});

const eventItemSchema = z.object({
  id: z.string().min(1),
  mechanic: mechanicSchema,
  signature: signatureSchema,
  component: z.literal("event"),
  theme: themeSchema,
  context: z.string().min(20),
  candidates: z.array(eventCandidateSchema).length(4),
  correctNature: z.literal("conditionnel"),
});

// Consequence candidates
const consequenceCandidateSchema = z.object({
  nature: z.enum(["mesurable", "tautologie", "affect", "abstrait"]),
  text: z.string().min(10),
  feedback: z.string().min(10).optional(),
});

const consequenceItemSchema = z.object({
  id: z.string().min(1),
  mechanic: mechanicSchema,
  signature: signatureSchema,
  component: z.literal("consequence"),
  theme: themeSchema,
  context: z.string().min(20),
  candidates: z.array(consequenceCandidateSchema).length(4),
  correctNature: z.literal("mesurable"),
});

const brickItemSchema = z.discriminatedUnion("component", [
  causeItemSchema,
  eventItemSchema,
  consequenceItemSchema,
]);

export function validateBricksCorpus(items: unknown[]): unknown[] {
  return items.map((item, idx) => {
    const r = brickItemSchema.safeParse(item);
    if (!r.success) {
      const issues = r.error.issues
        .map((i) => `${i.path.join(".") || "(root)"} : ${i.message}`)
        .join("\n  ");
      throw new Error(
        `Item de corpus Briques #${idx} invalide :\n  ${issues}`,
      );
    }
    // Chaque item DOIT contenir exactement un candidat de la bonne nature
    const correct = r.data.candidates.filter(
      (cand) => cand.nature === r.data.correctNature,
    );
    if (correct.length !== 1) {
      throw new Error(
        `Item Briques ${r.data.id} : attendu 1 candidat ${r.data.correctNature}, trouvé ${correct.length}`,
      );
    }
    return r.data;
  });
}
