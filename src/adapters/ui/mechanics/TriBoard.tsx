/**
 * « Le Tri » (O1) — discrimination enjeu / objectif / risque / issue.
 *
 * Spec UX-UI §3 (Le Tri) + §4 (divulgation progressive : panneau Théorie escamotable).
 * Charte cabinet (D24) : plateau sauge, carte-énoncé parchemin cadre or,
 * quatre cibles biseautées avec seaux héraldiques.
 */

import { useEffect, useMemo, useState } from "react";
import { useEngine } from "@adapters/ui/hooks/useEngine";
import {
  MECHANICS,
  ZONES,
  type EvaluationResult,
  type ItemId,
  type TriageVerdict,
} from "@domain/index";
import type { TriageItem, TriageTheme } from "@content/triage/types";
import { TRIPTYQUE_THEORY } from "@content/theory/triptyque";
import ZoomControl, { useZoom } from "@adapters/ui/shared/ZoomControl";
import "@adapters/ui/shared/ZoomControl.css";
import "./TriBoard.css";

type ZoneCard = {
  verdict: TriageVerdict;
  label: string;
  hint: string;
  shortcut: string;
};

/**
 * Les 4 cibles catégorielles (bas du plateau).
 * `hint` = phrase courte en italique sous le titre.
 */
const ZONE_CARDS: ReadonlyArray<ZoneCard> = [
  {
    verdict: "enjeu",
    label: "Enjeu",
    hint: "ce qu'il faut préserver",
    shortcut: "1",
  },
  {
    verdict: "objectif",
    label: "Objectif",
    hint: "la cible qu'on vise",
    shortcut: "2",
  },
  {
    verdict: "risque",
    label: "Risque",
    hint: "l'incertain qui approche",
    shortcut: "3",
  },
  {
    verdict: "issue",
    label: "Issue",
    hint: "le fait déjà survenu",
    shortcut: "4",
  },
];

const THEME_LABEL: Record<TriageTheme, string> = {
  logiciel: "Logiciel",
  evenementiel: "Événementiel",
  industriel: "Industriel",
  conseil: "Conseil",
  rh: "Ressources",
  operations: "Opérations",
};

export type TriBoardProps = {
  onExit: () => void;
};

