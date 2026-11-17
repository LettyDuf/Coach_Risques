// @vitest-environment node
import { describe, expect, it } from "vitest";
import { fileURLToPath } from "node:url";
import { findArchitectureViolations, layerOf, type ArchitectureConfig } from "./hexagonal-rules";
import { readSourceFiles } from "./source-files";

/**
 * FILET D'ARCHITECTURE HEXAGONALE (règle non négociable des outils Gesto).
 *
 * Le cœur métier (domain) ne dépend de rien d'autre que de lui-même : ni de l'interface,
 * ni du contenu, ni d'une bibliothèque (zod compris), ni du navigateur. Le contenu
 * pédagogique (content) ne connaît que le domaine et zod. Les adaptateurs ne connaissent
 * pas l'application (app), qui seule assemble le tout. Complète le canari
 * tests/domain/canary-isolation.test.ts (le domaine tourne sans navigateur) et la règle
 * ESLint boundaries (retour dès l'écriture) : ici, c'est un test rouge qui bloque la publication.
 * Si ce test échoue, on corrige la dépendance : on ne
 * l'assouplit pas sans décision tracée dans DECISIONS.md.
 */
/** Objets du navigateur et de Node : le cœur et le contenu doivent tourner sans eux. */
const FORBIDDEN_GLOBALS = [
  "window", "document", "localStorage", "sessionStorage", "navigator",
  "globalThis", "process", "require",
];

const ARCHITECTURE: ArchitectureConfig = {
  sourceRoot: "src",
  aliases: { "@domain": "src/domain", "@content": "src/content", "@adapters": "src/adapters", "@app": "src/app" },
  rules: [
    { layer: "domain", mayDependOn: ["domain"], allowedPackages: [], forbiddenGlobals: FORBIDDEN_GLOBALS },
    { layer: "content", mayDependOn: ["domain", "content"], allowedPackages: ["zod"], forbiddenGlobals: FORBIDDEN_GLOBALS },
    { layer: "adapters", mayDependOn: ["domain", "content", "adapters"], allowedPackages: ["react", "react-dom", "lucide-react", "zustand"] },
  ],
};

/**
 * Liste fermée des dossiers de src. Un nouveau dossier (src/core, src/services…) fait
 * échouer le test : on décide alors explicitement de sa règle ci-dessus.
 */
const DECLARED_TOP_LEVEL = ["domain", "content", "adapters", "app"];

const REPOSITORY_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const sources = readSourceFiles(REPOSITORY_ROOT, "src");

describe("architecture hexagonale", () => {
  it("trouve bien le code à vérifier", () => {
    expect(sources.filter((f) => f.path.startsWith("src/domain/")).length).toBeGreaterThan(5);
  });

  it("ne laisse aucun dossier de src hors de surveillance", () => {
    const undeclared = sources
      .map((f) => layerOf(f.path, ARCHITECTURE.sourceRoot))
      .filter((layer) => !DECLARED_TOP_LEVEL.includes(layer));
    expect([...new Set(undeclared)]).toEqual([]);
  });

  it("aucune couche ne dépend de ce qui lui est interdit", () => {
    expect(findArchitectureViolations(sources, ARCHITECTURE)).toEqual([]);
  });
});
