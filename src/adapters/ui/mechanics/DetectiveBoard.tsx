/**
 * « Le Détective » (O2 + O3) — reconstitution cause / événement / conséquence.
 *
 * Spec UX-UI §3 (Détective).
 * V1 : mode libre seul. L'apprenant produit 2 composants en saisie texte.
 * L'évaluation porte sur la FORME (longueur, conditionnel, anti-patterns).
 * Une formulation défendable est présentée en regard pour auto-évaluation comparée.
 */

import { useMemo, useState } from "react";
import { useEngine } from "@adapters/ui/hooks/useEngine";
import {
  MECHANICS,
  ZONES,
  type EvaluationResult,
  type ItemId,
  type PartialRiskFormulation,
  type RiskComponent,
} from "@domain/index";
import type { ChainItem } from "@content/chain/types";
import { createJsonContentRepository } from "@adapters/content-loader/JsonContentRepository";
import "./DetectiveBoard.css";

const COMPONENT_LABEL: Record<RiskComponent, string> = {
  cause: "Cause",
  event: "Événement",
  consequence: "Conséquence",
};

const COMPONENT_HELPER: Record<RiskComponent, string> = {
  cause: "Le facteur qui rend l'événement possible.",
  event: "Ce qui pourrait survenir (au conditionnel).",
  consequence: "L'effet mesurable sur l'objectif si l'événement survient.",
};

const COMPONENT_PLACEHOLDER: Record<RiskComponent, string> = {
  cause: "À cause de…",
  event: "il pourrait arriver que…",
  consequence: "ce qui aurait pour conséquence…",
};

const COMPONENTS_ORDER: ReadonlyArray<RiskComponent> = [
  "cause",
  "event",
  "consequence",
];

let _repo: ReturnType<typeof createJsonContentRepository> | null = null;
function getRepo() {
  if (!_repo) _repo = createJsonContentRepository();
  return _repo;
}

export type DetectiveBoardProps = {
  onExit: () => void;
};

export default function DetectiveBoard(props: DetectiveBoardProps) {
  const engine = useEngine();
  const [currentId, setCurrentId] = useState<ItemId | null>(() =>
    engine.nextItem({ mechanic: MECHANICS.DETECTIVE }),
  );
  const [drafts, setDrafts] = useState<PartialRiskFormulation>({});
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [selfAssessed, setSelfAssessed] = useState<
    "compris" | "a-revoir" | null
  >(null);

  const item = useMemo<ChainItem | null>(() => {
    if (!currentId) return null;
    return getRepo().findById<ChainItem>(currentId);
  }, [currentId]);

  function submit() {
    if (!currentId || !item) return;
    const evalResult = engine.diagnoseChain(currentId, drafts);
    setResult(evalResult);
  }

  function nextRound() {
    setDrafts({});
    setResult(null);
    setSelfAssessed(null);
    const next = engine.nextItem({ mechanic: MECHANICS.DETECTIVE });
    setCurrentId(next);
  }

  function applySelfAssessment(verdict: "compris" | "a-revoir") {
    if (!currentId || !result) return;
    setSelfAssessed(verdict);
    if (verdict === "compris") {
      const successResult: EvaluationResult = {
        feedbacks: result.feedbacks,
        outcome: "success",
      };
      engine.registerOutcome(ZONES.ANATOMIE, currentId, successResult);
    }
  }

  if (!item) {
    return (
      <main className="detective detective--empty">
        <p>Aucun item disponible pour le moment.</p>
        <button type="button" className="btn" onClick={props.onExit}>
          Retour à la carte
        </button>
      </main>
    );
  }

  return (
    <main className="detective">
      <header className="detective__header">
        <button
          type="button"
          className="detective__back"
          onClick={props.onExit}
        >
          ← Carte de maîtrise
        </button>
      </header>

      <div className="detective__intro">
        <h1 className="detective__title">
          Reconstituer une chaîne risque
        </h1>
        <p className="detective__objective">
          Un risque bien rédigé a trois composants. Une des cases vous est
          donnée, à vous de reconstituer les deux autres pour que la chaîne
          tienne debout : <strong>cause</strong>{" "}
          <span className="detective__arrow">→</span>{" "}
          <strong>événement</strong>{" "}
          <span className="detective__arrow">→</span>{" "}
          <strong>conséquence</strong>.
        </p>
      </div>

      <section className="detective__scenario" aria-label="Scénario">
        <p className="detective__scenario-label">Scénario</p>
        <p className="detective__scenario-text">{item.scenario}</p>
      </section>

      <section className="detective__chain" aria-label="Chaîne à reconstituer">
        {COMPONENTS_ORDER.map((c) => {
          const isRevealed = c === item.revealedComponent;
          const value = isRevealed
            ? item.revealedText
            : drafts[c] ?? "";
          return (
            <div
              key={c}
              className={`slot slot--${c} ${
                isRevealed ? "slot--revealed" : "slot--editable"
              }`}
            >
              <div className="slot__head">
                <span className="slot__label">{COMPONENT_LABEL[c]}</span>
                {isRevealed ? (
                  <span className="slot__tag">Donné</span>
                ) : (
                  <span className="slot__tag slot__tag--produce">
                    À produire
                  </span>
                )}
              </div>
              <p className="slot__helper">{COMPONENT_HELPER[c]}</p>
              {isRevealed ? (
                <div className="slot__readonly">{value}</div>
              ) : (
                <textarea
                  className="slot__textarea"
                  value={value}
                  onChange={(e) =>
                    setDrafts((d) => ({ ...d, [c]: e.target.value }))
                  }
                  placeholder={COMPONENT_PLACEHOLDER[c]}
                  rows={3}
                  aria-label={`Saisir le composant ${COMPONENT_LABEL[c]}`}
                  disabled={result !== null}
                />
              )}
            </div>
          );
        })}
      </section>

      {!result && (
        <div className="detective__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={submit}
            disabled={!hasMinimalContent(drafts, item.revealedComponent)}
          >
            Évaluer la chaîne
          </button>
        </div>
      )}

      {result && (
        <FeedbackPanel
          result={result}
          item={item}
          drafts={drafts}
          selfAssessed={selfAssessed}
          onSelfAssess={applySelfAssessment}
          onNext={nextRound}
        />
      )}
    </main>
  );
}

