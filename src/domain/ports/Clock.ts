/**
 * Port de sortie (driven) — horloge injectée.
 *
 * Le domaine n'utilise JAMAIS `Date.now()` directement, sinon
 * les tests d'agrégation temporelle deviennent fragiles. En tests
 * on injecte un `FakeClock`.
 */
export type Clock = {
  now(): number; // epoch ms
};
