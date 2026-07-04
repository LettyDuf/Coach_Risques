/**
 * Schéma Zod pour valider un ChainItem au chargement (D14).
 */

import { z } from "zod";
import { MECHANICS, RISK_COMPONENTS } from "@domain/index";

const componentSchema = z.enum(
  RISK_COMPONENTS as unknown as readonly [string, ...string[]],
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

const mechanicSchema = z.literal(MECHANICS.DETECTIVE as unknown as string);

const formulationSchema = z.object({
  cause: z.string().min(5),
  event: z.string().min(5),
  consequence: z.string().min(5),
});

export const chainItemSchema = z.object({
  id: z.string().min(1),
  mechanic: mechanicSchema,
  signature: signatureSchema,
  scenario: z.string().min(10, "Le scénario doit faire au moins 10 caractères."),
  revealedComponent: componentSchema,
  revealedText: z.string().min(5, "Le texte révélé est trop court."),
  expected: formulationSchema,
  defensibleVariant: formulationSchema,
  advice: z
    .record(componentSchema, z.string().min(10))
    .refine((m) => Object.keys(m).length >= 1, {
      message:
        "Au moins un conseil pédagogique (sur un composant à produire) est requis.",
    }),
  theme: themeSchema,
});

export type ChainItemRaw = z.infer<typeof chainItemSchema>;

export function validateChainCorpus(items: unknown[]): ChainItemRaw[] {
  return items.map((item, idx) => {
    const result = chainItemSchema.safeParse(item);
    if (!result.success) {
      const issues = result.error.issues
        .map((i) => `${i.path.join(".") || "(root)"} : ${i.message}`)
        .join("\n  ");
      throw new Error(
        `Item de corpus Chain #${idx} invalide :\n  ${issues}`,
      );
    }
    return result.data;
  });
}