export default function TriBoard(props: TriBoardProps) {
  const engine = useEngine();
  const [currentId, setCurrentId] = useState<ItemId | null>(null);
  const [chosen, setChosen] = useState<TriageVerdict | null>(null);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [showWhy, setShowWhy] = useState(false);
  const [showTheory, setShowTheory] = useState<boolean>(false);
  const { zoom, change: changeZoom } = useZoom("coach-risques-triboard-zoom");

  useEffect(() => {
    const next = engine.nextItem({ mechanic: MECHANICS.TRI });
    setCurrentId(next);
  }, [engine]);

  const item = useMemo<TriageItem | null>(() => {
    if (!currentId) return null;
    return getItemUntyped(currentId);
  }, [currentId]);

  useEffect(() => {
    if (!currentId || result) return;
    function handler(e: KeyboardEvent) {
      const card = ZONE_CARDS.find((c) => c.shortcut === e.key);
      if (card) submitVerdict(card.verdict);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  function submitVerdict(verdict: TriageVerdict) {
    if (!currentId || result) return;
    const evalResult = engine.evaluateTriage(currentId, verdict);
    setChosen(verdict);
    setResult(evalResult);
    engine.registerOutcome(ZONES.TRIPTYQUE, currentId, evalResult);
  }

  function nextRound() {
    setResult(null);
    setChosen(null);
    setShowWhy(false);
    const next = engine.nextItem({ mechanic: MECHANICS.TRI });
    setCurrentId(next);
  }

  if (!item) {
    return (
      <main className="triboard triboard--empty">
        <p>Aucun item disponible pour le moment.</p>
        <button type="button" className="btn" onClick={props.onExit}>
          Retour à la carte
        </button>
      </main>
    );
  }

  const isCorrect = result?.outcome === "success";
  const expectedVerdict = item.expected;

  return (
    <main className="triboard">
      <header className="triboard__header">
        <button
          type="button"
          className="triboard__back"
          onClick={props.onExit}
        >
          ← Carte de maîtrise
        </button>
        <ZoomControl zoom={zoom} onChange={changeZoom} className="triboard__zoom" />
        <button
          type="button"
          className="triboard__theory-toggle"
          onClick={() => setShowTheory((v) => !v)}
          aria-expanded={showTheory}
          aria-controls="theory-panel"
        >
          {showTheory ? "Fermer la théorie" : "Théorie"}
        </button>
      </header>

      <div
        className="triboard__viewport"
        style={{ zoom }}
      >

      {showTheory && <TheoryPanel onClose={() => setShowTheory(false)} />}

      <section
        className="plateau"
        aria-label="Le Tri — plateau du cabinet"
      >
        <div
          className="plateau__rail plateau__rail--left"
          aria-hidden="true"
        />
        <div
          className="plateau__rail plateau__rail--right"
          aria-hidden="true"
        />
        <h1 className="plateau__cartouche plateau__cartouche--left">
          Le Tri
        </h1>
        <span
          className="plateau__cartouche plateau__cartouche--right"
          aria-hidden="true"
        >
          Le Cabinet
        </span>

        <div className="plateau__grid">
          <div className="pile" aria-hidden="true">
            <div className="pile__cards">
              <div className="pile__back" />
              <div className="pile__back" />
              <div className="pile__back" />
            </div>
            <span className="pile__label">Pile</span>
          </div>

          <div className="aire-lecture" aria-label="Énoncé à classer">
            <article className="card" key={String(currentId)}>
              <span className="card__rosace card__rosace--tl" aria-hidden="true">
                ❦
              </span>
              <span className="card__rosace card__rosace--tr" aria-hidden="true">
                ❦
              </span>
              <span className="card__rosace card__rosace--bl" aria-hidden="true">
                ❦
              </span>
              <span className="card__rosace card__rosace--br" aria-hidden="true">
                ❦
              </span>

              <div className="card__band">
                <span className="card__band-team">{THEME_LABEL[item.theme]}</span>
                <span className="card__band-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 14c2 -1 4 -2 7 -2c3 0 4 2 5 3l2 -1c1 0 3 0 3 -2c-1 -2 -4 -4 -8 -4c-5 0 -8 3 -9 6z" />
                    <circle cx="17" cy="10" r="0.7" fill="currentColor" />
                    <path d="M4 14l-2 3M6 15l-1 3M8 15l-1 3" />
                  </svg>
                </span>
              </div>

              <div className="card__body">
                <div className="card__vignette" aria-hidden="true">
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="50" cy="50" r="20" />
                    <circle cx="50" cy="50" r="7" />
                    <g strokeLinecap="round">
                      <line x1="50" y1="18" x2="50" y2="30" />
                      <line x1="50" y1="70" x2="50" y2="82" />
                      <line x1="18" y1="50" x2="30" y2="50" />
                      <line x1="70" y1="50" x2="82" y2="50" />
                      <line x1="28" y1="28" x2="35" y2="35" />
                      <line x1="65" y1="65" x2="72" y2="72" />
                      <line x1="28" y1="72" x2="35" y2="65" />
                      <line x1="65" y1="35" x2="72" y2="28" />
                    </g>
                  </svg>
                </div>
                <p className="card__text">« {item.statement} »</p>
              </div>

              <div className="card__foot" aria-hidden="true">
                ✧ ∼ ✧
              </div>
            </article>
          </div>

          <div className="plateau__spacer" aria-hidden="true" />

          <section className="cibles" aria-label="Quatre catégories">
            {ZONE_CARDS.map((card) => {
              const wasChosen = chosen === card.verdict;
              const isExpected = expectedVerdict === card.verdict;
              const showAsCorrect = result && isExpected;
              const showAsWrongChoice = result && wasChosen && !isCorrect;

              const stateClass = !result
                ? ""
                : showAsCorrect
                  ? " cible--state-correct"
                  : showAsWrongChoice
                    ? " cible--state-wrong"
                    : " cible--state-dimmed";

              return (
                <button
                  key={card.verdict}
                  type="button"
                  className={`cible cible--${card.verdict}${stateClass}`}
                  onClick={() => submitVerdict(card.verdict)}
                  disabled={result !== null}
                  aria-label={`Classer comme ${card.label} (touche ${card.shortcut})`}
                >
                  <span className="cible__shortcut" aria-hidden="true">
                    {card.shortcut}
                  </span>
                  <div className="cible__illu" aria-hidden="true">
                    <TargetIllustration verdict={card.verdict} />
                  </div>
                  <p className="cible__title">{card.label}</p>
                  <p className="cible__hint">{card.hint}</p>
                  <span className="cible__seal" aria-hidden="true">
                    <TargetSeal verdict={card.verdict} />
                  </span>
                  {showAsCorrect && (
                    <span className="cible__badge cible__badge--correct">
                      Bonne réponse
                    </span>
                  )}
                  {showAsWrongChoice && (
                    <span className="cible__badge cible__badge--wrong">
                      Votre choix
                    </span>
                  )}
                </button>
              );
            })}
          </section>
        </div>
      </section>

      {result && (
        <section
          className={`feedback feedback--${isCorrect ? "success" : "miss"}`}
          aria-live="polite"
        >
          <div className="feedback__verdict">
            <span
              className={`feedback__verdict-tag ${isCorrect ? "feedback__verdict-tag--ok" : "feedback__verdict-tag--miss"}`}
            >
              {isCorrect ? "Juste" : "À revoir"}
            </span>
            <p className="feedback__verdict-text">
              {isCorrect ? (
                <>
                  C'est bien une formulation de type « {labelOf(expectedVerdict)} ».
                </>
              ) : (
                <>
                  <strong>
                    La bonne réponse est « {labelOf(expectedVerdict)} ».
                  </strong>{" "}
                  <em>{result.feedbacks[0]?.message}</em>
                </>
              )}
            </p>
          </div>

          <div className="feedback__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setShowWhy((v) => !v)}
            >
              {showWhy ? "Masquer le pourquoi" : "Voir le pourquoi"}
            </button>
            <button type="button" className="btn btn--primary" onClick={nextRound}>
              Piocher la suivante →
            </button>
          </div>

          {showWhy && (
            <aside className="feedback__theory">
              <h3>Pourquoi cette catégorie</h3>
              <p>{item.rationale}</p>
            </aside>
          )}
        </section>
      )}
      </div>
    </main>
  );
}

function labelOf(v: TriageVerdict): string {
  return ZONE_CARDS.find((c) => c.verdict === v)?.label ?? v;
}

// ─────────────────────────────────────────────────────────────────────
// Illustrations (SVG inline) — pédagogiques et héraldiques
// ─────────────────────────────────────────────────────────────────────

function TargetIllustration({ verdict }: { verdict: TriageVerdict }) {
  switch (verdict) {
    case "enjeu":
      // Coffret de valeur (bijou)
      return (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="var(--cabinet-or-sceau)"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 55l35 -15l40 15l-35 15z" fill="var(--cabinet-target-enjeu)" />
          <path d="M20 55v22l35 15v-22" fill="var(--cabinet-target-enjeu-ink)" />
          <path d="M55 70v22l40 -15v-22" fill="#284A6E" />
          <path d="M20 55l35 -15l40 15" strokeWidth="2" />
          <path d="M52 43l6 -4l6 3" strokeWidth="1.8" opacity="0.9" />
          <circle cx="70" cy="68" r="2.4" fill="var(--cabinet-or-sceau)" />
        </svg>
      );
    case "objectif":
      // Arc bandé + flèche vers cible
      return (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="var(--cabinet-parchment)"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M25 20c15 20 15 40 0 60" />
          <path d="M25 25l0 50" opacity="0.9" />
          <path d="M40 50l35 0" strokeWidth="2" />
          <path d="M70 46l6 4l-6 4" />
          <path d="M42 47l-4 3l4 3" opacity="0.8" />
        </svg>
      );
    case "risque":
      // Carte de tarot à moitié retournée + éclair
      return (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="#C4B8C4"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M30 25l40 0l0 60l-40 0z" fill="var(--cabinet-target-risque)" />
          <path d="M30 25l25 -12l40 5l-15 32z" fill="#7A5479" />
          <circle cx="55" cy="24" r="7" opacity="0.7" />
          <path d="M55 17v14M48 24h14" opacity="0.7" />
          <path
            d="M65 45c-2 -3 -5 -3 -7 -1c-3 -1 -5 1 -5 3c-3 0 -3 4 0 4l14 0c2 0 2 -4 -2 -6z"
            opacity="0.95"
          />
        </svg>
      );
    case "issue":
      // Rocher tombé + chemin passé
      return (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="var(--cabinet-parchment)"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M8 85c12 -4 20 -6 30 -18c8 -5 15 -3 25 -14c6 -6 15 -8 30 -6"
            opacity="0.6"
            strokeDasharray="4 2"
          />
          <path
            d="M40 55l-8 5l-4 12l6 8l14 3l10 -6l3 -10l-8 -10z"
            fill="var(--cabinet-parchment)"
            fillOpacity="0.7"
          />
          <path d="M40 55l16 2l-6 8z" opacity="0.5" />
          <path d="M50 65l7 -3l-3 8z" opacity="0.5" />
        </svg>
      );
  }
}

function TargetSeal({ verdict }: { verdict: TriageVerdict }) {
  switch (verdict) {
    case "enjeu":
      // Bouclier héraldique
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3l7 2v6c0 4 -3 8 -7 10c-4 -2 -7 -6 -7 -10v-6z" />
        </svg>
      );
    case "objectif":
      // Cible bull's eye
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case "risque":
      // Éclair
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2l-8 12h6l-2 8l8 -12h-6z" />
        </svg>
      );
    case "issue":
      // Croix héraldique
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 3h4v7h7v4h-7v7h-4v-7h-7v-4h7z" />
        </svg>
      );
  }
}

