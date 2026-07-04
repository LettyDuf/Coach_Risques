/**
 * « Les Briques » (O2 : reconnaissance isolée).
 *
 * Spec D20 : grammaire quaternaire unifiée (4 candidats, 1 clic, raccourcis 1/2/3/4).
 * D21 : séquence Cause → Conséquence → Événement (accessibilité cognitive croissante).
 * D22 : Les Briques valent au maximum « travaillée » sur Anatomie.
 *
 * V1 : 3 items par brique tirés au hasard sans remise, fil de trois traits pour
 * matérialiser la position dans la séquence, feedback ciblé par piège.
 */

import { useEffect, useMemo, useState } from "react";
import { useEngine } from "@adapters/ui/hooks/useEngine";
import {
  MECHANICS,
  ZONES,
  type EvaluationResult,
  type ItemId,
} from "@domain/index";
import type { BrickItem } from "@content/bricks/types";
import { createJsonContentRepository } from "@adapters/content-loader/JsonContentRepository";
import "./BricksBoard.css";

// Séquence D21
const BRICK_ORDER = ["cause", "consequence", "event"] as const;
type BrickComponent = (typeof BRICK_ORDER)[number];

const BRICK_TITLE: Record<BrickComponent, string> = {
  cause: "Le facteur",
  consequence: "Et alors ?",
  event: "Au conditionnel",
};

const BRICK_PROMPT: Record<BrickComponent, string> = {
  cause: "Laquelle est une cause ?",
  consequence: "Quelle conséquence est utile au pilotage ?",
  event: "Lequel est un événement encore incertain (un risque bien formulé) ?",
};

const NATURE_LABEL: Record<string, string> = {
  cause: "Cause",
  constat: "Constat",
  evenement: "Événement",
  antecedent: "Antécédent",
  conditionnel: "Conditionnel",
  "present-avere": "Présent avéré",
  "passe-avere": "Passé avéré",
  "futur-certain": "Futur certain",
  mesurable: "Mesurable",
  tautologie: "Tautologie",
  affect: "Affect",
  abstrait: "Abstrait",
};

/**
 * Question à laquelle chaque nature répond. Sert à ancrer sémantiquement
 * la réponse : « la cause répond à : qu'est-ce qui rend l'événement possible ? ».
 * En cas d'erreur, on montre aussi la question à laquelle la nature choisie
 * répond, pour révéler le contraste.
 */
const NATURE_QUESTION: Record<string, string> = {
  // Brique Le facteur (Cause)
  cause: "Qu'est-ce qui rend cet événement possible ?",
  constat: "Comment est-ce actuellement ?",
  evenement: "Qu'est-ce qui pourrait arriver ?",
  antecedent: "Que s'est-il passé auparavant ?",
  // Brique Au conditionnel (Événement)
  conditionnel: "Qu'est-ce qui pourrait arriver, mais qui n'est pas encore certain ?",
  "present-avere": "Qu'est-ce qui se passe déjà maintenant ?",
  "passe-avere": "Qu'est-ce qui s'est déjà passé ?",
  "futur-certain": "Qu'est-ce qui va sûrement arriver ?",
  // Brique Et alors ? (Conséquence)
  mesurable: "Et alors ? Qu'est-ce qui bouge, sur quoi, de combien ?",
  tautologie: "(la phrase répète ce qui vient d'être dit)",
  affect: "Quel ressenti cela produit-il ?",
  abstrait: "Quel impact en général ?",
};

const COMPONENT_ARTICLE: Record<BrickComponent, { good: string; wrong: string }> = {
  cause: { good: "Une cause", wrong: "" },
  event: { good: "Un événement de risque", wrong: "" },
  consequence: { good: "Une conséquence utile", wrong: "" },
};

const ITEMS_PER_BRICK = 3;

let _repo: ReturnType<typeof createJsonContentRepository> | null = null;
function getRepo() {
  if (!_repo) _repo = createJsonContentRepository();
  return _repo;
}