function hasMinimalContent(
  drafts: PartialRiskFormulation,
  revealed: RiskComponent,
): boolean {
  return COMPONENTS_ORDER.filter((c) => c !== revealed).every(
    (c) => (drafts[c] ?? "").trim().length >= 10,
  );
}

function FeedbackPanel(props: {
  result: EvaluationResult;
  item: ChainItem;
  drafts: PartialRiskFormulation;
  selfAssessed: "compris" | "a-revoir" | null;
  onSelfAssess: (v: "compris" | "a-revoir") => void;
  onNext: () => void;
}) {
  const { result, item, drafts, selfAssessed, onSelfAssess, onNext } = props;
  const formByComponent = new Map<RiskComponent, string>();
  for (const f of result.feedbacks) {
    if (f.target !== "overall") {
      formByComponent.set(f.target as RiskComponent, f.message);
    }
  }

  return (
    <section className="feedback-detective" aria-live="polite">
      <h2 className="feedback-detective__title">Comparons</h2>
      <p className="feedback-detective__intro">
        À gauche, votre chaîne. À droite, une formulation défendable écrite
        par un expert. Aucune n'est l'unique « bonne réponse », ce sont des
        manières solides de poser la chaîne. Lisez les deux, puis notez
        vous-même si vous avez compris.
      </p>

      <div className="compare">
        <div className="compare__col compare__col--yours">
          <h3>Votre chaîne</h3>
          {COMPONENTS_ORDER.map((c) => {
            const isRevealed = c === item.revealedComponent;
            const value = isRevealed
              ? item.revealedText
              : (drafts[c] ?? "").trim() || "(vide)";
            return (
              <div key={c} className={`compare__cell compare__cell--${c}`}>
                <p className="compare__cell-label">
                  {COMPONENT_LABEL[c]}
                  {isRevealed && (
                    <span className="compare__cell-given"> (donné)</span>
                  )}
                </p>
                <p className="compare__cell-text">{value}</p>
              </div>
            );
          })}
        </div>
        <div className="compare__col compare__col--defensible">
          <h3>Formulation défendable</h3>
          {COMPONENTS_ORDER.map((c) => (
            <div
              key={c}
              className={`compare__cell compare__cell--${c}`}
            >
              <p className="compare__cell-label">{COMPONENT_LABEL[c]}</p>
              <p className="compare__cell-text">{item.defensibleVariant[c]}</p>
            </div>
          ))}
        </div>
      </div>

      {formByComponent.size > 0 && (
        <div className="form-issues">
          <h3>Points de forme</h3>
          <ul>
            {Array.from(formByComponent.entries()).map(([c, msg]) => (
              <li key={c}>
                <strong>{COMPONENT_LABEL[c]}</strong> : {msg}
              </li>
            ))}
          </ul>
        </div>
      )}

      {Object.keys(item.advice).length > 0 && (
        <details className="advice">
          <summary>Voir le pourquoi</summary>
          <ul>
            {(Object.entries(item.advice) as Array<[RiskComponent, string]>).map(
              ([c, msg]) => (
                <li key={c}>
                  <strong>{COMPONENT_LABEL[c]}</strong> : {msg}
                </li>
              ),
            )}
          </ul>
        </details>
      )}

      <div className="self-assess">
        {selfAssessed === null ? (
          <>
            <p className="self-assess__prompt">Honnêtement, qu'en pensez-vous ?</p>
            <div className="self-assess__buttons">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => onSelfAssess("a-revoir")}
              >
                À revoir
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => onSelfAssess("compris")}
              >
                J'ai compris
              </button>
            </div>
          </>
        ) : (
          <div className="self-assess__after">
            <p>
              {selfAssessed === "compris"
                ? "Pris en compte dans la maîtrise."
                : "Pas de passe enregistrée. Vous retrouverez ce type d'item plus tard."}
            </p>
            <button type="button" className="btn btn--primary" onClick={onNext}>
              Suivant →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
