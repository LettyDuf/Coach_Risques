/**
 * ESLint — garde-fou architecture hexagonale.
 *
 * Règles de boundaries :
 *  - `domain` ne peut dépendre que de lui-même.
 *  - `content` ne peut dépendre que de `domain` (pour les types Zod).
 *  - `adapters` peut dépendre de `domain` et `content`.
 *  - `app` peut dépendre de tout (composition root).
 *
 * Si un fichier `src/domain/**` importe React, jsdom, window, localStorage —
 * ESLint râle ET le canari Node casse à l'exécution. Double filet de sécurité.
 */
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["@typescript-eslint", "react-hooks", "react-refresh", "boundaries"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:boundaries/recommended",
  ],
  settings: {
    "boundaries/elements": [
      { type: "domain", pattern: "src/domain/**" },
      { type: "content", pattern: "src/content/**" },
      { type: "adapters", pattern: "src/adapters/**" },
      { type: "app", pattern: "src/app/**" },
    ],
  },
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          { from: "domain", allow: ["domain"] },
          { from: "content", allow: ["domain", "content"] },
          { from: "adapters", allow: ["domain", "content", "adapters"] },
          { from: "app", allow: ["domain", "content", "adapters", "app"] },
        ],
      },
    ],
    // Interdiction explicite d'importer React ou des modules navigateur dans le domaine.
    "no-restricted-imports": [
      "off", // override par overrides pour le domaine
    ],
  },
  overrides: [
    {
      files: ["src/domain/**/*.{ts,tsx}"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: [
              { name: "react", message: "Le domaine doit rester pur (D2, D14). Pas de React." },
              { name: "react-dom", message: "Le domaine doit rester pur (D2, D14)." },
              { name: "zustand", message: "Le domaine doit rester pur. Zustand est UI." },
            ],
            patterns: [
              { group: ["react/*", "react-dom/*"], message: "Pas de React dans le domaine." },
              { group: ["@adapters/*", "@app/*"], message: "Le domaine ignore les adaptateurs et l'app." },
            ],
          },
        ],
        // Interdiction des globaux navigateur dans le domaine.
        "no-restricted-globals": [
          "error",
          { name: "window", message: "Pas de window dans le domaine." },
          { name: "document", message: "Pas de document dans le domaine." },
          { name: "localStorage", message: "Pas de localStorage dans le domaine (utiliser le port MasteryStore)." },
          { name: "sessionStorage", message: "Pas de sessionStorage dans le domaine." },
          { name: "navigator", message: "Pas de navigator dans le domaine." },
        ],
      },
    },
  ],
  ignorePatterns: ["dist", "node_modules", "*.cjs"],
};