export type BricksBoardProps = {
  onExit: () => void;
};

type PickedItem = { itemId: ItemId; item: BrickItem };

/** Choisit N items d'un component au hasard sans remise. */
function pickItems(
  component: BrickComponent,
  n: number,
): ReadonlyArray<PickedItem> {
  const all = getRepo().listByMechanic<BrickItem>(MECHANICS.BRICKS);
  const pool = all.filter((it) => it.component === component);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length)).map((item) => ({
    itemId: item.id,
    item,
  }));
}

export default function BricksBoard(props: BricksBoardProps) {
  const engine = useEngine();
  const [brickIndex, setBrickIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [done, setDone] = useState(false);

  const currentComponent = BRICK_ORDER[brickIndex]!;

  // Tirer les items pour la brique courante — reset à chaque changement de brique.
  const items = useMemo<ReadonlyArray<PickedItem>>(
    () => pickItems(currentComponent, ITEMS_PER_BRICK),
    [currentComponent],
  );

  const current = items[itemIndex];

  /**
   * Ordre des candidats aléatoire, recalculé à chaque nouvel item.
   * Fisher-Yates sur une copie pour ne pas muter le corpus.
   * Sans ça, la bonne réponse serait toujours en position 1
   * (elle est en tête dans les items du corpus).
   */
  const shuffledCandidates = useMemo(() => {
    if (!current) return [];
    const arr = [...current.item.candidates];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
    return arr;
  }, [current?.itemId]);

  function submitChoice(nature: string) {
    if (!current || result) return;
    setChosen(nature);
    const r = engine.evaluateBrick(current.itemId, nature);
    setResult(r);
    if (r.outcome === "success") {
      engine.registerOutcome(ZONES.ANATOMIE, current.itemId, r);
    }
  }

  function nextItem() {
    setChosen(null);
    setResult(null);
    if (itemIndex + 1 < items.length) {
      setItemIndex(itemIndex + 1);
      return;
    }
    // Fin de brique → passer à la suivante
    if (brickIndex + 1 < BRICK_ORDER.length) {
      setBrickIndex(brickIndex + 1);
      setItemIndex(0);
      return;
    }
    // Fin de séquence
    setDone(true);
  }

  // Raccourcis clavier 1/2/3/4 (sur l'ordre AFFICHÉ, pas l'ordre du corpus)
  useEffect(() => {
    if (!current || result || done) return;
    function handler(e: KeyboardEvent) {
      const map = ["1", "2", "3", "4"];
      const idx = map.indexOf(e.key);
      if (idx >= 0 && shuffledCandidates[idx]) {
        submitChoice(shuffledCandidates[idx]!.nature);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  if (done) {
    return (
      <main className="bricks bricks--done">
        <h1 className="bricks__done-title">Trois briques posées.</h1>
        <p className="bricks__done-text">
          Vous avez travaillé chaque composant du risque isolément. Pour
          consolider l'anatomie, essayez maintenant <strong>Le Détective</strong>{" "}
          qui vous demande de reconstituer une chaîne complète.
        </p>
        <div className="bricks__done-actions">
          <button type="button" className="btn" onClick={props.onExit}>
            Retour à Anatomie
          </button>
        </div>
      </main>
    );
  }

  if (!current) {
    return (
      <main className="bricks bricks--empty">
        <p>Aucun item disponible pour cette brique.</p>
        <button type="button" className="btn" onClick={props.onExit}>
          Retour
        </button>
      </main>
    );
  }

  const isCause = current.item.component === "cause";
  const isConsequence = current.item.component === "consequence";
  const context =
    current.item.component !== "cause" ? current.item.context : null;

  return (
    <main className="bricks">
      <header className="bricks__header">
        <button
          type="button"
          className="bricks__back"
          onClick={props.onExit}
        >
          ← Anatomie
        </button>
      </header>

      <div className="bricks__title-row">
        <p className="bricks__brique-tag">{BRICK_TITLE[currentComponent]}</p>
      </div>

      {context && (
        <section className="bricks__context" aria-label="Contexte">
          <p className="bricks__context-label">
            {isConsequence ? "Cause et événement" : "Contexte"}
          </p>
          <p className="bricks__context-text">{context}</p>
        </section>
      )}

      <p className="bricks__prompt">{BRICK_PROMPT[currentComponent]}</p>

      <section
        className={
          "bricks__candidates" +
          (isCause || current.item.component === "event"
            ? " bricks__candidates--quad"
            : " bricks__candidates--list")
        }
        aria-label="Quatre candidats"
      >
        {shuffledCandidates.map((cand, idx) => {
          const wasChosen = chosen === cand.nature;
          const isCorrect = cand.nature === current.item.correctNature;
          const showAsCorrect = result && isCorrect;
          const showAsWrongChoice =
            result && wasChosen && result.outcome !== "success";

          const stateClass = !result
            ? ""
            : showAsCorrect
              ? " bricks__cand--correct"
              : showAsWrongChoice
                ? " bricks__cand--wrong"
                : " bricks__cand--dimmed";

          return (
            <button
              key={cand.nature}
              type="button"
              className={"bricks__cand" + stateClass}
              onClick={() => submitChoice(cand.nature)}
              disabled={result !== null}
              aria-label={`Candidat ${idx + 1}` + (result ? `, nature ${NATURE_LABEL[cand.nature] ?? cand.nature}` : "")}
            >
              <div className="bricks__cand-head">
                <span className="bricks__cand-kbd" aria-hidden="true">
                  {idx + 1}
                </span>
                {result && (
                  <span className="bricks__cand-nature">
                    {NATURE_LABEL[cand.nature] ?? cand.nature}
                  </span>
                )}
              </div>
              <p className="bricks__cand-text">{cand.text}</p>
              {showAsCorrect && (
                <span className="bricks__cand-badge bricks__cand-badge--correct">
                  Bonne réponse
                </span>
              )}
              {showAsWrongChoice && (
                <span className="bricks__cand-badge bricks__cand-badge--wrong">
                  Votre choix
                </span>
              )}
            </button>
          );
        })}
      </section>

      {result && (
        <section className="bricks__feedback" aria-live="polite">
          <div className="bricks__verdict">
            <span
              className={
                "bricks__verdict-tag " +
                (result.outcome === "success"
                  ? "bricks__verdict-tag--ok"
                  : "bricks__verdict-tag--miss")
              }
            >
              {result.outcome === "success" ? "Juste" : "À revoir"}
            </span>
          </div>
          {result.outcome !== "success" && (
            <p className="bricks__feedback-msg">
              {result.feedbacks[0]?.message}
            </p>
          )}

          <div className="bricks__questions">
            {result.outcome === "success" ? (
              <p className="bricks__question-line">
                <strong>{COMPONENT_ARTICLE[currentComponent].good}</strong>{" "}
                répond à la question :{" "}
                <em>« {NATURE_QUESTION[current.item.correctNature]} »</em>
              </p>
            ) : (
              <>
                <p className="bricks__question-line">
                  Votre choix (<strong>{NATURE_LABEL[chosen ?? ""] ?? ""}</strong>){" "}
                  répond à :{" "}
                  <em>« {NATURE_QUESTION[chosen ?? ""] ?? ""} »</em>
                </p>
                <p className="bricks__question-line">
                  Or <strong>{COMPONENT_ARTICLE[currentComponent].good}</strong>{" "}
                  répond à :{" "}
                  <em>« {NATURE_QUESTION[current.item.correctNature]} »</em>
                </p>
              </>
            )}
          </div>
          <div className="bricks__feedback-actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={nextItem}
            >
              {itemIndex + 1 < items.length
                ? "Suivant →"
                : brickIndex + 1 < BRICK_ORDER.length
                  ? `Brique suivante · ${BRICK_TITLE[BRICK_ORDER[brickIndex + 1]!]} →`
                  : "Terminer les briques →"}
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
