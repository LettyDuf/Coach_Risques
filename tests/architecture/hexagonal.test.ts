// @vitest-environment node
import { describe, expect, it } from "vitest";
import { fileURLToPath } from "node:url";
import { findArchitectureViolations, type ArchitectureConfig } from "./hexagonal-rules";
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
const BROWSER_GLOBALS = ["window", "document", "localStorage", "sessionStorage", "navigator"];

const ARCHITECTURE: ArchitectureConfig = {
  sourceRoot: "src",
  aliases: { "@domain": "src/domain", "@content": "src/content", "@adapters": "src/adapters", "@app": "src/app" },
  rules: [
    { layer: "domain", mayDependOn: ["domain"], allowedPackages: [], forbiddenGlobals: BROWSER_GLOBALS },
    { layer: "content", mayDependOn: ["domain", "content"], allowedPackages: ["zod"], forbiddenGlobals: BROWSER_GLOBALS },
    { layer: "adapters", mayDependOn: ["domain", "content", "adapters"], allowedPackages: ["react", "react-dom"] },
  ],
};

const REPOSITORY_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const sources = readSourceFiles(REPOSITORY_ROOT, "src");

describe("architecture hexagonale", () => {
  it("trouve bien le code à vérifier", () => {
    expect(sources.filter((f) => f.path.startsWith("src/domain/")).length).toBeGreaterThan(5);
  });

  it("aucune couche ne dépend de ce qui lui est interdit", () => {
    expect(findArchitectureViolations(sources, ARCHITECTURE)).toEqual([]);
  });
});