// ─────────────────────────────────────────────────────────────────────
// Panneau Théorie escamotable (UX-UI §4)
// ─────────────────────────────────────────────────────────────────────

function TheoryPanel(props: { onClose: () => void }) {
  return (
    <section
      id="theory-panel"
      className="theory"
      aria-label="Référence mentale pour distinguer enjeu, objectif, risque, issue"
    >
      <header className="theory__header">
        <h2 className="theory__title">Quatre questions pour trier</h2>
        <button
          type="button"
          className="theory__close"
          onClick={props.onClose}
          aria-label="Fermer la théorie"
        >
          ×
        </button>
      </header>

      <p className="theory__contrast">
        <strong>L'enjeu est une valeur à préserver</strong>, le{" "}
        <strong>risque</strong> est ce qui pourrait l'affecter,{" "}
        l'<strong>issue</strong> est ce qui l'a déjà affectée.
      </p>

      <ul className="theory__cards">
        {TRIPTYQUE_THEORY.map((def) => (
          <li
            key={def.verdict}
            className={`theory__card theory__card--${def.verdict}`}
          >
            <p className="theory__card-label">{def.label}</p>
            <p className="theory__card-question">{def.quickCard.question}</p>
            <p className="theory__card-essence">{def.quickCard.essence}</p>
            <p className="theory__card-time">{def.quickCard.temporalCue}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Repo singleton (V1 — sera remplacé par une méthode propre sur l'engine)
// ─────────────────────────────────────────────────────────────────────
import { createJsonContentRepository } from "@adapters/content-loader/JsonContentRepository";

let _repoSingleton: ReturnType<typeof createJsonContentRepository> | null = null;
function getRepo() {
  if (!_repoSingleton) _repoSingleton = createJsonContentRepository();
  return _repoSingleton;
}

function getItemUntyped(id: ItemId): TriageItem | null {
  return getRepo().findById<TriageItem>(id);
}
